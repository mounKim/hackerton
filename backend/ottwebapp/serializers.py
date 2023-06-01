from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCategory
        fields = ('category',)

# class SaveVideoSerializer(serializers.ModelSerializer):
#     video_category = CategorySerializer(many=True, required=False)

#     class Meta:
#         model = SaveVideo
#         fields = ('user_id',
#                   'video_id',
#                   'video_category')

class WatchedVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchedVideo
        fields = ('updated_at',)
        
class VideoListSerializer(serializers.ModelSerializer):
    video_category = CategorySerializer(many=True, read_only=True)
    # id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # image = serializers.SerializerMethodField()

    class Meta:
        model = VideoList
        fields = ('id',
                  'video_url',
                  'video_name',
                  'video_category',
                  'image')

class UserCategorySerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = UserCategory
        fields = ('score1', 'score2', 'score3', 'score4', 'score5', 'score6', 'score7', 'score8')

class StreamingQualitySerializer(serializers.ModelSerializer):
    video_id = WatchedVideoSerializer(many=False, read_only=True)
    
    class Meta:
        model = StreamingQuality
        fields = '__all__'

class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graph
        fields = ('download_bitrate', 'selected_bitrate', 'buffering_start', 'buffering_end', 'segment_duration')