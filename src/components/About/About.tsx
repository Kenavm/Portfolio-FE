import './About.css'
import PublicUser from '../../types/PublicUser'

interface AboutMeProps {
   publicUser: PublicUser
}

const About: React.FC<AboutMeProps> = ({publicUser}) => {
    return <div className="about-container">
        <img src={publicUser.profilePicture} className="image"></img>
        <h2 className="header">About: {publicUser.name}</h2>
        <p className="text">{publicUser.about}</p>
    </div>;
}

export default About;