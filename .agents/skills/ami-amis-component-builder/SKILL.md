---
name: ami-amis-component-builder
description: Bouw of refactor herbruikbare Ami Amis React-componenten met tokens en tests. Gebruik voor buttons, cards, forms, navigatie, sectiepatronen en andere gedeelde UI; niet voor eenmalige content-only wijzigingen.
---

# Ami Amis component builder

## Werkwijze

1. Lees het componentcontract en relevante tokens.
2. Zoek bestaande gelijkaardige componenten en voorkom duplicatie.
3. Definieer vóór code:
   - verantwoordelijkheid;
   - semantisch HTML-element;
   - minimale props;
   - varianten;
   - states;
   - contentlimieten;
   - responsive gedrag;
   - accessibilitygedrag.
4. Bouw in TypeScript wanneer het een nieuw of aangeraakt gedeeld component is.
5. Gebruik alleen semantic/component tokens; geen ad-hoc hex, spacing, radius of timing.
6. Leg varianten vast in tests en, zodra Storybook is geïnstalleerd, in stories voor:
   - default;
   - alle varianten en states;
   - lange Nederlandse content;
   - mobiel/smal;
   - keyboard/focus;
   - error/loading/disabled waar relevant;
   - reduced motion waar relevant.
7. Voeg interactiontests en axe-checks toe waar gedrag bestaat.
8. Integreer pas daarna in pagina’s en verwijder legacycode na visuele vergelijking.

## Definition of done

- semantische, kleine API;
- geen duplicaatcomponent;
- tokengebruik;
- keyboard- en screenreaderproof;
- relevante tests en, zodra beschikbaar, stories;
- geen console/hydration errors;
- documentatie bijgewerkt.
