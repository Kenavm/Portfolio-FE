import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import StartPage from './pages/StartPage';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<StartPage/>} />
          <Route path= "/login" element = {<LoginPage/>} />
          <Route path ="/project" element = {<ProjectPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
