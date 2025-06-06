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
