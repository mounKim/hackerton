import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import { ResponsiveLine } from '@nivo/line';
import './graph.css';
import Logo from '../logo.png';

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine className='graph'
        theme={{
            "background": "#ffffff",
            // "grid": {
            //     "line": {
            //         "stroke": 'white',
            //         "strokeWidth": 1
            //     }
            // }
        }}
        data={data}
        margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        xScale={{type: "time",
        format: "native"
        }}
        axisBottom={{
            format: "%H:%M:%S",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'time',
            legendPosition: 'middle',
            legendOffset: 40,
            tickValues: "every 1minutes"
        }}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={{ scheme: 'red_yellow_blue' }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

class GraphComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            graph_data: null,
        };
    }

    async componentDidMount() {
        var graph_data = [{"id": "buffering_end", "data": []},
        {"id": "buffering_start", "data": []},
        {"id": "download_bitrate", "data": []},
        {"id": "selected_bitrate", "data": []}];
        var user = sessionStorage.getItem('user_id');
        var init_time;
        const sq_id = this.props.param.id;
        try {
            await axios.get(`http://127.0.0.1:8000/graph/?sq_id=`+ sq_id)
            .then(function(response) {
                init_time = new Date(response.data.sq_id.video_id.updated_at);
                let cur_time = init_time;
                for(let i = 0; i < response.data.buffering_end.length; i++){
                    let tmptime = new Date(cur_time);
                    graph_data[0].data.push({"x": tmptime, "y": response.data.buffering_end[i]})
                    graph_data[1].data.push({"x": tmptime, "y": response.data.buffering_start[i]})
                    graph_data[2].data.push({"x": tmptime, "y": response.data.download_bitrate[i]})
                    graph_data[3].data.push({"x": tmptime, "y": response.data.selected_bitrate[i]})
                    cur_time.setSeconds(cur_time.getSeconds() + Number(response.data.segment_duration[i]));
                }
                // console.log(graph_data);
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
        // const g_data = this.state.graph_data;
        return (
            <div className="graph_page">
                <div className='head'>
                    <h2>Streaming Quality Graph</h2>
                    <div className='mountains'>
                        <img id="mountain1" alt='mountain1' src={Logo} />
                    </div>
                    <Link to="/mypage">MYPAGE
                    {/* <button id="mypage_button">MYPAGE</button> */}
                    </Link>
                </div>
                <div className='graph_div'>
                    {this.state.graph_data === null?
                    <div id="loading_chart">Loading chart data...</div>:
                    <MyResponsiveLine data={this.state.graph_data} />
                    }
                </div>
                <div id="chart_button">
                    <Link to="/chart">GO BACK TO TABLE</Link>
                </div>
            </div>
        )
    }
}



export default function Graph() {
    let params = useParams();
    return <GraphComp param={params}/>
};