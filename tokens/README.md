# Token-seeds

Deze bestanden zijn een gecontroleerd startpunt, geen blind te importeren eindproduct.

## Lagen

- `reference.tokens.json` — ruwe merkwaarden.
- `semantic.tokens.json` — UI-rollen.
- `component.tokens.json` — componentbeslissingen.

## Implementatiestappen voor Codex

1. Installeer een actuele, compatibele tokenbuilder.
2. Valideer DTCG-syntax en aliasresolutie tegen de geïnstalleerde versie.
3. Vergelijk alle bestaande CSS-variabelen en computed styles.
4. Maak een Style Dictionary-config of een kleine deterministische generator.
5. Genereer CSS naar een expliciete generated map.
6. Voeg `tokens:build` en `tokens:check` toe.
7. Documenteer tokens in Storybook.
8. Migreer componenten stapsgewijs; verwijder oude variabelen pas na regressietests.

De fontfamilienamen verwijzen naar bestaande lokale repo-assets. Dit pakket bevat geen fonts en mag die niet exporteren.
