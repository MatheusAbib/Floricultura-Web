import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import ProductList from '../../components/ProductList/ProductList';
import ProductModal from '../../components/ProductModal/ProductModal';
import Newsletter from '../../components/Newsletter/Newsletter';
import Categories from '../../components/Categories/Categories';
import Footer from '../../components/Footer/Footer';
import { presentesProducts } from '../../data/presentesData';
import { categories } from '../../data/categories';

const presentesSlides = [
    {
        image: "/Floricultura-Web/assets/Carrossel/Presente-flores.jpg",
        title: "Presentes",
        subtitle: "Encontre o presente perfeito para a sua ocasião",
        buttonText: "Ver Coleção",
        buttonLink: "#product-grid"
    },
    {
        image: "/Floricultura-Web/assets/Carrossel/Food-gift.png",
        title: "Presentes que Encantam",
        subtitle: "Surpreenda quem você ama com nossos arranjos exclusivos",
        buttonText: "Ver Presentes",
        buttonLink: "#product-grid"
    }
];

function Presentes() {
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedProductId, setAddedProductId] = useState(null);
    const { addToCart, addMultipleToCart } = useCart();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
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

    if (loading) {
        return (
            <div className="loading-overlay">
                <i className="bi bi-flower1 loading-logo"></i>
            </div>
        );
    }

    return (
        <div className="presentes-page">
            <HeroCarousel page="presentes" slides={presentesSlides} />
            <Categories categories={categories} />

            <section className="promo-section" id="promocao">
                <div className="container">
                    <div className="promo-banner">
                        <img src="/Floricultura-Web/assets/Carrossel/irmao.webp" alt="Promoção Especial" className="img-fluid promo-image" />
                    </div>
                </div>
            </section>

            <div className="container py-4">
                <ProductList
                    products={presentesProducts}
                    onAddToCart={handleAddToCart}
                    title="Acervo de presentes"
                    onOpenModal={openModal}
                    addedProductId={addedProductId}
                    itemsPerPage={8}
                />
            </div>

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

export default Presentes;