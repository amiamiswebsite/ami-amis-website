# Onderhoud

## Kleine wijziging

1. Start vanaf een schone branch en lees `AGENTS.md` plus de relevante componentdoc.
2. Pas broncode aan, nooit exportoutput.
3. Draai `pnpm quality:fast`, `pnpm test:content` en de relevante Playwrighttest.
4. Controleer 390×844, 768×1024 en 1440×1000, inclusief reduced motion wanneer motion geraakt wordt.
5. Leg bewuste visuele veranderingen vast met before/after-screenshots.

Gebruik voor een lokale custom-domain Pages-pariteitscheck `pnpm build:pages`
en `pnpm test:pages`. `pnpm quality` voert beide automatisch uit. Gebruik
`pnpm build:pages:preview` en `pnpm test:pages:preview` uitsluitend om de oude
repository-basepath `/ami-amis-website` te controleren.

## Zichtbare copy en content

- Zichtbare tekst, cijfers, labels en de volgorde of aanwezigheid van
  inhoudsblokken zijn vergrendeld zonder expliciete contentopdracht.
- `tests/fixtures/visible-copy-baseline.json` bevat de geordende zichtbare
  bronbaseline voor alle publieke routes; `pnpm test:content` controleert die
  exact.
- Werk de fixture alleen bij na expliciet goedgekeurde copy- of
  inhoudswijzigingen. Inspecteer altijd eerst de tekstuele diff; update nooit
  blind om een falende test groen te maken.
- Los accessibility en SEO bij voorkeur technisch op met semantiek, ARIA,
  focusgedrag en metadata, zonder zichtbare tekst toe te voegen of te wijzigen.

## Nieuwe pagina

1. Voeg een App Router-route toe met één `h1`, metadata en een canonical.
2. Gebruik bestaande layoutprimitives en semantische tokens.
3. Voeg de route aan de centrale route-inventory toe.
4. Voeg smoke-, accessibility- en visual coverage toe.
5. Controleer de root static export en, indien relevant, ook de legacy
   GitHub Pages-basepath.

## Nieuwe case

1. Voeg uitsluitend aangeleverde copy, resultaten en media aan de centrale casedata toe.
2. Geef ieder medium oriëntatie, alttekst, poster/fallback en intrinsieke maat of aspect ratio.
3. Behoud de gedeelde probleem/oplossing/resultaatcontracten zonder unieke art direction plat te slaan.
4. Controleer de case onder `/work/<slug>/` en de bestaande aliasstrategie onder `/ons-werk/<slug>/`.
5. Voeg de case toe aan work-overzicht, sitemap en tests.

## Release

1. `pnpm install --frozen-lockfile`
2. `pnpm quality`
3. Draai bij een visuele release `pnpm capture:routes` en inspecteer de artifacts.
4. Inspecteer diff, auditrapport en visuele artifacts.
5. Laat een onafhankelijke `release-reviewer` de finale diff controleren.
6. Push alleen op expliciete opdracht. GitHub Pages publiceert pas na een geslaagde qualityjob.

## Assets

- Nieuwe media komen uitsluitend in `public/`.
- Leg een bewust goedgekeurde nieuwe assetbaseline vast met
  `pnpm assets:baseline`; gebruik dit nooit om een onverklaarde toename te
  verbergen.
- Geef beelden `width` en `height` of een stabiele aspect ratio, plus passende
  alttekst, loading en decoding.
- Geef video een poster/fallback en voorkom eager preload buiten de primaire
  viewport.

## Rollback

De checkpoint vóór deze foundation is `live-before-structural-redesign-2026-08-14`. Maak voor latere structurele fases opnieuw een expliciete tag of release. Gebruik nooit `git reset --hard` in een werkmap met gebruikerswijzigingen.
