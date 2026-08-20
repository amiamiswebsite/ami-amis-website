# Current site audit

Geactualiseerd: 14 augustus 2026
Bron: code-inspectie, verse static export, browserbaseline en vier onafhankelijke
read-only audits.

## Samenvatting

De audit uit het aangeleverde systeem wordt grotendeels bevestigd. De huidige
site heeft een sterke Ami Amis-signatuur: skydive-hero, echte fotografie,
Apple Garamond en Neue Haas, papiermaterialiteit, zwarte contouren,
offset-schaduwen en gecontroleerde asymmetrie. De juiste ingreep is een
betrouwbaar systeem rond die identiteit, geen wholesale redesign.

## P0 - bevestigd en opgelost

1. **Source/build boundary.** Honderden gegenereerde rootbestanden en exacte
   kopieen van `public/` zijn getrackt terwijl GitHub Actions uit `out/` deployt.
   De rootexport is aantoonbaar ouder dan de bron.
2. **Deploy parity.** GitHub Pages heeft zowel een legacy publicatiepad als een
   Actions-workflow gehad. De laatst voltooide deployment kan stale output
   publiceren. De admininstelling moet uiteindelijk `workflow` zijn.
3. **Reproduceerbaarheid.** `package-lock.json` en `pnpm-lock.yaml` bevatten
   verschillende Next- en Reactversies. Er moet een package manager en lockfile
   overblijven.
4. **Quality gates.** Er bestaan nog geen lint-, format-, style-, Playwright-,
   axe- of algemene routechecks voor deployment.
5. **Server-HTML statistieken.** Home en Home 2 renderen initieel `0,0k` en
   `+0,0%`, terwijl de geverifieerde eindwaarden in de bron staan.
6. **Contactflow.** De knop `Verstuur` opent alleen een lokale mailclient. De
   beperking, fallback en toekomstige endpointstates zijn niet eerlijk
   gemodelleerd.
7. **Navigatiefocus.** Escape en scroll-lock bestaan, maar initial focus,
   focus trap, achtergrond-inertness, dialogsemantiek en focus restore ontbreken.
8. **Semantische homehiërarchie.** Hero en Intro leveren allebei een H1.

Alle acht punten zijn in de foundation opgelost en door build- en
browserchecks afgedekt. De Pages-admininstelling moet zakelijk nog op GitHub
Actions bevestigd blijven; de repositoryworkflow zelf publiceert uitsluitend
een vers `out/`-artifact na de qualityjob.

## P1 - opgelost in deze fase

- Projectcarrousel maakt 21 focusbare links voor drie semantische projecten.
- Reduced motion stopt de social-video en smooth scroll niet volledig.
- Diensten kan in reduced motion/no-JS niet-actieve kaarten verbergen.
- Gesloten FAQ-panelen kunnen focusbare inhoud bevatten.
- Testimonials autoplayen zonder blijvende pauzebediening; dots en andere
  compacte controls halen de targetgrootte niet.
- Generieke image lightbox mist volledige modalafhandeling.
- `/work/` is canoniek; `/ons-werk/` blijft een bereikbare static-hostingalias
  met canonical naar `/work/`.
- Er is een centrale Icon/IconButton-, Container-, Section-, Button- en Media-API.
- Werk behoudt de bestaande visueel verborgen paginatitel voor een geldige
  headingstructuur, zonder een nieuw zichtbaar inhoudsblok toe te voegen.
- Kritieke homebeelden zijn naar WebP gebracht en kregen intrinsieke maten;
  deze gerichte set bespaart 11,63 MB.

## P1 - resterend migratiewerk

- Betekenisvolle video's missen aangeleverde captions en transcripties.
- Een zichtbare skiplink is niet toegevoegd omdat dit nieuwe zichtbare copy
  introduceert. Dit blijft een toegankelijkheidsvoorstel dat expliciete
  contentgoedkeuring vereist.
- Productiecontent bevat historische aliases en enkele placeholders die een
  contentbeslissing vereisen.
- `globals.css` bevat nog historische lagen; de splitsing blijft bewust
  gefaseerd om visuele regressies te vermijden.
- `public/` is nog 488.178.982 bytes; meerdere legacyvideo's zijn 30-68 MB.
- Enkele work-thumbnails hangen af van externe Vimeo-posters en blijven daarom
  gevoelig voor third-party beschikbaarheid.

## P2 - onderhoud en businessinput

- Verdere social-card art direction vraagt goedgekeurde assets; canonical,
  Open Graph, sitemap, robots en ondersteunde case-structured data zijn nu
  aanwezig.
- Casecontent is verdeeld over meerdere databronnen en rendererkeuzes.
- Team- en casevideo's vereisen aangeleverde captions/transcripten.
- Fontlicentie en redistributierechten moeten zakelijk bevestigd worden.
- Een echte contactprovider, endpoint en secret ontbreken bewust.
- Mediahercompressie en eventueel externe videohosting vragen kwaliteits- en
  eigenaarsbeslissingen.

## Gecontroleerde positieve punten

- Verse static build slaagt en genereert 63 routes inclusief metadata-output.
- Alle baselineviewports laden zonder horizontale overflow.
- Reduced-motionregels bestaan en alle routes laden in emulatie.
- Formuliervelden hebben zichtbare labels en `required`.
- FAQ-buttons gebruiken `aria-expanded` en `aria-controls`.
- Enkele videomodals hebben al focus trap, Escape en focus restore; dat patroon
  kan worden gecentraliseerd.

## Acceptatiecriteria foundation

- Geen gegenereerde rootexport in Git; een strict script en CI blokkeren nieuwe.
- Een verse `out/` bevat alle actuele routes, navigatie en copy.
- Deployment wacht op een groene qualityjob.
- Een lockfile en package-managercontract.
- Echte statistieken in server-HTML en een uitsluitend decoratieve animatielaag.
- Contact werkt eerlijk met een benoemde mailtofallback en een optionele,
  ongeconfigureerde static-endpointadapter met idle/submitting/success/error.
- Menu voldoet aan modal-, keyboard- en focusgedrag.
- Iedere primaire route heeft een logische H1/headingstructuur.
- Zero serious/critical axe-findings op de kernroutes.
- Tokens en primitives veranderen de merklook niet en worden gefaseerd ingevoerd.

De finale validatie en meetresultaten staan in
`docs/audits/FINAL_VALIDATION.md`.

## Rollback

De live uitgangssituatie is onveranderlijk gemarkeerd met tag
`live-before-structural-redesign-2026-08-14` op commit
`ce8764ee1f38cdae14742b70a8f45a587fa29ec2`.
