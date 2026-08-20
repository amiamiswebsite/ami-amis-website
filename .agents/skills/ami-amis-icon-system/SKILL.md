---
name: ami-amis-icon-system
description: Centraliseer, selecteer en implementeer iconen voor de Ami Amis-site. Gebruik bij nieuwe iconen, inline SVG-opruiming, social marks of icon-only controls; niet voor illustraties, fotografie of grote merkgraphics.
---

# Ami Amis icon system

## Principes

- UI-iconen vormen één consistente outlinefamilie.
- Brand- en sociallogo’s blijven officiële, aparte assets.
- Een icoon verduidelijkt een taak; het vervangt geen essentieel label tenzij de conventie glashelder is.

## Werkwijze

1. Inventariseer bestaand inline SVG- en afbeeldingsgebruik.
2. Classificeer elk item als:
   - functioneel UI-icoon;
   - brand/social mark;
   - illustratie/decoratie.
3. Migreer functionele iconen naar één `Icon`-component en registry.
4. Gebruik `currentColor`, gestandaardiseerde viewBox, size tokens en consistente stroke.
5. Gebruik standaardmaten 16, 20, 24 en 32 px; controls houden minimaal 44×44 px hit area.
6. Decoratief: `aria-hidden="true"` en geen overbodige accessible name.
7. Functioneel icon-only: toegankelijke naam via zichtbaar label of `aria-label`.
8. Houd social marks centraal en test contrast/hover/focus.
9. Verwijder losse pagina-inline SVG’s na migratie.

## Output

- icon inventory;
- registry/API;
- stories met sizes/states;
- accessibilitychecks;
- lijst van resterende custom assets.
