from django.test import TestCase
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from .models import VideoList, VideoCategory, UserCategory, SaveVideo, WatchedVideo, StreamingQuality, Graph
import datetime

from rest_framework.test import APIClient
from rest_framework import status
from .serializers import VideoListSerializer, UserCategorySerializer, StreamingQualitySerializer, GraphSerializer

########## Testing Model ############

# class ModelsTestCase(TestCase):
#     def setUp(self):
#         # Create a user
#         self.user = User.objects.create_user(username='testuser', 
#                                              password='testpassword')

#         # Create a VideoList instance
#         self.video_list = VideoList.objects.create(video_url='https://example.com/video', 
#                                                    video_name='Test Video')

#         # Create a VideoCategory instance
#         self.video_category = VideoCategory.objects.create(category='TestCategory')
#         self.video_category.videos.set([self.video_list])

#         # Create a UserCategory instance
#         self.user_category = UserCategory.objects.create(user_id=self.user)

#         # Create a SaveVideo instance
#         self.save_video = SaveVideo.objects.create(user_id=self.user, 
#                                                    video_id=self.video_list)

#         # Create a WatchedVideo instance
#         self.test_time = datetime.datetime.now()
#         self.watched_video = WatchedVideo.objects.create(user_id=self.user, 
#                                                          video_id=self.video_list)

#         # Create a StreamingQuality instance
#         self.streaming_quality = StreamingQuality.objects.create(user_id=self.user, 
#                                                                  video_id=self.watched_video, 
#                                                                  video_url='https://example.com/video',
#                                                                  bitrate_resource = ['1', '2', '3'],
#                                                                  resolution = ['180X360','360X720', '720X1080'],
#                                                                  streaming_type = 'live',
#                                                                  protocol = 'hls'
#                                                                  )

#         # Create a Graph instance
#         self.graph = Graph.objects.create(sq_id=self.streaming_quality,
#                                           download_bitrate = ['1', '2', '3'],
#                                           selected_bitrate = ['4', '5', '6'],
#                                           buffering_start = ['7', '8', '9'],
#                                           buffering_end = ['10', '11', '12'],
#                                           segment_duration = ['13', '14', '15'],)

#     # BACK-UT-M-01
#     def test_user_model(self):
#         self.assertEqual(self.user.username, 'testuser')
#         assert check_password('testpassword', self.user.password)
#         print("\nBACK-UT-M-01 : Success")
    
#     # BACK-UT-M-02
#     def test_video_list_model(self):
#         self.assertEqual(self.video_list.video_url, 'https://example.com/video')
#         self.assertEqual(self.video_list.video_name, 'Test Video')
#         print("\nBACK-UT-M-02 : Success")

#     # BACK-UT-M-03
#     def test_video_category_model(self):
#         # check category name
#         self.assertEqual(self.video_category.category, "TestCategory")
        
#         # check numbers of videos in the category
#         self.assertEqual(len(self.video_category.videos.all()), 1)
        
#         # check video in the category
#         self.assertEqual(self.video_category.videos.all()[0], self.video_list)   

#         print("\nBACK-UT-M-03 : Success")
        
#     # BACK-UT-M-04
#     def test_user_category_model(self):
#         self.assertEqual(self.user_category.user_id, self.user)
#         self.assertEqual(self.user_category.score1, 0)
#         self.assertEqual(self.user_category.score2, 0)
#         self.assertEqual(self.user_category.score3, 0)
#         self.assertEqual(self.user_category.score4, 0)
#         self.assertEqual(self.user_category.score5, 0)
#         self.assertEqual(self.user_category.score6, 0)
#         self.assertEqual(self.user_category.score7, 0)
#         self.assertEqual(self.user_category.score8, 0)
        
#         print("\nBACK-UT-M-04 : Success")

#     # BACK-UT-M-05
#     def test_save_video_model(self):
#         self.assertEqual(self.save_video.user_id, self.user)
#         self.assertEqual(self.save_video.video_id, self.video_list)
        
#         print("\nBACK-UT-M-05 : Success")
        
#     # BACK-UT-M-06
#     def test_watched_video_model(self):
#         self.assertEqual(self.save_video.user_id, self.user)
#         self.assertEqual(self.save_video.video_id, self.video_list)
        
#         # check updated_at
#         self.assertEqual(self.watched_video.updated_at.date(), self.test_time.date()) # year, month, day
#         self.assertEqual(self.watched_video.updated_at.hour, self.test_time.hour) # hour
#         self.assertEqual(self.watched_video.updated_at.minute, self.test_time.minute) # day
        
#         print("\nBACK-UT-M-06 : Success")
        

#     # BACK-UT-M-07
#     def test_streaming_quality_model(self):
#         self.assertEqual(self.streaming_quality.user_id, self.user)
#         self.assertEqual(self.streaming_quality.video_id, self.watched_video)
#         self.assertEqual(self.streaming_quality.video_url, 'https://example.com/video')
#         self.assertEqual(self.streaming_quality.bitrate_resource, ['1', '2', '3'])
#         self.assertEqual(self.streaming_quality.resolution, ['180X360','360X720', '720X1080'])
#         self.assertEqual(self.streaming_quality.streaming_type, 'live')
#         self.assertEqual(self.streaming_quality.protocol, 'hls')

#         print("\nBACK-UT-M-07 : Success")
        
#     # BACK-UT-M-08
#     def test_graph_model(self):
#         self.assertEqual(self.graph.sq_id, self.streaming_quality)
#         self.assertEqual(self.graph.download_bitrate, ['1', '2', '3'])
#         self.assertEqual(self.graph.selected_bitrate, ['4', '5', '6'])
#         self.assertEqual(self.graph.buffering_start, ['7', '8', '9'])
#         self.assertEqual(self.graph.buffering_end, ['10', '11', '12'])
#         self.assertEqual(self.graph.segment_duration, ['13', '14', '15'])
        
#         print("\nBACK-UT-M-08 : Success")
        
        
########## Testing Views(APIs) ############

class VideoListViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.video = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video')

    # BACK-UT-API-01
    def test_get_video_list(self):
        response = self.client.get('http://127.0.0.1:8000/videos/')
        videos = VideoList.objects.all().order_by('id')
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        print("\nBACK-UT-API-01 : Success")
        
    # def test_create_video(self):
    #     self.client.force_authenticate(user=self.user)
    #     data = {'video_url': 'https://example.com/new-video', 'video_name': 'New Video'}
    #     response = self.client.post('http://127.0.0.1:8000/videos/', data)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(response.data['video_url'], data['video_url'])
    #     self.assertEqual(response.data['video_name'], data['video_name'])

class VideoDetailViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.video = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video')

    # BACK-UT-API-02
    def test_get_video_detail(self):
        response = self.client.get(f'http://127.0.0.1:8000/videos/{self.video.id}/')
        video = VideoList.objects.get(pk=self.video.id)
        serializer = VideoListSerializer(video)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        print("\nBACK-UT-API-02 : Success")
        
    # BACK-UT-API-03
    def test_get_video_detail_not_found(self):
        response = self.client.get('http://127.0.0.1:8000/videos/999/')  # Non-existing ID
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        print("\nBACK-UT-API-03 : Success")  
         
class SaveVideoViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_test_video = VideoList.objects.create(video_url='https://example.com/get_video', video_name='GET Test Video')
        self.post_test_video = VideoList.objects.create(video_url='https://example.com/post_video', video_name='POST Test Video')
        

    # BACK-UT-API-04
    def test_get_saved_videos(self):
        self.client.force_authenticate(user=self.user)
        SaveVideo.objects.create(user_id=self.user, video_id=self.get_test_video)
        response = self.client.get('http://127.0.0.1:8000/saved_video/', {'user_id': 'testuser'})
        saved_videos = SaveVideo.objects.filter(user_id=self.user)
        video_ids = saved_videos.values_list('video_id', flat=True)
        videos = VideoList.objects.filter(id__in=video_ids)
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        print("\nBACK-UT-API-04 : Success")  
    
    # BACK-UT-API-05
    def test_save_video(self):
        self.client.force_authenticate(user=self.user)
        data = {'user_id': 'testuser', 'video_id': str(self.post_test_video.id)}
        response = self.client.post('http://127.0.0.1:8000/saved_video/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Video saved successfully')
        
        print("\nBACK-UT-API-05 : Success")  

class WatchedVideoViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_test_video = VideoList.objects.create(video_url='https://example.com/get_video', video_name='GET Test Video')
        self.post_test_video = VideoList.objects.create(video_url='https://example.com/post_video', video_name='POST Test Video')
        
        # for post testing
        self.video_category = VideoCategory.objects.create(category='Comedy and Entertainment') # create video catetory
        self.video_category.videos.set([self.post_test_video]) # add post_test_video to created catetory
        self.user_category = UserCategory.objects.create(user_id=self.user) # initialize user category score
        
        
    # BACK-UT-API-06
    def test_get_watched_videos(self):
        self.client.force_authenticate(user=self.user)
        WatchedVideo.objects.create(user_id=self.user, video_id=self.get_test_video)
        response = self.client.get('http://127.0.0.1:8000/watched_video/', {'user_id': 'testuser'})
        watched_videos = WatchedVideo.objects.filter(user_id=self.user)
        video_ids = watched_videos.values_list('video_id', flat=True)
        videos = VideoList.objects.filter(id__in=video_ids)
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

        print("\nBACK-UT-API-06 : Success")  
    
    # BACK-UT-API-07
    def test_watch_video(self):
        # breakpoint()
        self.client.force_authenticate(user=self.user)
        data = {'user_id': 'testuser', 'video_id': str(self.post_test_video.id)}
        response = self.client.post('http://127.0.0.1:8000/watched_video/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Watched Video saved successfully')

        # Check UserCategory scores after watching the video
        user_category = UserCategory.objects.get(user_id=self.user)
        self.assertEqual(user_category.score1, 0)
        self.assertEqual(user_category.score2, 0)
        self.assertEqual(user_category.score3, 0)
        self.assertEqual(user_category.score4, 0)
        self.assertEqual(user_category.score5, 0)
        self.assertEqual(user_category.score6, 0)
        self.assertEqual(user_category.score7, 0)
        self.assertEqual(user_category.score8, 1)  # Assuming the video belongs to 'Comedy and Entertainment' category
        
        print("\nBACK-UT-API-07 : Success")  

class VideoCategoryViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.video_category = VideoCategory.objects.create(category='TestCategory')
        self.video = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video')
        self.video_category.videos.add(self.video)
        
    # BACK-UT-API-08
    def test_get_videos_by_category(self):
        category = self.video_category.category
        response = self.client.get(f'http://127.0.0.1:8000/video_category/?category={category}')
        videos = VideoCategory.objects.get(category=category).videos.all()
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        
        print("\nBACK-UT-API-08 : Success")  
        
    # BACK-UT-API-09
    def test_get_videos_by_invalid_category(self):
        response = self.client.get('http://127.0.0.1:8000/video_category/?category=InvalidCategory')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        print("\nBACK-UT-API-09 : Success")  

        
class UserCategoryViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_category = UserCategory.objects.create(user_id=self.user, score1=1, score2=2, score3=3, score4=4, score5=5, score6=6, score7=7, score8=8)

    # BACK-UT-API-10
    def test_get_user_category(self):
        response = self.client.get('http://127.0.0.1:8000/user_category/', {'user_id': 'testuser'})
        user_category = UserCategory.objects.get(user_id=self.user)
        serializer = UserCategorySerializer(user_category)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        
        print("\nBACK-UT-API-10 : Success")  
        
class StreamingQualityViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_test_video = VideoList.objects.create(video_url='https://example.com/video', video_name='GET Test Video')
        self.post_test_video = VideoList.objects.create(video_url='https://example.com/video', video_name='POST Test Video')
        
        self.get_test_watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.get_test_video)
        self.post_test_watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.post_test_video)

    # BACK-UT-API-11
    def test_get_streaming_quality(self):
        self.client.force_authenticate(user=self.user)
        streaming_quality = StreamingQuality.objects.create(user_id=self.user, 
                                                            video_id=self.get_test_watched_video, 
                                                            video_url='https://example.com/video',
                                                            bitrate_resource = ['1', '2', '3'],
                                                            resolution = ['180X360','360X720', '720X1080'],
                                                            streaming_type = 'live',
                                                            protocol = 'hls'
                                                            )
        response = self.client.get('https://example.com/streaming_quality/', {'user_id': 'testuser'})
        serializer = StreamingQualitySerializer([streaming_quality], many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        
        print("\nBACK-UT-API-11 : Success")  
        
    # BACK-UT-API-12
    def test_create_streaming_quality(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'user_id': self.user.username,
            'video_id': self.post_test_video.id,
            'video_url': self.post_test_video.video_url,
            'bitrate_resource' : ['1', '2', '3'],
            'resolution' : ['180X360','360X720', '720X1080'],
            'streaming_type': 'vod',
            'protocol': 'hls'
        }
        response = self.client.post('https://example.com/streaming_quality/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Streaming Quality information saved successfully')
        
        print("\nBACK-UT-API-12 : Success")  

# class GraphViewTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user(username='testuser', password='testpassword')
#         self.video = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video')
#         self.watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.video)
#         self.streaming_quality = StreamingQuality.objects.create(user_id=self.user, video_id=self.watched_video, video_url='https://example.com/video')

#     def test_get_graph(self):
#         self.client.force_authenticate(user=self.user)
#         graph = Graph.objects.create(sq_id=self.streaming_quality)
#         response = self.client.get(f'/api/graph/?sq_id={self.streaming_quality.id}')
#         serializer = GraphSerializer(graph)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, serializer.data)

#     def test_create_graph(self):
#         self.client.force_authenticate(user=self.user)
#         data = {
#             'sq_id': str(self.streaming_quality.id),
#             'download_bitrate': ['bitrate1', 'bitrate2'],
#             'selected_bitrate': ['selected_bitrate1', 'selected_bitrate2'],
#             'buffering_start': ['buffering_start1', 'buffering_start2'],
#             'buffering_end': ['buffering_end1', 'buffering_end2'],
#             'segment_duration': ['segment_duration1', 'segment_duration2'],
#         }
#         response = self.client.post('/api/graph/', data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data['message'], 'Graph information saved successfully')
