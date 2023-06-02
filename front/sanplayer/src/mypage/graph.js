import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import { ResponsiveLine } from '@nivo/line'
import './graph.css';
import Logo from '../logo.png';


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
        // var user = sessionStorage.getItem('user_id');
        // const sq_id = this.props.param.id;
        // try {
        //     await axios.get(`http://127.0.0.1:8000/graph/?sq_id=`+sq_id)
        //     .then(function(response) {
        //         graph_data = response.data;
        //         // console.log(response.data);
        //     })
        // } catch(e) {
        //     console.error(e);
        // }
        // this.setState({
        //     user:user,
        //     graph_data: graph_data
        // })
    }

    render() {
        const g_data = this.state.graph_data
        return (
            <div className="wrapper graph_page">
                <div className='head'>
                    <h2>Streaming Quality Graph</h2>
                    <div className='mountains'>
                        <img id="mountain1" src={Logo} />
                    </div>
                    <Link to="/mypage">MYPAGE
                    {/* <button id="mypage_button">MYPAGE</button> */}
                    </Link>
                </div>
                {/* <ResponsiveLine
                    data={g_data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
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
                /> */}
        <div id="chart_button">
        <Link to="/chart">GO BACK TO TABLE</Link>
        </div>
        </div>
        )
    }
}



export default function Graph() {
    let params = useParams();
    return <Graph_comp param={params}/>
};