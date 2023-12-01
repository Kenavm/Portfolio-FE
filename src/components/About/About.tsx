import React from "react";
import PublicUser from "../../types/PublicUser";
import Button from "../Button/Button";
import Skill from "../../types/Skill";
import Technology from "../../types/Technology";
import SkillList from "../SkillList/SkillList";

interface AboutMeProps {
  publicUser: PublicUser;
  loggedIn: boolean;
  onDisplayEditAboutModal?: (about: boolean) => void;
  skills: Array<Skill>;
  technologies: Array<Technology>;
}

const About: React.FC<AboutMeProps> = ({
  publicUser,
  loggedIn,
  onDisplayEditAboutModal = () => {},
  skills,
  technologies,
}) => {
  return (
    <div className="flex flex-column">
      <div className="about-container absolute inset-y-20 left-5">
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
        <h2 className="header text-2xl font-bold mb-2">About {publicUser.name}</h2>
        <section className="text absolute inset-y-50">
          {publicUser.aboutDescription}
          {loggedIn && (
            <div>
              <Button
                onClick={() => onDisplayEditAboutModal(true)}
                buttonText="Edit About"
                className="mt-4"
              />
            </div>
          )}
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Technical Skills</h2>
            <SkillList skills={skills} technologies={technologies} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
