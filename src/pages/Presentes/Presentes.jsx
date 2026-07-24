import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import ProductList from '../../components/ProductList/ProductList';
import ProductModal from '../../components/ProductModal/ProductModal';
import Newsletter from '../../components/Newsletter/Newsletter';
import Categories from '../../components/Categories/Categories';
import Footer from '../../components/Footer/Footer';
import { presentesProducts } from '../../data/presentesData';
import { categories } from '../../data/categories';
import './Presentes.scss';

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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedProductId, setAddedProductId] = useState(null);
    const { addToCart, addMultipleToCart, showNotification } = useCart();

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
        <div className="presentes-page">
            <HeroCarousel page="presentes" slides={presentesSlides} />

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
                    title="Acervo de Presentes"
                    onAddToCart={handleAddToCart}
                    onOpenModal={openModal}
                    addedProductId={addedProductId}
                    itemsPerPage={8}
                />
            </div>

            <Categories categories={categories} />
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
