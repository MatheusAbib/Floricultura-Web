        // Funções específicas da página de pagamento
        document.addEventListener('DOMContentLoaded', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            let customerData = JSON.parse(localStorage.getItem('customerData')) || {};

            // Se não tiver customerData do carrinho, tenta pegar do shippingFormData
            if (!customerData.name) {
                const shippingFormData = JSON.parse(localStorage.getItem('shippingFormData')) || {};
                customerData = {
                    name: shippingFormData.name || '',
                    address: shippingFormData.address || '',
                    city: shippingFormData.city || '',
                    zip: shippingFormData.zip || ''
                };
            }

            // Se o carrinho estiver vazio, redireciona para o carrinho
            if (cart.length === 0) {
                window.location.href = 'Carrinho.html';
                return;
            }

            const totals = calculateTotals(cart);
            updateOrderSummary(cart, totals);
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

        // Formatar valores para R$
        function formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            }).format(value);
        }

        // Mostrar resumo do pedido
        function updateOrderSummary(cart, totals) {
            const orderSummary = document.getElementById('order-summary');
            if (!orderSummary) return;
            
            orderSummary.innerHTML = '';

            // Adicionar itens do carrinho
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'order-item';
                itemElement.innerHTML = `
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>${formatCurrency(item.price * item.quantity)}</span>
                `;
                orderSummary.appendChild(itemElement);
            });

            // Adicionar frete
            const shippingElement = document.createElement('div');
            shippingElement.className = 'order-item';
            shippingElement.innerHTML = `<span>Frete</span><span>${formatCurrency(totals.shipping)}</span>`;
            orderSummary.appendChild(shippingElement);

            // Adicionar desconto se houver
            if (totals.discount > 0) {
                const discountElement = document.createElement('div');
                discountElement.className = 'order-item text-success';
                discountElement.innerHTML = `<span>Desconto</span><span>-${formatCurrency(totals.discount)}</span>`;
                orderSummary.appendChild(discountElement);
            }

            orderSummary.appendChild(document.createElement('hr'));

            // Adicionar total
            const totalElement = document.createElement('div');
            totalElement.className = 'order-item order-total';
            totalElement.innerHTML = `<span>Total</span><span>${formatCurrency(totals.total)}</span>`;
            orderSummary.appendChild(totalElement);
        }

        // Exibir dados de entrega
        function renderShippingInfo(customerData) {
            const shippingInfo = document.getElementById('shipping-address');
            if (!shippingInfo || !customerData.name) return;

            shippingInfo.innerHTML = `
                <strong>${customerData.name}</strong><br>
                ${customerData.address}<br>
                ${customerData.city}<br>
                CEP: ${customerData.zip || 'Não informado'}
            `;
        }

        // Eventos de interação de pagamento
        function setupPaymentEvents() {
            const creditMethodBtn = document.getElementById('credit-card-method');
            const pixMethodBtn = document.getElementById('pix-method');
            const creditCardForm = document.getElementById('credit-card-form');
            const pixForm = document.getElementById('pix-form');
            const form = document.getElementById('payment-form');

            let activePaymentMethod = 'credit';

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

                // Validação baseada no método selecionado
                if (activePaymentMethod === 'pix') {
                    const pixConfirmed = document.getElementById('pix-confirm')?.checked;
                    if (!pixConfirmed) {
                        alert('Por favor, confirme que realizará o pagamento via PIX em até 30 minutos.');
                        return;
                    }
                }

                if (activePaymentMethod === 'credit') {
                    const cardName = document.getElementById('name').value.trim();
                    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
                    const expiry = document.getElementById('expiry').value.trim();
                    const cvv = document.getElementById('cvv').value.trim();

                    // Validações básicas
                    if (!cardName) {
                        alert('Por favor, informe o nome no cartão.');
                        return;
                    }
                    
                    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
                        alert('Por favor, informe um número de cartão válido (16 dígitos).');
                        return;
                    }
                    
                    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                        alert('Por favor, informe a data de validade no formato MM/AA.');
                        return;
                    }
                    
                    if (cvv.length < 3 || !/^\d+$/.test(cvv)) {
                        alert('Por favor, informe um CVV válido (mínimo 3 dígitos).');
                        return;
                    }
                }

                // Mostrar mensagem de sucesso
                document.getElementById('overlay').classList.add('show');
                document.getElementById('success-message').classList.add('show');

                // Limpar carrinho e dados temporários
                localStorage.removeItem('cart');
                localStorage.removeItem('customerData');
                localStorage.removeItem('shippingFormData');

                // Redirecionar após 5 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 5000);
            });

            // Máscara para número do cartão
            document.getElementById('card-number').addEventListener('input', function (e) {
                let value = e.target.value.replace(/\s+/g, '');
                if (value.length > 0) {
                    value = value.match(/.{1,4}/g).join(' ');
                }
                e.target.value = value;
            });

            // Máscara para data de validade
            document.getElementById('expiry').addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }