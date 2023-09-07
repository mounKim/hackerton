import React from 'react';
import {
    Link
} from "react-router-dom";
import './mainpage.css';
import {motion} from 'framer-motion';
import Cloudimage from './cloud.png';
import Logo from './logo.png';
import User from './user.png';
import axios from 'axios';
import {BsPersonFillGear
} from 'react-icons/bs'


class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                    <Link to={'/mainpage/'}>
                        <h1>ForWord</h1>
                    </Link>
                    <Link to={'/info/'}>
                        <button id="info"><BsPersonFillGear></BsPersonFillGear></button>
                    </Link>
                </header>
                <div class="main_container">
                        <div class="categories">
                            <h2>게시판</h2>
                            <h3>여러 게시판</h3>
                            <ul>
                                <p><a href="/mainpage">베스트게시판</a></p>
                                <p><a href="#">맛집게시판</a></p>
                                <p><a href="#">질문게시판</a></p>
                            </ul>
                            <h3>국가별 게시판</h3>
                            <ul>
                                <p><a href="/viet">베트남갤</a></p>
                                <p><a href="#">중국갤</a></p>
                                <p><a href="#">태국갤</a></p>
                            </ul>
                        </div>
                        <div class="posts">
                            <ul>
                                <p><a href="#">Những điều tôi học được về người Hàn Quốc sau 7 năm làm việc chăm chỉ</a></p>
                                <p><a href="#">Nói thật nhé, nếu bạn không thích bún Hàn thì hãy nhấn like nhé.</a></p>
                                <p><a href="#">Mình bị cảm rồi, phải đi đâu bây giờ?</a></p>
                                <p><a href="#">Tôi có thể khoe khoang về người quản lý nhà máy của mình không?</a></p>
                                <p><a href="#">Đàn ông Việt có được lòng phụ nữ Hàn không?</a></p>
                                <p><a href="#">Võ Văn Thưởng Làm tốt lắm?</a></p>
                                <p><a href="#">Có ai làm việc ở Anyang muốn uống bia sau giờ làm không?</a></p>
                                <p><a href="#">Khi nào các bạn về Việt Nam?</a></p>
                                <p><a href="#">Những ngày này Nguyễn Công Phượng đang thi đấu cho đội nào?</a></p>
                            </ul>
                        </div>
                    </div>
            </div>
        )
    }
}

export default MainPage;
