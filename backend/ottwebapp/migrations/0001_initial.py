# Generated by Django 3.2 on 2023-06-01 14:23

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_url', models.CharField(max_length=511)),
                ('video_name', models.CharField(max_length=255)),
                ('image', models.ImageField(blank=True, null=True, upload_to='ottwebapp/')),
            ],
        ),
        migrations.CreateModel(
            name='WatchedVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('video_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottwebapp.videolist')),
            ],
        ),
        migrations.CreateModel(
            name='VideoCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=255)),
                ('videos', models.ManyToManyField(blank=True, related_name='video_category', to='ottwebapp.VideoList')),
            ],
        ),
        migrations.CreateModel(
            name='UserCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score1', models.IntegerField(default=0)),
                ('score2', models.IntegerField(default=0)),
                ('score3', models.IntegerField(default=0)),
                ('score4', models.IntegerField(default=0)),
                ('score5', models.IntegerField(default=0)),
                ('score6', models.IntegerField(default=0)),
                ('score7', models.IntegerField(default=0)),
                ('score8', models.IntegerField(default=0)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StreamingQuality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_url', models.CharField(max_length=511)),
                ('bitrate_resource', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('resolution', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('streaming_type', models.CharField(max_length=10)),
                ('protocol', models.CharField(max_length=5)),
                ('user_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('video_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottwebapp.watchedvideo')),
            ],
        ),
        migrations.CreateModel(
            name='SaveVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('video_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottwebapp.videolist')),
            ],
        ),
        migrations.CreateModel(
            name='Graph',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('download_bitrate', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('selected_bitrate', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('buffering_start', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('buffering_end', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('segment_duration', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), blank=True, size=None)),
                ('sq_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottwebapp.streamingquality')),
            ],
        ),
    ]
