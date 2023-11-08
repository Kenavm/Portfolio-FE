import './About.css'
import PublicUser from '../../types/PublicUser'

interface AboutMeProps {
   publicUser: PublicUser
}

const About: React.FC<AboutMeProps> = ({publicUser}) => {
    return <div className="about-container">
        <img src={publicUser.id === 1 ? "src/resources/manuel.jpg":publicUser.id === 2 ? "src/resources/manuel.jpg":publicUser.id === 3 ?"src/resources/manuel.jpg":"" } className="image"></img>
        <h2 className="header">About: {publicUser.name}</h2>
        <section className="text">{publicUser.aboutDescription}</section>
    </div>;
}

export default About;