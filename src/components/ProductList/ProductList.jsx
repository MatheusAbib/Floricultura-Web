import React, { useState, useEffect, useRef } from 'react';
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
    const sortRef = useRef(null);

    useEffect(() => {
        if (!isDropdownOpen) return;

        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        const handleKey = (e) => {
            if (e.key === 'Escape') setIsDropdownOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, [isDropdownOpen]);

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
        const term = searchTerm.toLowerCase();
        return products.filter((product) => {
            const name = (product.name || '').toLowerCase();
            const description = (product.description || '').toLowerCase();
            const category = (product.category || '').toLowerCase();
            return (
                name.includes(term) ||
                description.includes(term) ||
                category.includes(term)
            );
        });
    };

    const getSortedProducts = (filtered) => {
        if (!sortType) return filtered;
        const sorted = [...filtered];
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
                const top = productListElement.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    };

    const sortLabel = sortType === 'price-asc' ? 'Menor preço'
        : sortType === 'price-desc' ? 'Maior preço'
        : sortType === 'name-asc' ? 'Nome (A–Z)'
        : sortType === 'name-desc' ? 'Nome (Z–A)'
        : 'Ordenar';

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) pages.push(i);

        return (
            <div className="pagination-container">
                <button
                    className={`page-btn ${currentPage === 1 ? 'is-disabled' : ''}`}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                >
                    <i className="bi bi-chevron-left" aria-hidden="true" />
                </button>

                {startPage > 1 && (
                    <>
                        <button className="page-btn" onClick={() => goToPage(1)}>1</button>
                        {startPage > 2 && <span className="page-dots">…</span>}
                    </>
                )}

                {pages.map(page => (
                    <button
                        key={page}
                        className={`page-btn ${currentPage === page ? 'is-active' : ''}`}
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="page-dots">…</span>}
                        <button className="page-btn" onClick={() => goToPage(totalPages)}>{totalPages}</button>
                    </>
                )}

                <button
                    className={`page-btn ${currentPage === totalPages ? 'is-disabled' : ''}`}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Próxima página"
                >
                    <i className="bi bi-chevron-right" aria-hidden="true" />
                </button>
            </div>
        );
    };

    return (
        <div className="product-list" id="product-grid">
            <div className="product-list-header">
                <p className="product-list-eyebrow">
                    <span className="product-list-eyebrow-line" />
                    Acervo
                </p>
                <h2 className="product-list-title">{title}</h2>
            </div>

            <div className="product-list-controls">
                <div className="product-list-search">
                    <div className="search-pill">
                        <i className="bi bi-search search-pill-icon" aria-hidden="true" />
                        <input
                            type="text"
                            className="search-pill-input"
                            placeholder="Buscar produtos..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            aria-label="Buscar produtos"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="search-pill-clear"
                                onClick={clearSearch}
                                aria-label="Limpar busca"
                            >
                                <i className="bi bi-x-lg" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="product-list-sort" ref={sortRef}>
                    <button
                        type="button"
                        className={`sort-btn ${sortType ? 'is-active' : ''}`}
                        onClick={() => setIsDropdownOpen(v => !v)}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                    >
                        <i className="bi bi-funnel sort-btn-icon" aria-hidden="true" />
                        <span className="sort-btn-label">{sortLabel}</span>
                        <i
                            className={`bi bi-chevron-down sort-btn-caret ${isDropdownOpen ? 'is-open' : ''}`}
                            aria-hidden="true"
                        />
                    </button>

                    {isDropdownOpen && (
                        <ul className="sort-menu" role="listbox">
                            <li>
                                <button
                                    type="button"
                                    className={`sort-item ${sortType === 'price-asc' ? 'is-active' : ''}`}
                                    onClick={() => handleSort('price-asc')}
                                >
                                    Menor preço
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className={`sort-item ${sortType === 'price-desc' ? 'is-active' : ''}`}
                                    onClick={() => handleSort('price-desc')}
                                >
                                    Maior preço
                                </button>
                            </li>
                            <li className="sort-divider" role="separator" />
                            <li>
                                <button
                                    type="button"
                                    className={`sort-item ${sortType === 'name-asc' ? 'is-active' : ''}`}
                                    onClick={() => handleSort('name-asc')}
                                >
                                    Nome (A–Z)
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className={`sort-item ${sortType === 'name-desc' ? 'is-active' : ''}`}
                                    onClick={() => handleSort('name-desc')}
                                >
                                    Nome (Z–A)
                                </button>
                            </li>
                            {sortType && (
                                <>
                                    <li className="sort-divider" role="separator" />
                                    <li>
                                        <button
                                            type="button"
                                            className="sort-item sort-item-danger"
                                            onClick={() => handleSort('')}
                                        >
                                            Limpar ordenação
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            <div className="product-grid">
                {currentProducts.length === 0 ? (
                    <div className="product-grid-empty">
                        <div className="empty-state">
                            <i className="bi bi-emoji-frown empty-state-icon" aria-hidden="true" />
                            <h3 className="empty-state-title">Nenhum produto encontrado</h3>
                            <p className="empty-state-text">
                                Não encontramos produtos correspondentes à sua busca.
                            </p>
                            <button
                                type="button"
                                className="empty-state-btn"
                                onClick={clearSearch}
                            >
                                Ver todos os produtos
                            </button>
                        </div>
                    </div>
                ) : (
                    currentProducts.map((product) => (
                        <ProductCard
                            product={product}
                            searchTerm={searchTerm}
                            onAddToCart={onAddToCart}
                            onOpenModal={onOpenModal}
                            addedProductId={addedProductId}
                            key={product.id}
                        />
                    ))
                )}
            </div>

            {sorted.length > 0 && (
                <div className="product-list-footer">
                    {renderPagination()}
                    <p className="product-list-count">
                        Mostrando <strong>{startIndex + 1}</strong>–<strong>{Math.min(startIndex + itemsPerPage, sorted.length)}</strong> de <strong>{sorted.length}</strong> produtos
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProductList;