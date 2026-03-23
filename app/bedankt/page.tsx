import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BedanktPage() {
    return (
        <main className="py-12 lg:py-16 band-cream min-h-[80vh] flex items-center justify-center">
            <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 text-center">
                <Card className="max-w-[600px] mx-auto shadow-lg">
                    <CardContent className="pt-8 pb-8 px-8">
                        <div className="text-5xl mb-4">&#9989;</div>
                        <h1 className="text-2xl font-semibold mb-3">Bedankt voor je aanvraag!</h1>
                        <p className="text-lg font-light mb-6 text-kl-muted">
                            Ik heb je gegevens ontvangen en neem binnen 2 werkdagen contact met je op om de kennismaking te plannen.
                        </p>
                        <Link href="/" className="block w-full px-5 py-3 bg-kl-accent hover:bg-kl-accent-hover text-white font-semibold rounded-lg text-center no-underline transition-all duration-150">
                            Terug naar de website
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
