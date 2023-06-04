import './video.css';
import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import Hls from 'hls.js';
import User from '../user.png';
import Main from '../logo.png';
import {BsPauseCircle, BsPlayCircle, BsHeart, BsHeartFill, BsSkipBackward, BsSkipForward
} from 'react-icons/bs'

var downloadBitrateData = [];
var selectedBitrateData = [];
var bufferingStartData = [];
var bufferingEndData = [];
var bufferHealthData = [];
var segmentDurationData = [];
var sq_id = null;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

class VideoComp extends React.Component {
    state = {
        user: sessionStorage.getItem('user_id'),
        link: null,
        videoid: null,
        name: null,
        category: null,
        current_playing: false,
        recom_list: (<div> </div>),
        like: false,
        islive: null,
        volume: 0.5,
        isVolume: false
    };
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.hlsRef = null;
        this.levelmap = [];
    }
    

    async componentDidMount() {
        var user = sessionStorage.getItem('user_id');
        var link = null;
        var video_name = null;
        const videoid = this.props.param.id;

        function my_shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        
        try {
            await axios.get(`http://127.0.0.1:8000/videos/`)
            .then(function(response) {
                // console.log(response);
                var cur_video = response.data[videoid - 1];
                video_name = "<" + cur_video.video_name + ">";
                video_url = cur_video.video_category[0]['category'];
                link = cur_video.video_url;
            })
        } catch(e) {
            console.error(e);
        }

        if(video_name !== null && link !== null) {
            var im_cate = null;
            try {
                await axios.get("http://127.0.0.1:8000/user_category/?user_id="+user)
                .then(function(response) {
                    var n_to_c = {
                        1: 'Rhymes and Songs',
                        2: 'Educational',
                        3: 'Cartoons and Animation',
                        4: 'Gaming and Toys',
                        5: 'Science and Exploration',
                        6: 'Reading and Storytelling',
                        7: 'Arts and Crafts',
                        8: 'Comedy and Entertainment'
                    }

                    var cate = response.data;
                    var items = Object.keys(cate).map(function(key) {
                        return [key, cate[key]];
                    });
                    items.sort(function(first, second) {
                        return second[1] - first[1];
                    });
                    im_cate = items.slice(0, 3).map(function(e) {
                        return n_to_c[Number(e[0].slice(5, 6))];
                    })
                });
                let recom_data = [];
                for(let k = 0; k < 3; k++) {
                    var video_url = im_cate[k];
                    await axios.get("http://127.0.0.1:8000/video_category/?category="+video_url)
                    .then(function(response) {
                        var ids = response.data.map(function(e) {
                            return e['id']
                        })
                        my_shuffle(ids);
                        if (Number(k) === 0) {
                            ids = ids.slice(0, 5);
                        } else if (Number(k) === 1) {
                            ids = ids.slice(0, 3);
                        } else {
                            ids = ids.slice(0, 2);
                        }
                        recom_data = recom_data.concat(ids);
                    })
                }
                my_shuffle(recom_data);
                var recom_data2 = [];
                recom_data = recom_data.slice(0, 5);
                for(var i = 0; i < 5; i++) {
                    if(Number(videoid) - 1 !== Number(recom_data[i])) {
                        recom_data2.push(recom_data[i]);
                    }
                }
                var video_list = []
                await axios.get("http://127.0.0.1:8000/videos/")
                .then(function(response) {
                    video_list = response.data.map((e) => {
                        return [e.video_name, "http://127.0.0.1:8000/" + e.image, "./" + e.id];
                    });
                });
                var recom_list = recom_data2.map((d) => 
                    <div className='image' key={video_list[d][0]}><a href={video_list[d][2]}><img className='recom_img' src={video_list[d][1]} alt={d}/></a><br /><h3 className='my_h3'>{video_list[d][0]}</h3></div>); 
                this.setState({
                    user: user,
                    link: link,
                    videoid: videoid,
                    name: video_name,
                    category: video_url,
                    current_playing: false,
                    recom_list: recom_list,
                    like: false
                });
            } catch(e) {
                console.error(e);
            }
        }
        try {
            await axios.post(`http://127.0.0.1:8000/watched_video/`, {
                'user_id': user,
                'video_id': videoid,
                'like': true,
                'time': Date.now()
            })
            .then(function(response) {
                //console.log(response);
            })
        } catch(e) {
            console.error(e);
        }

        var in_it = false;
        try {
            await axios.get("http://127.0.0.1:8000/saved_video/?user_id="+user)
            .then(function(response) {
                for(var i = 0; i < response.data.length; i++) {
                    if(Number(response.data[i]['id']) === Number(videoid)) {
                        in_it = true;
                    }
                }
            })
            if(in_it) {
                this.setState({
                    like: true
                })
            }
        } catch(e) {
            console.error(e);
        }

        const video = document.getElementById('video');
        const hls = new Hls({startLevel:0});
        const optionDropdown = document.getElementById('optionDropdown');

        let levelmap = [];
        let cur_tag = this;

        hls.on(Hls.Events.MANIFEST_PARSED, async function (event, data) {
            let bitrate_resource = [];
            let resolution = [];
            var isLIVE = hls.levels[0].details == null;
            cur_tag.setState({islive: isLIVE});
            // console.log(isLIVE);
            if (isLIVE) {
                // console.log('Video is Live');
                this.type = 'live';
            } else{
                // console.log('Video is VOD');
                this.type = 'vod';
            }
            // console.log('>>>>>>>>>>>> manifest loaded, found ' + data.levels.length + ' quality level');

            optionDropdown.innerHTML = '';
            for (let i = 0; i < data.levels.length; i++) {
                const option = document.createElement('option');
                option.value = i;
                // console.log(data.levels[i])
                // option.textContent = `${data.levels[i]['name']}p`;
                let cur_res = `${data.levels[i]['width']}X${data.levels[i]['height']}`;
                if(!(resolution.includes(cur_res))){
                    // console.log(cur_res)
                    option.textContent = cur_res;
                    levelmap.push(i);
                    optionDropdown.appendChild(option);
                    
                    bitrate_resource.push(`${data.levels[i]['bitrate']}`);
                    resolution.push(cur_res);
                    await sleep(200);
                    hls.loadLevel = i;
                }
            }
            hls.currentLevel = 0;
            try {
                await axios.post(`http://127.0.0.1:8000/streaming_quality/`, {
                    'user_id': user,
                    'video_id': videoid,
                    'bitrate_resource' : bitrate_resource,
                    'resolution' : resolution,
                    'streaming_type' : this.type,
                    'protocol' : 'hls',
                });
                await axios.get(`http://127.0.0.1:8000/streaming_quality/?user_id=`+user)
                .then(function(response) {
                    // console.log(response.data)
                    var cur_sq = response.data[0];
                    // console.log(cur_sq)
                    sq_id = cur_sq['id'];
                });
            } catch(e) {
                console.error(e);
            }
        });  

        hls.on(Hls.Events.FRAG_LOADED, async function(event, data) {
            // console.log('=========================================================');
            // console.log('>>>>>>>>>>>> Estimated bandwidth:', hls.bandwidthEstimate + ' bps');   
            var index = hls.currentLevel;
            var level = hls.levels[index];
            // console.log('>>>>>>>>>>>> currentLevel:', hls.currentLevel);
            // console.log('>>>>>>>>>>>> levels:', hls.levels);
            // console.log('>>>>>>>>>>>> loadLevel:', hls.loadLevel);
            if (level) {
                if (level.height) {
                    // console.log('>>>>>>>>>>>> Selected resolution:', level.height + 'p');
                }
                if (level.bitrate) {      
                    // console.log('>>>>>>>>>>>> Selected bandwidth:', Math.round(level.bitrate / 1000) + ' kbps');
                    if (index !== -1 && index >=0) {
                        // console.log('>>>>>>>>>>>> Selected bandwidth:', hls.levels[index].attrs.BANDWIDTH + ' bps');
                    }    
                }
            }

            var frag = data.frag;
            // console.log("fragment  : ", frag);
            // Collect the required data
            downloadBitrateData.push(frag.stats.total / frag.duration);
            
            if(hls.currentLevel === -1 || hls.currentLevel === null){
                selectedBitrateData.push(0);
            } else {
                selectedBitrateData.push(hls.levels[hls.currentLevel].bitrate);
            }
            
            bufferingStartData.push(frag.stats.buffering.start);//
            bufferingEndData.push(frag.stats.buffering.end);//
            bufferHealthData.push(frag.stats.loading.end - frag.stats.loading.start);
            segmentDurationData.push(frag.duration);//
        });
        
        hls.loadSource(link);
        hls.attachMedia(video);

        this.levelmap = levelmap;


        // console.log(hls);

        this.hlsRef = hls;
        // this.handle_play();

        // window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    // componentWillUnmount() {
    //     console.log("remove beforeunload eventlistner");
    //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
    // }

    handleBeforeUnload = async () => {
        try {
            if(sq_id != null){
                await axios.post('http://127.0.0.1:8000/graph/', {
                    'sq_id':sq_id,
                    'download_bitrate' : downloadBitrateData,
                    'selected_bitrate' : selectedBitrateData,
                    'buffering_start' : bufferingStartData,
                    'buffering_end' : bufferingEndData,
                    'segment_duration' : segmentDurationData,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }; 

    handleSave = async () => {
        if(this.state.like){
            this.setState({like: false});
        } else {
            this.setState({like: true});
        }
        try {
            await axios.post('http://127.0.0.1:8000/saved_video/', {
                'user_id': this.state.user,
                'video_id': this.state.videoid,
                'like': this.state.like,
                'like_save_page': true,
                'time': Date.now()
            })
            .then(function(response) {
                console.log(response);
            })
        } catch(e) {
            console.error(e);
        }
    }

    start = () => {
        try {
            const video = document.getElementById('video');
            video.muted = true;
            video.play();
            video.muted = false;
        } catch {
                
        }
    }

    stop = () => {
        try{
            const video = document.getElementById('video');
            video.muted = true;
            video.pause();
        } catch {

        }
    }
    
    goBack = () => {
        try {
            const video = document.getElementById('video');
            video.currentTime = video.currentTime - 5;
        } catch {
                
        }
    }

    goFront = () => {
        try {
            const video = document.getElementById('video');
            video.currentTime = video.currentTime + 5;
        } catch {
            
        }

    }

    handle_play = () => {
        if(this.state.current_playing === true) {
            this.stop();
            this.setState({
                user: this.state.user,
                link: this.state.link,
                videoid: this.state.videoid,
                name: this.state.name,
                category: this.state.category,
                current_playing: false,
                recom_list: this.state.recom_list,
                like: this.state.like,
            });
        } else {
            this.start();
            this.setState({
                user: this.state.user,
                link: this.state.link,
                videoid: this.state.videoid,
                name: this.state.name,
                category: this.state.category,
                current_playing: true,
                recom_list: this.state.recom_list,
                like: this.state.like,
            })
        }
    }

    handleSpeed = () => {
        var value = document.getElementById('optionSpeed');
        var select = value.options[value.selectedIndex].value;
        if(select === 'slow') {
            document.getElementById('video').playbackRate = 0.5;
        } else if(select === 'slow_normal') {
            document.getElementById('video').playbackRate = 0.75;
        } else if(select === 'normal') {
            document.getElementById('video').playbackRate = 1.0;
        } else if(select === 'normal_high') {
            document.getElementById('video').playbackRate = 1.25;
        } else {
            document.getElementById('video').playbackRate = 1.5;
        }
    }   

    handleLevelClick = () => {
        const optionDropdown = document.getElementById('optionDropdown');
        var level = optionDropdown.options[optionDropdown.selectedIndex].value;
        // console.log('Button clicked!', level);
        this.hlsRef.currentLevel = this.levelmap[level];
        // console.log(this.levelmap[level]);
    };

    toggleVolume = () => {
        const video = document.getElementById('video');
        const range = document.getElementById('range');
        if(this.state.isVolume) {
            video.muted = false;
            range.value = 5;
            this.setState({isVolume: false});
        } else {
            video.muted = true;
            range.value = 0;
            this.setState({isVolume: true});
        }
    };

    volumeChangeHandler = (event) => {
        const video = document.getElementById('video');
        const newVolume = event.target.value / 10;
        this.setState({volume: newVolume});
        if(!newVolume) {
            video.muted = true;
            return;
        }
        video.muted = false;
        video.volume = newVolume;
    }

    fullScreen = () => {
        const video = document.getElementById('video');
        video.requestFullscreen();
    }

    async componentWillUnmount() {
        await this.handleBeforeUnload();
    }

    render() {
        return(
            <ConditionalLink to="../login/" condition={this.state.user === null} style={{ textDecoration: "none" }}>
                <div className="video_header">
                    <div className="wrapper">
                        <div className="video_page_header">
                        <div className='mainpage_div'>
                            <Link to="/mainpage">
                                <img src={Main} className="mainpagelogo" alt="mainpagelogo" style={{width:"100%", height:"100%",}}/>
                            </Link>
                        </div>
                        </div>
                        <h2 className="my_h2">{this.state.user === null?'로그인해주세요!':'Sanplayer'}</h2>            
                        <h3 className="my_h3">{this.state.name === null ? 'Loading...' : this.state.name} {this.state.islive?'[LIVE]':''}</h3>
                        <div className='video_container'>
                            <video controls payload="" id="video"></video>
                            <div className='container'>
                                <button className='btn_play' onClick={this.handle_play}>{this.state.current_playing?<BsPauseCircle />:<BsPlayCircle />}</button>
                                <button className='btn_like' onClick={this.handleSave}>{this.state.like?<BsHeartFill />:<BsHeart />}</button>
                                <button className='btn_back' onClick={this.goBack}><BsSkipBackward /></button>
                                <button className='btn_forw' onClick={this.goFront}><BsSkipForward /></button>
                                <button className="button-volume" onClick={this.toggleVolume}>
                                {this.state.isVolume?
                                    <img className="v_img" src="../mute.png" width="20px" height="20px" alt="mute" /> :
                                    <img className="v_img" src="../volume.png" width="20px" height="20px" alt="sound" />
                                }
                                </button>
                                <input id="range" className="v_range" type="range" min="0" max="10"
                                    onChange={this.volumeChangeHandler}
                                />
                                <select id="optionSpeed" onChange={this.handleSpeed} defaultValue="normal">
                                    <option value="slow">0.5</option>
                                    <option value="slow_normal">0.75</option>
                                    <option value="normal">1.0</option>
                                    <option value="norm al_high">1.25</option>
                                    <option value="high">1.5</option>
                                </select>
                                <select id="optionDropdown" onChange={this.handleLevelClick} defaultValue="init">
                                    <option value="init" >해상도</option>
                                </select>
                                <button className="full" onClick={this.fullScreen}>FULL</button>
                            </div>
                        </div>
                    </div>
                    <div className='mypage_div'>

                    {/* <Link to="/mypage">
                        <img src={User} className="mypagelogo" alt="mypagelogo" style={{width:"100%", height:"100%"}}/>
                    </Link> */}
                    </div>
                    <div className='recommend'>
                        <div id="vido_page_mypage_button">
                            <Link to="/mypage">MYPAGE</Link>
                        </div>
                        <h2 className="my_h2">추천 동영상</h2>
                        {this.state.recom_list}
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
    return <VideoComp param={params}/>
}