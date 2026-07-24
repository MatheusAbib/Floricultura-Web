import React, { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import FadeIn from '../FadeIn/FadeIn';
import './HeroCarousel.scss';

function HeroCarousel({ page = 'home' }) {
    useEffect(() => {
        const initializeCarousel = () => {
            const carouselElement = document.querySelector('#mainCarousel');
            if (carouselElement) {
                try {
                    let carousel = bootstrap.Carousel.getInstance(carouselElement);
                    if (!carousel) {
                        carousel = new bootstrap.Carousel(carouselElement, {
                            interval: 5500,
                            ride: 'carousel',
                            pause: 'hover'
                        });
                    }

                    carouselElement.addEventListener('slid.bs.carousel', function() {
                        const items = carouselElement.querySelectorAll('.carousel-item');
                        items.forEach(item => {
                            const img = item.querySelector('img');
                            if (img) {
                                if (item.classList.contains('active')) {
                                    img.style.transform = 'scale(1.1)';
                                    img.style.transition = 'transform 8s ease-out';
                                } else {
                                    img.style.transform = 'scale(1)';
                                }
                            }
                        });
                    });

                    setTimeout(() => {
                        const activeItem = carouselElement.querySelector('.carousel-item.active');
                        if (activeItem) {
                            const img = activeItem.querySelector('img');
                            if (img) {
                                img.style.transform = 'scale(1.1)';
                                img.style.transition = 'transform 8s ease-out';
                            }
                        }
                    }, 100);

                } catch (error) {
                    console.error('Erro ao inicializar carousel:', error);
                }
            }
        };

        setTimeout(initializeCarousel, 100);
    }, []);

   const slides = {
    home: [
        {
            image: "/Floricultura-Web/assets/Carrossel/campo-de-flores.jpg",
            title: "Bem-vindo à Floricultura Web",
            subtitle: "Transforme sua casa com a beleza das flores. Entregamos em até 24h com todo o cuidado que suas plantas merecem.",
            buttonText: "Conheça Nossa História",
            buttonLink: "/quem-somos"
        },
        {
            image: "/Floricultura-Web/assets/Carrossel/Plantas-variadas.jpg",
            title: "Coleção Exclusiva de Plantas",
            subtitle: "Descubra espécies únicas selecionadas para trazer mais vida, cor e conforto ao seu espaço.",
            buttonText: "Explorar Coleção",
            buttonLink: "#product-grid"
        },
        {
            image: "/Floricultura-Web/assets/Carrossel/Presente.jpg",
            title: "Presentes que Encantam",
            subtitle: "Surpreenda quem você ama com arranjos florais e kits especiais. O presente perfeito para cada ocasião.",
            buttonText: "Ver Presentes",
            buttonLink: "/presentes"
        }
    ],
    sementes: [
        {
            image: "/Floricultura-Web/assets/Carrossel/Sementes.jpg",
            title: "Sementes de Qualidade",
            subtitle: "Do plantio à floração, encontre sementes selecionadas para cultivar seu jardim dos sonhos.",
            buttonText: "Ver Catálogo",
            buttonLink: "#product-grid"
        },
        {
            image: "/Floricultura-Web/assets/Carrossel/Banner-Sementes.jpg",
            title: "Tire Suas Dúvidas",
            subtitle: "Não sabe qual semente escolher? Nossas avaliações e descrições detalhadas ajudam você a decidir.",
            buttonText: "Ver Sementes",
            buttonLink: "#product-grid"
        }
    ],
    presentes: [
        {
            image: "/Floricultura-Web/assets/Carrossel/Presente-flores.jpg",
            title: "Presentes Especiais",
            subtitle: "Encontre o presente perfeito para celebrar momentos únicos com quem você ama.",
            buttonText: "Ver Coleção",
            buttonLink: "#product-grid"
        },
        {
            image: "/Floricultura-Web/assets/Carrossel/Food-gift.png",
            title: "Kits que Encantam",
            subtitle: "Combinações especiais de flores, chocolates e vinhos para surpreender em qualquer ocasião.",
            buttonText: "Ver Presentes",
            buttonLink: "#product-grid"
        }
    ],
    vasos: [
    {
        image: "/Floricultura-Web/assets/Carrossel/Vasos-diversos.png",
        title: "Vasos Diversos",
        subtitle: "Aqui você encontra o tipo de vaso que você preferir, decorativo ou para suas plantas",
        buttonText: "Ver Catálogo",
        buttonLink: "#product-grid"
    },
    {
        image: "/Floricultura-Web/assets/Carrossel/Vasos-Reciclaveis.jpg",
        title: "Vasos Recicláveis",
        subtitle: "Você também pode optar por reciclar garrafas ou latas para criar vasos para suas plantinhas"
    }
]

};

    const currentSlides = slides[page] || slides.home;

    return (
        <section className="hero-carousel">
            <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5500">
                <div className="carousel-indicators">
                    {currentSlides.map((_, index) => (
                        <button 
                            key={index}
                            type="button" 
                            data-bs-target="#mainCarousel" 
                            data-bs-slide-to={index} 
                            className={index === 0 ? 'active' : ''}
                        />
                    ))}
                </div>
                <div className="carousel-inner">
                    {currentSlides.map((slide, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={slide.image} className="d-block w-100" alt={slide.title} />
                            <div className="hero-content">
                                <FadeIn direction="down">
                                    <h1 className="hero-title">{slide.title}</h1>
                                </FadeIn>
                                <FadeIn direction="up" delay={100}>
                                    <p className="hero-subtitle">{slide.subtitle}</p>
                                </FadeIn>
                                {slide.buttonText && (
                                    <FadeIn direction="up" delay={200}>
                                        <a href={slide.buttonLink} className="btn btn-outline-light btn-lg hero-btn">{slide.buttonText}</a>
                                    </FadeIn>
                                )}
                            </div>
                            <i className="bi bi-flower1 floating-element floating-element-1"></i>
                            <i className="bi bi-flower3 floating-element floating-element-2"></i>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>
        </section>
    );
}

export default HeroCarousel;
