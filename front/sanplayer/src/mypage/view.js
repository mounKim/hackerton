import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import {BsXCircleFill} from 'react-icons/bs'

class ViewBlock extends React.Component {
    state = {
        user: null,
        watch_list: null,
    };
    constructor(props) {
        super(props);
    }

    remove = async(x) => {
        try {
            await axios.post('http://127.0.0.1:8000/watched_video/', {
                'user_id': this.state.user,
                'video_id': x,
                'like': false
            })
            .then(function(response) {
                window.location.reload();
            })
        } catch(e) {
            console.error(e);
        }
    }

    async componentDidMount() {
        var user = sessionStorage.getItem('user_id');
        this.state.user = user;
        var watch_data = [];
        await axios.get("http://127.0.0.1:8000/watched_video/?user_id="+user)
        .then(function(response) {
            watch_data = response.data;
        });       
        watch_data.map((d) => {
            d.link = "./videos/" + d.id;
            d.img_link = "http://127.0.0.1:8000/" + d.image;
        })
        // console.log(watch_data);
        var watch_list = watch_data.map((d) => 
            <div className='image' key={d.video_name}><a href={d.link}><img src={d.img_link} alt={d.id}/></a>
            <button className='remove' onClick={(e)=>{this.remove(d.id, e)}}><BsXCircleFill /></button><div className='video_name'>{d.video_name}</div></div>); 
        this.setState({
            watch_list: watch_list
        });
    }
    render() {
        return (
            <div className="wrapper">
            <h2>동영상 시청 목록</h2>
                <div className="container">
                    {this.state.watch_list}
                </div>
            </div>
        )
    }
}

function ConditionalLink({ children, condition, ...props }) {
    return !!condition && props.to ? <Link {...props}>{children}</Link> : <>{children}</>
}


export default function View() {
    let params = useParams();
    return <ViewBlock param={params}/>
}