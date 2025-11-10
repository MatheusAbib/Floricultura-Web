   // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Product data
        const products = [
            {
                id: 101,
                name: "Vinho",
                price: 80.00,
                oldPrice: 65.00,
                image: "./src/image/Presentes/Vinho.webp",
                description: "Um presente sofisticado para momentos especiais, perfeito para celebrações ou jantares românticos.",
                rating: 4.5,
                badge: "new",
                category: "plantas"
            },
            {
                id: 102,
                name: "Ursinho de pelúcia",
                price: 30.00,
                image: "./src/image/Presentes/Ursinho.webp",
                description: "Fofo e aconchegante, este ursinho é a escolha ideal para demonstrar carinho e afeto.",
                rating: 4,
                badge: "bestseller",
                outOfStock: true,

                category: "plantas"
            },
            {
                id: 103,
                name: "Chandon",
                price: 93.99,
                oldPrice: 110.00,
                image: "./src/image/Presentes/chandon.webp",
                description: "Refinado e elegante, perfeito para brindar conquistas, aniversários e ocasiões inesquecíveis.",
                rating: 4,
                badge: "sale",
                category: "plantas"
            },
            {
                id: 104,
                name: "Caixa de doces",
                price: 130.00,
                image: "./src/image/Presentes/Caixa-de-Presentes.webp",
                description: "Uma seleção deliciosa de doces finos, ideal para surpreender alguém com um toque de sabor e carinho.",
                rating: 3.5,
                category: "plantas"
            },
            {
                id: 105,
                name: "Aperitivos",
                price: 49.99,
                image: "./src/image/Presentes/Aperitivos.webp",
                description: "Combinação irresistível de petiscos variados e cervejas para acompanhar bons momentos com amigos ou família.",
                rating: 4.5,
                outOfStock: false,
                category: "flores"
            },
            {
                id: 106,
                name: "Chocolates",
                price: 35.50,
                image: "./src/image/Presentes/chocolate.webp",
                description: "Clássico presente que agrada a todos, ideal para expressar afeto em qualquer ocasião.",
                rating: 4,
                category: "plantas"
            },
            {
                id: 107,
                name: "Caixa de Nutella",
                price: 105.00,
                image: "./src/image/Presentes/nutella.webp",
                description: "Kit especial para os amantes de Nutella — cremoso, saboroso e perfeito para surpreender com doçura.",
                rating: 3.5,
                category: "plantas"
            },
            {
                id: 108,
                name: "Girassois",
                price: 155.00,
                oldPrice: 170.00,
                image: "./src/image/Presentes/Buque-Girassol.jpg",
                description: "Um buquê radiante de girassóis para transmitir alegria, positividade e boas energias.",
                rating: 5,
                badge: "bestseller",
                category: "flores"
            },
            {
                id: 109,
                name: "Rosas",
                price: 175.00,
                image: "./src/image/Presentes/Buque-rosas.jpg",
                description: "Clássicas e atemporais, buquê de rosas são a expressão perfeita do amor e da elegância.",
                rating: 4,
                category: "flores"
            },
            {
                id: 110,
                name: "Ferrero Rocher",
                price: 48.50,
                image: "./src/image/Presentes/Ferrero.jpg",
                description: "Bombons finos com sabor inconfundível, perfeitos para presentear com classe e doçura.",
                rating: 4.5,
                category: "plantas"
            },
            {
                id: 11,
                name: "Placas decorativas",
                price: 40.00,
                image: "./src/image/Presentes/Placa-decorativa.webp",
                description: "Adicione charme ao ambiente com placas decorativas criativas, ideais para presente criativo e moderno.",
                rating: 4,
                outOfStock: true,
                category: "flores"
            },
            {
                id: 112,
                name: "Ursinho duplo",
                price: 70.00,
                oldPrice: 85.00,
                image: "./src/image/Presentes/Ursinhos.jpg",
                description: "Dois adoráveis ursinhos de pelúcia para dobrar o carinho em momentos especiais.",
                rating: 5,
                badge: "sale",
                category: "plantas"
            }


        ];
        
        // Cart functionality
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
      
        // Update cart counter
        function updateCartCounter() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.cart-counter').textContent = totalItems;
        }
        
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

        // animação suave após inserção
        setTimeout(() => {
            const card = productCol.querySelector('.product-card');
            if (card) {
                card.classList.add('show');
            }
        }, 100 + (index * 50));
    });

    // reativa os botões de carrinho
    addCartEventListeners();
}



       function addCartEventListeners() {
    document.querySelectorAll('.add-to-cart-btn:not(:disabled)').forEach(button => {
        // Remove o event listener anterior antes de adicionar um novo
        button.removeEventListener('click', handleAddClick);
        button.addEventListener('click', handleAddClick);
    });
}

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

    // Atualizar contador
    updateCartCounter();

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

    renderProducts(sortedProducts, 'product-grid'); // Corrigido
}


        
        let filteredProducts = [...products]; // variável global opcional

        // Search functionality
        function searchProducts(query) {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
        renderProducts(products, 'product-grid'); // Corrigido
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
    );

    renderProducts(filteredProducts, 'product-grid'); // Corrigido

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

        
        // Scroll to top functionality
 function setupScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;  // se não existir, sai da função sem erro

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

        
        // Initialize
document.addEventListener('DOMContentLoaded', function () {
    renderProducts(products); // produtos normais no 'product-grid'

    updateCartCounter();
    setupScrollToTop();


            
            // Sort event listeners
         document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', function (e) {
        e.preventDefault();
        const sortType = this.getAttribute('data-sort');
        sortProducts(sortType);
    });
});

            
            // Search event listeners
            document.getElementById('searchButton').addEventListener('click', function() {
                const query = document.getElementById('searchInput').value;
                searchProducts(query);
            });
            
            document.getElementById('searchInput').addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    searchProducts(this.value);
                }
            });
            
            // Navbar scroll effect
        window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return; // não faz nada se não encontrou o navbar

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
            
            // Setup scroll to top button
            setupScrollToTop();
            
            // Hero carousel image zoom effect
  const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    carousel.addEventListener('slid.bs.carousel', () => {
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
    });
}

// Também rodar logo após o carregamento pra aplicar no inicial:
document.addEventListener('DOMContentLoaded', () => {
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
});


        });

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

document.addEventListener('DOMContentLoaded', () => {
  updateCarouselZoom();

  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', () => {
      updateCarouselZoom();
    });
  }
});


        // Copiar cupom
document.querySelectorAll('.copy-coupon').forEach(button => {
    button.addEventListener('click', function() {
        const code = this.dataset.code;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check2 me-2"></i>Código Copiado!';
            this.classList.add('coupon-copied');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('coupon-copied');
            }, 2000);
        });
    });
});


  
 

// Utilitários
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Ajustar altura do carrossel hero em dispositivos móveis
function adjustHeroHeight() {
    const heroCarousel = document.querySelector('.hero-carousel');
    if (window.innerWidth <= 768) {
        heroCarousel.style.height = `${window.innerHeight * 0.6}px`;
    } else {
        heroCarousel.style.height = '94vh';
    }
}

// Reorganizar elementos em telas pequenas
function handleResponsiveElements() {
    const screenWidth = window.innerWidth;
    const productCards = document.querySelectorAll('.product-card');
    
    // Ajustar tamanho das imagens de produto
    productCards.forEach(card => {
        const imgContainer = card.querySelector('.product-img-container');
        if (screenWidth <= 576) {
            imgContainer.style.height = '180px';
        } else {
            imgContainer.style.height = '280px';
        }
    });
}

// Event listeners para redimensionamento
window.addEventListener('resize', () => {
    adjustHeroHeight();
    handleResponsiveElements();
});

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', () => {
    adjustHeroHeight();
    handleResponsiveElements();
});

document.getElementById('newsletterForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const emailInput = form.querySelector('input[name="email"]');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = 'red'; // Apenas muda a borda
        return;
    } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = '';
    }

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        const text = await response.text();

        if (response.ok && text.includes("obrigado")) {
            document.getElementById('successModal').style.display = 'flex';
            form.reset();
        } else {
            alert("Erro no envio. Verifique o e-mail ou tente novamente.");
        }
    } catch (err) {
        alert("Erro ao enviar o formulário.");
        console.error(err);
    }
});
function closeContactModal() {
  document.getElementById('successModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Não armazene a página atual se for a página do carrinho
    if (!window.location.pathname.includes('carrinho.html')) { // substitua pelo nome da sua página de carrinho
        localStorage.setItem('lastVisitedPage', window.location.href);
    }
});

// Função para voltar à última página
function goBack() {
    const previous = localStorage.getItem('lastVisitedPage');
    if (previous && previous !== window.location.href) {
        window.location.href = previous;
    } else {
        window.location.href = 'index.html'; // fallback padrão
    }
}

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
    }, 2000); // 5000ms = 5 segundos
});

const css = `
   /* Features Section */
        .features-section {
            padding: 100px 0;
            background-color: var(--light-bg);
            position: relative;
            overflow: hidden;
        }
        
        .feature-box {
            text-align: center;
            padding: 40px 20px;
            border-radius: 15px;
            background: white;
            box-shadow: var(--card-shadow);
            transition: var(--transition);
            height: 100%;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .feature-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to right, var(--primary-color), var(--primary-light));
            transition: var(--transition);
            z-index: -1;
        }
        
        .feature-box:hover {
            transform: translateY(-10px);
            box-shadow: var(--card-hover-shadow);
        }
        
        .feature-box:hover::before {
            height: 100%;
        }
        
        .feature-box:hover .feature-icon,
        .feature-box:hover .feature-title,
        .feature-box:hover p {
            color: white;
        }
        
        .feature-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            transition: var(--transition);
        }
        
        .feature-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--primary-dark);
            transition: var(--transition);
        }
        
        /* Promo Banner */
    .promo-banner {
        position: relative;
        overflow: hidden;
        margin: 30px 0;
    }

    .promo-image {
        width: 100%;
        height: auto;
        min-height: 200px;
        object-fit: cover;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

        .promo-banner::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
            transform: rotate(30deg);
            animation: shine 3s infinite;
        }
        
        @keyframes shine {
            0% { transform: rotate(30deg) translate(-30%, -30%); }
            100% { transform: rotate(30deg) translate(30%, 30%); }
        }
        
        
        
        /* Categories Section */
        .categories-section {
            padding: 100px 0;
            background: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
        }
        
        .category-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: var(--card-shadow);
            transition: var(--transition);
            margin-bottom: 25px;
            background: white;
            text-align: center;
            padding: 30px 20px;
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .category-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0;
            background: linear-gradient(to bottom, var(--primary-color), var(--primary-light));
            transition: var(--transition);
            z-index: 0;
        }
        
        .category-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--card-hover-shadow);
        }
        
        .category-card:hover::before {
            height: 100%;
        }
        
        .category-card:hover .category-icon,
        .category-card:hover .category-title {
            color: white;
        }
        
        .category-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            transition: var(--transition);
            position: relative;
            z-index: 1;
        }
        
        .category-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary-dark);
            margin-bottom: 10px;
            transition: var(--transition);
            position: relative;
            z-index: 1;
        }
        
        /* Testimonials */
        .testimonials-section {
            padding: 100px 0;
            background-color: var(--light-bg);
            position: relative;
        }
        
        .testimonial-card {
            border: none;
            border-radius: 15px;
            box-shadow: var(--card-shadow);
            padding: 30px;
            height: 100%;
            transition: var(--transition);
            background: white;
        }
        
        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--card-hover-shadow);
        }
        
        .testimonial-text {
            font-style: italic;
            margin-bottom: 20px;
            position: relative;
        }
        
        .testimonial-text::before {
            content: '"';
            font-size: 4rem;
            position: absolute;
            top: -20px;
            left: -15px;
            color: rgba(46, 125, 50, 0.1);
            font-family: Georgia, serif;
            line-height: 1;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
        }
        
        .author-img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 15px;
            border: 3px solid var(--primary-light);
        }
        
        .author-name {
            font-weight: 700;
            margin-bottom: 0;
        }
        
        .author-location {
            color: var(--gray-text);
            font-size: 0.9rem;
        }
        
        /* Newsletter */
        .newsletter-section {
            padding: 100px 0;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .newsletter-container {
            position: relative;
            z-index: 2;
        }
        
        .newsletter-card {
            background: white;
            border-radius: 15px;
            padding: 50px;
            box-shadow: var(--card-hover-shadow);
            color: var(--dark-text);
            position: relative;
            overflow: hidden;
        }
        
        .newsletter-title {
            font-family: 'Dancing Script', cursive;
            font-size: 2.8rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .newsletter-text {
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .newsletter-form .form-control {
            border-radius: 30px;
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            transition: var(--transition);
        }
        
        .newsletter-form .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.25rem rgba(46, 125, 50, 0.25);
        }
        
        .newsletter-btn {
            border-radius: 30px;
            padding: 15px 30px;
            background-color: var(--secondary-color);
            border: none;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .newsletter-btn:hover {
            background-color: var(--secondary-dark);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(230, 81, 0, 0.3);
        }
        
        .newsletter-flower {
            position: absolute;
            font-size: 8rem;
            opacity: 0.1;
            z-index: 1;
            animation: float 6s ease-in-out infinite;
        }
        
        .newsletter-flower-1 {
            top: 20px;
            left: 20px;
        }
        
        .newsletter-flower-2 {
            bottom: 20px;
            right: 20px;
            animation-delay: 2s;
        }
        
        /* Footer */
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
        
        
   
        
        /* Floating animation */
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        /* WhatsApp Button */
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

        
        /* Section Titles */
        .section-title {
            position: relative;
            display: inline-block;
            margin-bottom: 50px;
            color: var(--primary-dark);
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(to right, var(--primary-color), var(--primary-light));
            border-radius: 2px;
        }
        
        /* Parallax Effect */
        .parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        
        /* Scroll to Top Button */
        .scroll-top {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: rgba(255, 255, 255, 0.8);
            color: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
            cursor: pointer;
        }
        
        .scroll-top.active {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top:hover {
            background-color: var(--primary-color);
            color: white;
            transform: translateY(-5px);
        }

        @media (max-width: 500px) {
            .carousel-control-prev,
            .carousel-control-next {
                display: none;
            }
        }

          @media (max-width: 1400px) {
            .hero-title {
                font-size: 3.5rem;
            }
             .hero-carousel {
                height: 85vh;
            }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
                .hero-title {
                font-size: 3.2rem;
            }
               .product-card {
                min-height: 420px;
            }
                .product-img-container {
                height: 220px;
            }
              .hero-carousel {
                height: 80vh;
            }
        }
        @media (max-width: 992px) {
            .hero-title {
                font-size: 2.8rem;
            }
            
            .hero-subtitle {
                font-size: 1.4rem;
            }
            
            .hero-carousel {
                height: 75vh;
                min-height: 500px;
            }
            
            .floating-element {
                display: none;
            }
            .navbar-brand {
                font-size: 1.8rem;
            }
            .hero-title {
                font-size: 2.8rem;
            }
            .hero-subtitle {
                font-size: 1.2rem;
                max-width: 80%;
            }
            .product-card {
                min-height: 380px;
            }
            .product-img-container {
                height: 220px;
            }
              .hero-content {
                left: 5%;
                right: 5%;
            }
              .promo-banner {
                margin: 15px 0;
            }
            .promo-image {
                min-height: 180px;
            }

            .feature-box {
                padding: 30px 15px;
            }
            .feature-icon {
                font-size: 2rem;
                margin-bottom: 15px;
            }
            .feature-title {
                font-size: 1.1rem;
                margin-bottom: 10px;
            }

            .coupon-card {
                margin-bottom: 20px;
            }
            .coupon-header {
                padding: 15px;
            }
            .coupon-percent {
                font-size: 2rem;
            }
            .coupon-code {
                padding: 4px 12px;
                font-size: 1rem;
            }
            .coupon-body {
                padding: 20px;
            }
            .coupon-body h4 {
                font-size: 1.1rem;
                margin-bottom: 10px;
            }
                }
        
        @media (max-width: 768px) {
            .product-card {
            min-height: auto;
            }
            .product-img-container {
                height: 200px;
            }
            .product-body {
                padding: 15px;
            }
            .hero-title {
                font-size: 2.4rem;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
                max-width: 90%;
            }
            
            .hero-carousel {
                height: 65vh;
                min-height: 450px;
            }
            
            #product-grid {
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            }
            
            .hero-content {
                left: 5%;
                right: 5%;
                text-align: center;
            }
            
             .promo-banner {
                margin: 10px 0;
            }
                .promo-image {
                min-height: 150px;
            }
            .promo-title {
                font-size: 2.2rem;
            }
            
            .discount-badge {
                width: 80px;
                height: 80px;
                font-size: 1.5rem;
            }
            
            .newsletter-card {
                padding: 30px;
            }
            
            .newsletter-title {
                font-size: 2.2rem;
            }

            input, select, textarea {
            font-size: 16px;
            }
            
            .hero-btn {
                padding: 8px 20px;
            }
            .features-section, 
            .categories-section, 
            .testimonials-section, 
            .newsletter-section {
                padding: 60px 0;
            }
            .footer .col-lg-4 {
                margin-bottom: 30px;
            }
            .carousel-control-prev,
            .carousel-control-next {
                display: none !important;
            }
            .feature-box {
                padding: 25px 10px;
                margin-bottom: 15px;
            }
            .feature-icon {
                font-size: 1.8rem;
            }
            .coupons-section .row {
                margin-left: -5px;
                margin-right: -5px;
            }
            .coupons-section .col-md-4 {
                padding-left: 5px;
                padding-right: 5px;
            }
            .coupon-header {
                padding: 12px;
            }
            .coupon-percent {
                font-size: 1.8rem;
            }
            .coupon-body {
                padding: 15px;
            }
            .copy-coupon {
                padding: 10px;
                font-size: 0.9rem;
            }
            }


        
        @media (max-width: 576px) {
            .hero-title {
                font-size: 2rem;
            }
             .hero-subtitle {
                font-size: 1rem;
            }

            body {
                font-size: 15px;
                line-height: 1.5;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            h2 {
                font-size: 1.8rem;
            }
            
            .hero-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
           }

            
           .hero-subtitle {
                font-size: 1rem;
                max-width: 90%;
            }
            
            .hero-carousel {
                height: 55vh;
                min-height: 400px;
            }
            
            .promo-banner {
                text-align: center;
            }
            
            .promo-title {
                font-size: 1.8rem;
            }
            
            .discount-badge {
                width: 60px;
                height: 60px;
                font-size: 1.2rem;
                top: -10px;
                right: -10px;
            }
            
            .newsletter-card {
                padding: 20px;
            }
            
            .newsletter-title {
                font-size: 1.8rem;
            }

            .newsletter-btn{
                padding: 3%;
                font-size: 90%;
            }
            .newsletter-text{
                font-size: 90%;
            }
            
            .navbar-brand {
                font-size: 1.5rem;
            }
            .navbar .input-group {
                max-width: 180px;
            }

            .product-card {
                min-width: auto;
                min-height: auto;
            }
            .product-img-container {
                height: 180px;
            }
            .section-title {
                font-size: 1.8rem;
                margin-bottom: 30px;
            }

            .coupon-card {
                margin-bottom: 20px;
            }
            .product-title {
                font-size: 1.1rem;
            }
            .product-price {
                font-size: 1.1rem;
            }
           .promo-image {
                min-height: 130px;
                margin-left: -100px; 
                min-width: 500px;               
            }
            .features-section .row {
                margin-left: -5px;
                margin-right: -5px;
            }
            .features-section .col-md-4 {
                padding-left: 5px;
                padding-right: 5px;
            }
            .feature-box {
                padding: 20px 8px;
            }
            .feature-icon {
                font-size: 1.5rem;
            }
            .feature-title {
                font-size: 1rem;
            }
            .feature-box p {
                font-size: 0.85rem;
            }
            .coupon-card {
                border-width: 1px dashed;
            }
            .coupon-header {
                padding: 100px;
            }
            .coupon-percent {
                font-size: 1.6rem;
            }
            .coupon-code {
                font-size: 0.9rem;
                padding: 3px 10px;
            }
            .coupon-body h4 {
                font-size: 1rem;
            }
            .coupon-body p {
                font-size: 0.85rem;
                margin-bottom: 15px;
            }
            .copy-coupon {
                padding: 6px;
                font-size: 0.8rem;
                
            }
            }

            .hero-carousel .carousel-inner,
            .hero-carousel .carousel-item,
            .hero-carousel .carousel-item img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: center;
            }

        @media (max-width: 400px) {
        .hero-carousel {
            height: 50vh;
            min-height: 350px;
        }
        .hero-title {
            font-size: 1.8rem;
        }
        .navbar-brand {
            font-size: 1.5rem;
        }
        .dropdown-container {
            width: 100%;
            margin-top: 10px;
        }
        #sortDropdown {
            width: 100%;
        }
        .product-grid {
            grid-template-columns: 1fr;
        }
         .product-img-container {
        height: 160px;
        }
        .promo-image {
            min-height: 100px;
        }
            .feature-box {
        padding: 15px 5px;
    }
    .feature-icon {
        font-size: 1.3rem;
        margin-bottom: 10px;
    }
    .coupon-header {
        flex-direction: column;
        text-align: center;
    }
    .coupon-percent {
        margin-bottom: 5px;
    }
    .coupon-code {
        margin-top: 5px;
    }
        }

        @media (max-width: 360px) {
        .hero-title {
            font-size: 1.8rem;
        }
        .product-img-container {
            height: 140px;
        }
         }

        

        /* Splide Carousel Customization */
        .splide__arrow {
            background: rgba(255, 255, 255, 0.8);
            opacity: 1;
            width: 40px;
            height: 40px;
        }
        
        .splide__arrow svg {
            fill: var(--primary-color);
        }
        
        .splide__arrow:hover {
            background: white;
        }
        
        .splide__pagination__page {
            background: rgba(255, 255, 255, 0.5);
            width: 10px;
            height: 10px;
        }
        
        .splide__pagination__page.is-active {
            background: white;
            transform: scale(1.2);
        }

        /* Cupons Section */
.coupons-section {
    background-color: var(--light-bg);
    position: relative;
    overflow: hidden;
}

.coupon-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    position: relative;
    transition: all 0.3s ease;
    border: 2px dashed var(--primary-color);
    height: 100%;
}

.coupon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.coupon-header {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.coupon-percent {
    font-size: 1.8rem;
    font-weight: bold;
    font-family: 'Playfair Display', serif;
}

.coupon-code {
    background: white;
    color: var(--primary-dark);
    padding: 4px 12px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 0.9rem;
}

.coupon-body {
    padding: 20px;
    text-align: center;
    position: relative;
}

.coupon-body h4 {
    color: var(--primary-dark);
    margin-bottom: 15px;
}

.coupon-body p {
    color: var(--gray-text);
    margin-bottom: 20px;
}

.copy-coupon {
    width: 80%;
    border-radius: 30px;
    padding: 12px;
    font-weight: 600;
    font-size: 85%;
    transition: all 0.3s ease;
}

.copy-coupon:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
}

.coupon-corner {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 1.7rem;
    opacity: 0.7;
}


/* Animação para quando o cupom é copiado */
@keyframes couponCopied {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.coupon-copied {
    animation: couponCopied 0.5s ease;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-box {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: var(--card-shadow);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  color: var(--dark-text);
}

.modal-close-x {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.modal-close-x:hover {
  transform: rotate(90deg);
}


.form-check-input:checked {
  background-color: #ff8f00; /* laranja */
  border-color: #ff8f00; /* borda laranja */
  box-shadow: none;
}

.form-check-input {
  accent-color: #ff8f00; /* a forma mais simples e moderna */
}

 #emailError {
    font-size: 0.85rem;
    display: none;
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
