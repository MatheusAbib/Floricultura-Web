 // Initialize AOS
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

//js newsletter
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
        
        window.addEventListener('load', function() {
            loadingOverlay.classList.add('hidden');
            
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500); // Tempo combinado com a transição CSS
        });
    });