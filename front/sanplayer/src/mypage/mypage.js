import './mypage.css';
import {
    Link
} from "react-router-dom";
import React from 'react';
import View from './view';
import Data from './data';
import Save from './save';
import Home from '../home.png';
import Logo from '../logo.png';

const Mypage = ({items}) => {
    return (
        <div className="mypage_header">
            <div className='head'>
                <h1>마이페이지</h1>
                <div className='mountains'>
                    <img id="mountain1" src={Logo} />
                    <img id="mountain2" src={Logo} />
                    <img id="mountain3" src={Logo} />
                </div>
                <Link to="/mainpage">
                    <button id="home">MAINPAGE</button>
                </Link>

            </div>

            <View items={items[0]}/>
            <Data />
            <Save items={items[1]}/>
        </div>
    );
};

export default Mypage;