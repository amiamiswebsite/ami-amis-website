# Systeemmanifest

## Besturing

- `AGENTS.md` — permanente projectregels die Codex vóór werk leest.
- `PLANS.md` — format en discipline voor grote uitvoerplannen.
- `README-FIRST.md` — ingang voor lokale start, leesvolgorde en quality.
- `.codex/config.toml` — gecontroleerde projectconfiguratie en smalle agents.

## Repo-skills

- `.agents/skills/ami-amis-brand-guardian/`
- `.agents/skills/ami-amis-ux-audit/`
- `.agents/skills/ami-amis-component-builder/`
- `.agents/skills/ami-amis-icon-system/`
- `.agents/skills/ami-amis-content-guardian/`
- `.agents/skills/ami-amis-release-qa/`

## Designsystemdocumentatie

- principes en huisstijl;
- tokens en CSS-architectuur;
- componentcontracten;
- iconregels;
- motion;
- toegankelijkheid;
- content-UX;
- page blueprints;
- kwaliteitsgates;
- governance.

## Token-seeds

De JSON-bestanden in `tokens/` zijn de bron voor reference-, semantic- en
componenttokens. `scripts/build-tokens.mjs` genereert
`app/styles/generated/tokens.css`; `pnpm tokens:check` blokkeert drift.

## Codefundament

- `app/components/ui/` — Icon, IconButton, Container, Section, Button en Media.
- `app/styles/foundation/` — tokens, reset/base, icons en primitives.
- `scripts/` — tokenbuild, assetbudget, source/exportgrens, route-inventory,
  static preview en reproduceerbare captures.
- `tests/e2e/` — smoke, content/parity, interactie, axe, reflow, visual en
  reduced motion.
- `tests/fixtures/visible-copy-baseline.json` — expliciet vergrendelde,
  geordende zichtbare copy van alle publieke routes.
- `.github/workflows/deploy.yml` — qualityjob en daarvan afhankelijke
  GitHub Pages-deployment.
