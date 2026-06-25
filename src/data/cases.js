const OLD_SITE = "https://www.amiamis.com";

const oldSource = (path) => `${OLD_SITE}${path}`;

const vimeo = (id, title, hash) => ({ id, title, ...(hash ? { hash } : {}) });

const vimeoCaseMedia = (id, title, hash) => ({
  type: "vimeo",
  id,
  title,
  ...(hash ? { hash } : {}),
  wide: true,
  aspectRatio: "16 / 9",
});

const imageCaseMedia = (src, title, alt = title) => ({
  type: "image",
  src,
  title,
  alt,
  wide: true,
  aspectRatio: "16 / 9",
});

const youtubeCaseMedia = (id, title, url) => ({
  type: "youtube",
  id,
  title,
  url,
  wide: true,
  aspectRatio: "16 / 9",
});

const missingCaseText =
  "Deze case staat klaar in de nieuwe structuur, maar de oude website bevatte geen duidelijke detailpagina voor deze case. Inhoud en media moeten nog manueel worden aangevuld.";

const manualNeedsContent = {
  mediaType: "simple-case",
  sourceUrl: null,
  sourceType: "manual-empty",
  needsContent: true,
  needsReview: false,
  needsAssetDownload: true,
  needsEditorialSplit: true,
  intro: missingCaseText,
  summary: missingCaseText,
};

export const cases = [
  {
    slug: "tarzan-en-jane",
    template: "visit-antwerpen-social",
    client: "Tarzan & Jane",
    title: "TARZAN & JANE",
    subtitle: "Een videoclip vol energie, kleur en plezier.",
    oneLiner:
      "Voor Tarzan & Jane trokken we onze mooiste jungle-outfits aan en maakten we een videoclip vol energie, kleur en plezier.",
    category: "Social content",
    categories: ["Video & campagnes", "Social content", "Fotografie", "Design & branding"],
    year: "2026",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    seo: {
      title: "Tarzan & Jane | Ami Amis",
      description:
        "Voor Tarzan & Jane maakten we een videoclip vol energie, kleur en plezier en bouwen we maandelijks hun speelse online universum verder uit.",
    },
    introQuote:
      "Samen maken we content die even levendig is als hun speeltuin: vrolijk, kleurrijk en 100% Tarzan & Jane.",
    intro:
      "Voor Tarzan & Jane trokken we onze mooiste jungle-outfits aan en maakten we een videoclip vol energie, kleur en plezier.",
    storyBlocks: [
      {
        kicker: "",
        text:
          "Voor Tarzan & Jane trokken we onze mooiste jungle-outfits aan en maakten we een videoclip vol energie, kleur en plezier.",
      },
      {
        kicker: "",
        text:
          "Maar we wilden niet gewoon een video maken. We wilden hun hele speeltuin laten zingen, springen en swingen. Van de eerste beat tot de laatste glijpartij moest alles voelen als één groot avontuur.",
      },
      {
        kicker: "",
        text:
          "De videoclip vangt perfect de sfeer van Tarzan & Jane: een vrolijke indoor jungle waar kinderen zich kunnen uitleven en ouders spontaan mee in de fun worden gezogen. Met snelle cuts, ritme, speelse beelden en een flinke dosis kinderlijke energie brachten we hun wereld tot leven op beeld.",
      },
      {
        kicker: "",
        text:
          "Het resultaat? Een videoclip die blijft plakken. Letterlijk. Het liedje wordt intussen regelmatig afgespeeld bij Tarzan & Jane en het dansje wordt vaak uitgevoerd in de speeltuin. Missie geslaagd dus: content die niet alleen bekeken wordt, maar ook echt begint te leven op de plek zelf.",
      },
      {
        kicker: "",
        text: "En die videoclip was nog maar het begin.",
      },
      {
        kicker: "",
        text:
          "Vandaag werken we maandelijks samen met Tarzan & Jane om hun speelse online universum verder uit te bouwen. Elke maand creëren we 8 video’s en 4 foto’s of grafische designs voor hun social media. Zo blijft hun merk fris, zichtbaar en herkenbaar voor nieuwe én terugkerende bezoekers.",
      },
      {
        kicker: "",
        text:
          "Samen maken we content die even levendig is als hun speeltuin: vrolijk, kleurrijk en 100% Tarzan & Jane.",
      },
    ],
    storyHighlights: [
      ["videoclip vol energie, kleur en plezier"],
      ["hele speeltuin laten zingen, springen en swingen", "één groot avontuur"],
      ["snelle cuts, ritme, speelse beelden", "wereld tot leven op beeld"],
      ["Een videoclip die blijft plakken", "content die niet alleen bekeken wordt, maar ook echt begint te leven"],
      [],
      ["8 video’s en 4 foto’s of grafische designs", "fris, zichtbaar en herkenbaar"],
      ["100% Tarzan & Jane"],
    ],
    outro:
      "Samen maken we content die even levendig is als hun speeltuin: vrolijk, kleurrijk en 100% Tarzan & Jane.",
    summary:
      "Samen maken we content die even levendig is als hun speeltuin: vrolijk, kleurrijk en 100% Tarzan & Jane.",
    deliverables: ["Videoclip", "Social video’s", "Fotografie", "Grafische designs"],
    heroMedia: {
      type: "vimeo",
      id: "1202756768",
      title: "Tarzan & Jane videoclip",
      wide: true,
      aspectRatio: "16 / 9",
    },
    hero: {
      image: "/work/tarzan-en-jane-thumb.webp",
    },
    gallery: [{ src: "/work/tarzan-en-jane-thumb.webp", alt: "Tarzan & Jane projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1202756768",
        title: "Tarzan & Jane videoclip",
        wide: true,
        aspectRatio: "16 / 9",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1202756768",
          title: "Tarzan & Jane videoclip",
          wide: true,
          aspectRatio: "16 / 9",
        },
      ],
    },
    vimeoEmbeds: [vimeo("1202756768", "Tarzan & Jane videoclip")],
    facts: [
      { label: "Output", value: "videoclip, social video’s, foto’s en grafische designs" },
      { label: "Format", value: "maandelijkse content" },
    ],
    question: {
      label: "Vraag",
      title: "",
      text: "PLACEHOLDER: concrete vraag van Tarzan & Jane aanvullen.",
    },
    approach: {
      label: "Aanpak",
      title: "",
      text:
        "Met snelle cuts, ritme, speelse beelden en een flinke dosis kinderlijke energie brachten we hun wereld tot leven op beeld.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text:
        "Een videoclip die blijft plakken. Letterlijk. Het liedje wordt intussen regelmatig afgespeeld bij Tarzan & Jane en het dansje wordt vaak uitgevoerd in de speeltuin. Missie geslaagd dus: content die niet alleen bekeken wordt, maar ook echt begint te leven op de plek zelf.",
      stats: [
        { value: "1", label: "videoclip" },
        { value: "8", label: "video’s/maand" },
        { value: "4", label: "foto’s/designs" },
        { value: "100%", label: "Tarzan & Jane" },
      ],
    },
    externalVideoUrl: "https://f.io/xlJWANUu",
  },
  {
    slug: "visitantwerp",
    aliases: ["visit-antwerpen"],
    template: "visit-antwerpen-social",
    client: "Visit Antwerpen",
    title: "VISIT ANTWERPEN",
    oneLiner: "10 social video’s om Antwerpen in de kijker te zetten. De eerste ging meteen viraal.",
    category: "Social content",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    mediaType: "vertical-video-grid",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    seo: {
      title: "Visit Antwerpen | Ami Amis",
      description:
        "Voor Visit Antwerpen maakte Ami Amis 10 social media video’s om Antwerpen in de kijker te zetten, gespreid over 4 maanden.",
    },
    introQuote:
      "Hey, we hebben jullie Zuidvideo gezien. Hoe verfrissend dat jullie eigenwijze en gedurfde content maken! Dat willen wij ook.",
    intro:
      "Zo kwam Visit Antwerp bij ons aankloppen. Niet veel later kregen we de vraag of wij voor hen 10 social media video’s wilden maken om Antwerpen in de kijker te zetten, gespreid over 4 maanden. We hadden één doel: mensen zin doen krijgen om onze stad in te duiken.",
    storyBlocks: [
      {
        kicker: "",
        text:
          "Zo kwam Visit Antwerp bij ons aankloppen. Niet veel later kregen we de vraag of wij voor hen 10 social media video’s wilden maken om Antwerpen in de kijker te zetten, gespreid over 4 maanden. We hadden één doel: mensen zin doen krijgen om onze stad in te duiken.",
      },
      {
        kicker: "",
        text:
          "Visit Antwerp kwam met de concepten, wij zorgden voor de magie. Productie, draaien, monteren, finetunen en soms zelfs acteren 🤭. We namen alles uit handen, en met succes!",
      },
      {
        kicker: "",
        text:
          "De allereerste video die we opleverden, de frituurtour, ging meteen viraal. Met 43K weergaven en 1314 likes werd het meteen hun meest bekeken video ooit.",
      },
    ],
    followup:
      "Daarna trokken we heel Antwerpen rond voor de overige video’s. Een cultuurtour waarin we in 24 uur zoveel mogelijk cultuur beleven? Een koffietour om de Antwerp Coffee Week aan te kondigen? Of 3 tips van een local fashion-lover voor het gloednieuwe Antwerp Fashion Festival? Wij zorgden ervoor 💪. Zo bekwamen we een reeks frisse, energieke social video’s met een kwalitatieve look, gemaakt om iedereen die Antwerpen nog niet kent instant FOMO te bezorgen.",
    outro:
      "En die toeristen die je nu overal in Antwerpen ziet rondlopen?\nWij zeggen niet dat ze door ons komen.\nMaar we sluiten het ook niet uit 😉…",
    question: {
      label: "Vraag",
      title: "",
      text:
        "Maak 10 social media video’s die Antwerpen in 4 maanden tijd nóg aantrekkelijker maken voor bezoekers.",
    },
    approach: {
      label: "Aanpak",
      title: "",
      text:
        "Visit Antwerp kwam met de ideeën, wij brachten ze tot leven. Met een duidelijke planning, een flexibele crew en veel goesting trokken we door de stad om elke video van concept tot montage uit te werken. Geen droge toeristische promo, maar snelle, energieke content die voelt alsof je er zelf bij wil zijn.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text:
        "Een reeks frisse, energieke social video’s met een kwalitatieve look, gemaakt om iedereen die Antwerpen nog niet kent instant FOMO te bezorgen.",
      stats: [
        { value: "10", label: "video’s" },
        { value: "4", label: "maanden" },
        { value: "43k", label: "weergaven" },
        { value: "1314", label: "likes" },
      ],
    },
    media: {
      zuidVideo: {
        label: "Zuidvideo",
        type: "popup",
        src: "/videos/cases/visit-antwerpen/zuidvideo.mp4",
        poster: "/images/cases/visit-antwerpen/zuidvideo-poster.jpg",
      },
      hero: {
        type: "video",
        src: "/videos/cases/visit-antwerpen/frituurtour.mp4",
        poster: "/images/cases/visit-antwerpen/frituurtour-poster.jpg",
      },
      verticalVideos: [
        {
          title: "frituurtour",
          src: "/videos/cases/visit-antwerpen/frituurtour.mp4",
          poster: "/images/cases/visit-antwerpen/frituurtour-poster.jpg",
        },
        {
          title: "cultuurtour",
          src: "/videos/cases/visit-antwerpen/cultuurtour.mp4",
          poster: "/images/cases/visit-antwerpen/cultuurtour-poster.jpg",
        },
        {
          title: "koffietour",
          src: "/videos/cases/visit-antwerpen/koffietour.mp4",
          poster: "/images/cases/visit-antwerpen/koffietour-poster.jpg",
        },
        {
          title: "fashion local",
          src: "/videos/cases/visit-antwerpen/fashion-local.mp4",
          poster: "/images/cases/visit-antwerpen/fashion-local-poster.jpg",
        },
      ],
    },
    services: ["Productie", "Draaien", "Montage", "Social content"],
    nextCase: {
      title: "K. Lierse S.K.",
      href: "/work/k-lierse-sk/",
    },
  },
  {
    slug: "humgy",
    template: "x-oats-social",
    client: "Humgy",
    heroTitle: "HUMGY",
    title: "Humgy",
    subtitle: "Content voor een warme coworking community.",
    category: "Social content",
    categories: ["Social content", "Fotografie", "Marketingstrategie"],
    year: "2026",
    deliverables: ["Social content", "Fotografie", "Marketingstrategie"],
    hero: {
      image: "/work/humgy-thumb.png",
      poster: "/work/humgy-thumb.png",
    },
    gallery: [{ src: "/work/humgy-thumb.png", alt: "Humgy projectbeeld" }],
    ...manualNeedsContent,
    sourceType: "master-portfolio",
    needsContent: false,
    needsReview: false,
    needsMedia: true,
    needsEditorialSplit: false,
    oneLiner: "Een Work/Vacation-verhaal dat coworking, reizen en community samenbrengt.",
    intro:
      "Voor Humgy brachten we hun Work/Vacation-concept in Marokko in beeld. Een week vol werken, ontdekken, ontspannen en community werd vertaald naar spontane social content.",
    summary:
      "Een energieke reportage van Humgy's Work/Vacation-concept, gemaakt voor social en communitybuilding.",
    introQuote: "Humgy wilde hun Work/Vacation-concept tastbaar maken voor ondernemers die werken en beleven willen combineren.",
    storyBlocks: [
      {
        text:
          "Voor Humgy brachten we hun Work/Vacation-concept in Marokko in beeld. Een week vol werken, ontdekken, ontspannen en community werd vertaald naar spontane social content.",
      },
    ],
    storyHighlights: [[]],
    media: {
      hero: imageCaseMedia("/work/humgy-thumb.png", "Humgy projectbeeld"),
      verticalVideos: [imageCaseMedia("/work/humgy-thumb.png", "Humgy projectbeeld")],
    },
    facts: [
      { label: "Output", value: "1 video" },
      { label: "Format", value: "social content" },
    ],
    question: {
      title: "Hoe toon je dat coworking meer kan zijn dan een bureau?",
      text:
        "Humgy wilde hun Work/Vacation-concept tastbaar maken voor ondernemers die werken en beleven willen combineren.",
    },
    approach: {
      title: "Een spontane mix van werk, reizen en sfeer.",
      text:
        "We volgden de groep doorheen werkmomenten, activiteiten en ontspannen tussenstops. De focus lag op echte interacties, locatiegevoel en teamdynamiek.",
    },
    result: {
      title: "Een warm communityverhaal met goesting.",
      text:
        "Content die de energie van Humgy laat voelen en het Work/Vacation-format duidelijker positioneert.",
      stats: [
        { value: "1", label: "video" },
        { value: "Work/Vacation", label: "format" },
        { value: "Marokko", label: "locatie" },
        { value: "PLACEHOLDER", label: "extra cijfer" },
      ],
    },
    outro: "Content die de energie van Humgy laat voelen en het Work/Vacation-format duidelijker positioneert.",
    externalVideoUrl: "https://f.io/FG9AAvBN",
  },
  {
    slug: "imore",
    template: "visit-antwerpen-social",
    client: "Imore",
    title: "IMORE",
    subtitle: "Premium content voor premium interieurs.",
    oneLiner: "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, ontwerpt ruimtes met oog voor elk detail.",
    category: "Social content",
    categories: ["Social content", "Fotografie", "Marketingstrategie"],
    year: "2026",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    seo: {
      title: "Imore | Ami Amis",
      description:
        "Voor Imore maakten we premium video- en fotocontent die hun interieurprojecten stijlvol, kwalitatief en volledig on brand toont.",
    },
    introQuote: "Maak content die echt bij ons past.",
    intro:
      "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, ontwerpt ruimtes met oog voor elk detail. Rustig, verfijnd en volledig op maat van wie er leeft of werkt.",
    storyBlocks: [
      {
        kicker: "",
        text:
          "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, ontwerpt ruimtes met oog voor elk detail. Rustig, verfijnd en volledig op maat van wie er leeft of werkt.",
      },
      {
        kicker: "",
        text:
          "Aan ons de taak om content te maken die datzelfde gevoel oproept. Van korte social reels tot sterke testimonials en luxueuze fotografie: we brachten hun projecten in beeld met oog voor detail, sfeer en merkgevoel.",
      },
      {
        kicker: "",
        text:
          "Want premium interieurs vragen premium content. Geen snelle kiekjes, maar beelden die tonen hoeveel karakter, vakmanschap en verfijning er in elk project zit.",
      },
    ],
    storyHighlights: [[], [], []],
    summary:
      "Een samenhangende reeks content die Imore toont zoals het hoort: stijlvol, kwalitatief en volledig on brand.",
    deliverables: ["Social reels", "Testimonials", "Fotografie"],
    hero: {
      image: "/work/imore.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/6489c50c-e9ce-4e3b-98b1-5f129ff42f82/imore+Banner.png",
    },
    gallery: [{ src: "/work/imore.webp", alt: "Imore projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1055562671",
        hash: "688a1873bb",
        title: "Imore video 1",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1055562671",
          hash: "688a1873bb",
          title: "Imore video 1",
        },
        {
          type: "vimeo",
          id: "1055562589",
          hash: "d817a8a495",
          title: "Imore video 2",
        },
        {
          type: "vimeo",
          id: "1055562711",
          hash: "90107e79ed",
          title: "Imore video 3",
        },
      ],
    },
    vimeoEmbeds: [
      vimeo("1055562671", "Imore video 1", "688a1873bb"),
      vimeo("1055562589", "Imore video 2", "d817a8a495"),
      vimeo("1055562711", "Imore video 3", "90107e79ed"),
    ],
    facts: [
      { label: "Output", value: "social reels, testimonials en fotografie" },
      { label: "Format", value: "interieurcontent" },
    ],
    question: {
      label: "Vraag",
      title: "",
      text: "Maak content die echt bij ons past.",
    },
    approach: {
      label: "Aanpak",
      title: "",
      text:
        "We verdiepten ons in hun cases, hun stijl en hun merkidentiteit, en vertaalden dat naar high-quality video en fotografie.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een samenhangende reeks content die Imore toont zoals het hoort: stijlvol, kwalitatief en volledig on brand.",
      stats: [
        { value: "TBD", label: "social reels" },
        { value: "TBD", label: "testimonials" },
        { value: "TBD", label: "foto’s" },
        { value: "TBD", label: "projecten" },
      ],
    },
    outro: "Een samenhangende reeks content die Imore toont zoals het hoort: stijlvol, kwalitatief en volledig on brand.",
    externalVideoUrls: ["https://f.io/3c8BbG-6", "https://f.io/7wn7_d2a"],
  },
  {
    slug: "hypotheekwereld",
    template: "x-oats-social",
    client: "Hypotheekwereld",
    heroTitle: "HYPOTHEEKWERELD",
    title: "Gepersonaliseerde billboard-video's",
    subtitle: "Dynamische animatie per filiaal.",
    category: "Animatie & montage",
    categories: ["Animatie & montage", "Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/hypotheekwereld"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Een dynamisch billboard-project waarin we samen met Ads & Data Brand Studio storyboarding en animatie hebben gebruikt om gepersonaliseerde video's per filiaal te maken, inclusief aangepaste eindpancartes, om potentiële klanten te helpen bij het verkrijgen van een hypotheek door eventuele valkuilen te overwinnen.",
    summary:
      "Een dynamisch billboard-project met storyboarding en animatie, opgebouwd rond gepersonaliseerde video's per filiaal.",
    introQuote: "Hypotheekwereld wilde een campagne die de valkuilen rond hypotheken helder en laagdrempelig maakt.",
    storyBlocks: [
      {
        text:
          "Een dynamisch billboard-project waarin we samen met Ads & Data Brand Studio storyboarding en animatie hebben gebruikt om gepersonaliseerde video's per filiaal te maken, inclusief aangepaste eindpancartes, om potentiële klanten te helpen bij het verkrijgen van een hypotheek door eventuele valkuilen te overwinnen.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Storyboarding", "Animatie", "Billboard-video", "Campagne-aanpak"],
    hero: {
      image: "/work/hypotheekwereld.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/db9e3270-08a1-445f-86da-30e139f1d62c/hypotheekwereld+thumbnail.png",
    },
    gallery: [{ src: "/work/hypotheekwereld.webp", alt: "Hypotheekwereld projectbeeld" }],
    media: {
      hero: vimeoCaseMedia("1071848624", "Hypotheekwereld billboard-video"),
      verticalVideos: [
        vimeoCaseMedia("1071848624", "Hypotheekwereld billboard-video"),
        imageCaseMedia("/work/hypotheekwereld.webp", "Hypotheekwereld projectbeeld"),
      ],
    },
    vimeoEmbeds: [vimeo("1071848624", "Hypotheekwereld billboard-video")],
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "1 spot + 18 varianten" },
      { label: "Type", value: "billboardvideo" },
    ],
    question: {
      title: "Hoe maak je hypotheekadvies herkenbaar voor verschillende doelgroepen?",
      text:
        "Hypotheekwereld wilde een campagne die de valkuilen rond hypotheken helder en laagdrempelig maakt.",
    },
    approach: {
      title: "Storyboarding, animatie en varianten per filiaal.",
      text:
        "Samen met Ads & Data werkten we een online advertentie uit met duidelijke scenario's per doelgroep. We verzorgden script, storyboard, animatie en voice-over.",
    },
    result: {
      title: "Een dynamische campagne die snel duidelijk maakt waar Hypotheekwereld helpt.",
      text:
        "De spot en afgeleide varianten maken hypotheekvragen concreet, herkenbaar en inzetbaar op verschillende kanalen.",
      stats: [
        { value: "1", label: "spot" },
        { value: "18", label: "varianten" },
        { value: "PLACEHOLDER", label: "doelgroepen" },
        { value: "PLACEHOLDER", label: "kanalen" },
      ],
    },
    outro: "De spot en afgeleide varianten maken hypotheekvragen concreet, herkenbaar en inzetbaar op verschillende kanalen.",
    externalVideoUrl: "https://www.amiamis.com/work/hypotheekwereld",
  },
  {
    slug: "k-lierse-sk",
    template: "x-oats-social",
    client: "K. Lierse S.K.",
    heroTitle: "K. LIERSE S.K.",
    title: "Videopartnership Lierse",
    subtitle: "Voetbalmomenten, events en clubvideo's.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Animatie & montage"],
    year: "2026",
    sourceUrl: oldSource("/work/lierse"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    heroMedia: {
      type: "vimeo",
      id: "1055593959",
      hash: "ef72b6897c",
      title: "Videopartnership Lierse",
    },
    intro:
      "GOOOAAAAAL! Dat horen we tegenwoordig wel vaker, want we zijn trotse videopartner van K.Lierse S.K. We staan altijd klaar om de spannende wedstrijden in het Lisp (het iconische Lierse stadion) vast te leggen. Of het nu gaat om een video voor de aankondiging van de nieuwe stadionnaam, een Kerstvideo, een aftermovie van een event of het bekendmaken van de nieuwe trainer - Lierse kan altijd rekenen op ons vakmanschap! Bekijk hier alvast de video die we maakten voor de match Lierse - La Louvière.",
    summary:
      "Als videopartner leggen we wedstrijden, events, aankondigingen en clubmomenten vast voor K. Lierse S.K.",
    introQuote: "PLACEHOLDER: concrete vraag van K. Lierse S.K. aanvullen.",
    storyBlocks: [
      {
        text:
          "GOOOAAAAAL! Dat horen we tegenwoordig wel vaker, want we zijn trotse videopartner van K.Lierse S.K. We staan altijd klaar om de spannende wedstrijden in het Lisp (het iconische Lierse stadion) vast te leggen. Of het nu gaat om een video voor de aankondiging van de nieuwe stadionnaam, een Kerstvideo, een aftermovie van een event of het bekendmaken van de nieuwe trainer - Lierse kan altijd rekenen op ons vakmanschap! Bekijk hier alvast de video die we maakten voor de match Lierse - La Louvière.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Videopartnership", "Wedstrijdvideo", "Aftermovie", "Clubcontent"],
    hero: {
      image: "/work/lierse.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/23307d45-60f2-450b-a955-4affc113ba52/Banner+Lierse.png",
    },
    gallery: [{ src: "/work/lierse.webp", alt: "K. Lierse S.K. projectbeeld" }],
    media: {
      hero: vimeoCaseMedia("1055593959", "Videopartnership Lierse", "ef72b6897c"),
      verticalVideos: [
        vimeoCaseMedia("1055593959", "Videopartnership Lierse", "ef72b6897c"),
        vimeoCaseMedia("1055589802", "Stadiumnaam aankondiging", "3b7c6b293a"),
        imageCaseMedia("/work/lierse.webp", "K. Lierse S.K. projectbeeld"),
      ],
    },
    vimeoEmbeds: [vimeo("1055589802", "Stadiumnaam aankondiging", "3b7c6b293a")],
    needsReview: true,
    facts: [
      { label: "Output", value: "clubcontent" },
      { label: "Type", value: "videopartnership" },
    ],
    question: {
      title: "PLACEHOLDER: vraag-titel toevoegen",
      text: "PLACEHOLDER: concrete vraag van K. Lierse S.K. aanvullen.",
    },
    approach: {
      title: "PLACEHOLDER: aanpak-titel toevoegen",
      text:
        "We staan altijd klaar om de spannende wedstrijden in het Lisp (het iconische Lierse stadion) vast te leggen.",
    },
    result: {
      title: "PLACEHOLDER: resultaat-titel toevoegen",
      text:
        "Als videopartner leggen we wedstrijden, events, aankondigingen en clubmomenten vast voor K. Lierse S.K.",
      stats: [
        { value: "1", label: "matchvideo" },
        { value: "1", label: "stadionnaamvideo" },
        { value: "PLACEHOLDER", label: "events" },
        { value: "PLACEHOLDER", label: "clubcontent" },
      ],
    },
    outro: "Als videopartner leggen we wedstrijden, events, aankondigingen en clubmomenten vast voor K. Lierse S.K.",
    externalVideoUrls: [
      "https://vimeo.com/1055593959/ef72b6897c",
      "https://vimeo.com/1055589802/3b7c6b293a",
    ],
  },
  {
    slug: "4allseasons",
    template: "x-oats-social",
    client: "4 All Seasons",
    heroTitle: "4 ALL SEASONS",
    title: "4 All Seasons",
    subtitle: "Campagnes voor vegan cosmetics",
    oneLiner: "Campagnes voor vegan cosmetics.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Fotografie", "Social content", "Marketingstrategie"],
    year: "2023 — 2024",
    period: "2023 — 2024",
    sourceUrl: oldSource("/work/4allseasons"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    mediaType: "mixed-media",
    hideShowcase: true,
    introQuote: "Een samenwerking die al sinds het begin mee groeit.",
    intro:
      "Voor 4 All Seasons maakten we doorheen de jaren een mix van campagnevideo’s, fotografie, social content en behind the scenes. Van vegan cosmetics voor kinderen tot tv-spots, Kinepolis-reclame en een snelle Milo-billboardcampagne: dit is zo’n samenwerking die voelt als samen bouwen.",
    summary:
      "Campagnes, fotografie en social content voor vegan cosmetics.",
    deliverables: ["TV-spot", "Kinepolis-reclame", "Fotografie", "BTS"],
    output: "TV, Kinepolis, social, fotografie",
    heroMedia: {
      type: "image",
      src: "/assets/work/4allseasons/hero.jpg",
      aspectRatio: "16/9",
      alt: "Milo billboardcampagne voor 4 All Seasons",
    },
    hero: {
      image: "/assets/work/4allseasons/hero.jpg",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/07eb2255-00e7-4772-9ac7-dc8c16b590f9/LinkedIn.png",
    },
    storyBlocks: [
      {
        kicker: "Samen bouwen",
        text:
          "Voor 4 All Seasons maakten we doorheen de jaren een mix van campagnevideo’s, fotografie, social content en behind the scenes. Van vegan cosmetics voor kinderen tot tv-spots, Kinepolis-reclame en een snelle Milo-billboardcampagne: dit is zo’n samenwerking die voelt als samen bouwen.",
      },
      {
        kicker: "Cosmetics for cool kids",
        text:
          "4 All Seasons is een vegan cosmeticamerk voor kinderen, opgericht door Annelies Van Gaever. Met “Cosmetics for cool kids” brengen ze producten die speels voelen voor kinderen en vertrouwd voor ouders.",
      },
    ],
    storyHighlights: [[], []],
    projectFacts: [
      { label: "Klant", value: "4 All Seasons" },
      { label: "Type", value: "Video & campagnes, fotografie, social content" },
      { label: "Output", value: "TV-spot, Kinepolis-reclame, fotografie, BTS" },
      { label: "Samenwerking", value: "sinds de start" },
      { label: "Tempo", value: "Milo-billboard in minder dan 2 uur" },
    ],
    gallery: [
      { src: "/assets/work/4allseasons/campagne-01.jpg", alt: "Campagnebeeld voor 4 All Seasons" },
      { src: "/assets/work/4allseasons/fotografie-01.jpg", alt: "Productfotografie voor 4 All Seasons" },
    ],
    media: {
      hero: imageCaseMedia("/assets/work/4allseasons/hero.jpg", "Milo billboardcampagne", "Milo billboardcampagne voor 4 All Seasons"),
      verticalVideos: [
        imageCaseMedia("/assets/work/4allseasons/hero.jpg", "Milo billboardcampagne", "Milo billboardcampagne voor 4 All Seasons"),
        vimeoCaseMedia("1071852332", "4allseasons behind the scenes"),
        vimeoCaseMedia("926238307", "4AllSeasons - Milo aftermovie", "bfb29739be"),
        vimeoCaseMedia("1073163342", "4allseasons video"),
      ],
    },
    vimeoEmbeds: [
      vimeo("1071852332", "4allseasons behind the scenes"),
      vimeo("926238307", "4AllSeasons - Milo aftermovie", "bfb29739be"),
      vimeo("1073163342", "4allseasons video"),
    ],
    facts: [],
    question: {
      title: "Hoe hou je een duurzaam kids beautymerk zichtbaar op meerdere kanalen?",
      text:
        "4 All Seasons had nood aan content die hun vegan, kindvriendelijke en duurzame positionering helder naar buiten brengt. Niet op één kanaal, maar over verschillende momenten en formats heen: van televisie en cinema tot social content en fotografie.",
    },
    approach: {
      title: "Van tv-spot tot fotografie, telkens in dezelfde merkwereld.",
      text:
        "We bouwden verder op een langlopende samenwerking en schakelden per project de juiste mensen in. Soms volledig uitgewerkt met campagnevideo, fotografie en montage. Soms razendsnel, zoals bij de Milo-billboardcampagne die in minder dan twee uur werd gerealiseerd.",
    },
    result: {
      title: "Een brede contentbasis voor een merk met een duidelijke missie.",
      text:
        "4 All Seasons kreeg een reeks campagnebeelden, video-assets, social formats en foto’s die hun verhaal consequent blijven versterken. Speels genoeg voor kinderen, betrouwbaar genoeg voor ouders en helder genoeg voor elk kanaal.",
      stats: [
        { value: "TV", label: "spot" },
        { value: "Kinepolis", label: "reclame" },
        { value: "<2u", label: "Milo-billboard" },
        { value: "BTS", label: "content" },
      ],
    },
    outro:
      "4 All Seasons kreeg een reeks campagnebeelden, video-assets, social formats en foto’s die hun verhaal consequent blijven versterken. Speels genoeg voor kinderen, betrouwbaar genoeg voor ouders en helder genoeg voor elk kanaal.",
    mediaSectionTitle: "De content zelf.",
    mediaSectionIntro: "Campagne, fotografie, behind the scenes en video in één compacte kijkruimte.",
    mediaSections: [
      {
        title: "Campagne",
        key: "campagne",
        featured: true,
        items: [
          {
            type: "image",
            src: "/assets/work/4allseasons/hero.jpg",
            alt: "Milo billboardcampagne voor 4 All Seasons",
            caption: "Milo billboardcampagne",
            orientation: "landscape",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/campagne-01.jpg",
            alt: "Campagnebeeld voor 4 All Seasons",
            caption: "Campagnebeeld",
            orientation: "landscape",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/campagne-02.jpg",
            alt: "Campagne-output voor 4 All Seasons",
            caption: "Campagne-output",
            orientation: "portrait",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/campagne-03.jpg",
            alt: "Social campagnebeeld voor 4 All Seasons",
            caption: "Social campagne",
            orientation: "portrait",
          },
        ],
      },
      {
        title: "Fotografie",
        key: "fotografie",
        items: [
          {
            type: "image",
            src: "/assets/work/4allseasons/fotografie-01.jpg",
            alt: "Productfotografie voor 4 All Seasons",
            caption: "Productfotografie",
            orientation: "portrait",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/fotografie-02.jpg",
            alt: "Lifestylefotografie voor 4 All Seasons",
            caption: "Lifestylefotografie",
            orientation: "portrait",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/fotografie-03.jpg",
            alt: "Campagnefotografie voor 4 All Seasons",
            caption: "Campagnefotografie",
            orientation: "landscape",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/fotografie-04.jpg",
            alt: "Fotografie voor vegan cosmetics",
            caption: "Cosmetics for cool kids",
            orientation: "landscape",
          },
        ],
      },
      {
        title: "Behind the scenes",
        key: "bts",
        items: [
          {
            type: "image",
            src: "/assets/work/4allseasons/bts-01.jpg",
            alt: "Behind the scenes tijdens een 4 All Seasons productie",
            caption: "Behind the scenes",
            orientation: "landscape",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/bts-02.jpg",
            alt: "Crewmoment tijdens 4 All Seasons productie",
            caption: "Op set",
            orientation: "landscape",
          },
          {
            type: "image",
            src: "/assets/work/4allseasons/bts-03.jpg",
            alt: "Behind the scenes beeld voor 4 All Seasons",
            caption: "BTS content",
            orientation: "portrait",
          },
        ],
      },
      {
        title: "Video",
        key: "video",
        items: [
          {
            type: "vimeo",
            id: "926238307",
            hash: "bfb29739be",
            title: "Milo aftermovie",
            caption: "Aftermovie",
          },
          {
            type: "vimeo",
            id: "1073163342",
            title: "4 All Seasons video",
            caption: "Video",
          },
          {
            type: "vimeo",
            id: "1071852332",
            title: "Behind the scenes",
            caption: "Behind the scenes",
          },
        ],
      },
    ],
    externalVideoUrls: [
      "https://vimeo.com/926238307/bfb29739be",
      "https://vimeo.com/1073163342",
      "https://vimeo.com/1071852332",
      "https://www.amiamis.com/work/4allseasons",
    ],
  },
  {
    slug: "salus",
    template: "visit-antwerpen-social",
    client: "Salus",
    title: "SALUS",
    subtitle: "Medicair-bedden in de kijker met een reclamespot.",
    oneLiner:
      "Een reeks grappige en kwalitatieve spots, waarvan eentje de verkoop van de Salus Medicair-bedden opvallend deed stijgen.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/salus"),
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    seo: {
      title: "Salus | Ami Amis",
      description:
        "Voor Salus maakten we reclamespots die de Medicair-bedden met humor, herkenbaarheid en storytelling in de kijker zetten.",
    },
    introQuote:
      "“We hebben bijna 8 keer meer Medicair-bedden verkocht sinds de lancering van de nieuwe spot!”",
    intro:
      "“We hebben bijna 8 keer meer Medicair-bedden verkocht sinds de lancering van de nieuwe spot!”\n\nKijk. Als een beddenfabrikant zegt dat je spot hun verkoop weer wakker heeft geschud, dan weet je: job well done. 😴\n\nSalus, een beddenfabrikant uit Mechelen en ondertussen een van onze langstlopende klanten, klopte bij ons aan met een duidelijke vraag: kunnen jullie onze elektrische Medicair-slaapsystemen in de kijker zetten met een reclamespot voor regionale televisie?\n\nNatuurlijk zeiden wij volmondig: ja!\n\nWe werkten verschillende concepten uit die perfect aansloten bij de doelgroep van de Medicair-bedden: een iets ouder publiek met een gezonde portie humor. En zo gepland? Zo gedraaid. Het resultaat werd een spot die meteen opvalt en doet lachen!\n\nDe spot werd uitgezonden op RTV en werd zelfs genomineerd voor de RTV-Awards. Mooi meegenomen, maar het échte resultaat lag bij Salus zelf: de verkoop van hun elektrische bedden kreeg een serieuze duw in de rug. Van amper één bed per kwartaal naar maar liefst 40 bedden in één maand na de lancering van de spot.\n\nSindsdien is Salus een vaste klant geworden die telkens opnieuw bij ons aanklopt voor spots met humor, kwaliteit en een duidelijke boodschap. Want reclame mag verkopen. Maar liefst ook een beetje plezant zijn.\n\nBenieuwd naar de andere spots die we voor Salus maakten? Je “spot” ze hieronder. 😉",
    storyBlocks: [
      {
        kicker: "",
        text:
          "Kijk. Als een beddenfabrikant zegt dat je spot hun verkoop weer wakker heeft geschud, dan weet je: job well done. 😴",
      },
      {
        kicker: "",
        text:
          "Salus, een beddenfabrikant uit Mechelen en ondertussen een van onze langstlopende klanten, klopte bij ons aan met een duidelijke vraag: kunnen jullie onze elektrische Medicair-slaapsystemen in de kijker zetten met een reclamespot voor regionale televisie?",
      },
      {
        kicker: "",
        text: "Natuurlijk zeiden wij volmondig: ja!",
      },
      {
        kicker: "",
        text:
          "We werkten verschillende concepten uit die perfect aansloten bij de doelgroep van de Medicair-bedden: een iets ouder publiek met een gezonde portie humor. En zo gepland? Zo gedraaid. Het resultaat werd een spot die meteen opvalt en doet lachen!",
      },
      {
        kicker: "",
        text:
          "De spot werd uitgezonden op RTV en werd zelfs genomineerd voor de RTV-Awards. Mooi meegenomen, maar het échte resultaat lag bij Salus zelf: de verkoop van hun elektrische bedden kreeg een serieuze duw in de rug. Van amper één bed per kwartaal naar maar liefst 40 bedden in één maand na de lancering van de spot.",
      },
      {
        kicker: "",
        text:
          "Sindsdien is Salus een vaste klant geworden die telkens opnieuw bij ons aanklopt voor spots met humor, kwaliteit en een duidelijke boodschap.",
      },
      {
        kicker: "",
        text: "Benieuwd naar de andere spots die we voor Salus maakten? Je “spot” ze hieronder. 😉",
      },
    ],
    storyHighlights: [
      ["verkoop weer wakker heeft geschud", "job well done"],
      ["elektrische Medicair-slaapsystemen", "reclamespot voor regionale televisie"],
      [],
      ["gezonde portie humor", "meteen opvalt en doet lachen"],
      ["RTV-Awards", "40 bedden in één maand"],
      ["vaste klant", "humor, kwaliteit en een duidelijke boodschap"],
      [],
    ],
    summary:
      "Een reeks grappige en kwalitatieve spots, waarvan eentje de verkoop van de Salus Medicair-bedden opvallend deed stijgen.",
    deliverables: ["Reclamespot", "Concept", "Productie", "Montage"],
    hero: {
      image: "/work/salus.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/547f72ea-4a22-4cd5-be47-e5aa325e66d6/banner.png",
    },
    gallery: [{ src: "/work/salus.webp", alt: "Salus projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1055218065",
        hash: "cdbe91b12e",
        title: "Salus spot",
        wide: true,
        aspectRatio: "16 / 9",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1055218065",
          hash: "cdbe91b12e",
          title: "Salus spot",
          wide: true,
          aspectRatio: "16 / 9",
        },
        {
          type: "vimeo",
          id: "1055217563",
          hash: "86c6a93452",
          title: "Salus spot 2",
          wide: true,
          aspectRatio: "16 / 9",
        },
        {
          type: "vimeo",
          id: "1204531088",
          title: "Salus spot 3",
          url: "https://vimeo.com/1204531088?share=copy&fl=sv&fe=ci",
          wide: true,
          aspectRatio: "16 / 9",
        },
        {
          type: "vimeo",
          id: "1204533594",
          title: "Salus spot 4",
          url: "https://vimeo.com/1204533594?share=copy&fl=sv&fe=ci",
          wide: true,
          aspectRatio: "16 / 9",
        },
      ],
    },
    vimeoEmbeds: [
      vimeo("1055218065", "Salus spot", "cdbe91b12e"),
      vimeo("1055217563", "Salus spot 2", "86c6a93452"),
      vimeo("1204531088", "Salus spot 3"),
      vimeo("1204533594", "Salus spot 4"),
    ],
    facts: [
      { label: "Output", value: "reclamespots" },
      { label: "Zender", value: "RTV" },
      { label: "Resultaat", value: "40 bedden in één maand" },
    ],
    question: {
      label: "Vraag",
      title: "PLACEHOLDER: vraag-titel toevoegen",
      text: "“Kunnen jullie onze Medicair-bedden in de kijker zetten?”",
    },
    approach: {
      label: "Aanpak",
      title: "PLACEHOLDER: aanpak-titel toevoegen",
      text:
        "We schreven opvallende reclamespots die de doelgroep aanspreken met humor, herkenbaarheid en storytelling.",
    },
    result: {
      label: "Resultaat",
      title: "PLACEHOLDER: resultaat-titel toevoegen",
      text:
        "Een reeks grappige en kwalitatieve spots, waarvan eentje de verkoop van de Salus Medicair-bedden opvallend deed stijgen.",
      stats: [
        { value: "bijna 8x", label: "meer Medicair-bedden" },
        { value: "40", label: "bedden in één maand" },
        { value: "1", label: "bed per kwartaal voordien" },
        { value: "RTV", label: "Awards nominatie" },
      ],
    },
    outro: "Want reclame mag verkopen. Maar liefst ook een beetje plezant zijn.",
    externalVideoUrls: [
      "https://vimeo.com/1055218065/cdbe91b12e",
      "https://vimeo.com/1055217563/86c6a93452",
      "https://vimeo.com/1204531088?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1204533594?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "konligo",
    template: "x-oats-social",
    client: "Konligo",
    heroTitle: "KONLIGO",
    title: "Showcase voor duurzame eventstructuren",
    subtitle: "Studio-showcase rond de Fastival-tent.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Fotografie"],
    year: "2026",
    sourceUrl: oldSource("/work/konligo"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "mixed-media",
    intro:
      "Konligo doorbreekt routine met innovatieve en duurzame inzetbare podia. Door hun baanbrekend systeem wordt het verrassend simpel om jouw event- of festival-ervaring naar een hoger niveau te tillen. Wij doken samen met de Fastival -tent de studio in voor deze showcase.",
    summary:
      "Een studio-showcase en fotografie rond de Fastival-tent en Konligo's innovatieve podia.",
    introQuote: "Konligo wilde de Fastival-tent en hun duurzame eventstructuren krachtig en begrijpelijk in beeld brengen.",
    storyBlocks: [
      {
        text:
          "Konligo doorbreekt routine met innovatieve en duurzame inzetbare podia. Door hun baanbrekend systeem wordt het verrassend simpel om jouw event- of festival-ervaring naar een hoger niveau te tillen. Wij doken samen met de Fastival -tent de studio in voor deze showcase.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Showcase", "Fotografie", "Aftermovie"],
    hero: {
      image: "/work/konligo.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/1730802473910-E5QVIU5HU9EU1GUSH90G/LinkedIn.png",
    },
    gallery: [{ src: "/work/konligo.webp", alt: "Konligo projectbeeld" }],
    media: {
      hero: vimeoCaseMedia("986299959", "Konligo aftermovie"),
      verticalVideos: [
        vimeoCaseMedia("986299959", "Konligo aftermovie"),
        imageCaseMedia("/work/konligo.webp", "Konligo projectbeeld"),
      ],
    },
    vimeoEmbeds: [vimeo("986299959", "Konligo aftermovie")],
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "20+ video's" },
      { label: "Type", value: "showcase" },
    ],
    question: {
      title: "Hoe toon je een innovatieve eventstructuur zonder ze uit te leggen tot ze saai wordt?",
      text:
        "Konligo wilde de Fastival-tent en hun duurzame eventstructuren krachtig en begrijpelijk in beeld brengen.",
    },
    approach: {
      title: "Een studio-showcase met beweging, detail en wow-moment.",
      text:
        "We brachten de constructie in de studio tot leven met focus op vorm, gebruiksgemak en visuele impact.",
    },
    result: {
      title: "Heldere content voor een technische innovatie.",
      text:
        "De video-output maakt meteen duidelijk wat Konligo uniek maakt binnen events en festivals.",
      stats: [
        { value: "20+", label: "video’s" },
        { value: "1", label: "showcase" },
        { value: "Fastival", label: "tent" },
        { value: "PLACEHOLDER", label: "fotografie" },
      ],
    },
    outro: "De video-output maakt meteen duidelijk wat Konligo uniek maakt binnen events en festivals.",
    externalVideoUrl: "https://f.io/w-LP7QYP",
  },
  {
    slug: "billy-bonkers",
    aliases: ["billy-bonkers-stad-gent"],
    template: "x-oats-social",
    client: "Billy Bonkers",
    heroTitle: "BILLY BONKERS",
    title: "Campagne rond duurzaam wonen",
    subtitle: "Voor Stad Gent.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Design & branding", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/billybonkers-stadgent"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "mixed-media",
    intro:
      "Voor de Stad Gent ontwikkelden we een creatieve campagne rond duurzaam wonen. De centrale boodschap luidde: “Er zijn betere manieren om je huis te verwarmen.” We werkten hiervoor een krachtige cinemaspot uit, aangevuld met drie opvallende campagnebeelden die als affiches zouden dienen. De campagne zet in op bewustmaking en gedragsverandering bij de Gentse burger. Humor en herkenbare situaties zorgen voor een laagdrempelige insteek. De visuele stijl sluit naadloos aan bij de huisstijl van de stad. We kozen voor heldere beelden en een directe boodschap. De cinemaspot werd ingezet in de cinema van Gent. Voor de online kanalen maakten we een variatie van 15 seconden. De affiches versterkten de zichtbaarheid in het straatbeeld. Samen vormen ze een coherent geheel dat impact creëert én blijft hangen.",
    summary:
      "Een creatieve campagne voor Stad Gent met cinemaspot, campagnebeelden en affiches rond duurzamer verwarmen.",
    introQuote: "Stad Gent wilde een campagne die bewust maakt zonder belerend te worden.",
    storyBlocks: [
      {
        text:
          "Voor de Stad Gent ontwikkelden we een creatieve campagne rond duurzaam wonen. De centrale boodschap luidde: “Er zijn betere manieren om je huis te verwarmen.” We werkten hiervoor een krachtige cinemaspot uit, aangevuld met drie opvallende campagnebeelden die als affiches zouden dienen. De campagne zet in op bewustmaking en gedragsverandering bij de Gentse burger. Humor en herkenbare situaties zorgen voor een laagdrempelige insteek. De visuele stijl sluit naadloos aan bij de huisstijl van de stad. We kozen voor heldere beelden en een directe boodschap. De cinemaspot werd ingezet in de cinema van Gent. Voor de online kanalen maakten we een variatie van 15 seconden. De affiches versterkten de zichtbaarheid in het straatbeeld. Samen vormen ze een coherent geheel dat impact creëert én blijft hangen.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Cinemaspot", "Campagnebeelden", "Affiches", "Storyboard"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/da00ab33-0d7d-451f-9863-14dc7ceee76a/SEB08389.JPG",
    },
    gallery: [
      {
        src:
          "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/da00ab33-0d7d-451f-9863-14dc7ceee76a/SEB08389.JPG",
        alt: "Billy Bonkers campagnebeeld",
      },
    ],
    vimeoEmbeds: [vimeo("1169918332", "Billy Bonkers - Stad Gent")],
    media: {
      hero: vimeoCaseMedia("1169918332", "Billy Bonkers - Stad Gent"),
      verticalVideos: [
        vimeoCaseMedia("1169918332", "Billy Bonkers - Stad Gent"),
        imageCaseMedia("/work/billy-bonkers-thumb.webp", "Billy Bonkers campagnebeeld"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "2 video's" },
      { label: "Type", value: "campagne" },
    ],
    question: {
      title: "Hoe maak je duurzaam verwarmen herkenbaar voor de Gentse burger?",
      text:
        "Stad Gent wilde een campagne die bewust maakt zonder belerend te worden.",
    },
    approach: {
      title: "Humor, herkenbare situaties en één duidelijke boodschap.",
      text:
        "We werkten een cinemaspot, korte online variant en campagnebeelden uit rond de boodschap dat er betere manieren zijn om je huis te verwarmen.",
    },
    result: {
      title: "Een campagne die blijft hangen in cinema, online en straatbeeld.",
      text:
        "De video en affiches vormen samen een helder geheel rond duurzamer wonen.",
      stats: [
        { value: "2", label: "video’s" },
        { value: "3", label: "campagnebeelden" },
        { value: "15s", label: "online variant" },
        { value: "Gent", label: "cinema" },
      ],
    },
    outro: "De video en affiches vormen samen een helder geheel rond duurzamer wonen.",
    externalVideoUrl: "https://f.io/JOJD6hvM",
  },
  {
    slug: "jurimesh",
    template: "x-oats-social",
    client: "Jurimesh",
    heroTitle: "JURIMESH",
    title: "Heldere video voor een technische integratie",
    subtitle: "Virtual Vaults helder uitgelegd.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Animatie & montage", "Design & branding"],
    year: "2026",
    sourceUrl: oldSource("/work/jurimesh"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Voor Jurimesh ontwikkelden we een video die hun nieuwe integratie met Virtual Vaults op een heldere, toegankelijke en herkenbare manier uitlegt. Het doel van deze productie was om een technisch complexe samenwerking begrijpelijk te maken voor hun doelgroep, met een mix van dramatische opbouw, duidelijke visualisatie én een speelse punchline die de boodschap luchtig afsluit. We namen het volledige creatieve proces voor onze rekening: van het uitdenken van het concept en het schrijven van een verhalend script tot de opnames, motion graphics en technische afwerking. We zorgden ervoor dat de look-and-feel naadloos aansloot bij de identiteit van zowel Jurimesh als Virtual Vaults, zodat de video geloofwaardig aanvoelt binnen beide ecosystemen. Door de combinatie van uitleg, storytelling en humor konden we de meerwaarde van de integratie scherp in beeld brengen: sneller inzicht, minder risico’s en een workflow die juridisch én operationeel volledig op elkaar aansluit. De video wordt vandaag ingezet in sales- en marketingcontext als krachtig startpunt om de samenwerking uit te leggen, nieuwe leads te overtuigen en bestaande klanten te informeren. Dankzij een heldere verhaallijn en visuele eenvoud helpt deze productie Jurimesh om hun technologie toegankelijk en aantrekkelijk te positioneren.",
    summary:
      "Een uitlegvideo die de integratie met Virtual Vaults toegankelijk maakt via storytelling, motion graphics en humor.",
    introQuote: "Jurimesh wilde hun integratie met Virtual Vaults toegankelijk uitleggen voor sales, marketing en klanten.",
    storyBlocks: [
      {
        text:
          "Voor Jurimesh ontwikkelden we een video die hun nieuwe integratie met Virtual Vaults op een heldere, toegankelijke en herkenbare manier uitlegt. Het doel van deze productie was om een technisch complexe samenwerking begrijpelijk te maken voor hun doelgroep, met een mix van dramatische opbouw, duidelijke visualisatie én een speelse punchline die de boodschap luchtig afsluit. We namen het volledige creatieve proces voor onze rekening: van het uitdenken van het concept en het schrijven van een verhalend script tot de opnames, motion graphics en technische afwerking. We zorgden ervoor dat de look-and-feel naadloos aansloot bij de identiteit van zowel Jurimesh als Virtual Vaults, zodat de video geloofwaardig aanvoelt binnen beide ecosystemen. Door de combinatie van uitleg, storytelling en humor konden we de meerwaarde van de integratie scherp in beeld brengen: sneller inzicht, minder risico’s en een workflow die juridisch én operationeel volledig op elkaar aansluit. De video wordt vandaag ingezet in sales- en marketingcontext als krachtig startpunt om de samenwerking uit te leggen, nieuwe leads te overtuigen en bestaande klanten te informeren. Dankzij een heldere verhaallijn en visuele eenvoud helpt deze productie Jurimesh om hun technologie toegankelijk en aantrekkelijk te positioneren.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Concept", "Script", "Opnames", "Motion graphics", "Technische afwerking"],
    hero: {
      image: "/work/jurimesh-thumb.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/5947df59-96e5-4035-a4f2-ad250177a9b1/Scherm­afbeelding+2026-03-03+om+15.51.02.png",
    },
    gallery: [
      {
        src: "/work/jurimesh-thumb.webp",
        alt: "Jurimesh projectbeeld",
      },
    ],
    vimeoEmbeds: [vimeo("1169932151", "Jurimesh video")],
    media: {
      hero: vimeoCaseMedia("1169932151", "Jurimesh video"),
      verticalVideos: [
        vimeoCaseMedia("1169932151", "Jurimesh video"),
        imageCaseMedia("/work/jurimesh-thumb.webp", "Jurimesh projectbeeld"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "uitlegvideo" },
      { label: "Focus", value: "motion graphics" },
    ],
    question: {
      title: "Hoe maak je een technische integratie begrijpelijk zonder ze plat te slaan?",
      text:
        "Jurimesh wilde hun integratie met Virtual Vaults toegankelijk uitleggen voor sales, marketing en klanten.",
    },
    approach: {
      title: "Storytelling, motion graphics en een luchtige punchline.",
      text:
        "We vertaalden de technische samenwerking naar een helder script, visuele opbouw en herkenbare afwerking binnen beide merkwerelden.",
    },
    result: {
      title: "Een technische boodschap die sneller landt.",
      text:
        "De video maakt de meerwaarde van de integratie duidelijk en bruikbaar in sales- en marketingcontext.",
      stats: [
        { value: "1", label: "uitlegvideo" },
        { value: "sales", label: "inzet" },
        { value: "marketing", label: "inzet" },
        { value: "motion", label: "graphics" },
      ],
    },
    outro: "De video maakt de meerwaarde van de integratie duidelijk en bruikbaar in sales- en marketingcontext.",
    externalVideoUrl: "https://f.io/qsJgMwfl",
  },
  {
    slug: "sporthouse-group",
    template: "x-oats-social",
    client: "Sporthouse Group",
    heroTitle: "SPORTHOUSE GROUP",
    title: "Documentaire sportstory rond veerkracht",
    subtitle: "Felipe Nystrom, Younited en cyclocross.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Audio engineering", "Animatie & montage"],
    year: "2026",
    sourceUrl: oldSource("/work/sporthousegroup"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: true,
    needsEditorialSplit: true,
    mediaType: "simple-case",
    intro:
      "In deze video volgen we Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup — een plaats waar sport, herstel en menselijkheid samenkomen. De productie focust op Felipe’s uitzonderlijke reis: van een jeugd vol geweld in Costa Rica, zware verslavingen, dakloosheid en meerdere bijna-doodervaringen, tot zijn doorbraak als professioneel renner en nationaal kampioen. We kozen voor een documentaire stijl waarin intensiteit en intimiteit elkaar afwisselen. Niet alleen de actie van de koers, maar ook de stille momenten ervoor krijgen ruimte: de voorbereiding, de spanning, de kwetsbaarheid. Deze storytelling laat zien hoe sport niet alleen prestaties voortbrengt, maar mensen opnieuw richting geeft. Felipe’s contact met Younited onderstreept dat boodschap: sport als hefboom voor zelfvertrouwen, verbondenheid en een nieuw begin. Onze cinematografische beelden, zorgvuldige montage en sfeervolle audio versterken dat verhaal—een verhaal dat verder gaat dan cyclocross, en raakt aan veerkracht en tweede kansen. Het resultaat is een krachtige, authentieke vertelling die toont hoe één mens, gewapend met wilskracht en steun, letterlijk en figuurlijk uit de modder kan opstaan.",
    summary:
      "Een cinematografische video over Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup.",
    introQuote: "Sporthouse Group wilde een video rond Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup.",
    storyBlocks: [
      {
        text:
          "In deze video volgen we Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup — een plaats waar sport, herstel en menselijkheid samenkomen. De productie focust op Felipe’s uitzonderlijke reis: van een jeugd vol geweld in Costa Rica, zware verslavingen, dakloosheid en meerdere bijna-doodervaringen, tot zijn doorbraak als professioneel renner en nationaal kampioen. We kozen voor een documentaire stijl waarin intensiteit en intimiteit elkaar afwisselen. Niet alleen de actie van de koers, maar ook de stille momenten ervoor krijgen ruimte: de voorbereiding, de spanning, de kwetsbaarheid. Deze storytelling laat zien hoe sport niet alleen prestaties voortbrengt, maar mensen opnieuw richting geeft. Felipe’s contact met Younited onderstreept dat boodschap: sport als hefboom voor zelfvertrouwen, verbondenheid en een nieuw begin. Onze cinematografische beelden, zorgvuldige montage en sfeervolle audio versterken dat verhaal—een verhaal dat verder gaat dan cyclocross, en raakt aan veerkracht en tweede kansen. Het resultaat is een krachtige, authentieke vertelling die toont hoe één mens, gewapend met wilskracht en steun, letterlijk en figuurlijk uit de modder kan opstaan.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Documentaire video", "Montage", "Audio engineering", "Storytelling"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/8d707e9d-44f5-48fe-a098-c6ce64fa656b/Scherm­afbeelding+2026-03-17+om+14.46.36.png",
    },
    gallery: [
      {
        src:
          "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/8d707e9d-44f5-48fe-a098-c6ce64fa656b/Scherm­afbeelding+2026-03-17+om+14.46.36.png",
        alt: "Sporthouse Group projectbeeld",
      },
    ],
    vimeoEmbeds: [],
    media: {
      hero: youtubeCaseMedia("k60oW1nvoPg", "Sporthouse Group documentaire", "https://www.youtube.com/watch?v=k60oW1nvoPg"),
      verticalVideos: [
        youtubeCaseMedia("k60oW1nvoPg", "Sporthouse Group documentaire", "https://www.youtube.com/watch?v=k60oW1nvoPg"),
        imageCaseMedia("/work/sporthouse-group-thumb.webp", "Sporthouse Group projectbeeld"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "documentaire video" },
      { label: "Thema", value: "veerkracht" },
    ],
    question: {
      title: "Hoe vertel je een sportverhaal dat groter is dan de koers?",
      text:
        "Sporthouse Group wilde een video rond Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup.",
    },
    approach: {
      title: "Documentair, menselijk en dicht op de actie.",
      text:
        "We combineerden koersbeelden met intieme momenten voor en naast de wedstrijd. Zo kwam Felipe's verhaal rond herstel, sport en tweede kansen centraal te staan.",
    },
    result: {
      title: "Een sportstory met menselijke impact.",
      text:
        "De video toont hoe sport richting, verbinding en veerkracht kan geven.",
      stats: [
        { value: "1", label: "documentaire" },
        { value: "UCI", label: "World Cup" },
        { value: "Younited", label: "partner" },
        { value: "PLACEHOLDER", label: "extra cijfer" },
      ],
    },
    outro: "De video toont hoe sport richting, verbinding en veerkracht kan geven.",
    externalVideoUrl: "https://www.youtube.com/watch?v=k60oW1nvoPg",
  },
  {
    slug: "blutsqi",
    template: "x-oats-social",
    client: "Blutsqi",
    heroTitle: "BLUTSQI",
    title: "Employer branding met echte mensen",
    subtitle: "Vacaturevideo's en social snippets.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Fotografie", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/blutsqi"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: true,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Blutsqi, een gerenommeerd carrosseriebedrijf, schakelde ons in om hun employer brand visueel kracht bij te zetten. Met de krapte op de arbeidsmarkt wilden ze vacatures invullen via krachtige foto- en videocontent. In deze case brachten we de volgende troeven in beeld: Mensgerichte storytelling: Geen gladde campagnes, maar echte mensen in hun werkcontext. Via korte vacaturevideo’s en een overkoepelende employer branding video tonen we hoe het is om bij Blutsqi te werken – eerlijk, betrokken en vakgericht. Visuele authenticiteit: We draaiden volledig op locatie, met oog voor realisme én visuele aantrekkingskracht. De ruwe schoonheid van het vak en de onderlinge sfeer kwamen zo treffend in beeld. Platformgerichte output: Naast langere video's leverden we snackable content aan voor social media. Zo kreeg de campagne een breed bereik en directe respons van geïnteresseerde kandidaten. Met deze aanpak hielpen we Blutsqi niet alleen aan meer zichtbaarheid als werkgever, maar ook aan nieuwe collega’s die perfect in hun cultuur passen.",
    summary:
      "Foto- en videocontent die Blutsqi als werkgever zichtbaar maakt via vacaturevideo's, employer branding en social snippets.",
    introQuote: "Blutsqi wilde vacatures zichtbaarder maken met een eerlijk beeld van hun mensen, jobs en cultuur.",
    storyBlocks: [
      {
        text:
          "Blutsqi, een gerenommeerd carrosseriebedrijf, schakelde ons in om hun employer brand visueel kracht bij te zetten. Met de krapte op de arbeidsmarkt wilden ze vacatures invullen via krachtige foto- en videocontent. In deze case brachten we de volgende troeven in beeld: Mensgerichte storytelling: Geen gladde campagnes, maar echte mensen in hun werkcontext. Via korte vacaturevideo’s en een overkoepelende employer branding video tonen we hoe het is om bij Blutsqi te werken – eerlijk, betrokken en vakgericht. Visuele authenticiteit: We draaiden volledig op locatie, met oog voor realisme én visuele aantrekkingskracht. De ruwe schoonheid van het vak en de onderlinge sfeer kwamen zo treffend in beeld. Platformgerichte output: Naast langere video's leverden we snackable content aan voor social media. Zo kreeg de campagne een breed bereik en directe respons van geïnteresseerde kandidaten. Met deze aanpak hielpen we Blutsqi niet alleen aan meer zichtbaarheid als werkgever, maar ook aan nieuwe collega’s die perfect in hun cultuur passen.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Employer branding", "Vacaturevideo's", "Social snippets", "Fotografie"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/d6207722-d748-4cf2-9a6c-652636ee9ae3/Scherm­afbeelding+2026-03-17+om+14.53.14.png",
    },
    gallery: [
      {
        src:
          "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/d6207722-d748-4cf2-9a6c-652636ee9ae3/Scherm­afbeelding+2026-03-17+om+14.53.14.png",
        alt: "Blutsqi projectbeeld",
      },
    ],
    vimeoEmbeds: [
      vimeo("1174402980", "Blutsqi employer branding"),
      vimeo("1174402742", "Blutsqi vacaturevideo"),
      vimeo("1174402589", "Blutsqi social snippet"),
    ],
    media: {
      hero: vimeoCaseMedia("1174402980", "Blutsqi employer branding"),
      verticalVideos: [
        vimeoCaseMedia("1174402980", "Blutsqi employer branding"),
        vimeoCaseMedia("1174402742", "Blutsqi vacaturevideo"),
        vimeoCaseMedia("1174402589", "Blutsqi social snippet"),
        imageCaseMedia("/work/blutsqi-thumb.webp", "Blutsqi projectbeeld"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "3 video's" },
      { label: "Type", value: "employer branding" },
    ],
    question: {
      title: "Hoe trek je nieuwe collega's aan met content die echt voelt?",
      text:
        "Blutsqi wilde vacatures zichtbaarder maken met een eerlijk beeld van hun mensen, jobs en cultuur.",
    },
    approach: {
      title: "Echte mensen, echte werkvloer, snackable output.",
      text:
        "We filmden op locatie en combineerden vacaturevideo's met social snippets. De focus lag op vakmanschap, sfeer en authentieke verhalen.",
    },
    result: {
      title: "Een employer branding-campagne die Blutsqi menselijker maakt.",
      text:
        "Blutsqi kreeg content die hen sterker positioneert als werkgever en tegelijk breed inzetbaar is.",
      stats: [
        { value: "3", label: "video’s" },
        { value: "vacature", label: "video’s" },
        { value: "social", label: "snippets" },
        { value: "foto", label: "content" },
      ],
    },
    outro: "Blutsqi kreeg content die hen sterker positioneert als werkgever en tegelijk breed inzetbaar is.",
    externalVideoUrl: "https://f.io/_G4a7McI",
  },
  {
    slug: "zorgbedrijf",
    aliases: ["zorgbedrijf-antwerpen"],
    template: "x-oats-social",
    client: "Zorgbedrijf",
    heroTitle: "ZORGBEDRIJF",
    title: "Interne video's met een menselijke twist",
    subtitle: "Nieuwe directieleden menselijk voorgesteld.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/zorgbedrijf"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: true,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Voor Zorgbedrijf Antwerpen werkten we mee aan de aankondiging van hun vier nieuwe directieleden. Geen klassieke voorstelling, maar een creatieve insteek geïnspireerd op het programma Durf te vragen – open, menselijk en verrassend. Deze case focust op: Authentieke kennismaking: We lieten de directieleden zelf aan het woord, met eerlijke antwoorden op échte vragen van medewerkers. Zo ontstond een persoonlijk portret dat afstand breekt en vertrouwen schept. Verfrissende vormgeving: Door het bekende format van Durf te vragen als kapstok te gebruiken, gaven we een luchtige maar doeltreffende twist aan wat anders een formele boodschap kon zijn. Interne connectie: De video's werden intern verspreid en zorgden meteen voor gesprek en herkenning. Nieuwe gezichten werden geen onbekenden, maar collega’s met wie je je meteen verbonden voelt. Met deze aanpak gaf Zorgbedrijf Antwerpen een menselijk gezicht aan verandering, en versterkten ze de interne cultuur van openheid en dialoog.",
    summary:
      "Een creatieve introductie van vier nieuwe directieleden, geïnspireerd op Durf te vragen.",
    introQuote: "Zorgbedrijf Antwerpen wilde vier nieuwe directieleden intern introduceren zonder formele afstand.",
    storyBlocks: [
      {
        text:
          "Voor Zorgbedrijf Antwerpen werkten we mee aan de aankondiging van hun vier nieuwe directieleden. Geen klassieke voorstelling, maar een creatieve insteek geïnspireerd op het programma Durf te vragen – open, menselijk en verrassend. Deze case focust op: Authentieke kennismaking: We lieten de directieleden zelf aan het woord, met eerlijke antwoorden op échte vragen van medewerkers. Zo ontstond een persoonlijk portret dat afstand breekt en vertrouwen schept. Verfrissende vormgeving: Door het bekende format van Durf te vragen als kapstok te gebruiken, gaven we een luchtige maar doeltreffende twist aan wat anders een formele boodschap kon zijn. Interne connectie: De video's werden intern verspreid en zorgden meteen voor gesprek en herkenning. Nieuwe gezichten werden geen onbekenden, maar collega’s met wie je je meteen verbonden voelt. Met deze aanpak gaf Zorgbedrijf Antwerpen een menselijk gezicht aan verandering, en versterkten ze de interne cultuur van openheid en dialoog.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Interne video", "Social content", "Concept", "Regie"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/2d5f927d-b2db-4952-9ce6-93756fa2416e/StadGent_Zorgbedrijf_drieluik_2025_v1.jpg",
    },
    gallery: [
      {
        src:
          "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/2d5f927d-b2db-4952-9ce6-93756fa2416e/StadGent_Zorgbedrijf_drieluik_2025_v1.jpg",
        alt: "Zorgbedrijf projectbeeld",
      },
    ],
    vimeoEmbeds: [
      vimeo("1178849145", "Zorgbedrijf video 1"),
      vimeo("1178849288", "Zorgbedrijf video 2"),
      vimeo("1178849410", "Zorgbedrijf video 3"),
      vimeo("1178849004", "Zorgbedrijf video 4"),
    ],
    media: {
      hero: vimeoCaseMedia("1178849145", "Zorgbedrijf video 1"),
      verticalVideos: [
        vimeoCaseMedia("1178849145", "Zorgbedrijf video 1"),
        vimeoCaseMedia("1178849288", "Zorgbedrijf video 2"),
        vimeoCaseMedia("1178849410", "Zorgbedrijf video 3"),
        vimeoCaseMedia("1178849004", "Zorgbedrijf video 4"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "4 video's" },
      { label: "Doel", value: "interne communicatie" },
    ],
    question: {
      title: "Hoe stel je nieuwe directieleden menselijk voor?",
      text:
        "Zorgbedrijf Antwerpen wilde vier nieuwe directieleden intern introduceren zonder formele afstand.",
    },
    approach: {
      title: "Een open format met echte vragen van medewerkers.",
      text:
        "We gebruikten Durf te vragen als frisse kapstok en lieten de directieleden op een persoonlijke manier aan het woord.",
    },
    result: {
      title: "Nieuwe gezichten werden herkenbare collega's.",
      text:
        "De video's maakten verandering menselijker en versterkten de interne connectie.",
      stats: [
        { value: "4", label: "video’s" },
        { value: "4", label: "directieleden" },
        { value: "intern", label: "verspreid" },
        { value: "Durf", label: "te vragen" },
      ],
    },
    outro: "De video's maakten verandering menselijker en versterkten de interne connectie.",
    externalVideoUrl: "https://f.io/EJ_dI-WD",
  },
  {
    slug: "frankie-villager",
    template: "visit-antwerpen-social",
    client: "Frankie Villager",
    title: "FRANKIE VILLAGER",
    subtitle: "Een brandvideo in de stijl van The Office  🏢💼.",
    oneLiner: "Een brandvideo in de stijl van The Office  🏢💼.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: "https://vimeo.com/1174433861?share=copy&fl=cl&fe=ci",
    sourceType: "manual-vimeo",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    seo: {
      title: "Frankie Villager | Ami Amis",
      description:
        "Frankie Villager klopte bij ons aan met een duidelijke vraag: kunnen jullie een brandvideo maken in de stijl van The Office  🏢💼?",
    },
    introQuote: "Kunnen jullie een video maken voor ons in de stijl van The Office  🏢💼?",
    intro:
      "Frankie Villager klopte bij ons aan met een duidelijke vraag: kunnen jullie een brandvideo maken in de stijl van The Office  🏢💼?\n\nChallenge accepted! 💪\n\nAls communicatie- en brandingbureau weet Frankie Villager natuurlijk héél goed wie ze zijn, dus de video moest niet gewoon “goed” zijn. Hij moest voelen als Frankie Villager: scherp, eigenzinnig, professioneel en met een hoek af.\n\nZe kwamen naar ons met een eerste scenario. Wij doken erin, werkten het verder uit en vertaalden het naar beeld. Denk: crash zooms, droge blikken, ongemakkelijke stiltes en chaos op kantoor.\n\nOp de draaidag zelf hielden we ruimte voor improvisatie, want sommige fratsen kan je nu eenmaal niet voorspellen. Zo kwamen we uit op een video die een korte, fictieve inkijk geeft in het dagelijkse leven op kantoor bij Frankie Villager.",
    summary:
      "Een grappige, gedurfde en originele brandvideo die hun merkidentiteit ademt.",
    deliverables: ["Brandvideo", "Scenario", "Regie", "Productie"],
    storyBlocks: [
      {
        text:
          "Frankie Villager klopte bij ons aan met een duidelijke vraag: kunnen jullie een brandvideo maken in de stijl van The Office  🏢💼?",
      },
      {
        text: "Challenge accepted! 💪",
      },
      {
        text:
          "Als communicatie- en brandingbureau weet Frankie Villager natuurlijk héél goed wie ze zijn, dus de video moest niet gewoon “goed” zijn. Hij moest voelen als Frankie Villager: scherp, eigenzinnig, professioneel en met een hoek af.",
      },
      {
        text:
          "Ze kwamen naar ons met een eerste scenario. Wij doken erin, werkten het verder uit en vertaalden het naar beeld. Denk: crash zooms, droge blikken, ongemakkelijke stiltes en chaos op kantoor.",
      },
      {
        text:
          "Op de draaidag zelf hielden we ruimte voor improvisatie, want sommige fratsen kan je nu eenmaal niet voorspellen. Zo kwamen we uit op een video die een korte, fictieve inkijk geeft in het dagelijkse leven op kantoor bij Frankie Villager.",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    hero: {
      image: "/work/frankie-villager-thumb.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/6cffe75a-32d7-492f-b9ef-3d1bb5325b64/ChatGPT+Image+17+mrt+2026,+16_18_13.png",
    },
    heroSticker: {
      src: "/images/cases/frankie-villager/frankie-villager-sticker.png",
    },
    gallery: [{ src: "/work/frankie-villager-thumb.webp", alt: "Frankie Villager projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1174433861",
        title: "Frankie Villager brandvideo",
        url: "https://vimeo.com/1174433861?share=copy&fl=cl&fe=ci",
        wide: true,
        aspectRatio: "16 / 9",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1174433861",
          title: "Frankie Villager brandvideo",
          url: "https://vimeo.com/1174433861?share=copy&fl=cl&fe=ci",
          wide: true,
          aspectRatio: "16 / 9",
        },
      ],
    },
    vimeoEmbeds: [vimeo("1174433861", "Frankie Villager brandvideo")],
    facts: [
      { label: "Output", value: "brandvideo" },
      { label: "Stijl", value: "The Office" },
    ],
    question: {
      title: "PLACEHOLDER: vraag-titel toevoegen",
      text: "“Kunnen jullie een video maken voor ons in de stijl van The Office  🏢💼?”",
    },
    approach: {
      title: "PLACEHOLDER: aanpak-titel toevoegen",
      text:
        "We namen hun script als basis, onderzochten de typische mockumentary-stijl van het programma en brachten die samen met onze eigen visie op de draaidag.",
    },
    result: {
      title: "PLACEHOLDER: resultaat-titel toevoegen",
      text: "Een grappige, gedurfde en originele brandvideo die hun merkidentiteit ademt.",
      stats: [
        { value: "1", label: "brandvideo" },
        { value: "...", label: "placeholder" },
        { value: "...", label: "placeholder" },
        { value: "...", label: "placeholder" },
      ],
    },
    outro: "PLACEHOLDER: outro-tekst toevoegen.",
    externalVideoUrl: "https://vimeo.com/1174433861?share=copy&fl=cl&fe=ci",
  },
  {
    slug: "groep-maes",
    template: "x-oats-social",
    client: "Groep Maes",
    heroTitle: "GROEP MAES",
    title: "Groep Maes",
    subtitle: "Hoogwerkoplossingen in actie.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/groepmaes"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    oneLiner:
      "Drone- en GoPro-beelden voor hoogwerkoplossingen, aangevuld met originele vacaturevideo's en campagnestrategie.",
    intro:
      "Groep Maes blinkt uit in innovatieve hoogwerkoplossingen. Om het unieke “point of view” van een hoogtewerker te laten zien tijdens het installeren van ledverlichting in een voetbalstadion, gebruikten we spectaculaire drone- en GoPro-beelden. Voor het eerste concept van deze aanwervingscampagne gingen we vol enthousiasme mee op pad met enkele hoogtewerkers om unieke vacaturevideo’s te maken – ideaal voor sociale media. Het leukste detail? De video’s worden gepresenteerd door de dochter van de CEO! Een subtiele knipoog naar de warme, familiale sfeer die Groep Maes zo bijzonder maakt.",
    summary:
      "Drone- en GoPro-beelden voor hoogwerkoplossingen, aangevuld met originele vacaturevideo's en campagnestrategie.",
    introQuote: "Groep Maes wilde hun technische werk en warme bedrijfscultuur zichtbaarder maken.",
    storyBlocks: [
      {
        text:
          "Groep Maes blinkt uit in innovatieve hoogwerkoplossingen. Om het unieke “point of view” van een hoogtewerker te laten zien tijdens het installeren van ledverlichting in een voetbalstadion, gebruikten we spectaculaire drone- en GoPro-beelden. Voor het eerste concept van deze aanwervingscampagne gingen we vol enthousiasme mee op pad met enkele hoogtewerkers om unieke vacaturevideo’s te maken – ideaal voor sociale media. Het leukste detail? De video’s worden gepresenteerd door de dochter van de CEO! Een subtiele knipoog naar de warme, familiale sfeer die Groep Maes zo bijzonder maakt.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Actiebeelden", "Drone", "GoPro", "Vacaturevideo's", "Campagnestrategie"],
    hero: {
      image: "/work/groep-maes.webp",
    },
    hideInfoStrip: true,
    ctaVariant: "blue",
    ctaTitle: "Durf jij een samenwerking aan te gaan?",
    ctaButton: "Eens afspreken?",
    footerVariant: "dark",
    gallery: [],
    vimeoEmbeds: [
      vimeo("1055488422", "Groep Maes video 1", "66a9e925c9"),
      vimeo("1055488333", "Groep Maes video 2", "97ea7df7e1"),
      vimeo("926207596", "Groep Maes video 3"),
    ],
    media: {
      hero: vimeoCaseMedia("1055488422", "Groep Maes video 1", "66a9e925c9"),
      verticalVideos: [
        vimeoCaseMedia("1055488422", "Groep Maes video 1", "66a9e925c9"),
        vimeoCaseMedia("1055488333", "Groep Maes video 2", "97ea7df7e1"),
        vimeoCaseMedia("926207596", "Groep Maes video 3"),
        imageCaseMedia("/work/groep-maes.webp", "Groep Maes projectbeeld"),
      ],
    },
    needsReview: true,
    needsEditorialSplit: false,
    facts: [],
    question: {
      title: "Hoe toon je hoogwerkers én vacatures op een manier die blijft hangen?",
      text:
        "Groep Maes wilde hun technische werk en warme bedrijfscultuur zichtbaarder maken.",
    },
    approach: {
      title: "Drone, GoPro en vacatureverhalen met een familiale twist.",
      text:
        "We combineerden actiebeelden van hoogwerkoplossingen met creatieve vacaturevideo's waarin de mensen en sfeer centraal staan.",
    },
    result: {
      title: "Content die techniek menselijk maakt.",
      text:
        "Groep Maes kreeg inzetbare video's voor social media, employer branding en campagnegebruik.",
      stats: [
        { value: "3", label: "video’s" },
        { value: "drone", label: "beelden" },
        { value: "GoPro", label: "beelden" },
        { value: "vacature", label: "video’s" },
      ],
    },
    outro: "Groep Maes kreeg inzetbare video's voor social media, employer branding en campagnegebruik.",
    externalVideoUrls: ["https://www.amiamis.com/work/groepmaes", "https://f.io/NUX0WIU3", "https://f.io/ikINiub0"],
  },
  {
    slug: "vdab",
    template: "x-oats-social",
    client: "VDAB",
    heroTitle: "VDAB",
    title: "Events, jobbeurzen en fotografie",
    subtitle: "Maandelijkse events vastgelegd in video en foto.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Fotografie", "Social content"],
    year: "2026",
    sourceUrl: oldSource("/work/vdab"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "mixed-media",
    intro:
      "Op zoek naar een job? Dan is VDAB absoluut the place to be. Als videovrienden staan we klaar om de maandelijkse jobbeurzen en andere events van VDAB vast te leggen op beeld. Daarnaast hebben we ook al een aantal foto-opdrachten voor hen mogen uitvoeren – iets waar we bijzonder trots op zijn!",
    summary:
      "Maandelijkse jobbeurzen en events vastgelegd in video, aangevuld met foto-opdrachten.",
    introQuote: "VDAB wilde events, jobdates en persoonlijke verhalen inzetten als toegankelijke video- en fotocontent.",
    storyBlocks: [
      {
        text:
          "Op zoek naar een job? Dan is VDAB absoluut the place to be. Als videovrienden staan we klaar om de maandelijkse jobbeurzen en andere events van VDAB vast te leggen op beeld. Daarnaast hebben we ook al een aantal foto-opdrachten voor hen mogen uitvoeren – iets waar we bijzonder trots op zijn!",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Eventvideo", "Social media video", "Fotografie"],
    hero: {
      image: "/work/vdab.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/096bce0b-8e68-4440-840e-7ff053c9ffb9/VDAB+Banner+foto.JPG",
    },
    gallery: [{ src: "/work/vdab.webp", alt: "VDAB projectbeeld" }],
    vimeoEmbeds: [
      vimeo("1055573602", "VDAB social media video"),
      vimeo("1055574019", "VDAB video 2"),
      vimeo("1055577145", "VDAB video 3"),
    ],
    media: {
      hero: vimeoCaseMedia("1055573602", "VDAB social media video"),
      verticalVideos: [
        vimeoCaseMedia("1055573602", "VDAB social media video"),
        vimeoCaseMedia("1055574019", "VDAB video 2"),
        vimeoCaseMedia("1055577145", "VDAB video 3"),
        imageCaseMedia("/work/vdab.webp", "VDAB projectbeeld"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "jobvideo's" },
      { label: "Type", value: "event en social" },
    ],
    question: {
      title: "Hoe maak je jobevents en getuigenissen menselijker en concreter?",
      text:
        "VDAB wilde events, jobdates en persoonlijke verhalen inzetten als toegankelijke video- en fotocontent.",
    },
    approach: {
      title: "Authentieke verhalen met duidelijke eventenergie.",
      text:
        "We legden jobbeurzen, werkgevers en getuigenissen vast in dynamische formats die tonen wat VDAB mogelijk maakt.",
    },
    result: {
      title: "Content die werkzoekenden sneller mee in het verhaal trekt.",
      text:
        "VDAB kreeg herkenbare video- en fotocontent voor events, social en gerichte communicatie.",
      stats: [
        { value: "3", label: "video’s" },
        { value: "job", label: "beurzen" },
        { value: "events", label: "content" },
        { value: "foto", label: "opdrachten" },
      ],
    },
    outro: "VDAB kreeg herkenbare video- en fotocontent voor events, social en gerichte communicatie.",
    externalVideoUrl: "https://f.io/l92Q995M",
  },
  {
    slug: "x-oats",
    template: "x-oats-social",
    client: "X-Oats",
    title: "X-OATS",
    oneLiner: "Twee funny maar duidelijke advertenties die samen meer dan een miljoen mensen hebben bereikt.",
    category: "Social content",
    categories: ["Social content", "Fotografie", "Video & campagnes"],
    year: "2026",
    mediaType: "vertical-video-grid",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    seo: {
      title: "X-Oats | Ami Amis",
      description:
        "Voor X-Oats maakte Ami Amis op korte tijd twee advertenties die samen meer dan een miljoen mensen bereikten.",
    },
    introQuote:
      "“Over één week vieren wij de mijlpaal van 1.000.000 sales! Kunnen we short notice een advertentieconcept uitwerken én uitvoeren? Binnen enkele dagen, ofzo?” 🫣🫣🫣",
    intro:
      "Onze gezonde vrienden van X-Oats mogen altijd komen aankloppen met een creatieve uitdaging. Of zelfs twee. Voor hun ambitieuze mijlpaal schreven, draaiden en monteerden we in no-time twee spotjes. Strak gepland, stevig doorgewerkt en veel plezier gehad.",
    storyBlocks: [
      {
        kicker: "",
        text:
          "Onze gezonde vrienden van X-Oats mogen altijd komen aankloppen met een creatieve uitdaging. Of zelfs twee. Voor hun ambitieuze mijlpaal schreven, draaiden en monteerden we in no-time twee spotjes. Strak gepland, stevig doorgewerkt en veel plezier gehad.",
      },
      {
        kicker: "",
        text:
          "Voor het eerste spotje werkten we samen met fitfluencer Yinne Gymness. We combineerden iPhone-beelden met beelden van een professionele camera, waardoor de video begon als een herkenbare influencervideo en eindigde als een high-end reclamespot. Echt dope.",
      },
      {
        kicker: "",
        text:
          "Terwijl die video werd gedraaid, bouwden we in Humgy Central een kleine set op. ‘s Namiddags veranderden we die in een politie-ondervraging. X-Oats CEO Kevin werd aan de tand gevoeld door onze eigen kapoen Brent. Het resultaat? Episch.",
      },
    ],
    storyHighlights: [[], [], []],
    outro:
      "De spots bereikten samen meer dan een miljoen mensen. Great success. Die kaap van 2 miljoen? Die komt er in no time.",
    deliverables: ["Social content", "Video & campagnes"],
    hero: {
      image: "/work/x-oats-thumb.webp",
      poster: "/work/x-oats-thumb.webp",
    },
    question: {
      label: "Vraag",
      title: "",
      text: "Kunnen jullie op drie dagen tijd twee spots schrijven, draaien en opleveren?",
    },
    approach: {
      label: "Aanpak",
      title: "",
      text:
        "X-Oats CEO Kevin had enkele ideeën die wij meteen hebben uitgewerkt. Onze producers schakelden snel en gingen gelijktijdig aan de slag. Twee dagen later stonden we al op shoot! Terwijl de tweede spot werd opgenomen, zat de eerste al in montage. Daarna nog een nachtje doortrekken en tijdig opleveren. Da’s durven. 😏",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Twee funny maar duidelijke advertenties die samen meer dan een miljoen mensen hebben bereikt.",
      stats: [
        { value: "2", label: "spotjes" },
        { value: "3", label: "dagen" },
        { value: "1M+", label: "mensen bereikt" },
        { value: "1.000.000", label: "sales milestone" },
      ],
    },
    media: {
      hero: {
        type: "video",
        src: "/videos/cases/x-oats/x-oats-yinne-gymness.mp4",
      },
      verticalVideos: [
        {
          title: "Yinne Gymness",
          src: "/videos/cases/x-oats/x-oats-yinne-gymness.mp4",
        },
        {
          title: "Politie-ondervraging",
          src: "/videos/cases/x-oats/x-oats-politie-ondervraging.mp4",
        },
      ],
    },
    services: ["Concept", "Draaien", "Montage", "Social content"],
    nextCase: {
      title: "Visit Antwerpen",
      href: "/work/visitantwerp/",
    },
  },
];

export function getAllCaseSlugs() {
  return cases.flatMap((item) => [item.slug, ...(item.aliases || [])]);
}

export function getCaseBySlug(slug) {
  return cases.find((item) => item.slug === slug || item.aliases?.includes(slug));
}
