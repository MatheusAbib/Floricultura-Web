    // Carrinho de compras
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Atualizar contador do carrinho
        function updateCartCounter() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.cart-counter').textContent = totalItems;
        }
        
        // Formatador de moeda
        function formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            }).format(value);
        }
        
        // Calcular totais
        function calculateTotals() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 100 ? 0 : 15; // Frete grátis para compras acima de R$ 100
            const discount = subtotal > 150 ? subtotal * 0.1 : 0; // 10% de desconto para compras acima de R$ 150
            const total = subtotal + shipping - discount;
            
            return {
                subtotal,
                shipping,
                discount,
                total
            };
        }
        
        // Atualizar resumo do pedido
        function updateOrderSummary() {
            const totals = calculateTotals();
            
            document.getElementById('subtotal').textContent = formatCurrency(totals.subtotal);
            document.getElementById('shipping').textContent = formatCurrency(totals.shipping);
            document.getElementById('discount').textContent = totals.discount > 0 ? 
                `-${formatCurrency(totals.discount)}` : formatCurrency(0);
            document.getElementById('total').textContent = formatCurrency(totals.total);
        }
        
        // Renderizar itens do carrinho
        function renderCartItems() {
            const cartItemsBody = document.getElementById('cart-items-body');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            const cartActions = document.getElementById('cart-actions');
            const cartSummary = document.getElementById('cart-summary');
            
            if (cart.length === 0) {
                cartItemsBody.innerHTML = '';
                document.querySelector('.cart-table').style.display = 'none';
                emptyCartMessage.style.display = 'block';
                cartActions.style.display = 'none';
                cartSummary.style.display = 'none';
                return;
            }
            
            document.querySelector('.cart-table').style.display = 'table';
            emptyCartMessage.style.display = 'none';
            cartActions.style.display = 'flex';
            cartSummary.style.display = 'block';
            
            cartItemsBody.innerHTML = '';
            
            cart.forEach(item => {
                const subtotal = item.price * item.quantity;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="Produto">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" class="cart-item-img me-3" alt="${item.name}">
                            <div>
                                <h5 class="mb-1">${item.name}</h5>
                                <small class="text-muted">Código: ${item.id}</small>
                            </div>
                        </div>
                    </td>
                    <td data-label="Preço">${formatCurrency(item.price)}</td>
                    <td data-label="Quantidade">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td data-label="Subtotal">${formatCurrency(subtotal)}</td>
                    <td>
                        <i class="bi bi-trash remove-item" data-id="${item.id}"></i>
                    </td>
                `;
                
                cartItemsBody.appendChild(row);
            });
            
            // Adicionar eventos aos botões de quantidade
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const item = cart.find(item => item.id === id);
                    
                    if (this.classList.contains('minus') && item.quantity > 1) {
                        item.quantity -= 1;
                    } else if (this.classList.contains('plus') && item.quantity < 10) {
                        item.quantity += 1;
                    }
                    
                    this.parentNode.querySelector('.quantity-input').value = item.quantity;
                    saveCart();
                    updateCartDisplay();
                });
            });
            
            // Adicionar eventos aos inputs de quantidade
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const id = this.dataset.id;
                    const item = cart.find(item => item.id === id);
                    const value = parseInt(this.value);
                    
                    if (value >= 1 && value <= 10) {
                        item.quantity = value;
                    } else {
                        this.value = item.quantity;
                    }
                    
                    saveCart();
                    updateCartDisplay();
                });
            });
            
            // Adicionar eventos aos botões de remover
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.dataset.id;
                    cart = cart.filter(item => item.id !== id);
                    saveCart();
                    updateCartDisplay();
                });
            });
        }
        
      // Limpar carrinho com modal de confirmação
document.getElementById('clear-cart').addEventListener('click', function(e) {
    e.preventDefault();
    if (cart.length === 0) return;
    
    const clearModal = new bootstrap.Modal(document.getElementById('clearCartModal'));
    clearModal.show();
});

// Confirmar limpeza do carrinho
document.getElementById('confirm-clear-cart').addEventListener('click', function() {
    cart = [];
    saveCart();
    updateCartDisplay();
    
    // Fechar o modal
    const clearModal = bootstrap.Modal.getInstance(document.getElementById('clearCartModal'));
    clearModal.hide();
});
        
        // Finalizar compra
document.getElementById('shipping-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Coletar dados do formulário
    const customerData = {
        name: document.getElementById('customer-name').value,
        address: document.getElementById('customer-address').value,
        city: document.getElementById('customer-city').value,
        zip: document.getElementById('customer-zip').value
    };
    
    // Salvar dados para a página de pagamento
    localStorage.setItem('customerData', JSON.stringify(customerData));
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirecionar para a página de pagamento
    window.location.href = 'Pagamento.html';
});
        
        // Salvar carrinho no localStorage
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
        }
        
        // Atualizar toda a exibição do carrinho
        function updateCartDisplay() {
            renderCartItems();
            updateOrderSummary();
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
    // Inicializar carrinho
function initCart() {
    updateCartCounter();
    renderCartItems();
    updateOrderSummary();
    
    // Inicializar modal (se necessário)
    if (cart.length > 0) {
        document.getElementById('clear-cart').style.display = 'block';
    }
}
        
        // Inicializar
        document.addEventListener('DOMContentLoaded', initCart);


        function saveFormData() {
    const formData = {
        name: document.getElementById('customer-name').value,
        address: document.getElementById('customer-address').value,
        city: document.getElementById('customer-city').value,
        zip: document.getElementById('customer-zip').value
    };
    localStorage.setItem('shippingFormData', JSON.stringify(formData));
}

// Função para carregar os dados do formulário
function loadFormData() {
    const savedData = localStorage.getItem('shippingFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('customer-name').value = formData.name || '';
        document.getElementById('customer-address').value = formData.address || '';
        document.getElementById('customer-city').value = formData.city || '';
        document.getElementById('customer-zip').value = formData.zip || '';
    }
}

// Adicionar event listeners para salvar automaticamente
document.getElementById('customer-name').addEventListener('input', saveFormData);
document.getElementById('customer-address').addEventListener('input', saveFormData);
document.getElementById('customer-city').addEventListener('input', saveFormData);
document.getElementById('customer-zip').addEventListener('input', saveFormData);

// Carregar dados quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    
    // Se houver dados no localStorage, preencher o formulário
    const customerData = JSON.parse(localStorage.getItem('customerData')) || {};
    if (customerData.name) {
        document.getElementById('customer-name').value = customerData.name;
        document.getElementById('customer-address').value = customerData.address;
        document.getElementById('customer-city').value = customerData.city;
        document.getElementById('customer-zip').value = customerData.zip;
        saveFormData(); // Salvar os dados recuperados
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Mostra o loader imediatamente
    loadingOverlay.style.display = 'flex'; // Garante que está visível
    
    // Delay artificial para teste (5 segundos)
    setTimeout(function() {
        loadingOverlay.classList.add('hidden');
        
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 200);
    }, 1000); // 5000ms = 5 segundos
});

const css = `
   /* Cart Actions */
        .cart-actions {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: var(--card-shadow);
        }
        
        .cart-actions .btn {
            padding: 12px 25px;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .cart-actions .btn-outline-secondary {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        
        .cart-actions .btn-outline-secondary:hover {
            background-color: var(--primary-color);
            color: white;
        }
        
        .cart-actions .btn-outline-danger:hover {
            background-color: #e53935;
            color: white;
        }
        
        /* Cart Summary */
        .cart-summary {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: var(--card-shadow);
            position: sticky;
            top: 20px;
        }
        
        .cart-summary h4 {
            color: var(--primary-color);
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--light-bg);
            font-size: 1.5rem;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 18px;
            padding-bottom: 18px;
            border-bottom: 1px dashed #e0e0e0;
        }
        
        .summary-row.total {
            font-weight: bold;
            font-size: 1.2rem;
            border-bottom: none;
            color: var(--primary-color);
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px solid var(--light-bg);
        }
        
        .btn-success {
            background-color: var(--primary-color);
            border: none;
            padding: 15px;
            font-weight: 600;
            transition: all 0.3s ease;
            border-radius: 8px;
            letter-spacing: 0.5px;
            font-size: 1.1rem;
            width: 100%;
            margin-top: 20px;
            box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
        }
        
        .btn-success:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3);
        }
        
        /* Shipping Form */
        .shipping-form {
            margin-top: 20px;
        }
        
        .shipping-form .form-control {
            border-radius: 8px;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            transition: all 0.3s ease;
        }
        
        .shipping-form .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.25rem rgba(46, 125, 50, 0.25);
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
            .cart-header h1 {
                font-size: 2.4rem;
            }
            
            .step {
                margin: 0 15px;
            }
        }
        
        @media (max-width: 768px) {
            .cart-table thead {
                display: none;
            }
            
            .cart-table tr {
                display: block;
                margin-bottom: 20px;
                border-bottom: 2px solid #e0e0e0;
                padding: 15px;
            }
            
            .cart-table td {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 15px;
                border-bottom: none;
            }
            
            .cart-table td::before {
                content: attr(data-label);
                font-weight: bold;
                margin-right: 15px;
                color: var(--primary-color);
            }
            
            .cart-item-img {
                width: 70px;
                height: 70px;
            }
            
            .cart-actions {
                flex-direction: column;
                gap: 15px;
            }
            
            .cart-actions .btn {
                width: 100%;
            }
            
            .step {
                margin: 0 10px;
            }
            
            .step-number {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .step-title {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 576px) {
            .cart-header h1 {
                font-size: 2rem;
            }
            
            .cart-header p {
                font-size: 1rem;
            }
            
            .step {
                margin: 0 5px;
            }
            
            .step-number {
                width: 35px;
                height: 35px;
            }
        }
        
        .footer {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            color: white;
            padding: 40px 0;
            margin-top: 50px;
        }
        
        .footer a {
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .footer a:hover {
            color: #ffeb3b;
            text-decoration: underline;
        }
        
        .social-icons {
            font-size: 1.5rem;
            margin-right: 15px;
        }

        .whatsapp-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: var(--transition);
        }
        
        .whatsapp-btn:hover {
            transform: scale(1.1) translateY(-5px);
            color: white;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }


         @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
         .floating {
            animation: float 3s ease-in-out infinite;
        }

        /* Estilos para o Modal de Confirmação */
#clearCartModal .modal-content {
    border-radius: 12px;
    overflow: hidden;
    border: none;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

#clearCartModal .modal-header {
    background-color: var(--primary-color);
    color: white;
    border-bottom: none;
}

#clearCartModal .modal-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
}

#clearCartModal .modal-body {
    padding: 30px;
}

#clearCartModal .modal-footer {
    border-top: none;
    padding-bottom: 30px;
}

#clearCartModal .btn {
    padding: 10px 25px;
    border-radius: 8px;
    font-weight: 600;
    min-width: 120px;
}

#clearCartModal .btn-danger {
    background-color: #e53935;
    border: none;
}

#clearCartModal .btn-danger:hover {
    background-color: #c62828;
}

.btn-close-custom {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: white;
  transition: transform 0.3s ease, color 0.3s ease;
}

.btn-close-custom:hover {
  transform: rotate(90deg);
  color: white;
}




/* Responsividade do Modal */
@media (max-width: 576px) {
    #clearCartModal .modal-dialog {
        margin: 10px;
    }
    
    #clearCartModal .modal-body {
        padding: 20px;
    }
    
    #clearCartModal .modal-footer {
        padding-bottom: 20px;
    }
    
    #clearCartModal .btn {
        padding: 8px 20px;
        min-width: 100px;
    }
}


.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.342); /* Fundo branco suave */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 2s ease;
}

.loading-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

.loading-logo {
    font-size: 4rem;
    color: #ffffff; /* Cor da flor (ajuste para sua marca) */
    animation: spin 1.5s linear infinite; /* Girar infinitamente */
    display: inline-block; /* Importante para transformações */

}

/* Animação de rotação 360° */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

