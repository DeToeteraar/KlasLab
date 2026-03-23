'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { href: '#aanbod', label: 'Aanbod' },
        { href: '#werkwijze', label: 'Werkwijze' },
        { href: '#faq', label: 'FAQ' },
    ];

    return (
        <nav className="kl-navbar">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    <Link href="#top" className="flex items-center no-underline">
                        <Image
                            src="/assets/img/KlasLab_logo_v2.0_inverted.png"
                            alt="KlasLab logo"
                            width={128}
                            height={64}
                            priority
                            className="h-[40px] lg:h-[64px] w-auto transition-transform duration-150 hover:-translate-y-0.5"
                        />
                    </Link>

                    {/* Desktop navigatie */}
                    <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
                        {navItems.map((item) => (
                            <li key={item.href} className="list-none">
                                <Link href={item.href} className="text-kl-light/90 hover:text-kl-accent transition-colors duration-150 no-underline">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className="list-none">
                            <Link
                                href="#kennismaking-cta"
                                className="inline-block px-5 py-2.5 bg-kl-accent text-kl-ink font-medium rounded-lg hover:bg-kl-accent-hover transition-all duration-150 no-underline shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Kennismaking aanvragen
                            </Link>
                        </li>
                    </ul>

                    {/* Mobiel menu (Sheet) */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            className="lg:hidden p-2 rounded border border-white/30 bg-transparent cursor-pointer"
                            aria-label="Menu"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="block w-6 h-0.5 bg-white" />
                                <span className="block w-6 h-0.5 bg-white" />
                                <span className="block w-6 h-0.5 bg-white" />
                            </div>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-kl-ink border-kl-ink w-72">
                            <SheetTitle className="text-kl-light text-lg font-semibold mb-6">Menu</SheetTitle>
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="text-kl-light/90 hover:text-kl-accent text-lg transition-colors no-underline"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Link
                                    href="#kennismaking-cta"
                                    onClick={() => setOpen(false)}
                                    className="inline-block mt-4 px-5 py-3 bg-kl-accent text-kl-ink font-semibold rounded-lg text-center no-underline hover:bg-kl-accent-hover transition-all"
                                >
                                    Kennismaking aanvragen
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
