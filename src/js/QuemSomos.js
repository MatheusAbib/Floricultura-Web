 // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate__animated');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                const animation = element.classList.contains('animate__fadeInUp') ? 'animate__fadeInUp' :
                    element.classList.contains('animate__fadeInLeft') ? 'animate__fadeInLeft' :
                        element.classList.contains('animate__fadeInRight') ? 'animate__fadeInRight' :
                            'animate__fadeIn';
                element.classList.add(animation);
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Atualizar contador do carrinho
    document.addEventListener('DOMContentLoaded', function () {
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

        updateCartCounter();
    });