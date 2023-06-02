import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';

class Graph_comp extends React.Component {
    state = {
        user: sessionStorage.getItem('user_id'),

    };
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var user = sessionStorage.getItem('user_id');
        const sq_id = this.props.param.id;
        console.log(sq_id)
        try {
            await axios.get(`http://127.0.0.1:8000/graph/?sq_id=`+sq_id)
            .then(function(response) {
                console.log(response);
            })
        } catch(e) {
            console.error(e);
        }
        this.setState({
            user:user,
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