import React from 'react';
import axios from "axios";
import {
    useNavigate
} from "react-router-dom";

const User_Info = () => {
    const navigate = useNavigate();

    const handle_logout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/account/logout/');
        } catch (e) {
            console.log(e);
        }
        sessionStorage.removeItem('user_id');
        navigate('/login');
    }

    return(
        <div className='userinfo_box'>
            <div id = "user_info">{sessionStorage.getItem('user_id')} 님 <br></br>안녕하세요!</div>
            <div id = "logoutdiv">
                <button className="logout" onClick={handle_logout}>로그아웃</button>
            </div>
        </div>
    )
}

export default User_Info;
