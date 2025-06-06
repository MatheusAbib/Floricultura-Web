  // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Product data
        const products = [
            {
                id: 1,
                name: "Lírio da Paz",
                price: 25.00,
                oldPrice: 35.00,
                image: "./src/image/Plantas/Lirio.jpg",
                description: "Uma bela e pequena planta para sua casa, acompanhado de um vaso pequeno decorativo.",
                rating: 4.5,
                badge: "new",
                category: "plantas"
            },
            {
                id: 2,
                name: "Asplenio",
                price: 45.00,
                image: "./src/image/Plantas/asplenio.jpg",
                description: "Presenteie a si mesma com essa linda Asplenio para decorar o interior de sua casa, ou o seu jardim.",
                rating: 4,
                badge: "bestseller",
                category: "plantas"
            },
            {
                id: 3,
                name: "Cactos",
                price: 40.00,
                oldPrice: 50.00,
                image: "./src/image/Plantas/Cactus.jpg",
                description: "Com pouca rega, os Cactos são ótimos indicados para você reforçar a decoração interna de sua casa.",
                rating: 5,
                badge: "sale",
                category: "plantas"
            },
            {
                id: 4,
                name: "Bonsai",
                price: 50.00,
                image: "./src/image/Plantas/Bonsai.png",
                description: "O bonsai é uma árvore oriunda de países asiáticos, simboliza prosperidade e sorte à pessoa homenageada.",
                rating: 3.5,
                category: "plantas"
            },
            {
                id: 5,
                name: "Girassol",
                price: 74.99,
                image: "./src/image/Plantas/Girassol.jpg",
                description: "Buquê composto por girassóis em tons vívidos que deixará qualquer pessoa presenteada alegre.",
                rating: 4.5,
                outOfStock: true,
                category: "flores"
            },
            {
                id: 6,
                name: "Bromélia",
                price: 89.50,
                image: "./src/image/Plantas/bromelia.webp",
                description: "Elas dão cor e beleza a qualquer casa ou escritório, graças às suas folhas longas e delgadas.",
                rating: 4,
                category: "plantas"
            },
            {
                id: 7,
                name: "Peperomia",
                price: 35.99,
                image: "./src/image/Plantas/Peperomia.jpg",
                description: "Com rega reculada, e pouca iluminosidade, a peperomia é ótima para se desenvolver em prateleiras altas.",
                rating: 3.5,
                category: "plantas"
            },
            {
                id: 8,
                name: "Orquídea",
                price: 105.00,
                oldPrice: 130.00,
                image: "./src/image/Plantas/Conjunto-Orquideas.jpg",
                description: "Orquídeas são o presente perfeito e sofisticado para uma linda decoração interna de sua casa.",
                rating: 5,
                badge: "bestseller",
                category: "flores"
            },
            {
                id: 9,
                name: "Antúrio",
                price: 65.00,
                image: "./src/image/Plantas/Anturio.jpg",
                description: "Planta tropical com folhas brilhantes e flores em forma de coração, perfeita para interiores.",
                rating: 4,
                category: "flores"
            },
            {
                id: 10,
                name: "Espada de São Jorge",
                price: 38.50,
                image: "./src/image/Plantas/Espada-Sao-Jorge.jpg",
                description: "Planta resistente e de fácil manutenção, ideal para quem busca praticidade e beleza.",
                rating: 4.5,
                category: "plantas"
            },
            {
                id: 11,
                name: "Begônia",
                price: 42.00,
                image: "./src/image/Plantas/Begomia.jpg",
                description: "Flores coloridas e folhagem decorativa, perfeita para trazer vida aos ambientes internos.",
                rating: 4,
                category: "flores"
            },
            {
                id: 12,
                name: "Bamboo",
                price: 70.00,
                oldPrice: 90.00,
                image: "./src/image/Plantas/bamboo.webp",
                description: "Vaso com bamboo perfeito para presentear em ocasiões especiais para pessoas especiais",
                rating: 5,
                badge: "sale",
                category: "plantas"
            },

              {
                id: 13,
                name: "Jiboia",
                price: 42.00,
                image: "./src/image/Plantas/Jiboia.webp",
                description: "Folhagem decorativa, perfeita para trazer vida aos ambientes com baixa luminosidade.",
                rating: 3.5,
                category: "plantas"
            },

             {
                id: 14,
                name: "Lavanda",
                price: 92.00,
                image: "./src/image/Plantas/Lavanda.jpg",
                description: "Aromática e charmosa, ideal para perfumar e embelezar ambientes internos ou externos.",
                rating: 4,
                badge: "bestseller",
                category: "plantas"
            },
            {
                id: 15,
                name: "Zamioculca",
                price: 162.00,
                image: "./src/image/Plantas/Zamioculca.jpg",
                description: "Folhagem resistente, perfeita para ambientes internos com pouca luz e baixa manutenção.",
                rating: 5,
                category: "plantas"
            },

             {
                id: 16,
                name: "Costela de Adão",
                price: 190.00,
                image: "./src/image/Plantas/Costela-Adao.jpg",
                description: "Elegante e tropical, ideal para dar um toque moderno e exuberante à decoração de sua residência.",
                rating: 4,
                category: "plantas"
            },
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
    renderProducts(invernoProducts, 'inverno-grid'); // produtos de inverno no 'inverno-grid'

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


  
 const invernoProducts = [
    {
        id: 'i01',
        name: 'Azaleia',
        description: 'Flores vibrantes que iluminam seu jardim mesmo nos dias mais frios.',
        price: 129.90,
        oldPrice: 169.90,
        image: './src/image/Plantas/Azaleia.jpg',
        rating: 4,
        category: 'inverno',
        badge: 'sale',
        outOfStock: false
    },
    {
        id: 'i02',
        name: 'Buxinho',
        description: 'Folhagem densa e elegante que mantém seu espaço verde no inverno.',
        price: 29.90,
        image: './src/image/Plantas/Buxinho.jpg',
        rating: 5,
        category: 'inverno',
        badge: 'new',
        outOfStock: false
    },
    {
        id: 'i03',
        name: 'Violeta',
        description: 'Pequenas flores delicadas que trazem cor e charme aos dias frios.',
        price: 15.90,
        oldPrice: 29.90,
        image: './src/image/Plantas/Violeta.jpg',
        rating: 4,
        category: 'inverno',
        badge: 'bestseller',
        outOfStock: true
    },

       {
        id: 'i04',
        name: 'Babosa',
        description: 'Folha suculenta e resistente que traz frescor e cuidados naturais para o inverno.',
        price: 13.50,
        oldPrice: 39.50,
        image: './src/image/Plantas/Babosa.jpg',
        rating: 3.5,
        category: 'inverno',
        badge: 'new',
        outOfStock: false
    }
    
];

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

    // Mostra o loader quando a página começa a carregar
    document.addEventListener('DOMContentLoaded', function() {
        const loadingOverlay = document.getElementById('loading-overlay');
        
        // Esconde o loader quando a página estiver totalmente carregada
        window.addEventListener('load', function() {
            loadingOverlay.classList.add('hidden');
            
            // Remove completamente o loader após a animação
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300); // Tempo igual ao da transição CSS (0.3s)
        });
    });
