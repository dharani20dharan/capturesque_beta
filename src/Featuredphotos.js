import React, { useState, useEffect } from "react";
import "./Featuredphotos.css";

const Featuredphotos = () => {
  const categories = ["All", "Enchante", "Hackathon", "Independence Cup"];
  const allPhotos = [
    { src: "/feature/photo1.jpg", category: "Enchante" },
    { src: "/feature/photo2.jpg", category: "Enchante" },
    { src: "/feature/photo3.jpg", category: "Enchante" },
    { src: "/feature/photo4.jpg", category: "Hackathon" },
    { src: "/feature/photo5.jpg", category: "Hackathon" },
    { src: "/feature/photo6.jpg", category: "Independence Cup" },
    { src: "/feature/photo7.jpg", category: "Independence Cup" },
    { src: "/feature/photo8.jpg", category: "Independence Cup" },
    { src: "/feature/photo9.jpg", category: "Hackathon" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredPhotos, setFilteredPhotos] = useState(allPhotos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Filter photos based on the selected category
    const filtered =
      activeCategory === "All"
        ? allPhotos
        : allPhotos.filter((photo) => photo.category === activeCategory);
    setFilteredPhotos(filtered);
    setCurrentIndex(0); // Reset to the first photo when category changes
  }, [activeCategory]);

  useEffect(() => {
    // Automatic carousel sliding every 3 seconds
    const timer = setInterval(() => {
      if (filteredPhotos.length > 0) {
        nextPhoto();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [filteredPhotos]);

  const nextPhoto = () => {
    setAnimate(true); // Trigger animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPhotos.length);
      setAnimate(false); // Reset animation
    }, 500); // Match the animation duration
  };

  const prevPhoto = () => {
    setAnimate(true); // Trigger animation
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
      setAnimate(false); // Reset animation
    }, 500);
  };

  return (
    <section className="featured-photos">
      <h2>Featured Photos</h2>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              activeCategory === category ? "active" : ""
            }`}
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
              &#10094; {/* Left Arrow */}
            </button>
            <div
              className={`photo ${
                animate ? "fade-out" : "fade-in"
              }`} /* Animation Classes */
            >
              <img
                src={filteredPhotos[currentIndex].src}
                alt={filteredPhotos[currentIndex].category}
              />
              <p className="photo-category">
                {filteredPhotos[currentIndex].category}
              </p>
            </div>
            <button className="carousel-btn next" onClick={nextPhoto}>
              &#10095; {/* Right Arrow */}
            </button>
          </>
        ) : (
          <p>No photos available in this category.</p>
        )}
      </div>
    </section>
  );
};

export default Featuredphotos;
