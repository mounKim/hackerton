import './videos.css';
import React, {useEffect} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import Hls from 'hls.js';
import User from '../user.png';


class Video_comp extends React.Component {
    state = {
        user: null,
        link: null,
        videoid: null,
    };
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.hlsRef = null;
    }

    async componentDidMount() {
        var user = sessionStorage.getItem('user_id');
        var link = null;
        const videoid = this.props.param.id;
        
        try {
             await axios.post(`http://127.0.0.1:8000/watched_video/`, {
                'user_id': user,
                'video_id': videoid
            })
            .then(function(response) {
                // console.log(response);
            })
        } catch(e) {
            console.error(e);
        }

        try {
            await axios.get(`http://127.0.0.1:8000/videos/`)
            .then(function(response) {
                // console.log(response.data[videoid - 1])
                var cur_video = response.data[videoid - 1];
                link = cur_video.video_url;
            })
        } catch(e) {
            console.error(e);
        }

        this.setState({
            user: user,
            link: link,
            videoid: videoid
        });

        const video = document.getElementById('video');
        const hls = new Hls();
        const optionDropdown = document.getElementById('optionDropdown');
        let bitrate_resource = "";
        let resolution = "";

        // let bitrate_resource = [];
        // let resolution = [];

        hls.loadSource(link);
        hls.attachMedia(video); 
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            var isLIVE = hls.levels[0].details == null;
            if (isLIVE) {
                console.log('Video is Live');
                this.type = 'live';
            } else{
                console.log('Video is VOD');
                this.type = 'vod';
            }
            console.log('>>>>>>>>>>>> manifest loaded, found ' + data.levels.length + ' quality level');
            // console.log(hls);
            optionDropdown.innerHTML = '';
            for (let i = 0; i <= data.levels.length; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `해상도 ${data.levels[i]['heigth']}`;
                optionDropdown.appendChild(option);
                
                // bitrate_resource += ` ${data.levels[i]['bitrate']}`;
                // resolution +=  ` ${data.levels[i]['width']}X${data.levels[i]['heigth']}`;
                // console.log(` ${data.levels[i]['bitrate']}`, "___", ` ${data.levels[i]['width']}X${data.levels[i]['height']}`, "_________", bitrate_resource, resolution);
                // bitrate_resource.push(`${data.levels[i]['bitrate']}`);
                // resolution.push(`${data.levels[i]['width']}X${data.levels[i]['height']}`);
            }      
        });   

        // axios.post(`http://127.0.0.1:8000/streaming_quality/`, {
        //     'user_id': user,
        //     'video_id': videoid,
        //     'bitrate_resource' : await bitrate_resource,
        //     'resolution' : await resolution,
        //     'streaming_type' : this.type,
        //     'protocol' : 'hls',
        // });
        
        console.log(hls);

        this.hlsRef = hls;

        var downloadBitrateData = [];
        var selectedBitrateData = [];
        var bufferingStartData = [];
        var bufferingEndData = [];
        var bufferHealthData = [];
        var segmentDurationData = [];
        hls.on(Hls.Events.FRAG_LOADED, async function(event, data) {
            console.log('=========================================================');
            console.log('>>>>>>>>>>>> Estimated bandwidth:', hls.bandwidthEstimate + ' bps');   
            var index = hls.currentLevel;
            var level = hls.levels[index];
            console.log('>>>>>>>>>>>> currentLevel:', hls.currentLevel);
            console.log('>>>>>>>>>>>> levels:', hls.levels);
            console.log('>>>>>>>>>>>> loadLevel:', hls.loadLevel);
            if (level) {
                if (level.height) {
                    console.log('>>>>>>>>>>>> Selected resolution:', level.height + 'p');
                }
                if (level.bitrate) {      
                    console.log('>>>>>>>>>>>> Selected bandwidth:', Math.round(level.bitrate / 1000) + ' kbps');
                    if (index !== -1 && index >=0) {
                        console.log('>>>>>>>>>>>> Selected bandwidth:', hls.levels[index].attrs.BANDWIDTH + ' bps');
                    }    
                }
                // await axios.post(`http://127.0.0.1:8000/streaming_quality/`, {
                //     'resolution': level.height,
                //     'bitrate': Math.round(level.bitrate / 1000)
                // })
            }

            var frag = data.frag;

            // Collect the required data
            downloadBitrateData.push(frag.stats.bw);
            selectedBitrateData.push(frag.stats.bitrate);
            bufferingStartData.push(frag.stats.buffering['start']);//
            bufferingEndData.push(frag.stats.buffering['end']);//
            bufferHealthData.push(frag.stats.len);
            segmentDurationData.push(frag.duration);//

            // Log the collected data
            console.log('---------------- chart data ------------------')
            console.log(frag)
            // console.log('Download Bitrate:', downloadBitrateData);
            // console.log('Selected Bitrate:', selectedBitrateData);
            console.log('Buffering Start:', bufferingStartData);
            console.log('Buffering End:', bufferingEndData);
            // console.log('Buffer Health:', bufferHealthData);
            console.log('Segment Duration:', segmentDurationData);



        });
    }

    async handleSave(event) {
        event.preventDefault();
        var user = sessionStorage.getItem('user_id');
        const videoid = this.props.param.id;
        try {
            await axios.post('http://127.0.0.1:8000/saved_video/', {
                'user_id': user,
                'video_id': videoid
            })
            .then(function(response) {
                console.log(response);
            })
        } catch(e) {
            console.error(e);
        }
    }

    async handlResolution(event){
        event.preventDefault();
    }

    start = () => {
        const video = document.getElementById('video');
        video.muted = true;
        video.play();
        video.muted = false;
    }

    stop = () => {
        const video = document.getElementById('video');
        video.muted = true;
        video.pause();
    }

    handleLevelClick = () => {
        const optionDropdown = document.getElementById('optionDropdown');
        var level = optionDropdown.options[optionDropdown.selectedIndex].value;
        console.log('Button clicked!', level);
        this.hlsRef.currentLevel = level;
    };

    handleZeroClick = () => {
        console.log('Button clicked!');
        this.hlsRef.currentLevel = 0;
    };

    handleAutoClick = () => {
        console.log('Button clicked!');
        this.hlsRef.currentLevel = -1; // Auto resolution switching
    };

    render() {
        return(
            <ConditionalLink to="../login/" condition={this.state.user === null} style={{ textDecoration: "none" }}>
                <div className="video_header">
                    <div className="wrapper">
                        <div id="mypage">
                            <Link to="/mypage">
                                <img src={User} className="mypagelogo" alt="mypagelogo" style={{width:"100%", height:"100%"}}/>
                            </Link>
                        </div>                        
                        <Link to="/mainpage">
                            <button id="home">MAINPAGE</button>
                        </Link>
                        <video controls payload="" id="video"></video>
                        <div className='container'>
                            <button className='btn' onClick={this.start}>재생</button>
                            <button className='btn' onClick={this.stop}>일시정지</button>
                            <button className='btn' onClick={this.handleSave}>찜하기</button>
                            <select id="optionDropdown" onChange={this.handleLevelClick}>
                                <option value="">해상도</option>
                            </select>
                        </div>
                    </div>
                    <div className='recommend'>
                        <h2 id="recom_h2">추천 동영상</h2>

                    </div>
                </div>
            </ConditionalLink>
        )
    }


}

function ConditionalLink({ children, condition, ...props }) {
    return !!condition && props.to ? <Link {...props}>{children}</Link> : <>{children}</>
}

export default function Video() {
    let params = useParams();
    return <Video_comp param={params}/>
}