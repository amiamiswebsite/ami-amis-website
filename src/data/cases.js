const OLD_SITE = "https://www.amiamis.com";

const oldSource = (path) => `${OLD_SITE}${path}`;

const vimeo = (id, title, hash) => ({ id, title, ...(hash ? { hash } : {}) });

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
    client: "Tarzan en Jane",
    title: "Tarzan en Jane",
    subtitle: "Speelse content voor een gezinsmerk.",
    category: "Social content",
    categories: ["Social content", "Video & campagnes"],
    year: "2026",
    deliverables: ["Social content", "Video & campagnes"],
    heroMedia: {
      type: "vimeo",
      id: "1202756768",
      title: "Tarzan en Jane video",
    },
    hero: null,
    gallery: [],
    ...manualNeedsContent,
    mediaType: "vimeo-video",
    hideShowcase: true,
    sourceType: "master-portfolio",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    oneLiner: "Een kleurrijke videoclip vol energie, ritme en jungleplezier.",
    intro:
      "Voor Tarzan & Jane maakten we een kleurrijke videoclip vol energie, ritme en jungleplezier. De video vormt de start van een bredere contentaanpak waarmee hun speelse wereld online verder groeit.",
    summary:
      "Een energieke videoclip en maandelijkse contentaanpak voor de indoor jungle van Tarzan & Jane.",
    facts: [],
    question: {
      title: "Hoe breng je een speelse indoorwereld online tot leven?",
      text:
        "Tarzan & Jane wilde content die hun kleurrijke energie ook buiten de binnenspeeltuin voelbaar maakt.",
    },
    approach: {
      title: "Een videoclip vol ritme, kleur en jungleplezier.",
      text:
        "We filmden de speeltuin als een groot avontuur, met snelle cuts, vrolijke beelden en veel beweging. Daarna groeide de samenwerking verder in maandelijkse social content en grafische ontwerpen.",
    },
    result: {
      title: "Content die de fun meteen laat voelen.",
      text:
        "Een herkenbare videoclip die de Tarzan & Jane-vibe vertaalt naar vrolijke, deelbare content.",
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
    client: "Humgy",
    title: "Humgy",
    subtitle: "Content voor een warme coworking community.",
    category: "Social content",
    categories: ["Social content", "Fotografie", "Marketingstrategie"],
    year: "2026",
    deliverables: ["Social content", "Fotografie", "Marketingstrategie"],
    hero: {
      image: "/images/work/humgy.jpg",
      poster: "/images/work/humgy.jpg",
    },
    gallery: [],
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
    },
    externalVideoUrl: "https://f.io/FG9AAvBN",
  },
  {
    slug: "imore",
    client: "imore",
    title: "Social Media van A-Z",
    subtitle: "Socials volledig uit handen genomen.",
    category: "Social content",
    categories: ["Social content", "Fotografie", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/imore"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "mixed-media",
    intro:
      "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, vertrouwt ons volledig voor het beheren van hun socials. Wij nemen elke maand het volledige proces uit handen: van concept en contentcreatie tot copywriting en contentplanning. Het enige wat ze nog hoeven te doen, is de content goedkeuren voordat die live gaat, zodat ze zich helemaal kunnen focussen op waar ze het best in zijn: het ontwerpen van prachtige interieurs voor hun klanten!",
    summary:
      "Voor imore nemen we elke maand het social proces uit handen: concept, contentcreatie, copywriting en contentplanning.",
    deliverables: ["Social content", "Fotografie", "Copywriting", "Contentplanning"],
    hero: {
      image: "/work/imore.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/6489c50c-e9ce-4e3b-98b1-5f129ff42f82/imore+Banner.png",
    },
    gallery: [{ src: "/work/imore.webp", alt: "imore projectbeeld" }],
    vimeoEmbeds: [
      vimeo("1055562671", "imore video 1", "688a1873bb"),
      vimeo("1055562589", "imore video 2", "d817a8a495"),
      vimeo("1055562711", "imore video 3", "90107e79ed"),
    ],
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "social content" },
      { label: "Format", value: "interieurvideo's" },
    ],
    question: {
      title: "Hoe hou je sterke interieurprojecten zichtbaar doorheen het hele jaar?",
      text:
        "imore wilde stijlvolle content die hun interieurprojecten toont van werf tot afgewerkt resultaat.",
    },
    approach: {
      title: "Maandelijkse content met oog voor ruimte en detail.",
      text:
        "We combineren projectbeelden, droneshots en social formats tot een consistente contentflow. Zo krijgt elk interieurproject een visuele vertaling die past bij imore's stijl.",
    },
    result: {
      title: "Een social aanpak die hun projecten laat ademen.",
      text:
        "imore krijgt doorlopend content die hun vakmanschap, beleving en oog voor detail zichtbaar maakt.",
    },
    externalVideoUrls: ["https://f.io/3c8BbG-6", "https://f.io/7wn7_d2a"],
  },
  {
    slug: "hypotheekwereld",
    client: "Hypotheekwereld",
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
    deliverables: ["Storyboarding", "Animatie", "Billboard-video", "Campagne-aanpak"],
    hero: {
      image: "/work/hypotheekwereld.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/db9e3270-08a1-445f-86da-30e139f1d62c/hypotheekwereld+thumbnail.png",
    },
    gallery: [{ src: "/work/hypotheekwereld.webp", alt: "Hypotheekwereld projectbeeld" }],
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
    },
    externalVideoUrl: "https://www.amiamis.com/work/hypotheekwereld",
  },
  {
    slug: "k-lierse-sk",
    client: "K. Lierse S.K.",
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
    deliverables: ["Videopartnership", "Wedstrijdvideo", "Aftermovie", "Clubcontent"],
    hero: {
      image: "/work/lierse.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/23307d45-60f2-450b-a955-4affc113ba52/Banner+Lierse.png",
    },
    gallery: [{ src: "/work/lierse.webp", alt: "K. Lierse S.K. projectbeeld" }],
    vimeoEmbeds: [vimeo("1055589802", "Stadiumnaam aankondiging", "3b7c6b293a")],
    needsReview: true,
    facts: [
      { label: "Output", value: "clubcontent" },
      { label: "Type", value: "videopartnership" },
    ],
    externalVideoUrls: [
      "https://vimeo.com/1055593959/ef72b6897c",
      "https://vimeo.com/1055589802/3b7c6b293a",
    ],
  },
  {
    slug: "4allseasons",
    client: "4 All Seasons",
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
    },
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
    client: "Salus",
    title: "Regionale spot met meetbaar verkoopresultaat",
    subtitle: "Medicair-slaapsysteem op regionale zenders.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/salus"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Salus, een beddenfabrikant uit Mechelen én een van onze langste klanten, vroeg ons om een reclamespot te maken voor hun elektrische Medicairslaapsysteem - specifiek voor regionale zenders. Natuurlijk zeiden we meteen volmondig “JA”! We bedachten een concept om de bedden op een leuke manier in de spotlight te zetten. Vervolgens trokken we eropuit om de spot te filmen en monteren. Het resultaat? Salus zag de verkoop van hun elektrische bedden exploderen: van nauwelijks één bed per kwartaal naar maar liefst 40 stuks in slechts een maand tijd na de lancering van de spot!",
    summary:
      "Een reclamespot voor het elektrische Medicair-slaapsysteem die de verkoop sterk deed stijgen na lancering.",
    deliverables: ["Reclamespot", "Concept", "Productie", "Montage"],
    hero: {
      image: "/work/salus.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/547f72ea-4a22-4cd5-be47-e5aa325e66d6/banner.png",
    },
    result: {
      title: "Bijna 8 keer meer Medicair bedden verkocht sinds de lancering van de nieuwe spot!",
      text:
        "Salus ging van nauwelijks één bed per kwartaal naar 40 stuks in een maand tijd na de lancering van de spot.",
      stats: [{ value: "40", label: "bedden in 1 maand" }],
    },
    gallery: [{ src: "/work/salus.webp", alt: "Salus projectbeeld" }],
    vimeoEmbeds: [vimeo("1055218065", "Salus spot"), vimeo("1055217563", "Salus spot 2")],
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "regionale spot" },
      { label: "Resultaat", value: "40 bedden in 1 maand" },
    ],
    question: {
      title: "Hoe zet je een elektrisch slaapsysteem helder in de kijker?",
      text:
        "Salus wilde een regionale reclamespot die het Medicair-slaapsysteem op een toegankelijke manier verkoopt.",
    },
    approach: {
      title: "Een ludiek concept met volledige productie.",
      text:
        "We bedachten het concept, filmden de spot en zorgden voor montage en afwerking voor regionale zenders en social gebruik.",
    },
    externalVideoUrls: ["https://www.amiamis.com/work/salus", "https://f.io/azJcL9Si", "https://f.io/Tj1ag13y"],
  },
  {
    slug: "konligo",
    client: "Konligo",
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
    deliverables: ["Showcase", "Fotografie", "Aftermovie"],
    hero: {
      image: "/work/konligo.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/1730802473910-E5QVIU5HU9EU1GUSH90G/LinkedIn.png",
    },
    gallery: [{ src: "/work/konligo.webp", alt: "Konligo projectbeeld" }],
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
    },
    externalVideoUrl: "https://f.io/w-LP7QYP",
  },
  {
    slug: "billy-bonkers",
    aliases: ["billy-bonkers-stad-gent"],
    client: "Billy Bonkers",
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
    },
    externalVideoUrl: "https://f.io/JOJD6hvM",
  },
  {
    slug: "jurimesh",
    client: "Jurimesh",
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
    },
    externalVideoUrl: "https://f.io/qsJgMwfl",
  },
  {
    slug: "sporthouse-group",
    client: "Sporthouse Group",
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
    },
    externalVideoUrl: "https://www.youtube.com/watch?v=k60oW1nvoPg",
  },
  {
    slug: "blutsqi",
    client: "Blutsqi",
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
    },
    externalVideoUrl: "https://f.io/_G4a7McI",
  },
  {
    slug: "zorgbedrijf",
    aliases: ["zorgbedrijf-antwerpen"],
    client: "Zorgbedrijf",
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
    },
    externalVideoUrl: "https://f.io/EJ_dI-WD",
  },
  {
    slug: "frankie-villager",
    client: "Frankie Villager",
    title: "Brandvideo met droge humor",
    subtitle: "Een fictieve blik op kantoor.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/frankie-villager"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Frankie Villager klopte bij ons aan met de vraag om een brandvideo te maken. Omdat zij zelf een communicatie- en brandingbureau zijn, was het belangrijk dat de video niet alleen kwalitatief sterk was, maar ook perfect aansloot bij hun eigen merkidentiteit. Ze presenteerden ons een beknopt scenario, dat wij samen verder uitwerkten en tot leven brachten. In overleg kozen we voor een stijl die geïnspireerd is op hun favoriete reeks The Office — met crash zooms, droge humor en ongemakkelijke situaties. Het resultaat is een korte, fictieve inkijk in het dagelijks leven op het kantoor van Frankie Villager. Zo zetten ze hun merk op een gedurfde en originele manier in de kijker. De uitdaging lag in het vinden van de juiste balans tussen humor en professionaliteit. We lieten voldoende ruimte voor improvisatie en pasten het script flexibel aan op de dag zelf. Zo groeide hun oorspronkelijke idee uit tot een video die hun merk volledig weerspiegelt én hun scenario naar een hoger niveau tilt.",
    summary:
      "Een brandvideo geïnspireerd op The Office, met crash zooms, ongemakkelijke situaties en een fictieve blik op kantoor.",
    deliverables: ["Brandvideo", "Scenario", "Regie", "Productie"],
    hero: {
      image: "/work/frankie-villager-thumb.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/6cffe75a-32d7-492f-b9ef-3d1bb5325b64/ChatGPT+Image+17+mrt+2026,+16_18_13.png",
    },
    gallery: [{ src: "/work/frankie-villager-thumb.webp", alt: "Frankie Villager projectbeeld" }],
    vimeoEmbeds: [vimeo("1174433861", "Frankie Villager brandvideo")],
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "brandvideo" },
      { label: "Stijl", value: "The Office" },
    ],
    question: {
      title: "Hoe maak je een brandvideo voor een communicatiebureau die niet braaf voelt?",
      text:
        "Frankie Villager wilde een kwalitatieve video die hun eigen merkidentiteit en gevoel voor humor draagt.",
    },
    approach: {
      title: "Droge humor, crash zooms en ruimte voor improvisatie.",
      text:
        "We verfijnden hun scenario samen en brachten het tot leven in een fictieve kantoorwereld met The Office-vibe.",
    },
    result: {
      title: "Een originele brandvideo met precies genoeg ongemak.",
      text:
        "De video zet Frankie Villager op een herkenbare, gedurfde en professionele manier neer.",
    },
    externalVideoUrl: "https://f.io/nnGPhaVj",
  },
  {
    slug: "groep-maes",
    client: "Groep Maes",
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
    deliverables: ["Actiebeelden", "Drone", "GoPro", "Vacaturevideo's", "Campagnestrategie"],
    hero: null,
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
    },
    externalVideoUrls: ["https://www.amiamis.com/work/groepmaes", "https://f.io/NUX0WIU3", "https://f.io/ikINiub0"],
  },
  {
    slug: "vdab",
    client: "VDAB",
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
    },
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
