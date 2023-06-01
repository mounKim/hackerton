from django.contrib import admin
from .models import VideoList, SaveVideo, WatchedVideo, VideoCategory, UserCategory, StreamingQuality, Graph

# Register your models here.
admin.site.register(VideoList)
admin.site.register(SaveVideo)
admin.site.register(WatchedVideo)
admin.site.register(VideoCategory)
admin.site.register(UserCategory)
admin.site.register(StreamingQuality)
admin.site.register(Graph)