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
        videos = VideoList.objects.all()
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
            raise Http404
        
    def get(self, request, pk, format=None): # video detail 보기
        video = self.get_object(pk)
        serializer = VideoListSerializer(video)
        return Response(serializer.data)
    
class SaveVideoView(APIView):        
    def get(self, request):
        user_id = request.data.get('user_id')
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
        user_id = request.data.get('user_id')
        user = User.objects.get(username=user_id)
        watched_videos = WatchedVideo.objects.filter(user_id=user)
        video_ids = watched_videos.values_list('video_id', flat=True)
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
        watched_video = WatchedVideo(user_id=user, video_id=get_video)
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
    
# class StreamingQualityView(APIView):        
#     def get(self, request):
#         video_id = request.data.get('video_id')         
#         video_info = StreamingQuality.objects.get(video_id=video_id)
#         serializer = StreamingQualitySerializer(video_info, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)        
    
#     def post(self, request):
#         video_id = request.data.get('video_id')
#         hls_data = request.data.get('hls_data')

#         # TODO : parsing -> video url, content_info, bandwidth, bitrate_resource, resolution, streaming_type, protocol

#         streaming_quality = StreamingQulity(
#                                             video_id = video_id,
#                                             content_info = content_info,
#                                             video_url = video_url,
#                                             bandwidth = bandwidth,
#                                             bitrate_resource = bitrate_resource,
#                                             resolution = resolution,
#                                             streaming_type = streaming_type,
#                                             protocol = protocol 
#                                         )

#         streaming_quality.save()
#         return Response({'message': 'Streaming Quality saved successfully'}, status=status.HTTP_201_CREATED)

class VideoCategoryView(APIView):        
    def get(self, request):
        category = request.data.get('category')
        videos = VideoCategory.objects.filter(category=category).values()
        serializer = VideoListSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)   

class UserCategoryView(APIView):
    def get(self, request):
        user_id = request.GET.dict()['user_id']
        user = User.objects.get(username=user_id)
        likes = UserCategory.objects.filter(user_id=user).values()
        serializer = UserCategorySerializer(likes[0])
        return Response(serializer.data, status=status.HTTP_200_OK)
