import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For managing selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal visibility
  const [selectedFolder, setSelectedFolder] = useState(null); // For managing the selected folder

  // Sample gallery data with folders and images
  const galleryData = [
    { 
      folderName: 'Enchante', 
      images: [
        { id: 1, url: '/Gallery/Enchante/Enchante1.jpg', title: 'Enchante 1' },
        { id: 2, url: '/Gallery/Enchante/Enchante2.jpg', title: 'Enchante 2' },
        { id: 3, url: '/Gallery/Enchante/Enchante3.jpg', title: 'Enchante 3' }
      ]
    },
    { 
      folderName: 'Flashmob', 
      images: [
        { id: 4, url: '/Gallery/Flashmob/Flashmob1.jpg', title: 'Flashmob 1' },
        { id: 5, url: '/Gallery/Flashmob/Flashmob2.jpg', title: 'Flashmob 2' },
        { id: 6, url: '/Gallery/Flashmob/Flashmob3.jpg', title: 'Flashmob 3' }
      ]
    }, 

    { 
      folderName: 'Football', 
      images: [
        { id: 7, url: '/Gallery/Football/Football1.jpg', title: 'Football 1' },
        { id: 8, url: '/Gallery/Football/Football2.jpg', title: 'Football 2' },
        { id: 9, url: '/Gallery/Football/Football3.jpg', title: 'Football 3' }
      ]
    },

    { 
      folderName: 'Hackathon', 
      images: [
        { id: 10, url: '/Gallery/Hackathon/Hackathon1.jpg', title: 'Hackathon 1' },
        { id: 11, url: '/Gallery/Hackathon/Hackathon2.jpg', title: 'Hackathon 2' },
        { id: 12, url: '/Gallery/Hackathon/Hackathon3.jpg', title: 'Hackathon 3' }
      ]
    },

    { 
      folderName: 'Handila', 
      images: [
        { id: 13, url: '/Gallery/Handila/Handila1.jpg', title: 'Handila 1' },
        { id: 14, url: '/Gallery/Handila/Handila2.jpg', title: 'Handila 2' },
        { id: 15, url: '/Gallery/Handila/Handila3.jpg', title: 'Handila 3' }
      ]
    },

    { 
      folderName: 'Basketball', 
      images: [
        { id: 16, url: '/Gallery/basketball/Basketball1.jpg', title: 'Basketball 1' },
        { id: 17, url: '/Gallery/basketball/Basketball2.jpg', title: 'Basketball 2' },
        { id: 18, url: '/Gallery/basketball/Basketball3.jpg', title: 'Basketball 3' }
      ]
    },

    { 
      folderName: 'Campus', 
      images: [
        { id: 19, url: '/Gallery/Campus/Photo1.jpg', title: 'Photo 1' },
        { id: 20, url: '/Gallery/Campus/Photo2.jpg', title: 'Photo 2' },
        { id: 21, url: '/Gallery/Campus/Photo3.jpg', title: 'Photo 3' },
        { id: 22, url: '/Gallery/Campus/Photo4.jpg', title: 'Photo 3' },
        { id: 23, url: '/Gallery/Campus/Photo5.jpg', title: 'Photo 3' }
      ]
    },

  ];

  // Handle opening the modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Handle image download
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = selectedImage.url;
    link.download = selectedImage.title || 'download.jpg'; // Use image title as the filename
    link.click();
  };

  // Handle folder click
  const openFolder = (folder) => {
    setSelectedFolder(folder);
  };

  return (
    <div className="Gallery-container">
      <h1>Gallery</h1>
      
      {/* Display folders */}
      {selectedFolder === null ? (
        <div className="folders">
          {galleryData.map((folder, index) => (
            <div key={index} className="folder-card" onClick={() => openFolder(folder)}>
              <h2>{folder.folderName}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Display images in the selected folder */}
          <button className="back-btn" onClick={() => setSelectedFolder(null)}>Back to Folders</button>
          <div className="image-grid">
            {selectedFolder.images.map((photo) => (
              <div key={photo.id} className="image-item">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  onClick={() => openModal(photo)} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for viewing the image */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} className="modal-image" />
            <button className="download-btn" onClick={downloadImage}>
              Download Image
            </button>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
