import React from 'react';

function Save({items}) {
    return (
        <div>
            <h2>동영상 저장 목록</h2>
                <div className='container'>
                {/* {items.map((record)=> {
                    const {title, thumbnail} = video_list[record];
                    var link = `./videos/${record}`;
                    return (
                        <div className="item">
                            <a href={link}>
                                <img src={thumbnail} />
                            </a>
                            <h3>{title}</h3>
                        </div>
                    )
                })} */}
                </div>
        </div>
    );
}

export default Save;