const messages = {
  en: {
    brand: 'GoLyt',
    tagline: 'Go light. Explore more.',
    nav: {
      home: 'Home',
      how: 'How it works',
      services: 'Services',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      faq: 'FAQs',
      book: 'Book',
      track: 'Track',
      account: 'Account',
      terms: 'Terms',
      privacy: 'Privacy'
    },
    lang: 'SW',
    hero: {
      headline: 'Arrive free. Bags handled.',
      support: 'Officers secure your luggage from Kilimanjaro to Zanzibar while you travel light.',
      ctaBook: 'Book a service',
      ctaTrack: 'Track luggage'
    },
    how: {
      title: 'How it works',
      lead: 'Four clear steps from booking to collection — custody, not GPS.',
      steps: [
        { title: 'Book', body: 'Choose a service online or register at KIA intake with an officer.' },
        { title: 'Secure', body: 'QR label, photos, and seals create a sealed custody record.' },
        { title: 'Transfer', body: 'Manifest handover moves bags safely toward Zanzibar storage.' },
        { title: 'Collect', body: 'You get a ready notice, then verified release at the pickup desk.' }
      ]
    },
    services: {
      title: 'Services',
      lead: 'Pilot corridor first. More routes unlock as operations expand.',
      empty: 'Services will appear when the API is reachable.',
      loading: 'Loading services…'
    },
    pricing: {
      title: 'Pricing',
      lead: 'Transparent quotes before you commit. Amounts shown are live from the catalog.',
      per: 'per bag',
      note: 'Final charge follows your quotation. Mobile money and card checkout arrive in a later release.'
    },
    about: {
      title: 'About GoLyt',
      lead: 'Luggage storage and transfer built for travellers who want the journey without the drag.',
      body: 'GoLyt runs a Kilimanjaro → Zanzibar pilot with trained officers, sealed custody, and private track links. Operations stay with the ops app and console; this site is for travellers.',
      values: [
        { title: 'Custody first', body: 'Every status change is recorded — QR, seals, photos, and release checks.' },
        { title: 'Travel light', body: 'Leave bags in trusted hands and keep your day free for the coast.' },
        { title: 'Clear updates', body: 'Status timelines and pickup details — no live maps, no GPS.' }
      ]
    },
    contact: {
      title: 'Contact',
      lead: 'Questions about booking, pickup, or a bag in custody.',
      desk: 'Pilot pickup desk',
      place: 'Zanzibar collection point (confirm on your track link)',
      hours: 'Daily 08:00–20:00 EAT',
      phone: '+255 000 000 000',
      email: 'hello@golyt.example',
      formTitle: 'Send a message',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      signedInNote: 'Signed-in messages open a support ticket on your account.',
      guestNote: 'Guests can email us directly. Sign in to open a tracked support ticket.',
      sent: 'Message sent.'
    },
    faq: {
      title: 'FAQs',
      items: [
        { q: 'Do I need a mobile app?', a: 'No for the pilot. Use this website and your private track link. Officers use a separate ops app.' },
        { q: 'Where do bags go?', a: 'Kilimanjaro intake → sealed custody → airline handover → Zanzibar storage → collection.' },
        { q: 'Is there live GPS tracking?', a: 'No. Tracking is status-based custody events with a private link.' },
        { q: 'How do I pay?', a: 'Quotations are live now. Mobile money and card payment go live in a later phase.' },
        { q: 'Who can collect?', a: 'The named traveller with ID verification at the pickup desk.' }
      ]
    },
    terms: {
      title: 'Terms of use',
      body: [
        'GoLyt provides luggage storage and transfer services under sealed custody procedures.',
        'Bookings are confirmed when travel details are accepted and, once payments are live, when payment succeeds.',
        'Prohibited items must not be presented. Officers may refuse bags that fail intake checks.',
        'Collection requires identity verification matching the booking.',
        'These pilot terms may be updated as the service expands.'
      ]
    },
    privacy: {
      title: 'Privacy',
      body: [
        'We collect identity, contact, travel, and luggage details needed to run custody and collection.',
        'Track links use private tokens — do not share them publicly.',
        'Staff access is role-limited. Customer accounts use separate sign-in from officer accounts.',
        'Payment provider data will be handled under provider and local requirements when payments go live.',
        'Contact us to request account updates during the pilot.'
      ]
    },
    book: {
      title: 'Book a service',
      lead: 'Get a quotation, then create a booking when signed in.',
      service: 'Service',
      bags: 'Bags',
      quote: 'Get quote',
      quoteReady: 'Quote ready',
      expires: 'Expires',
      travel: 'Travel details',
      flight: 'International arrival flight',
      kiaDate: 'KIA arrival date',
      znzDate: 'Zanzibar travel date',
      znzFlight: 'Zanzibar flight',
      operator: 'Tour operator',
      reference: 'Booking reference',
      hotel: 'Zanzibar hotel',
      notes: 'Notes',
      create: 'Create booking',
      needAccount: 'Sign in under Account to convert a quote into a booking.',
      payStub: 'Initiate payment (scaffold)',
      payNote: 'Provider confirmation arrives in Phase 5.'
    },
    track: {
      title: 'Track luggage',
      lead: 'Enter the bag code and private token from your GoLyt message or officer.',
      code: 'Bag code',
      token: 'Tracking token',
      submit: 'Show status',
      updated: 'Last updated',
      pickup: 'Pickup',
      timeline: 'Custody timeline',
      openPage: 'Open printable track page'
    },
    account: {
      title: 'Customer account',
      signIn: 'Sign in',
      register: 'Register',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      password: 'Password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      nationality: 'Nationality',
      passport: 'Passport number',
      createAccount: 'Create account',
      signOut: 'Sign out',
      bookings: 'My bookings',
      noBookings: 'No bookings yet.',
      cancel: 'Cancel',
      receipt: 'Receipt summary',
      support: 'Support',
      openTicket: 'Open ticket',
      noTickets: 'No tickets yet.'
    },
    footer: {
      rights: 'GoLyt pilot · Kilimanjaro to Zanzibar',
      ops: 'Officers use the GoLyt ops app and console.',
      explore: 'Explore',
      travel: 'Travel',
      company: 'Company'
    },
    common: {
      select: 'Select…',
      error: 'Something went wrong.',
      chooseService: 'Choose a service first.'
    }
  },
  sw: {
    brand: 'GoLyt',
    tagline: 'Nenda mwepesi. Chunguza zaidi.',
    nav: {
      home: 'Nyumbani',
      how: 'Jinsi inavyofanya kazi',
      services: 'Huduma',
      pricing: 'Bei',
      about: 'Kuhusu',
      contact: 'Mawasiliano',
      faq: 'Maswali',
      book: 'Weka nafasi',
      track: 'Fuatilia',
      account: 'Akaunti',
      terms: 'Masharti',
      privacy: 'Faragha'
    },
    lang: 'EN',
    hero: {
      headline: 'Fika huru. Mizigo inashughulikiwa.',
      support: 'Maafisa hulinda mizigo yako kutoka Kilimanjaro hadi Zanzibar ukisafiri mwepesi.',
      ctaBook: 'Weka nafasi',
      ctaTrack: 'Fuatilia mzigo'
    },
    how: {
      title: 'Jinsi inavyofanya kazi',
      lead: 'Hatua nne wazi kutoka uhifadhi hadi uchukuaji — ulinzi wa mzigo, si GPS.',
      steps: [
        { title: 'Weka nafasi', body: 'Chagua huduma mtandaoni au jiandikishe kwenye mapokezi ya KIA.' },
        { title: 'Linda', body: 'Lebo ya QR, picha, na mihuri hutengeneza rekodi salama.' },
        { title: 'Hamisha', body: 'Manifesti huhamisha mizigo salama kuelekea uhifadhi Zanzibar.' },
        { title: 'Chukua', body: 'Unapata taarifa ya utayari, kisha uthibitisho wa kitambulisho.' }
      ]
    },
    services: {
      title: 'Huduma',
      lead: 'Kwanza korido ya majaribio. Njia zaidi zitafunguliwa baadaye.',
      empty: 'Huduma zitaonekana API ikipatikana.',
      loading: 'Inapakia huduma…'
    },
    pricing: {
      title: 'Bei',
      lead: 'Nukuu wazi kabla ya kujitolea. Bei zinatokana na katalogi hai.',
      per: 'kwa mzigo',
      note: 'Malipo ya mwisho yatafuata nukuu yako. Malipo ya simu na kadi yatakuja baadaye.'
    },
    about: {
      title: 'Kuhusu GoLyt',
      lead: 'Uhifadhi na uhamishaji wa mizigo kwa wasafiri wanaotaka safari bila mzigo.',
      body: 'GoLyt inaendesha majaribio ya Kilimanjaro → Zanzibar kwa maafisa waliofunzwa, mihuri, na viungo vya faragha vya ufuatiliaji.',
      values: [
        { title: 'Ulinzi kwanza', body: 'Kila mabadiliko ya hali yarekodiwa — QR, mihuri, picha, na ukaguzi wa uchukuaji.' },
        { title: 'Safiri mwepesi', body: 'Acha mizigo mikononi mwaaminifu na uhifadhi siku yako.' },
        { title: 'Taarifa wazi', body: 'Ratiba ya hali na maelezo ya kuchukua — hakuna ramani hai wala GPS.' }
      ]
    },
    contact: {
      title: 'Mawasiliano',
      lead: 'Maswali kuhusu uhifadhi, uchukuaji, au mzigo uliolindwa.',
      desk: 'Dawati la kuchukua (majaribio)',
      place: 'Sehemu ya kuchukua Zanzibar (thibitisha kwenye kiungo chako)',
      hours: 'Kila siku 08:00–20:00 EAT',
      phone: '+255 000 000 000',
      email: 'hello@golyt.example',
      formTitle: 'Tuma ujumbe',
      subject: 'Mada',
      message: 'Ujumbe',
      send: 'Tuma',
      signedInNote: 'Ujumbe ukiwa umeingia hufungua tiketi ya msaada.',
      guestNote: 'Wageni wanaweza kututumia barua pepe. Ingia ili kufungua tiketi.',
      sent: 'Ujumbe umetumwa.'
    },
    faq: {
      title: 'Maswali yanayoulizwa sana',
      items: [
        { q: 'Je, nahitaji programu ya simu?', a: 'Hapana kwa majaribio. Tumia tovuti hii na kiungo chako cha faragha. Maafisa hutumia programu tofauti.' },
        { q: 'Mizigo inaenda wapi?', a: 'Mapokezi KIA → ulinzi wenye muhuri → uhamisho wa ndege → uhifadhi Zanzibar → uchukuaji.' },
        { q: 'Je, kuna GPS hai?', a: 'Hapana. Ufuatiliaji ni matukio ya hali ya ulinzi kwa kiungo cha faragha.' },
        { q: 'Ninalipaje?', a: 'Nukuu zipo sasa. Malipo ya simu na kadi yatakuja baadaye.' },
        { q: 'Nani anaweza kuchukua?', a: 'Msafiri aliyetajwa kwa uthibitisho wa kitambulisho kwenye dawati.' }
      ]
    },
    terms: {
      title: 'Masharti ya matumizi',
      body: [
        'GoLyt hutoa uhifadhi na uhamishaji wa mizigo chini ya taratibu za ulinzi wenye muhuri.',
        'Uhifadhi unathibitishwa maelezo ya safari yakikubaliwa na, malipo yakianza, malipo yakifaulu.',
        'Vifaa vilivyokatazwa havipaswi kuwasilishwa. Maafisa wanaweza kukataa mizigo isiyopita ukaguzi.',
        'Uchukuaji unahitaji uthibitisho wa kitambulisho kinacholingana na uhifadhi.',
        'Masharti haya ya majaribio yanaweza kubadilishwa huduma ikipanuka.'
      ]
    },
    privacy: {
      title: 'Faragha',
      body: [
        'Tunakusanya utambulisho, mawasiliano, safari, na maelezo ya mizigo yanayohitajika kwa ulinzi na uchukuaji.',
        'Viungo vya ufuatiliaji hutumia tokeni za faragha — usivishiriki hadharani.',
        'Ufikiaji wa wafanyakazi unawekewa vikwazo kwa majukumu. Akaunti za wateja zimetenganishwa na maafisa.',
        'Data ya malipo itashughulikiwa kwa mujibu wa mahitaji yanayotumika malipo yakianza.',
        'Wasiliana nasi kuomba masasisho ya akaunti wakati wa majaribio.'
      ]
    },
    book: {
      title: 'Weka nafasi ya huduma',
      lead: 'Pata nukuu, kisha unda uhifadhi ukiwa umeingia.',
      service: 'Huduma',
      bags: 'Mizigo',
      quote: 'Pata nukuu',
      quoteReady: 'Nukuu iko tayari',
      expires: 'Inaisha',
      travel: 'Maelezo ya safari',
      flight: 'Ndege ya kuwasili kimataifa',
      kiaDate: 'Tarehe ya kuwasili KIA',
      znzDate: 'Tarehe ya kwenda Zanzibar',
      znzFlight: 'Ndege ya Zanzibar',
      operator: 'Opereta wa utalii',
      reference: 'Rejea ya uhifadhi',
      hotel: 'Hoteli Zanzibar',
      notes: 'Maelezo',
      create: 'Unda uhifadhi',
      needAccount: 'Ingia katika Akaunti ili kugeuza nukuu kuwa uhifadhi.',
      payStub: 'Anzisha malipo (mfumo wa awali)',
      payNote: 'Uthibitisho wa mtoa huduma utakuja Phase 5.'
    },
    track: {
      title: 'Fuatilia mzigo',
      lead: 'Weka msimbo wa mzigo na tokeni ya faragha kutoka ujumbe wa GoLyt au afisa.',
      code: 'Msimbo wa mzigo',
      token: 'Tokeni ya ufuatiliaji',
      submit: 'Onyesha hali',
      updated: 'Ilisasishwa mwisho',
      pickup: 'Uchukuaji',
      timeline: 'Ratiba ya ulinzi',
      openPage: 'Fungua ukurasa wa ufuatiliaji'
    },
    account: {
      title: 'Akaunti ya mteja',
      signIn: 'Ingia',
      register: 'Jisajili',
      fullName: 'Jina kamili',
      email: 'Barua pepe',
      phone: 'Simu',
      password: 'Nenosiri',
      showPassword: 'Onyesha nenosiri',
      hidePassword: 'Ficha nenosiri',
      nationality: 'Uraia',
      passport: 'Nambari ya pasipoti',
      createAccount: 'Unda akaunti',
      signOut: 'Toka',
      bookings: 'Uhifadhi wangu',
      noBookings: 'Hakuna uhifadhi bado.',
      cancel: 'Ghairi',
      receipt: 'Muhtasari wa risiti',
      support: 'Msaada',
      openTicket: 'Fungua tiketi',
      noTickets: 'Hakuna tiketi bado.'
    },
    footer: {
      rights: 'GoLyt majaribio · Kilimanjaro hadi Zanzibar',
      ops: 'Maafisa hutumia programu na koni ya GoLyt.',
      explore: 'Gundua',
      travel: 'Safari',
      company: 'Kampuni'
    },
    common: {
      select: 'Chagua…',
      error: 'Kuna hitilafu.',
      chooseService: 'Chagua huduma kwanza.'
    }
  }
}

export function createI18n(initial = 'en') {
  let lang = initial === 'sw' ? 'sw' : 'en'
  const listeners = new Set()

  return {
    get lang() {
      return lang
    },
    t() {
      return messages[lang]
    },
    setLang(next) {
      lang = next === 'sw' ? 'sw' : 'en'
      localStorage.setItem('golyt_lang', lang)
      listeners.forEach((fn) => fn(lang))
    },
    toggle() {
      this.setLang(lang === 'en' ? 'sw' : 'en')
    },
    subscribe(fn) {
      listeners.add(fn)
      return () => listeners.delete(fn)
    }
  }
}

export function loadSavedLang() {
  return localStorage.getItem('golyt_lang') === 'sw' ? 'sw' : 'en'
}
