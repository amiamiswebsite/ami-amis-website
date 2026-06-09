const OLD_SITE = "https://www.amiamis.com";

const oldSource = (path) => `${OLD_SITE}${path}`;

const vimeo = (id, title) => ({ id, title });

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
    hero: {
      image: "/images/work/tarzan-en-jane.jpg",
      poster: "/images/work/tarzan-en-jane.jpg",
    },
    gallery: [],
    ...manualNeedsContent,
  },
  {
    slug: "visitantwerp",
    aliases: ["visit-antwerpen"],
    template: "visit-antwerpen-social",
    client: "Visit Antwerpen",
    title: "VISIT ANTWERPEN",
    category: "Social content",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    seo: {
      title: "Visit Antwerpen case | Ami Amis",
      description:
        "Voor Visit Antwerpen maakte Ami Amis 10 social media video's die Antwerpen in de kijker zetten, met een virale frituurtour als eerste resultaat.",
    },
    introQuote:
      "Hey, we hebben jullie Zuidvideo gezien. Hoe verfrissend dat jullie eigenwijze en gedurfde content maken! Dat willen wij ook.",
    intro:
      "Zo kwam Visit Antwerp bij ons aankloppen. Niet veel later kregen we de vraag of wij voor hen 10 social media video's wilden maken om Antwerpen in de kijker te zetten, gespreid over 4 maanden. We hadden één doel: mensen zin doen krijgen om onze stad in te duiken.",
    storyBlocks: [
      {
        kicker: "Het begin",
        text:
          "Zo kwam Visit Antwerp bij ons aankloppen. Niet veel later kregen we de vraag of wij voor hen 10 social media video's wilden maken om Antwerpen in de kijker te zetten, gespreid over 4 maanden. We hadden één doel: mensen zin doen krijgen om onze stad in te duiken.",
      },
      {
        kicker: "De magie",
        text:
          "Visit Antwerp kwam met de concepten, wij zorgden voor de magie. Productie, draaien, monteren, finetunen en soms zelfs acteren 🤭. We namen alles uit handen, en met succes! De allereerste video die we opleverden, de frituurtour, ging meteen viraal. Met 43K weergaven en 1314 likes werd het meteen hun meest bekeken video ooit.",
      },
      {
        kicker: "De reeks",
        text:
          "Daarna trokken we heel Antwerpen rond voor de overige video's. Een cultuurtour waarin we in 24 uur zoveel mogelijk cultuur beleven? Een koffietour om de Antwerp Coffee Week aan te kondigen? Of 3 tips van een local fashion-lover voor het gloednieuwe Antwerp Fashion Festival? Wij zorgden ervoor 💪. Zo bekwamen we een reeks frisse, energieke social video's met een kwalitatieve look, gemaakt om iedereen die Antwerpen nog niet kent instant FOMO te bezorgen.",
      },
    ],
    outro:
      "En die toeristen die je nu overal in Antwerpen ziet rondlopen? Wij zeggen niet dat ze door ons komen. Maar we sluiten het ook niet uit 😉…",
    question: {
      label: "Vraag",
      title: "10 social media video's die Antwerpen nóg aantrekkelijker maken.",
      text:
        "Maak 10 social media video's die Antwerpen in 4 maanden tijd nóg aantrekkelijker maken voor bezoekers.",
    },
    approach: {
      label: "Aanpak",
      title: "Concepten van Visit Antwerp, productie en magie van Ami Amis.",
      text:
        "Visit Antwerp kwam met de ideeën, wij brachten ze tot leven. Met een duidelijke planning, een flexibele crew en veel goesting trokken we door de stad om elke video van concept tot montage uit te werken. Geen droge toeristische promo, maar snelle, energieke content die voelt alsof je er zelf bij wil zijn.",
    },
    result: {
      label: "Resultaat",
      title: "Frisse social video's met instant FOMO.",
      text:
        "Een reeks frisse, energieke social video's met een kwalitatieve look, gemaakt om iedereen die Antwerpen nog niet kent instant FOMO te bezorgen.",
      stats: [
        { value: "10", label: "social media video's" },
        { value: "4", label: "maanden content" },
        { value: "43K", label: "weergaven op frituurtour" },
        { value: "1314", label: "likes" },
      ],
    },
    media: {
      zuidVideo: {
        label: "Zuidvideo",
        type: "popup",
        src: "/videos/cases/visit-antwerpen/zuidvideo.mp4",
        poster: "",
      },
      hero: {
        type: "video",
        src: "/videos/cases/visit-antwerpen/frituurtour.mp4",
        poster: "",
      },
      verticalVideos: [
        {
          title: "Frituurtour",
          src: "/videos/cases/visit-antwerpen/frituurtour.mp4",
          poster: "",
        },
        {
          title: "Cultuurtour",
          src: "/videos/cases/visit-antwerpen/cultuurtour.mp4",
          poster: "",
        },
        {
          title: "Koffietour",
          src: "/videos/cases/visit-antwerpen/koffietour.mp4",
          poster: "",
        },
        {
          title: "Fashion local",
          src: "/videos/cases/visit-antwerpen/fashion-local.mp4",
          poster: "",
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
      vimeo("1055562711", "imore video 1"),
      vimeo("1055562589", "imore video 2"),
      vimeo("1055562671", "imore video 3"),
    ],
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
    vimeoEmbeds: [
      vimeo("1055593959", "Videopartnership Lierse"),
      vimeo("1055589802", "Stadiumnaam aankondiging"),
      vimeo("1055590019", "Aftermovie"),
    ],
  },
  {
    slug: "4allseasons",
    client: "4allseasons",
    title: "Campagnes voor vegan cosmetics",
    subtitle: "Langlopende samenwerking rond spots, content en fotografie.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Fotografie", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/4allseasons"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: true,
    mediaType: "mixed-media",
    intro:
      "4 All Seasons is al sinds het begin van ons bestaan een trouwe klant, een samenwerking die getuigt van een diepgeworteld vertrouwen en een gedeelde visie op kwaliteit en duurzaamheid. Door de jaren heen hebben we voor 4 All Seasons een reeks projecten gerealiseerd die niet alleen hun commitment aan vegan en milieuvriendelijke producten benadrukken, maar ook de essentie van hun merk op een authentieke manier naar voren brengen. Een van onze meest memorabele projecten is een high-end televisiecampagne die de ethische waarden van het merk visualiseert, samen met reclamespots voor Kinepolis en televisie, die het bewustzijn en de filosofie van 4 All Seasons vergroten. Onze samenwerking strekte zich verder uit tot een influencer campagne op social media, die het bereik van het merk aanzienlijk heeft vergroot. Daarnaast hebben we 4 All Seasons ondersteund bij het aanvragen van subsidies en het opzetten van een bedrijfsvideo die het verhaal en de missie van het merk belicht. Het recente project, een billboardcampagne gekoppeld aan het VTM-programma Milo, is een voorbeeld van onze vermogen om snel en effectief te handelen - een prestatie die we in minder dan twee uur hebben gerealiseerd. Dit project onderstreept onze flexibiliteit en de naadloze samenwerking tussen onze teams en 4 All Seasons. Dit is een samenwerking die we enorm hard koesteren en waarvan we voelen dat deze nog lang zal blijven doorgaan.",
    summary:
      "Een langlopende samenwerking met tv-spots, Kinepolis-reclame, fotografie, influencer content, subsidies en campagne-ondersteuning.",
    deliverables: ["Televisiecampagne", "Kinepolis-reclame", "Fotografie", "Influencer content", "Subsidies"],
    hero: {
      image: "/work/4allseasons.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/07eb2255-00e7-4772-9ac7-dc8c16b590f9/LinkedIn.png",
    },
    gallery: [{ src: "/work/4allseasons.webp", alt: "4allseasons projectbeeld" }],
    vimeoEmbeds: [
      vimeo("1071852332", "4allseasons behind the scenes"),
      vimeo("926238307", "4allseasons aftermovie"),
      vimeo("1073163342", "4allseasons video"),
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
    needsAssetDownload: true,
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
    needsAssetDownload: true,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Voor Jurimesh ontwikkelden we een video die hun nieuwe integratie met Virtual Vaults op een heldere, toegankelijke en herkenbare manier uitlegt. Het doel van deze productie was om een technisch complexe samenwerking begrijpelijk te maken voor hun doelgroep, met een mix van dramatische opbouw, duidelijke visualisatie én een speelse punchline die de boodschap luchtig afsluit. We namen het volledige creatieve proces voor onze rekening: van het uitdenken van het concept en het schrijven van een verhalend script tot de opnames, motion graphics en technische afwerking. We zorgden ervoor dat de look-and-feel naadloos aansloot bij de identiteit van zowel Jurimesh als Virtual Vaults, zodat de video geloofwaardig aanvoelt binnen beide ecosystemen. Door de combinatie van uitleg, storytelling en humor konden we de meerwaarde van de integratie scherp in beeld brengen: sneller inzicht, minder risico’s en een workflow die juridisch én operationeel volledig op elkaar aansluit. De video wordt vandaag ingezet in sales- en marketingcontext als krachtig startpunt om de samenwerking uit te leggen, nieuwe leads te overtuigen en bestaande klanten te informeren. Dankzij een heldere verhaallijn en visuele eenvoud helpt deze productie Jurimesh om hun technologie toegankelijk en aantrekkelijk te positioneren.",
    summary:
      "Een uitlegvideo die de integratie met Virtual Vaults toegankelijk maakt via storytelling, motion graphics en humor.",
    deliverables: ["Concept", "Script", "Opnames", "Motion graphics", "Technische afwerking"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/5947df59-96e5-4035-a4f2-ad250177a9b1/Scherm­afbeelding+2026-03-03+om+15.51.02.png",
    },
    gallery: [
      {
        src:
          "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/5947df59-96e5-4035-a4f2-ad250177a9b1/Scherm­afbeelding+2026-03-03+om+15.51.02.png",
        alt: "Jurimesh projectbeeld",
      },
    ],
    vimeoEmbeds: [vimeo("1169932151", "Jurimesh video")],
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
      image: "/work/frisk.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/6cffe75a-32d7-492f-b9ef-3d1bb5325b64/ChatGPT+Image+17+mrt+2026,+16_18_13.png",
    },
    gallery: [{ src: "/work/frisk.webp", alt: "Frankie Villager projectbeeld" }],
    vimeoEmbeds: [vimeo("1174433861", "Frankie Villager brandvideo")],
  },
  {
    slug: "groep-maes",
    client: "Groep Maes",
    title: "Actiebeelden en vacaturevideo's",
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
    intro:
      "Groep Maes blinkt uit in innovatieve hoogwerkoplossingen. Om het unieke “point of view” van een hoogtewerker te laten zien tijdens het installeren van ledverlichting in een voetbalstadion, gebruikten we spectaculaire drone- en GoPro-beelden. Voor het eerste concept van deze aanwervingscampagne gingen we vol enthousiasme mee op pad met enkele hoogtewerkers om unieke vacaturevideo’s te maken – ideaal voor sociale media. Het leukste detail? De video’s worden gepresenteerd door de dochter van de CEO! Een subtiele knipoog naar de warme, familiale sfeer die Groep Maes zo bijzonder maakt.",
    summary:
      "Drone- en GoPro-beelden voor hoogwerkoplossingen, aangevuld met originele vacaturevideo's en campagnestrategie.",
    deliverables: ["Actiebeelden", "Drone", "GoPro", "Vacaturevideo's", "Campagnestrategie"],
    hero: {
      image: "/work/groep-maes.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/d8c278bf-ba0a-4f68-86d4-1cd1153c8cf3/Groep+maes+Banner.png",
    },
    gallery: [{ src: "/work/groep-maes.webp", alt: "Groep Maes projectbeeld" }],
    vimeoEmbeds: [vimeo("1055488333", "Groep Maes actiebeelden"), vimeo("1055488422", "Groep Maes vacaturevideo")],
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
  },
  {
    slug: "x-oats",
    client: "X oats",
    title: "X oats",
    subtitle: "Content voor een productmerk.",
    category: "Social content",
    categories: ["Social content", "Fotografie", "Video & campagnes"],
    year: "2026",
    deliverables: ["Social content", "Fotografie", "Video"],
    hero: {
      image: "/images/work/x-oats.jpg",
      poster: "/images/work/x-oats.jpg",
    },
    gallery: [],
    ...manualNeedsContent,
  },
];

export function getAllCaseSlugs() {
  return cases.flatMap((item) => [item.slug, ...(item.aliases || [])]);
}

export function getCaseBySlug(slug) {
  return cases.find((item) => item.slug === slug || item.aliases?.includes(slug));
}
