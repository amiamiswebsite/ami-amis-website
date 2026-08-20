# Website OS foundation

## Doel

Een onderhoudbaar Ami Amis website operating system installeren en de P0-basis
betrouwbaar maken, zonder de huidige merkcomposities of goedgekeurde copy te
herontwerpen.

## Niet-doelen

- Geen wholesale CSS- of paginaredesign.
- Geen fictieve backend, provider, credentials, metrics of content.
- Geen automatische publicatie.
- Geen onmiddellijke verwijdering van alle legacy CSS of client boundaries.
- Geen ongerichte mediacompressie die beeldregie of kwaliteit aantast.

## Huidige toestand

Zie `docs/audits/FOUNDATION_INVENTORY.md` en
`docs/audits/CURRENT_SITE_AUDIT.md`. Baselinebuild en 180 screenshots zijn
beschikbaar. De worktree begon schoon op `ce8764e`.

## Beslissingen

1. `out/` is de enige deploybare export; gegenereerde rootoutput verdwijnt uit
   versiebeheer na de vastgelegde checkpoint-tag.
2. Een package manager en lockfile worden canoniek. De keuze wordt bewezen met
   een schone lokale en CI-installatie.
3. Quality wordt opgebouwd uit kleine, onderling compatibele checks. Deployment
   krijgt een expliciete dependency op de volledige qualityjob.
4. P0-inhoud en accessibility worden hersteld voor visuele uitbreiding.
5. De aangeleverde kit wordt selectief verfijnd. Permanente regels gaan in
   `AGENTS.md`, workflows in `.agents/skills`, achtergrond in docs en harde
   regels in scripts/tests/CI.
6. Tokens worden toegevoegd als reference, semantic en componentlagen. De
   bestaande CSS krijgt eerst een expliciete foundationimport; migratie gebeurt
   daarna per componentfamilie.
7. UI-iconen krijgen een lokale registry zonder nieuwe productie-afhankelijkheid.
   Brand- en socialmarks blijven aparte assets.
8. `/work/` wordt de beoogde canonical namespace. Legacy aliases blijven in deze
   fase bereikbaar totdat redirectgedrag op static hosting bewezen is.

## Fasen

- [x] Fase 0 - nulmeting, browserbaseline en onafhankelijke audits.
- [x] Fase 1 - governance, docs, skills, agents, tokens en scripts installeren.
- [x] Fase 2 - source/build boundary, package manager en deploy parity.
- [x] Fase 3 - quality tooling en CI-gates.
- [x] Fase 4 - P0 bronfixes: metrics, contact, heading en navigatie.
- [x] Fase 5 - primitives, icons, accessibility, SEO en mediafundament.
- [x] Fase 6 - volledige QA, after-screenshots, Lighthouse en review.

## Acceptatie per fase

### Foundation

- Root en geneste instructies zijn kort en eenduidig.
- Skills zijn valide en taakgericht; agents zijn read-only of smal van scope.
- Tokenbron bouwt deterministisch naar CSS en een check detecteert drift.

### Boundary en deploy

- `git ls-files` bevat geen rootexport of gekopieerde public-assets.
- Boundarycheck faalt aantoonbaar op een verboden fixture.
- Verse Pages-build bevat Home 2, actuele Team-copy en alle publieke routes.

### Quality

- `quality:fast`: generated boundary, tokens, lint, format en style.
- `quality`: fast checks, build, Playwright smoke, axe en content/paritychecks.
- Deploy job heeft `needs: quality` en draait alleen op groen.

### P0 gedrag

- `30,3k` en `+33,5%` staan in server-HTML.
- Contact benoemt de e-mailappfallback en behoudt data bij endpointfouten.
- Menu: initial focus, trap, Escape, inert achtergrond en focus restore.
- Een H1 per primaire route en een werkende skiplink.

### Finale QA

- Productiebuild en volledige suite groen.
- Kernroutes en states op 390x844, 768x1024 en 1440x1000 vergeleken.
- Reduced motion, keyboard en 200% zoom gecontroleerd.
- Lighthouse- en accessibilitybaseline gedocumenteerd.
- Onafhankelijke finale diffreview zonder open blocker/critical finding.

## Verwachte bestanden

- Governance: `AGENTS.md`, geneste `AGENTS.md`, `.agents/skills/`,
  `.codex/agents/`, `.codex/config.toml`.
- Docs: `README-FIRST.md`, `docs/design-system/`, `docs/audits/`,
  `docs/decisions/`, `docs/maintenance/`.
- Foundation: `tokens/`, `app/styles/`, `app/components/ui/`.
- Tooling: `package.json`, lockfile, lint/format/style configs,
  `playwright.config.*`, `tests/`, `scripts/`, `.github/workflows/`.
- Gerichte P0-bronwijzigingen in SocialGrowth, Contact, Layout, Intro,
  MenuToggle en NavOverlay.

## Risico's en mitigatie

- **Legacy cascade:** geen globale formattering of big-bang rewrite; alleen een
  foundationlaag en gerichte selectors met screenshots.
- **Static hosting:** basepath en trailing slash blijven behouden; tests draaien
  zowel lokaal als onder Pages-prefix.
- **Mediafouten:** geen ongecontroleerde herencoding; posters en fallbacks eerst.
- **Repositorygrootte:** rootduplicaten verwijderen in een afzonderlijk,
  reviewbaar diff; `public/` media niet zonder expliciete kwaliteitscontrole.
- **Externe beslissingen:** Pages adminsetting, contactprovider, captions en
  fontlicentie blijven expliciete businessitems.

## Rollback

- Volledige terugkeer: tag `live-before-structural-redesign-2026-08-14`.
- Per fase: wijzigingen blijven per onderwerp gegroepeerd en kunnen met een
  normale revert worden teruggedraaid.
- Geen gegenereerde export wordt als herstelbron gebruikt; herstel komt altijd
  uit source plus een verse build.

## Voortgangslog

- 2026-08-14: schone baselinebuild, 180 screenshots, 60 reduced-motionchecks,
  route/component/media/interactie-inventaris en vier read-only audits afgerond.
- 2026-08-14: operating system, P0/P1-fixes, Pages-parity en CI-gates
  geinstalleerd; 214 Playwrightchecks en 174 finale routecaptures groen.
- 2026-08-14: geldige desktop Lighthouse-baseline vastgelegd op zeven
  representatieve routes. Zie `docs/audits/FINAL_VALIDATION.md`.
