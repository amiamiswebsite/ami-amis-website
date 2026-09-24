const OLD_SITE = "https://www.amiamis.com";

const oldSource = (path) => `${OLD_SITE}${path}`;

const vimeo = (id, title, hash) => ({ id, title, ...(hash ? { hash } : {}) });

const vimeoCaseMedia = (id, title, hash) => ({
  type: "vimeo",
  id,
  title,
  ...(hash ? { hash } : {}),
  orientation: "landscape",
  wide: true,
  aspectRatio: "16 / 9",
});

const portraitVimeoCaseMedia = (id, title, hash) => ({
  type: "vimeo",
  id,
  title,
  ...(hash ? { hash } : {}),
  orientation: "portrait",
  wide: false,
  aspectRatio: "9 / 16",
});

const imageCaseMedia = (src, title, alt = title) => ({
  type: "image",
  src,
  title,
  alt,
  orientation: "landscape",
  wide: true,
  aspectRatio: "16 / 9",
});

const youtubeCaseMedia = (id, title, url) => ({
  type: "youtube",
  id,
  title,
  url,
  orientation: "landscape",
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

const rawCases = [
  {
    slug: "tarzan-en-jane",
    template: "visit-antwerpen-social",
    client: "Tarzan & Jane",
    title: "TARZAN & JANE",
    subtitle: "Een videoclip vol energie, kleur en plezier.",
    oneLiner:
      "Voor Tarzan & Jane trokken we onze mooiste jungle-outfits aan en maakten we een videoclip vol energie, kleur en plezier.",
    category: "Social content",
    categories: [
      "Video & campagnes",
      "Social content",
      "Fotografie",
      "Design & branding",
      "Radio & Podcast",
    ],
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
        text: "Voor Tarzan & Jane trokken we onze mooiste jungle-outfits aan en maakten we een videoclip vol energie, kleur en plezier.",
      },
      {
        kicker: "",
        text: "Maar we wilden niet gewoon een video maken. We wilden hun hele speeltuin laten zingen, springen en swingen. Van de eerste beat tot de laatste glijpartij moest alles voelen als één groot avontuur.",
      },
      {
        kicker: "",
        text: "De videoclip vangt perfect de sfeer van Tarzan & Jane: een vrolijke indoor jungle waar kinderen zich kunnen uitleven en ouders spontaan mee in de fun worden gezogen. Met snelle cuts, ritme, speelse beelden en een flinke dosis kinderlijke energie brachten we hun wereld tot leven op beeld.",
      },
      {
        kicker: "",
        text: "Het resultaat? Een videoclip die blijft plakken. Letterlijk. Het liedje wordt intussen regelmatig afgespeeld bij Tarzan & Jane en het dansje wordt vaak uitgevoerd in de speeltuin. Missie geslaagd dus: content die niet alleen bekeken wordt, maar ook echt begint te leven op de plek zelf.",
      },
      {
        kicker: "",
        text: "Vandaag werken we maandelijks samen met Tarzan & Jane om hun speelse online universum verder uit te bouwen. Elke maand creëren we 8 video’s en 4 foto’s of grafische designs voor hun social media. Zo blijft hun merk fris, zichtbaar en herkenbaar voor nieuwe én terugkerende bezoekers.",
      },
      {
        kicker: "",
        text: "Samen maken we content die even levendig is als hun speeltuin: vrolijk, kleurrijk en 100% Tarzan & Jane.",
      },
    ],
    storyHighlights: [
      ["videoclip vol energie, kleur en plezier"],
      ["hele speeltuin laten zingen, springen en swingen", "één groot avontuur"],
      ["snelle cuts, ritme, speelse beelden", "wereld tot leven op beeld"],
      [
        "Een videoclip die blijft plakken",
        "content die niet alleen bekeken wordt, maar ook echt begint te leven",
      ],
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
      orientation: "landscape",
      wide: true,
      aspectRatio: "16 / 9",
    },
    hero: {
      image: "/work/tarzan-en-jane-thumb.webp",
    },
    gallery: [{ src: "/work/tarzan-en-jane-thumb.webp", alt: "Tarzan & Jane projectbeeld" }],
    imageGalleryTitle: "Fotogalerij",
    imageGalleryEyebrow: "",
    imageGallery: [
      {
        src: "/images/cases/tarzan-en-jane/tarzan-jane-gallery-01.jpg",
        alt: "Kind op pandabeeld bij Tarzan & Jane",
        orientation: "portrait",
      },
      {
        src: "/images/cases/tarzan-en-jane/tarzan-jane-gallery-02.jpg",
        alt: "Kinderen buiten bij Tarzan & Jane",
        orientation: "portrait",
      },
      {
        src: "/images/cases/tarzan-en-jane/tarzan-jane-gallery-03.jpg",
        alt: "Kinderen met Tarzan & Jane figuren in de speeltuin",
        orientation: "portrait",
      },
      {
        src: "/images/cases/tarzan-en-jane/tarzan-jane-gallery-04.jpg",
        alt: "Kinderen op indoor attractie bij Tarzan & Jane",
        orientation: "landscape",
      },
      {
        src: "/images/cases/tarzan-en-jane/tarzan-jane-gallery-05.jpg",
        alt: "Kind in botsauto bij Tarzan & Jane",
        orientation: "portrait",
      },
      {
        src: "/images/cases/tarzan-en-jane/tarzan-jane-gallery-06.jpg",
        alt: "Kind op draaimolen bij Tarzan & Jane",
        orientation: "portrait",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1202756768",
        title: "Tarzan & Jane videoclip",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1217314957",
          title: "Vlog met Minne",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
        },
        {
          type: "vimeo",
          id: "1217314956",
          title: "Zipline",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
        },
        {
          type: "vimeo",
          id: "1217314958",
          title: "Motorrace",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1202756768",
        title: "Tarzan & Jane videoclip",
      },
      {
        id: "1217314957",
        title: "Vlog met Minne",
      },
      {
        id: "1217314956",
        title: "Zipline",
      },
      {
        id: "1217314958",
        title: "Motorrace",
      },
    ],
    facts: [
      { label: "Output", value: "videoclip, social video’s, foto’s en grafische designs" },
      { label: "Format", value: "maandelijkse content" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Tarzan & Jane wilde hun indoor speeltuin ook tijdens de rustigere zomermaanden sterker in de kijker zetten. Tegelijk kon er op social media nog wat extra leven in de jungle komen: er was te weinig bereik en te weinig trafiek 🙁.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Wij zochten naar een idee dat niet voelde als de zoveelste reclamevideo. Het resultaat? Een eigen nummer en een energieke videoclip die de sfeer van Tarzan & Jane meteen voelbaar maakte. Speels, herkenbaar en een deuntje dat je niet uit je hoofd krijgt!",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "De videoclip gaf Tarzan & Jane een opvallende campagne om hun speeltuin te promoten. Van het nummer maakten we ook een radiospot voor TOPradio, waardoor de campagne verder ging dan social media alleen.\n\nWat begon als één zomeractie, groeide uit tot een warme maandelijkse samenwerking. Vandaag maken we elke maand acht video’s en vier foto’s of grafische designs om Tarzan & Jane zichtbaar, speels en top-of-mind te houden.",
    },
    externalVideoUrl: "https://f.io/xlJWANUu",

    editorialSections: [
      {
        title: "Design",
        theme: "paper",
        mediaLayout: "poster-series",
        paragraphs: [],
        images: [
          {
            src: "/images/cases/tarzan-en-jane/design-videoclip-teaser.jpg",
            alt: "Videoclipteaser voor Tarzan & Jane: de jungle warmt zich op, iets swingt eraan.",
            orientation: "portrait",
            width: 1080,
            height: 1350,
            sourceUrl: "https://www.instagram.com/p/DLkqg2UIUVW/",
          },
          {
            src: "/images/cases/tarzan-en-jane/design-waterspraypark.jpg",
            alt: "Design voor het waterspraypark van Tarzan & Jane: beleef een dag vol avontuur.",
            orientation: "portrait",
            width: 1080,
            height: 1350,
            sourceUrl: "https://www.instagram.com/p/DW3W-kNjw8j/",
          },
          {
            src: "/images/cases/tarzan-en-jane/design-krokusvakantie.jpg",
            alt: "Krokusvakantie-design met Tarzan en Jane: elke dag geopend van 10 tot 19 uur.",
            orientation: "portrait",
            width: 1080,
            height: 1350,
            sourceUrl: "https://www.instagram.com/p/DU5cBwfD_rQ/",
          },
        ],
      },
    ],
  },
  {
    slug: "visitantwerp",
    aliases: ["visit-antwerpen"],
    template: "visit-antwerpen-social",
    client: "Visit Antwerpen",
    title: "VISIT ANTWERPEN",
    oneLiner:
      "10 social video’s om Antwerpen in de kijker te zetten. De eerste ging meteen viraal.",
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
        text: "Zo kwam Visit Antwerp bij ons aankloppen. Niet veel later kregen we de vraag of wij voor hen 10 social media video’s wilden maken om Antwerpen in de kijker te zetten, gespreid over 4 maanden. We hadden één doel: mensen zin doen krijgen om onze stad in te duiken.",
      },
      {
        kicker: "",
        text: "Visit Antwerp kwam met de concepten, wij zorgden voor de magie. Productie, draaien, monteren, finetunen en soms zelfs acteren 🤭. We namen alles uit handen, en met succes!",
      },
      {
        kicker: "",
        text: "De allereerste video die we opleverden, de frituurtour, ging meteen viraal. Met 43K weergaven en 1314 likes werd het meteen hun meest bekeken video ooit.",
      },
      {
        text: "En die toeristen die je nu overal in Antwerpen ziet rondlopen? Wij zeggen niet dat ze door ons komen. Maar we sluiten het ook niet uit 😉…",
      },
    ],
    followup:
      "Daarna trokken we heel Antwerpen rond voor de overige video’s. Een cultuurtour waarin we in 24 uur zoveel mogelijk cultuur beleven? Een koffietour om de Antwerp Coffee Week aan te kondigen? Of 3 tips van een local fashion-lover voor het gloednieuwe Antwerp Fashion Festival? Wij zorgden ervoor 💪. Zo bekwamen we een reeks frisse, energieke social video’s met een kwalitatieve look, gemaakt om iedereen die Antwerpen nog niet kent instant FOMO te bezorgen.",
    outro: "",
    question: {
      label: "Vraag",
      title: "",
      text: "Visit Antwerpen had 10 leuke content ideetjes klaarstaan, maar niet genoeg handen om ze uit te werken.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Visit Antwerp kwam met de ideeën, wij brachten ze tot leven. Met een duidelijke planning, een flexibele crew en veel goesting trokken we door de stad om elke video van concept tot montage uit te werken. Geen droge toeristische promo, maar snelle, energieke content die voelt alsof je er zelf bij wil zijn.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een reeks frisse, energieke social video’s met een kwalitatieve look, gemaakt om iedereen die Antwerpen nog niet kent instant FOMO te bezorgen.",
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
        type: "vimeo",
        id: "1222095474",
        hash: "d15c6a914a",
        aspectRatio: "16/9",
        orientation: "landscape",
        url: "https://vimeo.com/1222095474?share=copy&fl=sv&fe=ci",
        fallbackSrc: "/videos/cases/visit-antwerpen/zuidvideo.mp4",
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
        {
          title: "tattoo tour",
          type: "vimeo",
          id: "1217569321",
          url: "https://vimeo.com/1217569321",
          orientation: "portrait",
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
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "mixed-media",
    oneLiner:
      "Een professionele, high-end social feed die perfect weerspiegelt waar Humgy voor staat.",
    seo: {
      title: "Humgy | Ami Amis",
      description:
        "Voor Humgy neemt Ami Amis maandelijks de volledige social contentflow over: strategie, planning, shooting, montage en publicatie.",
    },
    intro: "Hoe vertalen we de sfeer van een bruisende coworking naar een social-mediafeed? 👀",
    summary:
      "Een professionele, high-end social feed die leeft, members betrekt en nieuwe klanten overtuigt.",
    introQuote:
      "Hoe vertalen we de sfeer van een bruisende coworking naar een social-mediafeed? 👀",
    storyBlocks: [
      {
        text: "Vier coworkinglocaties, een bruisende community en altijd wel iets te vertellen. Alleen ontbrak er één klein detail: de tijd om dat allemaal consequent op social media te krijgen.",
      },
      {
        text: "Gelukkig zitten de kapoenen van Ami Amis gewoon mee in huis om dat op te lossen.😌",
      },
      {
        text: "Humgy ging met ons een maandelijkse samenwerking aan waarbij wij de volledige contentflow overnemen: van planning en ideeën tot shooting, montage en publicatie. Zo hoeft Humgy zich geen zorgen meer te maken over wat ze moeten posten, wanneer ze moeten posten of wie er nog snel een caption uit zijn mouw moet schudden.",
      },
      {
        text: "Wij zorgen voor de volledige ontzorging. 📸🎥",
      },
      {
        text: "Voor de look kozen we voor een high-end look die perfect past bij de stijlvolle locaties, zonder de warme en losse communitysfeer te verliezen. De content gaat dan ook alle kanten uit: aftermovies van events, testimonials, snackable video’s, grappige formats en content waarin we de troeven van Humgy stevig in de kijker zetten.",
      },
      {
        text: "Ook de members krijgen regelmatig hun moment in de spotlight. Want bij Humgy huur je niet gewoon een bureau. Je wordt deel van een community vol ondernemers, bedrijven en verhalen. En die verdienen het natuurlijk ook om eens te shinen. ✨",
      },
      {
        text: "Zo groeide de feed stilaan uit tot een digitale rondleiding door Humgy. Potentiële members zien meteen hoe de locaties eruitzien, wie er werkt en waarom het er nét dat tikkeltje leuker is dan op een klassiek kantoor.",
      },
      {
        text: "Het resultaat? Een professionele, herkenbare feed die leeft, members betrekt en nieuwe klanten overtuigt. Zonder dat Humgy zelf zich met captions, camera’s of contentkalenders moet bezighouden. Win-win. 🤝",
      },
    ],
    storyHighlights: [[], [], [], [], [], [], [], []],
    deliverables: ["Social strategie", "Contentplanning", "Shooting", "Montage", "Publicatie"],
    heroMedia: {
      type: "vimeo",
      id: "1215737500",
      title: "Member spotlight — Oh My George",
      orientation: "portrait",
      wide: false,
      aspectRatio: "9 / 16",
      poster: "/images/cases/video-posters/1215737500.jpg",
    },
    hero: {
      image: "/work/humgy-thumb.png",
      poster: "/work/humgy-thumb.png",
    },
    gallery: [{ src: "/work/humgy-thumb.png", alt: "Humgy projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1215737500",
        title: "Member spotlight — Oh My George",
        orientation: "portrait",
        wide: false,
        aspectRatio: "9 / 16",
        poster: "/images/cases/video-posters/1215737500.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1215737500",
          title: "Member spotlight — Oh My George",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1215737500.jpg",
        },
        {
          type: "vimeo",
          id: "1215737499",
          title: "Member spotlight — EP Plus",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1215737499.jpg",
        },
        {
          type: "video",
          src: "/videos/cases/humgy/DXHhKvGEXw8.mp4",
          poster: "/images/cases/humgy/DXHhKvGEXw8-feed.jpg",
          title: "Aftermovie",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
        },
        {
          type: "video",
          src: "/videos/cases/humgy/DMx-wVHhOTA.mp4",
          poster: "/images/cases/humgy/DMx-wVHhOTA-feed.jpg",
          title: "Grappig format",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
        },
        {
          type: "video",
          src: "/videos/cases/humgy/DNWAzo4x8g0.mp4",
          poster: "/images/cases/humgy/DNWAzo4x8g0-feed.jpg",
          title: "Snackable",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1215737500",
        title: "Member spotlight — Oh My George",
        poster: "/images/cases/video-posters/1215737500.jpg",
      },
      {
        id: "1215737499",
        title: "Member spotlight — EP Plus",
        poster: "/images/cases/video-posters/1215737499.jpg",
      },
    ],
    campaignGalleryEyebrow: "Social media",
    campaignGalleryTitle: "Humgy op Instagram",
    campaignGalleryType: "instagramProfile",
    instagramProfile: {
      handle: "humgy.cowork.antwerp",
      url: "https://www.instagram.com/humgy.cowork.antwerp/",
      bio: "Werkplekken waar go-getters zich thuisvoelen, productief kunnen werken en hun netwerk kunnen uitbreiden.",
      stats: ["4 locaties", "members", "events"],
      highlights: ["Central", "South", "Meeting?", "Community", "Wallpapers", "#HelloHumgy"],
    },
    campaignImages: [
      {
        src: "/images/cases/humgy/DXHhKvGEXw8-feed.jpg",
        alt: "Humgy Instagram post met aftermovie",
        type: "reel",
      },
      {
        src: "/images/cases/humgy/humgy-community.jpg",
        alt: "Humgy communitybeeld op Instagram",
      },
      {
        src: "/images/cases/humgy/DMx-wVHhOTA-feed.jpg",
        alt: "Humgy Instagram post met grappig format",
        type: "reel",
      },
      {
        src: "/images/cases/humgy/humgy-member-laptop.jpg",
        alt: "Humgy member aan het werk op Instagram",
      },
      {
        src: "/images/cases/humgy/DNWAzo4x8g0-feed.jpg",
        alt: "Humgy Instagram post met snackable video",
        type: "reel",
      },
      {
        src: "/images/cases/humgy/humgy-meeting.jpg",
        alt: "Humgy meetingruimte op Instagram",
      },
      {
        src: "/images/cases/humgy/humgy-reading.jpg",
        alt: "Humgy member leest in de coworkingruimte",
      },
      {
        src: "/images/cases/humgy/humgy-member-board.jpg",
        alt: "Humgy memberboard op Instagram",
      },
      {
        src: "/images/cases/humgy/humgy-stairs.jpg",
        alt: "Humgy trapportret op Instagram",
      },
    ],
    imageGalleryEyebrow: "Fotografie",
    imageGalleryTitle: "Fotografie voor Humgy",
    imageGallery: [
      {
        src: "/images/cases/humgy/humgy-community.jpg",
        alt: "Humgy-members in de coworkingruimte",
        orientation: "portrait",
      },
      {
        src: "/images/cases/humgy/humgy-member-laptop.jpg",
        alt: "Humgy-member aan het werk met een laptop",
        orientation: "portrait",
      },
      {
        src: "/images/cases/humgy/humgy-meeting.jpg",
        alt: "Overleg in een vergaderruimte van Humgy",
        orientation: "portrait",
      },
      {
        src: "/images/cases/humgy/humgy-reading.jpg",
        alt: "Humgy-member leest in de coworkingruimte",
        orientation: "portrait",
      },
      {
        src: "/images/cases/humgy/humgy-member-board.jpg",
        alt: "Memberportretten bij Humgy",
        orientation: "portrait",
      },
      {
        src: "/images/cases/humgy/humgy-stairs.jpg",
        alt: "Humgy-member op de trap van de coworkinglocatie",
        orientation: "portrait",
      },
    ],
    facts: [
      { label: "Output", value: "maandelijkse social content" },
      { label: "Locaties", value: "4 coworkinglocaties" },
      { label: "Link", value: "instagram.com/humgy.cowork.antwerp" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Humgy heeft een bruisende community en vier prachtige locaties, maar te weinig tijd en expertise om dat verhaal consequent op sociale media te vertellen.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Ami Amis nam de volledige contentflow over: strategie, contentplanning, shootings, montage en publicatie. Elke maand zorgen we voor een mix van aftermovies, testimonials, snackable video’s en content die zowel de locaties als de members in de kijker zet.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een professionele, high-end social feed die perfect weerspiegelt waar Humgy voor staat. Bestaande members voelen zich betrokken, terwijl potentiële klanten meteen de sfeer, community en meerwaarde van Humgy ervaren. En Humgy? Die kunnen zich gewoon bezighouden met waar zij goed in zijn. 😉",
      stats: [
        { value: "4", label: "locaties" },
        { value: "maandelijks", label: "contentflow" },
        { value: "IG", label: "social feed" },
        { value: "PLACEHOLDER", label: "extra cijfer" },
      ],
    },
    outro:
      "Een professionele, herkenbare feed die leeft, members betrekt en nieuwe klanten overtuigt.",
    mediaSectionTitle: "De content zelf.",
    mediaSectionIntro:
      "Afters, grappige formats, snackable content en member stories, verwerkt als compacte play-cards.",
    mediaSections: [
      {
        title: "Members",
        key: "members",
        items: [
          {
            type: "vimeo",
            id: "1215737500",
            title: "Member spotlight — Oh My George",
            hideCaption: true,
            poster: "/images/cases/video-posters/1215737500.jpg",
          },
          {
            type: "vimeo",
            id: "1215737499",
            title: "Member spotlight — EP Plus",
            hideCaption: true,
            poster: "/images/cases/video-posters/1215737499.jpg",
          },
        ],
      },
    ],
    externalVideoUrls: [
      "https://www.instagram.com/humgy.cowork.antwerp/",
      "https://www.instagram.com/p/DXHhKvGEXw8/",
      "https://www.instagram.com/p/DMx-wVHhOTA/",
      "https://www.instagram.com/p/DNWAzo4x8g0/",
      "https://vimeo.com/1215737500?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1215737499?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "imore",
    template: "visit-antwerpen-social",
    client: "Imore",
    title: "IMORE",
    subtitle: "Premium content voor premium interieurs 🪑",
    oneLiner:
      "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, ontwerpt ruimtes met oog voor elk detail.",
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
    introQuote: "Content die écht bij hun past",
    intro:
      "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, ontwerpt ruimtes met oog voor elk detail. Rustig, verfijnd en volledig op maat van wie er leeft of werkt.",
    storyBlocks: [
      {
        kicker: "",
        text: "Imore, een gerenommeerd interieurarchitectenbureau uit Malle, ontwerpt ruimtes met oog voor elk detail. Rustig, verfijnd en volledig op maat van wie er leeft of werkt.",
      },
      {
        kicker: "",
        text: "Aan ons de taak om content te maken die datzelfde gevoel oproept. Van korte social reels tot sterke testimonials en luxueuze fotografie: we brachten hun projecten in beeld met oog voor detail, sfeer en merkgevoel.",
      },
      {
        kicker: "",
        text: "Want premium interieurs vragen premium content. Geen snelle kiekjes, maar beelden die tonen hoeveel karakter, vakmanschap en verfijning er in elk project zit.",
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
        title: "Project N.",
        poster: "/images/cases/video-posters/1055562671.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1055562671",
          hash: "688a1873bb",
          title: "Project N.",
          poster: "/images/cases/video-posters/1055562671.jpg",
        },
        {
          type: "video",
          src: "/videos/cases/imore/fintro.mp4",
          poster: "/images/cases/imore/fintro-poster.jpg",
          title: "Project Fintro",
          orientation: "portrait",
          aspectRatio: "9 / 16",
          wide: false,
        },
        {
          type: "vimeo",
          id: "1055562711",
          hash: "90107e79ed",
          title: "Project V.H.",
          poster: "/images/cases/video-posters/1055562711.jpg",
        },
        {
          type: "vimeo",
          id: "1217615155",
          title: "Drone reel",
          hash: "6fa00d11fb",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1217615155.jpg",
        },
        {
          type: "vimeo",
          id: "1217615156",
          title: "Kantoorbeelden",
          hash: "eefa099f12",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1217615156.jpg",
        },
        {
          type: "vimeo",
          id: "1217615157",
          title: "Het Koetshuis",
          hash: "4ff128f1be",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1217615157.jpg",
        },
      ],
      landscapeVideos: [
        {
          type: "vimeo",
          id: "1217615158",
          title: "Testimonial Het Koetshuis",
          hash: "bfe4590a1d",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1217615158.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1055562671",
        title: "Project N.",
        hash: "688a1873bb",
        poster: "/images/cases/video-posters/1055562671.jpg",
      },
      {
        id: "1055562711",
        title: "Project V.H.",
        hash: "90107e79ed",
        poster: "/images/cases/video-posters/1055562711.jpg",
      },
      {
        id: "1217615155",
        title: "Drone reel",
        hash: "6fa00d11fb",
        poster: "/images/cases/video-posters/1217615155.jpg",
      },
      {
        id: "1217615156",
        title: "Kantoorbeelden",
        hash: "eefa099f12",
        poster: "/images/cases/video-posters/1217615156.jpg",
      },
      {
        id: "1217615158",
        title: "Testimonial Het Koetshuis",
        hash: "bfe4590a1d",
        poster: "/images/cases/video-posters/1217615158.jpg",
      },
      {
        id: "1217615157",
        title: "Het Koetshuis",
        hash: "4ff128f1be",
        poster: "/images/cases/video-posters/1217615157.jpg",
      },
    ],
    imageGalleryTitle: "Fotogalerij",
    imageGalleryEyebrow: "Fotografie",
    imageGallery: [
      {
        src: "/images/cases/imore/imore-team.webp",
        alt: "Het team van Imore in hun kantoor",
        orientation: "landscape",
      },
      {
        src: "/images/cases/imore/imore-office-5.webp",
        alt: "De receptie van het Imore-kantoor",
        orientation: "landscape",
      },
      {
        src: "/images/cases/imore/imore-office-2.webp",
        alt: "Imore-teamleden tijdens een overleg",
        orientation: "landscape",
      },
      {
        src: "/images/cases/imore/imore-office-3.webp",
        alt: "Imore-teamleden aan het werk",
        orientation: "landscape",
      },
      {
        src: "/images/cases/imore/imore-office-structuur.webp",
        alt: "Materialen en interieurplannen van Imore",
        orientation: "landscape",
      },
      {
        src: "/images/cases/imore/imore-office-1.webp",
        alt: "Interieurplannen op de werktafel van Imore",
        orientation: "landscape",
      },
    ],
    facts: [
      { label: "Output", value: "social reels, testimonials en fotografie" },
      { label: "Format", value: "interieurcontent" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Imore zocht een manier om hun designs tot leven te brengen op een manier die écht bij hen past.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We verdiepten ons in hun cases, hun stijl en hun merkidentiteit, en vertaalden dat naar high-quality video en fotografie.",
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
    outro: "",
    externalVideoUrls: ["https://f.io/3c8BbG-6", "https://f.io/7wn7_d2a"],
  },
  {
    slug: "hypotheekwereld",
    template: "x-oats-social",
    client: "Hypotheekwereld",
    heroTitle: "HYPOTHEEKWERELD",
    title: "Hoe geef je een stresserend onderwerp op een speelse manier weer? 🏠💸",
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
      "Een hypotheek afsluiten is al spannend genoeg. Daar hoeft geen muur van moeilijke termen, kleine lettertjes en financiële valkuilen bovenop te komen. 😵‍💫\n\nVoor Hypotheekwereld, in samenwerking met Ads & Data Brand Studio, kregen we daarom een duidelijke opdracht: een video maken die toont bij welke hordes Hypotheekwereld je kan helpen.\n\nEn ja, dat vraagt iets meer dan gewoon wat tekst laten bewegen. 😉\n\nVan storyboard en stijlvoorstel tot de volledige animatie: we bouwden een eigen visuele wereld die de boodschap ondersteunt én helemaal binnen de herkenbare huisstijl van Hypotheekwereld past.\n\nDe animaties verschenen vervolgens op digitale billboards en werden aangepast per filiaal. Zo kreeg elke locatie haar eigen versie, inclusief gepersonaliseerde eindpancarte. 📍✨",
    summary:
      "Een dynamische billboardcampagne die een eerder zwaar onderwerp een pak luchtiger maakt.",
    introQuote:
      "Een hypotheek afsluiten is al spannend genoeg. Daar hoeft geen muur van moeilijke termen bovenop te komen.",
    storyBlocks: [
      {
        text: "Een hypotheek afsluiten is al spannend genoeg. Daar hoeft geen muur van moeilijke termen, kleine lettertjes en financiële valkuilen bovenop te komen. 😵‍💫",
      },
      {
        text: "Voor Hypotheekwereld, in samenwerking met Ads & Data Brand Studio, kregen we daarom een duidelijke opdracht: een video maken die toont bij welke hordes Hypotheekwereld je kan helpen.",
      },
      {
        text: "En ja, dat vraagt iets meer dan gewoon wat tekst laten bewegen. 😉",
      },
      {
        text: "Van storyboard en stijlvoorstel tot de volledige animatie: we bouwden een eigen visuele wereld die de boodschap ondersteunt én helemaal binnen de herkenbare huisstijl van Hypotheekwereld past.",
      },
      {
        text: "De animaties verschenen vervolgens op digitale billboards en werden aangepast per filiaal. Zo kreeg elke locatie haar eigen versie, inclusief gepersonaliseerde eindpancarte. 📍✨",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Storyboarding", "Animatie", "Billboard-video", "Campagne-aanpak"],
    hero: {
      image: "/work/hypotheekwereld.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/db9e3270-08a1-445f-86da-30e139f1d62c/hypotheekwereld+thumbnail.png",
    },
    gallery: [{ src: "/work/hypotheekwereld.webp", alt: "Hypotheekwereld projectbeeld" }],
    media: {
      hero: vimeoCaseMedia("1071848624", "Hypotheekwereld billboard-video"),
      verticalVideos: [vimeoCaseMedia("1071848624", "Hypotheekwereld billboard-video")],
    },
    vimeoEmbeds: [vimeo("1071848624", "Hypotheekwereld billboard-video")],
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "1 spot + 18 varianten" },
      { label: "Type", value: "billboardvideo" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Hoe bouw je een animatiewereld die een serieuze boodschap helder overbrengt, speels genoeg is om de aandacht te grijpen én perfect aansluit bij het merk?",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We vertaalden het verhaal naar een heldere, kleurrijke en speelse animatiestijl. Van storyboard en stijlvoorstel tot de uiteindelijke animatie namen we het volledige traject voor onze rekening. Daarna maakten we verschillende lokale versies, zodat elk billboard relevant bleef voor het filiaal in kwestie.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een dynamische billboardcampagne die een eerder zwaar onderwerp een pak luchtiger maakt.",
      stats: [
        { value: "1", label: "spot" },
        { value: "18", label: "varianten" },
        { value: "PLACEHOLDER", label: "doelgroepen" },
        { value: "PLACEHOLDER", label: "kanalen" },
      ],
    },
    outro:
      "Een dynamische billboardcampagne die een eerder zwaar onderwerp een pak luchtiger maakt.",
    externalVideoUrl: "https://www.amiamis.com/work/hypotheekwereld",
  },
  {
    slug: "sint-jan-berchmanscollege",
    template: "x-oats-social",
    client: "Sint-Jan Berchmanscollege",
    heroTitle: "Sint-Jan Berchmanscollege",
    title: "“Kunnen jullie ons imago toegankelijker maken?”",
    storyTitle:
      "Tijd om de buitenkant wat beter te laten aansluiten bij wat er binnen allemaal leeft.",
    category: "Digitale rebranding",
    categories: [
      "Video & campagnes",
      "Fotografie",
      "Design & branding",
      "Webdesign & optimalisatie",
      "Marketingstrategie",
    ],
    sourceUrl: oldSource("/work/sjb"),
    sourceType: "official-site-and-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    mediaType: "mixed-media",
    seo: {
      title: "Sint-Jan Berchmanscollege | Ami Amis",
      description:
        "Een volledige digitale rebranding voor Sint-Jan Berchmanscollege: campagne, videoclip, website, fotografie, brochure en 3D-tour.",
    },
    heroMedia: {
      type: "vimeo",
      id: "1073132991",
      title: "Ik heet je welkom",
      orientation: "landscape",
      aspectRatio: "16 / 9",
      wide: true,
      poster: "/images/cases/sjb/sjb-ik-heet-je-welkom-thumbnail.jpg",
    },
    hero: {
      image: "/images/cases/sjb/sjb-hero.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/f9dd6c60-1bb0-400a-8b56-c0f17d1779f5/SJB-VideoclipBTS-WEB-047.JPG",
    },
    introQuote: "Ja! Graag zelfs.",
    intro: "Sint-Jan Berchmanscollege wilde meer leerlingen warm maken voor hun school.",
    storyBlocks: [
      {
        text: "Sint-Jan Berchmanscollege wilde meer leerlingen warm maken voor hun school. Alleen zorgde het label ‘katholieke school’ ⛪ bij sommigen al voor een nee nog voor ze één stap binnen hadden gezet. Zonde, want achter dat conservatieve elite-imago zat een open, bruisende school vol talent, creativiteit en ambitie.",
      },
      {
        text: "We gingen aan de slag met de positionering, beelden, website, campagne en zowat alles daartussenin. Met één duidelijk doel: tonen dat SJB een warme, toegankelijke en levendige school is waar je alle kanten uit kunt.",
      },
    ],
    storyHighlights: [[], []],
    deliverables: [
      "Positionering",
      "Campagne",
      "Videoclip",
      "Website",
      "Fotografie",
      "Brochure",
      "3D-tour",
    ],
    media: {
      landscapeVideos: [
        {
          ...vimeoCaseMedia("1073132991", "Ik heet je welkom"),
          poster: "/images/cases/sjb/sjb-ik-heet-je-welkom-thumbnail.jpg",
        },
      ],
      verticalVideos: [],
    },
    vimeoEmbeds: [vimeo("1073132991", "Ik heet je welkom")],
    contentTitle: "Videoclip",
    contentIntroBlocks: [
      "Een klassieke testimonial met lege gangen, brave interviews en iemand die enthousiast naar een smartboard wijst?",
      "Nee, merci.",
      "Samen met de leerlingen bedachten we een videoclip waarmee ze toekomstige leerlingen op hun eigen manier welkom heetten. De ideeën kwamen van hen, wij hielpen om er een sterk creatief geheel van te maken.",
      "Het resultaat werd een clip vol muziek, persoonlijkheid en schoolenergie. Door en voor leerlingen. Krijgen wij hierdoor een klein beetje heimwee naar het middelbaar? Misschien…",
    ],
    contentMediaLayout: "photo-triptych",
    contentImages: [
      {
        src: "/images/cases/sjb/sjb-videoclip-bts-02.webp",
        alt: "Leerlingen op het podium tijdens de SJB-videoclip",
        orientation: "landscape",
      },
      {
        src: "/images/cases/sjb/sjb-videoclip-bts-03.webp",
        alt: "Cameraploeg tijdens de opname van de SJB-videoclip",
        orientation: "landscape",
      },
      {
        src: "/images/cases/sjb/sjb-videoclip-bts-04.webp",
        alt: "Leerlingen in de klas tijdens de SJB-videoclip",
        orientation: "landscape",
      },
    ],
    editorialSections: [
      {
        title: "‘Later word ik’-campagne",
        theme: "paper",
        mediaLayout: "poster-series",
        paragraphs: [
          "Wat wil je later worden?",
          "Astronaut? Dokter? Modeontwerper? Wetenschapper? Profvoetballer? Of iets dat vandaag misschien nog niet eens bestaat?",
          "Voor de campagne ‘Later word ik’ lieten we leerlingen fantaseren over hun toekomst. We werkten een reeks campagnebeelden uit waarin ze even in de huid van hun droomberoep konden kruipen.",
          "De boodschap was simpel: bij SJB hoef je vandaag nog niet exact te weten waar je later eindigt. Je krijgt er wel de kennis, begeleiding en kansen om te ontdekken wat bij je past.",
          "De campagne verscheen niet alleen online, maar ook in kranten en op bussen. Zo werd het nieuwe verhaal van SJB zichtbaar in de hele omgeving.",
        ],
        images: [
          {
            src: "/images/cases/sjb/posters/later-word-ik-astronaut.jpg",
            alt: "Later word ik astronaut, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-developer.jpg",
            alt: "Later word ik developer, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-prinses.jpg",
            alt: "Later word ik prinses, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-dokter.jpg",
            alt: "Later word ik dokter, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-kapitein.jpg",
            alt: "Later word ik kapitein, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-apotheker.jpg",
            alt: "Later word ik apotheker, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-dierenarts.jpg",
            alt: "Later word ik dierenarts, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-leraar.jpg",
            alt: "Later word ik leraar, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-journalist.jpg",
            alt: "Later word ik journalist, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-racepiloot.jpg",
            alt: "Later word ik racepiloot, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-boekhouder.jpg",
            alt: "Later word ik boekhouder, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-architect.jpg",
            alt: "Later word ik architect, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
          {
            src: "/images/cases/sjb/posters/later-word-ik-advocaat.jpg",
            alt: "Later word ik advocaat, campagnebeeld voor Sint-Jan Berchmanscollege",
            orientation: "portrait",
            width: 843,
            height: 1191,
          },
        ],
        beforeVideo: true,
      },
      {
        title: "Website",
        theme: "blue",
        paragraphs: [
          "Ook de volledige website mocht opnieuw worden opgebouwd. En met volledig bedoelen we ook echt volledig.",
          "We brachten structuur in alle informatie, maakten de website overzichtelijker voor leerlingen en ouders en trokken de nieuwe uitstraling door naar elke pagina. Zo werd de website niet alleen frisser, maar vond je er ook eindelijk vlot je weg.",
          "Een stevig huzarenwerk, maar gelukkig doen wij dat graag!",
        ],
        images: [
          {
            src: "/images/cases/sjb/sjb-website-showcase.jpg",
            alt: "Homepage van de website van Sint-Jan Berchmanscollege",
            width: 3024,
            height: 1528,
            orientation: "landscape",
            href: "https://www.sjbmalle.be/",
            actionLabel: "Bekijk de website van Sint-Jan Berchmanscollege",
          },
        ],
      },
      {
        title: "3D-Tour",
        theme: "blue",
        paragraphs: [
          "Onze samenwerking met SJB begon met één duidelijke vraag: kunnen jullie onze school virtueel tot leven brengen? Natuurlijk. 😉 We creëerden een 3D-tour waarmee bezoekers digitaal door de school kunnen wandelen en de sfeer al vanop afstand kunnen ontdekken.",
          "Die eerste samenwerking smaakte naar meer, en gaf SJB het vertrouwen om ook de rest van hun digitale rebranding aan ons toe te vertrouwen.",
        ],
        link: {
          href: "https://amiamis.be/sjb/",
          actionLabel: "Wandel door de school in 3D",
        },
      },
      {
        title: "Fotografie",
        theme: "paper",
        paragraphs: [
          "Een nieuwe huisstijl met foto’s uit de jaren stillekes? Dat zou wat jammer zijn.",
          "Daarom trokken we de school in om het echte leven op SJB vast te leggen.",
        ],
        images: [
          {
            src: "/images/cases/sjb/sjb-photography-01.webp",
            alt: "Leerlingen in de gangen van Sint-Jan Berchmanscollege",
            orientation: "portrait",
          },
          {
            src: "/images/cases/sjb/sjb-photography-02.webp",
            alt: "Leerling tijdens een practicum op Sint-Jan Berchmanscollege",
            orientation: "landscape",
          },
          {
            src: "/images/cases/sjb/sjb-photography-03.webp",
            alt: "Leerlingen in de bibliotheek van Sint-Jan Berchmanscollege",
            orientation: "landscape",
          },
        ],
      },
      {
        title: "Brochure",
        theme: "yellow",
        mediaLayout: "landscape-showcase",
        paragraphs: [
          "Toekomstige leerlingen en hun ouders kregen ook een nieuwe brochure mee naar huis.",
          "Daarin brachten we alle belangrijke informatie samen in een vorm die duidelijk, aantrekkelijk en helemaal in lijn met de nieuwe stijl was. Informatief genoeg voor de ouders, speels genoeg voor de leerlingen.",
        ],
        images: [
          {
            src: "/images/cases/sjb/flyers/sjb-flyer-folded.jpg",
            alt: "Gevouwen SJB-flyer met de Later word ik-campagne",
            width: 3000,
            height: 2250,
            orientation: "landscape",
          },
          {
            src: "/images/cases/sjb/flyers/sjb-flyer-inside.jpg",
            alt: "Binnenzijde van de SJB-flyer met studierichtingen en schoolinformatie",
            width: 3000,
            height: 2250,
            orientation: "landscape",
          },
          {
            src: "/images/cases/sjb/flyers/sjb-flyer-outside.jpg",
            alt: "Buitenzijde van de SJB-flyer met campagnebeeld en infomomenten",
            width: 3000,
            height: 2250,
            orientation: "landscape",
          },
        ],
      },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "De school wilde meer inschrijvingen én een uitstraling die beter paste bij wat er binnen de muren leefde: warmte, ambitie, creativiteit en heel veel jonge mensen met grote plannen.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We gaven SJB geen losse campagne, maar een volledige digitale rebranding. Van de website en fotografie tot een videoclip, brochure, 3D-tour en de campagne ‘Later word ik’: alles kreeg dezelfde frisse, speelse en herkenbare uitstraling. Zo bouwden we één sterk verhaal dat op elk kanaal klopte.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een school die eindelijk ook aan de buitenkant uitstraalde wat er binnen allemaal gebeurde. De digitale rebranding maakte SJB toegankelijker, herkenbaarder en aantrekkelijker voor toekomstige leerlingen. En ja hoor, het volgende jaar waren er beduidend meer inschrijvingen! Mission Accomplished 💪!",
      stats: [],
    },
    summary:
      "Een school die eindelijk ook aan de buitenkant uitstraalde wat er binnen allemaal gebeurde.",
    outro: "",
    ctaTitle: "Klaar voor een toffe samenwerking?",
    ctaLinkOnly: true,
    ctaCard: true,
    externalVideoUrls: ["https://vimeo.com/1073132991"],

    editorialBeforeVideo: true,

    processPlacement: "after-media",
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
      id: "1055589802",
      title: "Stadiumnaam aankondiging",
      hash: "3b7c6b293a",
      orientation: "landscape",
      aspectRatio: "16 / 9",
      wide: true,
      poster: "/images/cases/video-posters/1055589802.jpg",
    },
    intro: "GOAAALLLLL! 💛🖤",
    summary:
      "Een constante stroom herkenbare clubcontent die supporters betrokken houdt, voor meer interactie zorgt en blijft scoren.",
    introQuote: "GOAAALLLLL! 💛🖤",
    storyBlocks: [
      {
        text: "Een voetbalclub leeft van beleving, maar die stopt niet na 90 minuten.",
      },
      {
        text: "Als videopartner van de grootste kleinste club van het land brengen we die beleving van Lierse SK mee tot bij de supporters.",
      },
      {
        text: "Van sfeervolle fancontent tot aftermovies en alles daartussen. Op én naast het veld zorgen wij ervoor dat de passie van de club ook online blijft leven. Zo maken we content die blijft scoren!",
      },
    ],
    storyHighlights: [[], [], []],
    deliverables: ["Videopartnership", "Wedstrijdvideo", "Aftermovie", "Clubcontent"],
    hero: {
      image: "/work/lierse.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/23307d45-60f2-450b-a955-4affc113ba52/Banner+Lierse.png",
    },
    gallery: [{ src: "/work/lierse.webp", alt: "K. Lierse S.K. projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1055593959",
        title: "Aftermovie — Lierse / La Louvière",
        hash: "ef72b6897c",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/video-posters/1055593959.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1055593959",
          title: "Aftermovie — Lierse / La Louvière",
          hash: "ef72b6897c",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1055593959.jpg",
        },
        {
          type: "vimeo",
          id: "1055589802",
          title: "Stadiumnaam aankondiging",
          hash: "3b7c6b293a",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1055589802.jpg",
        },
        {
          type: "vimeo",
          id: "1221130377",
          title: "Aftermovie — Lierse / Kortrijk",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1221130377.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1055589802",
        title: "Stadiumnaam aankondiging",
        hash: "3b7c6b293a",
        poster: "/images/cases/video-posters/1055589802.jpg",
      },
    ],
    needsReview: true,
    facts: [
      { label: "Output", value: "clubcontent" },
      { label: "Type", value: "videopartnership" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Lierse SK wilde ook buiten de 90 minuten zichtbaar blijven. Want een voetbalclub leeft niet alleen op wedstrijddagen. Supporters willen hun favoriete momenten van een match opnieuw beleven, of weten wat er gaande is in de club.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Wij maken video’s die fans dichter bij de club brengen, de sfeer van het moment vangen en belangrijke momenten nog eens laten herbeleven. Van op het veld tot ver daarbuiten.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een constante stroom herkenbare clubcontent die supporters betrokken houdt, voor meer interactie zorgt en blijft scoren! ⚽",
      stats: [
        { value: "1", label: "matchvideo" },
        { value: "1", label: "stadionnaamvideo" },
        { value: "PLACEHOLDER", label: "events" },
        { value: "PLACEHOLDER", label: "clubcontent" },
      ],
    },
    outro:
      "Een constante stroom herkenbare clubcontent die supporters betrokken houdt, voor meer interactie zorgt en blijft scoren! ⚽",
    ctaVariant: "blue",
    ctaTitle: "DURF JIJ SAMEN TE WERKEN?",
    ctaLinkOnly: true,
    externalVideoUrls: [
      "https://vimeo.com/1055593959/ef72b6897c",
      "https://vimeo.com/1055589802/3b7c6b293a",
      "https://vimeo.com/1221130377",
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
    summary: "Campagnes, fotografie en social content voor vegan cosmetics.",
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
        text: "Voor 4 All Seasons maakten we doorheen de jaren een mix van campagnevideo’s, fotografie, social content en behind the scenes. Van vegan cosmetics voor kinderen tot tv-spots, Kinepolis-reclame en een snelle Milo-billboardcampagne: dit is zo’n samenwerking die voelt als samen bouwen.",
      },
      {
        kicker: "Cosmetics for cool kids",
        text: "4 All Seasons is een vegan cosmeticamerk voor kinderen, opgericht door Annelies Van Gaever. Met “Cosmetics for cool kids” brengen ze producten die speels voelen voor kinderen en vertrouwd voor ouders.",
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
      {
        src: "/assets/work/4allseasons/fotografie-01.jpg",
        alt: "Productfotografie voor 4 All Seasons",
      },
    ],
    media: {
      hero: imageCaseMedia(
        "/assets/work/4allseasons/hero.jpg",
        "Milo billboardcampagne",
        "Milo billboardcampagne voor 4 All Seasons",
      ),
      verticalVideos: [
        imageCaseMedia(
          "/assets/work/4allseasons/hero.jpg",
          "Milo billboardcampagne",
          "Milo billboardcampagne voor 4 All Seasons",
        ),
        vimeoCaseMedia("1071852332", "4allseasons behind the scenes", "32b274e68e"),
        vimeoCaseMedia("926238307", "4AllSeasons - Milo aftermovie", "bfb29739be"),
        vimeoCaseMedia("1073163342", "4allseasons video"),
      ],
    },
    vimeoEmbeds: [
      vimeo("1071852332", "4allseasons behind the scenes", "32b274e68e"),
      vimeo("926238307", "4AllSeasons - Milo aftermovie", "bfb29739be"),
      vimeo("1073163342", "4allseasons video"),
    ],
    facts: [],
    question: {
      title: "Hoe hou je een duurzaam kids beautymerk zichtbaar op meerdere kanalen?",
      text: "4 All Seasons had nood aan content die hun vegan, kindvriendelijke en duurzame positionering helder naar buiten brengt. Niet op één kanaal, maar over verschillende momenten en formats heen: van televisie en cinema tot social content en fotografie.",
    },
    approach: {
      title: "Van tv-spot tot fotografie, telkens in dezelfde merkwereld.",
      text: "We bouwden verder op een langlopende samenwerking en schakelden per project de juiste mensen in. Soms volledig uitgewerkt met campagnevideo, fotografie en montage. Soms razendsnel, zoals bij de Milo-billboardcampagne die in minder dan twee uur werd gerealiseerd.",
    },
    result: {
      title: "Een brede contentbasis voor een merk met een duidelijke missie.",
      text: "4 All Seasons kreeg een reeks campagnebeelden, video-assets, social formats en foto’s die hun verhaal consequent blijven versterken. Speels genoeg voor kinderen, betrouwbaar genoeg voor ouders en helder genoeg voor elk kanaal.",
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
    mediaSectionIntro:
      "Campagne, fotografie, behind the scenes en video in één compacte kijkruimte.",
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
            hash: "32b274e68e",
            title: "Behind the scenes",
            caption: "Behind the scenes",
          },
        ],
      },
    ],
    externalVideoUrls: [
      "https://vimeo.com/926238307/bfb29739be",
      "https://vimeo.com/1073163342",
      "https://vimeo.com/1071852332/32b274e68e",
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
      "“We hebben bijna 8 keer meer Medicair-bedden verkocht sinds de lancering van de nieuwe spot!”\n\nKijk. Als een beddenfabrikant zegt dat je spot hun verkoop weer wakker heeft geschud, dan weet je: job well done. 😴\n\nSalus, een beddenfabrikant uit Mechelen en ondertussen een van onze langstlopende klanten, klopte bij ons aan met een duidelijke vraag: kunnen jullie onze elektrische Medicair-slaapsystemen in de kijker zetten met een reclamespot voor regionale televisie?\n\nNatuurlijk zeiden wij volmondig: ja!\n\nWe werkten verschillende concepten uit die perfect aansloten bij de doelgroep van de Medicair-bedden: een iets ouder publiek met een gezonde portie humor. En zo gepland? Zo gedraaid. Het resultaat werd een spot die meteen opvalt en doet lachen!\n\nDe spot werd uitgezonden op RTV en werd zelfs genomineerd voor de RTV-Awards. Mooi meegenomen, maar het échte resultaat lag bij Salus zelf: de verkoop van hun elektrische bedden kreeg een serieuze duw in de rug. Van amper één bed per kwartaal naar maar liefst 40 bedden in één maand na de lancering van de spot.\n\nSindsdien is Salus een vaste klant die telkens opnieuw bij ons aanklopt voor spots met humor, kwaliteit en een duidelijke boodschap. En blijkbaar levert elke nieuwe video Dirk van Salus ook meteen nieuwe business op. Na onze zomercampagne, waarin we een Medicair-bed pal op het strand zetten, kreeg Dirk zelfs meerdere telefoontjes met de vraag of Salus nu ook strandbedden verkoopt. Dus… zet voor volgende zomer maar alvast een Salus-strandbed op uw wishlist! 😉\n\nBenieuwd naar de andere spots die we voor Salus maakten? Je “spot” ze hieronder. 😉",
    storyBlocks: [
      {
        kicker: "",
        text: "Kijk. Als een beddenfabrikant zegt dat je spot hun verkoop weer wakker heeft geschud, dan weet je: job well done. 😴",
      },
      {
        kicker: "",
        text: "Salus, een beddenfabrikant uit Mechelen en ondertussen een van onze langstlopende klanten, klopte bij ons aan met een duidelijke vraag: kunnen jullie onze elektrische Medicair-slaapsystemen in de kijker zetten met een reclamespot voor regionale televisie?",
        videoLink: {
          href: "#spot-medicair",
          label: "Bekijk Spot Medicair",
        },
      },
      {
        kicker: "",
        text: "Natuurlijk zeiden wij volmondig: ja!",
      },
      {
        kicker: "",
        text: "We werkten verschillende concepten uit die perfect aansloten bij de doelgroep van de Medicair-bedden: een iets ouder publiek met een gezonde portie humor. En zo gepland? Zo gedraaid. Het resultaat werd een spot die meteen opvalt en doet lachen!",
      },
      {
        kicker: "",
        text: "De spot werd uitgezonden op RTV en werd zelfs genomineerd voor de RTV-Awards. Mooi meegenomen, maar het échte resultaat lag bij Salus zelf: de verkoop van hun elektrische bedden kreeg een serieuze duw in de rug. Van amper één bed per kwartaal naar maar liefst 40 bedden in één maand na de lancering van de spot.",
      },
      {
        kicker: "",
        text: "Sindsdien is Salus een vaste klant die telkens opnieuw bij ons aanklopt voor spots met humor, kwaliteit en een duidelijke boodschap. En blijkbaar levert elke nieuwe video Dirk van Salus ook meteen nieuwe business op. Na onze zomercampagne, waarin we een Medicair-bed pal op het strand zetten, kreeg Dirk zelfs meerdere telefoontjes met de vraag of Salus nu ook strandbedden verkoopt. Dus… zet voor volgende zomer maar alvast een Salus-strandbed op uw wishlist! 😉",
        videoLink: {
          href: "#spot-strand",
          label: "Bekijk Spot Strand",
        },
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
        type: "video",
        src: "/videos/cases/salus/spot-medicair.mp4",
        poster: "/images/cases/salus/spot-medicair.jpg",
        title: "Spot Medicair",
        orientation: "landscape",
        aspectRatio: "16 / 9",
        wide: true,
        anchor: "spot-medicair",
      },
      landscapeVideos: [
        {
          type: "video",
          src: "/videos/cases/salus/spot-medicair.mp4",
          poster: "/images/cases/salus/spot-medicair.jpg",
          title: "Spot Medicair",
          orientation: "landscape",
          aspectRatio: "16 / 9",
          wide: true,
          anchor: "spot-medicair",
        },
        {
          type: "vimeo",
          id: "1055218065",
          hash: "cdbe91b12e",
          title: "Spot Fietser",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1055218065.jpg",
        },
        {
          type: "vimeo",
          id: "1055217563",
          hash: "86c6a93452",
          title: "Spot Overvaller",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1055217563.jpg",
        },
        {
          type: "vimeo",
          id: "1204531088",
          title: "Spot Buurman",
          url: "https://vimeo.com/1204531088?share=copy&fl=sv&fe=ci",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1204531088.jpg",
        },
        {
          type: "vimeo",
          id: "1204533594",
          title: "Spot Fanfare",
          url: "https://vimeo.com/1204533594?share=copy&fl=sv&fe=ci",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1204533594.jpg",
        },
        {
          type: "vimeo",
          id: "1215730779",
          title: "Spot Strand",
          url: "https://vimeo.com/1215730779?share=copy&fl=sv&fe=ci",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1215730779.jpg",
          anchor: "spot-strand",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1055218065",
        title: "Spot Fietser",
        hash: "cdbe91b12e",
        poster: "/images/cases/video-posters/1055218065.jpg",
      },
      {
        id: "1055217563",
        title: "Spot Overvaller",
        hash: "86c6a93452",
        poster: "/images/cases/video-posters/1055217563.jpg",
      },
      {
        id: "1204531088",
        title: "Spot Buurman",
        poster: "/images/cases/video-posters/1204531088.jpg",
      },
      {
        id: "1204533594",
        title: "Spot Fanfare",
        poster: "/images/cases/video-posters/1204533594.jpg",
      },
      {
        id: "1215730779",
        title: "Spot Strand",
        poster: "/images/cases/video-posters/1215730779.jpg",
        anchor: "spot-strand",
      },
    ],
    facts: [
      { label: "Output", value: "reclamespots" },
      { label: "Zender", value: "RTV" },
      { label: "Resultaat", value: "40 bedden in één maand" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "De Salus Medicair-bedden 🛏️ kregen nog niet de aandacht die ze verdienden. De verkoop bleef achter, dus zocht Salus naar een opvallende manier om het product bekender én aantrekkelijker te maken.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We schreven een reeks reclamespots die de doelgroep niet bestookten met technische verkooppraat, maar aanspraken met humor, herkenbaarheid en een sterk verhaal.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een reeks grappige, kwalitatieve spots die bleven hangen. Eén spot sprong er extra uit en zorgde voor een opvallende stijging in de verkoop van de Salus Medicair-bedden 🤭.",
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
      "https://vimeo.com/1215730779?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "konligo",
    template: "x-oats-social",
    client: "Konligo",
    heroTitle: "KONLIGO",
    title: "Hoe laat je een tent tot leven komen?",
    subtitle: "Twee video’s rond één slimme tent.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/konligo"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    videoSectionPlacement: "after-process",
    contentTitle: "Video’s",
    intro:
      "Op papier is het simpel: Konligo maakt slimme, opvouwbare tenten die je in no-time opzet. Handig? Absoluut. Maar hoe maak je dat ook nog eens sexy op video? 👀",
    summary:
      "Twee spots die tonen hoe veelzijdig, snel en gebruiksvriendelijk de slimme tenten van Konligo zijn.",
    introQuote: "Twee video’s, twee duidelijke jobs.",
    storyBlocks: [
      {
        text: "Op papier is het simpel: Konligo maakt slimme, opvouwbare tenten die je in no-time opzet. Handig? Absoluut. Maar hoe maak je dat ook nog eens sexy op video? 👀",
      },
      {
        text: "Daar kwamen wij in beeld. In plaats van met een gigantische productie langs allerlei locaties te trekken, draaiden we het gewoon om: wij gingen niet naar de locaties, de locaties kwamen naar de tent. 🌍",
      },
      {
        text: "In één studio bouwden we telkens een compleet nieuwe wereld rond dezelfde tent. Het ene moment stond ze op een trouwfeest, even later deed ze dienst als EHBO-post of stond ze midden in de sfeer van een concert. Zo lieten we niet alleen zien hoe veelzijdig Konligo is, maar ook waar zo’n tent uiteindelijk écht voor dient: onderdak bieden aan grote momenten. ❤️",
      },
      {
        text: "Naast de herospot maakten we ook een tweede video rond één van Konligo’s sterkste USP’s: hoe snel de tent staat én weer verdwijnt. Geen ingewikkelde handleiding, geen eindeloos gepruts met stokken. Gewoon kijken, opbouwen, klaar. ⛺️💨",
      },
      {
        text: "Zo kregen we met een relatief eenvoudige productie twee soorten content: één video die gevoel en mogelijkheden verkoopt, en één video die vooral doet wat hij moet doen: alles glashelder uitleggen. Win-win. 🤝",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Herospot", "USP-video", "Productvideo", "Studio-opname"],
    hero: {
      image: "/work/konligo.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/1730802473910-E5QVIU5HU9EU1GUSH90G/LinkedIn.png",
    },
    gallery: [{ src: "/work/konligo.webp", alt: "Konligo projectbeeld" }],
    media: {
      hero: {
        type: "vimeo",
        id: "1222088181",
        title: "Konligo herospot",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/work/konligo.webp",
      },
      landscapeVideos: [
        {
          type: "vimeo",
          id: "1222088181",
          title: "Emotie",
          orientation: "landscape",
          aspectRatio: "16 / 9",
          wide: true,
          poster: "/work/konligo.webp",
        },
        {
          type: "video",
          src: "/videos/cases/konligo/usp.mp4",
          title: "USP",
          poster: "/images/cases/konligo/usp-poster.jpg",
          wide: true,
          orientation: "landscape",
          aspectRatio: "16 / 9",
        },
      ],
    },
    vimeoEmbeds: [
      {
        type: "vimeo",
        id: "1222088181",
        title: "Emotie",
        orientation: "landscape",
        aspectRatio: "16 / 9",
        wide: true,
        poster: "/work/konligo.webp",
      },
    ],
    facts: [],
    hideInfoStrip: true,
    question: {
      label: "Probleem",
      title: "",
      text: "Hoe toon je op een aantrekkelijke manier dat één tent op heel wat verschillende locaties en voor verschillende toepassingen kan worden ingezet, zonder daarvoor met een gigantische productie de halve wereld rond te rijden?",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Simpel: we brachten de wereld naar de tent. Met kleurrijke en speelse visuele ingrepen veranderden we dezelfde setting telkens opnieuw en maakten we de veelzijdigheid van Konligo voelbaar.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Twee video’s, twee duidelijke jobs. Eén herospot die sfeer, emotie en de mogelijkheden van Konligo verkoopt. En één praktische video die meteen bewijst hoe gebruiksvriendelijk het product is.",
      stats: [],
    },
    ctaTitle: "DURF JIJ SAMEN TE WERKEN?",
    ctaLinkOnly: true,
    ctaCard: true,
    externalVideoUrls: [
      "https://vimeo.com/1222088181?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1222088181?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "billy-bonkers",
    aliases: ["billy-bonkers-stad-gent"],
    template: "x-oats-social",
    client: "Billie Bonkers",
    heroTitle: "BILLIE BONKERS",
    title: "Campagne rond duurzaam wonen",
    subtitle: "",
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
      "Hoe overtuig je Gentenaars dat hun huis verwarmen ook slimmer, duurzamer én beter kan? 🔥",
    summary: "Een campagne die zichtbaar was in de cinema, online én in het straatbeeld.",
    introQuote:
      "Hoe overtuig je Gentenaars dat hun huis verwarmen ook slimmer, duurzamer én beter kan? 🔥",
    storyBlocks: [
      {
        text: "Voor Stad Gent mochten we samen met Billie Bonkers aan de slag met een campagne rond duurzaam wonen. De boodschap was helder: “Er zijn betere manieren om je huis te verwarmen.” Alleen: hoe breng je zo’n boodschap zonder dat het voelt als een belerend vingertje?",
      },
      {
        text: "Juist ja. Met humor, herkenbaarheid en beelden die blijven plakken.",
      },
      {
        text: "We werkten een cinemaspot uit die Gentenaars op een laagdrempelige manier aan het denken zet over hoe ze hun woning verwarmen. De dramatische muziek en absurde toon grijpen meteen de aandacht van de kijker. Zo landde de boodschap op een speelse en herkenbare manier 😉.",
      },
      {
        text: "Naast de spot maakten we ook drie opvallende campagnebeelden voor affiches. Die trokken de lijn van de video door naar het straatbeeld en zorgden ervoor dat de campagne niet alleen in de cinema, maar ook onderweg opviel.",
      },
      {
        text: "Visueel hielden we alles fris, helder en helemaal in lijn met de huisstijl van Stad Gent. De cinemaspot kreeg een plek in de Gentse cinema’s, en voor online maakten we een kortere versie van 15 seconden. Zo kreeg de campagne op elk kanaal de juiste vorm, zonder aan kracht te verliezen.",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Cinemaspot", "Campagnebeelden", "Affiches", "Storyboard"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/da00ab33-0d7d-451f-9863-14dc7ceee76a/SEB08389.JPG",
    },
    gallery: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/da00ab33-0d7d-451f-9863-14dc7ceee76a/SEB08389.JPG",
        alt: "Billie Bonkers campagnebeeld",
      },
    ],
    campaignImages: [
      {
        src: "/images/cases/billy-bonkers/stad-gent-energiecentrale-campagnebeeld-01.jpg",
        alt: "Campagnebeeld Stad Gent Energiecentrale met vrouw en haardrogers",
      },
      {
        src: "/images/cases/billy-bonkers/stad-gent-energiecentrale-campagnebeeld-02.jpg",
        alt: "Campagnebeeld Stad Gent Energiecentrale met man op hometrainer",
      },
      {
        src: "/images/cases/billy-bonkers/stad-gent-energiecentrale-campagnebeeld-03.jpg",
        alt: "Campagnebeeld Stad Gent Energiecentrale met warmwaterkruiken",
      },
    ],
    vimeoEmbeds: [vimeo("1169918332", "Billie Bonkers - Stad Gent")],
    media: {
      hero: vimeoCaseMedia("1169918332", "Billie Bonkers - Stad Gent"),
      verticalVideos: [vimeoCaseMedia("1169918332", "Billie Bonkers - Stad Gent")],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "2 video's" },
      { label: "Type", value: "campagne" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Hoe maken we Gentenaars bewust van duurzamer verwarmen op een manier die helder, herkenbaar en niet belerend aanvoelt?",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Een creatieve campagne met een cinemaspot, online cutdown en drie sterke campagnebeelden. Met humor, herkenbare situaties en een duidelijke visuele stijl brachten we de boodschap laagdrempelig tot bij de Gentse burger.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een campagne die zichtbaar was in de cinema, online én in het straatbeeld. Eentje die duurzaam wonen bespreekbaar maakt, de boodschap simpel houdt en vooral: opvalt!",
      stats: [
        { value: "2", label: "video’s" },
        { value: "3", label: "campagnebeelden" },
        { value: "15s", label: "online variant" },
        { value: "Gent", label: "cinema" },
      ],
    },
    outro: "",
    externalVideoUrl: "https://f.io/JOJD6hvM",

    storyTitle: false,
  },
  {
    slug: "jurimesh",
    template: "x-oats-social",
    client: "Jurimesh",
    heroTitle: "JURIMESH",
    title: "Heldere video voor een technische integratie",
    subtitle: "",
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
      "Een technische integratie uitleggen zonder dat iedereen na tien seconden afhaakt? Challenge accepted. 😏",
    summary:
      "Een heldere video die snel inzicht geeft en Jurimesh helpt om hun technologie toegankelijker te maken.",
    introQuote:
      "Een technische integratie uitleggen zonder dat iedereen na tien seconden afhaakt? Challenge accepted. 😏",
    storyBlocks: [
      {
        text: "Voor Jurimesh ontwikkelden we een video over hun nieuwe integratie met Virtual Vaults. Een samenwerking die achter de schermen behoorlijk technisch is, maar die we vertaalden naar een helder verhaal met dramatische opbouw, duidelijke visualisaties en een speelse punchline die alles netjes afmaakt. 🎬",
      },
      {
        text: "We namen het volledige creatieve proces voor onze rekening: van concept en script tot opnames, motion graphics en technische afwerking. Daarbij zorgden we ervoor dat de stijl perfect aansloot bij zowel Jurimesh als Virtual Vaults zodat de video geloofwaardig aanvoelt binnen beide ecosystemen.",
      },
      {
        text: "Wil je ook een complex verhaal in een heldere video gieten? Bel Ami Amis 📞",
      },
    ],
    storyHighlights: [[], [], []],
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
      landscapeVideos: [
        {
          ...vimeoCaseMedia("1169932151", "Jurimesh video"),
          instanceKey: "gallery",
        },
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "uitlegvideo" },
      { label: "Focus", value: "motion graphics" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Jurimesh wilde hun nieuwe integratie aankondigen. Voordelen genoeg, maar niet bepaald voer voor één sexy oneliner. Zonder een helder verhaal dreigde de doelgroep al snel te verdrinken in technische details. 🧩",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Met sterke storytelling, duidelijke visuals en een welgemikte dosis humor vertaalden we de complexe materie naar een herkenbare video die laat zien hoe de integratie werkt én waarom ze ertoe doet. 💡",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een heldere video die snel inzicht geeft, risico’s begrijpelijk maakt en toont hoe juridische en operationele workflows vlot in elkaar klikken. Jurimesh gebruikt de video vandaag in sales en marketing om leads sneller mee te krijgen, klanten te informeren en hun technologie een pak toegankelijker te maken. 🚀",
      stats: [
        { value: "1", label: "uitlegvideo" },
        { value: "sales", label: "inzet" },
        { value: "marketing", label: "inzet" },
        { value: "motion", label: "graphics" },
      ],
    },
    outro:
      "Een heldere video die snel inzicht geeft, risico’s begrijpelijk maakt en toont hoe juridische en operationele workflows vlot in elkaar klikken.",
    externalVideoUrl: "https://f.io/qsJgMwfl",

    storyTitle: false,
  },
  {
    slug: "sporthouse-group",
    template: "x-oats-social",
    client: "Sporthouse Group",
    heroTitle: "SPORTHOUSE GROUP",
    title: "Documentaire sportstory rond veerkracht",
    subtitle: "Felipe Nystrom, Younited en cyclocross.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Animatie & montage"],
    year: "2026",
    sourceUrl: oldSource("/work/sporthousegroup"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: true,
    needsEditorialSplit: true,
    mediaType: "simple-case",
    intro:
      "In deze video volgen we Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup — een plaats waar sport, herstel en menselijkheid samenkomen. De productie focust op Felipe’s uitzonderlijke reis: van een jeugd vol geweld in Costa Rica, zware verslavingen, dakloosheid en meerdere bijna-doodervaringen, tot zijn doorbraak als professioneel renner en nationaal kampioen. We kozen voor een documentaire stijl waarin intensiteit en intimiteit elkaar afwisselen. Niet alleen de actie van de koers, maar ook de stille momenten ervoor krijgen ruimte: de voorbereiding, de spanning, de kwetsbaarheid. Deze storytelling laat zien hoe sport niet alleen prestaties voortbrengt, maar mensen opnieuw richting geeft. Felipe’s contact met Younited onderstreept die boodschap: sport als hefboom voor zelfvertrouwen, verbondenheid en een nieuw begin. Onze cinematografische beelden, zorgvuldige montage en sfeervolle audio versterken dat verhaal—een verhaal dat verder gaat dan cyclocross, en raakt aan veerkracht en tweede kansen. Het resultaat is een krachtige, authentieke vertelling die toont hoe één mens, gewapend met wilskracht en steun, letterlijk en figuurlijk uit de modder kan opstaan.",
    summary:
      "Een cinematografische video over Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup.",
    introQuote:
      "Sporthouse Group wilde een video rond Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup.",
    storyBlocks: [
      {
        text: "In deze video volgen we Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup — een plaats waar sport, herstel en menselijkheid samenkomen.",
      },
      {
        text: "De productie focust op Felipe’s uitzonderlijke reis: van een jeugd vol geweld in Costa Rica, zware verslavingen, dakloosheid en meerdere bijna-doodervaringen, tot zijn doorbraak als professioneel renner en nationaal kampioen. We kozen voor een documentaire stijl waarin intensiteit en intimiteit elkaar afwisselen. Niet alleen de actie van de koers, maar ook de stille momenten ervoor krijgen ruimte: de voorbereiding, de spanning, de kwetsbaarheid.",
      },
      {
        text: "Deze storytelling laat zien hoe sport niet alleen prestaties voortbrengt, maar mensen opnieuw richting geeft. Felipe’s contact met Younited onderstreept die boodschap: sport als hefboom voor zelfvertrouwen, verbondenheid en een nieuw begin.",
      },
      {
        text: "Onze cinematografische beelden, zorgvuldige montage en sfeervolle audio versterken dat verhaal—een verhaal dat verder gaat dan cyclocross, en raakt aan veerkracht en tweede kansen. Het resultaat is een krachtige, authentieke vertelling die toont hoe één mens, gewapend met wilskracht en steun, letterlijk en figuurlijk uit de modder kan opstaan.",
      },
    ],
    storyHighlights: [[], []],
    deliverables: ["Documentaire video", "Montage", "Sounddesign", "Storytelling"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/8d707e9d-44f5-48fe-a098-c6ce64fa656b/Scherm­afbeelding+2026-03-17+om+14.46.36.png",
    },
    gallery: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/8d707e9d-44f5-48fe-a098-c6ce64fa656b/Scherm­afbeelding+2026-03-17+om+14.46.36.png",
        alt: "Sporthouse Group projectbeeld",
      },
    ],
    vimeoEmbeds: [],
    media: {
      hero: youtubeCaseMedia(
        "k60oW1nvoPg",
        "Sporthouse Group documentaire",
        "https://www.youtube.com/watch?v=k60oW1nvoPg",
      ),
      verticalVideos: [
        youtubeCaseMedia(
          "k60oW1nvoPg",
          "Sporthouse Group documentaire",
          "https://www.youtube.com/watch?v=k60oW1nvoPg",
        ),
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
      text: "Sporthouse Group wilde een video rond Felipe Nystrom en Younited tijdens de UCI Cyclo-cross World Cup.",
    },
    approach: {
      title: "Documentair, menselijk en dicht op de actie.",
      text: "We combineerden koersbeelden met intieme momenten voor en naast de wedstrijd. Zo kwam Felipe's verhaal rond herstel, sport en tweede kansen centraal te staan.",
    },
    result: {
      title: "Een sportstory met menselijke impact.",
      text: "De video toont hoe sport richting, verbinding en veerkracht kan geven.",
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
    subtitle: "",
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
    intro: "Hoe trekken we het juiste talent aan voor onze carrosserie? 🔧",
    summary:
      "Meer zichtbaarheid als werkgever, sterke content voor verschillende kanalen en nieuwe collega’s die perfect binnen het team passen.",
    introQuote: "Hoe trekken we het juiste talent aan voor onze carrosserie? 🔧",
    storyBlocks: [
      {
        text: "Blutsqi, een gerenommeerd carrosseriebedrijf, klopte bij ons aan met een duidelijke uitdaging: nieuwe collega’s aantrekken in een arbeidsmarkt waar goed talent niet zomaar voor het oprapen ligt. We zetten hun employer brand in een hogere versnelling!",
      },
      {
        text: "De opdracht? Foto- en videocontent maken die toont hoe het écht is om bij Blutsqi te werken. De werkvloer mocht gewoon zichzelf zijn: echte collega’s, oprechte momenten en vakmanschap met een flinke dosis karakter.",
      },
      {
        text: "We trokken naar de werkvloer en brachten de sfeer, het team en de trots van het vak naar voren. Via korte vacaturevideo’s en een overkoepelende employer branding video lieten we zien wat Blutsqi als werkgever typeert: betrokken collega’s, vakmanschap en een werkcontext waar je meteen voelt dat er met goesting gewerkt wordt.",
      },
      {
        text: "Ook visueel mocht het karakter van het carrosserievak gezien worden. De ruwe schoonheid van de werkplaats, de precisie van het herstellen en de dynamiek tussen collega’s kregen allemaal hun moment.",
      },
      {
        text: "Naast de langere video’s maakten we ook korte, snackable content voor social media. Ideaal om snel de aandacht te trekken van potentiële kandidaten en hen meteen een gevoel te geven bij de sfeer op de werkvloer.",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Employer branding", "Vacaturevideo's", "Social snippets", "Fotografie"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/d6207722-d748-4cf2-9a6c-652636ee9ae3/Scherm­afbeelding+2026-03-17+om+14.53.14.png",
    },
    gallery: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/d6207722-d748-4cf2-9a6c-652636ee9ae3/Scherm­afbeelding+2026-03-17+om+14.53.14.png",
        alt: "Blutsqi projectbeeld",
      },
    ],
    vimeoEmbeds: [
      {
        id: "1174402980",
        title: "Vacaturevideo — Jeroen",
        poster: "/images/cases/video-posters/1174402980.jpg",
      },
      {
        id: "1174402742",
        title: "Vacaturevideo — Paytah",
        poster: "/images/cases/video-posters/1174402742.jpg",
      },
      {
        id: "1174402589",
        title: "Vacaturevideo — Raf",
        poster: "/images/cases/video-posters/1174402589.jpg",
      },
      {
        id: "1217619293",
        title: "Blutsqi customer journey",
        poster: "/images/cases/video-posters/1217619293.jpg",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1174402742",
        title: "Vacaturevideo — Paytah",
        orientation: "landscape",
        aspectRatio: "16 / 9",
        wide: true,
        poster: "/images/cases/video-posters/1174402742.jpg",
      },
      landscapeVideos: [
        {
          type: "vimeo",
          id: "1217619293",
          title: "Blutsqi customer journey",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1217619293.jpg",
        },
        {
          type: "vimeo",
          id: "1174402742",
          title: "Vacaturevideo — Paytah",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1174402742.jpg",
        },
        {
          type: "vimeo",
          id: "1174402589",
          title: "Vacaturevideo — Raf",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1174402589.jpg",
        },
        {
          type: "vimeo",
          id: "1174402980",
          title: "Vacaturevideo — Jeroen",
          orientation: "landscape",
          aspectRatio: "16 / 9",
          wide: true,
          poster: "/images/cases/video-posters/1174402980.jpg",
        },
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "4 video's" },
      { label: "Type", value: "employer branding" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Blutsqi trok te weinig sollicitanten aan die écht bij hun cultuur passen.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We maakten een authentieke employer branding campagne met foto’s, korte vacaturevideo’s, een overkoepelende employer branding video en social content. Alles gefilmd op locatie, met echte medewerkers en een visuele stijl die het vakmanschap én de sfeer van Blutsqi laat spreken.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Meer zichtbaarheid als werkgever, sterke content voor verschillende kanalen en vooral: nieuwe collega’s die perfect binnen het team passen. Missie geslaagd 🚗✨",
      stats: [
        { value: "4", label: "video’s" },
        { value: "vacature", label: "video’s" },
        { value: "social", label: "snippets" },
        { value: "foto", label: "content" },
      ],
    },
    outro:
      "Meer zichtbaarheid als werkgever, sterke content voor verschillende kanalen en vooral: nieuwe collega’s die perfect binnen het team passen. Missie geslaagd 🚗✨",
    externalVideoUrl: "https://f.io/_G4a7McI",

    storyTitle: false,
  },
  {
    slug: "zorgbedrijf",
    aliases: ["zorgbedrijf-antwerpen"],
    template: "x-oats-social",
    client: "Zorgbedrijf",
    heroTitle: "ZORGBEDRIJF",
    title:
      "Hoe stel je een nieuwe directie voor zonder dat het voelt als… een directievoorstelling? 👔😴",
    subtitle: "",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/zorgbedrijf"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: true,
    needsEditorialSplit: true,
    mediaType: "vimeo-video",
    intro:
      "Nieuwe directieleden aankondigen kan natuurlijk met een klassiek interview voor een witte muur. Naam, functie, visie, klaar.\n\nMaar niet als het aan Ami Amis ligt. 😉\n\nVoor Zorgbedrijf Antwerpen kozen we daarom voor een menselijkere aanpak, geïnspireerd op het programma ‘Durf te vragen’. Zo kreeg het geheel een luchtige en spontane vibe, en leer je niet alleen kennen wat iemand doet, maar vooral ook wie er achter die functietitel zit. 👀\n\nDe video’s werden intern verspreid en maakten de afstand tussen medewerkers en de nieuwe directie meteen een stukje kleiner. 🤝",
    summary:
      "Persoonlijke video’s die nieuwe directieleden voorstellen als collega’s van vlees en bloed.",
    introQuote: "",
    storyBlocks: [
      {
        text: "Nieuwe directieleden aankondigen kan natuurlijk met een klassiek interview voor een witte muur. Naam, functie, visie, klaar.",
      },
      {
        text: "Maar niet als het aan Ami Amis ligt. 😉",
      },
      {
        text: "Voor Zorgbedrijf Antwerpen kozen we daarom voor een menselijkere aanpak, geïnspireerd op het programma ‘Durf te vragen’. Zo kreeg het geheel een luchtige en spontane vibe, en leer je niet alleen kennen wat iemand doet, maar vooral ook wie er achter die functietitel zit. 👀",
      },
      {
        text: "De video’s werden intern verspreid en maakten de afstand tussen medewerkers en de nieuwe directie meteen een stukje kleiner. 🤝",
      },
    ],
    storyHighlights: [[], [], [], []],
    deliverables: ["Interne video", "Social content", "Concept", "Regie"],
    hero: {
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/2d5f927d-b2db-4952-9ce6-93756fa2416e/StadGent_Zorgbedrijf_drieluik_2025_v1.jpg",
    },
    gallery: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/2d5f927d-b2db-4952-9ce6-93756fa2416e/StadGent_Zorgbedrijf_drieluik_2025_v1.jpg",
        alt: "Zorgbedrijf projectbeeld",
      },
    ],
    vimeoEmbeds: [
      {
        id: "1221173884",
        title: "Interview met Dirk Bervoets",
        poster: "/images/cases/video-posters/1221173884.jpg",
      },
      {
        id: "1221173882",
        title: "Interview met Miquel Joseph",
        poster: "/images/cases/video-posters/1221173882.jpg",
      },
      {
        id: "1221173881",
        title: "Interview met Olivier Naeyaert",
        poster: "/images/cases/video-posters/1221173881.jpg",
      },
      {
        id: "1221173883",
        title: "Interview met Pieter Dierckx",
        poster: "/images/cases/video-posters/1221173883.jpg",
      },
      {
        type: "vimeo",
        id: "1178849410",
        title: "Interview met Veerle",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/video-posters/1178849410.jpg",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1221173884",
        title: "Interview met Dirk Bervoets",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/video-posters/1221173884.jpg",
      },
      landscapeVideos: [
        {
          type: "vimeo",
          id: "1221173884",
          title: "Interview met Dirk Bervoets",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1221173884.jpg",
        },
        {
          type: "vimeo",
          id: "1221173882",
          title: "Interview met Miquel Joseph",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1221173882.jpg",
        },
        {
          type: "vimeo",
          id: "1221173881",
          title: "Interview met Olivier Naeyaert",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1221173881.jpg",
        },
        {
          type: "vimeo",
          id: "1221173883",
          title: "Interview met Pieter Dierckx",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1221173883.jpg",
        },
        {
          type: "vimeo",
          id: "1178849410",
          title: "Interview met Veerle",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1178849410.jpg",
        },
      ],
    },
    needsEditorialSplit: false,
    facts: [
      {
        label: "Output",
        value: "5 video's",
      },
      {
        label: "Doel",
        value: "interne communicatie",
      },
    ],
    question: null,
    approach: null,
    result: null,
    outro: "",
    externalVideoUrls: [
      "https://vimeo.com/1221173884",
      "https://vimeo.com/1221173882",
      "https://vimeo.com/1221173881",
      "https://vimeo.com/1221173883",
      "https://vimeo.com/1178849410",
    ],

    storyTitle: false,
  },
  {
    slug: "frankie-villager",
    template: "visit-antwerpen-social",
    client: "Frankie Villager",
    title: "FRANKIE VILLAGER",
    subtitle: "",
    oneLiner: "",
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
    summary: "Een grappige, gedurfde en originele brandvideo die hun merkidentiteit ademt.",
    deliverables: ["Brandvideo", "Scenario", "Regie", "Productie"],
    storyBlocks: [
      {
        text: "Challenge accepted! 💪",
      },
      {
        text: "Als communicatie- en brandingbureau weet Frankie Villager natuurlijk héél goed wie ze zijn, dus de video moest niet gewoon “goed” zijn. Hij moest voelen als Frankie Villager: scherp, eigenzinnig, professioneel en met een hoek af.",
      },
      {
        text: "Ze kwamen naar ons met een eerste scenario. Wij doken erin, werkten het verder uit en vertaalden het naar beeld. Denk: crash zooms, droge blikken, ongemakkelijke stiltes en chaos op kantoor.",
      },
      {
        text: "Op de draaidag zelf hielden we ruimte voor improvisatie, want sommige fratsen kan je nu eenmaal niet voorspellen. Zo kwamen we uit op een video die een korte, fictieve inkijk geeft in het dagelijkse leven op kantoor bij Frankie Villager.",
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
      label: "Probleem",
      title: "",
      text: "Frankie Villager wilde helder tonen waar hun merk voor staat, zonder er een saaie bedrijfsvideo van te maken.",
    },
    approach: {
      title: "",
      text: "We namen hun script als basis, onderzochten de typische mockumentary-stijl van het programma en brachten die samen met onze eigen visie op de draaidag.",
      label: "Oplossing",
    },
    result: {
      title: "",
      text: "Een grappige, gedurfde en originele brandvideo die hun merkidentiteit ademt.",
      stats: [
        {
          value: "1",
          label: "brandvideo",
        },
      ],
      label: "Resultaat",
    },
    outro: "",
    externalVideoUrl: "https://vimeo.com/1174433861?share=copy&fl=cl&fe=ci",

    storyTitle: false,
  },
  {
    slug: "groep-maes",
    template: "x-oats-social",
    client: "Groep Maes",
    heroTitle: "GROEP MAES",
    title: "Hoe vind je technische profielen die iedereen zoekt? 👷‍♂️🔧",
    subtitle: "",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: oldSource("/work/groepmaes"),
    sourceType: "old-site",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    videoSectionPlacement: "before-process",
    contentTitle: false,
    storyTitle: false,
    oneLiner:
      "Authentieke vacaturevideo’s en actiebeelden voor een technische werkgever in volle groei.",
    intro:
      "Groep Maes zat midden in een stevige groeispurt en zocht nieuwe collega’s. Alleen: sommige technische profielen vind je nu eenmaal niet door gewoon een vacature online te gooien en te hopen op het beste. 😅",
    summary:
      "Authentieke vacaturevideo’s leverden concrete sollicitanten op, aangevuld met spectaculaire actiebeelden van hun hoogwerkoplossingen.",
    introQuote: "Groep Maes zat midden in een stevige groeispurt en zocht nieuwe collega’s.",
    storyBlocks: [
      {
        text: "Groep Maes zat midden in een stevige groeispurt en zocht nieuwe collega’s. Alleen: sommige technische profielen vind je nu eenmaal niet door gewoon een vacature online te gooien en te hopen op het beste. 😅",
      },
      {
        text: "Dus gooiden we het over een andere boeg.",
      },
      {
        text: "In plaats van droge vacatureteksten maakten we korte videoportretten met échte medewerkers van Groep Maes. Collega’s die zelf vertellen wat hun job inhoudt, waarom ze er graag werken en wat je als nieuwe medewerker kunt verwachten. Die authenticiteit brengt de boodschap persoonlijker naar de kijker. 🎥",
      },
      {
        text: "Elke video focuste op een andere functie, zodat potentiële kandidaten meteen een eerlijk beeld kregen van de job, de werksfeer en de mensen achter Groep Maes.",
      },
      {
        text: "En dat werkte. Maar liefst 15 mensen solliciteerden bij de vacature via deze campagne waarvan er 3 het team ook vervoegden! Bovendien deden de video’s meer dan vacatures invullen: ze versterkten de trots intern én het imago extern.",
      },
    ],
    storyHighlights: [[]],
    deliverables: ["Vacaturevideo’s", "Employer branding", "Drone", "GoPro", "Actiebeelden"],
    hero: {
      image: "/work/groep-maes.webp",
    },
    hideInfoStrip: true,
    ctaVariant: "blue",
    ctaTitle: "DURF JIJ SAMEN TE WERKEN?",
    ctaButton: "Eens afspreken?",
    footerVariant: "dark",
    gallery: [],
    vimeoEmbeds: [
      {
        id: "1055488422",
        title: "Vacaturevideo — Mechanieker",
        hash: "66a9e925c9",
        poster: "/images/cases/video-posters/1055488422.jpg",
      },
      {
        id: "1055488333",
        title: "Vacaturevideo — Hoogtewerker",
        hash: "97ea7df7e1",
        poster: "/images/cases/video-posters/1055488333.jpg",
      },
    ],
    media: {
      landscapeVideos: [
        {
          type: "vimeo",
          id: "1055488422",
          title: "Vacaturevideo — Mechanieker",
          hash: "66a9e925c9",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1055488422.jpg",
        },
        {
          type: "vimeo",
          id: "1055488333",
          title: "Vacaturevideo — Hoogtewerker",
          hash: "97ea7df7e1",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1055488333.jpg",
        },
      ],
      hero: {
        type: "vimeo",
        id: "1055488422",
        title: "Vacaturevideo — Mechanieker",
        hash: "66a9e925c9",
        orientation: "landscape",
        aspectRatio: "16 / 9",
        wide: true,
        poster: "/images/cases/video-posters/1055488422.jpg",
      },
    },
    editorialSections: [
      {
        title: "Actiebeelden",
        theme: "paper",
        paragraphs: [
          "Naast de vacaturevideo’s groeide onze samenwerking met Groep Maes uit tot een breder partnership. Zo brachten we onder andere de nieuwe stadionverlichting in het Lisp in beeld. 💡⚽️ Om hun innovatieve hoogwerkoplossing echt van dichtbij te tonen, kozen we voor spectaculaire drone- en GoPro-beelden. Zo krijg je als kijker letterlijk het gevoel dat je mee de hoogte in gaat. 🚁🎥",
        ],
        videos: [
          {
            type: "vimeo",
            id: "926207596",
            title: "Stadionverlichting in het Lisp",
            orientation: "landscape",
            wide: true,
            aspectRatio: "16 / 9",
            poster: "/images/cases/video-posters/926207596.jpg",
          },
        ],
      },
    ],
    facts: [],
    question: {
      title: "Probleem",
      text: "Groep Maes wilde stevig groeien, maar de juiste technische profielen vinden bleek allesbehalve evident. Hoe bereik je mensen die moeilijk te vinden én moeilijk te overtuigen zijn?",
    },
    approach: {
      title: "Oplossing",
      text: "We maakten authentieke employer-brandingvideo’s waarin medewerkers zélf hun job en werkomgeving laten zien 👀!",
    },
    result: {
      title: "Resultaat",
      text: "De campagne leverde 15 concrete sollicitanten op, waarvan drie nieuwe collega’s effectief het team vervoegden. 🚀",
    },
    externalVideoUrls: [
      "https://www.amiamis.com/work/groepmaes",
      "https://f.io/NUX0WIU3",
      "https://f.io/ikINiub0",
    ],
  },
  {
    slug: "recenter",
    template: "x-oats-social",
    client: "ReCenter",
    heroTitle: "ReCenter",
    title: "ReCenter, Rust 🌿",
    subtitle: "Retreatcontent die rust uitstraalt en bedrijven overtuigt.",
    category: "Social content",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "vertical-video-grid",
    seo: {
      title: "ReCenter retreatcontent | Ami Amis",
      description:
        "Voor ReCenter combineerden we spontane UGC-content met stijlvolle testimonials om ook bedrijven warm te maken voor een retreat.",
    },
    intro:
      "Bij Ami Amis weten we al wat chillen is, maar bij Recenter tillen ze rust naar een hoger niveau. 😌",
    summary:
      "Een mix van UGC en high-end content die zowel het gevoel als de kwaliteit van Recenter overbrengt.",
    introQuote:
      "En omdat Recenter draait rond vertragen, zorgden we ervoor dat ook de content dat gevoel behoudt.",
    storyTitle: false,
    storyBlocks: [
      {
        text: "Bij Ami Amis weten we al wat chillen is, maar bij Recenter tillen ze rust naar een hoger niveau. 😌",
      },
      {
        text: "Hun retreats zitten in het weekend al goed vol met mensen die willen vertragen, ontsnappen aan de drukte en even terug de natuur in willen. Alleen bleef het doorheen de week vaak net iets té stil.",
      },
      {
        text: "Dus kwam de vraag: hoe krijgen we ook bedrijven warm voor een retreat bij Recenter?",
      },
      {
        text: "Wij trokken er met een deel van de Ami Amis-squad naartoe en deden vooral wat toekomstige bezoekers zelf ook zouden doen: ervaren. We vlogden ons verblijf en maakten daar zoveel mogelijk verschillende video’s van. Want je kunt natuurlijk zélf vertellen hoe goed je retreat is… maar iemand anders die zichtbaar geniet? Dat verkoopt toch net iets makkelijker. 😉",
      },
      {
        text: "Naast de spontane UGC-content namen we ook twee high-end testimonials op met founder Bert en CFO Jonathan. Zo combineerden we twee werelden: authentieke UGC-content die dichtbij voelt én stijlvolle content die vertrouwen en kwaliteit uitstraalt.",
      },
      {
        text: "En omdat Recenter draait rond vertragen, zorgden we ervoor dat ook de content dat gevoel behoudt. Rustig, warm en sfeervol… Maar wel gemonteerd op een manier die overeind blijft in de iets minder rustige wereld van social media. 🌲📱",
      },
    ],
    storyHighlights: [[], [], [], [], [], []],
    deliverables: ["UGC-content", "Testimonials", "Social video"],
    hero: {
      image: "/images/cases/recenter/recenter-video-poster.jpg",
      poster: "/images/cases/recenter/recenter-video-poster.jpg",
    },
    gallery: [
      {
        src: "/images/cases/recenter/recenter-video-poster.jpg",
        alt: "ReCenter retreatvideo in een natuurlijke omgeving",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1226965749",
        title: "ReCenter testimonial",
        orientation: "portrait",
        wide: false,
        aspectRatio: "9 / 16",
        poster: "/images/cases/recenter/recenter-video-poster.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1226965749",
          title: "ReCenter testimonial",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/recenter/recenter-video-poster.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1226965749",
        title: "ReCenter testimonial",
        poster: "/images/cases/recenter/recenter-video-poster.jpg",
      },
    ],
    facts: [],
    question: {
      title: "Probleem",
      text: "De weekends van Recenter zaten goed gevuld, maar doorheen de week bleef er nog veel ruimte over. Hoe overtuig je bedrijven dat een retreat niet alleen leuk is, maar ook een waardevolle investering in hun team?",
    },
    approach: {
      title: "Oplossing",
      text: "We maakten de ervaring zelf het verhaal. Met onze eigen vlogcontent brachten we Recenter spontaan en herkenbaar in beeld, alsof je er zelf al even bij was. Daarnaast capteerden we testimonials met de mensen achter het merk voor extra vertrouwen en diepgang. Uit één draaidag creëerden we verschillende formats, afgestemd op verschillende momenten binnen de customer journey.",
    },
    result: {
      title: "Resultaat",
      text: "Een mix van UGC en high-end content die zowel het gevoel als de kwaliteit van Recenter overbrengt. Spontaan genoeg om op social media te werken, sterk genoeg om bedrijven te overtuigen en vooral: helemaal in de rustige wereld van Recenter. 🌿",
    },
    externalVideoUrls: [
      "https://vimeo.com/1226965749?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "opnieuw-en-co",
    template: "x-oats-social",
    client: "Opnieuw & Co",
    heroTitle: "Opnieuw & Co",
    title: "Oude spullen, een nieuwe look. ♻️✨",
    subtitle: "Seizoenscampagnes met tweedehandsspullen in de hoofdrol.",
    category: "Design & branding",
    categories: ["Design & branding", "Marketingstrategie"],
    year: "2024–2026",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "image-gallery",
    seo: {
      title: "Opnieuw & Co campagnes | Ami Amis",
      description:
        "Voor Opnieuw & Co maken we frisse zomer- en wintercampagnes die tweedehandsspullen telkens op een nieuwe manier in de kijker zetten.",
    },
    intro:
      "Voor Opnieuw & Co maken we ondertussen al drie jaar de campagnes voor hun winter- en zomercollecties.",
    summary:
      "Een reeks affiches die jaar na jaar herkenbaar blijven voor Opnieuw & Co, maar telkens iets nieuws brengen.",
    introQuote:
      "De briefing is telkens simpel: zet onze tweedehandsspullen op een leuke manier in de kijker.",
    storyTitle: false,
    storyBlocks: [
      {
        text: "Voor Opnieuw & Co maken we ondertussen al drie jaar de campagnes voor hun winter- en zomercollecties. De briefing is telkens simpel: zet onze tweedehandsspullen op een leuke manier in de kijker.",
      },
      { text: "Daar kunnen we wel iets mee. 😉" },
      {
        text: "Opnieuw & Co bezorgt ons de praktische info, wij krijgen de creatieve vrijheid. Zo bouwden we bijvoorbeeld een kerstboom en kerstkrans volledig uit tweedehandsspullen. 🎄 Voor de zomercampagne hingen we dan weer kleding aan een waslijn om instant dat zonnige gevoel op te roepen. ☀️👕",
      },
      {
        text: "Voor hun 30-jarig bestaan in 2025 mochten we nog een stap verder gaan. We doken in hun oude huisstijl en bouwden de campagne volledig rond die retro-look. Een kleine throwback, maar dan in een nieuw jasje. 📼✨",
      },
      {
        text: "En omdat één affiche zelden genoeg is, trekken we elk concept meteen door naar verschillende toepassingen: banners, A4-posters, prints voor hun camion en andere formaten. Alles wordt meteen technisch correct en printklaar aangeleverd. Geen extra gedoe dus. 🙌",
      },
      {
        text: "En na zo’n vlotte samenwerking? Dan komen ze het jaar erna sowieso opnieuw bij ons aankloppen. 😉",
      },
    ],
    storyHighlights: [[], [], [], [], [], []],
    deliverables: ["Campagneconcept", "Affiches", "Banners", "Printdesign"],
    hero: {
      image: "/images/cases/opnieuw-co/dag-van-de-kringloopwinkel-2025.webp",
      orientation: "portrait",
      aspectRatio: "1200 / 1684",
      contain: true,
      hideCaption: true,
    },
    includeHeroInGallery: true,
    gallery: [
      {
        src: "/images/cases/opnieuw-co/dag-van-de-kringloopwinkel-2025.webp",
        alt: "Retro-affiche voor de Dag van de Kringloopwinkel 2025",
      },
    ],
    imageGalleryTitle: "Campagneaffiches",
    imageGalleryEyebrow: "2024–2026",
    imageGallery: [
      {
        src: "/images/cases/opnieuw-co/zomert-2024.webp",
        alt: "Zomert-campagne van Opnieuw & Co uit 2024",
        orientation: "portrait",
        width: 1200,
        height: 1688,
        contain: true,
      },
      {
        src: "/images/cases/opnieuw-co/dag-van-de-kringloopwinkel-2025.webp",
        alt: "Retro-affiche voor de Dag van de Kringloopwinkel 2025",
        orientation: "portrait",
        width: 1200,
        height: 1684,
        contain: true,
      },
      {
        src: "/images/cases/opnieuw-co/zomert-2026.webp",
        alt: "Zomert-campagne van Opnieuw & Co uit 2026",
        orientation: "portrait",
        width: 1200,
        height: 1697,
        contain: true,
      },
      {
        src: "/images/cases/opnieuw-co/dag-van-de-kringloopwinkel-2026.webp",
        alt: "Affiche voor de Dag van de Kringloopwinkel 2026",
        orientation: "portrait",
        width: 1200,
        height: 1733,
        contain: true,
      },
      {
        src: "/images/cases/opnieuw-co/wintert-2026.webp",
        alt: "Wintert-campagne van Opnieuw & Co uit 2026",
        orientation: "portrait",
        width: 1200,
        height: 1684,
        contain: true,
      },
    ],
    facts: [],
    question: {
      title: "Probleem",
      text: "Hoe zorg je ervoor dat een terugkerende zomer- of wintercampagne elk jaar opnieuw fris en verrassend aanvoelt?",
    },
    approach: {
      title: "Oplossing",
      text: "We vertrekken telkens vanuit het seizoen, de collectie en de identiteit van Opnieuw & Co en bouwen daar een nieuw creatief concept rond. Herkenbaar, maar nooit copy-paste. ♻️",
    },
    result: {
      title: "Resultaat",
      text: "Een reeks affiches die jaar na jaar herkenbaar blijven voor Opnieuw & Co, maar telkens iets nieuws brengen. Helemaal printklaar afgeleverd. ✨",
    },
  },
  {
    slug: "craftails",
    template: "x-oats-social",
    client: "Craftails",
    heroTitle: "Craftails",
    title: "Alles uit één event halen. 🍸🎥",
    subtitle: "Van aftermovie naar meerdere contentformats op dezelfde draaidag.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2023",
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    seo: {
      title: "Craftails eventcontent | Ami Amis",
      description:
        "Voor Craftails haalden we uit events en teambuildings meerdere formats: aftermovies, productvideo, interviews en teamcontent.",
    },
    intro:
      "Craftails is een ready-to-serve cocktailmerk met een simpel maar heerlijk principe: ijs, Craftails, garnering… en klaar. 🍹",
    summary:
      "Van één simpele aftermovie naar verschillende contentformats die elk een ander stukje van het merk laten zien.",
    introQuote:
      "Dus: wil je nét iets meer uit je draaidag halen dan gewoon een leuke recap? Dan weet je ons te vinden. 😉",
    storyTitle: false,
    storyBlocks: [
      {
        text: "Craftails is een ready-to-serve cocktailmerk met een simpel maar heerlijk principe: ijs, Craftails, garnering… en klaar. 🍹",
      },
      {
        text: "In 2023 werkten we voor het eerst samen tijdens één van hun events. De opdracht? Een aftermovie maken. Maar goed, als we daar toch zijn, kunnen we evengoed nog wat extra content meepikken. 😉",
      },
      {
        text: "Dus zetten we ook een medewerker voor de lens om in een korte video te tonen hoe makkelijk het product werkt. Twee vliegen, één klap.",
      },
      { text: "En daar bleef het niet bij." },
      {
        text: "Voor een volgende teambuilding klopte Craftails opnieuw bij ons aan. Wat eerst gewoon een aftermovie moest worden, groeide uit tot een persoonlijk interview waarin de medewerkers vertellen over het merk, hoe het ontstaan is en waarom ze er zelf zo hard in geloven. ❤️ Want het enthousiasme van je eigen team zegt soms meer over je merk dan eender welke verkooppraat.",
      },
      {
        text: "Tijdens diezelfde teambuilding speelde het team ook een eigen versie van De Mol, compleet met bodycams. In plaats van die beelden gewoon achter elkaar te plakken, maakten we er een echt verhaal van: spanning, verdenkingen, chaos en vooral héél veel plezier. 🕵️‍♀️🍸",
      },
      {
        text: "Van één simpele aftermovie naar verschillende contentformats die elk een ander stukje van het merk laten zien.",
      },
      {
        text: "Dus: wil je nét iets meer uit je draaidag halen dan gewoon een leuke recap? Dan weet je ons te vinden. 😉",
      },
    ],
    storyHighlights: [[], [], [], [], [], [], [], []],
    deliverables: ["Aftermovie", "Productvideo", "Interview", "Teamcontent"],
    hero: {
      image: "/images/cases/craftails/craftails-video-poster.jpg",
      poster: "/images/cases/craftails/craftails-video-poster.jpg",
    },
    gallery: [
      {
        src: "/images/cases/craftails/craftails-video-poster.jpg",
        alt: "Craftails op de horecabeurs in Gent",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1226970867",
        title: "Craftails aftermovie",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/craftails/craftails-video-poster.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1226970867",
          title: "Craftails aftermovie",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/craftails/craftails-video-poster.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1226970867",
        title: "Craftails aftermovie",
        poster: "/images/cases/craftails/craftails-video-poster.jpg",
      },
    ],
    facts: [],
    question: {
      title: "Probleem",
      text: "Veel bedrijven boeken een aftermovie en klaar. Terwijl er op zo’n event vaak nog véél meer verhalen, mensen en momenten rondlopen die de moeite zijn om vast te leggen.",
    },
    approach: {
      title: "Oplossing",
      text: "Wij kijken daarom altijd verder. Als we er toch zijn met camera’s, zoeken we mee naar extra content die logisch aansluit bij het moment: een korte productvideo, een sterk interview, spontane teamcontent… zonder er een extra productie van te maken. 🎥🍸",
    },
    result: {
      title: "Resultaat",
      text: "Craftails kreeg niet gewoon een mooie recap van hun events, maar meerdere video’s met elk een eigen doel. Zo haalden we veel meer uit dezelfde draaidag en bouwden we tegelijk verder aan hun merkverhaal. 😉",
    },
    externalVideoUrls: [
      "https://vimeo.com/1226970867?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "shopwedo",
    template: "x-oats-social",
    client: "ShopWeDo",
    heroTitle: "ShopWeDo",
    title: "Meer dan een aftermovie 🎥",
    subtitle:
      "Een emotionele terugblik op tien jaar ShopWeDo, met het feest als verdiende finale.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Fotografie"],
    sourceUrl: null,
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "vimeo-video",
    seo: {
      title: "ShopWeDo jubileumvideo | Ami Amis",
      description:
        "Voor tien jaar ShopWeDo maakten we meer dan een aftermovie: een emotionele terugblik met het jubileumfeest als verdiende finale.",
    },
    intro:
      "10 jaar ShopWeDo. Da’s niet gewoon een verjaardag met taart en een paar kaarsjes. Dat zijn tien jaar ondernemen, groeien, mensen leren kennen, successen vieren en waarschijnlijk hier en daar eens goed vloeken. 😉",
    summary:
      "Een jubileumvideo die verder gaat dan ‘kijk eens wat een leuk feestje’. Een emotionele terugblik op tien jaar ShopWeDo, met het feest als verdiende finale.",
    introQuote:
      "Zo werd de video geen klassieke recap van één avond, maar een klein eerbetoon aan alles wat eraan voorafging. ❤️",
    storyTitle: false,
    storyBlocks: [
      {
        text: "10 jaar ShopWeDo. Da’s niet gewoon een verjaardag met taart en een paar kaarsjes. Dat zijn tien jaar ondernemen, groeien, mensen leren kennen, successen vieren en waarschijnlijk hier en daar eens goed vloeken. 😉",
      },
      {
        text: "Voor hun jubileum wilden we daarom méér maken dan gewoon een aftermovie van een feestje.",
      },
      {
        text: "We begonnen bij het begin en blikten terug op de afgelopen tien jaar ShopWeDo. De mensen, de groei, de mijlpalen en alles wat ervoor gezorgd heeft dat ze vandaag staan waar ze staan. Zo bouwden we eerst de emotie op achter die verjaardag, voor we terechtkwamen bij waar die tien jaar samenkwamen: hun jubileumfeest. 🥳",
      },
      { text: "En dat feest mocht er zijn." },
      {
        text: "In de iconische Maneblusser legden we de avond vast met dynamische videobeelden en sfeervolle fotografie. Niet gewoon wie er stond en wat er gebeurde, maar vooral hoe het voelde om daar samen tien jaar ShopWeDo te vieren. 🎉📸",
      },
      {
        text: "Zo werd de video geen klassieke recap van één avond, maar een klein eerbetoon aan alles wat eraan voorafging. ❤️",
      },
    ],
    storyHighlights: [[], [], [], [], [], []],
    deliverables: ["Jubileumvideo", "Aftermovie", "Fotografie"],
    hero: {
      image: "/images/cases/shopwedo/shopwedo-video-poster.webp",
      poster: "/images/cases/shopwedo/shopwedo-video-poster.webp",
    },
    gallery: [
      {
        src: "/images/cases/shopwedo/shopwedo-video-poster.webp",
        alt: "Gouden jubileumbeeld voor tien jaar ShopWeDo",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1228812669",
        hash: "9869d0b45d",
        title: "ShopWeDo jubileumvideo",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/shopwedo/shopwedo-video-poster.webp",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1228812669",
          hash: "9869d0b45d",
          title: "ShopWeDo jubileumvideo",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/shopwedo/shopwedo-video-poster.webp",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1228812669",
        hash: "9869d0b45d",
        title: "ShopWeDo jubileumvideo",
        poster: "/images/cases/shopwedo/shopwedo-video-poster.webp",
      },
    ],
    facts: [],
    question: {
      title: "Probleem",
      text: "Een tienjarig jubileum is meer dan een goed feestje. Hoe zorg je ervoor dat een aftermovie niet alleen toont wat er die avond gebeurde, maar ook voelbaar maakt waarom die avond zoveel betekende?",
    },
    approach: {
      title: "Oplossing",
      text: "We vertelden het verhaal niet vanaf het feest, maar vanaf tien jaar eerder. We blikten terug op de weg die ShopWeDo had afgelegd en lieten die geschiedenis uitmonden in het jubileumfeest.\n\nTijdens de avond combineerden we video en fotografie om niet alleen de actie, maar vooral de trots, sfeer en connectie tussen de mensen vast te leggen. 🎥✨",
    },
    result: {
      title: "Resultaat",
      text: "Een jubileumvideo die verder gaat dan ‘kijk eens wat een leuk feestje’. Een emotionele terugblik op tien jaar ShopWeDo, met het feest als verdiende finale.\n\nEen herinnering voor het team, een sterk verhaal voor klanten en partners en vooral: tien jaar werk gevangen in een paar minuten gevoel. ❤️",
    },
    externalVideoUrls: [
      "https://vimeo.com/1228812669?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "kunst-en-stad",
    template: "x-oats-social",
    client: "Kunst&stad | Stad Antwerpen",
    heroTitle: "Kunst&stad",
    title: "Kunst&stad | Stad Antwerpen",
    subtitle:
      "Een videoreeks over toegankelijkheid en inclusie in de Antwerpse cultuursector.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content"],
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
      title: "Kunst&stad | Stad Antwerpen | Ami Amis",
      description:
        "Voor Kunst&stad van Stad Antwerpen maakten we een videoreeks die cultuurorganisaties inspireert om inclusiever en toegankelijker te werken.",
    },
    intro:
      "Voor Kunst&stad van Stad Antwerpen mochten we een reeks video’s maken rond toegankelijkheid en inclusie in de Antwerpse cultuursector.",
    summary:
      "Met compacte draaisessies, gerichte testimonials en een eenvoudig script brachten we inclusie en toegankelijkheid menselijk in beeld.",
    introQuote:
      "De bedoeling: andere Antwerpse organisaties inspireren. Interessant!",
    storyTitle: false,
    storyBlocks: [
      {
        text: "Voor Kunst&stad van Stad Antwerpen mochten we een reeks video’s maken rond toegankelijkheid en inclusie in de Antwerpse cultuursector. De bedoeling: andere Antwerpse organisaties inspireren. Interessant!",
      },
      {
        text: "De omstandigheden maakten het best spannend: een krap budget, organisatorisch veel gepuzzel en weinig marge om tijd te verliezen. Dus: knallen geblazen. Dankzij de open communicatie met de klant konden we snel beslissingen nemen en de productie zo compact mogelijk organiseren.",
      },
      {
        text: "Voor het eerst werkten we samen met blinde en dove mensen. En daar hebben we zelf ook verrassend veel uit meegenomen. Zo ontdekten we onder andere hoe mooi en expressief Vlaamse Gebarentaal is om in beeld te brengen. Het ondertitelen van een testimonial in gebaren was iets moeilijker, maar daar hebben we ook veel uit geleerd!",
      },
      {
        text: "Met een compact script, gerichte testimonials en korte draaisessies brachten we onder andere Zomer van Antwerpen en Meeuw van Olympique Dramatique in beeld.",
      },
      {
        text: "Met succes, want na de eerste video’s werden er meteen extra producties bijgeboekt. Daar zeggen wij geen nee tegen, natuurlijk…",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Videoreeks", "Testimonials", "Ondertiteling"],
    hero: {
      image: "/images/cases/kunst-en-stad/meeuw-poster.jpg",
      poster: "/images/cases/kunst-en-stad/meeuw-poster.jpg",
    },
    gallery: [
      {
        src: "/images/cases/kunst-en-stad/meeuw-poster.jpg",
        alt: "Toegankelijke opvoering van Meeuw door Olympique Dramatique",
      },
    ],
    media: {
      hero: {
        type: "vimeo",
        id: "1229899451",
        title: "Meeuw van Olympique Dramatique",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/kunst-en-stad/meeuw-poster.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1229899451",
          title: "Meeuw van Olympique Dramatique",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/kunst-en-stad/meeuw-poster.jpg",
        },
        {
          type: "vimeo",
          id: "1229900084",
          title: "Zomer van Antwerpen",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/kunst-en-stad/zomer-van-antwerpen-poster.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1229899451",
        title: "Meeuw van Olympique Dramatique",
        poster: "/images/cases/kunst-en-stad/meeuw-poster.jpg",
      },
      {
        id: "1229900084",
        title: "Zomer van Antwerpen",
        poster: "/images/cases/kunst-en-stad/zomer-van-antwerpen-poster.jpg",
      },
    ],
    facts: [],
    question: {
      title: "Probleem",
      text: "Kunst&stad wil Antwerpse cultuurorganisaties inspireren om inclusiever en toegankelijker te werken, met een beperkt productiebudget.",
    },
    approach: {
      title: "Oplossing",
      text: "Met compacte draaisessies, gerichte testimonials en een eenvoudig script brachten we twee organisaties efficiënt en menselijk in beeld.",
    },
    result: {
      title: "Resultaat",
      text: "We maakten video’s rond Zomer van Antwerpen en Meeuw van Olympique Dramatique. De samenwerking verliep super en er werden meteen extra video’s besteld.",
    },
    externalVideoUrls: [
      "https://vimeo.com/1229899451?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1229900084?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "vdab",
    template: "x-oats-social",
    client: "VDAB",
    heroTitle: "VDAB",
    title: "Extra handen nodig? Say less. 🫶",
    subtitle: "Flexibele video- en fotografiepartner voor jobbeurzen en events.",
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
      "VDAB organiseert maandelijks jobbeurzen, events en andere initiatieven die allemaal in beeld gebracht moeten worden.",
    summary:
      "Een vaste creatieve partner waarop VDAB kan terugvallen wanneer het druk wordt.",
    introQuote:
      "Geen eenmalige productie dus, maar een samenwerking waarbij we klaarstaan wanneer er extra creatieve handen nodig zijn.",
    storyBlocks: [
      {
        text: "VDAB organiseert maandelijks jobbeurzen, events en andere initiatieven die allemaal in beeld gebracht moeten worden. Alleen: met zoveel op de planning is het niet altijd haalbaar om alles intern te blijven doen.",
      },
      {
        text: "Enter Ami Amis.🚪",
      },
      {
        text: "Wij sprongen bij als vaste videovrienden en namen een deel van die producties uit handen. Van jobbeurzen tot events: we zorgden ervoor dat de sfeer, mensen en verhalen netjes werden vastgelegd zonder dat VDAB daar zelf extra kopzorgen aan had.",
      },
      {
        text: "Bovendien legden we de videocamera af en toe even opzij en namen we de fotocamera erbij. 📸",
      },
      {
        text: "Geen eenmalige productie dus, maar een samenwerking waarbij we klaarstaan wanneer er extra creatieve handen nodig zijn.",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Eventvideo", "Social media video", "Fotografie"],
    hero: {
      image: "/work/vdab.webp",
      sourceMediaUrl:
        "https://images.squarespace-cdn.com/content/v1/643d2a65d8203861cae47bbe/096bce0b-8e68-4440-840e-7ff053c9ffb9/VDAB+Banner+foto.JPG",
    },
    gallery: [{ src: "/work/vdab.webp", alt: "VDAB projectbeeld" }],
    vimeoEmbeds: [
      vimeo("1055573602", "VDAB social media video", "43641632ca"),
      vimeo("1055574019", "VDAB video 2", "99a472e978"),
      vimeo("1055577145", "VDAB video 3", "3d65ef19c1"),
    ],
    media: {
      hero: portraitVimeoCaseMedia("1055573602", "VDAB social media video", "43641632ca"),
      verticalVideos: [
        portraitVimeoCaseMedia("1055573602", "VDAB social media video", "43641632ca"),
        portraitVimeoCaseMedia("1055574019", "VDAB video 2", "99a472e978"),
        portraitVimeoCaseMedia("1055577145", "VDAB video 3", "3d65ef19c1"),
      ],
    },
    needsEditorialSplit: false,
    facts: [
      { label: "Output", value: "jobvideo's" },
      { label: "Type", value: "event en social" },
    ],
    question: {
      title: "Probleem",
      text: "VDAB organiseert heel wat events en initiatieven, maar heeft niet altijd de interne capaciteit om alles zelf in beeld te brengen. Hoe zorg je ervoor dat die content toch consistent en kwalitatief wordt gemaakt, zonder je eigen team extra te belasten?",
    },
    approach: {
      title: "Oplossing",
      text: "Wij springen flexibel bij als externe videopartner en nemen producties van A tot Z mee over. Van maandelijkse jobbeurzen en events tot fotografie: VDAB geeft de briefing door, wij zorgen dat het in beeld komt. 🎬",
    },
    result: {
      title: "Resultaat",
      text: "Een vaste creatieve partner waarop VDAB kan terugvallen wanneer het druk wordt. Minder geregel intern, consistente content en vooral: volledige ontzorging wanneer dat nodig is. 🤝",
      stats: [
        { value: "3", label: "video’s" },
        { value: "job", label: "beurzen" },
        { value: "events", label: "content" },
        { value: "foto", label: "opdrachten" },
      ],
    },
    outro:
      "Een vaste creatieve partner waarop VDAB kan terugvallen wanneer het druk wordt.",
    externalVideoUrl: "https://f.io/l92Q995M",
  },
  {
    slug: "weplanet",
    template: "x-oats-social",
    client: "WePlanet",
    heroTitle: "WEPLANET",
    title: "WePlanet",
    subtitle: "Een campagnevideo rond sandboxes in biotech-regulatie.",
    oneLiner:
      "Een krachtige campagnevideo voor WePlanet, een opvallende actie richting Europese ministers en nieuwe post-skills bij Ami Amis.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Marketingstrategie"],
    year: "2026",
    sourceUrl: "https://vimeo.com/1215731384?share=copy&fl=sv&fe=ci",
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "mixed-media",
    seo: {
      title: "WePlanet | Ami Amis",
      description:
        "Voor WePlanet maakten we een campagnevideo die een complex biotech-regulatiedossier helder, menselijk en voelbaar maakt.",
    },
    introQuote:
      "Hoe kunnen we een complex onderwerp als biotech-regulatie vertalen naar een simpele, overtuigende en emotionele campagnevideo?",
    intro:
      "WePlanet kwam bij ons aankloppen met een missie die even belangrijk als ingewikkeld was: de legalisering van sandboxes versnellen.",
    summary:
      "Een krachtige campagnevideo voor WePlanet, een opvallende actie richting Europese ministers én nieuwe post-skills bij Ami Amis 📬",
    storyBlocks: [
      {
        text: "WePlanet kwam bij ons aankloppen met een missie die even belangrijk als ingewikkeld was: de legalisering van sandboxes versnellen. En nee, niet de zandbakken waar je vroeger zandtaartjes in maakte 🏖️, maar veilige testomgevingen binnen biotech-regulatie. Best technisch dus. Net daarom moest de boodschap helder, menselijk en vooral voelbaar worden.",
      },
      {
        text: "Hun idee? Een echte doos zand opsturen naar alle ministers van landbouw binnen de EU. Een symbolische actie om te tonen dat innovatie ruimte nodig heeft om te groeien. Alleen ontbrak nog één ding: een video die dat verhaal krachtig kon vertellen. Eentje die de actie niet alleen uitlegt, maar ook de urgentie laat binnenkomen.",
      },
      {
        text: "We kregen een script en voice-overtekst aangeleverd en doken erin. In enkele weken tijd bouwden we de hele productie op: van casting en planning tot sfeer, beelden en ja, zelfs de dozen zand die in beeld moesten komen 📦. Alles om van een complex beleidsdossier een warme, overtuigende en inspirerende video te maken.",
      },
      {
        text: "En toen kwam de bonusvraag: of we die dozen misschien ook écht wilden versturen naar alle ministers. Natuurlijk! Dus veranderde ons kantoor voor een paar dagen in een mini-postkantoor. Dozen klaarzetten, labels plakken, verzenden maar. Ami Amis: tijdelijk ook gespecialiseerd in Europese zanddistributie ✉️",
      },
      {
        text: "Nu is het hopen dat deze actie ook echt iets in beweging zet. Aan de video — en onze zandbaklogistiek — zal het alvast niet liggen 😉",
      },
    ],
    storyHighlights: [[], [], [], [], []],
    deliverables: ["Campagnevideo", "Productie", "Casting", "Planning", "Verzending"],
    hero: {},
    gallery: [],
    media: {
      hero: {
        type: "vimeo",
        id: "1215731384",
        title: "WePlanet campagnevideo",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/video-posters/1215731384.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1215731384",
          title: "WePlanet campagnevideo",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1215731384.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1215731384",
        title: "WePlanet campagnevideo",
        poster: "/images/cases/video-posters/1215731384.jpg",
      },
    ],
    facts: [
      { label: "Output", value: "campagnevideo" },
      { label: "Thema", value: "biotech-regulatie" },
      { label: "Doelgroep", value: "Europese ministers" },
      { label: "Resultaat", value: "PLACEHOLDER" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Hoe kunnen we een complex onderwerp als biotech-regulatie vertalen naar een simpele, overtuigende en emotionele campagnevideo?",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "Wij brachten een door WePlanet aangeleverde voice-over tot leven brengen met beelden die helder uitleggen, menselijk aanvoelen en de urgentie versterken.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een krachtige campagnevideo voor WePlanet, een opvallende actie richting Europese ministers én nieuwe post-skills bij Ami Amis 📬",
      stats: [
        { value: "1", label: "campagnevideo" },
        { value: "EU", label: "ministers" },
        { value: "PLACEHOLDER", label: "dozen zand" },
        { value: "PLACEHOLDER", label: "impact" },
      ],
    },
    outro: "Aan de video — en onze zandbaklogistiek — zal het alvast niet liggen 😉",
    externalVideoUrl: "https://vimeo.com/1215731384?share=copy&fl=sv&fe=ci",
  },
  {
    slug: "kdg",
    aliases: ["karel-de-grote-hogeschool"],
    template: "x-oats-social",
    client: "KdG",
    heroTitle: "KDG",
    title: "KdG",
    subtitle: "School = Cool. 🎓",
    oneLiner:
      "Een langdurige samenwerking waarin we studiekeuze, employer branding, interne communicatie en events tot leven brengen.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Animatie & montage", "Social content"],
    year: "2026",
    sourceUrl: "https://vimeo.com/1215735592?share=copy&fl=sv&fe=ci",
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "mixed-media",
    seo: {
      title: "KdG | Ami Amis",
      description:
        "Voor KdG werkt Ami Amis als vaste videopartner aan videofolders, graduations, strategievideo's en eindejaarscontent.",
    },
    introQuote:
      "Bij Ami Amis mogen we ons met trots de vaste videopartner van KdG noemen. En geloof ons: dat levert allesbehalve saaie opdrachten op. 😉",
    intro:
      "Bij Ami Amis mogen we ons met trots de vaste videopartner van KdG noemen. En geloof ons: dat levert allesbehalve saaie opdrachten op. 😉",
    summary:
      "Een langdurige samenwerking waarin we de meest uiteenlopende verhalen tot leven brengen.",
    storyBlocks: [
      {
        text: "Van videofolders voor verschillende studierichtingen tot aftermovies van graduations en strategievideo's. Elke productie heeft hetzelfde doel: complexe informatie helder, aantrekkelijk en vooral menselijk maken.",
      },
      {
        text: "Voor de videofolders doken we diep in motion design. Samen met KdG ontwikkelden we een animatiestijl die perfect aansluit bij hun huisstijl. Zo hoeven toekomstige studenten zich niet door eindeloze pdf's te worstelen, maar krijgen ze in een paar minuten een duidelijk beeld van wat elke opleiding te bieden heeft. Veel leuker, toch? 📚✨",
      },
      {
        text: "Daarnaast brachten we de mooiste momenten van de graduation in beeld én vertaalden we de aankondiging van hun nieuwe strategie naar een heldere video die KdG-ers aanzet mee te denken over hun toekomst.",
      },
      {
        text: "En de kers op de taart? 🍒 De eindejaarsvideo.",
      },
      {
        text: "40 studenten, een hittegolf, hout, hamers en een ambitieuze planning. Geen zorgen, wij houden wel van een uitdaging. 😎 Het resultaat is een video waarin studenten met een glimlach terugblikken op hun tijd bij KdG.",
      },
      {
        text: "Na al die video's krijgen wij eerlijk gezegd zelf weer zin om achter de schoolbanken te kruipen. 😉",
      },
    ],
    storyHighlights: [[], [], [], [], [], [], [], []],
    deliverables: [
      "Videofolders",
      "Motion design",
      "Aftermovies",
      "Strategievideo",
      "Eindejaarsvideo",
    ],
    hero: {},
    gallery: [],
    media: {
      hero: {
        type: "vimeo",
        id: "1215735592",
        title: "Videofolder Vroedkunde",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/video-posters/1215735592.jpg",
      },
      verticalVideos: [
        {
          type: "vimeo",
          id: "1215735592",
          title: "Videofolder Vroedkunde",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1215735592.jpg",
        },
        {
          type: "vimeo",
          id: "1215735591",
          title: "Videofolder LSO",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1215735591.jpg",
        },
        {
          type: "vimeo",
          id: "1215735590",
          title: "Graduation",
          orientation: "landscape",
          wide: true,
          aspectRatio: "16 / 9",
          poster: "/images/cases/video-posters/1215735590.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1215735592",
        title: "Videofolder Vroedkunde",
        poster: "/images/cases/video-posters/1215735592.jpg",
      },
      {
        id: "1215735591",
        title: "Videofolder LSO",
        poster: "/images/cases/video-posters/1215735591.jpg",
      },
      {
        id: "1215735590",
        title: "Graduation",
        poster: "/images/cases/video-posters/1215735590.jpg",
      },
    ],
    facts: [
      { label: "Output", value: "videofolders, graduations, strategie en eindejaarsvideo" },
      { label: "Samenwerking", value: "vaste videopartner" },
      { label: "Studenten", value: "40 in eindejaarsvideo" },
      { label: "Resultaat", value: "PLACEHOLDER" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "KdG zocht een videopartner die hun doelgroep écht begrijpt. Iemand die studenten aanspreekt op hun manier, zonder in clichés of droge communicatie te vervallen 😴.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We ontwikkelden video's die informatief én entertainend zijn. Met sterke storytelling, herkenbare beelden, motion graphics die perfect aansluiten bij de huisstijl en producties die telkens afgestemd zijn op het juiste doelpubliek.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een langdurige samenwerking waarin we de meest uiteenlopende verhalen tot leven brengen: van studiekeuze en employer branding tot interne communicatie en events. Zo heeft KdG één vaste videopartner die het merk kent, proactief meedenkt en van elke boodschap iets maakt dat mensen niet alleen begrijpen, maar ook écht willen bekijken.",
      stats: [
        { value: "4", label: "casevideo’s" },
        { value: "40", label: "studenten" },
        { value: "vast", label: "videopartner" },
        { value: "PLACEHOLDER", label: "extra cijfer" },
      ],
    },
    outro:
      "Na al die video's krijgen wij eerlijk gezegd zelf weer zin om achter de schoolbanken te kruipen. 😉",
    externalVideoUrls: [
      "https://vimeo.com/1215735592?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1215735591?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1215735590?share=copy&fl=sv&fe=ci",
    ],
  },
  {
    slug: "bazwil",
    template: "x-oats-social",
    client: "Bazwil",
    heroTitle: "BAZWIL",
    title: "Bazwil",
    subtitle: "",
    oneLiner:
      "Een stijlvolle brandvideo die de identiteit van Bazwil voelbaar maakt en hun collectie natuurlijk in beeld brengt.",
    category: "Video & campagnes",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
    year: "2026",
    sourceUrl: "https://vimeo.com/1215742155?share=copy&fl=sv&fe=ci",
    sourceType: "manual-new-copy",
    needsContent: false,
    needsReview: false,
    needsAssetDownload: false,
    needsMedia: false,
    needsEditorialSplit: false,
    mediaType: "mixed-media",
    seo: {
      title: "Bazwil | Ami Amis",
      description:
        "Voor Bazwil maakte Ami Amis een stijlvolle brandvideo en korte looks voor de zomercollectie van 2026.",
    },
    introQuote: "Strike a pose. 📸",
    intro: "Strike a pose. 📸",
    summary:
      "Een stijlvolle brandvideo die de identiteit van Bazwil voelbaar maakt en hun collectie op een natuurlijke manier in beeld brengt. 👗",
    storyBlocks: [
      {
        text: "Voor het Belgische kledingmerk Bazwil maakten we een brandvideo die helemaal paste bij hun slogan.",
      },
      {
        text: "“Clothes that feel like black coffee, fresh air and good ideas.” ☕🌿",
      },
      {
        text: "Daar konden we wel iets mee.",
      },
      {
        text: "We zagen meteen een gezellige koffieshop, een zachte zomerdag en de creatieve energie die zo’n rustige dag opwekt. Die sfeer vertaalden we naar een brandvideo die de schoonheid van een ogenschijnlijk gewone dag vangt.",
      },
      {
        text: "Prachtig in zijn eenvoud. Precies zoals quiet luxury hoort te voelen. ✨",
      },
      {
        text: "Daarnaast maakten we ook enkele korte looks om de zomercollectie van 2026 extra in de kijker te zetten. Want één sterke video is goed. Meerdere content uit dezelfde shooting day halen? Nog beter. 🎬",
      },
    ],
    storyHighlights: [[], [], [], [], [], [], []],
    deliverables: ["Brandvideo", "Short looks", "Storytelling", "Social content"],
    hero: {},
    gallery: [],
    media: {
      hero: {
        type: "vimeo",
        id: "1215742155",
        title: "Bazwil brandvideo",
        orientation: "landscape",
        wide: true,
        aspectRatio: "16 / 9",
        poster: "/images/cases/video-posters/1215742155.jpg",
      },
      heroPlacement: "before-stats",
      verticalVideos: [
        {
          type: "vimeo",
          id: "1215742159",
          title: "Bazwil short look 1",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1215742159.jpg",
        },
        {
          type: "vimeo",
          id: "1215742156",
          title: "Bazwil short look 2",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1215742156.jpg",
        },
        {
          type: "vimeo",
          id: "1215742157",
          title: "Bazwil short look 3",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1215742157.jpg",
        },
      ],
    },
    vimeoEmbeds: [
      {
        id: "1215742155",
        title: "Bazwil brandvideo",
        poster: "/images/cases/video-posters/1215742155.jpg",
      },
      {
        id: "1215742159",
        title: "Bazwil short look 1",
        poster: "/images/cases/video-posters/1215742159.jpg",
      },
      {
        id: "1215742156",
        title: "Bazwil short look 2",
        poster: "/images/cases/video-posters/1215742156.jpg",
      },
      {
        id: "1215742157",
        title: "Bazwil short look 3",
        poster: "/images/cases/video-posters/1215742157.jpg",
      },
    ],
    facts: [
      { label: "Output", value: "brandvideo en korte looks" },
      { label: "Collectie", value: "zomer 2026" },
      { label: "Stijl", value: "quiet luxury" },
      { label: "Resultaat", value: "PLACEHOLDER" },
    ],
    question: {
      label: "Probleem",
      title: "",
      text: "Hoe kunnen we het gevoel van een brand omzetten naar een visuele wereld 🌍?",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "We bouwden een kort verhaal rond een zomerse dag, met genoeg storytelling om de kijker mee te nemen en genoeg ruimte om de sfeer voor zich te laten spreken. De kleding bleef centraal staan, zonder dat het ooit als een klassieke fashionshoot aanvoelde.",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Een stijlvolle brandvideo die de identiteit van Bazwil voelbaar maakt en hun collectie op een natuurlijke manier in beeld brengt. 👗",
      stats: [
        { value: "1", label: "brandvideo" },
        { value: "3", label: "extra video’s" },
        { value: "2026", label: "zomercollectie" },
        { value: "PLACEHOLDER", label: "extra cijfer" },
      ],
    },
    outro: "",
    externalVideoUrls: [
      "https://vimeo.com/1215742155?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1215742159?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1215742156?share=copy&fl=sv&fe=ci",
      "https://vimeo.com/1215742157?share=copy&fl=sv&fe=ci",
    ],

    storyTitle: false,
  },
  {
    slug: "x-oats",
    template: "x-oats-social",
    client: "X-Oats",
    title: "X-OATS",
    oneLiner:
      "Twee funny maar duidelijke advertenties die samen meer dan een miljoen mensen hebben bereikt.",
    category: "Social content",
    categories: ["Video & campagnes", "Social content", "Marketingstrategie"],
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
        text: "Onze gezonde vrienden van X-Oats mogen altijd komen aankloppen met een creatieve uitdaging. Of zelfs twee. Voor hun ambitieuze mijlpaal schreven, draaiden en monteerden we in no-time twee spotjes. Strak gepland, stevig doorgewerkt en veel plezier gehad.",
      },
      {
        kicker: "",
        text: "Voor het eerste spotje werkten we samen met fitfluencer Yinne Gymness. We combineerden iPhone-beelden met beelden van een professionele camera, waardoor de video begon als een herkenbare influencervideo en eindigde als een high-end reclamespot. Echt dope.",
      },
      {
        kicker: "",
        text: "Terwijl die video werd gedraaid, bouwden we in Humgy Central een kleine set op. ‘s Namiddags veranderden we die in een politie-ondervraging. X-Oats CEO Kevin werd aan de tand gevoeld door onze eigen kapoen Brent. Het resultaat? Episch.",
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
      label: "Probleem",
      title: "",
      text: "X-Oats tikte hun miljoenste verkoop aan en wilde dat vieren met een spot. Klein detail: die moest er binnen een week zijn, dus vroegen ze ons om op drie dagen tijd twee spots te schrijven, draaien en op te leveren.",
    },
    approach: {
      label: "Oplossing",
      title: "",
      text: "X-Oats CEO Kevin had enkele ideeën die wij meteen hebben uitgewerkt. Onze producers schakelden snel en gingen gelijktijdig aan de slag. Twee dagen later stonden we al op shoot! Terwijl de tweede spot werd opgenomen, zat de eerste al in montage. Daarna nog een nachtje doortrekken en tijdig opleveren. Da’s durven. 😏",
    },
    result: {
      label: "Resultaat",
      title: "",
      text: "Twee funny maar duidelijke advertenties die samen meer dan een miljoen mensen hebben bereikt.",
      stats: [
        { value: "2", label: "spotjes" },
        { value: "3", label: "dagen" },
        { value: "1M+", label: "mensen bereikt" },
        { value: "1M", label: "sales milestone" },
      ],
    },
    media: {
      hero: {
        type: "vimeo",
        id: "1222690669",
        title: "Ruben Van Gucht",
        orientation: "portrait",
        aspectRatio: "9 / 16",
        wide: false,
        poster: "/images/cases/video-posters/1222690669.jpg",
      },
      verticalVideos: [
        {
          title: "Yinne Gymness",
          src: "/videos/cases/x-oats/x-oats-yinne-gymness.mp4",
          orientation: "portrait",
          aspectRatio: "9 / 16",
          poster: "/images/cases/x-oats/yinne-gymness-poster.jpg",
        },
        {
          title: "Politie-ondervraging",
          src: "/videos/cases/x-oats/x-oats-politie-ondervraging.mp4",
          orientation: "portrait",
          aspectRatio: "9 / 16",
          poster: "/images/cases/x-oats/politie-ondervraging-poster.jpg",
        },
        {
          type: "vimeo",
          id: "1222690669",
          title: "Ruben Van Gucht",
          orientation: "portrait",
          wide: false,
          aspectRatio: "9 / 16",
          poster: "/images/cases/video-posters/1222690669.jpg",
        },
      ],
    },
    externalVideoUrls: ["https://vimeo.com/1222690669?share=copy"],
    services: ["Concept", "Draaien", "Montage", "Social content"],
    nextCase: {
      title: "Visit Antwerpen",
      href: "/ons-werk/visit-antwerpen/",
    },
  },
];

function isPortraitAspect(aspectRatio = "") {
  const normalizedRatio = String(aspectRatio).replace(/\s/g, "");
  return normalizedRatio === "9/16" || normalizedRatio === "4/5";
}

function normalizeCaseMediaItem(video) {
  if (!video) {
    return video;
  }

  const orientation =
    video.orientation ||
    (isPortraitAspect(video.aspectRatio) ? "portrait" : video.wide ? "landscape" : "portrait");
  const isPortrait = orientation === "portrait";

  return {
    ...video,
    aspectRatio: video.aspectRatio || (isPortrait ? "9 / 16" : "16 / 9"),
    orientation,
    wide: typeof video.wide === "boolean" ? video.wide : !isPortrait,
  };
}

function normalizeCaseMedia(caseItem) {
  if (!caseItem.media?.verticalVideos?.length) {
    return caseItem;
  }

  const verticalVideos = caseItem.media.verticalVideos.map(normalizeCaseMediaItem);
  const hero = normalizeCaseMediaItem(caseItem.media.hero);

  return {
    ...caseItem,
    media: {
      ...caseItem.media,
      hero,
      verticalVideos,
    },
  };
}

const normalizedCases = rawCases.map(normalizeCaseMedia);
export const cases = normalizedCases;

export function getAllCaseSlugs() {
  return cases.flatMap((item) => [item.slug, ...(item.aliases || [])]);
}

export function getCaseBySlug(slug) {
  return cases.find((item) => item.slug === slug || item.aliases?.includes(slug));
}
