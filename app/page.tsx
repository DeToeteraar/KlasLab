import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import KennismakingForm from './components/KennismakingForm';

export default function HomePage() {
    return (
        <main>
            <div id="top" aria-hidden="true"></div>

            {/* Sectie: Herkenbaar? (het probleem benoemen) */}
            <section id="herkenbaar" className="kl-band kl-band--cream">
                <div className="container">
                    <h2 className="h4 mb-3">Herkenbaar?</h2>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="h-100 p-4 border rounded kl-card">
                                <h3 className="h6 fw-semibold mb-2">Iedereen doet het anders</h3>
                                <p className="mb-0 text-muted">Elke collega heeft een eigen aanpak voor dezelfde taak. Er is geen gedeelde standaard, waardoor de kwaliteit per klas verschilt.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="h-100 p-4 border rounded kl-card">
                                <h3 className="h6 fw-semibold mb-2">Steeds opnieuw het wiel uitvinden</h3>
                                <p className="mb-0 text-muted">Toetsen, lesplannen, practicumformulieren — iedereen maakt ze zelf. Tijd en energie die je beter kunt besteden.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="h-100 p-4 border rounded kl-card">
                                <h3 className="h6 fw-semibold mb-2">Nieuwe collega&apos;s staan er alleen voor</h3>
                                <p className="mb-0 text-muted">Zonder vastgelegde werkwijze duurt het maanden voordat een nieuw teamlid op niveau is. Inwerken kost iedereen extra tijd.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sectie: Wat je krijgt (de oplossing) */}
            <section id="aanbod" className="kl-band kl-band--light">
                <div className="container">
                    <h2 className="h4 mb-3">Wat je krijgt</h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="h-100 p-4 border rounded kl-card">
                                <h3 className="h6 fw-semibold mb-2">Concrete standaarden</h3>
                                <p className="mb-3 text-muted">Geen rapport, maar direct bruikbare documenten.</p>
                                <ul className="mb-0">
                                    <li>Procesoverzicht: wie doet wat, wanneer en met welke standaard.</li>
                                    <li>2–4 SOP&apos;s als checklists voor terugkerende taken.</li>
                                    <li>Templates voor les, toets en practicum (gedeelde basis).</li>
                                    <li>Afspraken over eigenaarschap, onderhoud en onboarding.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 border rounded kl-card">
                                <h3 className="h6 fw-semibold mb-2">Merkbaar verschil in de praktijk</h3>
                                <p className="mb-3 text-muted">Minder ruis en minder opnieuw uitvinden.</p>
                                <ul className="mb-0">
                                    <li>Minder afstemming doordat basiskeuzes vooraf vastliggen.</li>
                                    <li>Sneller voorbereiden door herbruikbare formats en checklists.</li>
                                    <li>Consistentere uitvoering, ook bij vervanging of ziekte.</li>
                                    <li>Rust in piekweken door een vaste route.</li>
                                    <li>Continue verbetering: verbeter de standaard samen, dan verbetert iedereen mee.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="aanbod-cta" aria-hidden="true"></div>
                </div>
            </section>

            {/* Sectie: Werkwijze */}
            <section id="werkwijze" className="kl-band kl-band--cream">
                <div className="container">
                    <h2 className="h4 mb-3">Werkwijze</h2>
                    <Image
                        src="/assets/img/photos/workshop-notes.jpg"
                        alt="Werkvorm: afspraken en standaarden vastleggen in het team."
                        width={1400}
                        height={300}
                        className="kl-section-photo mb-3 pos-workshop"
                        loading="lazy"
                    />
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="h-100 p-4 border rounded kl-card">
                                <div className="fw-semibold mb-1">1) Kennismaking</div>
                                <div className="text-muted">Kort gesprek om focus te kiezen: welke 1–2 processen leveren jullie team nu het meeste op?</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="h-100 p-4 border rounded kl-card">
                                <div className="fw-semibold mb-1">2) Teamworkshop</div>
                                <div className="text-muted">In één sessie maken we samen het procesoverzicht en werken we SOP&apos;s en templates uit.</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="h-100 p-4 border rounded kl-card">
                                <div className="fw-semibold mb-1">3) Borging</div>
                                <div className="text-muted">We spreken eigenaarschap af: wie onderhoudt wat, hoe blijft het levend, en hoe werk je nieuwe collega&apos;s in.</div>
                            </div>
                        </div>
                    </div>
                    <div id="werkwijze-cta" aria-hidden="true"></div>
                </div>
            </section>

            {/* Sectie: Wat teams merken (resultaten / social proof) */}
            <section id="resultaten" className="kl-band kl-band--light">
                <div className="container">
                    <h2 className="h4 mb-3">Wat teams merken na de workshop</h2>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="h3 mb-2" style={{ color: 'var(--kl-accent)' }}>50%</div>
                                <div className="fw-semibold mb-1">Minder voorbereidingstijd</div>
                                <div className="text-muted">Doordat templates en checklists klaarliggen, hoef je niet meer alles zelf te bedenken.</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="h3 mb-2" style={{ color: 'var(--kl-accent)' }}>1 dag</div>
                                <div className="fw-semibold mb-1">In plaats van weken inwerken</div>
                                <div className="text-muted">Nieuwe collega&apos;s weten direct wat de werkwijze is. Alles staat beschreven en is vindbaar.</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="h3 mb-2" style={{ color: 'var(--kl-accent)' }}>Rust</div>
                                <div className="fw-semibold mb-1">In piekweken</div>
                                <div className="text-muted">Geen discussies over hoe het moet. De standaard is helder, zodat je je kunt focussen op lesgeven.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sectie: Over KlasLab */}
            <section id="over" className="kl-band kl-band--cream">
                <div className="container">
                    <h2 className="h4 mb-3">Over KlasLab</h2>
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-8">
                            <p className="lead mb-3">
                                KlasLab combineert onderwijservaring met procesdenken. Ik weet hoe druk het is in een vaksectie — en ik weet dat het beter kan zonder harder te werken.
                            </p>
                            <p className="mb-3">
                                De kern is simpel: als je team één keer goed nadenkt over <strong>hoe</strong> jullie werken, hoeft niemand dat daarna nog individueel uit te zoeken. Standaardwerk is geen bureaucratie — het is <strong>rust creëren</strong> zodat je je kunt focussen op wat ertoe doet: goed lesgeven.
                            </p>
                            <p className="mb-0">
                                Ik werk met methodes uit Lean en procesverbetering, vertaald naar de realiteit van het onderwijs. Praktisch, concreet en direct toepasbaar.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex flex-column gap-3">
                                <div className="p-4 rounded kl-surface">
                                    <div className="fw-semibold">Achtergrond</div>
                                    <div className="text-muted">Onderwijs + procesverbetering</div>
                                </div>
                                <div className="p-4 rounded kl-surface">
                                    <div className="fw-semibold">Aanpak</div>
                                    <div className="text-muted">Lean-principes, vertaald naar de klas</div>
                                </div>
                                <div className="p-4 rounded kl-surface">
                                    <div className="fw-semibold">Focus</div>
                                    <div className="text-muted">Vaksecties in het voortgezet onderwijs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sectie: FAQ */}
            <section id="faq" className="kl-band kl-band--light">
                <div className="container">
                    <h2 className="h4 mb-3">Veelgestelde vragen</h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="fw-semibold mb-1">Hoelang duurt de workshop?</div>
                                <div className="text-muted">Een halve dag (3–4 uur). Genoeg om het procesoverzicht, de eerste SOP&apos;s en templates op te leveren.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="fw-semibold mb-1">Moet het hele team erbij zijn?</div>
                                <div className="text-muted">Idealiter wel. Het doel is dat iedereen dezelfde werkwijze draagt. Minimaal 3 teamleden is een goede start.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="fw-semibold mb-1">Wat als we al documenten hebben?</div>
                                <div className="text-muted">Prima! We bouwen voort op wat er is. Vaak is het probleem niet dat er niets is, maar dat het verspreid en inconsistent is.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="fw-semibold mb-1">Waar komen jullie?</div>
                                <div className="text-muted">De workshop vindt plaats op jullie school. Startregio is Noord-Holland; daarbuiten stemmen we vooraf af.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="fw-semibold mb-1">Wat kost het?</div>
                                <div className="text-muted">De Teamworkshop Standaardwerk kost &euro;1.295 (introductieprijs). Een schoolbreed traject start vanaf &euro;5.995.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-4 rounded kl-surface kl-shadow">
                                <div className="fw-semibold mb-1">Wat is een SOP precies?</div>
                                <div className="text-muted">Een Standard Operating Procedure: een korte checklist die stap voor stap beschrijft hoe je een terugkerende taak uitvoert. Denk aan: toetsafname, practicumvoorbereiding of rapportvergadering.</div>
                            </div>
                        </div>
                    </div>
                    <div id="faq-cta" aria-hidden="true"></div>
                </div>
            </section>

            {/* Sectie: Kennismaking aanvragen */}
            <section id="kennismaking" className="kl-band kl-band--dark" style={{ background: 'var(--kl-hero-overlay)' }}>
                <div className="container">
                    <h2 className="h4 mb-2">Kennismaking aanvragen</h2>
                    <Image
                        src="/assets/img/photos/notebook-write.jpg"
                        alt="Start laagdrempelig: korte kennismaking en focus bepalen."
                        width={1400}
                        height={300}
                        className="kl-section-photo mb-3 pos-kennismaking"
                        loading="lazy"
                    />
                    <p className="mb-4 text-center">Vul het formulier in en ik neem binnen 2 werkdagen contact op om een vrijblijvende kennismaking te plannen.</p>

                    <KennismakingForm />
                    <div id="kennismaking-cta" aria-hidden="true" style={{ marginTop: '2rem' }}></div>

                    <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                        <Link href="#top" className="btn btn-outline-light flex-fill">
                            Terug naar boven
                        </Link>
                    </div>
                </div>
            </section>

            {/* Privacy */}
            <section id="privacy" className="kl-band kl-band--light">
                <div className="container">
                    <h2 className="h4 mb-2">Privacy</h2>
                    <p className="mb-2">GA4, geanonimiseerd (IP). Geen marketingcookies.</p>
                    <p className="mb-2">Formuliergegevens worden alleen gebruikt om op je aanvraag te reageren.</p>
                    <p className="mb-0 text-muted small">Vragen? Mail naar <a href="mailto:info@klaslab.nl">info@klaslab.nl</a>.</p>
                </div>
            </section>
        </main>
    );
}
