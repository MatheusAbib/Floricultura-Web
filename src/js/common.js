// Funções comuns reutilizáveis

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Atualizar contador do carrinho
function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;

    // Se os itens tiverem quantidade
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

// Modal functions
function showContactModal() {
    const modal = document.getElementById("contactSuccessModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeContactModal() {
    const modal = document.getElementById("contactSuccessModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Animation on scroll
function initAnimateOnScroll() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                const animation = element.classList.contains('animate__fadeInUp') ? 'animate__fadeInUp' : 
                                  element.classList.contains('animate__fadeIn') ? 'animate__fadeIn' :
                                  'animate__fadeIn';
                element.classList.add(animation);
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

// Loading overlay
function initLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
            
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 200);
        }, 1000);
    }
}

// Store last visited page (except cart)
function initPageTracking() {
    if (!window.location.pathname.includes('Carrinho.html')) {
        localStorage.setItem('lastVisitedPage', window.location.href);
    }
}

// Go back to last page
function goBack() {
    const previous = localStorage.getItem('lastVisitedPage');
    if (previous && previous !== window.location.href) {
        window.location.href = previous;
    } else {
        window.location.href = 'index.html';
    }
}

// Initialize all common functions
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    updateCartCounter();
    initAnimateOnScroll();
    initLoadingOverlay();
    initPageTracking();
    
    // Initialize contact form modal if exists
    const contactForm = document.getElementById('contatoForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showContactModal();
            this.reset();
        });
    }
    
    // Close modal when clicking outside
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeContactModal();
            }
        });
    }
});