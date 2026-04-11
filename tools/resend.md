# Resend

## Wat
E-mailservice voor het versturen van transactionele e-mails. Integreert met React Email voor templating.

## Wanneer gebruiken
Wanneer de app e-mails moet versturen (bevestigingen, notificaties, wachtwoord-reset).

## Installatie
```bash
npm install resend
npm install react-email @react-email/components   # voor templates
```

## Configuratie
```
RESEND_API_KEY=re_xxx
```

## Basisgebruik
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'app@jouwdomein.nl',
  to: 'gebruiker@email.com',
  subject: 'Onderwerp',
  react: <EmailTemplate />,
});
```

## Afspraken
- Resend client configureren in `src/lib/resend.ts`
- E-mail templates in `src/components/emails/`
- Altijd via API routes versturen, nooit client-side

## Links
- [Resend Docs](https://resend.com/docs)
- [React Email](https://react.email)
