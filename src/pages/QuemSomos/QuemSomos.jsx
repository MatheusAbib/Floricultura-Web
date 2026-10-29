import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';
import Footer from '../../components/Footer/Footer';
import './QuemSomos.scss';

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
            <section className="qs-hero">
                <FadeIn direction="down">
                    <p className="qs-eyebrow">
                        <span className="qs-eyebrow-line" />
                        Desde 2018
                    </p>
                </FadeIn>
                <FadeIn direction="down" delay={100}>
                    <h1 className="qs-hero-title">
                        Sobre a <em className="qs-hand">florcultura.</em>
                    </h1>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <p className="qs-hero-text">
                        Sete anos vendendo flores em Mogi das Cruzes. Ainda fazemos
                        arranjos à mão, ainda escolhemos cada muda pessoalmente, ainda
                        entregamos no mesmo dia.
                    </p>
                </FadeIn>
            </section>

            <section className="qs-block">
                <div className="qs-block-inner qs-block-inner-single">
                    <div className="qs-block-text">
                        <FadeIn direction="up">
                            <p className="qs-eyebrow">
                                <span className="qs-eyebrow-line" />
                                A floricultura
                            </p>
                        </FadeIn>
                        <FadeIn direction="up" delay={100}>
                            <h2 className="qs-block-title">
                                O que a gente <em className="qs-hand">faz.</em>
                            </h2>
                        </FadeIn>
                        <FadeIn direction="up" delay={200}>
                            <p>
                                A Dama da Noite trabalha com plantas, flores de corte, vasos, sementes
                                e presentes montados. A maior parte do que vendemos sai
                                do nosso próprio cultivo ou de produtores da região.
                            </p>
                        </FadeIn>
                        <FadeIn direction="up" delay={300}>
                            <p>
                                Atendemos em loja e por entrega. Pedidos até as 15h saem
                                no mesmo dia para Mogi das Cruzes e cidades vizinhas.
                                Arranjos personalizados precisam de 24h de antecedência.
                            </p>
                        </FadeIn>
                        <FadeIn direction="up" delay={400}>
                            <Link to="/contato" className="qs-cta">
                                <span className="qs-cta-icon" aria-hidden="true">↗</span>
                                <span className="qs-cta-label">Fale conosco</span>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <section className="qs-block qs-block-reverse">
                <div className="qs-block-inner qs-block-inner-single">
                    <div className="qs-block-text">
                            <p className="qs-eyebrow">
                                <span className="qs-eyebrow-line" />
                                A loja
                            </p>
                            <h2 className="qs-block-title">
                                A onde se <em className="qs-hand">localiza?</em>
                            </h2>
                            <p>
                                Um espaço de 120 m² na Rua Jurandyr de Oliveira, com
                                estacionamento na frente e atendimento de segunda a
                                sábado. Vasos decorativos, ferramentas de jardinagem e
                                itens para presente ficam na área da frente.
                            </p>
                            <div className="qs-address">
                                <i className="bi bi-geo-alt" aria-hidden="true" />
                                <div>
                                    <p className="qs-address-line">Rua Jurandyr de Oliveira, 83</p>
                                    <p className="qs-address-line">Mogi das Cruzes — SP</p>
                                    <p className="qs-address-line">CEP 08773-000</p>
                                </div>
                            </div>
                    </div>
                </div>
            </section>

            <section className="qs-timeline-section">
                <div className="qs-timeline-inner">
                    <FadeIn direction="up">
                        <p className="qs-eyebrow">
                            <span className="qs-eyebrow-line" />
                            Linha do tempo
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={100}>
                        <h2 className="qs-block-title">
                            Sete anos de <em className="qs-hand">trabalho.</em>
                        </h2>
                    </FadeIn>

                    <ol className="qs-timeline">
                        <FadeIn direction="up" delay={0}>
                            <li className="qs-timeline-item">
                                <span className="qs-timeline-year">2018</span>
                                <div className="qs-timeline-body">
                                    <h3 className="qs-timeline-title">Abertura</h3>
                                    <p>
                                        Loja aberta em uma sala alugada no centro, com um
                                        balcão de flores de corte e um freezer de bebidas.
                                    </p>
                                </div>
                            </li>
                        </FadeIn>

                        <FadeIn direction="up" delay={100}>
                            <li className="qs-timeline-item">
                                <span className="qs-timeline-year">2019</span>
                                <div className="qs-timeline-body">
                                    <h3 className="qs-timeline-title">Primeira contratação</h3>
                                    <p>
                                        Entrou a primeira florista fixa. Ampliamos o
                                        horário de atendimento e passamos a abrir aos
                                        sábados.
                                    </p>
                                </div>
                            </li>
                        </FadeIn>

                        <FadeIn direction="up" delay={200}>
                            <li className="qs-timeline-item">
                                <span className="qs-timeline-year">2020</span>
                                <div className="qs-timeline-body">
                                    <h3 className="qs-timeline-title">Loja online</h3>
                                    <p>
                                        Com as restrições sanitárias, criamos o site para
                                        pedidos por telefone e entrega. A operação passou
                                        a funcionar sem contato.
                                    </p>
                                </div>
                            </li>
                        </FadeIn>

                        <FadeIn direction="up" delay={300}>
                            <li className="qs-timeline-item">
                                <span className="qs-timeline-year">2022</span>
                                <div className="qs-timeline-body">
                                    <h3 className="qs-timeline-title">Mudança de endereço</h3>
                                    <p>
                                        Saímos do ponto alugado e inauguramos o espaço
                                        atual, com 120 m² e estacionamento próprio.
                                    </p>
                                </div>
                            </li>
                        </FadeIn>

                        <FadeIn direction="up" delay={400}>
                            <li className="qs-timeline-item">
                                <span className="qs-timeline-year">2023</span>
                                <div className="qs-timeline-body">
                                    <h3 className="qs-timeline-title">Centro de distribuição</h3>
                                    <p>
                                        Inauguramos o galpão de separação e expedição,
                                        o que permitiu reduzir o prazo de entrega para
                                        o mesmo dia em toda a região.
                                    </p>
                                </div>
                            </li>
                        </FadeIn>
                    </ol>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default QuemSomos;