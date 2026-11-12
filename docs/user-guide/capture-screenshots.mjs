/**
 * Capture traveller website screenshots for the customer user guide.
 * Requires Vite on :5173 proxying /api to mock on :8099 (or a live API with catalog data).
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, 'screenshots')
const base = process.env.GUIDE_UI_URL || 'http://127.0.0.1:5173'
const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome'

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const require = createRequire(import.meta.url)
  // Resolve puppeteer-core from admin-ui if website lacks it
  let puppeteer
  try {
    puppeteer = require('puppeteer-core')
  } catch {
    puppeteer = require('/home/lupo/projects/tz.co.chambaka/glyt-admin-ui/node_modules/puppeteer-core')
  }

  await mkdir(outDir, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900']
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

    async function go(hash) {
      await page.goto(`${base}/#/${hash}`, { waitUntil: 'networkidle0' })
      await sleep(700)
    }

    async function shot(name) {
      const file = path.join(outDir, name)
      await page.screenshot({ path: file, type: 'png' })
      console.log('wrote', file)
    }

    await page.goto(base + '/', { waitUntil: 'networkidle0' })
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })

    await go('home')
    await shot('customer-01-home.png')

    await go('how')
    await shot('customer-02-how.png')

    await go('services')
    await shot('customer-03-services.png')

    await go('pricing')
    await shot('customer-04-pricing.png')

    await go('book')
    await sleep(400)
    await page.evaluate(() => {
      const select = document.querySelector('select')
      if (select && select.options.length > 1) {
        select.selectedIndex = 1
        select.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
    await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button')]
      const quote = buttons.find((b) => /quote/i.test(b.textContent || ''))
      if (quote) quote.click()
    })
    await sleep(800)
    await shot('customer-05-book.png')

    await go('track')
    await page.evaluate(() => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      const inputs = [...document.querySelectorAll('input')]
      if (inputs[0]) {
        setter.call(inputs[0], 'BG-000042')
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
      }
      if (inputs[1]) {
        setter.call(inputs[1], 'demo-token-42')
        inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
      }
    })
    await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button')]
      const show = buttons.find((b) => /show status/i.test(b.textContent || ''))
      if (show) show.click()
    })
    await sleep(900)
    await shot('customer-06-track.png')

    await go('account')
    await shot('customer-07-account.png')

    // Sign in with mock credentials
    await page.evaluate(() => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      const inputs = [...document.querySelectorAll('input')]
      const email = inputs.find((i) => i.type === 'email') || inputs[0]
      const password = inputs.find((i) => i.type === 'password') || inputs[1]
      if (email) {
        setter.call(email, 'asha@example.com')
        email.dispatchEvent(new Event('input', { bubbles: true }))
      }
      if (password) {
        setter.call(password, 'Golyt#2026')
        password.dispatchEvent(new Event('input', { bubbles: true }))
      }
    })
    await page.evaluate(() => {
      const form = document.querySelector('form.panel')
      if (form) form.requestSubmit()
    })
    await sleep(1200)
    await shot('customer-08-account-bookings.png')

    await go('faq')
    await shot('customer-09-faq.png')
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
