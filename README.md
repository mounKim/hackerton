# san_player

참고링크 (https://github.com/Hosang10Lee/opennotes/tree/main/termproject)


|이름|학번|역할|
|---|---|---|
|김산|2019147507|front, 해상도 설정 기능 담당|
|박민수|2020147545|front, 배속 기능 담당|
|박서정|2020147509|back, DB, 스트리밍 품질 데이터 저장 기능 담당|
|이수민|2020144055|back, 스트리밍 품질 데이터 시각화 기능 담당|

---
## Structures
### - Front : react
### - Back : django
### - DB : postgresql (elephantsql 서버 이용)
----

## Documents
[설계문서](https://github.com/ConnectedWithMinsu/san_player/blob/main/docs/%EC%84%A4%EA%B3%84%EB%AC%B8%EC%84%9C.md)

[RestAPI1문서](https://github.com/ConnectedWithMinsu/san_player/blob/main/docs/REST%20API%20%EB%AC%B8%EC%84%9C%201.md)

[RestAPI2문서](https://github.com/ConnectedWithMinsu/san_player/blob/main/docs/REST%20API%20%EB%AC%B8%EC%84%9C%202.md)

[테스트 계획 문서](https://github.com/ConnectedWithMinsu/san_player/blob/main/docs/Test%20Plan%20Document.md)

## PPT
[발표자료 PPT](https://docs.google.com/presentation/d/1O3G2xlnOTeLFOeFv36_ENvAmfFoTIOCvW4miZH2I1mU/edit#slide=id.g24e9619ce63_0_53)

## Environment
```
conda create -n ott python=3.8
```
```
conda activate ott
pip install -r requirements.txt
```

# terminal 1: run frontend
```
cd front/sanplayer/
npm install
npm start
```

# termial 2: run backend
```
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
python manage.py collectstatic
```

# Connect !
http://localhost:3000/mainpage
