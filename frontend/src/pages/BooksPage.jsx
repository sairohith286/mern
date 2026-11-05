import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { BOOKS, CATEGORIES } from '../data/books';
import { BookCard } from '../components/BookCard';
export const BooksPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    // Sync state if URL query param changes
    useEffect(() => {
        const cat = searchParams.get('category') || 'all';
        setSelectedCategory(cat);
    }, [searchParams]);
    const handleSelectCategory = (catId) => {
        setSelectedCategory(catId);
        if (catId === 'all') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        }
        else {
            setSearchParams({ category: catId });
        }
    };
    const selfHelpBooks = BOOKS.filter((b) => b.category === 'self-help');
    const philosophyBooks = BOOKS.filter((b) => b.category === 'philosophy');
    const fictionBooks = BOOKS.filter((b) => b.category === 'fiction');
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12", children: [_jsxs("div", { className: "max-w-3xl space-y-3", children: [_jsx("span", { className: "text-xs font-semibold tracking-wider uppercase text-[#1A382B] font-mono", children: "The Complete Catalog" }), _jsx("h1", { className: "font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight", children: "Explore Our Book Collection" }), _jsx("p", { className: "text-stone-600 text-sm sm:text-base leading-relaxed", children: "Nine foundational masterworks carefully grouped across Self-Help, Philosophy, and Fiction. Each book offers a unique lens onto resilience, character, and imagination." })] }), _jsxs("div", { className: "border-y border-stone-200/90 py-4 flex flex-wrap items-center justify-between gap-4 bg-[#F5F1EA]/60 -mx-4 px-4 sm:mx-0 sm:px-6 rounded-xl", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-stone-600 font-medium", children: [_jsx(Filter, { className: "w-4 h-4 text-[#1A382B]" }), _jsx("span", { children: "Filter by Category:" })] }), _jsx("div", { className: "flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg", children: CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            return (_jsxs("button", { onClick: () => handleSelectCategory(cat.id), className: `px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${isActive
                                    ? 'bg-[#1A382B] text-amber-50 shadow-xs'
                                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}`, children: [cat.label, " (", cat.count, ")"] }, cat.id));
                        }) })] }), _jsxs("div", { className: "space-y-16", children: [(selectedCategory === 'all' || selectedCategory === 'self-help') && (_jsxs("section", { id: "self-help", className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-stone-200", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-xs font-mono font-medium text-stone-500 uppercase", children: "Category 1 \u00B7 3 Titles" }), _jsx("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-stone-900", children: "Self-Help Books" })] }), _jsx("p", { className: "text-xs text-stone-500 max-w-md sm:text-right", children: "Practical methodologies for personal mastery, atomic routines, and financial clarity." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: selfHelpBooks.map((book) => (_jsx(BookCard, { book: book }, book.id))) })] })), (selectedCategory === 'all' || selectedCategory === 'philosophy') && (_jsxs("section", { id: "philosophy", className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-stone-200", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-xs font-mono font-medium text-stone-500 uppercase", children: "Category 2 \u00B7 3 Titles" }), _jsx("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-stone-900", children: "Philosophy Books" })] }), _jsx("p", { className: "text-xs text-stone-500 max-w-md sm:text-right", children: "Classical ethics, Stoic journals, and existential interrogations of society and truth." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: philosophyBooks.map((book) => (_jsx(BookCard, { book: book }, book.id))) })] })), (selectedCategory === 'all' || selectedCategory === 'fiction') && (_jsxs("section", { id: "fiction", className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-stone-200", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-xs font-mono font-medium text-stone-500 uppercase", children: "Category 3 \u00B7 3 Titles" }), _jsx("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-stone-900", children: "Fiction Books" })] }), _jsx("p", { className: "text-xs text-stone-500 max-w-md sm:text-right", children: "Iconic allegories, totalitarian dystopias, and poignant tales of brotherhood and redemption." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: fictionBooks.map((book) => (_jsx(BookCard, { book: book }, book.id))) })] }))] })] }));
};
