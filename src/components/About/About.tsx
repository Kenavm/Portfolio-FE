import React from 'react';
import './About.css'
import PublicUser from '../../types/PublicUser'

interface AboutMeProps {
   publicUser: PublicUser
}

const About: React.FC<AboutMeProps> = ({publicUser}) => {
    return (
        <div className="about-container absolute inset-y-10 left-5">
          <img
            className="image rounded-lg m-12 mt-15"
            src={publicUser.id === 1 ? "src/resources/manuel.jpg" : publicUser.id === 2 ? "src/resources/manuel.jpg" : publicUser.id === 3 ? "src/resources/manuel.jpg" : ""}
            alt="User Image"
          />
          <h2 className="header">About: {publicUser.name}</h2>
          <section className="text absolute inset-y-50">
            {publicUser.aboutDescription}
          </section>
        </div>
      );
      
}

export default About;