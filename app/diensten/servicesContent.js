export const serviceExpectations = [
  {
    title: "We beginnen bij het probleem.",
    text: "Wat moet er veranderen? We pluizen het probleem uit en fixen het gewoon.",
  },
  {
    title: "We denken én maken.",
    text: "Strategie, concept, productie en distributie ligt allemaal bij één team.",
  },
  {
    title: "We nemen verantwoordelijkheid.",
    text: "Geen briefing doorschuiven en daarna spoorloos verdwijnen. We nemen verantwoordelijkheid, houden de vaart erin en blijven betrokken tot na de lancering.",
  },
  {
    title: "We bouwen partnerships.",
    text: "Een video maken, vinkje zetten en salut? Dat doen wij niet! We blijven meedenken, bijsturen en bouwen.",
  },
];

export const problemFiles = [
  {
    id: "merkbekendheid",
    number: "01",
    title: "Meer mensen moeten ons kennen",
    quote:
      "Je merk doet goeie dingen. Alleen lijkt het voorlopig nog een goed bewaard geheim. Awel, wij zeggen dat geheim lekker door.",
    fix: "Brand Campaign",
    result: "meer bereik, herkenning en een merkverhaal dat opvalt.",
    cta: "Maak mijn merk onmogelijk te negeren.",
    cases: ["billy-bonkers"],
    color: "red",
  },
  {
    id: "employer-branding",
    number: "02",
    title: "We vinden de juiste medewerkers niet",
    quote:
      "Vacatures genoeg. De juiste kandidaten? Die lijken collectief verstoppertje te spelen. Wij laten zien waarom goeie mensen niet alleen bij jullie kúnnen werken, maar dat ook echt willen.",
    fix: "Employer Branding Campaign",
    result: "een sterker werkgeversmerk en meer relevante kandidaten.",
    cta: "Samen goeie werknemers zoeken?",
    cases: ["blutsqi"],
    color: "blue",
  },
  {
    id: "product-explainer",
    number: "03",
    title: "Niemand snapt hoe goed ons product of onze dienst is",
    quote:
      "Als je drie meetings en een handboek nodig hebt om het uit te leggen, wordt het tijd voor een sterker verhaal.",
    fix: "Product Launch & Explainer Campaign",
    result: "een verhaal dat mensen sneller begrijpen, onthouden én doorvertellen.",
    cta: "Maak mijn verhaal glashelder",
    cases: ["jurimesh", "weplanet"],
    color: "yellow",
  },
  {
    id: "social-content",
    number: "04",
    title: "Onze socials lijden aan last-minute paniek",
    quote:
      "Nog snel iets posten omdat het alweer dinsdag is? Dat is vervelend. Wij helpen je een herkenbare contentflow met een plan op te stellen. No more last-minute stress!",
    fix: "Social Content Take-Over",
    result:
      "consistente content, herkenbare formats en eindelijk rust in je planning.",
    cta: "Geef mijn socials een plan",
    cases: ["humgy", "tarzan-en-jane"],
    color: "cream",
  },
  {
    id: "event-content",
    number: "05",
    title: "Ons event verdient meer dan één aftermovie",
    quote:
      "Een aftermovie is tof, maar echte buzz maak je niet pas wanneer iedereen al naar huis is. We bouwen de spanning op vóór je event, pakken het moment zelf mee en laten het achteraf nog lekker nazinderen.",
    fix: "Event Content Campaign",
    result:
      "content voor, tijdens én na je event, zodat het veel langer meegaat dan de avond zelf.",
    cta: "Haal alles uit mijn event.",
    cases: [],
    color: "red",
  },
  {
    id: "always-on-partner",
    number: "06",
    title: "We hebben ideeën genoeg. Alleen te weinig tijd en handen",
    quote:
      "Je hoeft geen volledig creatief team aan te werven. Wij helpen je stoutste dromen waar te maken.",
    fix: "Always-on Marketing Partner",
    result: "een vaste partner voor strategie, creatie, productie en opvolging.",
    cta: "Je stoutste dromen waarmaken?",
    cases: [
      { slug: "visit-antwerpen", displayName: "Visit Antwerp" },
      "x-oats",
    ],
    color: "blue",
  },
  {
    id: "ander-probleem",
    number: "07",
    title: "Een ander probleem?",
    body: "Laat het weten, en wij zoeken mee naar een oplossing!",
    cta: "Tell us all your problems baby",
    cases: [],
    color: "yellow",
    open: true,
  },
];

// Oorspronkelijke editorial note: “Humgy, Tarzan & Jane of X-Oats => iets anders zoeken”
// TODO: kies later een definitieve eventcase; VDAB was enkel een interne redactionele optie.

export const serviceTools = [
  { label: "video", caseSlug: "billy-bonkers" },
  { label: "fotografie", caseSlug: "blutsqi" },
  { label: "design", caseSlug: "billy-bonkers" },
  { label: "audio", caseSlug: "sporthouse-group" },
  { label: "marketing", caseSlug: "visit-antwerpen" },
  { label: "animatie", caseSlug: "jurimesh" },
  { label: "copywriting", caseSlug: "frankie-villager" },
  { label: "…", href: "/work/" },
];

export const serviceFaqs = [
  {
    question: "Werken jullie projectmatig én langdurig?",
    answer: [
      "Allebei! Je kunt ons inschakelen voor één straffe campagne, of maandelijks volledige ontzorging! Wil je eerst eens proeven van zo’n samenwerking voordat je commit? Zeker mogelijk! Al blijven klanten opvallend vaak nog even hangen…",
    ],
  },
  {
    question: "Kunnen jullie samenwerken met ons interne marketingteam?",
    answer: [
      "Sowieso. Jullie kennen het merk door en door. Wij brengen een frisse blik, sterke concepten en de mensen om alles ook echt gemaakt te krijgen. Jullie kunnen met een volledig idee komen, met een halve ingeving of gewoon met een probleem. Wij pikken in waar jullie ons nodig hebben <3.",
    ],
  },
  {
    question: "Nemen jullie ook strategie en distributie vast?",
    answer: ["Duuuuh! Wij doen niet anders! Website niet gelezen ;)?"],
  },
  {
    question: "Wanneer moeten we Ami Amis inschakelen?",
    answer: [
      "Wanneer je voelt dat er iets moet veranderen, maar je nog niet precies weet wat of hoe.",
      "Je merk blijft onder de radar, vacatures raken niet ingevuld, je product is moeilijk uit te leggen of je socials draaien op losse flodders? Geef ons een belletje. Wie weet ligt de oplossing waar je zelf nog niet had gekeken!",
    ],
  },
  {
    question: "Met welke timing en budgetten werken jullie doorgaans?",
    answer: [
      "Dat hangt af van wat je écht nodig hebt. Een compacte social campagne vraagt nu eenmaal iets anders dan een volledige merkcampagne met strategie, draaidagen en content voor verschillende kanalen.",
      "We stellen geen Hollywoodproductie voor wanneer een slim en snedig concept de klus beter klaart. Tijdens een eerste gesprek bepalen we samen de juiste schaal. Daarna krijg je een helder voorstel met een realistische timing en een transparant budget.",
    ],
  },
  {
    question: "Kunnen jullie ook alleen een deel van een campagne uitvoeren?",
    answer: [
      "Alleen hulp nodig bij strategie, concept, productie, postproductie, fotografie, animatie of de uitrol op social media? Dan springen we precies daar bij waar jullie vastlopen. We duwen je geen volledig menu in de handen wanneer je weet dat je alleen frietjes nodig hebt!",
    ],
    contactCta: "Stuur ons een berichtje en we luisteren graag verder!",
  },
  {
    question: "Staat jouw vraag er niet tussen?",
    answer: ["Geen stress. Brent heeft (nog) nooit iemand gebeten."],
  },
];
