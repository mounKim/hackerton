import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';

class Chart_comp extends React.Component {
    state = {
        user: null,
        sq_data: null,
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
        this.setState({
            user:user,
            sq_data: sq_data,
        });
    }

    render() {
        const chartListToShow = this.state.sq_data ? this.state.sq_data.slice(0, 10) : null;
        return (
            <div className='wrapper'>
                <h2>동영상 품질 데이터</h2>
                {chartListToShow ? (
                    <div className='chart'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Session Id</th>
                                    <th>URL</th>
                                    <th>Playback Date</th>
                                    <th>Bitrate Resource</th>
                                    <th>Resolution(Width X Height)</th>
                                    <th>Stream Type</th>
                                    <th>Protocol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chartListToShow.map((d, index) => (
                                    <tr key={index} onClick={() => window.location.href = d.link}>
                                        <td>{d.id}</td>
                                        <td>{d.video_url}</td>
                                        <td>{d.video_id.updated_at}</td>
                                        <td>{d.bitrate_resource}</td>
                                        <td>{d.resolution}</td>
                                        <td>{d.streaming_type}</td>
                                        <td>{d.protocol}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Loading chart data...</div>
                )}
            </div>
        )
    }
}

export default function Chart() {
    let params = useParams();
    return <Chart_comp params={params}/>
};