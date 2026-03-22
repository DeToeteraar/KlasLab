'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="kl-navbar">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <Link href="#top" className="navbar-brand d-flex align-items-center">
                        <Image
                            src="/assets/img/KlasLab_logo_v2.0_inverted.png"
                            alt="KlasLab logo"
                            width={128}
                            height={64}
                            priority
                            style={{ height: 'auto', maxHeight: '64px', width: 'auto' }}
                        />
                    </Link>

                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.3)',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        <span style={{ display: 'block', width: '24px', height: '2px', background: '#fff', margin: '4px 0' }} />
                        <span style={{ display: 'block', width: '24px', height: '2px', background: '#fff', margin: '4px 0' }} />
                        <span style={{ display: 'block', width: '24px', height: '2px', background: '#fff', margin: '4px 0' }} />
                    </button>

                    <div className={`navbar-collapse ${isOpen ? 'd-block' : 'd-none'} d-lg-flex`}>
                        <ul className="navbar-nav d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0 ms-lg-auto">
                            <li className="nav-item">
                                <Link href="#aanbod" className="nav-link" onClick={() => setIsOpen(false)}>
                                    Aanbod
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#werkwijze" className="nav-link" onClick={() => setIsOpen(false)}>
                                    Werkwijze
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#faq" className="nav-link" onClick={() => setIsOpen(false)}>
                                    FAQ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#kennismaking-cta" className="btn btn-accent ms-lg-3" onClick={() => setIsOpen(false)}>
                                    Kennismaking aanvragen
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
