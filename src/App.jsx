import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import QuemSomos from './pages/QuemSomos/QuemSomos';
import Contato from './pages/Contato/Contato';
import Vasos from './pages/Vasos/Vasos';
import Sementes from './pages/Sementes/Sementes';
import Presentes from './pages/Presentes/Presentes';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Carrinho from './pages/Carrinho/Carrinho';
import Pagamento from './pages/Pagamento/Pagamento';
import './styles/global.scss';

function App() {
    return (
        <Router>
            <CartProvider>
                <FavoritesProvider>
                    <div className="app">
                        <Navbar />
                        <ScrollToTop />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/quem-somos" element={<QuemSomos />} />
                                <Route path="/contato" element={<Contato />} />
                                <Route path="/vasos" element={<Vasos />} />
                                <Route path="/sementes" element={<Sementes />} />
                                <Route path="/presentes" element={<Presentes />} />
                                <Route path="/carrinho" element={<Carrinho />} />
                                <Route path="/pagamento" element={<Pagamento />} />
                            </Routes>
                        </main>
                        <WhatsAppButton />
                    </div>
                </FavoritesProvider>
            </CartProvider>
        </Router>
    );
}

export default App;