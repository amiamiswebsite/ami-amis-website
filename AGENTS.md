# Ami Amis website

## Start hier

Lees voor substantieel werk `README-FIRST.md`, `PLANS.md`, de relevante documenten in `docs/design-system/` en de toepasselijke skill in `.agents/skills/`.

## Merk

- Positionering: **creatieve groeipartner**.
- Merkidee: **voor merken die durven springen**.
- Karakter: warm, menselijk, direct, speels, zelfverzekerd en high-end zonder corporate afstand.
- Behoud de signature skydive-hero, echte beelden, expressieve typografie, zwarte contouren, offset-schaduwen, papergevoel en gecontroleerde asymmetrie.
- Vermijd generieke agency-, SaaS- en AI-templatepatronen. Humor mag nooit de taak of actie verbergen.

## Bron en build

- Bewerk alleen bronbestanden. Bewerk nooit root-exportoutput, `_next/`, `out/`, route-exportfolders of `__next*`.
- `public/` is de enige bron voor statische assets.
- De site blijft een Next.js App Router static export voor GitHub Pages, inclusief `basePath`, `assetPrefix` en trailing slashes.
- Gebruik pnpm en `pnpm-lock.yaml`; voeg geen tweede lockfile toe.
- Geen productie-afhankelijkheid zonder motivatie, licentiecontrole, bundle-impact en onderzocht alternatief.
- Server Components zijn de standaard. Houd clientgrenzen zo klein mogelijk.

## Ontwerp en code

- `tokens/` is de bron voor reference-, semantic- en componenttokens.
- Migreer `app/globals.css` gefaseerd. Geen big-bang rewrite of ongerelateerde opschoning.
- Nieuwe gedeelde primitives gebruiken tokens, toetsenbordbediening, zichtbare focus, reduced motion en vaste responsive dimensies.
- Gebruik de centrale `Icon`- en `IconButton`-API voor functionele UI-iconen. Brandgraphics blijven aparte assets.
- Eén semantische bron per inhoud; decoratieve klonen zijn `aria-hidden` en niet focusbaar.
- WCAG 2.2 AA is het minimum. Modals en overlays ondersteunen initial focus, focus trap, `Escape`, achtergrond-inertness en focus restore.
- Verzin nooit copy, metrics, testimonials, cases, privacytekst, endpoints, providers, credentials of success states.
- Behandel zichtbare copy, contentblokken en hun volgorde als vergrendeld. Wijzig ze alleen na expliciete toestemming en werk dan bewust de contentbaseline bij.

## Werkwijze

- Begin met `git status`; behoud bestaande gebruikerswijzigingen.
- Houd bij groot werk een uitvoeringsplan en decision log bij.
- Leg nuttige scope buiten de opdracht vast als backlog.
- Voer voor afronding `pnpm quality:fast`, `pnpm quality` en de relevante browsercontroles uit.
- Push, merge of deploy alleen na expliciete opdracht en nooit met falende checks.
