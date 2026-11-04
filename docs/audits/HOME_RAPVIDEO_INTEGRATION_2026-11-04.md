# Ontwerphandoff tijdelijke rapvideocampagne

Datum: 4 november 2026. Ontwerpreview: **SHIP voor de begrensde integratie**.
Dit document legt de uitbreiding op de bestaande homepage vast. Het is geen
productierelease of afronding van de nog lopende volledige kwaliteitsgate.

## Scope en visuele autoriteit

Alleen de root-homepage `/` rendert een tijdelijke rapvideosectie tussen de
oorspronkelijke skydive-header en Intro. `/home-2/` behoudt zijn bestaande
redirect naar `/` en toont daardoor na doorsturen dezelfde homepage.
De bestaande website, `docs/design-system/` en het goedgekeurde losse voorstel
zijn de visuele autoriteit. De campagne introduceert geen nieuwe visuele wereld.

De volgende bronnen zijn voor deze documentatie gecontroleerd:

- `AGENTS.md`, de instructies voor `app/` en `src/data/`, `README-FIRST.md`,
  `PLANS.md` en `docs/audits/CURRENT_SITE_AUDIT.md`.
- `docs/design-system/00-principles.md`, `01-brand-language.md`,
  `02-design-tokens.md`, `03-component-contracts.md`, `05-motion.md`,
  `06-accessibility.md`, `08-page-blueprints.md` en `09-quality-gates.md`.
- De reference- en semantic-tokenbronnen, de bestaande gegenereerde tokens,
  riso-maskerverwijzingen en de repo-skill `ami-amis-brand-guardian`.
- `app/page.jsx`, `app/components/HomeExperience.jsx`,
  `app/components/HomeRapVideoCampaign.jsx`, de bijbehorende CSS Module en
  `src/data/homeRapVideoCampaign.js`, plus de bestaande redirectbron
  `app/home-2/page.jsx`.
- De onderhoudsgids `docs/maintenance/HOME_RAPVIDEO_CAMPAIGN.md` en het plan
  `docs/plans/home-rapvideo-campaign-2026-11-04.md`.
- In de chatwerkmap: `work/rapvideo-sectie-contract.txt`, de laatste
  `outputs/rapvideo-voorstel/ONTWERP-NOTITIES.txt`, `rapvideo-section.css` en
  de desktop- en mobiele sectiebeelden van dat goedgekeurde voorstel.

## Vastgelegde uitbreiding

De sectie behoudt het bestaande geel (`#fabb00`), de inkt- en papierkleuren,
Neue Haas Black en de oorspronkelijke rode riso-strook met bestaande maskers.
Links staat uitsluitend **Check onze rapvideo!**: een zwarte aanloop en een
crèmekleurig woord op rood. Rechts staat de volledige originele 16:9-still,
zonder uitsnede, met één centrale ronde playknop. Mobiel staan titel en beeld
onder elkaar. Er is geen aanvullende promotiecopy of afzonderlijke kijklink.

De bovenrand en bovenhoeken zijn recht. Alleen de onderhoeken zijn afgerond
met `clamp(30px, 4.6vw, 72px)`; het filmbeeld heeft hoeken van 16 px. Deze
vormen, de tweekolomsverhouding en de mobiele stapeling volgen de goedgekeurde
sectie en blijven lokale campagnekeuzes.

Het subtiele gecentreerde raster bestaat uit loodrechte crèmekleurige lijnen
van 1 px op 18% dekking, om de 48 px. De gebruiker vroeg dit raster expliciet.
Daarom geldt hier bewust de taakgebonden uitzondering op het algemene
detectoradvies tegen decoratieve rasterachtergronden. Het raster is geen
nieuw wereldwijd patroon, token of aanbeveling voor andere secties.

Dit sluit aan bij het bestaande systeem: echte mensen en film dragen de
inhoud, expressieve typografie geeft hiërarchie en één speelactie houdt het
moment helder. Het oorspronkelijke skydiveconcept en alle volgende inhoud
blijven behouden; de campagne vervangt de homepageheader niet.

## Gedrag en omkeerbaarheid

`app/page.jsx` beslist server-side of het optionele `campaignSlot` wordt
doorgegeven. De campagne heeft een eigen begrensde CSS Module. De aangepaste
overgangsmarge geldt uitsluitend wanneer de campagnesection vóór Intro staat.
De oorspronkelijke scrollpijl wijst bij een aanwezige campagne naar de
campagne en anders weer rechtstreeks naar `intro`.

Pas klikken maakt de speler aan en laadt het Vimeo-iframe en de bestaande
SDK. De native dialog gebruikt eigen play/pause-, zoek-, geluids- en
fullscreenbediening, met een sluitknop rechtsboven en zonder zichtbare
Vimeo-chrome of extra modaltitel. Sluiten ruimt de speler op en herstelt
body-scroll en focus op de opener. Laadproblemen hebben een zichtbare fallback.

`enabled: false` in `src/data/homeRapVideoCampaign.js`, gevolgd door een nieuwe
statische build, herstelt de oorspronkelijke homepage. De browsercontrole van
de uitgeschakelde toestand is vastgelegd in
`outputs/rapvideo-integratie/herstel/controle.json`: headerinhoud,
Intro-teksten/links/bediening en sectievolgorde zijn gelijk aan de nulmeting.
Alleen de reeds bestaande wisselende collage-`IMG`-bronnen zijn buiten de
vergelijking van Intro-inhoud gehouden. De eindinstelling is weer `true`.

De herstelcontrole bevestigt ook behoud van Hero, Intro, globale styles,
layout, home-polish, de permanente copyfixture, dependencies en lockfile.
De vier vooraf gewijzigde bestanden en het bestaande niet-getrackte
Studios-werk zijn behouden. Gebruik voor uitzetten of later opruimen de
onderhoudsgids; herstel geen brede werkstaat met Git.

## Gecontroleerde beelden en media

De vijf captures in `outputs/rapvideo-integratie/` zijn visueel bekeken:
`header-huidig.png`, `sectie-desktop.png`, `sectie-mobiel.png`,
`sectie-standaardvenster.png` en `speler-mobiel.png`. De titel, het volledige
filmbeeld, de centrale playknop, de rechte bovenzijde, ronde onderzijde en
mobiele stapeling komen overeen met het goedgekeurde voorstel. De mobiele
speler toont de eigen bediening en sluitknop zonder zichtbare provider-chrome.

De geïntegreerde poster is de originele 3840 × 2160-still van 2.058.669 bytes.
De SHA-256 is onafhankelijk vergeleken met
`outputs/rapvideo-voorstel/assets/rapvideo.jpg` en is identiek:
`9dc53e1e7f37581fe876899c19c83405d60bf64f6db4ed15e7db6f8622fdf59c`.
De generatief uitgebreide headerafbeelding uit het losse vergelijkingsvoorstel
wordt niet gebruikt voor deze sectie of voor de oorspronkelijke skydive-header.

## Documentatie- en validatiestatus

De echte bronrepository bevat vooraf geen root-`PRODUCT.md`, root-`DESIGN.md`
of `.impeccable/design.json`. Dat is bestaande ontbrekende Impeccable-context;
de aanwezige huisstijldocumentatie en implementatie leveren hier de context.
Deze beperkte handoff maakt geen vervangend designmanifest, sidecar of nieuwe
tokens en herstelt die contextdrift niet als neveneffect van de campagne.

De onderhoudsgids en dit auditrecord documenteren de uitbreiding en rollback.
De deterministische scan in `outputs/rapvideo-integratie/detector.json` geeft
`[]`. De bronposter-provenancescan rapporteerde één asset en nul ontbrekende
herkomsten. `pnpm quality:fast` is geslaagd. De volledige gate met 394
browserchecks eindigde met 393 geslaagde checks en één onjuiste copyverwachting
voor de bestaande `/home-2/`-redirect. Die testverwachting is gecorrigeerd
zonder UI-wijziging. Daarna zijn de tien geraakte homepage-, alias- en
campagnechecks geslaagd. De GitHub Pages-preview-export en dezelfde tien
checks onder `/ami-amis-website` zijn eveneens geslaagd. Na de audio-aanpassing
is de volledige `pnpm quality`-gate opnieuw geslaagd: 393 checks direct en
één bestaande service-tag-animatietest na de automatische herkansing.

NL-captions of een transcript blijven een reeds geregistreerd contentpunt
vóór publieke release; er is geen tekst of captiontrack verzonnen. Deze
ontwerphandoff voert geen commit, push of deployment uit.

Aanvulling audio, 4 november 2026: iedere opening zet nu via de SDK eerst
volume op `1` en mute op `false`, daarna start afspelen. Het iframe begint
met `autoplay=0&muted=0`. Browsercontrole bevestigde deze waarden ook na
sluiten op 20% volume met mute aan. Dit verandert geen visuele compositie.
