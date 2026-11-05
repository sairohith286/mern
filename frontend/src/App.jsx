import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { CheckoutPage } from './pages/CheckoutPage';
// Scroll restoration component
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
// Global Cart Feedback Toast
function CartToast() {
    const { lastAddedBook, clearLastAdded } = useCart();
    if (!lastAddedBook)
        return null;
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300", children: _jsxs("div", { className: "bg-[#15271F] text-amber-50 rounded-xl shadow-2xl p-4 border border-[#2B4B3C] flex items-center gap-4 max-w-sm", children: [_jsx("img", { src: lastAddedBook.coverImage, alt: lastAddedBook.title, referrerPolicy: "no-referrer", className: "w-10 h-14 object-cover rounded shadow-2xs border border-white/20 shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-[11px] uppercase font-mono tracking-wider text-amber-300/90 font-medium", children: "Added to Bag" }), _jsx("h4", { className: "font-serif font-bold text-xs sm:text-sm text-white truncate", children: lastAddedBook.title }), _jsxs("p", { className: "text-xs text-stone-300 font-mono", children: ["\u20B9", lastAddedBook.price] })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [_jsxs(Link, { to: "/cart", onClick: clearLastAdded, className: "px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-[#15271F] font-semibold text-xs rounded-md transition-colors flex items-center gap-1", children: [_jsx("span", { children: "View" }), _jsx(ArrowRight, { className: "w-3 h-3" })] }), _jsx("button", { onClick: clearLastAdded, className: "p-1 text-stone-400 hover:text-white transition-colors", "aria-label": "Dismiss toast", children: _jsx(X, { className: "w-4 h-4" }) })] })] }) }));
}
function MainLayout() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E232A]", children: [_jsx(ScrollToTop, {}), _jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/books", element: _jsx(BooksPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(ProtectedRoute, { children: _jsx(CheckoutPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(HomePage, {}) })] }) }), _jsx(Footer, {}), _jsx(CartToast, {})] }));
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(CartProvider, { children: _jsx(MainLayout, {}) }) }) }));
}
