import React from 'react';
import './About.css'
import PublicUser from '../../types/PublicUser'

interface AboutMeProps {
   publicUser: PublicUser
}

const About: React.FC<AboutMeProps> = ({publicUser}) => {
    return <div className="about-container absolute inset-y-0 left-0">
        <img className=" image rounded-lg m-12 mt-32"  src={publicUser.id === 1 ? "src/resources/manuel.jpg":publicUser.id === 2 ? "src/resources/manuel.jpg":publicUser.id === 3 ?"src/resources/manuel.jpg":"" }></img>
        <h2 className="header">About: {publicUser.name}</h2>
        <section className="text">{publicUser.aboutDescription}</section>
    </div>;
}

export default About;