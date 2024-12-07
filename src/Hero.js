// src/Hero.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Hero.css';

const Hero = () => {
  const images = [
    '/Hero/image1.jpg',
    '/Hero/image2.jpg',
    '/Hero/image3.jpg',
    '/Hero/image4.jpg',
    '/Hero/image5.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Set up an interval to update the currentImage every 3 seconds
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3000ms (3 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Club</h1>
        <p>Explore the world of photography and creativity.</p>
        {/* Use React Router's Link for internal navigation */}
        <Link to="/Gallery" className="btn-explore">Explore Our Gallery</Link>
      </div>
      <div className="hero-image">
        <img src={images[currentImage]} alt="Slideshow" />
      </div>
    </section>
  );
};

export default Hero;
