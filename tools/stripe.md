# Stripe

## Wat
Betalingsplatform voor het verwerken van online betalingen, abonnementen en facturatie.

## Wanneer gebruiken
Bij commerciele projecten die betalingen nodig hebben.

## Installatie
```bash
npm install stripe
npm install @stripe/stripe-js      # client-side
```

## Configuratie
```
STRIPE_SECRET_KEY=sk_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Kernconcepten
- **Checkout Sessions** — gehoste betaalpagina
- **Webhooks** — Stripe stuurt events naar je API route
- **Products & Prices** — definieer in Stripe dashboard
- **Subscriptions** — terugkerende betalingen

## Afspraken
- Stripe client configureren in `src/lib/stripe.ts`
- Webhook handler in `src/app/api/webhooks/stripe/route.ts`
- Altijd webhooks gebruiken voor betalingsbevestiging (niet client-side callbacks)
- Test met Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## Links
- [Stripe Docs](https://stripe.com/docs)
- [Next.js integratie](https://stripe.com/docs/payments/quickstart)
