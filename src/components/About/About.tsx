import React from "react";
import "./About.css";
import PublicUser from "../../types/PublicUser";
import Skill from "../../types/Skill";

interface AboutMeProps {
  publicUser: PublicUser;
}

const About: React.FC<AboutMeProps> = ({ publicUser }) => {
  console.log(publicUser);
  return (
    <div>
      <div className="about-container absolute inset-y-10 left-5">
        <img
          className="image rounded-lg m-12 mt-15"
          src={
            publicUser.id === 1
              ? "/theresa.jpg"
              : publicUser.id === 2
              ? "/manuel.jpg"
              : publicUser.id === 3
              ? "/manuel.jpg"
              : ""
          }
          alt="User Image"
        />
        <h2 className="header">About: {publicUser.name}</h2>
        <section className="text absolute inset-y-50">
          {publicUser.aboutDescription}
        </section>
      </div>
      <div className="skills">
        {publicUser.skillList.map((s: Skill) => (
          <div key={s.id}>Skill {s.idTechnology}</div>
        ))}
      </div>
    </div>
  );
};

export default About;
