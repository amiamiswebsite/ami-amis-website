# Ami Amis foundation inventory

Baseline: 14 augustus 2026
Broncommit: `ce8764ee1f38cdae14742b70a8f45a587fa29ec2`

## Routes

De verse static export bevat 58 publieke URLs plus `/404` en `/_not-found`:

- hoofdroutes: `/`, `/home-2`, `/diensten`, `/work`, `/team`, `/contact`;
- canonieke casekandidaten: 26 slugs onder `/work/[slug]`;
- legacy aliases: dezelfde 26 slugs onder `/ons-werk/[slug]`.

De case-slugs zijn: `4allseasons`, `bazwil`, `billy-bonkers`,
`billy-bonkers-stad-gent`, `blutsqi`, `frankie-villager`, `groep-maes`,
`humgy`, `hypotheekwereld`, `imore`, `jurimesh`, `k-lierse-sk`,
`karel-de-grote-hogeschool`, `kdg`, `konligo`, `salus`,
`sporthouse-group`, `tarzan-en-jane`, `tarzan-en-jane-diensten-stijl`,
`vdab`, `visit-antwerpen`, `visitantwerp`, `weplanet`, `x-oats`,
`zorgbedrijf` en `zorgbedrijf-antwerpen`.

## Bron en componenten

- App Router: 8 routebestanden en twee dynamische case namespaces.
- 33 JSX-bestanden, waarvan 17 brede client boundaries.
- Gedeelde homecomposities: Hero, Intro, SocialGrowth, Approach, Projects,
  Testimonials, Brainstorm, Punch en Footer.
- Specialistische pagina's: ServicesPage, WorkPage, TeamPage, ContactPage.
- Case-renderers: CasePageTemplate, VisitAntwerpenCasePage en
  TarzanServicesCasePage.
- Data is verdeeld over `cases.js`, `workCases.js`, `workItems.js` en
  `teamPageData.js`.
- `CasePageTemplate` stuurt de meeste cases naar een gedeelde renderer; speciale
  composities blijven een expliciete uitzondering.

## Design en CSS

- `app/globals.css`: 29.971 regels, 652.191 bytes.
- CSS modules: ServicesPage 2.002 regels; Tarzan V2 1.895 regels.
- Merkwaarden zijn nu in reference-, semantic- en componenttokens georganiseerd.
- Nieuwe functionele UI-iconen lopen via de centrale Icon/IconButton-API;
  historische brandgraphics blijven bewust aparte assets.
- Interactie is het zwaarst in Projects, SocialGrowth, Brainstorm, Hero,
  FilmrollHighlights, ContactGame, Approach en Testimonials.

## Media en fonts

- Huidige assetbaseline: 221 bestanden en 488.178.982 bytes.
- Verdeling: 109 PNG, 57 JPG, 27 WebP, 14 MP4, 7 SVG en 6 fontbestanden.
- Grootste video: 68 MB; acht video's zijn groter dan 30 MB.
- Fonts: drie OTF- en drie TTF-bestanden; licentie en distributierechten blijven
  een businesscontrole.
- Veel raw `<img>`-elementen hebben geen intrinsieke maten. Vimeo-embeds geven
  tijdens de baseline op meerdere cases 401/403-resourcefouten.

## Interacties

- Signature hero met pointer-, scroll- en RAF-motion.
- Sticky/scrolldriver op Diensten.
- Oneindige projectcarousel met semantisch actieve klonen.
- Testimonials met autoplay.
- Approach-carousel met programmatische smooth scroll.
- Navigatie-overlay en meerdere case/media-dialogs met uiteenlopend
  focusgedrag.
- Contactformulier met mailto-submit en een afzonderlijk contactspel.

## Reproduceerbare visuele baseline

Locatie:
`/Users/giosipinna/.codex/visualizations/2026/06/24/019efb1f-0f73-7893-8814-fd3004757b9e/ami-amis-os/before`

- 180 full-page screenshots: 60 routes x 390x844, 768x1024 en 1440x1000.
- 60 extra reduced-motion browserchecks.
- 0 screenshotfouten, 0 horizontale overflows en 0 reduced-motion laadfouten.
- 47 routes loggen resourcefouten, hoofdzakelijk Vimeo 401/403.
- De baseline manifest staat naast de screenshots als `manifest.json`.

De captures zijn bewijs van de huidige toestand. Ze zijn geen automatisch
goedgekeurde visuele snapshots: lazy media en scrollgestuurde secties vereisen
een scrollende capture voor een representatieve eindstaat.

## Finale toestand

De scrollende after-capture staat in
`/Users/giosipinna/.codex/visualizations/2026/06/24/019efb1f-0f73-7893-8814-fd3004757b9e/ami-amis-os/after`:

- 174 screenshots: 58 publieke routes x 3 viewports;
- 0 status-, eigen-origin-, H1- of overflowfouten;
- reduced-motionemulatie actief;
- 214 Playwrightchecks groen.
