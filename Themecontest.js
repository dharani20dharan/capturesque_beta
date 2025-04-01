import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Gallery.css';

// Folder data for the gallery
const folderData = [
  { folderName: 'MountainsandBeaches', folderId: 'MountainsandBeaches' },
  { folderName: 'Campus', folderId: 'Campus' },
  { folderName: 'Enchante', folderId: 'Enchante' },
  { folderName: 'Flashmob', folderId: 'Flashmob' },
  { folderName: 'Football', folderId: 'Hackathon' },
  { folderName: 'Handila', folderId: 'Handila' },
];

const Gallery = () => {
  const [folders] = useState(folderData); // Folder data (static)
  const [selectedFolder, setSelectedFolder] = useState(null); // Currently selected folder
  const [images, setImages] = useState([]); // Images in the selected folder
  const [selectedImage, setSelectedImage] = useState(null); // Image selected for modal view
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [loading, setLoading] = useState(false); // Loading state for images
  const [error, setError] = useState(null); // Error state
  const [imageLoadState, setImageLoadState] = useState({}); // Image loading status for each image

  /**
   * Fetch images for the selected folder using Google Drive API.
   * @param {string} folderId - ID of the folder to fetch images from.
   */
  const fetchImages = useCallback(async (folderName) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(`http://150.230.138.173:8087/api/images/${folderName}`);
      if (response.data && Array.isArray(response.data)) {
        const imageList = response.data.map((file) => ({
          id: file.id,
          url: file.url, // Full image URL
          title: file.name, // Image title
          thumbnail: file.thumbnail, // Thumbnail URL
          download: file.download, // Download link from backend
        }));
        console.log(imageList);
        setImages(imageList);
      } else {
        setError('No images found in this folder.');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images. Please check your server.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  
  
  


  /**
   * Handle opening a folder and fetching its images.
   * @param {Object} folder - Folder object containing name and ID.
   */
  const openFolder = (folder) => {
    setSelectedFolder(folder);
    fetchImages(folder.folderId);
  };

  /**
   * Handle opening an image in the modal view.
   * @param {Object} image - Image object containing details.
   */
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  /**
   * Handle closing the modal view.
   */
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  /**
   * Mark an image as loaded.
   * @param {string} id - ID of the loaded image.
   */
  const handleImageLoad = (id) => {
    setImageLoadState((prevState) => ({ ...prevState, [id]: true }));
  };

  return (
    <div className="Gallery-container">
      {/* Folder selection view */}
      {!selectedFolder ? (
        <div className="folders">
          {folders.map((folder) => (
            <div
              key={folder.folderId}
              className="folder-card"
              onClick={() => openFolder(folder)}
            >
              <h2>{folder.folderName}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Back button */}
          <button className="back-btn" onClick={() => setSelectedFolder(null)}>
            Back to Folders
          </button>

          {/* Image grid */}
          {loading ? (
            <p>Loading images...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="image-grid">
              {images.map((photo) => (
                <div key={photo.id} className="image-item">
                  {!imageLoadState[photo.id] && <div className="spinner"></div>}
                  <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    onClick={() => openModal(photo)}
                    onLoad={() => handleImageLoad(photo.id)}
                    onError={() =>
                      setImageLoadState((prevState) => ({
                        ...prevState,
                        [photo.id]: false,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal view for selected image */}
      {isModalOpen && selectedImage && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <img
        src={selectedImage.thumbnail}
        alt={selectedImage.title}
        className="modal-image"
      />
      <button
        className="download-btn"
        onClick={() => {
          const link = document.createElement('a');
          link.href = selectedImage.download; // Use the download link from the backend
          link.download = selectedImage.title || 'download.jpg';
          link.click();
        }}
      >
        Download Image
      </button>
      <button className="close-btn" onClick={closeModal}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Gallery;
