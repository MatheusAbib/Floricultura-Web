import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { renderRating } from '../../utils/renderRating';
import { useFavorites } from '../../context/FavoritesContext';
import './ProductCard.scss';

function ProductCard({ 
    product, 
    searchTerm = '', 
    onAddToCart, 
    onOpenModal,
    addedProductId = null,
    showBadge = true,
    showRating = true,
    showActions = true
}) {
    const [isAdded, setIsAdded] = useState(false);
    const { toggleFavorite, isFavorite, favorites } = useFavorites();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (product) {
            setIsFav(isFavorite(product.id));
        }
    }, [product, isFavorite, favorites]);

    const handleAddToCart = () => {
        onAddToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleToggleFavorite = () => {
        const wasFavorited = toggleFavorite(product);
        setIsFav(wasFavorited);
    };

    const highlightText = (text, term) => {
        if (!term || !term.trim()) return text;
        const regex = new RegExp(`(${term.trim()})`, 'gi');
        return text.split(regex).map((part, i) => 
            regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
        );
    };

    const getBadgeClass = (badge) => {
        const classes = {
            new: 'badge-new',
            bestseller: 'badge-bestseller',
            sale: 'badge-sale'
        };
        return classes[badge] || '';
    };

    const getBadgeText = (badge) => {
        const texts = {
            new: 'Novo',
            bestseller: 'Mais Vendido',
            sale: 'Promoção'
        };
        return texts[badge] || '';
    };

    return (
        <div className="product-card-item">
            <div className="card h-100">
                <div className="product-image-wrapper">
                    <button 
                        className={`favorite-btn ${isFav ? 'active' : ''}`}
                        onClick={handleToggleFavorite}
                        title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                        <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                    />
                    {showBadge && product.badge && (
                        <span className={`product-badge ${getBadgeClass(product.badge)}`}>
                            {getBadgeText(product.badge)}
                        </span>
                    )}
                </div>
                <div className="card-body">
                    <h6 className="card-title text-start">
                        {highlightText(product.name, searchTerm)}
                    </h6>
                    <p className="card-text text-start">
                        {highlightText(product.description, searchTerm)}
                    </p>
                    {showRating && (
                        <div className="product-rating text-start">
                            {renderRating(product.rating).map((star, i) => (
                                <i key={i} className={`bi ${star}`}></i>
                            ))}
                        </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        {product.oldPrice && (
                            <span className="product-old-price">{formatCurrency(product.oldPrice)}</span>
                        )}
                        {!product.oldPrice && <span></span>}
                        <span className="product-price">{formatCurrency(product.price)}</span>
                    </div>
                    {showActions && (
                        <div className="d-flex gap-1 mt-2">
                            <button 
                                className="btn btn-outline-orange btn-sm flex-grow-1"
                                onClick={() => onOpenModal(product)}
                                title="Visualizar detalhes"
                            >
                                <i className="bi bi-eye"></i>
                            </button>
                            <button 
                                className={`btn btn-success btn-sm flex-grow-1 ${isAdded || addedProductId === product.id ? 'btn-added' : ''}`}
                                onClick={handleAddToCart}
                                disabled={isAdded || addedProductId === product.id}
                            >
                                {isAdded || addedProductId === product.id ? (
                                    <>
                                        <i className="bi bi-check-circle me-1"></i>Adicionado!
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-cart-plus me-1"></i>Adicionar
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;