# Marketingmeting en leadkwaliteit

## Doel

De website meet de volledige marketingfunnel van contentinteresse tot een bevestigde lead, met consistente GA4-events, veilige parameters, controleerbare toestemming en tests die regressies voorkomen.

## Niet-doelen

- Geen advertentie-, remarketing- of social-pixels activeren.
- Geen CRM, formulierprovider of serverendpoint verzinnen zonder een door Ami Amis beheerde keuze en credentials.
- Geen bestaande art direction of inhoudelijke pagina-opbouw herwerken.
- Geen klik als een bevestigde lead rapporteren.

## Huidige toestand

- GA4 `G-QW4PPJD7ST` laadt via GTM `GTM-WZ3LC9DC` met Consent Mode v2.
- De basismeting en `service_problem_cta_click` werken live.
- Het contactformulier opent zonder `NEXT_PUBLIC_CONTACT_ENDPOINT` een vooraf ingevulde e-mail; de deployment configureert momenteel geen endpoint.
- Mail-, telefoon-, Calendly-, case- en video-interacties hebben nog geen complete, centrale eventlaag.
- De cookievoorkeur wordt zonder vervaldatum in localStorage opgeslagen.
- De privacytekst noemt GA4 en GTM, maar bevat nog geen leveranciers- en bewaartermijnoverzicht.

## Beslissingen

- Componenten gebruiken één centrale analytics-helper; persoonsgegevens en vrije formuliervelden worden nooit naar Analytics gestuurd.
- `generate_lead` vuurt uitsluitend na een bevestigde succesvolle endpointrespons of een bevestigde externe boeking.
- Klikken op mail, telefoon, Calendly en contact-CTA's blijven intentie-events en zijn geen primaire conversies.
- Videometing gebruikt de GA4-namen `video_start`, `video_progress` en `video_complete`, met vaste mijlpalen van 25, 50 en 75 procent.
- Bestaande UTM-parameters worden veilig doorgegeven aan Calendly.
- De cookiekeuze krijgt een versie, tijdstip en vervaltermijn van zes maanden.
- Nieuwe advertentietags blijven buiten scope; de bestaande advertentietoestemmingen blijven geweigerd.

## Fasen

- [x] Fase 0 — nulmeting en bescherming
- [x] Fase 1 — centrale event- en consentfoundation
- [x] Fase 2 — contact-, Calendly-, case- en videometing
- [x] Fase 3 — privacy, meetdocumentatie en providercontract
- [x] Fase 4 — volledige QA en releasevoorbereiding

## Validatie per fase

- Baseline: `pnpm quality:fast`.
- Componentgedrag: Playwright-tests voor consentverval, kliktracking, formulierfallback, endpoint-success en veilige payloads.
- Videogedrag: eventtests voor start, voortgangsmijlpalen en voltooiing zonder duplicaten.
- Volledige gate: `pnpm quality:fast` en `pnpm quality`.
- Productie-export: alle sitemap- en legacyroutes controleren op status, canonical, consolefouten en trackingbootstrap.
- Livegang pas na expliciete push/deploy-opdracht volgens `AGENTS.md`.

## Risico's en rollback

- Een eventfout mag navigatie, formulierverzending of videobediening nooit blokkeren; analytics-calls zijn daarom defensief en zonder throw.
- De formulierfallback blijft beschikbaar zolang geen echt endpoint is geconfigureerd.
- Trackingwijzigingen zijn centraal terug te draaien via de analytics-helper of de GTM-container.
- Consent blijft bij ontbrekende of ongeldige opslag standaard geweigerd.

## Voortgangslog

- 2026-10-09 — Schone gitstatus en groene `quality:fast`-baseline bevestigd.
- 2026-10-09 — Code-audit vond dat de live deployment geen contactendpoint configureert en formulierinzendingen daarom naar mailto terugvallen.
- 2026-10-09 — GTM naar basistoestemmingsmodus verplaatst: geen Google-tagrequest vóór analytische toestemming.
- 2026-10-09 — Contact-, Calendly-, case- en videomeetevents gecentraliseerd; UTM-attributie blijft na toestemming gedurende de browsersessie beschikbaar.
- 2026-10-09 — Privacytekst en technische meetdocumentatie bijgewerkt; echte lead- en afspraakbevestiging blijft afhankelijk van een gekozen endpoint en Calendly-koppeling.
- 2026-10-09 — GA4-dataretentie voor zowel event- als gebruikersdata op veertien maanden gezet. De zeven afgesproken event-scoped custom dimensions zijn ingericht: service interest, link context, content type, content item, video client, video provider en video percentage.
- 2026-10-09 — De afwijkende footer op de contactpagina kreeg ook toegang tot Cookievoorkeuren; zo kan toestemming op iedere pagina opnieuw worden gewijzigd.
- 2026-10-09 — Volledige productiebouw en 356 Playwright-controles groen voltooid, na een extra herstel van de contactfooter en de bijhorende copy-baseline.

## Eindrapport

- De site gebruikt een consent-first meetlaag: GTM laadt pas na analytische toestemming, bewaart geen campagne-attributie zonder die toestemming en verstuurt geen persoonsgegevens of vrije formuliervelden naar GA4.
- De volledige bovenste funnel is meetbaar: case- en video-interesse, diensten- en contactintentie, e-mail/telefoon/Calendly-kliks en formulierinteractie. GTM, GA4-retentie en de zeven benodigde rapportagedimensies zijn ingericht.
- `generate_lead` en `meeting_scheduled` blijven bewust uit tot respectievelijk een gekozen formulierendpoint en een betrouwbare Calendly-bevestiging bestaan. Zo rapporteert de website geen klik als lead.
- Laatste validatie: `pnpm quality:fast`, productiebuild met 77 statische pagina's en volledige Playwright-suite (356 geslaagd).
