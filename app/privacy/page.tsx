import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacybeleid – KlasLab',
    description: 'Hoe KlasLab omgaat met je persoonsgegevens.',
};

export default function PrivacyPage() {
    return (
        <main className="py-12 lg:py-16 band-cream min-h-[60vh]">
            <div className="relative z-10 max-w-[800px] mx-auto px-4 md:px-8">
                <h1 className="text-3xl font-semibold mb-2">Privacybeleid</h1>
                <p className="text-kl-muted text-sm mb-8">Laatst bijgewerkt: maart 2026</p>

                <div className="space-y-6 text-kl-text leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Wie is verantwoordelijk?</h2>
                        <p>
                            KlasLab is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. KlasLab is gevestigd in Nederland en bereikbaar via <a href="mailto:info@klaslab.nl" className="text-kl-accent hover:text-kl-accent-hover">info@klaslab.nl</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Welke gegevens verzamelen we?</h2>
                        <p className="mb-2">We verzamelen alleen gegevens die je zelf invult via het kennismakingsformulier:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>School en plaats</li>
                            <li>Vaksectie / vak</li>
                            <li>Teamgrootte</li>
                            <li>Omschrijving van je doel</li>
                            <li>E-mailadres</li>
                            <li>Telefoonnummer (optioneel)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Waarvoor gebruiken we je gegevens?</h2>
                        <p>Uitsluitend om op je aanvraag te reageren en een kennismaking in te plannen. We gebruiken je gegevens niet voor marketing, nieuwsbrieven of andere doeleinden.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Delen met derden</h2>
                        <p>We delen je gegevens niet met derden. Je formulierinzending wordt verwerkt via Netlify Forms en opgeslagen op servers binnen de EU/VS (Netlify Inc.). Netlify verwerkt deze gegevens uitsluitend in onze opdracht.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Analytics</h2>
                        <p>We gebruiken Google Analytics 4 met geanonimiseerde IP-adressen om te begrijpen hoe bezoekers de website gebruiken. We plaatsen geen marketingcookies en bouwen geen bezoekersprofielen op.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Bewaartermijn</h2>
                        <p>We bewaren je formuliergegevens niet langer dan nodig is voor de afhandeling van je aanvraag, met een maximum van 12 maanden.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Je rechten</h2>
                        <p className="mb-2">Je hebt het recht om:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Je gegevens in te zien</li>
                            <li>Je gegevens te laten corrigeren of verwijderen</li>
                            <li>Bezwaar te maken tegen de verwerking</li>
                        </ul>
                        <p className="mt-2">Neem hiervoor contact op via <a href="mailto:info@klaslab.nl" className="text-kl-accent hover:text-kl-accent-hover">info@klaslab.nl</a>.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Vragen?</h2>
                        <p>Neem gerust contact op via <a href="mailto:info@klaslab.nl" className="text-kl-accent hover:text-kl-accent-hover">info@klaslab.nl</a>. Als je een klacht hebt over hoe we met je gegevens omgaan, kun je deze indienen bij de <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-kl-accent hover:text-kl-accent-hover">Autoriteit Persoonsgegevens</a>.</p>
                    </section>
                </div>

                <div className="mt-10">
                    <Link href="/" className="text-kl-accent hover:text-kl-accent-hover no-underline">&larr; Terug naar de website</Link>
                </div>
            </div>
        </main>
    );
}
