import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [addedProductId, setAddedProductId] = useState(null);
    const toastRef = useRef(null);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
                updateCartCount(parsedCart);
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
    }, []);

    const updateCartCount = (cartItems) => {
        const total = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(total);
    };

    const saveCart = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
        updateCartCount(newCart);
    };

    const showNotification = (message, type = 'success') => {
        const severityMap = {
            success: 'success',
            info: 'info',
            warning: 'warn',
            error: 'error'
        };
        const summaryMap = {
            success: 'Sucesso',
            info: 'Aviso',
            warning: 'Atenção',
            error: 'Erro'
        };
        const severity = severityMap[type] || 'info';
        toastRef.current?.show({
            severity,
            summary: summaryMap[severity],
            detail: message,
            life: 3000
        });
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCart(updatedCart);
        } else {
            saveCart([...cart, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            }]);
        }
        setAddedProductId(product.id);
        showNotification(`${product.name} adicionado ao carrinho!`, 'success');
        setTimeout(() => setAddedProductId(null), 2000);
    };

    const addMultipleToCart = (product, quantity) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            saveCart(updatedCart);
        } else {
            saveCart([...cart, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            }]);
        }
        showNotification(`${quantity}x ${product.name} adicionado ao carrinho!`, 'success');
    };

    const removeFromCart = (productId) => {
        saveCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => saveCart([]);

    const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const value = {
        cart,
        cartCount,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        showNotification,
        addedProductId,
        setAddedProductId
    };

    return (
        <CartContext.Provider value={value}>
            <Toast ref={toastRef} position="bottom-right" />
            {children}
        </CartContext.Provider>
    );
};