import './videos.css';
import React from 'react';
import {
    Link
} from "react-router-dom";
import {motion} from 'framer-motion';
import User from '../user.png';
import Main from '../logo.png';
import axios from 'axios';

var category_name = ['Rhymes and Songs', 'Educational', 'Cartoons and Animation', 'Gaming and Toys', 'Science and Exploration', 'Reading and Storytelling', 'Arts and Crafts', 'Comedy and Entertainment'];

function Video_Disp (props){
    if(props.videoinfo == null) {
        return(
        <div className='videodiv'>
        </div>
        )
    }
    else{
        return(
            <div className='videodiv'>
                <Link to={'/videos/' + props.videoinfo.id}>
                    <motion.button className='videobutton' whileHover={{scale:1.05}}>
                        <img className='thumbnail' src={'http://127.0.0.1:8000'+props.videoinfo.image} alt='thumbnail' />
                        <h3 className='videoname'>{props.videoinfo.video_name === null?'':props.videoinfo.video_name}</h3>
                    </motion.button>
                </Link>
            </div>
        )
    }
}

class Videos_list extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.index == null){
            return(
                <div className ='videolist'>
                </div>
            )
        }
        else{
            return(
                <div className ='videolist'>
                    <h2 className='selectedmountain' style={{fontSize:'25px'}}>{this.props.categoryinfo[this.props.index].name}</h2>
                    <div className ='videoscroll'>
                        <div className='pad_scroll' />
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[0]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[1]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[2]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[3]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[4]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[5]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[6]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[7]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[8]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[9]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[10]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[11]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[12]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[13]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[14]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[15]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[16]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[17]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[18]}/>
                        <Video_Disp videoinfo={this.props.categoryinfo[this.props.index].video[19]}/>
                    </div>
                </div>
            )
        }
    }
}


class Videos extends React.Component {
    constructor(props) {
        super(props);
        // read category, video from server list here
        this.state = {
            user: sessionStorage.getItem('user_id'),
            categorylist: null
        };
    }

    async componentDidMount() {
        var categorylist = category_name.map((x) => ({name: x, video: null}));
        var user = sessionStorage.getItem('user_id')
        if(user !== null){
            try {
                for(let i = 0; i < 8; i++){
                    await axios.get('http://127.0.0.1:8000/video_category/?category='+category_name[i])
                    .then(function(response_cat) {
                        categorylist[i].video = response_cat.data;
                    });
                }
            } catch (e) {
                console.log(e);
            }
            // console.log(categorylist);
            // console.log(user)
            this.setState({
                user: user,
                categorylist: categorylist
            });
        }
    }

    render() {
        return (
            <ConditionalLink to="../login/" condition={this.state.user === null} style={{ textDecoration: "none" }}>
                <Loading condition={this.state.categorylist === null}>
                    <div className="videos_header">
                        <div className = "videos_head">
                            <div className='mainpage_div'>
                                <Link to="/mainpage">
                                    <img src={Main} className="mainpagelogo" alt="mainpagelogo" style={{width:"100%", height:"100%"}}/>
                                </Link>
                            </div>
                            <div className='mypage_div'>
                                <Link to="/mypage">MYPAGE</Link>
                            </div>
                        </div>
                        <h2 className='title' style={{fontSize:'35px'}}>{this.state.user === null?'로그인해주세요!':'하늘에서 보기'}</h2>
                        <div className='pad' />
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:0}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:1}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:2}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:3}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:4}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:5}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:6}/>
                        </div>
                        <div className='category'>
                            <Videos_list user={this.state.user} categoryinfo={this.state.categorylist} index={this.state.categorylist===null?null:7}/>
                        </div>
                    </div>
                </ Loading>
            </ConditionalLink>
        );
    }
}

function ConditionalLink({ children, condition, ...props }) {
    return !!condition && props.to ? <Link {...props}>{children}</Link> : <>{children}</>
}

function Loading({ children, condition, ...props }) {
    return !condition ? <>{children}</> : 
    <div className="logo_div">
        <motion.img src={Main} className="videos_loading_logo" alt="logo"
            animate={{rotateZ: [0, 120, 240, 360, 480, 600, 720, 840, 960, 1080]}} transition={{repeat: Infinity, duration: 1}}
        />
    </div>
}

export default Videos;