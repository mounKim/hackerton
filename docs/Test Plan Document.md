# Test Plan Document

## **1. Introduction**

이 document는 San Player라는 Django로 backend 를, React 로 frontend를 구성한 키즈 컨테츠 OTT 플랫폼의 기능 및 요구사항을 testing 하기 위한 계획에  대한 가이드라인 및 결과를 제공하기 위해 작성되었다.

## 2. **Test Approach and Objectives**

Testing phase와 각 testing phase의 목적은 다음과 같다.

- Unit Test : individual components의 functionality와 correctness을 검증하기
- Integration Test : 여러 component 간을 integration 해보고 적절하게 interaction이 되는지 확인하기
- System Test : use case를 이용하여 요구사항에 맞게 전체적인 system이 잘 작동하는지 확인하기

## 3**. Test Scope**

Testing 하고자 하는 component들은 다음과 같다.

- Frontend
    - Components : LoginComponent, MypageComponent, ChartComponent, GraphComponent, VideosComponent, VideoComponent, RegisterComponent, MainpageComponent
- Backend
    - Models : VideoList, VideoCategory, UserCategory, SaveVideo, WatchedVideo, StreamingQuality, Graph.
    - Views : VideoListView, VideoDetailView, SaveVideoView, WatchedVideoView, VideoCategoryView, UserCategoryView, StreamingQualityView, GraphView

## 4**. Test Environment**

Test 환경은 다음과 같다.

- Frontend : React framework
- Backend : Django framework (version : 3.2)
- Python 3.8
- Database : PostgreSQL
    - unit test와 integration에 사용되는 DB는 local이다. (DB name : test_SanPlayer)
        
        ![Untitled](/docs/TestPlan/Untitled.png)
        
    - system test 및 사용자의 실제 앱 구동시에는 eleplantSQL의 서버를 이용한다. (DB name : opuasmgb)
    
    ![Untitled](/docs/TestPlan/Untitled%201.png)
    
- Unit & Integration Testing frameworks : Django Test Framework
- System Test : use cases

## 5**. Test Cases**

### 5**.1 Unit Tests**

- Model Unit Tests:
    - 각 Model class에 instances를 만들어주고, 생성된 instances의 각 col 값들이 원하는 대로 저장이 되었는지 테스트 한다.
    
    | Test Case ID | Model Class | Test Name | Description | Test Data |
    | --- | --- | --- | --- | --- |
    | BACK-M-01 | User | user의 정보를 DB에 저장하기 | test data의 id 와 db에 저장된 instance의 id가 같은지 확인한다. password는 hashed 되어 db에 저장되기 때문에, django.contrib.auth.hashers 라이브러리 속 check_password 함수를 이용하여 db의 hashed 된 password과 test data의 password와 같은지 확인한다. | self.user = User.objects.create_user(username='testuser', password='testpassword') |
    | BACK-M-02 | VideoList | Video 정보를 DB에 저장하기 | test data의 비디오 url 와 db에 저장된 instance의 비디오 url이 같은지 확인한다. 
    test data의 비디오 name 와 db에 저장된 instance의 비디오 name이 같은지 확인한다.  | self.video_list = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video') |
    | BACK-M-03 | VideoCategory | 카테고리 이름과 그 카테고리 안에 속한 video 정보들을 DB에 저장하기 | test data의 카테고리와 db에 저장된 instance의 카테고리가 같은지 확인한다. <br>    test data의 카테고리에 속하는 VideoList instance의 개수와 db에 저장된 카테고리 속 VideoList instance의 개수의 개수가 같은지 확인한다. (개수는 1로 설정)<br>    test data의 카테고리 속 VideoList instance 들  중 첫번째 instance가 db에 저장된 카테고리 속 VideoList instance의 첫번째와 같은지 확인한다. | self.video_category = VideoCategory.objects.create(category='TestCategory')<br>    self.video_category.videos.set([self.video_list]) |
    | BACK-M-04 | UserCategory | USER별 8개의 카테고리의 score를 DB에 저장하기 | test data의  user instance와 db에 저장된 user instance가 같은지 확인한다. <br>    8개의 score 값이 모두 초깃값인 0으로 할당이 잘 되었는지 확인한다. | self.user_category = UserCategory.objects.create(user_id=self.user) |
    | BACK-M-05 | SaveVideo | USER가 찜한 비디오를 DB에 저장하기 | test data의  user instance와 db에 저장된 user instance가 같은지 확인한다. <br>    test data의  videolist instance와 db에 저장된 videolist instance가 같은지 확인한다.  | self.save_video = SaveVideo.objects.create(user_id=self.user, video_id=self.video_list) |
    | BACK-M-06 | WatchedVideo | USER가 어떤 비디오를 언제 시청하였는지 DB에 저장하기 | BACK-UT-M-05 와 동일하게 확인해주고 추가로 update_date을 확인해준다. instance가 생성될 때의 시간을 test_date()에 저장해두고, 이를 db에 저장된 update_at field 에서의 년/월/일/시/분 이 같은지 확인한다. | self.test_time = datetime.datetime.now()<br>    self.watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.video_list) |
    | BACK-M-07 | StreamingQuality | USER가 시청했던 동영상들의 기본 mainfest 정보들을 DB에 저장 | test data의  user와 watched_video instance들과 와 db에 저장된 user와 watched_video  instance가 같은지 확인한다. <br>    <br>    test data의  url, bitrate, resolution, streaming_type, protocol이  db에 저장된 값들과 같은지 확인한다.  | self.streaming_quality = StreamingQuality.objects.create(user_id=self.user,<br>    video_id=self.watched_video,<br>    video_url='https://example.com/video',<br>    bitrate_resource = ['1', '2', '3'],<br>    resolution = ['180X360','360X720', '720X1080'],<br>    streaming_type = 'live',<br>    protocol = 'hls'<br>    ) |
    | BACK-M-08 | Graph | 기본 정보를 저장했었던 비디오에 대해서 더욱 상세한 동영상 스트리밍 품질 정보를 DB에 저장하기 | test data의   streaming_quality instance들과 와 db에 저장된 것이 같은지 확인한다. <br>    <br>    test data의 download_bitrate, selected_bitrate, buffering_start, buffering_end, segment_duration이  db에 저장된 값들과 같은지 확인한다.  | self.graph = Graph.objects.create(sq_id=self.streaming_quality,<br>    download_bitrate = ['1', '2', '3'],<br>    selected_bitrate = ['4', '5', '6'],<br>    uffering_start = ['7', '8', '9'],<br>    buffering_end = ['10', '11', '12'],<br>    segment_duration = ['13', '14', '15'],) |
- View Unit Tests:
    - 모든 view 마다 APIClient를 생성하고, test에 필요한 instances들을 만들어서 GET/POST request 에 대해 의도하는 대로 작동하는지 테스트 한다.
    - GET request에 대해서는 db에서 client가 원하는 data를 가져와서 serializer를 통해 변환 후 client에게 전송한다. 이 때 status code가 HTTP 200 OK가 맞는지와 serializer를 통해 변환 후 전송 전 data와 GET 요청을 통해 받은 response data의 내용일 일치하는지를 확인함으로써 정상 작동을 테스트 한다.
    - POST request에 대해서는 특정 user로 인증된 상태에서 client로부터 전달받은 data를 db에 저장한다. 이 때 status code가 HTTP 201 CREATED가 맞는지와 client가 보낸 data와 실제 POST 요청을 통해 받은 response data의 내용일 일치하는지를 확인함으로써 정상 작동을 테스트 한다.
    
    | Test Case ID | API | GET/POST | Test Name | Description | Test Data |
    | --- | --- | --- | --- | --- | --- |
    | BACK-V-01 | videos/ | GET | DB의 모든 video를 client로 보내주기 | GET요청을 통해 받은 비디오 목록(response)와 DB에서 serializer를 거친 값을 비교한다. 또한 status code가 200 OK인지 확인한다. | - |<br>    | - | videos/ | POST | - | Client에서 비디오 목록을 받는 경우는 존재하지 않음 | - |
    | BACK-V-02 | videos/int:pk/ | GET | 특정 id의 비디오 하나만 DB에서 client로 보내주기 | url에 원하는 video id를 포함한 GET요청을 통해 받은 Video instance와 DB에서 serializer를 거친 값을 비교한다. 또한 status code가 200 OK인지 확인한다. | self.video = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video')<br>    <br>    response = self.client.get(f'http://127.0.0.1:8000/videos/%7Bself.video.id%7D/') |
    | BACK-V-03 | videos/int:pk/ | GET | 특정 id의 비디오 하나만 DB에서 client로 보내주기 - 특정 id의 비디오가 없는 경우 | DB에 저장되지 않은 video id인 999를 url에 포함시켜 GET요청을 보냈을 때 status code가 404 Not Found 인지 확인한다. | response = self.client.get('/api/video-detail/999/') |<br>    |  | videos/int:pk/ | POST | - |  |  |
    | BACK-V-04 | saved_video/ | GET | 찜한 동영상 목록을 DB에서 client 로 보내주기 | url에 원하는 user id를 포함한 GET요청을 통해 받은 찜한 video 목록과 DB에서 user가 찜한 비디오들의 목록을 serializer에 거친 값을 비교한다. 또한 status code가 200 OK인지 확인한다. | self.get_test_video = VideoList.objects.create(video_url='https://example.com/get_video', video_name='GET Test Video') |
    | BACK-V-05 | saved_video/ | POST | 동영상 찜하기 (DB에 찜한 기록 저장하기) | user id와 찜하고자하는 video id과 함께 POST 요청을 보내면 status code가 201 CREATED 인지, success라는 message가 왔는지 확인한다. | data = {'user_id': 'testuser', 'video_id': str(self.post_test_video.id)} |
    | BACK-V-06 | watched_video/ | GET | 시청했던 비디오 목록을 DB에서 client로 보내주기 | url에 원하는 user id를 포함한 GET요청을 통해 받은 시청했던 video 목록과 DB에서 user가 시청한 동영상 목록을  serializer에 거친 값을 비교한다. 또한 status code가 200 OK인지 확인한다. | self.get_test_video = VideoList.objects.create(video_url='https://example.com/get_video', video_name='GET Test Video') |
    | BACK-V-07 | watched_video/ | POST | 시청한 영상을 DB에 저장하기<br>    <br>    & 시청한 영상의 카테고리 score 높이고, 그 값을 DB에 저장하기 | test할 때 쓸 video 하나를 만들고, category와 그 category에 속하는 video가 아까 만든 video가 되도록 설정한다. 이제 user id와 그 video id를 포함한 POST 요청을 받았을 때 status code가 201 Created 이고, message가 success 인지 확인한다. 또한 user의 category 점수를 봤을 때 그 video가 속한 category의 scroe가 올라갔는지 확인한다. | self.post_test_video = VideoList.objects.create(video_url='https://example.com/post_video', video_name='POST Test Video')<br>    self.video_category = VideoCategory.objects.create(category='Comedy and Entertainment')<br>    self.video_category.videos.set([self.post_test_video])<br>    self.user_category = UserCategory.objects.create(user_id=self.user) |
    | BACK-V-08 | video_category/ | GET | 요청받은 카테고리 속 비디오 목록을 DB에서 client 로 보내주기  | 카테고리 이름을 url에 포함시킨 GET 요청을 통해 받은 그 카테고리 속 비디어 목록과, DB안의 그 카테고리의 비디오 목록을 serializer에 거친 값을 비교한다. 또한 status code가 200 OK인지 확인한다. | self.video_category = VideoCategory.objects.create(category='TestCategory')<br>    self.video = VideoList.objects.create(video_url='https://example.com/video', video_name='Test Video')<br>    self.video_category.videos.add(self.video) |
    | BACK-V-09 | video_category/ | GET | 요청받은 카테고리 속 비디오 목록을 DB에서 client 로 보내주기 - 카테고리 이름이 잘못된 경우 | GET 요청 속 카테고리 이름이 DB에 없는 카테고리 이름인 경우 status code가 400 Not Found 인지  확인한다. | self.client.get('http://127.0.0.1:8000/video_category/?category=InvalidCategory') |
    | BACK-V-10 | user_category/ | GET | 카테고리별 score들을 DB에서 client로 보내주기 | user id를 url에 포함시킨 GET 요청을 통해 받은 카테고리 별 score 값이 DB에 저장된 유저의 카테고리 별 scroes을 serializer에 거친 값들과 동일한지 확인한다 또한 status code가 200 OK인지 확인한다. | self.user_category = UserCategory.objects.create(user_id=self.user, score1=1, score2=2, score3=3, score4=4, score5=5, score6=6, score7=7, score8=8) |
    | BACK-V-11 | streaming_quality/ | GET | 시청한 영상에 대한 기본 manifest 정보들 DB에서 client로 보내기 | user id를 url에 포함시킨 GET 요청을 통해 받은 스트리밍 품질 데이터와 DB에 저장된 비디오의 스트리밍 품질 데이터를 serializer에 거친 값들과 동일한지 확인한다 또한 status code가 200 OK인지 확인한다. | self.get_test_video = VideoList.objects.create(video_url='https://example.com/video', video_name='GET Test Video')<br>    self.get_test_watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.get_test_video)<br>    self.client.force_authenticate(user=self.user)<br>    streaming_quality = StreamingQuality.objects.create(user_id=self.user,<br>    video_id=self.get_test_watched_video,<br>    video_url='https://example.com/video',<br>    bitrate_resource = ['1', '2', '3'],<br>    resolution = ['180X360','360X720', '720X1080'],<br>    streaming_type = 'live',<br>    protocol = 'hls'<br>    ) |
    | BACK-V-12 | streaming_quality/ | POST | 시청하고 있는 영상의 기본 manifest 정보를 DB에 저장하기 | test할 때 쓸 video 하나를 만들고, 그video를watched video에 추가한다. 그리고 그 video를 시청할 때 생성되는 스트리밍 품질 데이터를 준비한다.<br>    <br>    이제 만든 user id와 스트리밍 품질 데이터를 포함한 POST 요청을 받았을 때 status code가 201 Created 이고, message가 success 인지 확인한다.  | self.post_test_watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.post_test_video)<br>    data = {<br>    'user_id': self.user.username,<br>    'video_id': self.post_test_video.id,<br>    'video_url': self.post_test_video.video_url,<br>    'bitrate_resource' : ['1', '2', '3'],<br>    'resolution' : ['180X360','360X720', '720X1080'],<br>    'streaming_type': 'vod',<br>    'protocol': 'hls'<br>    }) |
    | BACK-V-13 | graph/ | GET | 특정  비디오의 스트리밍 품질 데이터를 DB에서 client로 보내주기 | streaming quality instand id id를 url에 포함시킨 GET 요청을 통해 받은 실시간 스트리밍 품질 그래프 데이터와 DB에 저장된 비디오의 실시간 스트리밍 품질 그래프 데이터를 serializer에 거친 값들과 동일한지 확인한다 또한 status code가 200 OK인지 확인한다. | self.streaming_quality = StreamingQuality.objects.create(user_id=self.user,<br>    video_id=self.watched_video)<br>    graph = Graph.objects.create(sq_id=self.streaming_quality,<br>    download_bitrate = ['1', '2', '3'],<br>    selected_bitrate = ['4', '5', '6'],<br>    buffering_start = ['7', '8', '9'],<br>    buffering_end = ['10', '11', '12'],<br>    segment_duration = ['13', '14', '15'],) |
    | BACK-V-14 | graph/ | POST | 특정 비디오의 스트리밍 품 데이터를 DB에 저장하기  | test할 때 쓸 streaming quality instance를 하나 만든다.<br>    <br>    이제 만든 streaming quality instance id를 포함한 POST 요청을 받았을 때 status code가 201 Created 이고, message가 success 인지 확인한다.  | self.streaming_quality = StreamingQuality.objects.create(user_id=self.user,<br>    video_id=self.watched_video)<br>    data = {<br>    'sq_id': self.streaming_quality.id,<br>    'download_bitrate': [4, 5, 6],<br>    'selected_bitrate': [7, 8, 9],<br>    'buffering_start': [10, 11, 12],<br>    'buffering_end': [13, 14, 15],<br>    'segment_duration': [16, 17, 18],<br>    }<br>    <br>    data = {<br>    'sq_id': self.streaming_quality.id,<br>    'download_bitrate': [4, 5, 6],<br>    'selected_bitrate': [7, 8, 9],<br>    'buffering_start': [10, 11, 12],<br>    'buffering_end': [13, 14, 15],<br>    'segment_duration': [16, 17, 18],<br>    } |

### 5**.2 Integration Tests**

Unit Test에서 확인하지 못했던 여러 Model 간의 Integration(특히 foreign key 매칭)이 올바르게 잘 되었는지를 집중적으로 testing 해본다.

| Test Case ID | Model Class | Test Name | Description | Test Data |
| --- | --- | --- | --- | --- |
| BACK-IT-01 |  VideoList, VideoCategory | VideoList와 VideoCategory의 interaction 확인하기 | Video의 Category들이 제대로 나오는지 확인한다. | self.video_category = VideoCategory.objects.create(category='Comedy and Entertainment') <br>self.video_category.videos.set([self.video])<br>self.video_category2.videos.set([self.video])  |
| BACK-IT-02 | UserCategory, WatchedVideo, User  | WatchedVideo와 UserCategory의 interaction 확인하기 | Watched에 post 요청을 처리 전후의 카테고리들의 score 값을 비교함으로써, 시청할 경우 그 비디오의 카테고리에 해당하는 score가 하나 씩 올라가는 지 확인하기 | BACK-IT-01의 Test Data<br>self.user_category = UserCategory.objects.create(user_id=self.user, score1=0, score2=0, score3=0, score4=0, score5=0, score6=0, score7=0, score8=0)<br>self.watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.video) ( |
| BACK-IT-03 | StreamingQuality, WatchedVideo | StreamingQuality와 WatchedVideo의 interaction 확인하기 | StreamingQuality가 foreign key로 가지고 있는 WatchedVideo instance가 제대로 되었는지 확인한다. | self.watched_video = WatchedVideo.objects.create(user_id=self.user, video_id=self.video)<br>self.streaming_quality = StreamingQuality.objects.create(user_id=self.user,<br>video_id=self.watched_video) |
| BACK-IT-04 | Graph, StreamingQuality | Graph와 StreamingQuality의 interaction 확인하기 | Graph가 foreign key로 가지고 있는  Streaming Quality instance가 제대로된 Streaming Quality가 instance가 맞는지 확인한다. | self.streaming_quality = StreamingQuality.objects.create(user_id=self.user,<br>video_id=self.watched_video)<br>self.graph = Graph.objects.create(sq_id=self.streaming_quality) |

### 5**.3 System Tests**

Backend의 전체적인 api들이 Frontend의 사용자 interaction안에서 제대로 작동되는지 use case를 기반으로 test한다.

| Test Case ID | Test Step | Expected Result |
| --- | --- | --- |
| Front-ST-01 | 사용자가 로그인을 한다. | mainpage로 이동한다. |
| Front-ST-02 | 사용자가 회원가입을 한다. | mainpage로 이동한다. |
| Front-ST-03 | 사용자가 유효하지 않은 방식으로 회원가입을 한다. | 올바른 정보를 입력할 것을 요구한다. |
| Front-ST-04 | 사용자가 mainpage 로고를 누른다. | mainpage로 이동한다. |
| Front-ST-05 | 사용자가 mypage 로고를 누른다. | 데이터베이스에 저장된 재생기록과 저장동영상과 일치하는 목록을 출력한다. |
| Front-ST-06 | 사용자가 특정 카테고리의 동영상을 시청한다. | - 추천 영상 알고리즘에 맞게 mainpage의 카테고리 GUI가 조정된다.<br>- 시청하는 동영상의 스트리밍 품질 데이터가 서버로 전달된다. <br>- 시청하는 동영상의 정보가 서버에 전달되어 mypage의 영상 시청 목록에 반영된다. <br>- 현재 미디어 컨텐츠와 연관된 다른 미디어 컨텐츠의 목록을 서버에서 전달받아 출력한다.<br><br>*전달하는 스트리밍 품질 데이터는 아래와 같다.<br>- downloadBitrate<br>- selectedBitrate<br>- bufferingStart<br>- bufferingEnd<br>- segmentDuration<br>- BitrateResource<br>- Resolution(Width X Height)<br>- StreamType |
| Front-ST-07 | 사용자가 mainpage에서 특정 카테고리의 정보를 담은 산을 선택한다. | 해당 카테고리에 맞는 동영상의 목록이 산 아래에 출력된다. |
| Front-ST-08 | 사용자가 Front-ST-07 이후 등장한 동영상 중 하나를 선택한다. | 해당 동영상을 시청하는 페이지로 이동한다. |
| Front-ST-09 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어에서 재생/정지 버튼을 누른다. | 영상이 재생/정지된다. |
| Front-ST-10 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어에서 5초 앞으로 가기/뒤로 가기 버튼을 누른다. | 영상이 5초 앞으로 가기/뒤로 가기된다. |
| Front-ST-11 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어에서 볼륨을 조정한다. | 영상의 볼륨이 변경된다. |
| Front-ST-12 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어에서 재생 속도를 변경한다. | 영상의 재생 속도가 변경된다. |
| Front-ST-13 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어에서 해상도를 변경한다. | 영상의 해상도가 변경된다. |
| Front-ST-14 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어에서 좋아요를 누른다/해제한다. | 해당 정보가 서버에 전달되어 mypage의 영상 저장 목록에 반영된다. |
| Front-ST-15 | 사용자가 Front-ST-08 이후 등장한 미디어 플레이어 우측의 추천 영상에서 타 동영상을 누른다. | 해당 동영상을 시청하는 페이지로 이동한다. |
| Front-ST-16 | 사용자가 Front-ST-05 이후 등장한 mypage에서 로그아웃을 누른다. | 로그아웃을 수행하고, login으로 이동한다. |
| Front-ST-17 | 사용자가 Front-ST-05 이후 등장한 mypage에서 시청 기록/좋아요 목록 동영상을 누른다. | 해당 동영상을 시청하는 페이지로 이동한다. |
| Front-ST-18 | 사용자가 Front-ST-05 이후 등장한 mypage에서 미디어 품질 데이터 목록 조회 버튼을 누른다. | 서버로부터 미디어 품질 데이터 목록을 받아 표 형식으로 출력한다.<br><br>*이 때 출력하는 항목들은 아래와 같다.<br>- Session Id<br>- URL<br>- Playback Date<br>- Bitrate Resource<br>- Resolution(Width X Height)<br>- Stream Type<br>- Protocol |
| Front-ST-19 | 사용자가 Front-ST-18 이후 등장한 품질 조회 페이지에서 mypage 로고를 누른다. | 사용자가 Front-ST-18 이후 등장한 품질 조회 페이지에서 mypage 로고를 누른다.데이터베이스에 저장된 재생기록과 저장동영상과 일치하는 목록을 출력한다. |
| Front-ST-20 | 사용자가 Front-ST-18 이후 등장한 품질 조회 페이지에서 원하는 항목을 선택한다. | 현재 미디어 품질 데이터를 그래프의 형식으로 표현한다.<br><br>*이 때 아래의 항목들을 y축 값으로 사용하고, x축 값으로는 시간을 사용한다.<br>- selected_bitrate<br>- download_bitrate<br>- buffering_start<br>- buffering_end |
| Front-ST-21 | 사용자가 Front-ST-20 이후 등장한 품질 그래프 페이지에서 go back to table 버튼을 누른다. | 서버로부터 미디어 품질 데이터 목록을 받아 표 형식으로 출력한다.<br><br>*이 때 출력하는 항목들은 아래와 같다.<br>- Session Id<br>- URL<br>- Playback Date<br>- Bitrate Resource<br>- Resolution(Width X Height)<br>- Stream Type<br>- Protocol |

## 6**. Test Execution Results**

test code : [https://github.com/ConnectedWithMinsu/san_player/blob/main/backend/ottwebapp/tests.py](https://github.com/ConnectedWithMinsu/san_player/blob/main/backend/ottwebapp/tests.py)

- Unit Tests 결과
    - testing model
        
        ![Untitled](/docs/TestPlan/Untitled%202.png)
        
    - testing view(api)
        
        ![Untitled](/docs/TestPlan/Untitled%203.png)
        
- Integration Tests 결과
    - test integrations
        
        ![Untitled](/docs/TestPlan/Untitled%204.png)
        
    - Total Coverage
        
        ![Untitled](/docs/TestPlan/Untitled%205.png)
        
- System Tests 결과
    
    ![Untitled](/docs/TestPlan/Untitled%206.png)
    
    ID 1, 2, 4, 6의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%207.png)
    
    ID 3의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%208.png)
    
    ID 5, 14, 19의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%209.png)
    
    ID 7의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%2010.png)
    
    ID 8, 9, 10, 15, 17의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%2011.png)
    
    ID 12, 13의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%2012.png)
    
     ID 16의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%2013.png)
    
    ID 18, 20의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%2014.png)
    
    ID 21의 결과 : Success
    
    ![Untitled](/docs/TestPlan/Untitled%2015.png)