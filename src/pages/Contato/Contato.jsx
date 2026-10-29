import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import FadeIn from '../../components/FadeIn/FadeIn';
import Footer from '../../components/Footer/Footer';
import './Contato.scss';

function Contato() {
    const [loading, setLoading] = useState(true);
    const { showNotification } = useCart();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: 'Dúvida',
        mensagem: ''
    });
    const formRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('txt', '').toLowerCase();
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showNotification('Mensagem enviada. Respondemos em até 24h úteis.', 'success');
        formRef.current?.reset();
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            assunto: 'Dúvida',
            mensagem: ''
        });
    };

    const handleReset = (e) => {
        e.preventDefault();
        formRef.current?.reset();
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            assunto: 'Dúvida',
            mensagem: ''
        });
        showNotification('Formulário limpo.', 'info');
    };

    if (loading) {
        return (
            <div className="loading-overlay">
                <i className="bi bi-flower1 loading-logo"></i>
            </div>
        );
    }

    return (
        <div className="contato-page">
            <section className="ct-hero">
                <FadeIn direction="down">
                    <p className="ct-eyebrow">
                        <span className="ct-eyebrow-line" />
                        Atendimento
                    </p>
                </FadeIn>
                <FadeIn direction="down" delay={100}>
                    <h1 className="ct-hero-title">
                        Fale <em className="ct-hand">conosco.</em>
                    </h1>
                </FadeIn>
                <FadeIn direction="up" delay={200}>
                    <p className="ct-hero-text">
                        Dúvidas sobre pedidos, entrega ou produtos: mande uma mensagem.
                        Respondemos em até 24h úteis. Para urgências, ligue para a loja.
                    </p>
                </FadeIn>
            </section>

            <section className="ct-form-section">
                <div className="ct-form-inner">
                    <div className="ct-form-header">
                        <FadeIn direction="up">
                            <p className="ct-eyebrow">
                                <span className="ct-eyebrow-line" />
                                Formulário
                            </p>
                        </FadeIn>
                        <FadeIn direction="up" delay={100}>
                            <h2 className="ct-section-title">
                                Envie sua <em className="ct-hand">mensagem.</em>
                            </h2>
                        </FadeIn>
                    </div>

                    <FadeIn direction="up" delay={150}>
                        <form ref={formRef} onSubmit={handleSubmit} id="contatoForm" className="ct-form">
                            <div className="ct-form-row">
                                <div className="ct-field">
                                    <label htmlFor="txtNome" className="ct-label">Nome completo</label>
                                    <input
                                        type="text"
                                        id="txtNome"
                                        name="nome"
                                        className="ct-input"
                                        placeholder="Como podemos te chamar"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="ct-field">
                                    <label htmlFor="txtEmail" className="ct-label">E-mail</label>
                                    <input
                                        type="email"
                                        id="txtEmail"
                                        name="email"
                                        className="ct-input"
                                        placeholder="voce@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="ct-form-row">
                                <div className="ct-field">
                                    <label htmlFor="txtTelefone" className="ct-label">Telefone (opcional)</label>
                                    <input
                                        type="tel"
                                        id="txtTelefone"
                                        name="telefone"
                                        className="ct-input"
                                        placeholder="(11) 90000-0000"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="ct-field">
                                    <label htmlFor="txtAssunto" className="ct-label">Assunto</label>
                                    <select
                                        id="txtAssunto"
                                        name="assunto"
                                        className="ct-input ct-select"
                                        value={formData.assunto}
                                        onChange={handleChange}
                                    >
                                        <option value="Dúvida">Dúvida</option>
                                        <option value="Sugestão">Sugestão</option>
                                        <option value="Reclamação">Reclamação</option>
                                        <option value="Elogio">Elogio</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="ct-field">
                                <label htmlFor="txtMensagem" className="ct-label">Mensagem</label>
                                <textarea
                                    id="txtMensagem"
                                    name="mensagem"
                                    className="ct-input ct-textarea"
                                    placeholder="Detalhe sua dúvida ou pedido"
                                    value={formData.mensagem}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="ct-actions">
                                <button type="submit" className="ct-btn ct-btn-primary">
                                    <span className="ct-btn-icon" aria-hidden="true">↗</span>
                                    Enviar
                                </button>
                                <button type="button" className="ct-btn ct-btn-ghost" onClick={handleReset}>
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </FadeIn>
                </div>
            </section>

            <section className="ct-info-section">
                <div className="ct-info-inner">
                        <p className="ct-eyebrow">
                            <span className="ct-eyebrow-line" />
                            Outros canais
                        </p>
                        <h2 className="ct-section-title">
                            Também dá para <em className="ct-hand">falar.</em>
                        </h2>

                    <div className="ct-info-grid">
                            <div className="ct-info-card">
                                <i className="bi bi-telephone ct-info-icon" aria-hidden="true" />
                                <h3 className="ct-info-title">Telefone</h3>
                                <p className="ct-info-line">(11) 4799-9999</p>
                                <p className="ct-info-line ct-info-line-muted">Segunda a sexta, 9h às 18h</p>
                                <p className="ct-info-line ct-info-line-muted">Sábado, 9h às 13h</p>
                            </div>

                            <div className="ct-info-card">
                                <i className="bi bi-envelope ct-info-icon" aria-hidden="true" />
                                <h3 className="ct-info-title">E-mail</h3>
                                <p className="ct-info-line">contato@damadanoite.com.br</p>
                                <p className="ct-info-line">suporte@damadanoite.com.br</p>
                                <p className="ct-info-line ct-info-line-muted">Resposta em até 24h úteis</p>
                            </div>

                            <div className="ct-info-card">
                                <i className="bi bi-geo-alt ct-info-icon" aria-hidden="true" />
                                <h3 className="ct-info-title">Endereço</h3>
                                <p className="ct-info-line">Rua Jurandyr de Oliveira, 46</p>
                                <p className="ct-info-line">Mogi das Cruzes — SP</p>
                                <p className="ct-info-line ct-info-line-muted">CEP 08773-000</p>
                            </div>
                    </div>
                </div>
            </section>

            <section className="ct-faq-section">
                <div className="ct-faq-inner">
                    <FadeIn direction="up">
                        <p className="ct-eyebrow">
                            <span className="ct-eyebrow-line" />
                            Dúvidas comuns
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={100}>
                        <h2 className="ct-section-title">
                            Perguntas <em className="ct-hand">frequentes.</em>
                        </h2>
                    </FadeIn>

                    <div className="ct-faq-list">
                            <details className="ct-faq-item">
                                <summary className="ct-faq-question">
                                    Qual o prazo de resposta?
                                    <span className="ct-faq-icon" aria-hidden="true">+</span>
                                </summary>
                                <div className="ct-faq-answer">
                                    <p>Respondemos todas as mensagens em até 24h úteis. Para urgências, ligue para a loja.</p>
                                </div>
                            </details>

                            <details className="ct-faq-item">
                                <summary className="ct-faq-question">
                                    Quais os horários de atendimento?
                                    <span className="ct-faq-icon" aria-hidden="true">+</span>
                                </summary>
                                <div className="ct-faq-answer">
                                    <p>De segunda a sexta, das 9h às 18h. Aos sábados, das 9h às 13h. Fechado aos domingos e feriados.</p>
                                </div>
                            </details>

                            <details className="ct-faq-item">
                                <summary className="ct-faq-question">
                                    Posso visitar a loja física?
                                    <span className="ct-faq-icon" aria-hidden="true">+</span>
                                </summary>
                                <div className="ct-faq-answer">
                                    <p>Sim. Estamos na Rua Jurandyr de Oliveira, 46, em Mogi das Cruzes. Se quiser atendimento dedicado, ligue antes e agendamos.</p>
                                </div>
                            </details>

                            <details className="ct-faq-item">
                                <summary className="ct-faq-question">
                                    Como rastrear um pedido?
                                    <span className="ct-faq-icon" aria-hidden="true">+</span>
                                </summary>
                                <div className="ct-faq-answer">
                                    <p>Enviamos o código de rastreio por e-mail após a confirmação. Se não chegou, chame no telefone ou WhatsApp com o número do pedido.</p>
                                </div>
                            </details>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Contato;