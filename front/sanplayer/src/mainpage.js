import React from 'react';
import './mainpage.css';
import {motion} from 'framer-motion';
import Cloudimage from './cloud.png';
import Logo from './logo.png';
import User from './user.png';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import {BsPersonFillGear
} from 'react-icons/bs'


class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <body>
                    <header>
                        <h1 href="/mainpage">ForWord</h1>
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
                                <p><a href="#">(베스트)게시글 1</a></p>
                                <p><a href="#">(베스트)게시글 2</a></p>
                                <p><a href="#">(베스트)게시글 3</a></p>
                            </ul>
                        </div>
                    </div>
                
                </body>
            </div>
        )
    }
}

export default MainPage;
