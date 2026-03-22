import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GoogleAnalytics from "./components/GoogleAnalytics";
import SmoothScrollAnchors from "./components/SmoothScrollAnchors";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    title: "KlasLab – Standaardwerk voor vaksecties",
    description: "KlasLab helpt vaksecties met standaardwerk: procesoverzicht, SOP's, templates en duidelijke afspraken. Eén gedeelde werkwijze die rust en voorspelbaarheid geeft.",
    metadataBase: new URL('https://www.klaslab.nl'),
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'KlasLab – Standaardwerk voor vaksecties',
        description: 'Procesoverzicht, SOP\'s, templates en afspraken voor vaksecties. Eén gedeelde werkwijze die rust en voorspelbaarheid geeft.',
        url: 'https://www.klaslab.nl',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'KlasLab – Standaardwerk voor vaksecties',
        description: 'Procesoverzicht, SOP\'s, templates en afspraken voor vaksecties.',
    },
    icons: {
        icon: '/assets/img/klaslab-logo.svg',
    },
    other: {
        'theme-color': '#111417',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl" className={cn("font-sans", geist.variable)}>
            <head>
                <link rel="canonical" href="https://www.klaslab.nl/" />
                <meta name="robots" content="index,follow,max-image-preview:large" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "@id": "https://www.klaslab.nl/#localbusiness",
                            "name": "KlasLab",
                            "url": "https://www.klaslab.nl/",
                            "logo": "https://www.klaslab.nl/assets/img/KlasLab_logo_v2.0.png",
                            "email": "info@klaslab.nl",
                            "areaServed": {
                                "@type": "Country",
                                "name": "Nederland"
                            },
                            "serviceOffered": {
                                "@type": "Service",
                                "name": "Teamworkshop Standaardwerk",
                                "description": "KlasLab helpt vaksecties met standaardwerk: procesoverzicht, SOP's, templates en duidelijke afspraken."
                            }
                        })
                    }}
                />
            </head>
            <body>
                <GoogleAnalytics />
                <SmoothScrollAnchors />
                <Navbar />
                <Hero />
                {children}
                <Footer />
                <ScrollToTop />
            </body>
        </html>
    );
}
