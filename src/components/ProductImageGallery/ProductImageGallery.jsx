import React, { useState, useRef } from 'react';
import './ProductImageGallery.scss';

function ProductImageGallery({ images, alt, productName, actionSlot }) {
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

    const hasMultiple = images.length > 1;

    return (
        <div className="product-gallery">
            <div
                className={`product-gallery-main ${isZooming ? 'is-zooming' : ''}`}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
            >
                <img
                    ref={imageRef}
                    src={images[selectedImage]}
                    alt={`${alt} - imagem ${selectedImage + 1}`}
                    className="product-gallery-image"
                    style={{
                        transform: isZooming ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                />
                {actionSlot && (
                    <div className="product-gallery-action">
                        {actionSlot}
                    </div>
                )}
                {isZooming && (
                    <span className="product-gallery-zoom" aria-hidden="true">
                        <i className="bi bi-zoom-in" />
                    </span>
                )}
            </div>

            {hasMultiple && (
                <div className="product-gallery-thumbs">
                    {images.map((img, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`product-gallery-thumb ${selectedImage === index ? 'is-active' : ''}`}
                            onClick={() => handleImageClick(index)}
                            aria-label={`Ver imagem ${index + 1}`}
                        >
                            <img src={img} alt={`${productName} - miniatura ${index + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductImageGallery;