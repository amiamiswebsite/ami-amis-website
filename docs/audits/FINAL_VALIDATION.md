# Finale validatie website OS

Datum: 14 augustus 2026

## Geinstalleerd systeem

- Korte root- en geneste `AGENTS.md`-regels, onderhoudsdocs, decision log,
  officiele repo-skills en smalle read-only reviewagents.
- Reference-, semantic- en componenttokens met deterministische CSS-build.
- UI-primitives voor Icon, IconButton, Container, Section, Button en Media.
- Een strict source/exportcontract, pnpm-only installatie en een vers `out/`
  als enig deployartifact.
- ESLint, Prettier, Stylelint, Playwright, axe, routecapture, assetbudget,
  Lighthouse en een deployworkflow die afhankelijk is van quality.

## Opgeloste basis

- Gegenereerde rootoutput en gedupliceerde rootassets zijn uit versiebeheer;
  CI blokkeert terugkeer.
- Pages bouwt de actuele bron onder `/ami-amis-website` en genereert 63 routes.
- Statistiekeindwaarden staan in server-HTML; animatie is decoratief.
- Contact heeft een eerlijke mailtofallback en een voorbereide optionele
  endpointadapter met loading-, success- en errorstates.
- Menu en mediamodals ondersteunen initial focus, trap, Escape, inertness en
  focus restore.
- Headingstructuur, FAQ-inertness, carrouselklonen, autoplaybediening, touch
  targets, reduced motion en 200%-reflow zijn gecontroleerd. Een zichtbare
  skiplink blijft bewust een voorstel omdat die nieuwe zichtbare copy toevoegt.
- Canonicals, metadata, Open Graph, robots, sitemap en ondersteunde structured
  data zijn aanwezig zonder nieuwe claims te verzinnen.
- Elf kritieke beelden zijn visueel gecontroleerd naar WebP gemigreerd; de
  assetbaseline daalde met 11,63 MB.

## Gewijzigde bestanden per fase

1. Bewijs en plan: `docs/audits/`, `docs/plans/`, `docs/decisions/`,
   `README-FIRST.md`, `PLANS.md` en `SOURCES.md` bevatten inventory, audit,
   acceptatiecriteria, risico's en rollback.
2. Operating system: root- en geneste `AGENTS.md`, `.agents/skills/`,
   `.codex/agents/`, `.codex/config.toml`, `SYSTEM_MANIFEST.md` en
   `docs/maintenance/README.md` leggen regels, workflows en eigenaarschap vast.
3. P0-basis: `.gitignore`, `package.json`, `pnpm-lock.yaml`, `next.config.ts`,
   `.github/workflows/deploy.yml`, `scripts/check-generated-root.mjs` en de
   verwijdering van gegenereerde rootexport scheiden bron en deployartifact.
4. Design- en codefundament: `design-tokens/`, `src/styles/`,
   `src/components/ui/`, `src/components/layout/`, `src/components/Nav.tsx` en
   de gefaseerde aanpassingen in `src/app/globals.css` leveren tokens,
   primitives en gedeelde interactiepatronen.
5. UX, accessibility, SEO en performance: `src/app/layout.tsx`, route-layouts,
   menu-, media-, FAQ-, carrousel-, statistiek- en contactcomponenten plus de
   geoptimaliseerde bronassets in `public/images/` dragen de runtimefixes.
6. Test en release: `eslint.config.mjs`, `.prettierrc.json`,
   `.stylelintrc.json`, `playwright.config.ts`, `lighthouserc.json`, `tests/`,
   `scripts/capture-routes.mjs`, `scripts/check-assets.mjs` en de qualityscripts
   maken de acceptatiecriteria reproduceerbaar.

## Reproduceerbaar bewijs

- Before: `/Users/giosipinna/.codex/visualizations/2026/06/24/019efb1f-0f73-7893-8814-fd3004757b9e/ami-amis-os/before`
- After: `/Users/giosipinna/.codex/visualizations/2026/06/24/019efb1f-0f73-7893-8814-fd3004757b9e/ami-amis-os/after`
- After-resultaat: 174 captures, 58 routes x 390x844, 768x1024 en
  1440x1000; 0 status-, H1-, overflow- of eigen-originfouten.
- Playwright: 273 geslaagd, 0 onverwacht, 0 flaky, 0 overgeslagen.
- Axe: 0 serious/critical findings op alle 58 publieke routes.
- Copy-pariteit: alle 58 publieke routes worden exact vergeleken met de
  vastgelegde zichtbare bronbaseline; updates vereisen expliciete
  contentgoedkeuring.

## Lighthouse desktopbaseline

| Route        | Perf | A11y | Best practices | SEO |    LCP |  TBT |   CLS |
| ------------ | ---: | ---: | -------------: | --: | -----: | ---: | ----: |
| `/`          |   90 |  100 |            100 | 100 | 2,07 s | 0 ms | 0,027 |
| `/diensten/` |   95 |  100 |            100 | 100 | 1,49 s | 0 ms | 0,001 |
| `/work/`     |   99 |  100 |            100 | 100 | 1,01 s | 0 ms | 0,000 |
| `/team/`     |   97 |  100 |            100 | 100 | 1,33 s | 0 ms | 0,001 |
| `/contact/`  |   99 |  100 |            100 | 100 | 0,97 s | 0 ms | 0,002 |
| Tarzan V2    |   99 |  100 |             78 | 100 | 1,03 s | 0 ms | 0,025 |
| X-Oats       |   97 |  100 |            100 | 100 | 1,23 s | 0 ms | 0,005 |

Tarzan V2 verliest best-practicespunten uitsluitend door Vimeo third-party
cookies en de Chrome Issues-waarschuwing. De eigen accessibility-, SEO- en
performancechecks zijn groen.

## Open businessbeslissingen en backlog

1. Kies een contactprovider en lever endpoint/configuratie; tot dan blijft de
   expliciete mailtofallback actief.
2. Lever captions en transcripties voor betekenisvolle video's.
3. Bevestig fontlicentie en redistributierechten.
4. Beslis over herencoding of externe hosting van de resterende 30-68 MB
   legacyvideo's; `public/` blijft 488 MB.
5. Beslis of historische casealiases echte redirects mogen worden zodra de
   static-hostingstrategie dat betrouwbaar ondersteunt.
6. Vervang of host externe Vimeo-posters lokaal waar maximale onafhankelijkheid
   nodig is.
7. Migreer `globals.css` per componentfamilie; geen big-bang rewrite.
8. Bevestig in GitHub Pages dat de publicatiebron `GitHub Actions` is.

## Rollback

- Live uitgangspunt: `live-before-structural-redesign-2026-08-14` op
  `ce8764ee1f38cdae14742b70a8f45a587fa29ec2`.
- Tweede checkpoint: `checkpoint-pre-structural-redesign-2026-08-14` op
  `a56056b`.
- Herstel altijd vanuit source plus een verse build; nooit vanuit een oude
  rootexport.
