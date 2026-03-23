'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function KennismakingForm() {
    return (
        <Card className="max-w-[480px] mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center text-xl">Kennismaking aanvragen</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    name="kennismaking"
                    method="POST"
                    action="/bedankt"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    <input type="hidden" name="form-name" value="kennismaking" />
                    <div className="hidden">
                        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="school" className="block mb-1.5 text-xs text-kl-muted font-bold tracking-wide uppercase">
                                School + Plaats <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="school" name="school" required
                                className="w-full px-4 py-3 bg-gray-100 rounded-sm text-kl-text border-0 focus:bg-gray-200 focus:outline-none transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="vak" className="block mb-1.5 text-xs text-kl-muted font-bold tracking-wide uppercase">
                                Vaksectie / Vak <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="vak" name="vak" required
                                className="w-full px-4 py-3 bg-gray-100 rounded-sm text-kl-text border-0 focus:bg-gray-200 focus:outline-none transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="teamgrootte" className="block mb-1.5 text-xs text-kl-muted font-bold tracking-wide uppercase">
                                Teamgrootte <span className="text-red-500">*</span>
                            </label>
                            <input type="number" id="teamgrootte" name="teamgrootte" required
                                className="w-full px-4 py-3 bg-gray-100 rounded-sm text-kl-text border-0 focus:bg-gray-200 focus:outline-none transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="doel" className="block mb-1.5 text-xs text-kl-muted font-bold tracking-wide uppercase">
                                Wat willen jullie bereiken en waarom? <span className="text-red-500">*</span>
                            </label>
                            <textarea id="doel" name="doel" rows={4} required
                                className="w-full px-4 py-3 bg-gray-100 rounded-sm text-kl-text border-0 focus:bg-gray-200 focus:outline-none transition-colors resize-none" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1.5 text-xs text-kl-muted font-bold tracking-wide uppercase">
                                E-mailadres <span className="text-red-500">*</span>
                            </label>
                            <input type="email" id="email" name="email" required
                                className="w-full px-4 py-3 bg-gray-100 rounded-sm text-kl-text border-0 focus:bg-gray-200 focus:outline-none transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="telefoon" className="block mb-1.5 text-xs text-kl-muted font-bold tracking-wide uppercase">
                                Telefoonnummer
                            </label>
                            <input type="tel" id="telefoon" name="telefoon"
                                className="w-full px-4 py-3 bg-gray-100 rounded-sm text-kl-text border-0 focus:bg-gray-200 focus:outline-none transition-colors" />
                        </div>

                        <Button type="submit" className="w-full mt-2 h-auto bg-kl-accent hover:bg-kl-accent-hover text-white font-bold py-3 text-sm tracking-wider uppercase">
                            Verstuur
                        </Button>

                        <p className="text-center text-xs text-kl-muted">
                            Je gegevens worden alleen gebruikt om op je aanvraag te reageren. <a href="/privacy" className="text-kl-accent hover:text-kl-accent-hover underline">Privacybeleid</a>.
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
