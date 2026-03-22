import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <header id="hero" className="hero">
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-8 hero-copy">
                        <p className="small mb-2" style={{ color: 'var(--kl-accent)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Voor vaksecties in het voortgezet onderwijs</p>
                        <h1 className="display-5 fw-bold mb-2">Eén gedeelde werkwijze.<br />Minder chaos, meer rust.</h1>
                        <p className="lead mb-3">Samen met je team zetten we jullie werkwijze om in een helder procesoverzicht, concrete checklists en gedeelde templates. Zodat iedereen weet wat de standaard is — en niemand het wiel opnieuw hoeft uit te vinden.</p>
                        <p className="mb-4">Reactie binnen 2 werkdagen • vrijblijvende kennismaking</p>
                        <div className="d-flex flex-wrap gap-2">
                            <Link href="#kennismaking-cta" className="btn btn-accent">
                                Plan een kennismaking
                            </Link>
                            <Link href="#aanbod-cta" className="btn btn-outline-light">
                                Bekijk wat je krijgt
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="p-4 rounded kl-card kl-shadow">
                            <h2 className="h5 mb-2">Teamworkshop Standaardwerk</h2>
                            <p className="mb-3">Voor vaksecties • procesoverzicht + SOP&apos;s + templates + afspraken</p>
                            <div className="d-flex align-items-baseline gap-2 mb-3">
                                <div className="h3 mb-0">&euro;1.295</div>
                                <div className="text-muted">introductieprijs</div>
                            </div>
                            <Link href="#kennismaking-cta" className="btn btn-accent w-100">
                                Kennismaking aanvragen
                            </Link>
                            <div className="text-muted small mt-2">Schooltraject (optioneel): vanaf &euro;5.995.</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
