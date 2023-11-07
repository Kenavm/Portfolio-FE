import './About.css'

interface AboutMeProps {
    image: string,
    header: string,
    text:string
}

const About: React.FC<AboutMeProps> = ({image, header, text}) => {
    return <div className="about-container">
        <img src={image} className="image"></img>
        <h2 className="header">{header}</h2>
        <p className="text">{text}</p>
    </div>;
}

export default About;