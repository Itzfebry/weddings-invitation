# Dreamy Invitation

An interactive digital invitation built with React, TypeScript, Vite, Framer Motion, GSAP, and Three.js.

See [DOKUMENTASI-PROYEK.md](./DOKUMENTASI-PROYEK.md) for the project overview, MVP scope, user flow, libraries, structure, and Vercel deployment notes.

## Run locally

```bash
npm install
npm run dev
```

The production build can be checked with `npm run build`, then previewed with `npm run preview`.

## Music

The bundled invitation music starts when the guest submits their name to open the invitation. Browser autoplay policies may prevent playback; guests can start or stop it using the music control.

## Structure

- `src/components/`: reusable visual sections and invitation UI.
- `src/data/wedding.ts`: shared couple, date, event, and story content.
- `src/hooks/`: countdown and audio lifecycle logic.
- `src/pages/Invitation.tsx`: composes the invitation sections.
- `src/types/invitation.ts`: shared guest and event types.

## Validation

`npm run build` runs the TypeScript project check and creates the production bundle. Dedicated unit-test and lint scripts are not configured in this repository.
