import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Switch } from 'react-router-dom';
import Mypage from './mypage/mypage';
import view from './mypage/view_record';
import save from './mypage/save_record';
import Chart from './mypage/chart';
import Graph from './mypage/graph';
import Video from './videos/video';
import Videos from './videos/videos';
import Info from './info';
import Login from './login';
import Register from './viet';
import MainPage from './mainpage';
import './App.css';

function App() {
  const [views, setViews] = useState(view);
  const [saves, setSaves] = useState(save);
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage" element={<Mypage items={[views, saves]}/>}></Route>
        <Route path="/chart" element={<Chart/>}></Route>
        <Route path="/chart/:id" element={<Graph/>}></Route>
        <Route path="/videos" element={<Videos/>}></Route>
        <Route path="/videos/:id" element={<Video />}></Route>
        {/* <Switch>
          <Route path="/videos/:id" children={<Video />}/>
        </Switch> */}
        <Route path="/info" element={<Info />}></Route>
        <Route path="/viet" element={<Register />}></Route>
        <Route path="/mainpage" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
