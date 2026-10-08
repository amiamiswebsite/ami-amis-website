# Search Console en analytics

## Doel

Alle publieke routes gebruiken `https://amiamis.com` als canonical, zijn verifieerbaar in Google Search Console en meten bezoekers via de gepubliceerde Google Tag Manager-container met toestemming voor analytics.

## Niet-doelen

- Geen advertentietags of marketingcookies toevoegen.
- Geen inhoudelijke of visuele herwerking van bestaande pagina's.

## Huidige toestand

- De site is een statische Next.js-export op GitHub Pages.
- De live URL en metadata-basis zijn `https://amiamis.com`.
- Interne links gebruikten deels nog de oude `/ons-werk/`-namespace.
- Search Console, GA4 en GTM zijn aangemaakt, maar de verificatie en containercode staan nog niet volledig in de site.

## Beslissingen

- `amiamis.com` blijft het enige canonical domein; `amiamis.be` blijft het e-maildomein.
- De oude `/ons-werk/`-routes blijven bereikbaar en verwijzen canoniek naar `/work/`.
- Google Tag Manager laadt sitebreed, voorafgegaan door Consent Mode v2 met analytische opslag standaard geweigerd.
- De cookiekeuze is compact, toetsenbordtoegankelijk en later opnieuw te openen via de footer.

## Fasen

- [x] Fase 0 — nulmeting en bescherming
- [x] Fase 1 — canonical links en Google-verificatie
- [x] Fase 2 — GTM, Consent Mode en cookiekeuze
- [x] Fase 3 — privacytekst en regressietests
- [ ] Fase 4 — volledige QA, livegang en live-verificatie

## Validatie per fase

- `pnpm quality:fast`
- `pnpm build:pages`
- `pnpm test:pages`
- Crawl van alle statisch geëxporteerde routes op status, canonical, interne links en trackingcode.
- Livecontrole van verificatiebestand, metadata, sitemap, canonicals en GTM na deployment.

## Risico's en rollback

De GTM-container is één centraal integratiepunt. De containercode kan onafhankelijk worden teruggedraaid; de toestemming blijft standaard geweigerd wanneer scripts of opslag niet beschikbaar zijn.

## Voortgangslog

- 2026-10-08 — Search Console-property, GA4-property en webstream aangemaakt.
- 2026-10-08 — GTM-container met GA4-basismeting gepubliceerd.
- 2026-10-08 — Interne case-links naar de canonieke `/work/`-routes gemigreerd en verificatiebronnen toegevoegd.
- 2026-10-08 — Consent Mode v2, cookievoorkeuren en heropenbare footeractie toegevoegd.
- 2026-10-08 — Productie-export gebouwd; 353 Playwright-tests, inclusief alle publieke en legacy-caseroutes, zijn geslaagd.

## Eindrapport

Wordt ingevuld na de livecontrole.
