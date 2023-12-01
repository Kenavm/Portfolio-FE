import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import StartPage from './pages/StartPage';
import './App.css';
import PublicPage from './pages/PublicPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<StartPage/>} />
          <Route path= "/login" element = {<LoginPage/>} />
          <Route path ="/page/:userId" element = {<ProjectPage/>}/>
          <Route path ="/public/:userId" element = {<PublicPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
