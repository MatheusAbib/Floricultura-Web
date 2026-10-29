import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import FadeIn from '../../components/FadeIn/FadeIn';
import Footer from '../../components/Footer/Footer';
import './Pagamento.scss';

function Pagamento() {
    const { cart, clearCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditingShipping, setIsEditingShipping] = useState(false);
    const [customerData, setCustomerData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });
    const [tempCustomerData, setTempCustomerData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });
    const [cardData, setCardData] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: ''
    });
    const [pixConfirmed, setPixConfirmed] = useState(false);
    const [saveCard, setSaveCard] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const savedCustomer = JSON.parse(localStorage.getItem('customerData')) || {};
        const shippingForm = JSON.parse(localStorage.getItem('shippingFormData')) || {};

        if (savedCart.length === 0) {
            navigate('/carrinho');
            return;
        }

        const customerInfo = savedCustomer.name ? savedCustomer : shippingForm;
        setCustomerData(customerInfo);
        setTempCustomerData(customerInfo);

        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [navigate]);

    const calculateTotals = () => {
        const subtotal = getCartTotal();
        const shipping = subtotal > 100 ? 0 : 15;
        const discount = subtotal > 150 ? subtotal * 0.1 : 0;
        return { subtotal, shipping, discount, total: subtotal + shipping - discount };
    };

    const handleCardInputChange = (e) => {
        const { id, value } = e.target;
        setCardData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCardNumber = (e) => {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join(' ');
        }
        setCardData(prev => ({ ...prev, number: value }));
    };

    const handleExpiry = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setCardData(prev => ({ ...prev, expiry: value }));
    };

    const handleShippingChange = (e) => {
        const { id, value } = e.target;
        setTempCustomerData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const saveShippingData = () => {
        setCustomerData(tempCustomerData);
        localStorage.setItem('customerData', JSON.stringify(tempCustomerData));
        localStorage.setItem('shippingFormData', JSON.stringify(tempCustomerData));
        setIsEditingShipping(false);
    };

    const cancelShippingEdit = () => {
        setTempCustomerData(customerData);
        setIsEditingShipping(false);
    };

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (paymentMethod === 'pix' && !pixConfirmed) {
            showError('Por favor, confirme que realizará o pagamento via PIX em até 30 minutos.');
            return;
        }

        if (paymentMethod === 'credit') {
            const { name, number, expiry, cvv } = cardData;
            const cleanNumber = number.replace(/\s/g, '');

            if (!name) {
                showError('Por favor, informe o nome no cartão.');
                return;
            }
            if (cleanNumber.length !== 16 || !/^\d+$/.test(cleanNumber)) {
                showError('Por favor, informe um número de cartão válido (16 dígitos).');
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                showError('Por favor, informe a data de validade no formato MM/AA.');
                return;
            }
            if (cvv.length < 3 || !/^\d+$/.test(cvv)) {
                showError('Por favor, informe um CVV válido (mínimo 3 dígitos).');
                return;
            }
        }

        setShowSuccess(true);
        clearCart();
        localStorage.removeItem('customerData');
        localStorage.removeItem('shippingFormData');

        setTimeout(() => {
            navigate('/');
        }, 5000);
    };

    const totals = calculateTotals();

    if (loading) {
        return (
            <div className="loading-overlay">
                <i className="bi bi-flower1 loading-logo"></i>
            </div>
        );
    }

    return (
        <div className="pagamento-page">
            <header className="pagamento-header">
                <FadeIn direction="up">
                    <p className="pg-eyebrow">
                        <span className="pg-eyebrow-line" />
                        Etapa 2 de 3
                    </p>
                </FadeIn>
                <FadeIn direction="up" delay={100}>
                    <h1 className="pg-title">
                        Finalizar <em className="pg-hand">pagamento.</em>
                    </h1>
                </FadeIn>
            </header>

            <div className="payment-container">
                <div className="payment-grid">
                    <div className="payment-main">
                        <FadeIn direction="up">
                            <section className="payment-card">
                                <h2 className="payment-card-title">Informações de pagamento</h2>

                                <div className="payment-methods">
                                    <h3 className="payment-block-title">Método</h3>

                                    <button
                                        type="button"
                                        className={`payment-method ${paymentMethod === 'credit' ? 'is-active' : ''}`}
                                        onClick={() => setPaymentMethod('credit')}
                                    >
                                        <i className="bi bi-credit-card-2-front payment-method-icon" aria-hidden="true" />
                                        <span className="payment-method-text">
                                            <span className="payment-method-name">Cartão de crédito</span>
                                            <span className="payment-method-desc">Pague com cartão de crédito</span>
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className={`payment-method ${paymentMethod === 'pix' ? 'is-active' : ''}`}
                                        onClick={() => setPaymentMethod('pix')}
                                    >
                                        <i className="bi bi-qr-code payment-method-icon" aria-hidden="true" />
                                        <span className="payment-method-text">
                                            <span className="payment-method-name">PIX</span>
                                            <span className="payment-method-desc">Pagamento instantâneo</span>
                                        </span>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} id="payment-form">
                                    {paymentMethod === 'credit' && (
                                        <div className="payment-fields">
                                            <div className="pg-field">
                                                <label htmlFor="name" className="pg-label">Nome no cartão</label>
                                                <input
                                                    type="text"
                                                    className="pg-input"
                                                    id="name"
                                                    placeholder="Como está impresso no cartão"
                                                    value={cardData.name}
                                                    onChange={handleCardInputChange}
                                                />
                                            </div>

                                            <div className="pg-field">
                                                <label htmlFor="number" className="pg-label">Número do cartão</label>
                                                <input
                                                    type="text"
                                                    className="pg-input"
                                                    id="number"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardData.number}
                                                    onChange={handleCardNumber}
                                                    maxLength="19"
                                                />
                                            </div>

                                            <div className="pg-field-row">
                                                <div className="pg-field">
                                                    <label htmlFor="expiry" className="pg-label">Validade</label>
                                                    <input
                                                        type="text"
                                                        className="pg-input"
                                                        id="expiry"
                                                        placeholder="MM/AA"
                                                        value={cardData.expiry}
                                                        onChange={handleExpiry}
                                                        maxLength="5"
                                                    />
                                                </div>
                                                <div className="pg-field">
                                                    <label htmlFor="cvv" className="pg-label">CVV</label>
                                                    <input
                                                        type="text"
                                                        className="pg-input"
                                                        id="cvv"
                                                        placeholder="123"
                                                        value={cardData.cvv}
                                                        onChange={handleCardInputChange}
                                                        maxLength="4"
                                                    />
                                                </div>
                                            </div>

                                            <label className="pg-check">
                                                <input
                                                    type="checkbox"
                                                    className="pg-checkbox"
                                                    checked={saveCard}
                                                    onChange={(e) => setSaveCard(e.target.checked)}
                                                />
                                                <span className="pg-check-label">
                                                    Salvar informações do cartão para compras futuras
                                                </span>
                                            </label>
                                        </div>
                                    )}

                                    {paymentMethod === 'pix' && (
                                        <div className="payment-pix">
                                            <div className="pg-alert">
                                                <i className="bi bi-info-circle pg-alert-icon" aria-hidden="true" />
                                                <p className="pg-alert-text">
                                                    Ao confirmar o pedido, geraremos um QR Code para pagamento via PIX.
                                                </p>
                                            </div>
                                            <label className="pg-check">
                                                <input
                                                    type="checkbox"
                                                    className="pg-checkbox"
                                                    checked={pixConfirmed}
                                                    onChange={(e) => setPixConfirmed(e.target.checked)}
                                                />
                                                <span className="pg-check-label">
                                                    Confirmo que realizarei o pagamento via PIX em até 30 minutos
                                                </span>
                                            </label>
                                        </div>
                                    )}

                                    <button type="submit" className="pg-btn pg-btn-primary pg-btn-block" id="pay-button">
                                        <i className="bi bi-lock pg-btn-icon" aria-hidden="true" />
                                        Finalizar compra
                                    </button>
                                </form>
                            </section>
                        </FadeIn>
                    </div>

                    <aside className="payment-aside">
                        <FadeIn direction="up" delay={100}>
                            <section className="payment-card">
                                <h2 className="payment-card-title">Resumo do pedido</h2>

                                <div className="order-summary">
                                    {cart.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <span className="order-item-label">{item.name} ({item.quantity}x)</span>
                                            <span className="order-item-value">{formatCurrency(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                    <div className="order-item">
                                        <span className="order-item-label">Frete</span>
                                        <span className="order-item-value">
                                            {totals.shipping === 0 ? 'Grátis' : formatCurrency(totals.shipping)}
                                        </span>
                                    </div>
                                    {totals.discount > 0 && (
                                        <div className="order-item order-item-discount">
                                            <span className="order-item-label">Desconto</span>
                                            <span className="order-item-value">- {formatCurrency(totals.discount)}</span>
                                        </div>
                                    )}
                                    <div className="order-item order-total">
                                        <span className="order-item-label">Total</span>
                                        <span className="order-item-value">{formatCurrency(totals.total)}</span>
                                    </div>
                                </div>

                                <div className="payment-delivery">
                                    <div className="payment-delivery-head">
                                        <h3 className="payment-block-title">Entrega</h3>
                                        {!isEditingShipping && (
                                            <button
                                                type="button"
                                                className="pg-btn pg-btn-ghost pg-btn-sm"
                                                onClick={() => setIsEditingShipping(true)}
                                            >
                                                Editar
                                            </button>
                                        )}
                                    </div>

                                    {!isEditingShipping ? (
                                        <address className="payment-address">
                                            <strong className="payment-address-name">{customerData.name || '—'}</strong>
                                            <span className="payment-address-line">{customerData.address || '—'}</span>
                                            <span className="payment-address-line">
                                                {customerData.city || '—'} {customerData.state ? `— ${customerData.state}` : ''}
                                            </span>
                                            <span className="payment-address-line">CEP {customerData.zip || '—'}</span>
                                        </address>
                                    ) : (
                                        <div className="payment-shipping-edit">
                                            <div className="pg-field">
                                                <input
                                                    type="text"
                                                    className="pg-input pg-input-sm"
                                                    id="name"
                                                    placeholder="Nome completo"
                                                    value={tempCustomerData.name}
                                                    onChange={handleShippingChange}
                                                />
                                            </div>
                                            <div className="pg-field">
                                                <input
                                                    type="text"
                                                    className="pg-input pg-input-sm"
                                                    id="address"
                                                    placeholder="Endereço"
                                                    value={tempCustomerData.address}
                                                    onChange={handleShippingChange}
                                                />
                                            </div>
                                            <div className="pg-field-row pg-field-row-sm">
                                                <input
                                                    type="text"
                                                    className="pg-input pg-input-sm"
                                                    id="city"
                                                    placeholder="Cidade"
                                                    value={tempCustomerData.city}
                                                    onChange={handleShippingChange}
                                                />
                                                <select
                                                    className="pg-input pg-input-sm pg-select"
                                                    id="state"
                                                    value={tempCustomerData.state || ''}
                                                    onChange={handleShippingChange}
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
                                            <div className="pg-field">
                                                <input
                                                    type="text"
                                                    className="pg-input pg-input-sm"
                                                    id="zip"
                                                    placeholder="CEP"
                                                    value={tempCustomerData.zip}
                                                    onChange={handleShippingChange}
                                                />
                                            </div>
                                            <div className="payment-shipping-actions">
                                                <button
                                                    type="button"
                                                    className="pg-btn pg-btn-primary pg-btn-sm"
                                                    onClick={saveShippingData}
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="pg-btn pg-btn-ghost pg-btn-sm"
                                                    onClick={cancelShippingEdit}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </FadeIn>
                    </aside>
                </div>
            </div>

            {showSuccess && (
                <div className="payment-success-overlay">
                    <div className="payment-success" role="status">
                        <i className="bi bi-check-circle payment-success-icon" aria-hidden="true" />
                        <h2 className="payment-success-title">Pagamento aprovado</h2>
                        <p className="payment-success-text">
                            Sua compra foi concluída. Você receberá um e-mail com os detalhes do pedido.
                        </p>
                        <Link to="/" className="pg-btn pg-btn-primary">
                            Voltar à página inicial
                        </Link>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className="modal-overlay" onClick={() => setShowErrorModal(false)}>
                    <div className="modal-box modal-small" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowErrorModal(false)} aria-label="Fechar">✕</button>
                        <div className="modal-confirm">
                            <i className="bi bi-exclamation-circle modal-confirm-icon" aria-hidden="true" />
                            <h3 className="modal-title">Não foi possível continuar</h3>
                            <p className="modal-text">{errorMessage}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="pg-btn pg-btn-primary" onClick={() => setShowErrorModal(false)}>
                                Entendi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Pagamento;