import React from "react";
import { Link } from 'react-router-dom'; // Import Link for navigation
import "./Intro.css";

const Intro = () => {
  return (
    <section className="intro">
      <div className="intro-content">
        <h2 className="intro-heading">
          Smarter Photography with Face Recognition
        </h2>
        <p className="intro-text">
          Our advanced <strong>AI-powered Face Recognition</strong> technology helps categorize and sort images with ease. 
          This feature allows students to explore and organize club photos effortlessly, creating a seamless and engaging experience.
        </p>
        <p className="intro-highlight">
          Students can log in to unlock personalized galleries and contribute to our collection.Now Students can get access to download
          the images by Logging in.
        </p>
        <Link to="/Login" className="btn-login"> Log In to Get Started</Link>
      </div>
    </section>
  );
};

export default Intro;