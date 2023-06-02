import './mypage.css';
import React from 'react';
import { Link } from "react-router-dom"; 


function Data() {
    return (
        <div className="wrapper data">
            <h2>동영상 품질 데이터</h2>
            <Link to="/chart"> 자세히 보기
                {/* <button id="chart">자세히 보기</button> */}
            </Link>
        </div>
    );
}

export default Data;