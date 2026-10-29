import React, { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';
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
                            interval: 6500,
                            ride: 'carousel',
                            pause: 'hover'
                        });
                    }
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
                eyebrow: 'Flores frescas, todos os dias',
                title: 'Transforme sua casa com a beleza das',
                titleEm: 'flores.',
                subtitle: 'Entrega em até 24h com todo o cuidado que suas plantas merecem. Tudo feito com carinho.',
                buttonLink: '#lista-plantas',
                buttonLabel: 'Ver coleção',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/campo-de-flores.jpg',
                imageAlt: 'Campo de flores coloridas',
            },
            {
                eyebrow: 'Coleção exclusiva',
                title: 'Espécies únicas para trazer mais',
                titleEm: 'vida.',
                subtitle: 'Veja plantas selecionadas para trazer cor, conforto e personalidade ao seu espaço.',
                buttonLink: '#lista-plantas',
                buttonLabel: 'Explorar plantas',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Plantas-variadas.jpg',
                imageAlt: 'Plantas variadas em vasos',
            },
            {
                eyebrow: 'Presentes que encantam',
                title: 'Surpreenda quem você ama com',
                titleEm: 'carinho.',
                subtitle: 'Arranjos florais e kits especiais. O presente perfeito para cada ocasião.',
                buttonLink: '/presentes',
                buttonLabel: 'Ver presentes',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Presente.jpg',
                imageAlt: 'Presente com flores',
            },
        ],
        sementes: [
            {
                eyebrow: 'Sementes selecionadas',
                title: 'Cultive seu próprio',
                titleEm: 'jardim.',
                subtitle: 'Encontre sementes para cultivar o jardim dos seus sonhos. Instruções detalhadas em cada pacote.',
                buttonLink: '#product-grid',
                buttonLabel: 'Ver catálogo',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Sementes.jpg',
                imageAlt: 'Sementes em pacotes',
            },
            {
                eyebrow: 'Tire suas dúvidas',
                title: 'Não sabe qual semente',
                titleEm: 'escolher?',
                subtitle: 'Nossas descrições detalhadas ajudam você a decidir. Cada semente vem com instruções de plantio.',
                buttonLink: '#product-grid',
                buttonLabel: 'Ver sementes',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Banner-Sementes.jpg',
                imageAlt: 'Banner de sementes',
            },
        ],
        presentes: [
            {
                eyebrow: 'Presentes especiais',
                title: 'Celebre momentos com quem você',
                titleEm: 'ama.',
                subtitle: 'Presentes perfeito para cada ocasião. Arranjos, kits e combinações especiais.',
                buttonLink: '#product-grid',
                buttonLabel: 'Ver coleção',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Presente-flores.jpg',
                imageAlt: 'Presente com flores',
            },
            {
                eyebrow: 'Kits que encantam',
                title: 'Combinações especiais para',
                titleEm: 'surpreender.',
                subtitle: 'Flores, chocolates e vinhos em combinações perfeitas. O presente certo para cada pessoa.',
                buttonLink: '#product-grid',
                buttonLabel: 'Ver presentes',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Food-gift.png',
                imageAlt: 'Kit de presente com comida',
            },
        ],
        vasos: [
            {
                eyebrow: 'Vasos diversos',
                title: 'O vaso certo para cada',
                titleEm: 'planta.',
                subtitle: 'Aqui você encontra o tipo de vaso que preferir — decorativo ou para suas plantas.',
                buttonLink: '#product-grid',
                buttonLabel: 'Ver catálogo',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Vasos-diversos.png',
                imageAlt: 'Vasos variados',
            },
            {
                eyebrow: 'Vasos recicláveis',
                title: 'Recicle e crie vasos para suas',
                titleEm: 'plantinhas.',
                subtitle: 'Escolha reciclar garrafas ou latas para criar vasos únicos e sustentáveis.',
                buttonLink: '#product-grid',
                buttonLabel: 'Ver vasos',
                image: '/Floricultura-Dama-da-Noite/assets/Carrossel/Vasos-Reciclaveis.jpg',
                imageAlt: 'Vasos recicláveis',
            },
        ],
    };

    const currentSlides = slides[page] || slides.home;
    const total = currentSlides.length;

    return (
        <section className="hero-carousel">
            <div
                id="mainCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="6500"
            >
                <div className="carousel-inner">
                    {currentSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >
                            <div className="hero-slide">
                                <div className="hero-content">
                                    <div className="hero-content-inner">
                                        <div className="hero-meta">
                                            <span className="hero-index">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="hero-meta-line" aria-hidden="true" />
                                            <span className="hero-total">
                                                {String(total).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <p className="hero-eyebrow">{slide.eyebrow}</p>

                                        <h1 className="hero-title">
                                            {slide.title}{' '}
                                            <em className="hero-hand">{slide.titleEm}</em>
                                        </h1>

                                        <p className="hero-subtitle">{slide.subtitle}</p>

                                        {slide.buttonLabel && (
                                            slide.buttonLink.startsWith('#') ? (
                                                <a
                                                    href={slide.buttonLink}
                                                    className="hero-cta"
                                                    aria-label={slide.buttonLabel}
                                                >
                                                    <span className="hero-cta-icon" aria-hidden="true">↗</span>
                                                    <span className="hero-cta-label">{slide.buttonLabel}</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    to={slide.buttonLink}
                                                    className="hero-cta"
                                                    aria-label={slide.buttonLabel}
                                                >
                                                    <span className="hero-cta-icon" aria-hidden="true">↗</span>
                                                    <span className="hero-cta-label">{slide.buttonLabel}</span>
                                                </Link>
                                            )
                                        )}

                                        <div className="hero-indicators">
                                            {currentSlides.map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    data-bs-target="#mainCarousel"
                                                    data-bs-slide-to={i}
                                                    className={`hero-indicator ${i === index ? 'is-active' : ''}`}
                                                    aria-label={`Slide ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="hero-visual">
                                    <img
                                        src={slide.image}
                                        alt={slide.imageAlt}
                                        className="hero-image"
                                    />
                                    <span className="hero-image-overlay" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#mainCarousel"
                    data-bs-slide="prev"
                    aria-label="Anterior"
                >
                    <span aria-hidden="true">←</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#mainCarousel"
                    data-bs-slide="next"
                    aria-label="Próximo"
                >
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </section>
    );
}

export default HeroCarousel;