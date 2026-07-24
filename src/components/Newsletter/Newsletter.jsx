import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Newsletter.scss';

function Newsletter() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const { showNotification } = useCart();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        if (!emailValido) {
            setError(true);
            return;
        }
        
        setError(false);
        showNotification('Inscrição realizada com sucesso! Você receberá nossas novidades.', 'success');
        setEmail('');
    };

    return (
        <section className="newsletter-section">
            <div className="container newsletter-container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <i className="bi bi-flower1 newsletter-flower newsletter-flower-1"></i>
                        <i className="bi bi-flower2 newsletter-flower newsletter-flower-2"></i>
                        <div className="newsletter-card">
                            <h2 className="newsletter-title text-center">Assine Nossa Newsletter</h2>
                            <p className="newsletter-text text-center">Receba ofertas exclusivas, dicas com plantas e novidades diretamente no seu e-mail.</p>
                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input 
                                        type="email" 
                                        className={`form-control ${error ? 'is-invalid' : ''}`} 
                                        placeholder="Seu melhor e-mail" 
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError(false);
                                        }}
                                        required 
                                    />
                                    <button className="btn newsletter-btn" type="submit">
                                        <i className="bi bi-envelope-check me-2"></i>Assinar
                                    </button>
                                </div>
                                {error && (
                                    <small className="text-danger ms-1">Por favor, insira um e-mail válido.</small>
                                )}
                                <div className="form-check text-center mt-2 d-flex align-items-center justify-content-center gap-2">
                                    <input className="form-check-input" type="checkbox" id="newsletterCheck" required />
                                    <label className="form-check-label small" htmlFor="newsletterCheck">
                                        Concordo em receber comunicações da Floricultura Web
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;