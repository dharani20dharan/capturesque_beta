import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaFolder, FaArrowLeft, FaDownload, FaTimes } from 'react-icons/fa';
import './Gallery.css';

const API_BASE_URL = "http://150.230.138.173:8087";

const folderData = [
  { folderName: 'Basketball', folderId: 'Basketball' },
  { folderName: 'Campus', folderId: 'Campus' },
  { folderName: 'Enchante', folderId: 'Enchante' },
  { folderName: 'Flashmob', folderId: 'Flashmob' },
  { folderName: 'Football', folderId: 'Football' },
  { folderName: 'Handila', folderId: 'Handila' },
];

const Gallery = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const fetchImages = useCallback(async (folderId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images/${folderId}`);
      if (response.data && Array.isArray(response.data)) {
        setImages(response.data);
      } else {
        setError('No images found in this folder.');
      }
    } catch (error) {
      setError('Failed to load images. Please check your server.');
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
  const downloadImage = async (image) => {
    if (!isLoggedIn) {
      alert("You must be logged in to download images.");
      return;
    }
  
    if (!image || !image.name) { // Use `image.name` instead of `image.filename`
      console.error("Error: Image name is undefined!", image);
      alert("Error: Unable to download image. Filename is missing.");
      return;
    }
  
    const fileName = encodeURIComponent(image.name); // Encode to handle special characters
    const downloadUrl = `${API_BASE_URL}/api/download/${selectedFolder.folderId}/${fileName}`;
  
    console.log("Downloading from:", downloadUrl);
  
    try {
      const response = await axios.get(downloadUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: "blob", // Ensure we receive binary data
      });
  
      if (response.status !== 200) {
        throw new Error("Failed to fetch the image.");
      }
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
  
      // Extract filename from Content-Disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      let suggestedFileName = image.name;
  
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match) {
          suggestedFileName = match[1];
        }
      }
  
      link.setAttribute("download", suggestedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      console.log("Download successful:", suggestedFileName);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download the image. Please try again.");
    }
  };
  
  

  return (
    <div className="gallery-container">
      {!selectedFolder ? (
        <div className="folders">
          {folderData.map((folder) => (
            <div key={folder.folderId} className="folder-card" onClick={() => openFolder(folder)}>
              <FaFolder className="folder-icon" />
              <h3>{folder.folderName}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button className="back-btn" onClick={() => setSelectedFolder(null)}>
            <FaArrowLeft /> Back
          </button>
          {loading ? <p className="loading">Loading images...</p> : error ? <p className="error">{error}</p> : (
            <div className="image-grid">
              {images.map((photo) => (
                <div key={photo.id} className="image-item" onClick={() => openModal(photo)}>
                  <img src={photo.thumbnail} alt={photo.title} />
                  <p>{photo.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.thumbnail} alt={selectedImage.title} className="modal-image" />
            <p className="image-title">{selectedImage.title}</p>
            {isLoggedIn && (
              <button className="download-btn" onClick={() => downloadImage(selectedImage)}>
                <FaDownload /> Download
              </button>
            )}
            <button className="close-btn" onClick={closeModal}><FaTimes /> Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
