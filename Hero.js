import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Hero.css';

const API_BASE_URL = "http://150.230.138.173:8087"; 
const HERO_FOLDER = "Hero"; // Define the folder name

const Hero = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/images/${HERO_FOLDER}`);
        if (response.data && Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          setError("No images found for Hero section.");
        }
      } catch (error) {
        setError("Failed to load Hero images. Please check your server.");
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Club</h1>
        <p>Explore the world of photography and creativity.</p>
        <Link to="/Gallery" className="btn-explore">Explore Our Gallery</Link>
      </div>
      <div className="hero-image">
        {images.length > 0 ? (
          <img src={images[currentImage]?.url} alt="Slideshow" />

        ) : (
          <p>{error || "Loading images..."}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;
