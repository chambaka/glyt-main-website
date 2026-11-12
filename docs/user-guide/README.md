# GoLyt Customer User Guide

Traveller walkthrough for the public GoLyt website (book, track, account).

## Deliverables

- `GoLyt-Customer-User-Guide.pdf` — branded PDF with screenshots
- `golyt-customer-user-guide.html` — source HTML used to print the PDF
- `screenshots/` — captured UI screenshots
- `mock-api.mjs` — API stub for screenshot capture
- `capture-screenshots.mjs` — Chromium capture script

## Regenerate screenshots

```bash
# terminal 1
node docs/user-guide/mock-api.mjs

# terminal 2 — temporarily proxy to mock :8099
# edit vite.config.js proxy target to http://localhost:8099, then:
npm run dev

# terminal 3
node docs/user-guide/capture-screenshots.mjs
```

## Regenerate PDF

```bash
cd docs/user-guide
google-chrome --headless --no-sandbox --disable-gpu   --no-pdf-header-footer   --print-to-pdf=GoLyt-Customer-User-Guide.pdf   "file://$PWD/golyt-customer-user-guide.html"
```
