import React, { useState, useRef } from 'react';
import './ProductImageGallery.scss';

function ProductImageGallery({ images, alt, productName }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    return (
        <div className="product-gallery">
            <div 
                className={`main-image-container ${isZooming ? 'zooming' : ''}`}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
            >
                <img
                    ref={imageRef}
                    src={images[selectedImage]}
                    alt={`${alt} - imagem ${selectedImage + 1}`}
                    className="main-image"
                    style={{
                        transform: isZooming ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                />
                {isZooming && (
                    <div className="zoom-overlay">
                        <i className="bi bi-zoom-in"></i>
                    </div>
                )}
            </div>

            <div className="thumbnail-list">
                {images.map((img, index) => (
                    <div 
                        key={index}
                        className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => handleImageClick(index)}
                    >
                        <img src={img} alt={`${productName} - miniatura ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductImageGallery;