# Home UX-polish 24 augustus 2026

## Doel

De actuele home opnieuw verfijnen volgens de goedgekeurde Ami Amis-huisstijl en de aangeleverde copy, met een rustige professionele hiërarchie, betrouwbare responsive composities en functionele micro-interacties.

## Niet-doelen

- Geen herontwerp van andere routes.
- Geen wijziging aan navigatiestructuur, case-inhoud of deployment.
- Geen generieke kaart-, gradient- of schaduwpatronen toevoegen.

## Huidige toestand

De bron staat op `feat/welkom-2-test-redesign` en bouwt schoon als static export. De home gebruikt `HomeExperience`, met secties voor hero, intro, cases, organische groei, testimonials, brainstorm en content. De bestaande Matter.js-tagstage wordt uitgebreid in plaats van vervangen.

## Beslissingen

- De hero behoudt zijn skydivecompositie; descriptor, CTA-afstand, scrollcue en het ontbreken van een gele tekstomlijning worden als één conversion-stack behandeld.
- De intro behoudt zijn asymmetrische beeldcompositie, maar roteert bij een nieuwe paginalaad door een bredere casepool; de centrale showreel blijft verankerd.
- Probleemcards gebruiken één vaste grid- en typehiërarchie met gelijke interne ankers en één gecentreerde diensten-CTA.
- De quote in de rode sectie wordt zelf de CTA; een extra knop vervalt.
- De diensten-tags krijgen een minimalistische fysieke basket, met een sensor voor scorefeedback en natuurlijke doorval. Reduced motion toont een statische maar bruikbare compositie.
- Alleen door de gebruiker aangeleverde cijfers en testimonialcopy worden getoond.

## Fasen

- [x] Fase 0 - nulmeting en bescherming
- [ ] Fase 1 - hero en positionering
- [ ] Fase 2 - probleemcards en creatieve CTA
- [ ] Fase 3 - cases, groei, tags en testimonial
- [ ] Fase 4 - QA en documentatie

## Validatie per fase

- Build voor en na implementatie.
- Browsercaptures op 360, 390, 768, 1024, 1440 en 1920 px.
- Controle op horizontale overflow, headingstructuur, keyboardfocus en reduced motion.
- Interactietest voor casecarousel, CTA's en basket-tagdrag.

## Risico's en rollback

De wijziging blijft beperkt tot homecomponenten, home-data en gerichte CSS. De startstaat is de schone lokale commit `f715dd5`; de teruggedraaide eerste poging staat recoverbaar in `/tmp/ami-amis-redo-backup-20260824` voor de tijdelijke thumbnailkopie.

## Voortgangslog

- 2026-08-24: mislukte niet-gecommitte implementatie gericht verwijderd; baselinebuild geslaagd.

## Eindrapport

Wordt na browser- en qualityvalidatie ingevuld.
