
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Compass,
    Award,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

import aboutImage from '../assets/images/about_reading_sanctuary_1793530462404.jpg';

export const AboutPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">

            {/* About Header */}
            <div className="max-w-3xl space-y-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#1A382B] font-mono">
                    About MARCUS BOOK STORE
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    A Sanctuary for Ideas, Literature & Lifelong Growth
                </h1>

                <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                    Founded with a quiet conviction: that in a world of fleeting attention spans and endless digital noise, physical books remain humanity’s most intimate and enduring technology for deep understanding.
                </p>
            </div>

            {/* About Image and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                <div className="lg:col-span-7 relative">
                    <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                        <img
                            src={aboutImage}
                            alt="Cozy reading room with open books and warm lamplight"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-lg border border-stone-200/90 max-w-xs">
                        <span className="text-xs uppercase font-mono text-[#1A382B] font-bold block">
                            Curator’s Creed
                        </span>

                        <p className="text-xs text-stone-600 italic mt-1">
                            “We don’t stock every title ever published. We stock the ones that change how you think.”
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                        Promoting Reading, Knowledge, Imagination & Personal Growth
                    </h2>

                    <p className="text-sm text-stone-600 leading-relaxed">
                        At MARCUS BOOK STORE, we believe that reading is neither a luxury nor a chore — it is an active dialogue with history’s sharpest thinkers, bravest storytellers, and profoundest mentors.
                    </p>

                    <p className="text-sm text-stone-600 leading-relaxed">
                        When you open a book from our shelves, you are not merely consuming text; you are investing in mental resilience, emotional empathy, and creative clarity. We aim to spark a renewed appreciation for slow, reflective reading across communities.
                    </p>

                    <div className="pt-2">
                        <Link
                            to="/books"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A382B] hover:bg-[#142D22] text-amber-50 text-xs font-semibold rounded-lg transition-colors shadow-xs"
                        >
                            <span>Explore Our Books</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mission and Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-[#FAF5ED] border border-[#E8DEC9] rounded-2xl p-8 sm:p-10 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1A382B] text-amber-100 flex items-center justify-center">
                        <Compass className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                        Our Mission
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed">
                        To inspire and empower individuals by making thoughtfully curated, high-quality literature accessible. We exist to guide readers toward books that cultivate genuine habits, sharpen philosophical inquiry, and awaken deep imaginative possibilities.
                    </p>
                </div>

                <div className="bg-[#FAF5ED] border border-[#E8DEC9] rounded-2xl p-8 sm:p-10 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1A382B] text-amber-100 flex items-center justify-center">
                        <Award className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                        Our Vision
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed">
                        To become a trusted literary haven known for editorial honesty and uncompromising curation — nurturing a nationwide generation of lifelong readers who cherish wisdom, critical thinking, and artistic depth.
                    </p>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-8 bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-12 shadow-xs">

                <div className="max-w-2xl">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1A382B] font-mono">
                        Uncompromising Standards
                    </span>

                    <h3 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                        Why Choose MARCUS BOOK STORE?
                    </h3>

                    <p className="text-xs text-stone-500 mt-2">
                        The difference between an automated warehouse and a dedicated bookstore.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#1A382B]">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <h4 className="font-serif font-bold text-base text-stone-900">
                                Rigorous Editorial Selection
                            </h4>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                            Every single volume in our collection has been vetted for lasting relevance. You will find foundational masterworks, not transient trends.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#1A382B]">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <h4 className="font-serif font-bold text-base text-stone-900">
                                Collector-Grade Editions
                            </h4>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                            We work directly with premier publishing houses to provide authentic prints, sturdy bindings, and readable typography that last for generations.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#1A382B]">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <h4 className="font-serif font-bold text-base text-stone-900">
                                Careful Book Parcel Dispatch
                            </h4>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                            Books are treated with reverence. Each parcel is wrapped in eco-friendly packaging and delivered safely to doorsteps across India.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};
