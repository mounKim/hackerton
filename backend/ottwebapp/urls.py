from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('videos/', VideoListView.as_view()),
    path('videos/<int:pk>/', VideoDetailView.as_view()),
    path('my_page/', SaveVideoView.as_view()),
    path('watched_video/', WatchedVideoView.as_view()),
    path('video_category/', VideoCategoryView.as_view()),
    path('user_category/', UserCategoryView.as_view()),

    # path('streaming_quality/', StreamingQualityView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)