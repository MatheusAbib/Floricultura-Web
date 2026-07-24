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

        setTimeout(() => setLoading(false), 1500);
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
            <div className="payment-container">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <FadeIn direction="left">
                            <div className="payment-card">
                                <div className="payment-header">
                                    <h1 className="payment-title text-center">Finalizar Pagamento</h1>
                                </div>
                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit} id="payment-form">
                                        <h4 className="mb-4">
                                            <i className="bi bi-credit-card me-2"></i>Informações de Pagamento
                                        </h4>

                                        <div className="mb-4">
                                            <h5>Método de Pagamento</h5>
                                            <div 
                                                className={`payment-method ${paymentMethod === 'credit' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('credit')}
                                            >
                                                <i className="bi bi-credit-card-2-front payment-icon"></i>
                                                <div>
                                                    <h6 className="mb-1">Cartão de Crédito</h6>
                                                    <p className="small text-muted mb-0">Pague com seu cartão de crédito</p>
                                                </div>
                                            </div>
                                            <div 
                                                className={`payment-method ${paymentMethod === 'pix' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('pix')}
                                            >
                                                <i className="bi bi-qr-code payment-icon"></i>
                                                <div>
                                                    <h6 className="mb-1">PIX</h6>
                                                    <p className="small text-muted mb-0">Pagamento instantâneo via PIX</p>
                                                </div>
                                            </div>
                                        </div>

                                        {paymentMethod === 'credit' && (
                                            <div id="credit-card-form">
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">Nome no Cartão</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="name" 
                                                        placeholder="Nome como impresso no cartão"
                                                        value={cardData.name}
                                                        onChange={handleCardInputChange}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="number" className="form-label">Número do Cartão</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="number" 
                                                        placeholder="1234 5678 9012 3456"
                                                        value={cardData.number}
                                                        onChange={handleCardNumber}
                                                        maxLength="19"
                                                    />
                                                </div>

                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label htmlFor="expiry" className="form-label">Data de Expiração</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="expiry" 
                                                            placeholder="MM/AA"
                                                            value={cardData.expiry}
                                                            onChange={handleExpiry}
                                                            maxLength="5"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="cvv" className="form-label">CVV</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="cvv" 
                                                            placeholder="123"
                                                            value={cardData.cvv}
                                                            onChange={handleCardInputChange}
                                                            maxLength="4"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-check mt-4">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id="save-card"
                                                        checked={saveCard}
                                                        onChange={(e) => setSaveCard(e.target.checked)}
                                                    />
                                                    <label className="form-check-label" htmlFor="save-card">
                                                        Salvar informações do cartão para compras futuras
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === 'pix' && (
                                            <div id="pix-form">
                                                <div className="alert alert-success">
                                                    <i className="bi bi-info-circle-fill me-2"></i> 
                                                    Ao confirmar o pedido, geraremos um QR Code para pagamento via PIX.
                                                </div>
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id="pix-confirm"
                                                        checked={pixConfirmed}
                                                        onChange={(e) => setPixConfirmed(e.target.checked)}
                                                    />
                                                    <label className="form-check-label" htmlFor="pix-confirm">
                                                        Confirmo que realizarei o pagamento via PIX em até 30 minutos
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        <button type="submit" className="btn btn-success mt-4" id="pay-button">
                                            <i className="bi bi-lock-fill me-2"></i>Finalizar Compra
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="col-lg-4">
                        <FadeIn direction="right">
                            <div className="payment-card">
                                <div className="payment-header">
                                    <h4 className="mb-0 text-center">
                                        <i className="bi bi-receipt me-2"></i>Resumo do Pedido
                                    </h4>
                                </div>
                                <div className="card-body p-4">
                                    <div className="order-summary" id="order-summary">
                                        {cart.map((item) => (
                                            <div key={item.id} className="order-item">
                                                <span>{item.name} ({item.quantity}x)</span>
                                                <span>{formatCurrency(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                        <div className="order-item">
                                            <span>Frete</span>
                                            <span>{formatCurrency(totals.shipping)}</span>
                                        </div>
                                        {totals.discount > 0 && (
                                            <div className="order-item text-success">
                                                <span>Desconto</span>
                                                <span>-{formatCurrency(totals.discount)}</span>
                                            </div>
                                        )}
                                        <hr />
                                        <div className="order-item order-total">
                                            <span>Total</span>
                                            <span>{formatCurrency(totals.total)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0"><i className="bi bi-truck me-2"></i>Entrega</h5>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => setIsEditingShipping(true)}
                                            >
                                                <i className="bi bi-pencil me-1"></i>Editar
                                            </button>
                                        </div>
                                        
                                        {!isEditingShipping ? (
                                            <address>
                                                <strong>{customerData.name}</strong><br />
                                                {customerData.address}<br />
                                                {customerData.city} - {customerData.state}<br />
                                                CEP: {customerData.zip || 'Não informado'}
                                            </address>
                                        ) : (
                                            <div className="shipping-edit-form">
                                                <div className="mb-2">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm" 
                                                        id="name" 
                                                        placeholder="Nome Completo"
                                                        value={tempCustomerData.name}
                                                        onChange={handleShippingChange}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm" 
                                                        id="address" 
                                                        placeholder="Endereço"
                                                        value={tempCustomerData.address}
                                                        onChange={handleShippingChange}
                                                    />
                                                </div>
                                                <div className="row g-2 mb-2">
                                                    <div className="col-7">
                                                        <input 
                                                            type="text" 
                                                            className="form-control form-control-sm" 
                                                            id="city" 
                                                            placeholder="Cidade"
                                                            value={tempCustomerData.city}
                                                            onChange={handleShippingChange}
                                                        />
                                                    </div>
                                                    <div className="col-5">
                                                        <select 
                                                            className="form-control form-control-sm" 
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
                                                </div>
                                                <div className="mb-2">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm" 
                                                        id="zip" 
                                                        placeholder="CEP"
                                                        value={tempCustomerData.zip}
                                                        onChange={handleShippingChange}
                                                    />
                                                </div>
                                                <div className="d-flex gap-2 mt-2">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-success flex-grow-1"
                                                        onClick={saveShippingData}
                                                    >
                                                        <i className="bi bi-check me-1"></i>Salvar
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={cancelShippingEdit}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <>
                    <div className="overlay show"></div>
                    <div className="success-message show">
                        <i className="bi bi-check-circle-fill success-icon"></i>
                        <h3>Pagamento Aprovado!</h3>
                        <p className="mb-4">Sua compra foi concluída com sucesso. Obrigado por escolher a Floricultura Web!</p>
                        <p className="small text-muted">Você receberá um e-mail com os detalhes do seu pedido.</p>
                        <Link to="/" className="btn btn-success mt-3">
                            <i className="bi bi-house-door me-2"></i>Voltar à Página Inicial
                        </Link>
                    </div>
                </>
            )}

            {showErrorModal && (
                <div className="modal-overlay" onClick={() => setShowErrorModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-x" onClick={() => setShowErrorModal(false)}>✕</button>
                        <div className="text-center">
                            <i className="bi bi-exclamation-triangle text-danger display-4 mb-3"></i>
                            <h5>Ops! Algo deu errado</h5>
                            <p>{errorMessage}</p>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button 
                                className="btn btn-success" 
                                onClick={() => setShowErrorModal(false)}
                            >
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