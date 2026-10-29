import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products, invernoProducts, testimonials } from '../../data/products';
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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedProductId, setAddedProductId] = useState(null);
    const { addToCart, addMultipleToCart, showNotification } = useCart();
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);

        if (!element) return;

        const offset = 100;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth',
        });
    }, [location.hash]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const images = document.querySelectorAll('.product-image');
                images.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src) {
                        img.src = src;
                    }
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

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
        setTimeout(() => setAddedProductId(null), 2000);
    };

    return (
        <div className="home-page">
            <HeroCarousel />

            <Categories categories={categories} />

            <section className="promo-section" id="promocao">
                <div className="promo-banner">
                    <img
                        src="/Floricultura-Dama-da-Noite/assets/Carrossel/astromelia.webp"
                        alt="Promoção de Verão"
                        className="promo-image"
                    />
                </div>
            </section>

            <div id="lista-plantas">
                <ProductList
                    products={products}
                    title="Acervo de plantas"
                    onAddToCart={handleAddToCart}
                    onOpenModal={openModal}
                    addedProductId={addedProductId}
                    itemsPerPage={8}
                />
            </div>

            <section className="products-section">
                <div className="products-banner">
                    <img
                        src="/Floricultura-Dama-da-Noite/assets/Carrossel/coleção-de-inverno.jpg"
                        alt="Coleção de Inverno"
                        className="promo-image"
                    />
                </div>

                <div className="products-grid" id="inverno-grid">
                    {invernoProducts.map((product) => (
                        <ProductCard
                            product={product}
                            searchTerm={''}
                            onAddToCart={handleAddToCart}
                            onOpenModal={openModal}
                            addedProductId={addedProductId}
                            key={product.id}
                        />
                    ))}
                </div>
            </section>

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