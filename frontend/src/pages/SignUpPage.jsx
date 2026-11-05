import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, AlertCircle, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const SignUpPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        if (!name.trim()) {
            setError('Please enter your full name.');
            return;
        }
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address (e.g., alex@example.com).');
            return;
        }
        if (!password) {
            setError('Please create a password.');
            return;
        }
        if (password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please re-enter carefully.');
            return;
        }
        setSubmitting(true);
        const result = register(name, email, password);
        setSubmitting(false);
        if (result.success) {
            navigate(redirectPath, { replace: true });
        }
        else {
            setError(result.error || 'Failed to create account.');
        }
    };
    return (_jsx("div", { className: "max-w-md mx-auto px-4 py-16 sm:py-20", children: _jsxs("div", { className: "bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "w-10 h-10 mx-auto rounded-lg bg-[#1A382B] text-amber-100 flex items-center justify-center", children: _jsx(BookOpen, { className: "w-5 h-5" }) }), _jsx("h1", { className: "font-serif text-2xl sm:text-3xl font-bold text-stone-900", children: "Create an Account" }), _jsx("p", { className: "text-xs sm:text-sm text-stone-500", children: "Join MARCUS BOOK STORE to curate your personal reading list and track deliveries." })] }), error && (_jsxs("div", { className: "p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0 mt-0.5 text-rose-600" }), _jsx("span", { children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Rohan Varma", className: "w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B] focus:border-transparent text-stone-900 placeholder:text-stone-400" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "rohan@example.com", className: "w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B] focus:border-transparent text-stone-900 placeholder:text-stone-400" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Minimum 6 characters", className: "w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B] focus:border-transparent text-stone-900 placeholder:text-stone-400" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Re-enter password", className: "w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B] focus:border-transparent text-stone-900 placeholder:text-stone-400" })] })] }), _jsxs("button", { type: "submit", disabled: submitting, className: "w-full py-3 px-4 bg-[#1A382B] hover:bg-[#142D22] text-amber-50 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { children: submitting ? 'Creating Account...' : 'Create Account' })] })] }), _jsxs("div", { className: "text-center text-xs text-stone-500 pt-2 border-t border-stone-100", children: ["Already have an account?", ' ', _jsx(Link, { to: `/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`, className: "font-semibold text-[#1A382B] hover:underline", children: "Sign In" })] })] }) }));
};
