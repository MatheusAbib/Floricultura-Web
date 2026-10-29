import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import FadeIn from '../../components/FadeIn/FadeIn';
import ProductModal from '../../components/ProductModal/ProductModal';
import Footer from '../../components/Footer/Footer';
import { products } from '../../data/products';
import { sementesProducts } from '../../data/sementesData';
import { presentesProducts } from '../../data/presentesData';
import { vasosProducts } from '../../data/vasosData';
import './Carrinho.scss';

function Carrinho() {
    const { cart, addToCart, addMultipleToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, showNotification } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showClearModal, setShowClearModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Maria José',
        address: 'Rua das Flores, 123',
        city: 'Mogi das Cruzes',
        state: 'SP',
        zip: '08773-000'
    });

    useEffect(() => {
        const savedShipping = localStorage.getItem('shippingFormData');
        if (savedShipping) {
            try {
                const parsed = JSON.parse(savedShipping);
                if (parsed.name || parsed.address) {
                    setFormData(parsed);
                }
            } catch (e) {}
        }
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('shippingFormData', JSON.stringify(formData));
    }, [formData]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('customer-', '');
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateQuantity(productId, newQuantity);
            const item = cart.find(p => p.id === productId);
            if (item) {
                showNotification(`Quantidade de ${item.name} atualizada para ${newQuantity}`, 'success');
            }
        }
    };

    const handleRemoveClick = (item) => {
        setItemToRemove(item);
        setShowRemoveModal(true);
    };

    const confirmRemove = () => {
        if (itemToRemove) {
            removeFromCart(itemToRemove.id);
            showNotification(`${itemToRemove.name} removido do carrinho!`, 'success');
            setItemToRemove(null);
            setShowRemoveModal(false);
        }
    };

    const handleClearCart = () => {
        clearCart();
        showNotification('Carrinho limpo com sucesso!', 'success');
        setShowClearModal(false);
    };

    const calculateTotals = () => {
        const subtotal = getCartTotal();
        const shipping = subtotal > 100 ? 0 : 15;
        const discount = subtotal > 150 ? subtotal * 0.1 : 0;
        return { subtotal, shipping, discount, total: subtotal + shipping - discount };
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        localStorage.setItem('customerData', JSON.stringify(formData));
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/pagamento');
    };

    const goBack = () => {
        navigate(-1);
    };

    const getAllProducts = () => {
        return [...products, ...sementesProducts, ...presentesProducts, ...vasosProducts];
    };

    const getFullProduct = (cartItem) => {
        const allProducts = getAllProducts();
        const found = allProducts.find(p => p.id === cartItem.id);
        return found || cartItem;
    };

    const openModal = (item) => {
        const fullProduct = getFullProduct(item);
        setSelectedProduct(fullProduct);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const totals = calculateTotals();

    if (loading) {
        return (
            <div className="loading-overlay">
                <i className="bi bi-flower1 loading-logo"></i>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="carrinho-page">
                <div className="cart-container">
                    <FadeIn direction="up">
                        <header className="cart-header">
                            <p className="cart-eyebrow">
                                <span className="cart-eyebrow-line" />
                                Etapa 1 de 3
                            </p>
                            <h1 className="cart-title">
                                Meu <em className="cart-hand">carrinho.</em>
                            </h1>
                        </header>
                    </FadeIn>

                    <nav className="cart-steps" aria-label="Etapas do pedido">
                        <div className="cart-step is-active">
                            <span className="cart-step-number">1</span>
                            <span className="cart-step-label">Carrinho</span>
                        </div>
                        <div className="cart-step">
                            <span className="cart-step-number">2</span>
                            <span className="cart-step-label">Pagamento</span>
                        </div>
                        <div className="cart-step">
                            <span className="cart-step-number">3</span>
                            <span className="cart-step-label">Confirmação</span>
                        </div>
                    </nav>

                    <div className="cart-empty">
                        <i className="bi bi-cart-x cart-empty-icon" aria-hidden="true" />
                        <h2 className="cart-empty-title">Seu carrinho está vazio.</h2>
                        <p className="cart-empty-text">
                            Adicione produtos para continuar com a compra.
                        </p>
                        <Link to="/" className="cart-btn cart-btn-primary">
                            <span className="cart-btn-icon" aria-hidden="true">↗</span>
                            Voltar às compras
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="carrinho-page">
            <div className="cart-container">
                <FadeIn direction="up">
                    <header className="cart-header">
                        <p className="cart-eyebrow">
                            <span className="cart-eyebrow-line" />
                            Etapa 1 de 3
                        </p>
                        <h1 className="cart-title">
                            Meu <em className="cart-hand">carrinho.</em>
                        </h1>
                    </header>
                </FadeIn>

                <nav className="cart-steps" aria-label="Etapas do pedido">
                    <div className="cart-step is-active">
                        <span className="cart-step-number">1</span>
                        <span className="cart-step-label">Carrinho</span>
                    </div>
                    <div className="cart-step">
                        <span className="cart-step-number">2</span>
                        <span className="cart-step-label">Pagamento</span>
                    </div>
                    <div className="cart-step">
                        <span className="cart-step-number">3</span>
                        <span className="cart-step-label">Confirmação</span>
                    </div>
                </nav>

                <div className="cart-grid">
                    <div className="cart-main">
                        <div className="cart-table-wrap">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Subtotal</th>
                                        <th aria-label="Ações" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td data-label="Produto">
                                                <div className="cart-item-info">
                                                    <img
                                                        src={item.image}
                                                        className="cart-item-img"
                                                        alt={item.name}
                                                    />
                                                    <div className="cart-item-meta">
                                                        <p className="cart-item-name">{item.name}</p>
                                                        <p className="cart-item-code">Código: {item.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-label="Preço" className="cart-cell-price">
                                                {formatCurrency(item.price)}
                                            </td>
                                            <td data-label="Quantidade">
                                                <div className="cart-quantity">
                                                    <button
                                                        className="cart-quantity-btn"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        aria-label="Diminuir quantidade"
                                                    >
                                                        <i className="bi bi-dash" aria-hidden="true" />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="cart-quantity-input"
                                                        value={item.quantity}
                                                        min="1"
                                                        max="10"
                                                        aria-label="Quantidade"
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val) && val >= 1 && val <= 10) {
                                                                updateQuantity(item.id, val);
                                                                showNotification(`Quantidade de ${item.name} atualizada para ${val}`, 'success');
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        className="cart-quantity-btn"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= 10}
                                                        aria-label="Aumentar quantidade"
                                                    >
                                                        <i className="bi bi-plus" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td data-label="Subtotal" className="cart-cell-subtotal">
                                                {formatCurrency(item.price * item.quantity)}
                                            </td>
                                            <td>
                                                <div className="cart-item-actions">
                                                    <button
                                                        className="cart-item-action"
                                                        onClick={() => openModal(item)}
                                                        aria-label="Ver detalhes"
                                                        title="Ver detalhes"
                                                    >
                                                        <i className="bi bi-eye" aria-hidden="true" />
                                                    </button>
                                                    <button
                                                        className="cart-item-action cart-item-action-danger"
                                                        onClick={() => handleRemoveClick(item)}
                                                        aria-label="Remover item"
                                                        title="Remover item"
                                                    >
                                                        <i className="bi bi-trash" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-actions">
                            <button onClick={goBack} className="cart-btn cart-btn-ghost">
                                Continuar comprando
                            </button>
                            <button
                                className="cart-btn cart-btn-ghost cart-btn-danger"
                                onClick={() => setShowClearModal(true)}
                            >
                                Limpar carrinho
                            </button>
                        </div>
                    </div>

                    <aside className="cart-aside">
                        <div className="cart-summary">
                            <h2 className="cart-summary-title">Resumo do pedido</h2>

                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>{formatCurrency(totals.subtotal)}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Frete</span>
                                <span>{totals.shipping === 0 ? 'Grátis' : formatCurrency(totals.shipping)}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Desconto</span>
                                <span className="cart-summary-discount">
                                    {totals.discount > 0 ? `- ${formatCurrency(totals.discount)}` : '—'}
                                </span>
                            </div>
                            <div className="cart-summary-row cart-summary-total">
                                <span>Total</span>
                                <span>{formatCurrency(totals.total)}</span>
                            </div>

                            <form onSubmit={handleCheckout} className="cart-shipping">
                                <h3 className="cart-shipping-title">Dados de entrega</h3>

                                <div className="cart-field">
                                    <label htmlFor="customer-name" className="cart-label">Nome completo *</label>
                                    <input
                                        type="text"
                                        className="cart-input"
                                        id="customer-name"
                                        placeholder="Digite seu nome completo"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="cart-field">
                                    <label htmlFor="customer-address" className="cart-label">Endereço *</label>
                                    <input
                                        type="text"
                                        className="cart-input"
                                        id="customer-address"
                                        placeholder="Rua, número, complemento"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="cart-field-row">
                                    <div className="cart-field">
                                        <label htmlFor="customer-city" className="cart-label">Cidade *</label>
                                        <input
                                            type="text"
                                            className="cart-input"
                                            id="customer-city"
                                            placeholder="Digite sua cidade"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="cart-field">
                                        <label htmlFor="customer-state" className="cart-label">Estado *</label>
                                        <select
                                            className="cart-input cart-select"
                                            id="customer-state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">UF</option>
                                            <option value="SP">SP</option>
                                            <option value="RJ">RJ</option>
                                            <option value="MG">MG</option>
                                            <option value="ES">ES</option>
                                            <option value="PR">PR</option>
                                            <option value="SC">SC</option>
                                            <option value="RS">RS</option>
                                            <option value="BA">BA</option>
                                            <option value="PE">PE</option>
                                            <option value="CE">CE</option>
                                            <option value="DF">DF</option>
                                            <option value="GO">GO</option>
                                            <option value="AM">AM</option>
                                            <option value="PA">PA</option>
                                            <option value="MT">MT</option>
                                            <option value="MS">MS</option>
                                            <option value="AC">AC</option>
                                            <option value="AL">AL</option>
                                            <option value="AP">AP</option>
                                            <option value="MA">MA</option>
                                            <option value="PB">PB</option>
                                            <option value="PI">PI</option>
                                            <option value="RN">RN</option>
                                            <option value="RO">RO</option>
                                            <option value="RR">RR</option>
                                            <option value="SE">SE</option>
                                            <option value="TO">TO</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="cart-field">
                                    <label htmlFor="customer-zip" className="cart-label">CEP *</label>
                                    <input
                                        type="text"
                                        className="cart-input"
                                        id="customer-zip"
                                        placeholder="00000-000"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="cart-btn cart-btn-primary cart-btn-block">
                                    Finalizar compra
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddToCart={addToCart}
                onAddMultiple={addMultipleToCart}
            />

            {showRemoveModal && (
                <div className="modal-overlay" onClick={() => setShowRemoveModal(false)}>
                    <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowRemoveModal(false)} aria-label="Fechar">✕</button>
                        <div className="modal-confirm">
                            <i className="bi bi-exclamation-circle modal-confirm-icon" aria-hidden="true" />
                            <h3 className="modal-title">Remover item do carrinho?</h3>
                            <p className="modal-text">
                                Tem certeza que deseja remover <strong>{itemToRemove?.name}</strong> do carrinho?
                            </p>
                        </div>
                        <div className="modal-actions">
                            <button className="cart-btn cart-btn-ghost" onClick={() => setShowRemoveModal(false)}>
                                Cancelar
                            </button>
                            <button className="cart-btn cart-btn-primary" onClick={confirmRemove}>
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showClearModal && (
                <div className="modal-overlay" onClick={() => setShowClearModal(false)}>
                    <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowClearModal(false)} aria-label="Fechar">✕</button>
                        <div className="modal-confirm">
                            <i className="bi bi-exclamation-circle modal-confirm-icon" aria-hidden="true" />
                            <h3 className="modal-title">Limpar carrinho?</h3>
                            <p className="modal-text">Todos os itens serão removidos.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="cart-btn cart-btn-ghost" onClick={() => setShowClearModal(false)}>
                                Cancelar
                            </button>
                            <button className="cart-btn cart-btn-primary" onClick={handleClearCart}>
                                Limpar carrinho
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Carrinho;