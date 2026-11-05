import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext(undefined);
const CART_STORAGE_KEY = 'marcus-book-store_cart_v1';
export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        }
        catch {
            return [];
        }
    });
    const [lastAddedBook, setLastAddedBook] = useState(null);
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
        catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }, [items]);
    const addToCart = (book, quantity = 1) => {
        setItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.book.id === book.id);
            if (existingIndex > -1) {
                const nextItems = [...prevItems];
                nextItems[existingIndex] = {
                    ...nextItems[existingIndex],
                    quantity: nextItems[existingIndex].quantity + quantity,
                };
                return nextItems;
            }
            else {
                return [...prevItems, { book, quantity }];
            }
        });
        setLastAddedBook(book);
        // Auto clear alert after 3.5s
        setTimeout(() => {
            setLastAddedBook((curr) => (curr?.id === book.id ? null : curr));
        }, 3500);
    };
    const removeFromCart = (bookId) => {
        setItems((prevItems) => prevItems.filter((item) => item.book.id !== bookId));
    };
    const updateQuantity = (bookId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }
        setItems((prevItems) => prevItems.map((item) => item.book.id === bookId ? { ...item, quantity } : item));
    };
    const clearCart = () => {
        setItems([]);
    };
    const clearLastAdded = () => {
        setLastAddedBook(null);
    };
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    // Free delivery for orders over ₹499
    const shippingFee = subtotal > 0 && subtotal < 499 ? 49 : 0;
    const totalAmount = subtotal + shippingFee;
    return (_jsx(CartContext.Provider, { value: {
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal,
            shippingFee,
            totalAmount,
            lastAddedBook,
            clearLastAdded,
        }, children: children }));
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
