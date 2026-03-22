'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <a
            href="#top"
            className="btn btn-accent btn-scroll-top"
            onClick={scrollToTop}
            aria-label="Terug naar boven"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M6 15l6-6 6 6" />
            </svg>
        </a>
    );
}
