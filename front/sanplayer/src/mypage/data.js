import React from 'react';
import { Link } from "react-router-dom"; 


function Data() {
    return (
        <div className="wrapper">
            <h2>동영상 품질 데이터</h2>
            <Link to="/chart">
                <button id="chart">자세히 보기</button>
            </Link>
        </div>
    );
}

export default Data;