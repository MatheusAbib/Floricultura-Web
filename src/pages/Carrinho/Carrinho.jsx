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
        // Tentar carregar dados salvos, se não houver, manter os estáticos
        const savedShipping = localStorage.getItem('shippingFormData');
        if (savedShipping) {
            try {
                const parsed = JSON.parse(savedShipping);
                // Só sobrescreve se tiver dados salvos
                if (parsed.name || parsed.address) {
                    setFormData(parsed);
                }
            } catch (e) {}
        }
        setTimeout(() => setLoading(false), 1500);
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
                        <div className="cart-header">
                            <h1>Meu Carrinho</h1>
                            <p>Revise seus itens antes de finalizar a compra</p>
                        </div>
                    </FadeIn>

                    <div className="cart-steps">
                        <div className="step completed">
                            <div className="step-number">1</div>
                            <div className="step-title">Carrinho</div>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-title">Pagamento</div>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-title">Confirmação</div>
                        </div>
                    </div>

                    <div className="empty-cart-full">
                        <i className="bi bi-cart-x"></i>
                        <h3>Seu carrinho está vazio</h3>
                        <p>Adicione produtos para continuar com sua compra</p>
                        <Link to="/" className="btn btn-success">Voltar às Compras</Link>
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
                    <div className="cart-header">
                        <h1>Meu Carrinho</h1>
                        <p>Revise seus itens antes de finalizar a compra</p>
                    </div>
                </FadeIn>

                <div className="cart-steps">
                    <div className="step completed">
                        <div className="step-number">1</div>
                        <div className="step-title">Carrinho</div>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-title">Pagamento</div>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-title">Confirmação</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <div className="table-responsive">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Subtotal</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td data-label="Produto">
                                                <div className="d-flex align-items-center">
                                                    <img src={item.image} className="cart-item-img me-3" alt={item.name} />
                                                    <div>
                                                        <h5 className="mb-1">{item.name}</h5>
                                                        <small className="text-muted">Código: {item.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-label="Preço">{formatCurrency(item.price)}</td>
                                            <td data-label="Quantidade">
                                                <div className="quantity-control">
                                                    <button 
                                                        className="quantity-btn minus"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>
                                                    <input 
                                                        type="number" 
                                                        className="quantity-input" 
                                                        value={item.quantity}
                                                        min="1"
                                                        max="10"
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val) && val >= 1 && val <= 10) {
                                                                updateQuantity(item.id, val);
                                                                showNotification(`Quantidade de ${item.name} atualizada para ${val}`, 'success');
                                                            }
                                                        }}
                                                    />
                                                    <button 
                                                        className="quantity-btn plus"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= 10}
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td data-label="Subtotal">{formatCurrency(item.price * item.quantity)}</td>
                                            <td>
                                                <div className="d-flex gap-1 align-items-center">
                                                    <button 
                                                        className="btn btn-view-cart btn-sm"
                                                        onClick={() => openModal(item)}
                                                        title="Visualizar detalhes"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <i 
                                                        className="bi bi-trash remove-item" 
                                                        onClick={() => handleRemoveClick(item)}
                                                    ></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-actions">
                            <button onClick={goBack} className="btn btn-outline-secondary">
                                <i className="bi bi-arrow-left me-2"></i>Continuar Comprando
                            </button>
                            <button 
                                className="btn btn-outline-danger" 
                                onClick={() => setShowClearModal(true)}
                            >
                                <i className="bi bi-trash me-2"></i>Limpar Carrinho
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="cart-summary">
                            <h4>Resumo do Pedido</h4>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatCurrency(totals.subtotal)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Frete</span>
                                <span>{formatCurrency(totals.shipping)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Desconto</span>
                                <span className="text-success">
                                    {totals.discount > 0 ? `-${formatCurrency(totals.discount)}` : formatCurrency(0)}
                                </span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{formatCurrency(totals.total)}</span>
                            </div>

                            <form onSubmit={handleCheckout} className="shipping-form">
                                <h5 className="mt-4 mb-3">Dados de Entrega</h5>

                                <div className="mb-3">
                                    <label htmlFor="customer-name" className="form-label">Nome Completo *</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="customer-name" 
                                        placeholder="Digite seu nome completo"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="customer-address" className="form-label">Endereço *</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="customer-address" 
                                        placeholder="Rua, número, complemento"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="customer-city" className="form-label">Cidade *</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="customer-city" 
                                            placeholder="Digite sua cidade"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="customer-state" className="form-label">Estado *</label>
                                        <select 
                                            className="form-control" 
                                            id="customer-state" 
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Selecione...</option>
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

                                <div className="mb-3">
                                    <label htmlFor="customer-zip" className="form-label">CEP *</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="customer-zip" 
                                        placeholder="00000-000"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-credit-card me-2"></i>Finalizar Compra
                                </button>
                            </form>
                        </div>
                    </div>
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
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowRemoveModal(false)}>✕</button>
                        <div className="text-center">
                            <i className="bi bi-exclamation-triangle text-warning display-4 mb-3"></i>
                            <h5>Remover item do carrinho?</h5>
                            <p>Tem certeza que deseja remover <strong>{itemToRemove?.name}</strong> do carrinho?</p>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => setShowRemoveModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn btn-danger" 
                                onClick={confirmRemove}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showClearModal && (
                <div className="modal-overlay" onClick={() => setShowClearModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowClearModal(false)}>✕</button>
                        <div className="text-center">
                            <i className="bi bi-exclamation-triangle text-warning display-4 mb-3"></i>
                            <h5>Tem certeza que deseja limpar seu carrinho?</h5>
                            <p>Todos os itens serão removidos.</p>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => setShowClearModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn btn-danger" 
                                onClick={handleClearCart}
                            >
                                Limpar Carrinho
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