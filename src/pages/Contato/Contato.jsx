import React, { useState, useEffect, useRef } from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './Contato.scss';
import Footer from '../../components/Footer/Footer';

function Contato() {
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: 'Dúvida',
        mensagem: ''
    });
    const formRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('txt', '').toLowerCase();
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
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
        showNotification('Formulário limpo com sucesso!', 'info');
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
            <section className="contact-hero">
                <div className="container text-center">
                    <FadeIn direction="down">
                        <h1 className="contact-hero-title">Fale Conosco</h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={100}>
                        <p className="lead">Estamos aqui para ajudar e responder todas as suas dúvidas</p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <FadeIn direction="up">
                                <div className="contact-card">
                                    <h2 className="section-title text-center mb-4">Envie sua Mensagem</h2>
                                    <p className="text-center mb-5">Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>

                                    <form ref={formRef} onSubmit={handleSubmit} id="contatoForm">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input 
                                                        type="text" 
                                                        id="txtNome" 
                                                        name="nome" 
                                                        className="form-control" 
                                                        placeholder=" "
                                                        value={formData.nome}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="txtNome">Nome Completo</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input 
                                                        type="email" 
                                                        id="txtEmail" 
                                                        name="email" 
                                                        className="form-control" 
                                                        placeholder=" "
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="txtEmail">E-mail</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input 
                                                        type="tel" 
                                                        id="txtTelefone" 
                                                        name="telefone" 
                                                        className="form-control" 
                                                        placeholder=" "
                                                        value={formData.telefone}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="txtTelefone">Telefone (opcional)</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <select 
                                                        className="form-select" 
                                                        id="txtAssunto" 
                                                        name="assunto"
                                                        value={formData.assunto}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Dúvida">Dúvida</option>
                                                        <option value="Sugestão">Sugestão</option>
                                                        <option value="Reclamação">Reclamação</option>
                                                        <option value="Elogio">Elogio</option>
                                                        <option value="Outro">Outro</option>
                                                    </select>
                                                    <label htmlFor="txtAssunto">Assunto</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-4">
                                                    <textarea 
                                                        id="txtMensagem" 
                                                        name="mensagem" 
                                                        className="form-control" 
                                                        placeholder=" " 
                                                        style={{ height: '150px' }}
                                                        value={formData.mensagem}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                    <label htmlFor="txtMensagem">Mensagem</label>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <button type="submit" className="btn btn-success me-3">
                                                    <i className="bi bi-send-fill me-2"></i>Enviar
                                                </button>
                                                <button type="button" className="btn btn-outline-success" onClick={handleReset}>
                                                    <i className="bi bi-eraser-fill me-2"></i>Limpar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {notification && (
                <div className={`notification notification-${notification.type}`}>
                    <i className={`bi ${notification.type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}`}></i>
                    {notification.message}
                </div>
            )}

            <section className="py-5 bg-light">
                <div className="container">
                    <FadeIn direction="up">
                        <h2 className="text-center mb-5">Outras Formas de Contato</h2>
                    </FadeIn>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <FadeIn direction="up" delay={0}>
                                <div className="contact-info-card">
                                    <div className="contact-icon">
                                        <i className="bi bi-telephone-fill"></i>
                                    </div>
                                    <h4>Telefone</h4>
                                    <p>(11) 4799-9999</p>
                                    <p>Segunda a Sexta: 9h às 18h</p>
                                    <p>Sábado: 9h às 13h</p>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="col-md-4">
                            <FadeIn direction="up" delay={100}>
                                <div className="contact-info-card">
                                    <div className="contact-icon">
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>
                                    <h4>E-mail</h4>
                                    <p>contato@floriculturaweb.com.br</p>
                                    <p>suporte@floriculturaweb.com.br</p>
                                    <p>Respondemos em até 24h</p>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="col-md-4">
                            <FadeIn direction="up" delay={200}>
                                <div className="contact-info-card">
                                    <div className="contact-icon">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <h4>Endereço</h4>
                                    <p>Rua Jurandyr de Oliveira, 46</p>
                                    <p>Mogi das Cruzes - SP</p>
                                    <p>CEP: 08773-000</p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <FadeIn direction="up">
                        <h2 className="text-center mb-5">Perguntas Frequentes</h2>
                    </FadeIn>

                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item mb-3 border-0 shadow-sm">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    Qual o prazo para resposta das mensagens?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Nossa equipe se compromete a responder todas as mensagens em até 24 horas úteis. Para assuntos mais urgentes, recomendamos o contato por telefone.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item mb-3 border-0 shadow-sm">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                    Quais são os horários de atendimento?
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Atendemos de segunda a sexta-feira das 9h às 18h, e aos sábados das 9h às 13h. Não trabalhamos aos domingos e feriados.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item mb-3 border-0 shadow-sm">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                    Posso visitar a loja física?
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Sim! Nossa loja física está localizada na Rua Jurandyr de Oliveira, 46 em Mogi das Cruzes - SP. Recomendamos agendar sua visita pelo telefone para garantir melhor atendimento.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item mb-3 border-0 shadow-sm">
                            <h2 className="accordion-header" id="headingFour">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                    Como faço para rastrear meu pedido?
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Após a confirmação do pedido, enviamos um e-mail com o código de rastreio. Caso não tenha recebido, entre em contato conosco pelo telefone ou WhatsApp.
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

export default Contato;