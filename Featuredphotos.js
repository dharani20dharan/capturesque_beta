import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Featuredphotos.css";

const API_BASE_URL = "http://150.230.138.173:8087";
const FEATURE_FOLDER = "Feature";

const Featuredphotos = () => {
  const [categories, setCategories] = useState(["All"]);
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subfolders inside "Feature" folder
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/folders/${FEATURE_FOLDER}`);
        console.log("Fetched categories:", response.data);

        if (response.data && response.data.subfolders && Array.isArray(response.data.subfolders)) {
          setCategories(["All", ...response.data.subfolders]);
        } else {
          setError("No categories found.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please check your server.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch images from selected folder
  useEffect(() => {
    const fetchImages = async () => {
      if (activeCategory === "All") {
        setFilteredPhotos([]);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/images/${FEATURE_FOLDER}/${activeCategory}`);
        console.log("Fetched images:", response.data);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setPhotos(response.data);
          setFilteredPhotos(response.data);
          setError(null);
        } else {
          setFilteredPhotos([]);
          setError("No images found in this category.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setFilteredPhotos([]);
        setError("Failed to load images. Please check your server.");
      }
    };

    fetchImages();
  }, [activeCategory]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (filteredPhotos.length > 1) {
      const timer = setInterval(() => {
        nextPhoto();
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [filteredPhotos, currentIndex]);

  // Next and previous photo functions
  const nextPhoto = () => {
    if (filteredPhotos.length > 0) {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPhotos.length);
        setAnimate(false);
      }, 500);
    }
  };

  const prevPhoto = () => {
    if (filteredPhotos.length > 0) {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
        setAnimate(false);
      }, 500);
    }
  };

  return (
    <section className="featured-photos">
      <h2>Featured Photos</h2>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="carousel">
        {filteredPhotos.length > 0 ? (
          <>
            <button className="carousel-btn prev" onClick={prevPhoto}>
              &#10094;
            </button>
            <div className={`photo ${animate ? "fade-out" : "fade-in"}`}>
              <img src={filteredPhotos[currentIndex]?.src} alt={filteredPhotos[currentIndex]?.category || "Photo"} />
              <p className="photo-category">{filteredPhotos[currentIndex]?.category}</p>
            </div>
            <button className="carousel-btn next" onClick={nextPhoto}>
              &#10095;
            </button>
          </>
        ) : (
          <p className="error">{error || "No photos available in this category."}</p>
        )}
      </div>
    </section>
  );
};

export default Featuredphotos;