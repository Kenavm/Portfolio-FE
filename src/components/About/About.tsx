import React from "react";
import PublicUser from "../../types/PublicUser";
import Button from "../Button/Button";

interface AboutMeProps {
  publicUser: PublicUser;
  loggedIn: boolean;
  onDisplayEditAboutModal: (about: boolean) => void;
}

const About: React.FC<AboutMeProps> = ({
  publicUser,
  loggedIn,
  onDisplayEditAboutModal,
}) => {
  return (
    <div className="flex flex-column">
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
          {loggedIn && (
            <Button
              onClick={() => onDisplayEditAboutModal(true)}
              buttonText="Edit About"
              className="mt-4"
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default About;
