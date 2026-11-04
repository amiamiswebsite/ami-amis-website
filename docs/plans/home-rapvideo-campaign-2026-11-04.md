# Tijdelijke rapvideocampagne op de homepage

## Doel

De goedgekeurde gele sectie onder de bestaande skydive-header plaatsen, met
subtiele lichte ruitjes, rechte bovenhoeken, ronde onderhoeken, de titel
"Check onze rapvideo!" en het volledige originele videobeeld. Push uitsluitend
na een latere expliciete opdracht.

## Niet-doelen

Geen vervanging van de header, copywijzigingen aan bestaande secties, aanpassing
van de Studios-werkstaat of nieuwe dependencies. Geen generatieve uitbreiding:
de sectie gebruikt de goedgekeurde originele still.

## Huidige toestand

HEAD 423c0836d91bcb36b81e2991428c906ff57d0a61, branch codex/aanpassingen.
Vooraf vier gewijzigde bestanden en bestaand untracked Studios-werk.
De originele header, Intro en globale styles blijven ongewijzigd.
Nulmeting: quality:fast en productiebuild met 80 routes geslaagd.

## Beslissingen

- Alleen `/` rendert de campagne; `/home-2/` blijft ongewijzigd doorsturen naar `/`.
- Eén configuratie: `src/data/homeRapVideoCampaign.js`, `enabled: false`
  herstelt de oorspronkelijke root-home, inclusief doel van de scrollpijl.
- Los, eenmalig JSX-campagnecomponent binnen de bestaande JSX-codebase;
  CSS Module met bestaande kleuren, fonts en controls. Geen TS-migratie.
- Alleen bij de aanwezige campagne worden marges van haar overgang aangepast.
  Uitgeschakeld is er geen DOM, modal, Vimeo-request of actieve overgangsregel.
- Bestaande Icon/IconButton en reeds aanwezige `@vimeo/player`; iframe en SDK
  laden uitsluitend na klikken. Native dialog, focusherstel en cleanup.
- Componentcontract: vaste goedgekeurde titel; 16:9-poster; twee kolommen op
  desktop en gestapeld op mobiel; laden, afspelen, pauze, zoeken, geluid,
  fullscreen en zichtbare foutfallback; reduced motion en toetsenbordfocus.
- Captions/transcript: Vimeo is de bron voor eventuele tracks; geen nieuwe
  captions of tekst verzonnen. Aanlevering van NL-captions/transcript blijft
  bestaande content-debt vóór publieke release.

## Fasen

- [x] Fase 0 — bronkopieën, hashes, Git-werkstaat en visuele nulmeting opgeslagen.
- [x] Fase 1 — configuratie en begrensde styles.
- [x] Fase 2 — campagne en click-to-load-speler.
- [x] Fase 3 — root-home-integratie.
- [x] Fase 4 — QA, uitgeschakelde toestand en documentatie.

## Validatie per fase

Baseline quality:fast/build vóór wijzigingen. Daarna quality:fast, quality,
relevante campagne/browsercontroles, desktop/mobiel en herstel met enabled:false.
Alleen de goedgekeurde twee nieuwe titelteksten worden aan de root-copybaseline
toegevoegd; andere routes en bestaande tekstvolgorde moeten gelijk blijven.

## Risico’s en rollback

Zet `enabled: false` in het configuratiebestand en herbouw. Gebruik geen
`git reset`, `git restore .` of brede stash: er bestaat ouder gebruikerswerk.
Een volledige pre-edit-kopie van 16 bronbestanden, hashes, patch en werkstaat
staat in de chatoutputs onder `rapvideo-integratie/herstel/`.
Zie `docs/maintenance/HOME_RAPVIDEO_CAMPAIGN.md` voor uitzetten en opruimen.

## Voortgangslog

2026-11-04: nulmeting groen, herstelgegevens vastgelegd, implementatie toegevoegd.
2026-11-04: uitgeschakelde toestand in browser vergeleken; header, intro-inhoud
en sectievolgorde gelijk. Collage-IMG-bronnen wisselen door bestaand gedrag.
Campagne daarna opnieuw ingeschakeld. Onafhankelijke reviewer: `ship`.
Documenter heeft de uitbreiding aan de bestaande huisstijl getoetst en vastgelegd.
De eerste volledige testrun vond alleen een verkeerde verwachting voor de
bestaande `/home-2/`-redirect. Verwachting gericht gecorrigeerd, geen UI-aanpassing.
2026-11-04: op verzoek geluid bij iedere opening op 100% en mute uit gezet,
vóór de SDK afspeelt. Werkelijk openen en heropenen na 20% volume + mute in de
browser bevestigden volume `1`, mute `false` en afspelen. Vormgeving ongewijzigd.

## Eindrapport

`pnpm quality:fast` en de standaard static export zijn geslaagd. De volledige
`pnpm quality`-run gaf 393 geslaagde checks en één mislukte copyverwachting voor
de bestaande `/home-2/`-redirect. Na correctie slaagden de tien gerichte
homepage-, alias- en campagnechecks. Ook de preview-export onder
`/ami-amis-website` en dezelfde tien checks slaagden, inclusief het laden van
de echte poster op zes breedtes. Na de audio-aanpassing is de volledige
`pnpm quality`-gate opnieuw geslaagd: 393 checks direct en één bestaande
service-tag-animatietest na de automatische herkansing (394 totaal).

Live Vimeo: afspelen, pauze, zoeken, geluid, fullscreen, Escape, focusherstel
en bestaande navigatie gecontroleerd. De detector gaf `[]`; de herkomstscan
één raster zonder ontbrekende metadata. De foto is identiek aan het voorstel.
Hero, Intro, globals, layout, home-polish, bestaande Icon/tokens, copyfixture,
dependencies en lockfile zijn hashgelijk aan de nulmeting.

Uitzetten en gericht opruimen staan in `docs/maintenance/HOME_RAPVIDEO_CAMPAIGN.md`.
Ontwerpvergelijking: `docs/audits/HOME_RAPVIDEO_INTEGRATION_2026-11-04.md`.
NL-captions/transcript blijft een contentpunt vóór publieke release.
De implementatie bleef aanvankelijk lokaal. Op 4 november 2026 is de push
expliciet goedgekeurd. De gerichte campagnecommit gaat naar
`codex/aanpassingen`; apart Studios-werk blijft lokaal. De assetbudgetwijziging
in die commit telt uitsluitend de nieuwe campagnestill mee. De schone
controlekopie wordt vóór de push apart gebouwd, getest en onafhankelijk
gereviewd. De push naar deze werkbranch activeert geen productie-deployment.

## Productiepublicatie en CI-correctie

Op expliciet verzoek is de geteste campagnecommit via fast-forward in `main`
opgenomen. De vorige live commit is bewaard als
`live-before-rapvideo-2026-11-04` (`423c083`). De productiejob behoudt de
verplichte dependency `deploy.needs: quality`.

GitHub meldde op 4 november 2026 verminderde prestaties bij Actions en API-
verzoeken. De productie-workflow is via de normale GitHub-sessie gestart.
Run `41819704994` keurde één bestaande test af: de navigatietest liep alle
26 actieve cases binnen één limiet van 120 seconden af en overschreed die
limiet op de CI-runner, ook bij de herkansing. De overige 364 tests slaagden.
De deployjob werd overgeslagen; de bestaande site bleef HTTP 200 geven.

Dezelfde navigatiecontroles zijn daarom verdeeld over één test per actieve
case. Alle assertions, wraparound-volgorde en de mobiele test zijn behouden.
Er zijn geen tests overgeslagen en geen tijdslimieten verruimd. Alleen de
testindeling wijzigt; de goedgekeurde websitecode blijft gelijk. Alle 27
gerichte navigatietests slaagden lokaal en de onafhankelijke reviewer heeft
de correctie goedgekeurd. Publicatie vereist een nieuwe volledig groene
productierun en aansluitende controle van amiamis.com.
