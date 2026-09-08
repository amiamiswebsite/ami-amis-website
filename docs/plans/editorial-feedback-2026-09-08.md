# Lokale verwerking feedback 8 september 2026

## Doel

De aangeleverde feedback per pagina en klant verwerken, met werkende video,
correcte media en copy, en een gecontroleerde responsive opmaak.

## Niet-doelen

Geen push, merge of publicatie. Geen nieuwe klantclaims of niet-aangeleverde
VDAB-case. Vraag/antwoordvormgeving op de teampagina wacht op Elena's visie.

## Huidige toestand

Baseline: f30a008, branch restore/yesterday-evening-2026-08-26. Alleen bestaande
ongetrackte docs/audits/screenshots. Baselinebuild slaagt (67 statische pagina's).
Next dev draait op 127.0.0.1:3001. Poort 4173 hoort bij een ander lokaal project.
Cases staan in src/data/cases.js en gebruiken TarzanServicesCasePage/CaseVideo.

## Beslissingen

- De volledige geordende feedback staat in de werklijst bij deze Codex-taak.
- Media-identiteit controleren via bestaande bestanden en bronmetadata.
- Hero-video's één keer herhalen in de galerij; galerijdubbels op bron dedupliceren.
- Tekst wijzigen binnen de expliciete feedback; ontbrekende bronnen bijhouden.
- Bestaande JSX behouden bij gerichte reparaties; geen TypeScriptmigratie toevoegen.

## Fasen

- [x] Fase 0 — feedback structureren, gitstatus, broninventaris en baselinebuild.
- [x] Fase 1 — gedeelde videobediening en galerijregel.
- [x] Fase 2 — beschikbare feedback voor home, team, diensten en contact.
- [x] Fase 3 — beschikbare casecontent, bronmedia en opmaak; open bronvragen hieronder.
- [x] Fase 4 — contentbaseline, quality, browsercontrole en eindrapport.

## Validatie per fase

Video: afspelen, pauze, seek en juiste bron/poster. Pagina's: primaire routes,
alle cases, toetsenbord, reduced motion en 360/390/768/1024/1440/1920 px waar
relevant. Eindcontrole met quality:fast, quality en gecontroleerde copydiff.

## Risico's en rollback

Externe video's kunnen onbeschikbaar zijn. Niet-oplosbare bronvragen expliciet
registreren. Geen reset of clean; wijzigingen blijven lokaal en reviewbaar.

## Voortgangslog

- 2026-09-08: initiële werklijst en mediacontrole. KdG-, Lierse-, Groep Maes-,
  Blutsqi- en Imore-brontitels bevestigd via Vimeo oEmbed. Salus Frame.io-bron
  opent als salus_spotjanuari_edit1.3_online.mp4.

## Eindrapport

Lokale uitvoering en volledige kwaliteitscontrole geslaagd. Vier inhoudelijke bronvragen en de optionele teambeelden blijven zichtbaar in de werklijst. Geen commit, push of publicatie.

### Uitvoering en bronherstel

- Videospeler: metadata blokkeert starten niet meer; foutstatus en retry,
  stabiele seekstatus, toetsenbordbediening en byte-rangeondersteuning in preview.
- Gedeelde case-opmaak opgeschoond: aanpak op lichte achtergrond, minder
  herhaalde koppen, echte bron-deduplicatie en hero één keer in videogalerij.
- Home, team, diensten en contact verwerkt. Diensten gebruikt de actieve
  ApproachTimelineOpen-variant; titelrij groeit mee met lange tekst.
- Salus Medicair en Imore Fintro toegevoegd uit bevestigde Frame.io-bronnen.
- Konligo USP via historische Frame.io-link w-LP7QYP teruggevonden; juiste
  usp_en_edit5, afzonderlijk van Emotie. Lokale video en poster toegevoegd.
- Zorgbedrijf Veerle via historische Vimeo 1178849410 teruggevonden en in
  galerij toegevoegd. De Vimeo-poster toont een verkeerde persoon; vervangen
  door een echte videostill op 5 seconden. Humgy-still op 9,5 seconden.
- Tarzan-designs vanaf T9 toegevoegd. KdG, Lierse, Maes, Blutsqi en overige
  videotitels tegen bronmetadata gecontroleerd. SJB-tourlink officieel bevestigd.
- Physicsplafond gebruikt offsetTop om de translate-entreeanimatie niet in de
  statische collisiongrens mee te rekenen. Beide refreshtests slagen.
- Volledige quality: 299/299 tests geslaagd; 60 routes copyparity, build 67 pagina's.
- Responsive screenshotcontrole op zes breedtes; 86 algemene controles en
  gerichte vervolgcontroles zonder kapotte lokale beelden of pagina-overflow.

### Open inhoud

TEAM-03 (Elena's indeling), VISIT-01 (2060/Noord),
IMORE-01 (hoogtewerkerbron), VDAB-01 (vervangende casetekst) wachten op input.
HOME-03 is een optionele foto-uitwerking; bestaande iconen blijven voorlopig.
Alle andere concrete feedbackpunten zijn lokaal verwerkt. Geen commit of push.

### Afronding

- Na de laatste posterwijzigingen quality:fast opnieuw groen.
- GitHub Pages-previewbuild met /ami-amis-website geslaagd; 66 aanvullende
  route-, content- en videotests geslaagd.
- Normale export herbouwd voor lokale review. Dev blijft draaien op poort 3001.

### Aanvulling: aangeleverde rapstill

- DIENST-03 verwerkt met de door de gebruiker aangeleverde PNG.
- WebP-versie op volledige resolutie (1672 × 941; 377388 bytes), zonder uitsnede.
- Beeld rechts naast de probleemintro vanaf 1024 px en onder de tekst op kleinere schermen.
- Lazy loading, intrinsieke afmetingen, beschrijvende alttekst en assetPath gebruikt.
- Visueel gecontroleerd op 360, 390, 768, 1024, 1440 en 1920 px: geen overflow.
- Zichtbare copy en de tekstvolgorde blijven gelijk. Niets gepusht.

- Aanvulling gevalideerd met pnpm quality: productiebuild en 299/299 browsertests geslaagd.

### Aanvulling: definitieve designselectie Tarzan & Jane

- De gebruiker leverde drie specifieke Instagram-posts aan. Bronnen visueel
  gecontroleerd en de werkelijke postbeelden lokaal overgenomen.
- Volgorde: DLkqg2UIUVW (videoclipteaser), DW3W-kNjw8j (waterspraypark),
  DU5cBwfD_rQ (krokusvakantie). Bronlinks vastgelegd per beeld in de casedata.
- De eerdere T9-selectie is vervangen; oude beelden bewaard in de werkmap van
  deze taak en uit public verwijderd. Assetbaseline bijgewerkt.
- PosterSeriesCarousel respecteert opgegeven intrinsieke afmetingen, zodat deze
  4:5-designs volledig zichtbaar blijven. Bestaande posterfallback behouden.
- Zes schermbreedtes gecontroleerd, inclusief doorbladeren op mobiel/tablet,
  juiste afbeeldingsvolgorde, volledig beeld en afwezigheid van pagina-overflow.
- Geen zichtbare copywijziging, commit, push of publicatie.

- Definitieve designselectie: pnpm quality geslaagd, inclusief build en 299/299 browsertests.

### Aanvulling: Call me-ballon

- Ballonvorm bij Brent horizontaal gespiegeld: staart links, naar de persoon.
- Tekst blijft leesbaar; bestaande telefoonlink behouden.
- Visueel gecontroleerd op 390 en 1440 px, inclusief staartpositie en afwezigheid van pagina-overflow.
- Alleen lokale wijzigingen; geen commit of push.
- pnpm quality geslaagd, inclusief productiebuild en 299/299 browsertests.

### Aanvulling: gedeelde aanpakuitlijning en horizontale scrollindicator

- Nummers en headings staan samen in één koprij met gelijke typografie en baseline. CSS subgrid deelt de kophoogte tussen naastliggende cards; tekstlengte verschuift de titels niet meer.
- Nummers gebruiken hetzelfde blauw als de headings. Copy en volgorde behouden.
- ScrollIndicator is een decoratieve horizontale positiebalk bij de bestaande scrollbare region. Alleen targetId als prop; geen aparte focusstop of zichtbare copy. ResizeObserver en een passieve scrolllistener houden positie en zichtbaarheid actueel; cleanup bij navigatie/unmount.
- De balk blijft zichtbaar tijdens stilstand, volgt toetsenbord-/touchscroll en verdwijnt wanneer alle cards passen. Respecteert reduced motion zonder extra animaties.
- Conform de verduidelijking van de gebruiker: uitsluitend een horizontale indicator, geen toevoeging aan de rootlayout of verticale pagina-indicator.
- Bestaande JSX-stack behouden voor deze gerichte uitbreiding, zonder taal- of dependency-migratie.
- Negen viewportbreedtes gecontroleerd; daarnaast 48 case/viewportcombinaties groen. Screenshots van X-Oats en Tarzan & Jane op mobiel, tablet en desktop nagekeken.
- Gerichte regressietests voor kop- en tekstuitlijning, blijvende indicator, toetsenbordscroll en wisselen tussen mobiel/desktop.
- Definitieve validatie na de verduidelijking: pnpm quality geslaagd, inclusief quality:fast, productiebuild en 309/309 browsertests. Geen commit of push.
