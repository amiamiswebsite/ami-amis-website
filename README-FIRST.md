# README FIRST

Dit is de onderhoudsingang voor de Ami Amis-website. De site is een Next.js App Router static export die via GitHub Pages uit `out/` wordt gepubliceerd.

## Lokale start

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Leesvolgorde

1. `AGENTS.md`
2. `PLANS.md`
3. `docs/audits/CURRENT_SITE_AUDIT.md`
4. de relevante documenten in `docs/design-system/`
5. de toepasselijke repo-skill in `.agents/skills/`

## Kwaliteit

```bash
pnpm quality:fast
pnpm quality
```

`quality:fast` controleert tokens, gegenereerde rootoutput, lint, format en styles. `quality` voegt build-, route-, accessibility- en browserchecks toe. De deploymentworkflow mag pas publiceren nadat de qualityjob geslaagd is.

## Belangrijke grenzen

- Bewerk nooit gegenereerde root-HTML, `_next/`, `out/`, route-exportfolders of `__next*`.
- `public/` is de assetbron; rootkopieën van assets zijn build-output.
- Gebruik één package manager: pnpm.
- Externe formulieren of analytics vereisen een echte providerkeuze en configuratie. Zonder endpoint blijft de contactflow een expliciete mailfallback.
- Zie `docs/maintenance/README.md` voor kleine wijzigingen, pagina's, cases en releases.
