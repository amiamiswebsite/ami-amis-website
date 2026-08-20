# Uitvoerplannen voor grote websitewijzigingen

Gebruik voor elke wijziging die meerdere routes, componenten of kwaliteitslagen raakt een plan in `docs/plans/`.

## Verplicht planformat

```md
# [Naam van de wijziging]

## Doel

Welk zichtbaar of technisch resultaat moet er aan het einde bestaan?

## Niet-doelen

Wat wordt bewust niet aangepakt?

## Huidige toestand

Relevante routes, componenten, styles, data, assets en bekende risico’s.

## Beslissingen

Belangrijkste UX-, design- en technische keuzes met rationale.

## Fasen

- [ ] Fase 0 — nulmeting en bescherming
- [ ] Fase 1 — foundation
- [ ] Fase 2 — componenten
- [ ] Fase 3 — pagina-integratie
- [ ] Fase 4 — QA en documentatie

## Validatie per fase

Welke commands, stories, screenshots, keyboardflows en contentchecks bewijzen dat de fase klopt?

## Risico’s en rollback

Hoe wordt regressie beperkt en hoe kan de wijziging veilig worden teruggedraaid?

## Voortgangslog

Datum, uitgevoerd werk, afwijkingen en nieuwe bevindingen.

## Eindrapport

Gewijzigde bestanden, testresultaten, resterende debt en eventuele handmatige reviewpunten.
```

## Werkregels

- Het plan is een levend document; update checkboxes en beslissingen tijdens het werk.
- Een groot plan begint met een werkende baselinebuild.
- Visuele migratie gebeurt per component of sectie, niet door de hele CSS in één keer te herschrijven.
- Een fase is pas klaar wanneer de validatie is uitgevoerd en genoteerd.
- Onbekende content of businessdata blokkeert de technische refactor niet: gebruik een expliciete content-debtmarker.
