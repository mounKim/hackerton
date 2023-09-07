import React from 'react';
import {
    Link
} from "react-router-dom";
import './mainpage.css';
import {motion} from 'framer-motion';
import Cloudimage from './cloud.png';
import Logo from './logo.png';
import User from './user.png';
import axios from 'axios';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                <Link to={'/mainpage/'}>
                    <h1>ForWord</h1>
                </Link>
                </header>
                <div class="main_container">
                </div>
            </div>
        )
    }
}

export default MainPage;
