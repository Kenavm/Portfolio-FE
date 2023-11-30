import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css'

const Header = () => {
  const navigate = useNavigate();

  return <div className="w-full header">
    <img className="h-28 flex justify-start items-end" src='/Buildfolio.jpg'></img>
    <div className="flex justify-end items-start" onClick = {() => navigate("/") }>
        <>HOME</>
    </div>
  
  </div>;
};

export default Header;