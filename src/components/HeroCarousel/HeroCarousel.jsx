import React, { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
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
                subtitle: 'Entregamos em até 24h com todo o cuidado que suas plantas merecem. Do plantio à floração, tudo feito com carinho.',
                image: '/Floricultura-Web/assets/Carrossel/campo-de-flores.jpg',
                imageAlt: 'Campo de flores coloridas',
            },
            {
                eyebrow: 'Coleção exclusiva',
                title: 'Espécies únicas para trazer mais',
                titleEm: 'vida.',
                subtitle: 'Descubra plantas selecionadas para trazer cor, conforto e personalidade ao seu espaço.',
                image: '/Floricultura-Web/assets/Carrossel/Plantas-variadas.jpg',
                imageAlt: 'Plantas variadas em vasos',
            },
            {
                eyebrow: 'Presentes que encantam',
                title: 'Surpreenda quem você ama com',
                titleEm: 'carinho.',
                subtitle: 'Arranjos florais e kits especiais para celebrar cada momento. O presente perfeito para cada ocasião.',
                image: '/Floricultura-Web/assets/Carrossel/Presente.jpg',
                imageAlt: 'Presente com flores',
            },
        ],
        sementes: [
            {
                eyebrow: 'Sementes selecionadas',
                title: 'Do plantio à floração, cultive seu',
                titleEm: 'jardim.',
                subtitle: 'Encontre sementes de qualidade para cultivar o jardim dos seus sonhos. Instruções detalhadas em cada pacote.',
                image: '/Floricultura-Web/assets/Carrossel/Sementes.jpg',
                imageAlt: 'Sementes em pacotes',
            },
            {
                eyebrow: 'Tire suas dúvidas',
                title: 'Não sabe qual semente',
                titleEm: 'escolher?',
                subtitle: 'Nossas avaliações e descrições detalhadas ajudam você a decidir. Cada semente vem com instruções de plantio.',
                image: '/Floricultura-Web/assets/Carrossel/Banner-Sementes.jpg',
                imageAlt: 'Banner de sementes',
            },
        ],
        presentes: [
            {
                eyebrow: 'Presentes especiais',
                title: 'Celebre momentos únicos com quem você',
                titleEm: 'ama.',
                subtitle: 'Encontre o presente perfeito para cada ocasião. Arranjos, kits e combinações especiais.',
                image: '/Floricultura-Web/assets/Carrossel/Presente-flores.jpg',
                imageAlt: 'Presente com flores',
            },
            {
                eyebrow: 'Kits que encantam',
                title: 'Combinações especiais para',
                titleEm: 'surpreender.',
                subtitle: 'Flores, chocolates e vinhos em combinações perfeitas. O presente certo para cada pessoa.',
                image: '/Floricultura-Web/assets/Carrossel/Food-gift.png',
                imageAlt: 'Kit de presente com comida',
            },
        ],
        vasos: [
            {
                eyebrow: 'Vasos diversos',
                title: 'O vaso certo para cada',
                titleEm: 'planta.',
                subtitle: 'Aqui você encontra o tipo de vaso que preferir — decorativo ou para suas plantas.',
                image: '/Floricultura-Web/assets/Carrossel/Vasos-diversos.png',
                imageAlt: 'Vasos variados',
            },
            {
                eyebrow: 'Vasos recicláveis',
                title: 'Recicle e crie vasos para suas',
                titleEm: 'plantinhas.',
                subtitle: 'Você também pode optar por reciclar garrafas ou latas para criar vasos únicos e sustentáveis.',
                image: '/Floricultura-Web/assets/Carrossel/Vasos-Reciclaveis.jpg',
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
                <div className="carousel-indicators">
                    {currentSlides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#mainCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="carousel-inner">
                    {currentSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >
                            <div className="hero-slide">
                                <div className="hero-content">
                                    <p className="hero-eyebrow">
                                        <span className="hero-eyebrow-line" />
                                        {slide.eyebrow}
                                    </p>

                                    <h1 className="hero-title">
                                        {slide.title}{' '}
                                        <em className="hero-hand">{slide.titleEm}</em>
                                    </h1>

                                    <p className="hero-subtitle">{slide.subtitle}</p>
                                </div>

                                <div className="hero-visual">
                                    <div className="hero-image-frame">
                                        <img
                                            src={slide.image}
                                            alt={slide.imageAlt}
                                            className="hero-image"
                                        />
                                    </div>

                                    <div className="hero-counter" aria-hidden="true">
                                        <span className="hero-counter-current">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="hero-counter-divider">/</span>
                                        <span className="hero-counter-total">
                                            {String(total).padStart(2, '0')}
                                        </span>
                                    </div>
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
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#mainCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>
        </section>
    );
}

export default HeroCarousel;