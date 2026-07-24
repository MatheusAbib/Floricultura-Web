import React, { useState, useEffect } from 'react';
import { products, invernoProducts, testimonials, coupons, features } from '../../data/products';
import { categories } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import ProductList from '../../components/ProductList/ProductList';
import ProductModal from '../../components/ProductModal/ProductModal';
import ProductCard from '../../components/ProductCard/ProductCard';
import Newsletter from '../../components/Newsletter/Newsletter';
import Categories from '../../components/Categories/Categories';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';
import './Home.scss';

function Home() {
    const [copiedCoupon, setCopiedCoupon] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedProductId, setAddedProductId] = useState(null);
    const { addToCart, addMultipleToCart, showNotification } = useCart();
    

    const copyCoupon = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCoupon(code);
        showNotification(`Cupom ${code} copiado!`, 'success');
        setTimeout(() => setCopiedCoupon(null), 2000);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProductId(product.id);
        showNotification(`${product.name} adicionado ao carrinho!`, 'success');
        setTimeout(() => setAddedProductId(null), 2000);
    };

    return (
        <div className="home-page">
            <HeroCarousel />

            <section className="features-section">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="section-title">Por que escolher a Floricultura Web?</h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div className="col-md-4" key={feature.id}>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <i className={`bi ${feature.icon}`}></i>
                                    </div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="promo-section" id="promocao">
                <div className="container">
                    <div className="promo-banner">
                        <img src="/Floricultura-Web/assets/Carrossel/astromelia.webp" alt="Promoção de Verão" className="img-fluid promo-image" />
                    </div>
                </div>
            </section>

            <section className="coupons-section py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="section-title">Cupons de Desconto</h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        {coupons.map((coupon, index) => (
                            <div className="col-md-4" key={coupon.id}>
                                <div className={`coupon-card ${coupon.used ? 'coupon-used' : ''}`}>
                                    <div className="coupon-header">
                                        <span className="coupon-percent">{coupon.discount}</span>
                                        <span className="coupon-code">{coupon.code}</span>
                                    </div>
                                    <div className="coupon-body">
                                        <h4>{coupon.title}</h4>
                                        <p>{coupon.description}</p>
                                        {coupon.used ? (
                                            <button className="btn btn-secondary copy-coupon" disabled>
                                                <i className="bi bi-check-circle me-2"></i>Usado
                                            </button>
                                        ) : (
                                            <button 
                                                className={`btn ${copiedCoupon === coupon.code ? 'btn-success' : 'btn-success'} copy-coupon`}
                                                onClick={() => copyCoupon(coupon.code)}
                                                disabled={copiedCoupon === coupon.code}
                                            >
                                                {copiedCoupon === coupon.code ? (
                                                    <>
                                                        <i className="bi bi-check-circle me-2"></i>Cupom Copiado!
                                                    </>
                                                ) : (
                                                    'Copiar Código'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    <div className="coupon-corner">
                                        <i className="bi bi-scissors"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container py-4">
                <ProductList 
                    products={products}
                    title="Acervo de Plantas"
                    onAddToCart={handleAddToCart}
                    onOpenModal={openModal}
                    addedProductId={addedProductId}
                    itemsPerPage={8}
                />
            </div>

            <section className="products-section">
                <div className="container">
                    <div className="promo-banner">
                        <img src="/Floricultura-Web/assets/Carrossel/coleção-de-inverno.jpg" alt="Coleção de Inverno" className="img-fluid promo-image" />
                    </div>
                    <div className="row py-3" id="inverno-grid">
                        {invernoProducts.map((product) => (
                            <div className="col-md-6 col-lg-3" key={product.id}>
                                <ProductCard 
                                    product={product}
                                    searchTerm={''}
                                    onAddToCart={handleAddToCart}
                                    onOpenModal={openModal}
                                    addedProductId={addedProductId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Categories categories={categories} />
            <Testimonials testimonials={testimonials} />
            <Newsletter />

<ProductModal 
    product={selectedProduct}
    isOpen={isModalOpen}
    onClose={closeModal}
    onAddToCart={addToCart}
    onAddMultiple={addMultipleToCart}
/>
            <Footer />
        </div>
    );
}

export default Home;
