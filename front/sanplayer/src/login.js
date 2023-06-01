import './login.css';
import React, {useState} from 'react';
import {
  Link, useNavigate
} from "react-router-dom";
import logo from './logo.png';
import axios from "axios";
import {motion} from 'framer-motion';

function Login() {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleidChange = ({ target: {value} }) => {
    setid(value);
  };
  const handlepwChange = ({ target: {value} }) => {
    setPassword(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
    // POST 요청은 body에 실어 보냄
      await axios.post('http://127.0.0.1:8000/account/login/', {
          'username': id,
          'password': password
      })
      .then(function(response) {
        sessionStorage.setItem('user_id', id)
        navigate('../mainpage/')
      });
    } catch (e) {
      alert('아이디/비밀번호가 맞지 않아요\n 다시 입력해주세요')
    }
  };

  return (
    <header className='login_header'>
      <motion.div className="logo_div"
        animate={{scale: [0, 1, 1, 1, 1, 1, 1, 1, 1], rotateZ: [0, 240, 360, 360, 360, 360, 360, 360, 360], y:[100, 100, 100, 100, -20, -50, -50, -50]}}
      >
        <img src={logo} className="logo" alt="logo"/>
      </motion.div>
      <motion.div className="login_motion"
        initial={{y: -100}}
        animate={{opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1]}}
      >
        <h2>San Player</h2>
        <div className='login_box'>
          <h2>Login</h2>
          <form method="post" onSubmit={handleSubmit} id="login-form">
            <input type="text" name="userName" value={id} onChange={handleidChange} placeholder="ID" />
            <input type="password" name="userPassword" value={password} onChange={handlepwChange} placeholder="Password" />
            {/* <label htmlFor="remember-check">
              <input type="checkbox" id="remember-check" /> 아이디 저장하기
            </label> */}
            {/* <span width="100px" height="50px"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  */}
            <input type="submit" value="Login"/>
            <Link to={"../register"} style={{ fontSize: "16px", textDecoration: "none" }}>회원가입</Link>
          </form>
        </div>
      </motion.div>
    </header>
  );
}

export default Login;
