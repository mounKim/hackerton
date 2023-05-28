import React, {useState} from 'react';
import axios from "axios";
import './register.css';
import {
  useNavigate
} from "react-router-dom";
import logo from './logo.png';
import {motion} from 'framer-motion';

function Register() {
  const [email, setemail] = useState("");
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconf, setPasswordconf] = useState("");
  const navigate = useNavigate();

  const handleemailChange = ({ target: {value} }) => {
    setemail(value);
  };

  const handleidChange = ({ target: {value} }) => {
    setid(value);
  };
  const handlepwChange = ({ target: {value} }) => {
    setPassword(value);
  };
  const handlepwcfChange = ({ target: {value} }) => {
    setPasswordconf(value); 
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
    // POST 요청은 body에 실어 보냄
      await axios.post('http://127.0.0.1:8000/account/register/', {
          'username': id,
          'password': password
      })
      .then(function(response) {
        sessionStorage.setItem('user_id', id)
        navigate('../mainpage/')
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className='register_header'>
      <motion.div className="logo_div"
        animate={{scale: [0, 1, 1, 1, 1, 1, 1, 1, 1], rotateZ: [0, 240, 360, 360, 360, 360, 360, 360, 360], y:[100, 100, 100, 100, -20, -50, -50, -50]}}
      >
        <img src={logo} className="logo" alt="logo"/>
      </motion.div>
      <motion.div className="register_motion"
        initial={{y: -100}}
        animate={{opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1]}}
      >
        <h2>San Player</h2>
        <div className='register_box'>
          <h2>회원가입</h2>
          <form method="post" onSubmit={handleSubmit} id="register-form">
            <label htmlFor='userEmail'> Email </label>
            <input type="text" id="userEmail" value={email} onChange={handleemailChange} placeholder="Email" />
            <label htmlFor='userName'> ID </label>
            <input type="text" id="userName" value={id} onChange={handleidChange} placeholder="ID" />
            <label htmlFor='userPassword'> 비밀번호 </label>
            <input type="password" id="userPassword" value={password} onChange={handlepwChange} placeholder="Password" />
            <label htmlFor='userPassword_confirm'> 비밀번호 확인 </label>
            <input type="password" id="userPassword_confirm" value={passwordconf} onChange={handlepwcfChange} placeholder="Password confirm" />
            <label htmlFor='submit'>
            <p>
              {
                /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/.test(email) || email.length === 0?
                '':
                '이메일 형식이 아니에요'
              }
              </p>
              <p>
              {
                /^[a-zA-z0-9]{4,15}$/.test(id) || id.length === 0?
                '':
                '아이디는 4~15자리 영문, 숫자 조합으로 만들어주세요'
              }
              </p>
              <p>
              {
                /^[a-zA-z0-9!@#$%^&*()]{8,15}$/.test(password) || password.length === 0?
                '':
                '비밀번호는 8~15자리 영문, 숫자, 특수문자 조합으로 만들어주세요'
              }
              </p>
              <p>
              {
                ((password === passwordconf) || passwordconf === '')?
                '':
                '비밀번호와 비밀번호 확인칸의 값이 달라요'
              }
              </p>
            </label>
            <input type="submit" id='submit' value="회원가입" disabled={(password !== passwordconf) || password === '' || passwordconf === '' || !/^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/.test(email) || email.length === 0 || !/^[a-zA-z0-9]{4,15}$/.test(id) || id.length === 0} />
          </form>
        </div>
      </motion.div>
    </header>
  );
}

export default Register;
