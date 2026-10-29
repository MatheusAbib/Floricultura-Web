import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatCurrency } from '../../utils/formatCurrency';
import ProductModal from '../ProductModal/ProductModal';
import './Navbar.scss';

function Navbar() {
    const { cartCount, addToCart, addMultipleToCart, showNotification } = useCart();
    const { favorites, favoritesCount, toggleFavorite } = useFavorites();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const itemsPerPage = 7;
    const dropdownTimeout = useRef(null);
    const profileTimeout = useRef(null);
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
        const mq = window.matchMedia('(max-width: 900px)');
        const handleChange = (e) => {
            setIsMobile(e.matches);
            if (!e.matches) {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
                setIsProfileOpen(false);
            }
        };
        setIsMobile(mq.matches);
        mq.addEventListener('change', handleChange);
        return () => mq.removeEventListener('change', handleChange);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const openDropdown = () => {
        if (isMobile) return;
        if (dropdownTimeout.current) {
            clearTimeout(dropdownTimeout.current);
            dropdownTimeout.current = null;
        }
        setIsDropdownOpen(true);
    };

    const scheduleCloseDropdown = () => {
        if (isMobile) return;
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        dropdownTimeout.current = setTimeout(() => {
            setIsDropdownOpen(false);
            dropdownTimeout.current = null;
        }, 180);
    };

    const closeDropdown = () => {
        if (dropdownTimeout.current) {
            clearTimeout(dropdownTimeout.current);
            dropdownTimeout.current = null;
        }
        setIsDropdownOpen(false);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        if (dropdownTimeout.current) {
            clearTimeout(dropdownTimeout.current);
            dropdownTimeout.current = null;
        }
        setIsDropdownOpen(v => !v);
    };

    const openProfile = () => {
        if (isMobile) return;
        if (profileTimeout.current) {
            clearTimeout(profileTimeout.current);
            profileTimeout.current = null;
        }
        setIsProfileOpen(true);
    };

    const scheduleCloseProfile = () => {
        if (isMobile) return;
        if (profileTimeout.current) clearTimeout(profileTimeout.current);
        profileTimeout.current = setTimeout(() => {
            setIsProfileOpen(false);
            profileTimeout.current = null;
        }, 180);
    };

    const closeProfile = () => {
        if (profileTimeout.current) {
            clearTimeout(profileTimeout.current);
            profileTimeout.current = null;
        }
        setIsProfileOpen(false);
    };

    const toggleProfile = () => {
        if (profileTimeout.current) {
            clearTimeout(profileTimeout.current);
            profileTimeout.current = null;
        }
        setIsProfileOpen(v => !v);
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
        for (let i = startPage; i <= endPage; i++) pages.push(i);

        return (
            <div className="pagination-container favorites-pagination">
                <button
                    className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
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
                    aria-label="Próxima página"
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        );
    };

    return (
        <>
            <header className="site-header">
                <div
                    className={`site-backdrop ${isMobileMenuOpen ? 'is-open' : ''}`}
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
                <div className="site-header-inner">
                    <Link className="site-brand" to="/" onClick={closeAll}>
                        <i className="bi bi-flower1 site-brand-symbol" aria-hidden="true" />
                        <span className="site-brand-text">
                            <span className="site-brand-title">
                                Dama da <span className="site-brand-dot">Noite.</span>
                            </span>
                            <span className="site-brand-caption">Floricultura</span>
                        </span>
                    </Link>

                    <button
                        className={`site-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Abrir menu"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </button>

                    <nav className={`site-nav ${isMobileMenuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
                        <ul className="site-nav-list">
                            <li className="site-nav-item">
                                <NavLink className="site-nav-link" to="/" onClick={closeAll} end>
                                    Principal
                                </NavLink>
                            </li>
                            <li
                                className={`site-nav-item site-nav-has-menu ${isDropdownOpen ? 'is-open' : ''}`}
                                onMouseEnter={openDropdown}
                                onMouseLeave={scheduleCloseDropdown}
                            >
                                <button
                                    className="site-nav-link site-nav-trigger"
                                    type="button"
                                    onClick={toggleDropdown}
                                    aria-expanded={isDropdownOpen}
                                >
                                    Produtos
                                    <i className={`bi bi-chevron-down site-nav-caret ${isDropdownOpen ? 'is-open' : ''}`} aria-hidden="true" />
                                </button>
                                <ul
                                    className={`site-submenu ${isDropdownOpen ? 'is-open' : ''}`}
                                    onMouseEnter={openDropdown}
                                    onMouseLeave={scheduleCloseDropdown}
                                >
                                    <li>
                                        <Link className="site-submenu-link" to="./" onClick={closeAll}>
                                            Plantas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="site-submenu-link" to="/presentes" onClick={closeAll}>
                                            Presentes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="site-submenu-link" to="/vasos" onClick={closeAll}>
                                            Vasos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="site-submenu-link" to="/sementes" onClick={closeAll}>
                                            Sementes
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="site-nav-item">
                                <NavLink className="site-nav-link" to="/contato" onClick={closeAll}>
                                    Fale Conosco
                                </NavLink>
                            </li>
                            <li className="site-nav-item">
                                <NavLink className="site-nav-link" to="/quem-somos" onClick={closeAll}>
                                    Quem Somos
                                </NavLink>
                            </li>
                        </ul>

                        <div className="site-actions">
                            <button
                                className="site-action"
                                type="button"
                                onClick={handleFavorites}
                                aria-label="Favoritos"
                            >
                                <i className="bi bi-heart" aria-hidden="true" />
                                {favoritesCount > 0 && (
                                    <span className="site-action-badge">{favoritesCount}</span>
                                )}
                            </button>

                            <Link
                                to="/carrinho"
                                className="site-action"
                                onClick={closeAll}
                                aria-label="Carrinho"
                            >
                                <i className="bi bi-cart3" aria-hidden="true" />
                                {cartCount > 0 && (
                                    <span className="site-action-badge">{cartCount}</span>
                                )}
                            </Link>

                            <div
                                className={`site-action-menu ${isProfileOpen ? 'is-open' : ''}`}
                                onMouseEnter={openProfile}
                                onMouseLeave={scheduleCloseProfile}
                            >
                                <button
                                    className="site-action"
                                    type="button"
                                    onClick={toggleProfile}
                                    aria-label="Perfil"
                                    aria-expanded={isProfileOpen}
                                >
                                    <i className="bi bi-person-circle" aria-hidden="true" />
                                </button>
                                <ul
                                    className={`site-submenu site-submenu-profile ${isProfileOpen ? 'is-open' : ''}`}
                                    onMouseEnter={openProfile}
                                    onMouseLeave={scheduleCloseProfile}
                                >
                                    <li>
                                        <button className="site-submenu-link" onClick={handleEditClick}>
                                            Meu Perfil
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="site-submenu-link is-danger"
                                            onClick={() => setShowLogoutModal(true)}
                                        >
                                            Sair
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {showProfileModal && (
                <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
                    <div className="modal-box modal-large" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowProfileModal(false)} aria-label="Fechar">✕</button>
                        <h3 className="modal-title">Meu Perfil</h3>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nome Completo</label>
                                <input type="text" className="form-control" value={editData.nome} onChange={(e) => setEditData({ ...editData, nome: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF</label>
                                <input type="text" className="form-control" value={editData.cpf} onChange={(e) => setEditData({ ...editData, cpf: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">E-mail</label>
                                <input type="email" className="form-control" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Telefone</label>
                                <input type="text" className="form-control" value={editData.telefone} onChange={(e) => setEditData({ ...editData, telefone: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Senha</label>
                                <input type="password" className="form-control" value={editData.senha} onChange={(e) => setEditData({ ...editData, senha: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Confirmar Senha</label>
                                <input type="password" className="form-control" value={editData.confirmarsenha} onChange={(e) => setEditData({ ...editData, confirmarsenha: e.target.value })} />
                            </div>
                            <div className="col-12 mt-2">
                                <hr />
                                <h5 className="modal-subtitle">Endereço</h5>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Endereço</label>
                                <input type="text" className="form-control" value={editData.endereco} onChange={(e) => setEditData({ ...editData, endereco: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Cidade</label>
                                <input type="text" className="form-control" value={editData.cidade} onChange={(e) => setEditData({ ...editData, cidade: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Estado</label>
                                <input type="text" className="form-control" value={editData.estado} onChange={(e) => setEditData({ ...editData, estado: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CEP</label>
                                <input type="text" className="form-control" value={editData.cep} onChange={(e) => setEditData({ ...editData, cep: e.target.value })} />
                            </div>
                            <div className="col-12 mt-2">
                                <hr />
                                <h5 className="modal-subtitle">Cartão Cadastrado</h5>
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">Número</label>
                                <input type="text" className="form-control" value={editData.cartao} onChange={(e) => setEditData({ ...editData, cartao: e.target.value })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Bandeira</label>
                                <input type="text" className="form-control" value={editData.bandeira} onChange={(e) => setEditData({ ...editData, bandeira: e.target.value })} />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Validade</label>
                                <input type="text" className="form-control" value={editData.validade} onChange={(e) => setEditData({ ...editData, validade: e.target.value })} />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">CVV</label>
                                <input type="password" className="form-control" value={editData.cvv} onChange={(e) => setEditData({ ...editData, cvv: e.target.value })} maxLength="4" />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowProfileModal(false)}>Cancelar</button>
                            <button className="btn-primary" onClick={handleSaveProfile}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}

            {showFavoritesModal && (
                <div className="modal-overlay" onClick={() => setShowFavoritesModal(false)}>
                    <div className="modal-box modal-favorites" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowFavoritesModal(false)} aria-label="Fechar">✕</button>
                        <h3 className="modal-title">Meus Favoritos</h3>

                        {favorites.length === 0 ? (
                            <p className="modal-empty">Você ainda não tem produtos favoritos.</p>
                        ) : (
                            <>
                                <div className="favorites-list">
                                    {currentFavorites.map((item) => (
                                        <div key={item.id} className="favorites-item">
                                            <img src={item.image} alt={item.name} className="favorites-thumb" />
                                            <div className="favorites-info">
                                                <h6 className="favorites-name">{item.name}</h6>
                                                <small className="favorites-price">{formatCurrency(item.price)}</small>
                                            </div>
                                            <div className="favorites-actions">
                                                <button className="favorites-action" onClick={() => openProductModal(item)} title="Ver detalhes">
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button className="favorites-action is-danger" onClick={() => handleRemoveFavorite(item.id, item.name)} title="Remover dos favoritos">
                                                    <i className="bi bi-heart-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="favorites-footer">
                                        {renderPagination()}
                                        <div className="favorites-count">
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
                    <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowLogoutModal(false)} aria-label="Fechar">✕</button>
                        <div className="modal-confirm">
                            <i className="bi bi-box-arrow-right modal-confirm-icon" aria-hidden="true"></i>
                            <h4 className="modal-title">Deseja sair?</h4>
                            <p className="modal-text">Tem certeza que deseja sair da sua conta?</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
                            <button className="btn-primary" onClick={handleLogout}>Sair</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;