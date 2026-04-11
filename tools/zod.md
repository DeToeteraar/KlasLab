# Zod

## Wat
Runtime datavalidatie met TypeScript-integratie. Definieert schema's die zowel valideren als types afleiden.

## Wanneer gebruiken
Altijd toevoegen — TypeScript biedt alleen compile-time checks, Zod valideert op runtime.

## Installatie
```bash
npm install zod
```

## Basisgebruik
```typescript
import { z } from 'zod';

// Schema definiëren
const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

// Type afleiden uit schema
type User = z.infer<typeof UserSchema>;

// Valideren
const result = UserSchema.safeParse(input);
if (!result.success) {
  // result.error bevat validatiefouten
}
```

## Afspraken
- Zod-schema's definiëren naast de API route die ze gebruikt
- Gedeelde schema's in `src/lib/schemas/`
- Gebruik `safeParse` (niet `parse`) om fouten af te vangen
- Leid TypeScript types af uit schema's met `z.infer<>`

## Links
- [Zod Docs](https://zod.dev)
