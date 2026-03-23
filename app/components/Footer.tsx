import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <section className="band-dark py-10">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <Separator className="mb-6 bg-white/10" />
                <footer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="flex items-center gap-3">
                            <Link href="#top" aria-label="KlasLab home" className="no-underline">
                                <Image
                                    src="/assets/img/KlasLab_logo_v2.0_inverted.png"
                                    alt="KlasLab logo"
                                    width={80}
                                    height={40}
                                    className="h-[32px] lg:h-[40px] w-auto transition-transform duration-150 hover:-translate-y-0.5"
                                />
                            </Link>
                            <div>
                                <div className="font-semibold text-kl-light">KlasLab</div>
                                <div className="text-kl-light/70 text-sm">Standaardwerk voor vaksecties.</div>
                            </div>
                        </div>
                        <div className="md:text-right flex flex-col md:items-end gap-2">
                            <div className="flex flex-wrap gap-4">
                                <Link href="#top" className="text-kl-light/90 hover:text-kl-accent transition-colors no-underline">
                                    Naar boven
                                </Link>
                                <Link href="/privacy" className="text-kl-light/90 hover:text-kl-accent transition-colors no-underline">
                                    Privacy
                                </Link>
                                <a href="mailto:info@klaslab.nl" className="text-kl-light/90 hover:text-kl-accent transition-colors no-underline inline-flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="stroke-current fill-none">
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <polyline points="3 7 12 13 21 7" />
                                    </svg>
                                    info@klaslab.nl
                                </a>
                            </div>
                            <div className="text-kl-light/50 text-sm">&copy; {currentYear} KlasLab</div>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
}
