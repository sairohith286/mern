import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, CheckCircle2, ArrowLeft, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
export const CheckoutPage = () => {
    const { items, subtotal, shippingFee, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: '',
        address: '',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '',
        notes: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [placedOrder, setPlacedOrder] = useState(null);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setError(null);
        if (!formData.fullName.trim()) {
            setError('Please provide your full name for delivery.');
            return;
        }
        if (!formData.phone.trim() || formData.phone.length < 10) {
            setError('Please provide a valid 10-digit mobile number.');
            return;
        }
        if (!formData.address.trim()) {
            setError('Please provide your street delivery address.');
            return;
        }
        if (!formData.city.trim()) {
            setError('Please specify your city.');
            return;
        }
        if (!formData.pinCode.trim() || formData.pinCode.length < 6) {
            setError('Please enter a valid 6-digit postal PIN code.');
            return;
        }
        setSubmitting(true);
        const orderNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
        const newOrder = {
            id: `ord_${Date.now()}`,
            orderNumber,
            items: [...items],
            subtotal,
            shippingFee,
            totalAmount,
            shippingAddress: formData,
            createdAt: new Date().toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            estimatedDelivery: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            }),
        };
        // Save to LocalStorage
        try {
            const existing = localStorage.getItem('marcus-book-store_orders');
            const orderList = existing ? JSON.parse(existing) : [];
            localStorage.setItem('marcus-book-store_orders', JSON.stringify([newOrder, ...orderList]));
        }
        catch (err) {
            console.error('Error saving order', err);
        }
        setPlacedOrder(newOrder);
        clearCart();
        setSubmitting(false);
    };
    // If order just placed, show confirmation screen
    if (placedOrder) {
        return (_jsx("div", { className: "max-w-3xl mx-auto px-4 py-16 sm:py-20", children: _jsxs("div", { className: "bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center", children: _jsx(CheckCircle2, { className: "w-10 h-10" }) }), _jsx("span", { className: "text-xs uppercase tracking-widest text-emerald-800 font-mono font-bold", children: "Order Confirmed & Preparing" }), _jsx("h1", { className: "font-serif text-3xl sm:text-4xl font-bold text-stone-900", children: "Thank You for Your Order!" }), _jsx("p", { className: "text-sm text-stone-600 max-w-md mx-auto", children: "Your books are being carefully wrapped in protective parcel paper. An electronic receipt has been created for your records." })] }), _jsxs("div", { className: "bg-[#FAF5ED] border border-[#E8DEC9] rounded-2xl p-6 space-y-4 text-xs sm:text-sm", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2D5C3]", children: [_jsxs("div", { children: [_jsx("span", { className: "text-stone-500 block text-[11px] uppercase tracking-wider font-mono", children: "Order Number" }), _jsx("span", { className: "font-bold text-stone-900 font-mono text-sm", children: placedOrder.orderNumber })] }), _jsxs("div", { children: [_jsx("span", { className: "text-stone-500 block text-[11px] uppercase tracking-wider font-mono", children: "Estimated Delivery" }), _jsx("span", { className: "font-bold text-[#1A382B] font-mono text-sm", children: placedOrder.estimatedDelivery })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("span", { className: "text-[11px] uppercase tracking-wider text-stone-500 font-mono font-bold block", children: ["Purchased Titles (", placedOrder.items.length, ")"] }), _jsx("div", { className: "divide-y divide-[#EADFCF]", children: placedOrder.items.map((it) => (_jsxs("div", { className: "py-2.5 flex items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: it.book.coverImage, alt: it.book.title, referrerPolicy: "no-referrer", className: "w-8 h-11 object-cover rounded shadow-2xs border border-stone-200" }), _jsxs("div", { children: [_jsx("h4", { className: "font-serif font-bold text-stone-900 text-xs sm:text-sm", children: it.book.title }), _jsxs("span", { className: "text-stone-500 text-[11px]", children: ["Qty: ", it.quantity, " \u00D7 \u20B9", it.book.price] })] })] }), _jsxs("span", { className: "font-mono font-bold text-stone-800 tabular-nums", children: ["\u20B9", it.book.price * it.quantity] })] }, it.book.id))) })] }), _jsxs("div", { className: "pt-3 border-t border-[#E2D5C3] space-y-1.5 text-xs", children: [_jsxs("div", { className: "flex justify-between text-stone-600", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { className: "font-mono tabular-nums", children: ["\u20B9", placedOrder.subtotal] })] }), _jsxs("div", { className: "flex justify-between text-stone-600", children: [_jsx("span", { children: "Delivery" }), _jsx("span", { className: "font-mono tabular-nums", children: placedOrder.shippingFee === 0 ? 'FREE' : `₹${placedOrder.shippingFee}` })] }), _jsxs("div", { className: "flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-[#E2D5C3]", children: [_jsx("span", { children: "Total Paid" }), _jsxs("span", { className: "font-mono tabular-nums text-[#1A382B]", children: ["\u20B9", placedOrder.totalAmount] })] })] }), _jsxs("div", { className: "pt-3 border-t border-[#E2D5C3] text-stone-600 text-xs", children: [_jsx("span", { className: "text-[11px] uppercase tracking-wider text-stone-500 font-mono font-bold block mb-1", children: "Delivering To" }), _jsx("p", { className: "font-medium text-stone-900", children: placedOrder.shippingAddress.fullName }), _jsx("p", { children: placedOrder.shippingAddress.address }), _jsxs("p", { children: [placedOrder.shippingAddress.city, ", ", placedOrder.shippingAddress.state, " \u2013 ", placedOrder.shippingAddress.pinCode] }), _jsxs("p", { className: "text-stone-500 mt-1", children: ["Contact: ", placedOrder.shippingAddress.phone] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 pt-2", children: [_jsx(Link, { to: "/books", className: "w-full sm:w-auto px-6 py-3 bg-[#1A382B] hover:bg-[#142D22] text-amber-50 text-xs font-semibold rounded-lg transition-colors text-center shadow-xs", children: "Continue Browsing Books" }), _jsx(Link, { to: "/", className: "w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors text-center", children: "Return to Homepage" })] })] }) }));
    }
    // If cart is empty and no placed order
    if (items.length === 0) {
        return (_jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center space-y-4", children: [_jsx("h2", { className: "font-serif text-2xl font-bold text-stone-900", children: "No items in cart to checkout" }), _jsx("p", { className: "text-stone-600 text-sm", children: "Please add books to your shopping cart before initiating checkout." }), _jsxs(Link, { to: "/books", className: "inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A382B] text-amber-50 text-xs font-semibold rounded-lg", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Browse Collection" })] })] }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/cart", className: "inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#1A382B] mb-2", children: [_jsx(ArrowLeft, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Back to Shopping Cart" })] }), _jsx("h1", { className: "font-serif text-3xl font-bold text-stone-900", children: "Checkout & Shipping" }), _jsx("p", { className: "text-xs text-stone-500 mt-0.5", children: "Step 2 of 2: Shipping details and order verification" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start", children: [_jsxs("div", { className: "lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs", children: [_jsx("h2", { className: "font-serif text-xl font-bold text-stone-900 pb-3 border-b border-stone-200", children: "Delivery Address" }), error && (_jsx("div", { className: "mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800", children: error })), _jsxs("form", { onSubmit: handlePlaceOrder, className: "mt-6 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Recipient Name *" }), _jsx("input", { type: "text", name: "fullName", value: formData.fullName, onChange: handleChange, required: true, placeholder: "Full Name", className: "w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Mobile Number *" }), _jsx("input", { type: "tel", name: "phone", value: formData.phone, onChange: handleChange, required: true, placeholder: "+91 98765 43210", className: "w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "Street Address *" }), _jsx("textarea", { name: "address", rows: 2, value: formData.address, onChange: handleChange, required: true, placeholder: "House / Flat No., Apartment, Street, Landmark", className: "w-full px-3.5 py-2 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "City *" }), _jsx("input", { type: "text", name: "city", value: formData.city, onChange: handleChange, required: true, className: "w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "State *" }), _jsx("input", { type: "text", name: "state", value: formData.state, onChange: handleChange, required: true, className: "w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5", children: "PIN Code *" }), _jsx("input", { type: "text", name: "pinCode", value: formData.pinCode, onChange: handleChange, required: true, placeholder: "560001", maxLength: 6, className: "w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]" })] })] }), _jsxs("div", { className: "pt-4 border-t border-stone-200", children: [_jsx("label", { className: "block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2", children: "Demonstration Payment Mode" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [_jsxs("label", { onClick: () => setPaymentMethod('cod'), className: `p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${paymentMethod === 'cod'
                                                            ? 'border-[#1A382B] bg-[#1A382B]/5 font-semibold text-stone-900'
                                                            : 'border-stone-200 bg-stone-50 text-stone-700'}`, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Truck, { className: "w-4 h-4 text-[#1A382B]" }), _jsx("span", { className: "text-xs", children: "Cash on Delivery (COD)" })] }), _jsx("span", { className: "w-4 h-4 rounded-full border border-[#1A382B] flex items-center justify-center", children: paymentMethod === 'cod' && (_jsx("span", { className: "w-2 h-2 rounded-full bg-[#1A382B]" })) })] }), _jsxs("label", { onClick: () => setPaymentMethod('upi'), className: `p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${paymentMethod === 'upi'
                                                            ? 'border-[#1A382B] bg-[#1A382B]/5 font-semibold text-stone-900'
                                                            : 'border-stone-200 bg-stone-50 text-stone-700'}`, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(PackageCheck, { className: "w-4 h-4 text-[#1A382B]" }), _jsx("span", { className: "text-xs", children: "Direct UPI Demo Confirmation" })] }), _jsx("span", { className: "w-4 h-4 rounded-full border border-[#1A382B] flex items-center justify-center", children: paymentMethod === 'upi' && (_jsx("span", { className: "w-2 h-2 rounded-full bg-[#1A382B]" })) })] })] }), _jsx("p", { className: "text-[11px] text-stone-500 mt-2", children: "* Demonstration bookstore: no real monetary charge is levied. Your order will be confirmed immediately." })] }), _jsx("div", { className: "pt-4", children: _jsxs("button", { type: "submit", disabled: submitting, className: "w-full py-3.5 px-4 bg-[#1A382B] hover:bg-[#142D22] text-amber-50 font-semibold text-xs tracking-wider uppercase rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer", children: [_jsx(PackageCheck, { className: "w-4 h-4" }), _jsx("span", { children: submitting ? 'Confirming Order...' : `Confirm & Place Order (₹${totalAmount})` })] }) })] })] }), _jsxs("div", { className: "lg:col-span-5 bg-[#FAF5ED] border border-[#E8DEC9] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-xs", children: [_jsxs("h3", { className: "font-serif text-xl font-bold text-stone-900 border-b border-[#E2D5C3] pb-3", children: ["Review Order (", items.length, " ", items.length === 1 ? 'Title' : 'Titles', ")"] }), _jsx("div", { className: "divide-y divide-[#EADFCF] max-h-72 overflow-y-auto pr-1", children: items.map((item) => (_jsxs("div", { className: "py-3 flex items-center justify-between gap-3 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [_jsx("img", { src: item.book.coverImage, alt: item.book.title, referrerPolicy: "no-referrer", className: "w-10 h-14 object-cover rounded shadow-2xs shrink-0" }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-serif font-bold text-stone-900 truncate", children: item.book.title }), _jsxs("p", { className: "text-stone-500 text-[11px]", children: ["Qty: ", item.quantity, " \u00D7 \u20B9", item.book.price] })] })] }), _jsxs("span", { className: "font-mono font-bold text-stone-800 tabular-nums shrink-0", children: ["\u20B9", item.book.price * item.quantity] })] }, item.book.id))) }), _jsxs("div", { className: "space-y-2 pt-2 border-t border-[#E2D5C3] text-xs", children: [_jsxs("div", { className: "flex justify-between text-stone-600", children: [_jsx("span", { children: "Items Subtotal" }), _jsxs("span", { className: "font-mono tabular-nums font-semibold", children: ["\u20B9", subtotal] })] }), _jsxs("div", { className: "flex justify-between text-stone-600", children: [_jsx("span", { children: "Standard Delivery" }), _jsx("span", { className: "font-mono tabular-nums", children: shippingFee === 0 ? 'FREE' : `₹${shippingFee}` })] }), _jsxs("div", { className: "flex justify-between font-bold text-stone-900 text-base pt-2 border-t border-[#E2D5C3]", children: [_jsx("span", { children: "Final Total" }), _jsxs("span", { className: "font-mono text-xl tabular-nums text-[#1A382B]", children: ["\u20B9", totalAmount] })] })] }), _jsxs("div", { className: "p-3 bg-white/70 rounded-lg border border-[#E2D5C3] text-[11px] text-stone-600 space-y-1", children: [_jsxs("div", { className: "font-semibold text-stone-800 flex items-center gap-1.5", children: [_jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-[#1A382B]" }), _jsx("span", { children: "MARCUS BOOK STORE Buyer Assurance" })] }), _jsx("p", { children: "Genuine publishers prints only. 7-day hassle-free exchange on damaged book parcels." })] })] })] })] }));
};
