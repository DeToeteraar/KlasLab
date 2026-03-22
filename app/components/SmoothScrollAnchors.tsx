'use client';

import { useEffect } from 'react';

export default function SmoothScrollAnchors() {
    useEffect(() => {
        const DEFAULT_SCROLL_OFFSET_FROM_BOTTOM = 50;
        const CTA_SCROLL_OFFSET_FROM_BOTTOM = 100;

        function bindBottomAnchorScroll(anchorId: string, offsetFromBottom = DEFAULT_SCROLL_OFFSET_FROM_BOTTOM) {
            document.querySelectorAll(`a[href="#${anchorId}"]`).forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    const target = document.getElementById(anchorId);
                    if (!target) return;

                    const rect = target.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    const scrollTop =
                        window.pageYOffset +
                        rect.top -
                        (viewportHeight - offsetFromBottom);

                    window.scrollTo({
                        top: scrollTop,
                        behavior: 'smooth'
                    });
                });
            });
        }

        bindBottomAnchorScroll('kennismaking-cta', CTA_SCROLL_OFFSET_FROM_BOTTOM);
        bindBottomAnchorScroll('aanbod-cta');
        bindBottomAnchorScroll('werkwijze-cta');
        bindBottomAnchorScroll('faq-cta');
    }, []);

    return null;
}
