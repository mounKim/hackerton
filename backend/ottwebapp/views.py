from django.shortcuts import render
from django.http import Http404
from django.core.serializers import serialize
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
import json
from django.contrib.auth.models import User

class VideoListView(APIView):
    def get(self, request):
        videos = VideoList.objects.all().order_by('id')
        serializer = VideoListSerializer(videos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = VideoListSerializer(
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VideoDetailView(APIView):
    def get_object(self, pk):  # video 객체 가져오기
        try:
            return VideoList.objects.get(pk=pk)
        except VideoList.DoesNotExist:
            raise Http404(f'Video(id={pk}) does not exist in VideoList')
        
    def get(self, request, pk, format=None): # video detail 보기
        video = self.get_object(pk)
        serializer = VideoListSerializer(video)
        return Response(serializer.data)
    
class SaveVideoView(APIView):        
    def get(self, request):
        user_id = request.GET.dict()['user_id']
        user = User.objects.get(username=user_id)
        saved_videos = SaveVideo.objects.filter(user_id=user)
        video_ids = saved_videos.values_list('video_id', flat=True)
        videos = VideoList.objects.filter(id__in=video_ids)
        serializer = VideoListSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)        
    
    def post(self, request):
        user_id = request.data.get('user_id')
        user = User.objects.get(username=user_id)
        pk = int(request.data.get('video_id'))
        try:
            get_video = VideoList.objects.get(pk=pk)
        except VideoList.DoesNotExist:
            raise Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
        save_video = SaveVideo(user_id=user, video_id=get_video)
        save_video.save()
        return Response({'message': 'Video saved successfully'}, status=status.HTTP_201_CREATED)

class WatchedVideoView(APIView):        
    def get(self, request):
        # user_id = request.data.get('user_id')
        user_id = request.GET.dict()['user_id']
        user = User.objects.get(username=user_id)
        watched_videos = WatchedVideo.objects.filter(user_id=user).order_by('-updated_at')
        video_ids = watched_videos.values_list('video_id', flat=True)
        videos = []
        if len(video_ids) > 0:
            videos.append(VideoList.objects.filter(id__in=[video_ids[0]]).first())
            print(videos)
            for i in video_ids[1:]:
                videos.append(VideoList.objects.filter(id__in=[i]).first())
                print(videos)
        else:
            videos = VideoList.objects.filter(id__in=video_ids)
        serializer = VideoListSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)        
    
    def post(self, request):
        user_id = request.data.get('user_id')
        user = User.objects.get(username=user_id)
        pk = int(request.data.get('video_id'))
        time = request.data.get('time')
        try:
            get_video = VideoList.objects.get(pk=pk)
        except VideoList.DoesNotExist:
            raise Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
        video_ids = WatchedVideo.objects.filter(user_id=user).values_list('video_id', flat=True)
        watched_video = WatchedVideo(user_id=user, video_id=get_video, updated_at=time)
        if pk in video_ids:
            WatchedVideo.objects.get(user_id=user, video_id=pk).delete()
        watched_video.save()

        row = UserCategory.objects.get(user_id=user)
        items = get_video.video_category.all().values()

        for item in items:
            category = item['category']
            if category == 'Rhymes and Songs':
                row.score1 += 1
            if category == 'Educational':
                row.score2 += 1
            if category == 'Cartoons and Animation':
                row.score3 += 1
            if category == 'Gaming and Toys':
                row.score4 += 1
            if category == 'Science and Exploration':
                row.score5 += 1
            if category == 'Reading and Storytelling':
                row.score6 += 1
            if category == 'Arts and Crafts':
                row.score7 += 1
            if category == 'Comedy and Entertainment':
                row.score8 += 1
        row.save()

        return Response({'message': 'Watched Video saved successfully'}, status=status.HTTP_201_CREATED)
    

class VideoCategoryView(APIView):        
    def get(self, request):
        category = request.GET.dict()['category']
        category = category.replace('%20', ' ')
        try:
            videos = VideoCategory.objects.get(category=category).videos.all()
        except VideoCategory.DoesNotExist:
            raise Http404(f'{category} does not exist in VideoCatetory')
        # videos = VideoList.objects.filter(category=category).values()
        serializer = VideoListSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)   

class UserCategoryView(APIView):
    def get(self, request):
        user_id = request.GET.dict()['user_id']
        user = User.objects.get(username=user_id)
        likes = UserCategory.objects.filter(user_id=user).values()
        serializer = UserCategorySerializer(likes[0])
        return Response(serializer.data, status=status.HTTP_200_OK)

class StreamingQualityView(APIView):    
    def get(self, request):
        user_id = request.GET.dict()['user_id']
        user = User.objects.get(username=user_id)
        streaming_qualities = StreamingQuality.objects.filter(user_id_id=user.id).order_by('-id')
        serializer = StreamingQualitySerializer(streaming_qualities, many=True)        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = request.data.get('user_id')
        video_id = request.data.get('video_id')
        user = User.objects.get(username=user_id)
        video = VideoList.objects.get(id=video_id)
        videos = WatchedVideo.objects.filter(user_id = user, video_id = video)
        try :
            v = videos[videos.count() -1]
        except AssertionError:
            raise Http404('Any watched video does not exist in WatchedVideo(username = {user_id})')
        video_url = video.video_url
        bitrate_resource = request.data['bitrate_resource']
        resolution = request.data['resolution']
        streaming_type = request.data['streaming_type']
        protocol = request.data.get('protocol')

        streaming_quality = StreamingQuality(
                                            user_id = user,
                                            video_id = v,
                                            video_url = video_url,
                                            bitrate_resource = bitrate_resource,
                                            resolution = resolution,
                                            streaming_type = streaming_type,
                                            protocol = protocol 
                                        )
        streaming_quality.save()
        return Response({'message': 'Streaming Quality information saved successfully'}, status=status.HTTP_201_CREATED)
    
    
class GraphView(APIView):
    def get(self, request):
        sq_id = request.GET.dict()['sq_id']
        sq = StreamingQuality.objects.get(pk=sq_id)
        graph = Graph.objects.get(sq_id=sq)
        serializer = GraphSerializer(graph)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        json_data = json.loads(request.body)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(json_data)
        sq_id = request.data.get('sq_id')
        sq = StreamingQuality.objects.get(pk=sq_id)
        download_bitrate = request.data.get('download_bitrate')
        selected_bitrate = request.data.get('selected_bitrate')
        buffering_start = request.data.get('buffering_start')
        buffering_end = request.data.get('buffering_end')
        segment_duration = request.data.get('segment_duration')
        
        graph = Graph(
            sq_id = sq,
            download_bitrate = download_bitrate,
            selected_bitrate = selected_bitrate,
            buffering_start = buffering_start,
            buffering_end = buffering_end,
            segment_duration = segment_duration
        )
        graph.save()
        return Response({'message': 'Graph information saved successfully'}, status=status.HTTP_201_CREATED)
