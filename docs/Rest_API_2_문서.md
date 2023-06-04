# REST API 문서 2

# Backend REST API Reference (Account App)

---

## 1. User Login API

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA09-1 | /account/login | http://127.0.0.1:8000 | POST |

클라이언트로부터 username과 password를 받아 인증 여부 확인 후 로그인합니다.

### Request

- JSON object containing username, password
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | username | String | 유저 아이디 |
    | password | String | 유저 비밀번호 |

### Response

- Success / Error message

## 2. User Logout API

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA09-2 | /account/logout | http://127.0.0.1:8000 | POST |

로그아웃합니다.

### Request

- None

### Response

- Success message

## 3. User SignUp API

| ID | URL | HOST | METHOD |
| --- | --- | --- | --- |
| BA09-3 | /account/register | http://127.0.0.1:8000 | POST |

클라이언트로부터 username과 password를 받아 회원가입하고 로그인합니다.

### Request

- JSON object containing username, password
    
    
    | Name | Type | Description |
    | --- | --- | --- |
    | username | String | 유저 아이디 |
    | password | String | 유저 비밀번호 |

### Response

- Success message