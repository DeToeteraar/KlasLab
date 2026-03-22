'use client';

import React from 'react';

export default function KennismakingForm() {
    return (
        <div className="kl-surface p-4" style={{ maxWidth: '480px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', margin: '0 auto' }}>
            <h3 className="h5 mb-4 fw-bold" style={{ color: '#000000', textAlign: 'center' }}>Kennismaking aanvragen</h3>

            <form
                name="kennismaking"
                method="POST"
                action="/bedankt"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                <input type="hidden" name="form-name" value="kennismaking" />
                <div className="d-none">
                    <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
                </div>

                <div className="form-group-stack">
                    <div className="form-field">
                        <label htmlFor="school" className="form-label-clean">
                            SCHOOL + PLAATS <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="school"
                            name="school"
                            className="form-input-clean"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="vak" className="form-label-clean">
                            VAKSECTIE / VAK <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="vak"
                            name="vak"
                            className="form-input-clean"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="teamgrootte" className="form-label-clean">
                            TEAMGROOTTE <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            id="teamgrootte"
                            name="teamgrootte"
                            className="form-input-clean"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="doel" className="form-label-clean">
                            WAT WILLEN JULLIE BEREIKEN EN WAAROM? <span className="text-danger">*</span>
                        </label>
                        <textarea
                            id="doel"
                            name="doel"
                            className="form-input-clean"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    <div className="form-field">
                        <label htmlFor="email" className="form-label-clean">
                            E-MAILADRES <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input-clean"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="telefoon" className="form-label-clean">
                            TELEFOONNUMMER
                        </label>
                        <input
                            type="tel"
                            id="telefoon"
                            name="telefoon"
                            className="form-input-clean"
                        />
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn-submit-clean">
                            VERSTUUR
                        </button>
                        <p className="small mt-3 mb-0 text-center" style={{ color: '#999', fontSize: '0.75rem' }}>
                            Je gegevens worden alleen gebruikt om op je aanvraag te reageren.
                        </p>
                    </div>
                </div>
            </form>

            <style jsx>{`
                .form-group-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-field {
                    display: flex;
                    flex-direction: column;
                }
                .form-label-clean {
                    display: block;
                    margin-bottom: 0.6rem;
                    font-size: 0.75rem;
                    color: #999;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                }
                .form-input-clean {
                    display: block;
                    width: 100%;
                    padding: 0.85rem 1rem;
                    font-size: 1rem;
                    color: #333;
                    background-color: #f1f1f1;
                    border: none;
                    border-radius: 2px;
                    transition: background-color 0.2s;
                }
                .form-input-clean:focus {
                    background-color: #e9e9e9;
                    outline: none;
                }
                .btn-submit-clean {
                    width: 100%;
                    background-color: #16C3A5;
                    color: white;
                    padding: 1rem;
                    border: none;
                    border-radius: 4px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    transition: background-color 0.2s;
                    cursor: pointer;
                    text-transform: uppercase;
                }
                .btn-submit-clean:hover {
                    background-color: #12b49a;
                }
                .text-danger {
                    color: #ff4d4d;
                    margin-left: 2px;
                }
                textarea.form-input-clean {
                    resize: none;
                }
            `}</style>
        </div>
    );
}
