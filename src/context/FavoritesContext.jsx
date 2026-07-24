import React, { createContext, useState, useEffect, useContext } from 'react';
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

    const saveFavorites = (newFavorites) => {
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const toggleFavorite = (product) => {
        const exists = favorites.find(item => item.id === product.id);
        let newFavorites;
        let wasFavorited;
        if (exists) {
            newFavorites = favorites.filter(item => item.id !== product.id);
            wasFavorited = false;
            showNotification(`${product.name} removido dos favoritos!`, 'info');
        } else {
            newFavorites = [...favorites, product];
            wasFavorited = true;
            showNotification(`${product.name} adicionado aos favoritos!`, 'success');
        }
        saveFavorites(newFavorites);
        return wasFavorited;
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    const value = {
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};