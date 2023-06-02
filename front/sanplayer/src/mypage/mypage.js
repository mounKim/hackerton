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
                <h1>MYPAGE</h1>
                <div className='mountains'>
                    <img id="mountain1" src={Logo} />
                    <img id="mountain2" src={Logo} />
                    <img id="mountain3" src={Logo} />
                </div>
                <Link to="/mainpage">MAINPAGE
                    {/* <button id="home">MAIN PAGE</button> */}
                </Link>

            </div>

            <View items={items[0]}/>
            <Save items={items[1]}/>
            <Data />
        </div>
    );
};

export default Mypage;