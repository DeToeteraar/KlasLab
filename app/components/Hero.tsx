import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
    return (
        <header className="hero">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 text-kl-light">
                        <Badge className="mb-4 bg-kl-accent/20 text-kl-accent border-kl-accent/30 hover:bg-kl-accent/30 uppercase tracking-wider text-xs font-semibold">
                            Voor vaksecties in het voortgezet onderwijs
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-kl-light leading-tight">
                            Eén gedeelde werkwijze.<br />Minder chaos, meer rust.
                        </h1>
                        <p className="text-lg md:text-xl font-light mb-4 text-kl-light/90">
                            Samen met je team zetten we jullie werkwijze om in een helder procesoverzicht, concrete checklists en gedeelde templates. Zodat iedereen weet wat de standaard is — en niemand het wiel opnieuw hoeft uit te vinden.
                        </p>
                        <p className="mb-6 text-kl-light/70">Reactie binnen 2 werkdagen • vrijblijvende kennismaking</p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="#kennismaking-cta"
                                className="inline-block px-6 py-3 bg-kl-accent text-kl-ink font-medium rounded-lg shadow-lg hover:bg-kl-accent-hover hover:-translate-y-0.5 transition-all duration-150 no-underline"
                            >
                                Plan een kennismaking
                            </Link>
                            <Link
                                href="#aanbod-cta"
                                className="inline-block px-6 py-3 bg-transparent text-kl-light border border-kl-light/50 rounded-lg hover:bg-kl-light/95 hover:text-kl-ink transition-all duration-150 no-underline"
                            >
                                Bekijk wat je krijgt
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-kl-border">
                            <h2 className="text-lg font-semibold mb-2 text-kl-text">Teamworkshop Standaardwerk</h2>
                            <p className="mb-4 text-kl-muted">Voor vaksecties • procesoverzicht + SOP&apos;s + templates + afspraken</p>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold text-kl-text">&euro;1.295</span>
                                <Badge variant="secondary" className="text-kl-muted">introductieprijs</Badge>
                            </div>
                            <Link
                                href="#kennismaking-cta"
                                className="block w-full px-5 py-3 bg-kl-accent text-kl-ink font-semibold rounded-lg text-center shadow-md hover:bg-kl-accent-hover hover:-translate-y-0.5 transition-all duration-150 no-underline"
                            >
                                Kennismaking aanvragen
                            </Link>
                            <p className="text-kl-muted text-sm mt-3 text-center">Schooltraject (optioneel): vanaf &euro;5.995.</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
