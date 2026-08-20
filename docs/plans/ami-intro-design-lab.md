# Ami Intro Design Lab

## Doel

Een tijdelijke, niet-genavigeerde vergelijkingspagina bouwen met drie afzonderlijke high-end intro-ontwerpen voor dezelfde Ami Amis-copy.

## Niet-doelen

- Geen publieke navigatie aanpassen.
- Geen productiehomepage vervangen.
- Geen copy corrigeren of herschrijven.
- Geen externe assets of nieuwe fontfamilies toevoegen.

## Huidige toestand

De nieuwe homepage gebruikt de Home 2/Welkom-ervaring. Er is geen bestaande design-labroute. De repo bevat bruikbare merkassets: logo, papier- en riso-texturen, teamfoto's, kantoorbeelden, telefoonbeelden en casebeelden.

## Beslissingen

- Eén centrale copyconfiguratie in `src/data/amiIntroDesignLab.js`.
- Eén tijdelijke route: `/design-lab/ami-intro`.
- Drie presentational React-componenten in één clientcomponent, omdat subtiele pointerreacties per variant nodig zijn.
- CSS blijft begrensd in een CSS module in plaats van extra globale overrides.
- Placeholders worden technisch gelabeld met `data-placeholder`, maar krijgen geen zichtbare marketinglabels.

## Fasen

- [x] Fase 0 — nulmeting en bescherming
- [x] Fase 1 — foundation
- [x] Fase 2 — componenten
- [x] Fase 3 — pagina-integratie
- [x] Fase 4 — QA en documentatie

## Validatie per fase

- Nulmeting: screenshots op 1440x900, 1024x768 en 390x844 in `artifacts/ami-intro-comparison/source/`.
- Foundation/componenten: lint en gerichte copytest.
- Integratie: route laadt zonder consolefouten en zonder horizontale overflow.
- QA: screenshots per variant op desktop, tablet en mobiel; productiebuild.

## Risico's en rollback

De route is niet gekoppeld aan navigatie en gebruikt eigen component/CSS-module. Rollback kan door de route, component, dataconfig, test en artifacts te verwijderen.

## Voortgangslog

2026-08-18 — Briefing geanalyseerd, bronroute vastgelegd en tijdelijke route gepland.
2026-08-18 — Centrale copyconfig, design-labroute, drie afzonderlijke intro-ontwerpen en gerichte Playwright-test toegevoegd.
2026-08-18 — Screenshots opnieuw gegenereerd op 1920x1080, 1440x900, 1366x768, 1024x768, 834x1194, 768x1024, 430x932, 390x844, 375x812 en 320x568. Rapportage geeft geen horizontale overflow, consolefouten of ontbrekende requests.

## Eindrapport

Klaar. De tijdelijke route `/design-lab/ami-intro` toont drie aparte designrichtingen onder elkaar, zonder publieke navigatiekoppeling en met alle zichtbare copy afkomstig uit `src/data/amiIntroDesignLab.js`. De exacte copy is niet herschreven. QA is afgerond met screenshots in `artifacts/ami-intro-comparison/`, `pnpm lint --max-warnings=0`, `pnpm build` en de gerichte Playwright-test `tests/e2e/ami-intro-design-lab.spec.mjs`.
