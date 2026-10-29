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
            <div className="newsletter-content">
                <div className="newsletter-text-column">
                    <p className="newsletter-eyebrow">
                        <span className="newsletter-eyebrow-line" />
                        Fique por dentro
                    </p>

                    <h2 className="newsletter-title">
                        Receba novidades da{' '}
                        <em className="newsletter-hand">floricultura.</em>
                    </h2>

                    <p className="newsletter-text">
                        Ofertas exclusivas, dicas de cuidado com plantas e novidades
                        da Floricultura Dama da Noite diretamente no seu e-mail.
                    </p>
                </div>

                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <div className="newsletter-field">
                        <label htmlFor="newsletter-email" className="newsletter-label">
                            Seu melhor e-mail
                        </label>

                        <div className="newsletter-input-group">
                            <input
                                id="newsletter-email"
                                type="email"
                                className={`newsletter-input ${error ? 'is-invalid' : ''}`}
                                placeholder="voce@email.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError(false);
                                }}
                                required
                            />

                            <button className="newsletter-btn" type="submit">
                                <i className="bi bi-arrow-right" aria-hidden="true" />
                            </button>
                        </div>

                        {error && (
                            <p className="newsletter-error">
                                Por favor, insira um e-mail válido.
                            </p>
                        )}
                    </div>

                    <label className="newsletter-check">
                        <input
                            type="checkbox"
                            className="newsletter-checkbox"
                            required
                        />
                        <span className="newsletter-check-label">
                            Concordo em receber comunicações da Floricultura Dama da Noite
                        </span>
                    </label>
                </form>
            </div>
        </section>
    );
}

export default Newsletter;