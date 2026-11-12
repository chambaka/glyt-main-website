# GoLyt public website

Traveller-facing marketing, booking, tracking, and account site for the Kilimanjaro → Zanzibar pilot.

Officer operations stay in `glyt-app` (mobile) and `glyt-admin-ui` (console).

## Run

```bash
npm install
npm run dev
```

Vite proxies `/api` and `/track` to `http://localhost:8080` (see `vite.config.js`). Start `glyt-backend` first so Hibernate can create/update tables.

## Phase 3 pages

| Route hash | Purpose |
| --- | --- |
| `#/home` | Full-bleed brand hero + how it works |
| `#/how` | Custody steps |
| `#/services` | Live service catalog |
| `#/pricing` | Live prices from catalog |
| `#/about` | Product story |
| `#/contact` | Desk details + message / support ticket |
| `#/faq` | FAQs |
| `#/terms` / `#/privacy` | Legal copy |
| `#/book` | Quote, payment stub, booking create |
| `#/track` | Inline status via `/api/v1/public/track/{code}/{token}` |
| `#/account` | Register / login, bookings, receipt summary, support |

Language toggle: **EN / SW** (persisted in `localStorage`).

## Brand

Navy `#071C37`, blue `#638DB5`, light `#8FAFCC`. Display font Sora, body IBM Plex Sans.
