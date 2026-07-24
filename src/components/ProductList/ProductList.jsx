import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';

function ProductList({ 
    products, 
    title, 
    onAddToCart, 
    onOpenModal, 
    addedProductId,
    itemsPerPage = 8
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleSort = (type) => {
        setSortType(type);
        setCurrentPage(1);
        setIsDropdownOpen(false);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };

    const getFilteredProducts = () => {
        if (!searchTerm.trim()) {
            return products;
        }
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getSortedProducts = (filtered) => {
        if (!sortType) return filtered;
        let sorted = [...filtered];
        switch (sortType) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        return sorted;
    };

    const filtered = getFilteredProducts();
    const sorted = getSortedProducts(filtered);

    const totalPages = Math.ceil(sorted.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = sorted.slice(startIndex, startIndex + itemsPerPage);

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        const productListElement = document.querySelector('.product-list');
        if (productListElement) {
            const offset = 80; 
            const top = productListElement.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
};
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="pagination-container">
                <button 
                    className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>

                {startPage > 1 && (
                    <>
                        <button className="page-btn" onClick={() => goToPage(1)}>1</button>
                        {startPage > 2 && <span className="page-dots">...</span>}
                    </>
                )}

                {pages.map(page => (
                    <button 
                        key={page}
                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="page-dots">...</span>}
                        <button className="page-btn" onClick={() => goToPage(totalPages)}>{totalPages}</button>
                    </>
                )}

                <button 
                    className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        );
    };

    return (
        <div className="product-list" id="product-grid">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h2 className="section-title" style={{ display: 'inline-block' }}>{title}</h2>
                </div>
            </div>

            <div className="row mb-4 align-items-center">
                <div className="col-md-7 col-lg-6 mb-3 mb-md-0">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Buscar produtos..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchTerm && (
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button" 
                                onClick={clearSearch}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                        <button className="btn btn-success" type="button">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="col-md-5 col-lg-6 text-md-end">
                    <div className="d-inline-block position-relative">
                        <button 
                            className="btn btn-outline-success dropdown-toggle"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <i className="bi bi-funnel me-2"></i>
                            {sortType ? (
                                sortType === 'price-asc' ? 'Menor preço' :
                                sortType === 'price-desc' ? 'Maior preço' :
                                sortType === 'name-asc' ? 'Nome (A-Z)' :
                                sortType === 'name-desc' ? 'Nome (Z-A)' : 'Ordenar'
                            ) : 'Ordenar'}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, marginTop: '8px', zIndex: 1000 }}>
                                <button 
                                    className={`dropdown-item ${sortType === 'price-asc' ? 'active' : ''}`}
                                    onClick={() => handleSort('price-asc')}
                                >
                                    <i className="bi bi-sort-numeric-up me-2"></i>Menor preço
                                </button>
                                <button 
                                    className={`dropdown-item ${sortType === 'price-desc' ? 'active' : ''}`}
                                    onClick={() => handleSort('price-desc')}
                                >
                                    <i className="bi bi-sort-numeric-down me-2"></i>Maior preço
                                </button>
                                <hr className="dropdown-divider" />
                                <button 
                                    className={`dropdown-item ${sortType === 'name-asc' ? 'active' : ''}`}
                                    onClick={() => handleSort('name-asc')}
                                >
                                    <i className="bi bi-sort-alpha-up me-2"></i>Nome (A-Z)
                                </button>
                                <button 
                                    className={`dropdown-item ${sortType === 'name-desc' ? 'active' : ''}`}
                                    onClick={() => handleSort('name-desc')}
                                >
                                    <i className="bi bi-sort-alpha-down me-2"></i>Nome (Z-A)
                                </button>
                                {sortType && (
                                    <>
                                        <hr className="dropdown-divider" />
                                        <button 
                                            className="dropdown-item text-danger"
                                            onClick={() => handleSort('')}
                                        >
                                            <i className="bi bi-x-circle me-2"></i>Limpar
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {currentProducts.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <div className="empty-state">
                            <i className="bi bi-emoji-frown display-1 text-muted mb-3"></i>
                            <h3 className="text-muted">Nenhum produto encontrado</h3>
                            <p className="text-muted">Não encontramos produtos correspondentes à sua busca.</p>
                            <button 
                                className="btn btn-outline-success mt-3"
                                onClick={clearSearch}
                            >
                                <i className="bi bi-arrow-left me-2"></i>Ver todos os produtos
                            </button>
                        </div>
                    </div>
                ) : (
                    currentProducts.map((product) => (
                        <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                            <ProductCard 
                                product={product}
                                searchTerm={searchTerm}
                                onAddToCart={onAddToCart}
                                onOpenModal={onOpenModal}
                                addedProductId={addedProductId}
                            />
                        </div>
                    ))
                )}
            </div>

            {sorted.length > 0 && (
                <div className="mt-4">
                    {renderPagination()}
                    <div className="text-center text-muted small mt-2">
                        Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sorted.length)} de {sorted.length} produtos
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;