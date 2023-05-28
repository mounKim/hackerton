import './videos.css';
import React from 'react';
import Category from './category';

const Videos = () => {
    var dictObject = {}
    // console.log(video_list)
    // for (var i = 0; i < video_list.length; i++) {
    //     var tmp = video_list[i].category;
    //     if (tmp in dictObject) {
    //         dictObject[tmp].push(video_list[i]);
    //     } else {
    //         dictObject[tmp] = [video_list[i]];
    //     }
    // }
    return (
        <div className="video_header">
            <h1>하늘에서 보기</h1>
            <div className='category'>
                <h2>SPORT</h2>
                <Category items={dictObject['sport']}/>
            </div>
            <div className='category'>
                <h2>GAME</h2>
                <Category items={dictObject['game']}/>
            </div>
            <div className='category'>
                <h2>TALK</h2>
                <Category items={dictObject['talk']}/>
            </div>
        </div>
    );
};

export default Videos;