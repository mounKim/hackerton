import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import { ResponsiveLine } from '@nivo/line'


class Graph_comp extends React.Component {
    state = {
        user: null,
        graph_data: null,
    };
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var graph_data = [];
        var user = sessionStorage.getItem('user_id');
        const sq_id = this.props.param.id;
        try {
            await axios.get(`http://127.0.0.1:8000/graph/?sq_id=`+sq_id)
            .then(function(response) {
                graph_data = response.data;
                // console.log(response.data);
            })
        } catch(e) {
            console.error(e);
        }
        this.setState({
            user:user,
            graph_data: graph_data
        })
    }

    render() {
        return (
            <div className="wrapper">
                <h2>그래프 데이터</h2>
            </div>
        )
    }
}



export default function Graph() {
    let params = useParams();
    return <Graph_comp param={params}/>
};