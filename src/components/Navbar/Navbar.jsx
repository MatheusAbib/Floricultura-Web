import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { renderRating } from '../../utils/renderRating';
import ProductModal from '../ProductModal/ProductModal';
import './Navbar.scss';

function Navbar() {
    const { cartCount, addToCart, addMultipleToCart, showNotification } = useCart();
    const { favorites, favoritesCount, toggleFavorite } = useFavorites();
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const itemsPerPage = 7;
    const [userData, setUserData] = useState({
        nome: 'Maria José',
        email: 'usuario@email.com',
        telefone: '(11) 99999-9999',
        cpf: '123.456.789-00',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567',
        senha: '********',
        confirmarsenha: '',
        cartao: '**** **** **** 1234',
        bandeira: 'Visa',
        validade: '12/26',
        cvv: '***'
    });
    const [editData, setEditData] = useState({ ...userData });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    const handleEditClick = () => {
        setEditData({ ...userData });
        setShowProfileModal(true);
        setIsProfileOpen(false);
        closeMobileMenu();
    };

    const handleSaveProfile = () => {
        setUserData({ ...editData });
        localStorage.setItem('userProfile', JSON.stringify(editData));
        setShowProfileModal(false);
        showNotification('Perfil atualizado com sucesso!', 'success');
    };

    const handleLogout = () => {
        setShowLogoutModal(false);
        showNotification('Você saiu da sua conta.', 'info');
        closeMobileMenu();
    };

    const handleFavorites = () => {
        setCurrentPage(1);
        setShowFavoritesModal(true);
        closeMobileMenu();
    };

    const handleRemoveFavorite = (productId, productName) => {
        const product = favorites.find(f => f.id === productId);
        if (product) {
            toggleFavorite(product);
            showNotification(`${productName} removido dos favoritos!`, 'info');
        }
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const closeProductModal = () => {
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const closeAll = () => {
        closeMobileMenu();
        closeDropdown();
        closeProfile();
    };

    const totalPages = Math.ceil(favorites.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFavorites = favorites.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
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
            <div className="pagination-container favorites-pagination">
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
        <>
            <nav className={`navbar navbar-expand-xl navbar-dark sticky-top ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
                        <i className="bi bi-flower1 me-2"></i>Floricultura Web
                    </Link>
                    <button 
                        className={`navbar-toggler ${isMobileMenuOpen ? 'collapsed' : ''}`}
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse mobile-menu-bg ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={closeAll}>
                                    <i className="bi bi-house-door me-1"></i> Principal
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown" onMouseLeave={closeDropdown}>
                                <a 
                                    className={`nav-link dropdown-toggle ${isDropdownOpen ? 'show' : ''}`} 
                                    href="#" 
                                    id="productsDropdown" 
                                    role="button" 
                                    onClick={toggleDropdown}
                                >
                                    <i className={`bi ${isDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} me-1`}></i>Produtos
                                </a>
                                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                    <li>
                                        <Link className="dropdown-item" to="./" onClick={closeAll}>
                                            <i className="bi bi-tree me-2"></i> Plantas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/presentes" onClick={closeAll}>
                                            <i className="bi bi-gift me-2"></i> Presentes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/vasos" onClick={closeAll}>
                                            <i className="bi bi-bucket me-2"></i> Vasos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sementes" onClick={closeAll}>
                                            <i className="bi bi-flower2 me-2"></i> Sementes
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contato" onClick={closeAll}>
                                    <i className="bi bi-chat-left-text me-1"></i> Fale Conosco
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/quem-somos" onClick={closeAll}>
                                    <i className="bi bi-info-circle me-1"></i> Quem Somos
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-flex gap-3 align-items-center">
                            <button 
                                className="btn btn-outline-light position-relative" 
                                onClick={handleFavorites}
                                title="Favoritos"
                            >
                                <i className="bi bi-heart"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {favoritesCount}
                                </span>
                            </button>

                            <Link to="/carrinho" className="btn btn-outline-light position-relative" onClick={closeAll}>
                                <i className="bi bi-cart3"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-counter">
                                    {cartCount}
                                </span>
                            </Link>

                            <div className="dropdown" onMouseLeave={closeProfile}>
                                <button 
                                    className="btn btn-outline-light" 
                                    onClick={toggleProfile}
                                >
                                    <i className="bi bi-person-circle"></i>
                                </button>
                                <ul className={`dropdown-menu dropdown-menu-end ${isProfileOpen ? 'show' : ''}`}>
                                    <li>
                                        <button className="dropdown-item" onClick={handleEditClick}>
                                            <i className="bi bi-pencil-square me-2"></i> Meu Perfil
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={() => setShowLogoutModal(true)}>
                                            <i className="bi bi-box-arrow-right me-2"></i> Sair
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {showProfileModal && (
                <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
                    <div className="modal-box modal-large" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowProfileModal(false)}>✕</button>
                        <h3 className="mb-3"><i className="bi bi-person-circle me-2"></i>Meu Perfil</h3>
                        
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nome Completo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.nome}
                                    onChange={(e) => setEditData({...editData, nome: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.cpf}
                                    onChange={(e) => setEditData({...editData, cpf: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">E-mail</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={editData.email}
                                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Telefone</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.telefone}
                                    onChange={(e) => setEditData({...editData, telefone: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={editData.senha}
                                    onChange={(e) => setEditData({...editData, senha: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Confirmar Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={editData.confirmarsenha}
                                    onChange={(e) => setEditData({...editData, confirmarsenha: e.target.value})}
                                />
                            </div>
                            <div className="col-12 mt-2">
                                <hr />
                                <h5 className="mb-2"><i className="bi bi-geo-alt me-2"></i>Endereço</h5>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Endereço</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.endereco}
                                    onChange={(e) => setEditData({...editData, endereco: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Cidade</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.cidade}
                                    onChange={(e) => setEditData({...editData, cidade: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Estado</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.estado}
                                    onChange={(e) => setEditData({...editData, estado: e.target.value})}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CEP</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.cep}
                                    onChange={(e) => setEditData({...editData, cep: e.target.value})}
                                />
                            </div>
                            <div className="col-12 mt-2">
                                <hr />
                                <h5 className="mb-2"><i className="bi bi-credit-card me-2"></i>Cartão Cadastrado</h5>
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">Número</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.cartao}
                                    onChange={(e) => setEditData({...editData, cartao: e.target.value})}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Bandeira</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.bandeira}
                                    onChange={(e) => setEditData({...editData, bandeira: e.target.value})}
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Validade</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={editData.validade}
                                    onChange={(e) => setEditData({...editData, validade: e.target.value})}
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">CVV</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={editData.cvv}
                                    onChange={(e) => setEditData({...editData, cvv: e.target.value})}
                                    maxLength="4"
                                />
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-4">
                            <button className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>Cancelar</button>
                            <button className="btn btn-success" onClick={handleSaveProfile}>
                                <i className="bi bi-check-circle me-2"></i>Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFavoritesModal && (
                <div className="modal-overlay" onClick={() => setShowFavoritesModal(false)}>
                    <div className="modal-box modal-favorites" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowFavoritesModal(false)}>✕</button>
                        <h3 className="mb-4"><i className="bi bi-heart-fill text-danger me-2"></i>Meus Favoritos</h3>
                        
                        {favorites.length === 0 ? (
                            <p className="text-center text-muted">Você ainda não tem produtos favoritos.</p>
                        ) : (
                            <>
                                <div className="list-group">
                                    {currentFavorites.map((item) => (
                                        <div key={item.id} className="list-group-item d-flex align-items-center gap-3">
                                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">{item.name}</h6>
                                                <small className="text-muted">{formatCurrency(item.price)}</small>
                                            </div>
                                            <div className="d-flex gap-1">
                                                <button 
                                                    className="btn btn-sm btn-outline-orange"
                                                    onClick={() => openProductModal(item)}
                                                    title="Ver detalhes"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleRemoveFavorite(item.id, item.name)}
                                                    title="Remover dos favoritos"
                                                >
                                                    <i className="bi bi-heart-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="mt-3">
                                        {renderPagination()}
                                        <div className="text-center text-muted small mt-2">
                                            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, favorites.length)} de {favorites.length} produtos
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        
                    </div>
                </div>
            )}

            <ProductModal 
                product={selectedProduct}
                isOpen={isProductModalOpen}
                onClose={closeProductModal}
                onAddToCart={addToCart}
                onAddMultiple={addMultipleToCart}
            />

            {showLogoutModal && (
                <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowLogoutModal(false)}>✕</button>
                        <div className="text-center">
                            <i className="bi bi-box-arrow-right display-1 text-warning mb-3"></i>
                            <h4>Deseja sair?</h4>
                            <p className="text-muted">Tem certeza que deseja sair da sua conta?</p>
                        </div>
                        <div className="d-flex gap-3 mt-3">
                            <button className="btn btn-secondary flex-grow-1" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
                            <button className="btn btn-danger flex-grow-1" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-2"></i>Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;