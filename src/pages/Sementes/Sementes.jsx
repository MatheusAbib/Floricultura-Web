import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import ProductList from '../../components/ProductList/ProductList';
import ProductModal from '../../components/ProductModal/ProductModal';
import Newsletter from '../../components/Newsletter/Newsletter';
import Categories from '../../components/Categories/Categories';
import Footer from '../../components/Footer/Footer';
import { sementesProducts } from '../../data/sementesData';
import { categories } from '../../data/categories';
import './Sementes.scss';

function Sementes() {
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
        <div className="sementes-page">
            <HeroCarousel page="sementes" />

            <div className="container py-4">
                <ProductList 
                    products={sementesProducts}
                    title="Acervo de Sementes"
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

export default Sementes;
