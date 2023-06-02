import './mypage.css';
import {
    Link
} from "react-router-dom";
import React, { useState } from 'react';
import View from './view';
import Data from './data';
import Save from './save';
import Home from '../home.png';
import Logo from '../logo.png';
import User_Info from './user_info';

const Mypage = ({items}) => {
    return (
        <div className="mypage_header">
            <div className='head'>
                <h1>MYPAGE</h1>
                <div className='mountains'>
                    <img id="mountain1" src={Logo} />
                    <img id="mountain2" src={Logo} />
                    <img id="mountain3" src={Logo} />
                </div>
                <Link to="/mainpage" className='mainpagelink'>
                    <button className="home">MAIN PAGE</button>
                </Link>
                <User_Info/>
            </div>

            <View items={items[0]}/>
            <Save items={items[1]}/>
            <Data />
        </div>
    );
};

export default Mypage;