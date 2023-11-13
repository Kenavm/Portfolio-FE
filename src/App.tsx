import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path ="/project" element = {<ProjectPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
