import React from 'react';
import Link from 'next/link';

export default function BedanktPage() {
    return (
        <main className="kl-band kl-band--cream d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="container text-center">
                <div className="kl-surface p-4 mx-auto" style={{ maxWidth: '600px', padding: '3rem' }}>
                    <div className="mb-4" style={{ fontSize: '3rem' }}>&#9989;</div>
                    <h1 className="h3 mb-3">Bedankt voor je aanvraag!</h1>
                    <p className="lead mb-4">
                        Ik heb je gegevens ontvangen en neem binnen 2 werkdagen contact met je op om de kennismaking te plannen.
                    </p>
                    <div className="d-grid gap-2">
                        <Link href="/" className="btn btn-accent">
                            Terug naar de website
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
