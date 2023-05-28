# Generated by Django 3.2 on 2023-05-28 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ottwebapp', '0012_alter_videocategory_videos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videocategory',
            name='videos',
            field=models.ManyToManyField(blank=True, related_name='video_category', to='ottwebapp.VideoList'),
        ),
    ]
