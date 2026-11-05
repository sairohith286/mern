import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);
const AUTH_USER_KEY = 'marcus-book-store_active_user';
const USERS_DB_KEY = 'marcus-book-store_accounts_db';
const DEFAULT_USERS = [
    {
        id: 'usr_demo_1',
        name: 'Aarav Sharma',
        email: 'reader@marcus-book-store.com',
        passwordHash: 'marcus-book-store123',
    },
];
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem(AUTH_USER_KEY);
            return stored ? JSON.parse(stored) : null;
        }
        catch {
            return null;
        }
    });
    // Seed default demo user if db is empty
    useEffect(() => {
        try {
            const existing = localStorage.getItem(USERS_DB_KEY);
            if (!existing) {
                localStorage.setItem(USERS_DB_KEY, JSON.stringify(DEFAULT_USERS));
            }
        }
        catch (e) {
            console.error('Error initializing demo accounts', e);
        }
    }, []);
    const login = (email, password) => {
        try {
            const accountsRaw = localStorage.getItem(USERS_DB_KEY);
            const accounts = accountsRaw ? JSON.parse(accountsRaw) : DEFAULT_USERS;
            const normalizedEmail = email.trim().toLowerCase();
            const matched = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);
            if (!matched) {
                return {
                    success: false,
                    error: 'No account found with this email. Please sign up first.',
                };
            }
            if (matched.passwordHash !== password) {
                return {
                    success: false,
                    error: 'Incorrect password. Please try again.',
                };
            }
            const activeUser = {
                id: matched.id,
                name: matched.name,
                email: matched.email,
            };
            setUser(activeUser);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(activeUser));
            return { success: true };
        }
        catch {
            return {
                success: false,
                error: 'An unexpected authentication error occurred.',
            };
        }
    };
    const register = (name, email, password) => {
        try {
            const accountsRaw = localStorage.getItem(USERS_DB_KEY);
            const accounts = accountsRaw ? JSON.parse(accountsRaw) : DEFAULT_USERS;
            const normalizedEmail = email.trim().toLowerCase();
            const alreadyExists = accounts.some((acc) => acc.email.toLowerCase() === normalizedEmail);
            if (alreadyExists) {
                return {
                    success: false,
                    error: 'An account with this email already exists. Please log in.',
                };
            }
            const newAccount = {
                id: `usr_${Date.now()}`,
                name: name.trim(),
                email: normalizedEmail,
                passwordHash: password,
            };
            const updatedAccounts = [...accounts, newAccount];
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedAccounts));
            const activeUser = {
                id: newAccount.id,
                name: newAccount.name,
                email: newAccount.email,
            };
            setUser(activeUser);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(activeUser));
            return { success: true };
        }
        catch {
            return {
                success: false,
                error: 'Failed to create account. Please try again.',
            };
        }
    };
    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem(AUTH_USER_KEY);
        }
        catch (e) {
            console.error('Failed to remove user from localStorage', e);
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout,
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
