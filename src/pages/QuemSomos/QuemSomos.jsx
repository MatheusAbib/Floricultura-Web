import React, { useState, useEffect } from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './QuemSomos.scss';
import Footer from '../../components/Footer/Footer';

function QuemSomos() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loading-overlay">
                <i className="bi bi-flower1 loading-logo"></i>
            </div>
        );
    }

    return (
        <div className="quem-somos-page">
            <section className="hero-section">
                <div className="container text-center">
                    <FadeIn direction="down">
                        <h1 className="hero-title">Nossa História</h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={100}>
                        <p className="lead">Transformando momentos especiais com a beleza das flores desde 2021</p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6">
                            <FadeIn direction="right">
                                <h2 className="section-title">Quem Somos</h2>
                            </FadeIn>
                            <FadeIn direction="right" delay={100}>
                                <p className="lead">Bem-vindo ao mundo da Floricultura Web!</p>
                            </FadeIn>
                            <FadeIn direction="right" delay={200}>
                                <p>Somos uma floricultura que se orgulha de oferecer aos nossos clientes a mais bela coleção de flores e arranjos florais. Nossa jornada começou há 5 anos como um modesto negócio familiar, e ao longo dos anos, crescemos para nos tornar uma referência no universo das flores e da arte floral.</p>
                            </FadeIn>
                            <FadeIn direction="right" delay={300}>
                                <p>Nosso compromisso é com a qualidade, beleza e satisfação dos nossos clientes. Cada flor que entregamos carrega consigo nosso amor e dedicação pelo que fazemos.</p>
                            </FadeIn>
                            <FadeIn direction="right" delay={400}>
                                <a href="/Floricultura-Web/contato" className="btn btn-success mt-3">
  <i className="bi bi-chat-left-text-fill me-2"></i>
  Fale Conosco
</a>
                            </FadeIn>
                        </div>
                        <div className="col-lg-6">
                            <FadeIn direction="left">
                                <div className="about-card">
                                    <img 
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                                        className="img-fluid rounded" 
                                        alt="Nossa Loja"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    <div className="row align-items-center mt-5">
                        <div className="col-lg-6 order-lg-2">
                            <FadeIn direction="left">
                                <h2 className="section-title">Nossa Loja</h2>
                            </FadeIn>
                            <FadeIn direction="left" delay={100}>
                                <p>Localizada em um espaço amplo, nossa loja é um oásis de fragrância e cores. Oferecemos uma variedade de produtos que vão além das flores, incluindo vasos decorativos, acessórios para jardinagem e presentes especiais.</p>
                            </FadeIn>
                            <FadeIn direction="left" delay={200}>
                                <p>Nossa equipe está sempre à disposição para ajudar os clientes a escolherem o presente perfeito ou criar arranjos personalizados para qualquer ocasião.</p>
                            </FadeIn>
                                <div className="d-flex align-items-center mt-4">

                            <div>
                                <h5 className="mb-0"><i className="bi bi-geo-alt-fill fs-4 me-2" style={{ color: '#ff8f00' }}></i>Loja Fisica</h5>
                                <p className="mb-0">Rua Jurandyr de Oliveira, 83</p>
                                <p className="mb-0">Mogi das Cruzes - SP</p>
                                <p className="mb-0">CEP: 08773-000</p>
                            </div>
                                </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <FadeIn direction="right">
                                <div className="about-card">
                                    <img 
                                        src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                                        className="img-fluid rounded" 
                                        alt="Nosso Espaço"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-jornada">
                <div className="container">
                    <FadeIn direction="up">
                        <h2 className="text-center mb-5">Jornada da Floricultura Web</h2>
                    </FadeIn>

                    <div className="timeline">
                        <FadeIn direction="up" delay={0}>
                            <div className="timeline-item">
                                <div className="timeline-date">2018</div>
                                <h4>Fundada com Amor</h4>
                                <p>Começamos como um pequeno negócio familiar em Mogi das Cruzes, com apenas um balcão de flores e muita paixão pelo que fazíamos.</p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={100}>
                            <div className="timeline-item">
                                <div className="timeline-date">2019</div>
                                <h4>Primeira Expansão</h4>
                                <p>Ampliamos nosso espaço físico e contratamos nossa primeira equipe de floristas profissionais para atender a demanda crescente.</p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={200}>
                            <div className="timeline-item">
                                <div className="timeline-date">2020</div>
                                <h4>Nascimento da Loja Online</h4>
                                <p>Diante dos desafios da pandemia, criamos nossa plataforma digital para continuar levando beleza e alegria para nossos clientes.</p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={300}>
                            <div className="timeline-item">
                                <div className="timeline-date">2022</div>
                                <h4>Reconhecimento Regional</h4>
                                <p>Fomos premiados como a melhor floricultura da região pelo segundo ano consecutivo, graças à qualidade de nossos produtos e serviços.</p>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={400}>
                            <div className="timeline-item">
                                <div className="timeline-date">2023</div>
                                <h4>Atual Expansão</h4>
                                <p>Inauguramos nosso novo centro de distribuição, permitindo entregas mais rápidas em toda a região metropolitana de São Paulo.</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <FadeIn direction="up">
                        <h2 className="text-center mb-5">Conheça a Equipe</h2>
                    </FadeIn>

                    <div className="row">
                        <div className="col-md-4">
                                <div className="team-member">
                                    <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Ana Abib" />
                                    <h4>Ana Abib</h4>
                                    <p className="text-success">Fundadora e Florista-chefe</p>
                                    <p>Com mais de 15 anos de experiência, Ana é a alma criativa por trás dos nossos arranjos mais exclusivos.</p>
                                </div>
                        </div>

                        <div className="col-md-4">
                                <div className="team-member">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Mendes" />
                                    <h4>Carlos Mendes</h4>
                                    <p className="text-success">Gerente de Operações</p>
                                    <p>Responsável por garantir que cada pedido seja perfeito e entregue no prazo, com excelência.</p>
                                </div>
                        </div>

                        <div className="col-md-4">
                                <div className="team-member">
                                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Juliana Costa" />
                                    <h4>Juliana Costa</h4>
                                    <p className="text-success">Designer Floral</p>
                                    <p>Especialista em tendências e criação de arranjos personalizados para ocasiões especiais.</p>
                                </div>
                          
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <FadeIn direction="up">
                        <h2 className="text-center mb-5">Nossos Valores</h2>
                    </FadeIn>

                    <div className="row g-4">
                        <div className="col-md-4">
                                <div className="card about-card h-100">
                                    <div className="card-body text-center">
                                        <i className="bi bi-flower2 fs-1 text-success mb-3"></i>
                                        <h4>Qualidade</h4>
                                        <p>Trabalhamos apenas com as melhores flores, frescas e duradouras, selecionadas diariamente.</p>
                                    </div>
                                </div>
                        </div>

                        <div className="col-md-4">
                                <div className="card about-card h-100">
                                    <div className="card-body text-center">
                                        <i className="bi bi-heart fs-1 text-success mb-3"></i>
                                        <h4>Paixão</h4>
                                        <p>Amamos o que fazemos e acreditamos que isso se reflete em cada arranjo que criamos.</p>
                                    </div>
                                </div>
                        </div>

                        <div className="col-md-4">
                                <div className="card about-card h-100">
                                    <div className="card-body text-center">
                                        <i className="bi bi-people fs-1 text-success mb-3"></i>
                                        <h4>Atendimento</h4>
                                        <p>Nosso foco é a satisfação total do cliente, com atendimento personalizado e cuidadoso.</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default QuemSomos;