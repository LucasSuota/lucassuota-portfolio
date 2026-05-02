import './About.css';
import meImg from '../assets/me.webp';

/**
 * About Section
 * Just a static profile with an image and text.
 */
const About = () => {
  return (
    <section className="about section section--muted" id="about">
      <div className="about__header container">
        <div className="about__me">
          <div className="about__me-image-wrapper">
            <img src={meImg} alt="Lucas" className="about__me-image" />
          </div>
          <div className="about__me-text">
            <h1 className="about__heading about__heading-word">Hey, I'm Lucas!</h1>

            <p className="about__subheading about__heading-word">
              I build React, React Native and Desktop Applications using TypeScript.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
