# ADR 0001: website foundation boundaries

- Status: accepted
- Date: 2026-08-14

## Context

De repository bevatte tegelijk broncode, een verouderde root-export, twee lockfiles en een deployment zonder volwaardige qualitygate. De aangeleverde operating-systemkit bevat bruikbare regels en tokens, maar noemt een oudere merkpositionering en veronderstelt tooling die nog niet bestond.

## Besluit

1. Next.js-bron en `public/` zijn de enige te bewerken websitebronnen; `out/` is een tijdelijk CI-artifact.
2. GitHub Pages publiceert uitsluitend een vers `out/`-artifact na een geslaagde qualityjob.
3. pnpm en `pnpm-lock.yaml` zijn canoniek omdat de gereproduceerde lokale build daarmee overeenkomt.
4. De huidige positionering “creatieve groeipartner” heeft voorrang op oudere kitcopy.
5. Tokens, docs, skills en read-only reviewagents worden selectief geïntegreerd; workflows worden pas harde gates wanneer de scripts werkelijk bestaan en slagen.
6. `globals.css` wordt gefaseerd opgesplitst. Er komt geen wholesale redesign of CSS-massaconversie.
7. De releasecheckpoint-tag `live-before-structural-redesign-2026-08-14` blijft de rollbackbasis.

## Gevolgen

- Root-exportbestanden verdwijnen uit versiebeheer en worden door CI geblokkeerd.
- Een wijziging kan pas deployen na lint, format, style, build, smoke, accessibility en browsercontrole.
- Legacy CSS, grote media en routealiases blijven expliciete migratiedebt en worden per gecontroleerde stap aangepakt.
