import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';

class Chart_comp extends React.Component {
    state = {
        user: null,
        chart_list: null,
    };
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var sq_data = [];
        var user = sessionStorage.getItem('user_id')
        await axios.get('http://127.0.0.1:8000/streaming_quality/?user_id='+user)
        .then(function(response) {
            sq_data = response.data;
        });
        sq_data.map((d) => {
            d.link = "./chart/" + d.id;
        })
        var chart_list = sq_data.map((d) =>
            <div className='chart'>
                <a href={d.link}>{d.id}</a>{d.video_url}
            </div>); 
        this.setState({
            user:user,
            chart_list: chart_list
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <h2>동영상 품질 데이터</h2>
                <div className ='chartlist'>
                    {this.state.chart_list}
                </div>
            </div>
        )
    }
}

export default function Chart() {
    let params = useParams();
    return <Chart_comp params={params}/>
};