# Nieuwe cases september 2026

## Doel

ReCenter, Opnieuw & Co, Craftails en ShopWeDo toevoegen en de bestaande VDAB-case bijwerken binnen de huidige case-template. Craftails koppelen aan de eventdienst en de gevraagde teamheader- en tekstballonaanpassingen uitvoeren. Alles lokaal visueel controleren zonder push of deployment.

## Niet-doelen

- Geen redesign van de case-template, dienstenpagina of teampagina.
- Geen nieuwe claims, resultaten of projectmedia verzinnen.
- Geen push, merge of deployment.

## Huidige toestand

- VDAB-copy is al bijgewerkt in `src/data/cases.js` en `src/data/workCases.js`.
- ReCenter, Opnieuw & Co, Craftails en ShopWeDo zijn toegevoegd aan de centrale case- en workdata.
- De eventdienst verwijst naar Craftails.
- De teamheader gebruikt de aangeleverde Brentvideo.
- De gevraagde vraag staat als tekstballon in de teamintro.
- De vijf aangeleverde Opnieuw & Co-bronbestanden zijn als geoptimaliseerde WebP-assets opgenomen.

## Beslissingen

- De bestaande moderne case-opbouw en bijbehorende spacing worden hergebruikt; er komt geen aparte case-CSS.
- De aangeleverde copy wordt inhoudelijk exact behouden en alleen verdeeld over bestaande velden.
- Herhaalde Vimeo-links worden als één uniek videowerk opgenomen, zodat dezelfde film niet vier keer verschijnt.
- De teamvideo wordt via Vimeo ingebed in hetzelfde vaste viewportcontract en behoudt de bestaande geluidsbediening.
- Opnieuw & Co gebruikt de vijf definitieve posters; voor de werkkaart is alleen een aparte liggende uitsnede gemaakt.
- ShopWeDo gebruikt de officiële Vimeo-still als 16:9-caseposter en een aparte liggende uitsnede die veilig binnen het 16:11-kader van de work-grid valt.

## Fasen

- [x] Fase 0 — nulmeting en bescherming
- [x] Fase 1 — cases en overzichtsdata
- [x] Fase 2 — diensten- en teamintegratie
- [x] Fase 3 — lokale preview en visuele controle
- [x] Fase 4 — QA en documentatie

## Validatie per fase

- Data: contenttest, routegeneratie en static build.
- UI: screenshots op 390, 768 en 1440 px voor de nieuwe cases, diensten en team.
- Interactie: Vimeo play/geluid, case-links, toetsenbordfocus en reduced motion.
- Finale gates: `pnpm quality:fast`, relevante browserchecks en `pnpm build:pages`.

## Risico’s en rollback

- Vimeo kan lokaal netwerktoegang nodig hebben; de poster/fallback blijft zichtbaar als embeds niet laden.
- De case-objecten, workkaarten en mediafolders blijven per case geïsoleerd en zijn daardoor gericht terug te draaien.

## Voortgangslog

- 2026-09-21 — briefing, bestaande data, templatecontracten en merkregels opnieuw geïnventariseerd.
- 2026-09-21 — ReCenter, Opnieuw & Co en Craftails toegevoegd; VDAB-copy behouden en gecontroleerd.
- 2026-09-21 — Craftails aan de eventdienst gekoppeld en teamheader naar de Brentvideo omgezet.
- 2026-09-21 — vijf drukwerkbestanden gerenderd, visueel gecontroleerd en als webassets geïntegreerd.
- 2026-09-21 — desktop- en mobiele captures beoordeeld; build, copy, smoke, axe en reduced motion zijn groen.
- 2026-09-21 — ShopWeDo toegevoegd met de aangeleverde jubileumcopy, officiële Vimeo-embed en gecontroleerde work-thumbnail.
- 2026-09-21 — volledige contentset (72 checks), beide ShopWeDo-smoke- en toegankelijkheidsroutes en de statische build van 75 pagina’s opnieuw groen.

## Eindrapport

De vier nieuwe cases gebruiken de bestaande moderne case-template en staan in de centrale route-, sitemap- en workdata. De posterreeks blijft volledig zichtbaar, terwijl de werkkaarten aparte liggende crops gebruiken waar nodig. De teamvideo behoudt het bestaande 9:16-contract en geluidsbediening. Er is niets gepusht of gedeployed.
