// Função para carregar componentes HTML
function loadComponent(elementId, filePath) {
    // Adiciona timeout para evitar problemas de carregamento
    const timeoutDuration = 5000; // 5 segundos
    
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout ao carregar componente')), timeoutDuration);
    });
    
    const fetchPromise = fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        });
    
    Promise.race([fetchPromise, timeoutPromise])
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // Atualizar contador do carrinho após carregar o navbar
            if (elementId === 'navbar-container') {
                updateCartCounter();
            }
        })
        .catch(error => {
            console.error(`Erro ao carregar ${filePath}:`, error);
            
            // Fallback: carregar componentes de forma alternativa
            loadComponentFallback(elementId);
        });
}

// Fallback para quando o fetch falhar
function loadComponentFallback(elementId) {
    if (elementId === 'navbar-container') {
        document.getElementById(elementId).innerHTML = `
            <nav class="navbar navbar-expand-xl navbar-dark sticky-top">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <i class="bi bi-flower1 me-2"></i>Floricultura Web
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html"><i class="bi bi-house-door me-1"></i> Principal</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" role="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-shop me-1"></i> Produtos
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="index.html"><i class="bi bi-tree me-2"></i> Plantas</a></li>
                                    <li><a class="dropdown-item" href="./Presente.html"><i class="bi bi-gift me-2"></i> Presentes</a></li>
                                    <li><a class="dropdown-item" href="Vasos.html"><i class="bi bi-bucket me-2"></i> Vasos</a></li>
                                    <li><a class="dropdown-item" href="Sementes.html"><i class="bi bi-flower2 me-2"></i> Sementes</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="Contato.html"><i class="bi bi-chat-left-text me-1"></i> Fale Conosco</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="./QuemSomos.html"><i class="bi bi-info-circle me-1"></i> Quem Somos</a>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <a href="./Carrinho.html" class="btn btn-outline-light position-relative">
                                <i class="bi bi-cart3"></i>
                                <span id="cart-count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-counter">
                                    0
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    } else if (elementId === 'footer-container') {
        document.getElementById(elementId).innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 mb-4">
                            <h5 class="fw-bold mb-4">
                                <i class="bi bi-flower1 me-2"></i>Floricultura Web
                            </h5>
                            <p>Transformando ambientes e emocionando pessoas através da beleza das flores e plantas desde 2018.</p>
                            <div class="mt-4">
                                <a href="#" class="social-icons"><i class="bi bi-facebook"></i></a>
                                <a href="#" class="social-icons"><i class="bi bi-instagram"></i></a>
                                <a href="#" class="social-icons"><i class="bi bi-pinterest"></i></a>
                                <a href="#" class="social-icons"><i class="bi bi-tiktok"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-4 mb-4">
                            <h5 class="fw-bold mb-4">Institucional</h5>
                            <ul class="list-unstyled">
                                <li class="mb-2"><a href="./QuemSomos.html">Quem Somos</a></li>
                                <li class="mb-2"><a href="./Contato.html">Fale Conosco</a></li>
                                <li class="mb-2"><a href="./index.html">Principal</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-4 mb-4">
                            <h5 class="fw-bold mb-4">Contato</h5>
                            <p>
                                <i class="bi bi-geo-alt-fill me-2"></i> Rua Jurandyr de Oliveira, 46<br>
                                Mogi das Cruzes - SP
                            </p>
                            <p>
                                <i class="bi bi-telephone-fill me-2"></i> (11) 4799-9999
                            </p>
                            <p>
                                <i class="bi bi-envelope-fill me-2"></i> contato@floriculturaweb.com.br
                            </p>
                            <p>
                                <i class="bi bi-clock-fill me-2"></i> Seg-Sex: 9h às 18h<br>
                                Sáb: 9h às 13h
                            </p>
                        </div>
                    </div>
                    <hr class="my-4 bg-white">
                    <div class="row">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <p class="mb-0"> 2023 Floricultura Web.</p>
                            <p class="mb-0">&copy; Por <a href="https://matheus-abib-portifolio.up.railway.app/" target="_blank">Matheus Abib.</a></p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="mb-0">CNPJ: 09.113.064/0001-73</p>
                        </div>
                    </div>
                </div>
            </footer>
            
            <!-- WhatsApp Floating Button -->
            <a href="https://wa.me/5511999999999" class="whatsapp-btn floating" target="_blank">
                <i class="bi bi-whatsapp"></i>
            </a>
        `;
    }
}

// Carregar componentes quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos no servidor local (file://) ou em um servidor web (http://)
    const isLocalFile = window.location.protocol === 'file:';
    
    // Se for arquivo local, usar fallback imediatamente
    if (isLocalFile) {
        console.log('Modo arquivo local detectado, usando fallback...');
        if (document.getElementById('navbar-container')) {
            loadComponentFallback('navbar-container');
        }
        if (document.getElementById('footer-container')) {
            loadComponentFallback('footer-container');
        }
    } else {
        // Em servidor web, tentar carregar normalmente
        if (document.getElementById('navbar-container')) {
            loadComponent('navbar-container', 'navbar.html');
        }
        
        if (document.getElementById('footer-container')) {
            loadComponent('footer-container', 'footer.html');
        }
    }
    
    // Inicializar Bootstrap dropdowns
    initBootstrapComponents();
});

// Inicializar componentes do Bootstrap
function initBootstrapComponents() {
    // Inicializar dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            // Permitir comportamento padrão do Bootstrap
        });
    });
}

// Função para atualizar contador do carrinho (deve estar no common.js também)
function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;

    if (Array.isArray(cart)) {
        if (cart.length > 0 && typeof cart[0] === 'object' && 'quantity' in cart[0]) {
            totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        } else {
            totalItems = cart.length;
        }
    }

    const counter = document.getElementById('cart-count');
    if (counter) {
        counter.textContent = totalItems;
    }
}