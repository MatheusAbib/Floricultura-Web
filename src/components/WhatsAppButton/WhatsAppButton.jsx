import React from 'react';
import { useLocation } from 'react-router-dom';
import './WhatsAppButton.scss';

function WhatsAppButton() {
    const location = useLocation();
    const phoneNumber = '5511999999999';
    const message = 'Olá! Vim pelo site da Floricultura Dama da Noite.';

    const hiddenPages = ['/carrinho', '/pagamento'];

    if (hiddenPages.includes(location.pathname)) {
        return null;
    }

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn floating"
            aria-label="Conversar no WhatsApp"
        >
            <i className="bi bi-whatsapp" aria-hidden="true" />
        </a>
    );
}

export default WhatsAppButton;