import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { renderRating } from '../../utils/renderRating';
import { useFavorites } from '../../context/FavoritesContext';
import ProductImageGallery from '../ProductImageGallery/ProductImageGallery';
import './ProductModal.scss';

function ProductModal({ product, isOpen, onClose, onAddToCart, onAddMultiple }) {
    const [quantity, setQuantity] = useState(1);
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = product ? isFavorite(product.id) : false;

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const images = product.images || [product.image];
    const isPlanta = product.category === 'plantas'
        || product.category === 'flores'
        || product.category === 'inverno'
        || product.category === 'sementes';

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        const stockLimit = product.stock || 99;
        if (newQuantity >= 1 && newQuantity <= stockLimit) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (onAddMultiple) {
            onAddMultiple(product, quantity);
        } else {
            for (let i = 0; i < quantity; i++) {
                onAddToCart(product);
            }
        }
        onClose();
    };

    const handleToggleFavorite = () => {
        toggleFavorite(product);
    };

    const isOutOfStock = !!(product.outOfStock || product.stock === 0);
    const stockText = isOutOfStock ? 'Produto esgotado' : `${product.stock} unidades disponíveis`;
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';

    const iconMap = {
        tipo: 'bi bi-tag',
        uva: 'bi bi-cup-straw',
        safra: 'bi bi-calendar-event',
        teorAlcoolico: 'bi bi-percent',
        volume: 'bi bi-cup-straw',
        harmonizacao: 'bi bi-egg-fried',
        tamanho: 'bi bi-rulers',
        material: 'bi bi-box',
        cores: 'bi bi-palette',
        inclui: 'bi bi-gift',
        recomendacao: 'bi bi-info-circle',
        variedades: 'bi bi-grid-3x3-gap',
        tipos: 'bi bi-list-ul',
        peso: 'bi bi-arrow-down-up',
        embalagem: 'bi bi-box-seam',
        validade: 'bi bi-clock-history',
        itens: 'bi bi-list-check',
        petiscos: 'bi bi-cup-straw',
        cervejas: 'bi bi-cup-straw',
        flores: 'bi bi-flower1',
        altura: 'bi bi-rulers',
        embrulho: 'bi bi-gift',
        acompanha: 'bi bi-envelope-paper',
        durabilidade: 'bi bi-clock',
        quantidade: 'bi bi-hash',
        formato: 'bi bi-grid-3x3-gap',
        origem: 'bi bi-globe-americas',
        frase: 'bi bi-chat-quote'
    };

    const labelMap = {
        tipo: 'Tipo',
        uva: 'Uva',
        safra: 'Safra',
        teorAlcoolico: 'Teor alcoólico',
        volume: 'Volume',
        harmonizacao: 'Harmonização',
        tamanho: 'Tamanho',
        material: 'Material',
        cores: 'Cores',
        inclui: 'Inclui',
        recomendacao: 'Recomendação',
        variedades: 'Variedades',
        tipos: 'Tipos',
        peso: 'Peso',
        embalagem: 'Embalagem',
        validade: 'Validade',
        itens: 'Itens',
        petiscos: 'Petiscos',
        cervejas: 'Cervejas',
        flores: 'Flores',
        altura: 'Altura',
        embrulho: 'Embrulho',
        acompanha: 'Acompanha',
        durabilidade: 'Durabilidade',
        quantidade: 'Quantidade',
        formato: 'Formato',
        origem: 'Origem',
        frase: 'Frase'
    };

    const getDetailsConfig = (details) => {
        if (!details) return { title: '', items: [] };

        if (isPlanta) {
            return {
                title: 'Como cuidar',
                items: [
                    { icon: 'bi bi-brightness-high', label: 'Luz', value: details.light },
                    { icon: 'bi bi-droplet', label: 'Água', value: details.water },
                    { icon: 'bi bi-wind', label: 'Umidade', value: details.humidity },
                    { icon: 'bi bi-thermometer-half', label: 'Temperatura', value: details.temperature },
                    { icon: 'bi bi-heart', label: 'Cuidados', value: details.care },
                    { icon: 'bi bi-exclamation-triangle', label: 'Toxicidade', value: details.toxicity }
                ].filter(item => item.value)
            };
        }

        const items = Object.entries(details)
            .filter(([key, value]) => value && value !== '')
            .map(([key, value]) => ({
                icon: iconMap[key] || 'bi bi-info-circle',
                label: labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1),
                value: value
            }));

        return {
            title: 'Detalhes do produto',
            items: items
        };
    };

    const detailsConfig = getDetailsConfig(product.details);

    const favoriteButton = (
        <button
            type="button"
            className={`modal-fav ${isFav ? 'is-active' : ''}`}
            onClick={handleToggleFavorite}
            title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-pressed={isFav}
        >
            <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
        </button>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="product-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={product.name}
            >
                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    ✕
                </button>

                <div className="modal-content">
                    <ProductImageGallery
                        images={images}
                        alt={product.name}
                        productName={product.name}
                        actionSlot={favoriteButton}
                    />

                    <div className="modal-info">
                        <header className="modal-header">
                            <h2 className="modal-title">{product.name}</h2>
                            {product.rating > 0 && (
                                <div className="modal-rating" aria-hidden="true">
                                    {renderRating(product.rating).map((star, i) => (
                                        <i key={i} className={`bi ${star}`} />
                                    ))}
                                    <span className="modal-rating-text">({product.rating})</span>
                                </div>
                            )}
                        </header>

                        <div className="modal-prices">
                            {product.oldPrice && (
                                <span className="modal-old-price">{formatCurrency(product.oldPrice)}</span>
                            )}
                            <span className="modal-price">{formatCurrency(product.price)}</span>
                        </div>

                        <div className={`modal-stock ${stockClass}`}>
                            <i
                                className={`bi ${isOutOfStock ? 'bi-x-circle' : 'bi-check-circle'}`}
                                aria-hidden="true"
                            />
                            <span>{stockText}</span>
                        </div>

                        {product.description && (
                            <div className="modal-block">
                                <h3 className="modal-block-title">
                                    {isPlanta ? 'Sobre a planta' : 'Sobre o produto'}
                                </h3>
                                <p className="modal-block-text">{product.description}</p>
                            </div>
                        )}

                        {product.details && detailsConfig.items.length > 0 && (
                            <div className="modal-block">
                                <h3 className="modal-block-title">{detailsConfig.title}</h3>
                                <ul className="modal-details">
                                    {detailsConfig.items.map((item, index) => (
                                        <li key={index} className="modal-details-item">
                                            <i className={item.icon} aria-hidden="true" />
                                            <span>
                                                <strong>{item.label}:</strong> {item.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="modal-actions">
                            <div className="modal-quantity">
                                <button
                                    type="button"
                                    className="modal-quantity-btn"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    aria-label="Diminuir quantidade"
                                >
                                    <i className="bi bi-dash" aria-hidden="true" />
                                </button>
                                <span className="modal-quantity-value" aria-live="polite">{quantity}</span>
                                <button
                                    type="button"
                                    className="modal-quantity-btn"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= (product.stock || 99)}
                                    aria-label="Aumentar quantidade"
                                >
                                    <i className="bi bi-plus" aria-hidden="true" />
                                </button>
                            </div>

                            <button
                                type="button"
                                className="modal-add"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                            >
                                <i className="bi bi-cart-plus" aria-hidden="true" />
                                {isOutOfStock ? 'Indisponível' : 'Adicionar ao carrinho'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;