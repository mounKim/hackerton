import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import Logo from '../logo.png';
import './chart.css';

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
                <div className='head'>
                    <h2>동영상 품질 데이터</h2>
                    <div className='mountains'>
                        <img id="mountain1" src={Logo} />
                    </div>
                    <Link to="/mypage">
                    <button id="mypage_button">MYPAGE</button>
                    </Link>
                </div>

                {chartListToShow ? (
                    <div className='chart'>
                        <table class="responsive-table">
                            <thead>
                                <tr>
                                    <th scope="col">Session Id</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">Playback Date</th>
                                    <th scope="col">Bitrate Resource</th>
                                    <th scope="col">Resolution(Width X Height)</th>
                                    <th scope="col">Stream Type</th>
                                    <th scope="col">Protocol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chartListToShow.map((d, index) => (
                                    <tr scope="row" key={index} onClick={() => window.location.href = d.link}>
                                        <td>{d.id}</td>
                                        <td>{d.video_url}</td>
                                        <td>{d.video_id.updated_at}</td>
                                        <td>{d.bitrate_resource.join(' / ')}</td>
                                        <td>{d.resolution.join(' / ')}</td>
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