import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import {motion} from 'framer-motion';
import { useParams } from 'react-router-dom';

function Chart_disp (props) {
    if (props.chartinfo == null) {
        return (
            <div className='chartdiv'>
            </div>
        )
    }
    else {
        return (
            <div className='chartdiv'>
                <Link to={'/mypage/' + props.chartinfo.id}>
                    <motion.button className='chartbutton' whileHover={{scale:1.05}}>
                        {/* <img className='thumbnail' src={'http://127.0.0.1:8000'+props.videoinfo.image} alt='thumbnail' /> */}
                        {/* <h3 className='videoname'>{props.videoinfo.video_name === null?'':props.videoinfo.video_name}</h3> */}
                    </motion.button>
                </Link>
            </div>
        )
    }
}

class Chart_list extends React.Component {
    state = {
        chart_list: null,
    };
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var sq_data = [];
        var user = sessionStorage.getItem('user_id')
        await axios.get('http://127.0.0.1:8000/user_category/?user_id='+user)
        .then(function(response) {
            sq_data = response.data;
        });
        sq_data.map((d) => {
            d.link = "./mypage/" + d.id;
        })
        var chart_list = sq_data.map((d) =>
            <div className='image'><a href={d.link}><img src={d.img_link} alt={d.id}/></a>{d.video_name}</div>); 
        this.setState({
            user:user,
            chart_list: chart_list
        });
    }

    render() {
        if (this.props.index == null) {
            return (
                <div className ='chartlist'>
                </div>
            )
        }
        else {
            return (
                <div className ='chartlist'>
                    <h2 className='selectedmountain'>{this.props.categoryinfo[this.props.index].name}</h2>
                    <div className ='videoscroll'>
                        <Chart_disp chartinfo={this.props.categoryinfo[this.props.index].video[0]}/>
                        <Chart_disp chartinfo={this.props.categoryinfo[this.props.index].video[1]}/>
                        <Chart_disp chartinfo={this.props.categoryinfo[this.props.index].video[2]}/>
                        <Chart_disp chartinfo={this.props.categoryinfo[this.props.index].video[3]}/>
                        <Chart_disp chartinfo={this.props.categoryinfo[this.props.index].video[4]}/>
                        <Chart_disp chartinfo={this.props.categoryinfo[this.props.index].video[5]}/>
                    </div>
                </div>
            )
        }
    }
}


// function Data() {
//     return (
//         <div className="wrapper">
//             <h2>동영상 품질 데이터</h2>
//             <button>자세히 보기</button>
//         </div>
//     );
// }

export default function View() {
    let params = useParams();
    return <Chart_list params={params}/>
};