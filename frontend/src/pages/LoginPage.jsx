import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, BookOpen, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/';
    const stateMessage = location.state?.message;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    // Email format validator
    const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address (e.g., reader@marcus-book-store.com).');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setSubmitting(true);
        const result = login(email, password);
        setSubmitting(false);
        if (result.success) {
            navigate(redirectPath, { replace: true });
        }
        else {
            setError(result.error || 'Failed to log in.');
        }
    };
    const fillDemoAccount = () => {
        setEmail('reader@marcus-book-store.com');
        setPassword('marcus-book-store123');
        setError(null);
    };
    return (_jsx("div", { className: "max-w-md mx-auto px-4 py-16 sm:py-20", children: _jsxs("div", { className: "bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "w-10 h-10 mx-auto rounded-lg bg-[#1A382B] text-amber-100 flex items-center justify-center", children: _jsx(BookOpen, { className: "w-5 h-5" }) }), _jsx("h1", { className: "font-serif text-2xl sm:text-3xl font-bold text-stone-900", children: "Welcome Back" }), _jsx("p", { className: "text-xs sm:text-sm text-stone-500", children: "Sign in to access your saved bag, orders, and reader profile." })] }), stateMessage && (_jsx("div", { className: "p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-900 leading-relaxed", children: stateMessage })), error && (_jsxs("div", { className: "p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0 mt-0.5 text-rose-600" }), _jsx("span", { children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "reader@marcus-book-store.com", className: "w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B] focus:border-transparent text-stone-900 placeholder:text-stone-400" })] })] }), _jsxs("div", { children: [_jsx("div", { className: "flex items-center justify-between mb-1.5", children: _jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700", children: "Password" }) }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B] focus:border-transparent text-stone-900 placeholder:text-stone-400" })] })] }), _jsxs("button", { type: "submit", disabled: submitting, className: "w-full py-3 px-4 bg-[#1A382B] hover:bg-[#142D22] text-amber-50 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer", children: [_jsx(LogIn, { className: "w-4 h-4" }), _jsx("span", { children: submitting ? 'Signing In...' : 'Log In' })] })] }), _jsx("div", { className: "pt-2 border-t border-stone-100", children: _jsxs("button", { type: "button", onClick: fillDemoAccount, className: "w-full py-2 px-3 text-xs text-[#1A382B] bg-[#1A382B]/5 hover:bg-[#1A382B]/10 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium", children: [_jsx(KeyRound, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Use Demo Credentials (reader@marcus-book-store.com)" })] }) }), _jsxs("div", { className: "text-center text-xs text-stone-500 pt-2", children: ["Don\u2019t have an account?", ' ', _jsx(Link, { to: `/signup${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`, className: "font-semibold text-[#1A382B] hover:underline", children: "Create an Account" })] })] }) }));
};
