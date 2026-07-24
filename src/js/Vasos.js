        // Inicializar AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Product data
         const products = [
            {
                id: 10111,
                name: "Vaso de vidro",
                price: 160.00,
                oldPrice: 180.99,
                image: "./src/image/Vasos/Vaso01.jpg",
                description: "Vaso de vidro azul elegante ornamental, ideal para ambientes internos que pedem um toque moderno e sofisticado.",
                rating: 4.5,
                category: "plantas"
            },
            {
                id: 10222,
                name: "Vaso de cerâmica",
                price: 175.00,
                image: "./src/image/Vasos/Vaso02.jpg",
                description: "Vaso de cerâmica vermelho rústico, perfeito para trazer vida e naturalidade à decoração do seu lar.",
                rating: 3.5,
                category: "plantas"
            },
            {
                id: 10333,
                name: "Vaso de barro",
                price: 65.00,
                oldPrice: 80.00,
                image: "./src/image/Vasos/Vaso03.jpg",
                description: "Vaso de barro tradicional com pintura feita à mão, uma escolha prática para quem deseja beleza e facilidade na manutenção.",
                rating: 4,
                category: "plantas"
            },
            {
                id: 10444,
                name: "Vaso simples",
                price: 12.00,
                image: "./src/image/Vasos/Vaso04.jpg",
                description: "Vaso simples preto, perfeito como presente simbólico ou para atrair bons fluídos ao seu ambiente.",
                rating: 5,
                category: "plantas"
            }

        ];
        
        
        // Cart functionality
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Format currency
        function formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            }).format(value);
        }
        
        // Render stars based on rating
        function renderRating(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="bi bi-star-fill"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="bi bi-star-half"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="bi bi-star"></i>';
            }
            
            return stars;
        }
        
        // Render product cards
        function renderProducts(productsToRender, containerId = 'product-grid') {
            const productGrid = document.getElementById(containerId);
            if (!productGrid) return;

            productGrid.innerHTML = '';

            if (!productsToRender || productsToRender.length === 0) {
                productGrid.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="bi bi-emoji-frown display-4 text-muted mb-3"></i>
                        <h3>Nenhum produto encontrado</h3>
                        <p>Não encontramos produtos correspondentes à sua busca.</p>
                    </div>
                `;
                return;
            }

            productsToRender.forEach((product, index) => {
                const productCol = document.createElement('div');
                productCol.className = 'col-md-6 col-lg-4 col-xl-3';

                const badgeHTML = {
                    new: '<span class="product-badge badge-new">Novo</span>',
                    bestseller: '<span class="product-badge badge-bestseller">Mais Vendido</span>',
                    sale: '<span class="product-badge badge-sale">Promoção</span>'
                };

                productCol.innerHTML = `
                    <div class="product-card">
                        <div class="product-img-container">
                            <img src="${product.image}" class="product-img" alt="${product.name}" loading="lazy">
                            ${badgeHTML[product.badge] || ''}
                        </div>
                        <div class="product-body">
                            <h3 class="product-title">${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="product-rating mb-3">
                                ${renderRating(product.rating)}
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                ${product.oldPrice ? `<span class="product-old-price">${formatCurrency(product.oldPrice)}</span>` : '<span></span>'}
                                <div class="product-price">${formatCurrency(product.price)}</div>
                            </div>
                            ${
                                product.outOfStock
                                    ? `<button class="add-to-cart-btn btn-secondary" disabled>
                                        <i class="bi bi-exclamation-triangle me-2"></i>Esgotado
                                    </button>`
                                    : `<button class="add-to-cart-btn" 
                                        data-id="${product.id}" 
                                        data-name="${product.name}" 
                                        data-price="${product.price}" 
                                        data-image="${product.image}">
                                        <i class="bi bi-cart-plus me-2"></i>Adicionar
                                    </button>`
                            }
                        </div>
                    </div>
                `;

                productGrid.appendChild(productCol);

                // Animação suave após inserção
                setTimeout(() => {
                    const card = productCol.querySelector('.product-card');
                    if (card) {
                        card.classList.add('show');
                    }
                }, 100 + (index * 50));
            });

            // Reativa os botões de carrinho
            addCartEventListeners();
        }
        
        // Adicionar event listeners para os botões do carrinho
        function addCartEventListeners() {
            document.querySelectorAll('.add-to-cart-btn:not(:disabled)').forEach(button => {
                button.removeEventListener('click', handleAddClick);
                button.addEventListener('click', handleAddClick);
            });
        }
        
        // Manipular clique no botão adicionar ao carrinho
        function handleAddClick() {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;

            // Verificar se o item já está no carrinho
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }

            // Salvar no localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Atualizar contador (função do componentLoader.js)
            if (typeof updateCartCounter === 'function') {
                updateCartCounter();
            }

            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check2 me-2"></i>Adicionado';
            this.classList.add('btn-success');

            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
            }, 2000);
        }
        
        // Sort products
        function sortProducts(sortType) {
            let sortedProducts = [...products];

            switch (sortType) {
                case 'price-asc':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            }

            renderProducts(sortedProducts, 'product-grid');
        }
        
        // Search functionality
        function searchProducts(query) {
            const normalizedQuery = query.toLowerCase().trim();

            if (normalizedQuery === '') {
                renderProducts(products, 'product-grid');
                return;
            }

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(normalizedQuery) ||
                product.description.toLowerCase().includes(normalizedQuery) ||
                product.category.toLowerCase().includes(normalizedQuery)
            );

            renderProducts(filteredProducts, 'product-grid');

            if (filteredProducts.length === 0) {
                const productGrid = document.getElementById('product-grid');
                productGrid.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="bi bi-search display-4 text-muted mb-3"></i>
                        <h3>Nenhum produto encontrado</h3>
                        <p>Não encontramos produtos correspondentes à sua busca. Tente outro termo.</p>
                    </div>
                `;
            }
        }

function initializeSearchWithClear() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchButton = document.getElementById('clearSearchButton');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput || !clearSearchButton || !searchButton) {
        console.log('Elementos de busca não encontrados');
        return;
    }
    
    console.log('Inicializando busca com botão X...');
    
    // Mostrar/ocultar botão de limpar
    searchInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            console.log('Mostrando botão X');
            clearSearchButton.classList.remove('d-none');
        } else {
            console.log('Escondendo botão X');
            clearSearchButton.classList.add('d-none');
        }
    });
    
    // Limpar busca COMPLETAMENTE
    clearSearchButton.addEventListener('click', function() {
        console.log('Botão X clicado');
        searchInput.value = '';
        clearSearchButton.classList.add('d-none');
        searchInput.focus();
        
        // Resetar produtos ao estado original
        renderProducts(products, 'product-grid');
    });
    
    // Evento de busca ao clicar no botão de pesquisa
    searchButton.addEventListener('click', function() {
        searchProducts(searchInput.value);
    });
    
    // Evento de busca ao pressionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts(this.value);
        }
    });
    
    // Busca em tempo real (opcional - com debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (this.value.trim().length >= 2) {
                searchProducts(this.value);
            } else if (this.value.trim() === '') {
                renderProducts(products, 'product-grid');
            }
        }, 300);
    });
}

        
        // Update carousel zoom effect
        function updateCarouselZoom() {
            const carouselItems = document.querySelectorAll('.hero-carousel .carousel-item');
            carouselItems.forEach(item => {
                const img = item.querySelector('img');
                if (img) {
                    if (item.classList.contains('active')) {
                        img.style.transform = 'scale(1.1)';
                    } else {
                        img.style.transform = 'scale(1)';
                    }
                }
            });
        }
        
        // Copiar cupom
        function setupCouponCopy() {
            document.querySelectorAll('.copy-coupon').forEach(button => {
                button.addEventListener('click', function() {
                    const code = this.dataset.code;
                    navigator.clipboard.writeText(code).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="bi bi-check2 me-2"></i>Código Copiado!';
                        this.classList.add('btn-success');
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.classList.remove('btn-success');
                        }, 2000);
                    });
                });
            });
        }
        
        // Ajustar altura do carrossel hero
        function adjustHeroHeight() {
            const heroCarousel = document.querySelector('.hero-carousel');
            if (window.innerWidth <= 768) {
                heroCarousel.style.height = `${window.innerHeight * 0.6}px`;
            } else {
                heroCarousel.style.height = '94vh';
            }
        }
        
        // Newsletter form
        function setupNewsletterForm() {
            const newsletterForm = document.getElementById('newsletterForm');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const emailInput = this.querySelector('input[name="email"]');
                    const emailError = document.getElementById('emailError');
                    const email = emailInput.value.trim();
                    
                    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                    
                    if (!emailValido) {
                        emailError.style.display = 'block';
                        emailInput.style.borderColor = 'red';
                        return;
                    } else {
                        emailError.style.display = 'none';
                        emailInput.style.borderColor = '';
                    }
                    
                    // Simular envio
                    document.getElementById('successModal').style.display = 'flex';
                    this.reset();
                });
            }
        }
        
        // Fechar modal
        function closeContactModal() {
            document.getElementById('successModal').style.display = 'none';
        }
        
        // Inicializar
      // Inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar produtos
    renderProducts(products);
    
    // Setup event listeners para ordenação
    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const sortType = this.getAttribute('data-sort');
            sortProducts(sortType);
        });
    });
    
    // Inicializar busca com botão X (ADICIONE ESTA LINHA)
    initializeSearchWithClear();
    
    // Carousel zoom
    updateCarouselZoom();
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', updateCarouselZoom);
    }
    
    // Cupons
    setupCouponCopy();
    
    // Ajustar altura hero
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
    
    // Newsletter
    setupNewsletterForm();
    
    // Salvar página atual
    if (!window.location.pathname.includes('carrinho.html')) {
        localStorage.setItem('lastVisitedPage', window.location.href);
    }
    
    // Adicionar estilos CSS para o highlight (ADICIONE ESTE BLOCO)
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: #ffd54f;
            padding: 0 2px;
            border-radius: 2px;
            font-weight: bold;
            color: #333;
        }
        
        .no-results-message {
            padding: 3rem 1rem;
            background: rgba(248, 249, 250, 0.7);
            border-radius: 15px;
            border: 2px dashed #dee2e6;
        }
    `;
    document.head.appendChild(style);
});