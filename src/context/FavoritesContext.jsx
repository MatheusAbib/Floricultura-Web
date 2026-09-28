import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useCart } from './CartContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { showNotification } = useCart();

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        }
    }, []);

    const toggleFavorite = useCallback((product) => {
        let wasFavorited;
        setFavorites(prev => {
            const exists = prev.find(item => item.id === product.id);
            let newFavorites;
            if (exists) {
                newFavorites = prev.filter(item => item.id !== product.id);
                wasFavorited = false;
                showNotification(`${product.name} removido dos favoritos!`, 'info');
            } else {
                newFavorites = [...prev, product];
                wasFavorited = true;
                showNotification(`${product.name} adicionado aos favoritos!`, 'success');
            }
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
        return wasFavorited;
    }, [showNotification]);

    const isFavorite = useCallback((productId) => {
        return favorites.some(item => item.id === productId);
    }, [favorites]);

    const value = useMemo(() => ({
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length
    }), [favorites, toggleFavorite, isFavorite]);

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};
