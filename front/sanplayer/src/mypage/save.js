import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import {BsXCircleFill} from 'react-icons/bs'

class SaveBlock extends React.Component {
    state = {
        user: null,
        save_list: null,
    };
    constructor(props) {
        super(props);
    }

    remove = async(x) => {
        try {
            await axios.post('http://127.0.0.1:8000/saved_video/', {
                'user_id': this.state.user,
                'video_id': x,
                'like_save_page': false
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
        var save_data = [];
        await axios.get("http://127.0.0.1:8000/saved_video/?user_id="+user)
        .then(function(response) {
            save_data = response.data;
        });       
        save_data.map((d) => {
            d.link = "./videos/" + d.id;
            d.img_link = "http://127.0.0.1:8000/" + d.image;
        })
        var save_list = save_data.map((d) => 
            <div className='image' key={d.video_name}><a href={d.link}><img src={d.img_link} alt={d.id}/></a>
            <button className='remove' onClick={(e)=>{this.remove(d.id, e)}}><BsXCircleFill /></button><div className='video_name'>{d.video_name}</div></div>); 

        this.setState({
            save_list: save_list
        });
    }

    render() {
        return (
            <div className="wrapper">
            <h2>동영상 저장 목록</h2>
                <div className="container">
                    {this.state.save_list}
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
    return <SaveBlock param={params}/>
}