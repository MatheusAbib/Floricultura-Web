import React, { useState } from 'react';
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
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = product ? isFavorite(product.id) : false;
    const isOutOfStock = !!(product.outOfStock || product.stock === 0);
    const justAdded = isAdded || addedProductId === product.id;

    const handleAddToCart = () => {
        onAddToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleToggleFavorite = () => {
        toggleFavorite(product);
    };

    const highlightText = (text, term) => {
        if (!term || !term.trim()) return text;

        const regex = new RegExp(`(${term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

        return text.split(regex).map((part, i) =>
            i % 2 === 1 ? (
                <mark key={i} className="product-highlight">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    const badgeClass = product.badge ? `badge-${product.badge}` : '';
    const badgeLabel = product.badge === 'new' ? 'Novo'
        : product.badge === 'bestseller' ? 'Mais vendido'
        : product.badge === 'sale' ? 'Promo��o'
        : '';

    return (
        <article className="product-card">
            <div className="product-card-media">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                    loading="lazy"
                />

                <button
                    type="button"
                    className={`product-card-fav ${isFav ? 'is-active' : ''}`}
                    onClick={handleToggleFavorite}
                    title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    aria-pressed={isFav}
                >
                    <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
                </button>

                {showBadge && product.badge && (
                    <span className={`product-card-badge ${badgeClass}`}>
                        {badgeLabel}
                    </span>
                )}
            </div>

            <div className="product-card-body">
                <h3 className="product-card-name">
                    {highlightText(product.name, searchTerm)}
                </h3>

                {showRating && (
                    <div className="product-card-rating" aria-hidden="true">
                        {renderRating(product.rating).map((star, i) => (
                            <i key={i} className={`bi ${star}`} />
                        ))}
                    </div>
                )}

                <div className="product-card-pricing">
                    {product.oldPrice ? (
                        <span className="product-card-old">{formatCurrency(product.oldPrice)}</span>
                    ) : (
                        <span className="product-card-old is-placeholder" aria-hidden="true" />
                    )}
                    <span className="product-card-price">{formatCurrency(product.price)}</span>
                </div>

                {showActions && (
                    <div className="product-card-actions">
                        <button
                            type="button"
                            className="product-card-btn product-card-btn-ghost"
                            onClick={() => onOpenModal(product)}
                            title="Ver detalhes"
                            aria-label={`Ver detalhes de ${product.name}`}
                        >
                            <i className="bi bi-eye" aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            className={`product-card-btn product-card-btn-primary ${justAdded ? 'is-added' : ''} ${isOutOfStock ? 'is-out' : ''}`}
                            onClick={handleAddToCart}
                            disabled={justAdded || isOutOfStock}
                            aria-live="polite"
                        >
                            {isOutOfStock ? (
                                <>
                                    <i className="bi bi-slash-circle" aria-hidden="true" />
                                    Esgotado
                                </>
                            ) : justAdded ? (
                                <>
                                    <i className="bi bi-check2-circle" aria-hidden="true" />
                                    Adicionado
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-cart-plus" aria-hidden="true" />
                                    Adicionar
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export default ProductCard;