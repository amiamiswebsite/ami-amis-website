# Copy- en contentherstelcontrole

Datum: 14 augustus 2026
Bronbaseline: `ce8764ee1f38cdae14742b70a8f45a587fa29ec2`

## Methode

De inhoudscontrole vergelijkt de actuele bron met een verse build van de
bronbaseline. De oude gegenereerde rootexport is bewust afgewezen als
referentie: die liep aantoonbaar achter op de bron. Alle 58 publieke routes
zijn in routevolgorde gecontroleerd op geordende echte paginatekst,
onafhankelijk van een toevallig animatieframe. Screenreader-only tekst en
verborgen technische statusmeldingen tellen niet als zichtbare copy.

De vergelijking gebeurt op 390×844, 768×1024 en 1440×1000 met reduced motion.
De definitieve bronbaseline staat daarnaast in
`tests/fixtures/visible-copy-baseline.json` en wordt bewaakt door
`tests/e2e/copy-parity.spec.mjs`.

## Teruggedraaide zichtbare afwijkingen

1. De contactknop toont opnieuw exact `Verstuur`; endpointvoorbereiding en
   mailtofallback blijven technisch actief.
2. De nieuw zichtbare titel op `/work/` is verwijderd. De oorspronkelijke
   visueel verborgen `Ons werk`-H1 blijft behouden voor semantiek.
3. De nieuwe zichtbare skiplink `Ga naar de inhoud` is verwijderd omdat die
   nieuwe zichtbare copy toevoegde. Het focusbare `main`-doel blijft bestaan.
4. De oorspronkelijke presentatie en regelverdeling van de Intro-titel is
   hersteld door de bestaande tekst aan een stabiele klasse te koppelen. De
   verbeterde H1/H2-hiërarchie blijft behouden.

## Exact ongewijzigd bevestigd

- titels en tussentitels;
- paragrafen, CTA's en knopteksten;
- navigatielabels;
- zichtbare formulierteksten;
- cases en projectbeschrijvingen;
- testimonials;
- cijfers, statistieken en claims;
- namen, functies en contactgegevens;
- diensten en categorieën;
- footerinhoud;
- volgorde, aanwezigheid en verwijdering van inhoudsblokken.

Er zijn geen verschillen in de centrale data- en contentbronnen ten opzichte
van de bronbaseline.

## Behouden technische verbeteringen

- design tokens, primitives en componentstructuur;
- source/buildgrens en verse Pages-export;
- quality-, route-, asset-, accessibility- en browsertests;
- correcte statistiekeindwaarden in server-HTML;
- menu-, modal-, keyboard-, focus- en reduced-motiongedrag;
- technische SEO, metadata, canonicals, sitemap, robots en verifieerbare
  structured data;
- assetoptimalisatie, intrinsieke maten en loadingverbeteringen;
- optionele contactendpointadapter met mailtofallback en verborgen live
  statusmeldingen.

## Niet geimplementeerd voorstel

Een zichtbare bypass-/skiplink kan keyboardnavigatie verder verbeteren, maar
introduceert een nieuw zichtbaar label wanneer die focus krijgt. Conform de
contentlock is dit niet geimplementeerd. Het vereist expliciete toestemming op
de zichtbare tekst en presentatie.

## Reproduceerbare controle

- `pnpm test:content`
- `pnpm quality:fast`
- `pnpm quality`

Resultaat van deze herstelcontrole:

- 58/58 exacte bronmatches op 390×844;
- 58/58 exacte bronmatches op 768×1024;
- 58/58 exacte bronmatches op 1440×1000;
- verse GitHub Pages-build met 63 gegenereerde routes;
- 273/273 Playwrighttests geslaagd;
- 0 serious/critical axe-findings op 58 publieke routes;
- tokens, assetbudget, source/exportgrens, ESLint, Prettier en Stylelint groen.

De samengevatte actuele resultaten staan ook in
`docs/audits/FINAL_VALIDATION.md`.
