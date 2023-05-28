import './mypage.css';
import React from 'react';
import View from './view';
import Data from './data';
import Save from './save';

const Mypage = ({items}) => {
    return (
        <div className="mypage_header">
            <h1>마이페이지</h1>
            <View items={items[0]}/>
            <Data />
            <Save items={items[1]}/>
        </div>
    );
};

export default Mypage;