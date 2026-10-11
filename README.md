# Dreamy Invitation

An interactive digital invitation built with React, TypeScript, Vite, Framer Motion, GSAP, and Three.js.

## Run locally

```bash
npm install
npm run dev
```

The production build can be checked with `npm run build`, then previewed with `npm run preview`.

## Optional music

The bundled invitation music is opt-in. Guests can start or stop it using the music control after opening the invitation.

## Structure

- `src/components/`: opening screen, invitation card, event details, countdown, navigation, and decorative UI.
- `src/hooks/`: typed countdown and audio controls.
- `src/pages/Invitation.tsx`: the composed invitation experience.
- `src/types/invitation.ts`: guest and event types.
