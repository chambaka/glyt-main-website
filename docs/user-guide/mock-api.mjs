import http from 'node:http'

const services = [
  {
    id: 1,
    code: 'DOOR_TO_DESK',
    name: 'Door to desk',
    description: 'Sealed custody from Kilimanjaro intake to Zanzibar pickup desk.',
    amountMinor: 5000000,
    currency: 'TZS',
    unit: 'PER_BAG',
    sortOrder: 10,
    active: true
  },
  {
    id: 2,
    code: 'OVERWEIGHT',
    name: 'Overweight handling',
    description: 'Extra handling when a bag is above the standard threshold.',
    amountMinor: 1500000,
    currency: 'TZS',
    unit: 'PER_BAG',
    sortOrder: 20,
    active: true
  }
]

const profile = {
  id: 11,
  fullName: 'Asha Mwinyi',
  email: 'asha@example.com',
  phone: '+255712000111',
  nationality: 'TZ',
  passportNumber: 'T1234567'
}

function json(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  })
  res.end(payload)
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        resolve({})
      }
    })
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:8099')
  const path = url.pathname

  if (req.method === 'OPTIONS') return json(res, 204, {})

  if (path === '/api/v1/services') return json(res, 200, services)

  if (path === '/api/v1/quotations' || path === '/api/v1/customer/quotations') {
    const body = await readBody(req)
    const service = services.find((s) => s.id === Number(body.serviceId)) || services[0]
    const bags = Number(body.bagCount) || 1
    return json(res, 200, {
      id: 101,
      serviceCode: service.code,
      serviceName: service.name,
      bagCount: bags,
      amountMinor: service.amountMinor * bags,
      currency: service.currency,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    })
  }

  if (path === '/api/v1/customer/auth/logout') return json(res, 200, { message: 'Signed out' })

  if (path === '/api/v1/customer/auth/register' || path === '/api/v1/customer/auth/login' || path === '/api/v1/customer/auth/refresh') {
    return json(res, 200, {
      token: 'mock-customer-token',
      refreshToken: 'mock-customer-refresh',
      expiresIn: 900,
      user: profile
    })
  }

  if (path === '/api/v1/customer/auth/me') return json(res, 200, profile)

  if (path === '/api/v1/customer/bookings' && req.method === 'GET') {
    return json(res, 200, [
      {
        id: 7,
        bookingNumber: 'BK-000042',
        status: 'OPEN',
        internationalArrivalFlight: 'KQ486',
        kiaArrivalDate: '2026-11-20',
        zanzibarTravelDate: '2026-11-21',
        customerName: profile.fullName,
        zanzibarHotel: 'Park Hyatt Zanzibar',
        bookingReference: 'ASHA-42',
        notes: 'Arrive afternoon'
      }
    ])
  }

  if (path === '/api/v1/customer/bookings' && req.method === 'POST') {
    return json(res, 200, {
      id: 8,
      bookingNumber: 'BK-000099',
      status: 'OPEN',
      internationalArrivalFlight: 'KQ486',
      kiaArrivalDate: '2026-11-20',
      zanzibarTravelDate: '2026-11-21'
    })
  }

  if (path === '/api/v1/customer/support/tickets' && req.method === 'GET') {
    return json(res, 200, [])
  }

  if (path === '/api/v1/customer/support/tickets' && req.method === 'POST') {
    const body = await readBody(req)
    return json(res, 200, { id: 3, subject: body.subject || 'Help', body: body.body || '', status: 'OPEN' })
  }

  if (path.startsWith('/api/v1/public/track/')) {
    return json(res, 200, {
      bagCode: 'BG-000042',
      status: 'IN_ZNZ_STORAGE',
      lastUpdated: '2026-11-11T18:40:00Z',
      timeline: [
        { label: 'Received at KIA', done: true },
        { label: 'Sealed for transfer', done: true },
        { label: 'Airline handover', done: true },
        { label: 'Received in Zanzibar', done: true },
        { label: 'In storage', done: true },
        { label: 'Ready for collection', done: false },
        { label: 'Released', done: false }
      ],
      pickup: {
        name: 'GoLyt Zanzibar desk',
        place: 'Abeid Amani Karume International Airport, arrivals hall',
        hours: '06:00–22:00 daily',
        phone: '+255 777 000 111'
      }
    })
  }

  if (path.startsWith('/api/v1/payments/')) {
    return json(res, 200, {
      id: 55,
      status: 'PENDING',
      checkoutUrl: null,
      externalRef: 'MOCK-PAY-55'
    })
  }

  json(res, 404, { error: `No mock for ${path}` })
})

server.listen(8099, () => {
  console.log('Customer mock API on http://localhost:8099')
})
