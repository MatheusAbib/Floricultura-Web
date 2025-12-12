  document.addEventListener('DOMContentLoaded', function() {
            // Animation on scroll específica para esta página
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
            
            // Inicializar tooltips se necessário
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });