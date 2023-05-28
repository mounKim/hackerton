import './videos.css';
import React, {useEffect} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import { color } from 'framer-motion';
import Hls from 'hls.js';

// const Video = () => {
//     const { videoID } = useParams();
//     console.log(video_list);
//     const {title, thumbnail, link, category} = video_list[videoID];
//     var user = sessionStorage.getItem('user_id');
//     useEffect(() => {
//         try {
//             axios.post(`http://127.0.0.1:8000/watched_video/`, {
//                 'user_id': user,
//                 'video_id': videoID
//             })
//             .then(function(response) {
//                 console.log(response);
//             })
//         } catch(e) {
//             console.error(e);
//         }

//         var video_list = "";
//         axios.get('http://127.0.0.1:8000/videos/')
//         .then(function(response) {
//             video_list = response.data;
//             console.log(video_list);
//         })
//     }, []);

//     async function handleSave(event) {
//         event.preventDefault();
//         try {
//             await axios.post('http://127.0.0.1:8000/my_page/', {
//                 'user_id': user,
//                 'video_id': videoID
//             })
//             .then(function(response) {
//                 console.log(response);
//             })
//         } catch(e) {
//             console.error(e);
//         }
//     }

//     return (
//         <div className="video_header">
//             <video id="video" controls="controls">
//                 <source src={link} type="video/mp4"/>
//             </video>
//             <button>배속</button>
//             <button>해상도</button>
//             <button onClick={handleSave}>찜하기</button>
//         </div>
//     );
// };

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

        const video = document.getElementsByTagName('video');
        const hls = new Hls();
        hls.loadSource(link);
        hls.attachMedia(video); 
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log(
              '>>>>>>>>>>>> manifest loaded, found ' + data.levels.length + ' quality level');
            video.play();
          });    
        this.hlsRef = hls;
        hls.on(Hls.Events.FRAG_LOADED, function(event, data) {
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
            }
        });
        this.setState({
            user: user,
            link: link,
            videoid: videoid
        });
    }

    async handleSave(event) {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/my_page/', {
                'user_id': this.state.user,
                'video_id': this.state.videoid
            })
            .then(function(response) {
                console.log(response);
            })
        } catch(e) {
            console.error(e);
        }
    }

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
                    <div>
                        <button className='btn' onClick={this.handleZeroClick}>Level 0</button>
                        <button className='btn' onClick={this.handleAutoClick}>Auto</button>
                    </div>
                    <video ref={this.videoRef} controls height={720} />
                    <button>배속</button>
                    <button>해상도</button>
                    <button onClick={this.handleSave}>찜하기</button>
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