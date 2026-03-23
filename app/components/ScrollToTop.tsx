'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setIsVisible(window.scrollY > 200);
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    if (!isVisible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-scroll-top"
            aria-label="Terug naar boven"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 15l6-6 6 6" />
            </svg>
        </button>
    );
}
