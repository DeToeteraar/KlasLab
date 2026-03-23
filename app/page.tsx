import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import KennismakingForm from './components/KennismakingForm';

export default function HomePage() {
    return (
        <main>
            <div id="top" aria-hidden="true"></div>

            {/* Herkenbaar? */}
            <section id="herkenbaar" className="py-12 lg:py-16 band-cream">
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Herkenbaar?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Iedereen doet het anders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-kl-muted text-sm">Elke collega heeft een eigen aanpak voor dezelfde taak. Er is geen gedeelde standaard, waardoor de kwaliteit per klas verschilt.</p>
                            </CardContent>
                        </Card>
                        <Card className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Steeds opnieuw het wiel uitvinden</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-kl-muted text-sm">Toetsen, lesplannen, practicumformulieren — iedereen maakt ze zelf. Tijd en energie die je beter kunt besteden.</p>
                            </CardContent>
                        </Card>
                        <Card className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Nieuwe collega&apos;s staan er alleen voor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-kl-muted text-sm">Zonder vastgelegde werkwijze duurt het maanden voordat een nieuw teamlid op niveau is. Inwerken kost iedereen extra tijd.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Wat je krijgt */}
            <section id="aanbod" className="py-12 lg:py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Wat je krijgt</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Concrete standaarden</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-kl-muted text-sm mb-3">Geen rapport, maar direct bruikbare documenten.</p>
                                <ul className="text-sm space-y-1 pl-4 list-disc text-kl-text">
                                    <li>Procesoverzicht: wie doet wat, wanneer en met welke standaard.</li>
                                    <li>2–4 SOP&apos;s als checklists voor terugkerende taken.</li>
                                    <li>Templates voor les, toets en practicum (gedeelde basis).</li>
                                    <li>Afspraken over eigenaarschap, onderhoud en onboarding.</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Merkbaar verschil in de praktijk</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-kl-muted text-sm mb-3">Minder ruis en minder opnieuw uitvinden.</p>
                                <ul className="text-sm space-y-1 pl-4 list-disc text-kl-text">
                                    <li>Minder afstemming doordat basiskeuzes vooraf vastliggen.</li>
                                    <li>Sneller voorbereiden door herbruikbare formats en checklists.</li>
                                    <li>Consistentere uitvoering, ook bij vervanging of ziekte.</li>
                                    <li>Rust in piekweken door een vaste route.</li>
                                    <li>Continue verbetering: verbeter de standaard samen, dan verbetert iedereen mee.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div id="aanbod-cta" aria-hidden="true"></div>
                </div>
            </section>

            {/* Werkwijze */}
            <section id="werkwijze" className="py-12 lg:py-16 band-cream">
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Werkwijze</h2>
                    <Image
                        src="/assets/img/photos/workshop-notes.jpg"
                        alt="Werkvorm: afspraken en standaarden vastleggen in het team."
                        width={1400}
                        height={300}
                        className="kl-section-photo mb-6 pos-workshop"
                        loading="lazy"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { step: '1', title: 'Kennismaking', desc: 'Kort gesprek om focus te kiezen: welke 1–2 processen leveren jullie team nu het meeste op?' },
                            { step: '2', title: 'Teamworkshop', desc: "In één sessie maken we samen het procesoverzicht en werken we SOP's en templates uit." },
                            { step: '3', title: 'Borging', desc: "We spreken eigenaarschap af: wie onderhoudt wat, hoe blijft het levend, en hoe werk je nieuwe collega's in." },
                        ].map((item) => (
                            <Card key={item.step} className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-kl-accent text-kl-ink font-bold text-sm">{item.step}</span>
                                        <span className="font-semibold text-kl-text">{item.title}</span>
                                    </div>
                                    <p className="text-kl-muted text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div id="werkwijze-cta" aria-hidden="true"></div>
                </div>
            </section>

            {/* Resultaten */}
            <section id="resultaten" className="py-12 lg:py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Wat teams merken na de workshop</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { stat: '50%', title: 'Minder voorbereidingstijd', desc: 'Doordat templates en checklists klaarliggen, hoef je niet meer alles zelf te bedenken.' },
                            { stat: '1 dag', title: 'In plaats van weken inwerken', desc: "Nieuwe collega's weten direct wat de werkwijze is. Alles staat beschreven en is vindbaar." },
                            { stat: 'Rust', title: 'In piekweken', desc: 'Geen discussies over hoe het moet. De standaard is helder, zodat je je kunt focussen op lesgeven.' },
                        ].map((item) => (
                            <Card key={item.stat} className="border-kl-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                                <CardContent className="pt-6">
                                    <div className="text-3xl font-bold text-kl-accent mb-2">{item.stat}</div>
                                    <div className="font-semibold text-kl-text mb-1">{item.title}</div>
                                    <p className="text-kl-muted text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Over KlasLab */}
            <section id="over" className="py-12 lg:py-16 band-cream">
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Over KlasLab</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2">
                            <p className="text-lg font-light mb-4">
                                KlasLab combineert onderwijservaring met procesdenken. Ik weet hoe druk het is in een vaksectie — en ik weet dat het beter kan zonder harder te werken.
                            </p>
                            <p className="mb-4 text-kl-text">
                                De kern is simpel: als je team één keer goed nadenkt over <strong>hoe</strong> jullie werken, hoeft niemand dat daarna nog individueel uit te zoeken. Standaardwerk is geen bureaucratie — het is <strong>rust creëren</strong> zodat je je kunt focussen op wat ertoe doet: goed lesgeven.
                            </p>
                            <p className="text-kl-text">
                                Ik werk met methodes uit Lean en procesverbetering, vertaald naar de realiteit van het onderwijs. Praktisch, concreet en direct toepasbaar.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[
                                { title: 'Achtergrond', desc: 'Onderwijs + procesverbetering' },
                                { title: 'Aanpak', desc: 'Lean-principes, vertaald naar de klas' },
                                { title: 'Focus', desc: 'Vaksecties in het voortgezet onderwijs' },
                            ].map((item) => (
                                <Card key={item.title} className="border-kl-border shadow-sm">
                                    <CardContent className="pt-4 pb-4">
                                        <div className="font-semibold text-kl-text">{item.title}</div>
                                        <div className="text-kl-muted text-sm">{item.desc}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ — Accordion */}
            <section id="faq" className="py-12 lg:py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Veelgestelde vragen</h2>
                    <div className="max-w-[800px]">
                        <Accordion className="space-y-2">
                            {[
                                { q: 'Hoelang duurt de workshop?', a: "Een halve dag (3–4 uur). Genoeg om het procesoverzicht, de eerste SOP's en templates op te leveren." },
                                { q: 'Moet het hele team erbij zijn?', a: 'Idealiter wel. Het doel is dat iedereen dezelfde werkwijze draagt. Minimaal 3 teamleden is een goede start.' },
                                { q: 'Wat als we al documenten hebben?', a: 'Prima! We bouwen voort op wat er is. Vaak is het probleem niet dat er niets is, maar dat het verspreid en inconsistent is.' },
                                { q: 'Waar komen jullie?', a: 'De workshop vindt plaats op jullie school. Startregio is Noord-Holland; daarbuiten stemmen we vooraf af.' },
                                { q: 'Wat kost het?', a: 'De Teamworkshop Standaardwerk kost €1.295 (introductieprijs). Een schoolbreed traject start vanaf €5.995.' },
                                { q: 'Wat is een SOP precies?', a: 'Een Standard Operating Procedure: een korte checklist die stap voor stap beschrijft hoe je een terugkerende taak uitvoert. Denk aan: toetsafname, practicumvoorbereiding of rapportvergadering.' },
                            ].map((item, i) => (
                                <AccordionItem key={i} value={`faq-${i}`} className="border border-kl-border rounded-xl px-4 bg-white shadow-sm">
                                    <AccordionTrigger className="font-semibold text-kl-text text-left hover:no-underline">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-kl-muted">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div id="faq-cta" aria-hidden="true"></div>
                </div>
            </section>

            {/* Kennismaking aanvragen */}
            <section id="kennismaking" className="py-12 lg:py-16 band-dark">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-semibold mb-3 text-kl-light">Kennismaking aanvragen</h2>
                    <Image
                        src="/assets/img/photos/notebook-write.jpg"
                        alt="Start laagdrempelig: korte kennismaking en focus bepalen."
                        width={1400}
                        height={300}
                        className="kl-section-photo mb-6 pos-kennismaking"
                        loading="lazy"
                    />
                    <p className="mb-6 text-center text-kl-light/80">Vul het formulier in en ik neem binnen 2 werkdagen contact op om een vrijblijvende kennismaking te plannen.</p>

                    <KennismakingForm />
                    <div id="kennismaking-cta" aria-hidden="true" className="mt-8"></div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Link href="#top" className="flex-1 inline-block px-5 py-3 text-center rounded-lg bg-transparent text-kl-light border border-kl-light/50 hover:bg-kl-light/95 hover:text-kl-ink transition-all duration-150 no-underline">
                            Terug naar boven
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
