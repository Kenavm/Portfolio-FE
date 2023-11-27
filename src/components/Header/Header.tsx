import React from 'react';
import './Header.css'

const Header = () => {
  return <div className="w-full header">
    <img className="h-28 flex justify-start items-end" src='/Buildfolio.jpg'></img>
    <div className="flex justify-end items-start">
        <>HOME LOGOUT</>
    </div>
  
  </div>;
};

export default Header;