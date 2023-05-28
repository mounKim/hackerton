from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
      
class VideoList(models.Model):
    # video_category = models.CharField(max_length=255)
    video_url = models.CharField(max_length=511)
    video_name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="ottwebapp/", blank=True, null=True)
    
    def __str__(self):
        return f"id: {self.id} | name: {self.video_name}"

class VideoCategory(models.Model):
    category = models.CharField(max_length=255)
    videos = models.ManyToManyField(VideoList, related_name = 'video_category', blank=True)

    def __str__(self):
        return f"category: {self.category}"
    
class UserCategory(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    score3 = models.IntegerField(default=0)
    score4 = models.IntegerField(default=0)
    score5 = models.IntegerField(default=0)
    score6 = models.IntegerField(default=0)
    score7 = models.IntegerField(default=0)
    score8 = models.IntegerField(default=0)
    
    def __str__(self):
        return f"user_id: {self.user_id}"
    
class SaveVideo(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.ForeignKey(VideoList, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"user_id: {self.user_id} | video_id: {self.video_id}"
    
class WatchedVideo(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.ForeignKey(VideoList, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"user_id: {self.user_id} | video_id: {self.video_id} | update_at : {self.updated_at}"

class StreamingQuality(models.Model):
    video_id = models.ForeignKey(VideoList, on_delete=models.CASCADE)
    
    # 해당 세션의 content_info
    content_info = models.CharField(max_length=255)

    # 컨텐츠 주소
    video_url = models.CharField(max_length=511)

    # 컨텐츠 정보 받은 시간
    content_date= models.DateTimeField(auto_now_add=True)
    
    # bandwidth
    bandwidth = ArrayField(models.CharField(max_length=10), blank=True)

    # 제공되는 bitrate 정보
    bitrate_resource = ArrayField(models.CharField(max_length=10), blank=True)

    # 컨텐츠의 width와 height
    resolution = ArrayField(models.CharField(max_length=10), blank=True)

    # 스트리밍 종류
    streaming_type = models.CharField(max_length=50)

    # 비디오 스트리밍 프로토콜
    protocol = models.CharField(max_length=50)

    # def __str__(self):
    #     return f"user_id: {self.user_id} | video_id: {self.video_id} | update_at : {self.updated_at}"
