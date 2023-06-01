import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";

class SaveBlock extends React.Component {
    state = {
        save_list: null,
    };
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var user = sessionStorage.getItem('user_id');
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
            <div className='image'><a href={d.link}><img src={d.img_link} alt={d.id}/></a>{d.video_name}</div>); 

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