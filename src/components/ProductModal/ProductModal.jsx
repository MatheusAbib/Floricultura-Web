import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { renderRating } from '../../utils/renderRating';
import { useFavorites } from '../../context/FavoritesContext';
import ProductImageGallery from '../ProductImageGallery/ProductImageGallery';
import './ProductModal.scss';

function ProductModal({ product, isOpen, onClose, onAddToCart, onAddMultiple }) {
    const [quantity, setQuantity] = useState(1);
    const { toggleFavorite, isFavorite } = useFavorites();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (product) {
            setIsFav(isFavorite(product.id));
        }
    }, [product, isFavorite]);

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

    if (!isOpen || !product) return null;

    const images = product.images || [product.image];
    const isPlanta = product.category === 'plantas' || product.category === 'flores' || product.category === 'inverno' || product.category === 'sementes';

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1 && newQuantity <= (product.stock || 99)) {
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
        const wasFavorited = toggleFavorite(product);
        setIsFav(wasFavorited);
    };

    const stockText = product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Produto esgotado';
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';

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
                ]
            };
        }

        const iconMap = {
            tipo: 'bi bi-tag',
            uva: 'fa fa-wine-bottle',
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
            teorAlcoolico: 'Teor Alcoólico',
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

        const items = Object.entries(details)
            .filter(([key, value]) => value && value !== '')
            .map(([key, value]) => {
                let icon = iconMap[key] || 'bi bi-info-circle';
                if (key === 'uva') {
                    icon = 'fa fa-wine-bottle';
                }
                return {
                    icon: icon,
                    label: labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1),
                    value: value
                };
            });

        return {
            title: 'Detalhes do Produto',
            items: items
        };
    };

    const detailsConfig = getDetailsConfig(product.details);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-content">
                    <ProductImageGallery 
                        images={images}
                        alt={product.name}
                        productName={product.name}
                    />

                    <div className="modal-info">
                        <div className="modal-header-info">
                            <h2 className="modal-title">{product.name}</h2>
                            <button 
                                className={`modal-favorite-btn ${isFav ? 'active' : ''}`}
                                onClick={handleToggleFavorite}
                                title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                            >
                                <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                            </button>
                        </div>

                        <div className="modal-rating">
                            {renderRating(product.rating).map((star, i) => (
                                <i key={i} className={`bi ${star}`}></i>
                            ))}
                            <span className="rating-text">({product.rating})</span>
                        </div>

                        <div className="modal-prices">
                            {product.oldPrice && (
                                <span className="old-price">{formatCurrency(product.oldPrice)}</span>
                            )}
                            <span className="current-price">{formatCurrency(product.price)}</span>
                        </div>

                        <div className={`modal-stock ${stockClass}`}>
                            <i className={`bi ${product.stock > 0 ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                            {stockText}
                        </div>

                        <div className="modal-description">
                            <h4>{isPlanta ? 'Sobre a planta' : 'Sobre o produto'}</h4>
                            <p>{product.description}</p>
                        </div>

                        {product.details && detailsConfig.items.length > 0 && (
                            <div className="modal-details">
                                <h4>{detailsConfig.title}</h4>
                                <ul>
                                    {detailsConfig.items.map((item, index) => (
                                        <li key={index}>
                                            <i className={item.icon}></i>
                                            <span><strong>{item.label}:</strong> {item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="modal-actions">
                            <div className="quantity-control">
                                <button 
                                    className="qty-btn"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button 
                                    className="qty-btn"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= (product.stock || 99)}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>

                            <button 
                                className="add-to-cart-modal"
                                onClick={handleAddToCart}
                                disabled={product.outOfStock || product.stock === 0}
                            >
                                <i className="bi bi-cart-plus me-2"></i>
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;