# REST API 문서 1

# Backend REST API Reference (Ott App)

---

## 1. Video List API

### 1-1. Video List 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA01-1 | /videos | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 비디오 리스트 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버의 Video List 가져오기 API를 호출하면 데이터베이스의 모든 Video에 대해 상세 정보를 응답합니다. 

### Response

- JSON array of video objects
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video_list | Object[] | 데이터베이스에 존재하는 모든 비디오 정보 |
    | - id | Integer | 비디오 object id |
    | - video_url | String | 컨텐츠 주소 |
    | - video_name | String | 컨텐츠 이름 |
    | - video_category | Object | 컨텐츠 카테고리  |
    | - image | Image | 썸네일 이미지 |

---

### 1-2. Video 정보 저장하기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA01-2 | /videos | http://127.0.0.1:8000 | POST |

Video 정보 저장하기는 클라이언트로부터 받은 Video 정보를 지정한 스키마에 맞게 파싱한 후 데이터베이스에 저장하는 API입니다. 

데이터베이스에 저장 요청 받은 컨텐츠 정보인 url, 을 스키마에 맞게 파싱하여 데이터베이스에 Video 정보 세션을 생성하고 해당 정보를 반환합니다. 

### Request

- JSON object containing video data
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video_url | String | 컨텐츠 주소 |
    | video_name | String | 컨텐츠 이름 |
    | video_category | Object | 컨텐츠 카테고리 |
    | image | Image | 썸네일 이미지 |

### Response

- JSON object of the created video
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video | Object | 생성된 비디오 정보 |
    | - id | Integer | 비디오 object id |
    | - video_url | String | 컨텐츠 주소 |
    | - video_name | String | 컨텐츠 이름 |
    | - video_category | Object | 컨텐츠 카테고리 |
    | - image | Image | 썸네일 이미지 |

## 2. Video Detail API

### 2-1. Video Detail 정보 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA02-1 | /videos/{video_id} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 비디오 디테일 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버의 Video detail 가져오기 API를 호출하면 데이터베이스에 저장된 해당 Video의 상세 정보를 응답합니다. 

### Response

- JSON object of the video
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video | Object | 해당하는 비디오 정보 |
    | - id | Integer | 비디오 object id |
    | - video_url | String | 컨텐츠 주소 |
    | - video_name | String | 컨텐츠 이름 |
    | - video_category | Object | 컨텐츠 카테고리  |
    | - image | Image | 썸네일 이미지 |

## 3. Saved Videos API

### 3-1. 사용자의 Saved Videos 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA03-1 | /saved_video/?user_id={user_id} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 사용자가 찜한 비디오 리스트 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버의 사용자의 Saved Videos 가져오기 API를 호출하면 데이터베이스에 저장된 사용자가 찜한 비디오 리스트를 응답합니다. 

### Response

- JSON array of saved video objects
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video_list | Object[] | 해당 사용자가 찜한 모든 비디오 정보 |
    | - id | Integer | 비디오 object id |
    | - video_url | String | 컨텐츠 주소 |
    | - video_name | String | 컨텐츠 이름 |
    | - video_category | Object | 컨텐츠 카테고리  |
    | - image | Image | 썸네일 이미지 |

---

### 3-2. 사용자의 Saved Videos 저장하기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA03-2 | /saved_video | http://127.0.0.1:8000 | POST |

사용자의 Saved Videos 저장하기는 클라이언트로부터 받은 찜하기 요청에 대응하여 User, Video 정보를 지정한 스키마에 맞게 파싱한 후 데이터베이스에 저장하는 API입니다. 

사용자의 id와 찜하기 요청을 받은 비디오 id로 데이터베이스에 SaveVideo 정보 세션을 생성하고 저장합니다. 

### Request

- JSON object containing user_id and video_id
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | user_id | String | 사용자 이름 |
    | video_id | Integer | 비디오 object id |

### Response

- Success message

## 4. Watched Videos API

### 4-1. 사용자의 Watched Videos 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA04-1 | /watched_video/?user_id={user_id} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 사용자가 시청한 비디오 리스트 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버의 사용자의 Watched Videos 가져오기 API를 호출하면 데이터베이스에 저장된 사용자가 시청한 비디오 리스트를 응답합니다. 

### Response

- JSON array of watched video objects
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video_list | Object[] | 해당 사용자가 시청한 모든 비디오 정보 |
    | - id | Integer | 비디오 object id |
    | - video_url | String | 컨텐츠 주소 |
    | - video_name | String | 컨텐츠 이름 |
    | - video_category | Object | 컨텐츠 카테고리  |
    | - image | Image | 썸네일 이미지 |

---

### 4-2. 사용자의 Watched Videos 저장하기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA04-2 | /watched_video | http://127.0.0.1:8000 | POST |

사용자의 Watched Videos 저장하기는 클라이언트가 영상을 시청하면 해당 비디오 정보를 지정한 스키마에 맞게 파싱한 후 데이터베이스에 저장하는 API입니다. 

사용자의 id와 시청한 비디오 id로 데이터베이스에 WatchedVideo 정보 세션을 생성하고 저장합니다. 

### Request

- JSON object containing user_id and video_id
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | user_id | String | 사용자 이름 |
    | video_id | Integer | 비디오 object id |

### Response

- Success message

## 5. Video Category API

### 5-1. Category별 Video 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA05-1 | /video_category/?category={category} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 카테고리별 비디오 리스트 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버에 Category별 Video 가져오기 API를 호출하면 요청받은 카테고리에 해당하는 모든 비디오 리스트를 응답합니다. 

### Response

- JSON array of video objects
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | video_list | Object[] | 카테고리별 모든 비디오 정보 |
    | - id | Integer | 비디오 object id |
    | - video_url | String | 컨텐츠 주소 |
    | - video_name | String | 컨텐츠 이름 |
    | - video_category | Object | 컨텐츠 카테고리  |
    | - image | Image | 썸네일 이미지 |

## 6. User Category API

### 6-1. 사용자의 Category별 선호 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA06-1 | /user_category/?user_id={user_id} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 사용자의 카테고리별 선호도 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버에 사용자의 Category별 선호 가져오기 API를 호출하면 해당 사용자의 Category별 영상 시청 횟수 정보를 응답합니다. 

### Response

- JSON object containing score1 to score8 (8 categories)
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | score1 | Integer | 카테고리1 영상 시청 횟수 |
    | score2 | Integer | 카테고리2 영상 시청 횟수 |
    | score3 | Integer | 카테고리3 영상 시청 횟수 |
    | score4 | Integer | 카테고리4 영상 시청 횟수 |
    | score5 | Integer | 카테고리5 영상 시청 횟수 |
    | score6 | Integer | 카테고리6 영상 시청 횟수 |
    | score7 | Integer | 카테고리7 영상 시청 횟수 |
    | score8 | Integer | 카테고리8 영상 시청 횟수 |

## 7. Streaming Quality API

### 7-1. Streaming Quality 정보 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA07-1 | /streaming_quality/?user_id={user_id} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 사용자가 시청한 비디오의 스트리밍 품질 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버의 Streaming Quality 정보 가져오기 API를 호출하면 데이터베이스에 저장된 사용자가 시청한 비디오의 스트리밍 품질 정보(bitrate resource, resolution, streaming type, protocol)를 응답합니다. 

### Response

- JSON array of streaming quality objects
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | streaming_quality | Object | 해당 사용자가 시청한 비디오의 스트리밍 품질 정보 |
    | - user_id | Object | 사용자 |
    | - video_id | Object | 시청한 비디오 |
    | - video_url | String | 컨텐츠 주소 |
    | - bitrate_resource | String[] | 비트레이트 |
    | - resolution | String[] | 해상도 |
    | - streaming_type | String | 스트리밍 타입 (VOD / LIVE) |
    | - protocol | String | 프로토콜 |

---

### 7-2. Streaming Quality 정보 저장하기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA07-2 | /streaming_quality | http://127.0.0.1:8000 | POST |

Streaming Quality 정보 저장하기는 클라이언트가 시청한 비디오의 스트리밍 품질 정보를 지정한 스키마에 맞게 파싱한 후 데이터베이스에 저장하는 API입니다. 

클라이언트가 비디오를 시청하면, 사용자의 id와 시청한 비디오 id로 데이터베이스에 Streaming Quality 정보(bitrate resource, resolution, streaming type, protocol) 세션을 생성하고 저장합니다. 

### Request

- JSON object containing user_id and video_id
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | user_id | String | 사용자 이름 |
    | video_id | Integer | 비디오 object id |

### Response

- Success message

## 8. Graph API

### 8-1. Streaming Quality Graph 정보 가져오기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA08-1 | /graph/?sq_id={sq_id} | http://127.0.0.1:8000 | GET |

Backend 서버의 데이터베이스에 저장되어 있는 비디오 스트리밍 품질 데이터의 그래프 정보를 가져오는 API입니다. 

Frontend 서버가 backend 서버의 Streaming Quality Graph 정보 가져오기 API를 호출하면 데이터베이스에 저장된 비디오 스트리밍 품질 데이터의 그래프 정보(download bitrate, selected bitrate, buffering start, buffering end, segment duration)를 응답합니다. 

### Response

- JSON array of streaming quality objects
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | graph | Object | 비디오 스트리밍 품질 데이터의 그래프 정보 |
    | - download_bitrate | String[] | 다운로드 비트레이트 |
    | - selected_bitrate | String[] | 비트레이트 |
    | - buffering_start | String[] | 버퍼링 시작 |
    | - buffering_end | String[] | 버퍼링 끝 |
    | - segment_duration | String[] | 세그먼트 기간 |

---

### 8-2. Streaming Quality Graph 정보 저장하기

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA08-2 | /graph | http://127.0.0.1:8000 | POST |

Streaming Quality Graph 정보 저장하기는 클라이언트가 시청한 비디오의 그래프 스트리밍 품질 정보를 파싱한 후 데이터베이스에 저장하는 API입니다. 

클라이언트가 비디오를 시청하면, 해당 비디오의 품질 정보와 함께 데이터베이스에 Streaming Quality Graph 정보(download bitrate, selected bitrate, buffering start, buffering end, segment duration) 세션을 생성하고 저장합니다. 

### Request

- JSON object containing sq_id
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | sq_id | String | 비디오 품질 정보 object id |

### Response

- Success message