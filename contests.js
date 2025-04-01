import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./contests.css";

const API_BASE_URL = "http://150.230.138.173:8087";

const folderData = [
  { folderName: "Blinding Lights", folderId: "Blinding_lights" },
  { folderName: "Creatures", folderId: "Creatures" },
  { folderName: "Dusk", folderId: "Dusk" },
];

const Contests = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async (folderId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images/${folderId}`);
      if (response.data && Array.isArray(response.data)) {
        setImages(response.data);
      } else {
        setError("No images found in this folder.");
      }
    } catch (error) {
      setError("Failed to load images. Please check your server.");
    } finally {
      setLoading(false);
    }
  }, []);

  const openFolder = (folder) => {
    setSelectedFolder(folder);
    fetchImages(folder.folderId);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="contests-container">
      {!selectedFolder ? (
        <div className="folders">
          {folderData.map((folder) => (
            <div key={folder.folderId} className="folder-card" onClick={() => openFolder(folder)}>
              <h2>{folder.folderName}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="image-section">
          <button className="back-btn" onClick={() => setSelectedFolder(null)}>Back</button>
          {loading ? (
            <p>Loading images...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="image-grid">
              {images.map((photo, index) => (
                <div key={index} className="image-item" onClick={() => openModal(photo)}>
                  <img src={photo.thumbnail} alt={photo.title || "Contest Image"} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.thumbnail} alt={selectedImage.title || "Contest Image"} className="modal-image" />
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contests;
