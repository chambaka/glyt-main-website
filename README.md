# GoLyt public website

Traveller-facing marketing, booking, tracking, and account site for the Kilimanjaro → Zanzibar pilot.

Officer operations stay in `glyt-app` (mobile) and `glyt-admin-ui` (console).

## Run

```bash
npm install
npm run dev
```

Vite proxies `/api` and `/track` to `http://localhost:8070` (see `vite.config.js`). Start `glyt-backend` first so Hibernate can create/update tables.

## Deploy

Production deploys on push to `main` via GitHub Actions (ShuleHub-style release symlink on the same VPS as `ops.golyt.co.tz`).

| Path | Purpose |
| --- | --- |
| `.github/workflows/deploy.yml` | Build, upload `dist`, atomic release switch |
| `deploy/nginx/golyt.co.tz.conf` | Nginx site → `/var/www/golyt.co.tz/current` + API proxy to `:8070` |

Required repository secrets (same as ops console): `VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`.

One-time server setup:

```bash
sudo mkdir -p /var/www/golyt.co.tz
sudo cp deploy/nginx/golyt.co.tz.conf /etc/nginx/sites-available/golyt.co.tz
sudo ln -sfn /etc/nginx/sites-available/golyt.co.tz /etc/nginx/sites-enabled/golyt.co.tz
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d golyt.co.tz -d www.golyt.co.tz
```

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
