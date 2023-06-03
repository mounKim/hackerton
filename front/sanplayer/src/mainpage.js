import React from 'react';
import {
    Link
} from "react-router-dom";
import './mainpage.css';
import {motion} from 'framer-motion';
import Cloudimage from './cloud.png';
import Logo from './logo.png';
import User from './user.png';
import axios from 'axios';

var mountain_color = ['#9BB983', '#A3BFA7', '#365912', '#345F12', '#2C3B12'];
var color_index = [0, 2, 3, 1, 2, 0, 3, 0, 1, 3];
var category_name = ['Rhymes and Songs', 'Educational', 'Cartoons and Animation', 'Gaming and Toys', 'Science and Exploration', 'Reading and Storytelling', 'Arts and Crafts', 'Comedy and Entertainment'];

function Video (props){
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

class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.categoryinfo = props.categoryinfo;
    }

    render() {
        if(this.props.index == null){
            return(
                <div className ='videolist'>
                    <h2 className='nomountain'>{this.props.user === null?'로그인해주세요!':'산을 눌러 원하는 카테고리를 골라주세요!'}</h2>
                </div>
            )
        }
        else if(this.categoryinfo === null){
            return(
                <div className ='videolist'>
                    <h2 className='nomountain'>로딩 중에 오류가 발생했어요... 새로고침 후 다시 시도해주세요!</h2>
                </div>
            )
        } else if(this.categoryinfo[this.props.index].video !== null) {
            return(
                <div className ='videolist'>
                    <h2 className='selectedmountain'>{this.categoryinfo[this.props.index].name}</h2>
                    <div className ='videoscroll'>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[0]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[1]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[2]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[3]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[4]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[5]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[6]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[7]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[8]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[9]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[10]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[11]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[12]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[13]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[14]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[15]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[16]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[17]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[18]}/>
                        <Video videoinfo={this.categoryinfo[this.props.index].video[19]}/>
                    </div>
                </div>
            )
        } else {
            return(
                <div className ='videolist'>
                    <h2 className='nomountain'>로딩 중에 오류가 발생했어요... 새로고침 후 다시 시도해주세요!</h2>
                </div>
            )
        }
    }
}

function Mt (props){
    return(
        <div className='mtwrapdiv' style={{width:props.size * 35, height:props.size * 30, position:'absolute', top: - props.size * 30, left: props.position * 160 - 530 - props.size * 17.5}}>
            <motion.div className='mtdiv' whileHover={{scale:1.2}} style={{zIndex:props.selected?999:(100-props.size), width:'100%', height:'100%'}}>
                <button className='mountainbutton' onClick={props.onClick} style={{backgroundColor:props.selected?mountain_color[4]:props.color}}>
                </button>
            </motion.div>
            <h3 className='mountainname' style={{zIndex:200, top: props.size * 30, 'fontSize': 12, width:'80px', left: props.size * 17.5 - 40}}>
                {props.name}
            </h3>
        </div>
    )
}

class Mountains extends React.Component {
    renderMountain(i){
        if(this.props.categoryinfo[i] == null){
            return <div />;
        }
        else{
            return <Mt className='mt' onClick={() => this.props.parent.handleClick(i)} size={this.props.categoryinfo[i].recommand} selected={(this.props.parent.state.cur_mountain === i)} position={i} name={this.props.categoryinfo[i].name} color={mountain_color[color_index[i]]}/>
        }
    }

    render() {
        return (
            <div className='mountains'>
                {this.renderMountain(0)}
                {this.renderMountain(1)}
                {this.renderMountain(2)}
                {this.renderMountain(3)}
                {this.renderMountain(4)}
                {this.renderMountain(5)}
                {this.renderMountain(6)}
                {this.renderMountain(7)}
            </div>
        )
    }
}

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        // read category, video from server list here
        this.state = {
            cur_mountain: null,
            user: null,
            categorylist: null
        };
    }

    async componentDidMount() {
        var categorylist = category_name.map((x) => ({name: x, recommand: null, video: null}));
        var user = sessionStorage.getItem('user_id')
        try {
            // POST 요청은 body에 실어 보냄
            if(user != null){
                var videos = null;
                await axios.get('http://127.0.0.1:8000/user_category/?user_id='+user)
                .then(function(response) {
                    videos = response.data;
                });
                var max = 0;
                var min = 999999;
                for(let i = 0; i < 8; i++){
                    categorylist[i].recommand = videos['score'+ (i + 1)];
                    max = max > categorylist[i].recommand?max:categorylist[i].recommand;
                    min = min > categorylist[i].recommand?categorylist[i].recommand:min;
                    await axios.get('http://127.0.0.1:8000/video_category/?category='+category_name[i])
                    .then(function(response_cat) {
                        categorylist[i].video = response_cat.data;
                    });
                }
                if(max === min){
                    for(let i = 0; i < 8; i++)
                        categorylist[i].recommand = 5;
                }
                else{
                    for(let i = 0; i < 8; i++)
                        categorylist[i].recommand = Math.round(4 + 0.5 * (1 + 9 * (categorylist[i].recommand - min)/(max - min)));
                }
            } else {
                for(let i = 0; i < 8; i++)
                    categorylist[i].recommand = 5;
            }
        } catch (e) {
            for(let i = 0; i < 8; i++)
                    categorylist[i].recommand = 5;
            console.log(e);
        }
        // console.log(categorylist);
        this.setState({
            cur_mountain: null,
            user: user,
            categorylist: categorylist
        });
    }

    handleClick(i){
        this.setState({
            cur_mountain: i,
            user: this.state.user
        })
    }

    render() {
        return(
            <ConditionalLink to="../login/" condition={this.state.user === null} style={{ textDecoration: "none" }}>
                <div className='mainpage_div' onClick={this.handleLogin}>
                    <Loading condition={this.state.categorylist === null}>
                        <header className='mainpage_header'>
                            <div className='mypage_div'>
                                <Link to="/mypage">
                                    <img src={User} className="mypagelogo" alt="mypagelogo" style={{width:"100%", height:"100%"}}/>
                                </Link>
                            </div>
                            <div className="logo_div">
                                <motion.img src={Logo} className="logo" alt="logo"
                                    animate={{scale: [0, 1, 1, 1, 1, 1, 1, 1, 1], rotateZ: [0, 240, 360, 360, 360, 360, 360, 360, 360]}}
                                />
                            </div>
                            <h2>San Player</h2>
                            <div className='cloudsdiv'>
                                <Link to="/videos">
                                    <motion.button
                                        className="cloudbutton1"
                                        animate={{
                                            x: [-600, 600, -600, 600, -600, 600, -600],
                                            y: [-300]
                                        }}
                                        transition={{type: "tween", repeat: Infinity, duration: 300, scale: {duration : 0.1}}}
                                        whileHover={{scale: 1.2,  transition:{type: "spring", duration: 0.2}}}
                                    >
                                        <img
                                            src={Cloudimage}
                                            alt="cloud1"
                                            width="100%"
                                            height="100%"
                                        />
                                    </motion.button>
                                </Link>
                                <Link to="/videos">
                                    <motion.button
                                        className="cloudbutton2"
                                        animate={{
                                            x: [500, -500, 500, -500, 500, -500, 500],
                                            y: [-200]
                                        }}
                                        transition={{type: "tween", repeat: Infinity, duration: 400, scale: {duration : 0.1}}}
                                        whileHover={{scale: 1.2,  transition:{type: "spring", duration: 0.2}}}
                                    >
                                        <img
                                            src={Cloudimage}
                                            alt="cloud2"
                                            width="100%"
                                            height="100%"
                                        />
                                    </motion.button>
                                </Link>
                            </div>
                        </header>
                        <div className='mainpage_body'>
                            <div className='mountainsdiv'>
                                <Mountains parent={this} categoryinfo={this.state.categorylist}/>
                            </div>
                            <div className='videosdiv'>
                                <Videos categoryinfo={this.state.categorylist} index={this.state.cur_mountain} user={this.state.user}/>
                            </div>
                        </div>
                    </Loading>
                </div>
            </ConditionalLink>
        )
    }
}

function ConditionalLink({ children, condition, ...props }) {
    return !!condition && props.to ? <Link {...props}>{children}</Link> : <>{children}</>
}

function Loading({ children, condition, ...props }) {
    return !condition ? <>{children}</> : 
    <div className="logo_div">
        <motion.img src={Logo} className="logo" alt="logo"
            animate={{rotateZ: [0, 120, 240, 360, 480, 600, 720, 840, 960, 1080]}} transition={{repeat: Infinity, duration: 1}}
        />
    </div>
}

export default MainPage;
