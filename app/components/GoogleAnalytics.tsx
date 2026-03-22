'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-DNRF8RCDGQ"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DNRF8RCDGQ', {
            anonymize_ip: true
          });
        `}
            </Script>
        </>
    );
}
