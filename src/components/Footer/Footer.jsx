import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h5><i className="bi bi-flower1 me-2"></i>Floricultura Web</h5>
                        <p>
                            Sua floricultura com entrega rápida com o objetivo de tornar sua casa mais agradável.
                        </p>
                        <div className="mt-3">
                            <a href="#" className="social-icons"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="social-icons"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="social-icons"><i className="bi bi-whatsapp"></i></a>
                            <a href="#" className="social-icons"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h5>Links Rápidos</h5>
                        <ul className="list-unstyled">
                            <li><a href="/Floricultura-Web/">Principal</a></li>
                            <li><a href="/Floricultura-Web/quem-somos">Quem Somos</a></li>
                            <li><a href="/Floricultura-Web/contato">Contato</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h5>Contato</h5>
                        <p><i className="bi bi-geo-alt me-2"></i>Rua das Flores, 123 - São Paulo</p>
                        <p><i className="bi bi-telephone me-2"></i>(11) 99999-9999</p>
                        <p><i className="bi bi-envelope me-2"></i>contato@floriculturaweb.com</p>
                        <p><i className="bi bi-clock me-2"></i>Seg-Sáb: 8h - 20h</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 text-center">
                        <p>&copy; 2026 Floricultura Web. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;