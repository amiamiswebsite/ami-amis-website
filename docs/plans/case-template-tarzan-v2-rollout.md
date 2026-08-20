# Case-template Tarzan v2 rollout

## Doel

Alle case-detailpagina's gebruiken de Tarzan & Jane v2-structuur als gedeelde template, zonder bestaande casecopy of databronnen te wijzigen.

## Niet-doelen

- Geen copy herschrijven, inkorten of aanvullen.
- Geen nieuwe claims, media, metrics of klantinformatie verzinnen.
- Geen deployment of GitHub-publicatie.

## Huidige toestand

Casecontent staat in `src/data/cases.js`. De gewone `/work/[slug]/` en `/ons-werk/[slug]/` routes renderen via `CasePageTemplate`, dat nu aparte case-renderers kiest. Tarzan & Jane v2 gebruikt `TarzanServicesCasePage` met hero, verhaal, proces, video, fotogalerij, media-overzicht en CTA.

## Beslissingen

- `TarzanServicesCasePage` wordt de gedeelde casepresentatie.
- Het media-overzicht wordt niet meer gerenderd.
- Video- en fotosecties verschijnen alleen wanneer de case daarvoor echte data heeft.
- Resultaatcijfers blijven zichtbaar binnen de proceskaart wanneer ze in de bestaande data staan.
- Outrocopy blijft zichtbaar wanneer die in de bestaande data staat.

## Fasen

- [x] Fase 0 - nulmeting en bescherming
- [x] Fase 1 - Tarzan v2 media-overzicht verwijderen
- [x] Fase 2 - Tarzan v2 component data-agnostisch maken
- [x] Fase 3 - alle case-routes valideren
- [x] Fase 4 - QA en documentatie afronden

## Validatie per fase

- Render minimaal Tarzan & Jane v2, Visit Antwerpen en een case zonder fotogalerij.
- Build moet slagen.
- Controleer dat `src/data/cases.js` niet inhoudelijk is aangepast.

## Risico's en rollback

Grootste risico is dat een case met minder media een lege sectie toont. Rollback: `CasePageTemplate` terugzetten naar de vorige rendererselectie en de Tarzan v2 wijzigingen terugdraaien.

## Voortgangslog

2026-08-17: Plan gestart. Data-inventaris uitgevoerd; cases hebben verschillende combinaties van hero, video, imageGallery, campaignImages en mediaSections.
2026-08-17: `CasePageTemplate` routeert alle cases naar de Tarzan v2-presentatie. `Media-overzicht` wordt niet meer gerenderd. Lokale routecheck voor alle `/work/<slug>/` en `/ons-werk/<slug>/` cases geeft 200 en geen `Media-overzicht`; galerijsecties komen overeen met echte beeldgroepen uit de bestaande data.

## Eindrapport

Afgerond. `src/data/cases.js` bleef inhoudelijk ongewijzigd. ESLint op de gewijzigde JSX-bestanden slaagt. Stylelint op de CSS-module faalt nog op bestaande projectbrede stijlregels in dit bestand, niet op een CSS-parsefout.
