import React, { createContext, useState, useEffect, useContext } from 'react';

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
    const [notification, setNotification] = useState(null);
    const [addedProductId, setAddedProductId] = useState(null);

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
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            saveCart(updatedCart);
        } else {
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            };
            saveCart([...cart, newItem]);
        }

        setAddedProductId(product.id);
        showNotification(`${product.name} adicionado ao carrinho!`);
        setTimeout(() => setAddedProductId(null), 2000);
    };

    const addMultipleToCart = (product, quantity) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            saveCart(updatedCart);
        } else {
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            };
            saveCart([...cart, newItem]);
        }
        showNotification(`${quantity}x ${product.name} adicionado ao carrinho!`);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCart(updatedCart);
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: quantity }
                : item
        );
        saveCart(updatedCart);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const value = {
        cart,
        cartCount,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        notification,
        showNotification,
        addedProductId,
        setAddedProductId
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            {notification && (
                <div className={`notification notification-${notification.type}`}>
                    <i className={`bi ${notification.type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}`}></i>
                    {notification.message}
                </div>
            )}
        </CartContext.Provider>
    );
};