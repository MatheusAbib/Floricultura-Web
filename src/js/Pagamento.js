document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let customerData = JSON.parse(localStorage.getItem('customerData')) || {};

    if (!customerData.name) {
        const shippingFormData = JSON.parse(localStorage.getItem('shippingFormData')) || {};
        customerData = {
            name: shippingFormData.name || '',
            address: shippingFormData.address || '',
            city: shippingFormData.city || '',
            zip: shippingFormData.zip || ''
        };
    }

    const totals = calculateTotals(cart);
    updateCartCounter(cart);
    renderOrderSummary(cart, totals);
    renderShippingInfo(customerData);
    setupPaymentEvents();
});

// Calcular totais do pedido
function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const discount = subtotal > 150 ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;
    return { subtotal, shipping, discount, total };
}

// Atualizar contador do carrinho no ícone
function updateCartCounter(cart) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector('.badge');
    if (badge) badge.textContent = totalItems;
}

// Formatar valores para R$
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Mostrar resumo do pedido
function renderOrderSummary(cart, totals) {
    const orderSummary = document.querySelector('.order-summary');
    if (!orderSummary) return;
    orderSummary.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
        `;
        orderSummary.appendChild(itemElement);
    });

    const shippingElement = document.createElement('div');
    shippingElement.className = 'order-item';
    shippingElement.innerHTML = `<span>Frete</span><span>${formatCurrency(totals.shipping)}</span>`;
    orderSummary.appendChild(shippingElement);

    orderSummary.appendChild(document.createElement('hr'));

    const totalElement = document.createElement('div');
    totalElement.className = 'order-item order-total';
    totalElement.innerHTML = `<span>Total</span><span>${formatCurrency(totals.total)}</span>`;
    orderSummary.appendChild(totalElement);
}

// Exibir dados de entrega
function renderShippingInfo(customerData) {
    const shippingInfo = document.querySelector('address');
    if (!shippingInfo || !customerData.name) return;

    shippingInfo.innerHTML = `
        <strong>${customerData.name}</strong><br>
        ${customerData.address}<br>
        ${customerData.city}<br>
        CEP: ${customerData.zip}
    `;
}

// Eventos de interação de pagamento
function setupPaymentEvents() {
    const creditMethodBtn = document.getElementById('credit-card-method');
    const pixMethodBtn = document.getElementById('pix-method');
    const creditCardForm = document.getElementById('credit-card-form');
    const pixForm = document.getElementById('pix-form');
    const form = document.getElementById('payment-form');

    let activePaymentMethod = 'credit'; // padrão

    // Alternar para cartão de crédito
    creditMethodBtn.addEventListener('click', function () {
        activePaymentMethod = 'credit';
        creditMethodBtn.classList.add('active');
        pixMethodBtn.classList.remove('active');
        creditCardForm.style.display = 'block';
        pixForm.style.display = 'none';
    });

    // Alternar para PIX
    pixMethodBtn.addEventListener('click', function () {
        activePaymentMethod = 'pix';
        pixMethodBtn.classList.add('active');
        creditMethodBtn.classList.remove('active');
        creditCardForm.style.display = 'none';
        pixForm.style.display = 'block';
    });

    // Envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (activePaymentMethod === 'pix') {
            const pixConfirmed = document.getElementById('pix-confirm')?.checked;
            if (!pixConfirmed) {
                return;
            }
        }

        if (activePaymentMethod === 'credit') {
            const cardName = document.getElementById('name').value.trim();
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const expiry = document.getElementById('expiry').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!cardName || cardNumber.length < 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3) {
                return;
            }
        }

        // Mostrar mensagem de sucesso
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('success-message').style.display = 'block';

        // Limpar carrinho
        localStorage.removeItem('cart');

        // Redirecionar após 5 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    });

    // Máscara cartão
    document.getElementById('card-number').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join(' ');
        }
        e.target.value = value;
    });

    // Máscara validade
    document.getElementById('expiry').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

 document.addEventListener('DOMContentLoaded', function() {
        const loadingOverlay = document.getElementById('loading-overlay');
        
        window.addEventListener('load', function() {
            loadingOverlay.classList.add('hidden');
            
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500); // Tempo combinado com a transição CSS
        });
    });