---
name: ami-amis-release-qa
description: Voer de finale technische, visuele, accessibility-, content-, SEO- en static-exportcontrole uit voor de Ami Amis-site. Gebruik vóór merge, release of na brede UI-refactors; niet als vervanging voor componenttests tijdens ontwikkeling.
---

# Ami Amis release QA

## Automatische gates

1. Schone dependency-install.
2. Tokenbuild en generated-outputcheck.
3. Lint en formatcheck.
4. Typecheck.
5. Next static export onder de GitHub Pages base path.
6. Playwright smoke + visuele captures.
7. Axe smoke tests.
8. Reduced-motiontest.
9. Broken-link- en console-errorcheck.

Unit- en Storybooktests worden toegevoegd zodra die infrastructuur in de repository bestaat; rapporteer ze tot dan expliciet als roadmap in plaats van als geslaagde gate.

## Manuele checks

- keyboard-only op alle primaire flows;
- menu focus trap en return;
- visible focus;
- forms: labels, errors, loading, success en fallback;
- 200% zoom en smalle viewport;
- reduced motion;
- captions/transcript voor betekenisvolle video;
- mobiel touch targets;
- taal en echte cijfers/quotes;
- hero en case-media op trage verbinding;
- social/brand icons en externe links.

## Viewports

Minimaal 360, 390, 768, 1024, 1440 en 1920 px voor kritieke pagina’s/states.

## Releasebesluit

Rapporteer:

- PASS/FAIL per gate;
- regressies met route en screenshot;
- bewuste baselinewijzigingen;
- P0/P1/P2-restpunten;
- rollbackpad;
- bevestiging dat niets automatisch is gepubliceerd.
