# Toegankelijkheidsbaseline

## Doel

WCAG 2.2 AA als minimaal kwaliteitsniveau, aangevuld met praktische keyboard-, zoom-, motion- en mediatests.

## Structuur

- één H1 per route;
- logische H2/H3-volgorde;
- landmarks voor header/nav/main/footer;
- skiplink naar hoofdcontent;
- betekenisvolle linkteksten;
- juiste button/link-semantiek.

## Keyboard en focus

- alle acties bereikbaar zonder muis;
- focus zichtbaar op elke surface;
- overlays houden focus vast en geven hem terug;
- Escape sluit waar verwacht;
- geen keyboard traps;
- carousels en filters hebben begrijpelijke controls en states.

## Forms

- zichtbare labels;
- hint/error via `aria-describedby`;
- required state tekstueel en programmatisch;
- error summary wanneer meerdere fouten bestaan;
- loading blokkeert dubbele submit zonder focus te verliezen;
- success bevestigt wat er gebeurd is;
- mailto-fallback wordt eerlijk benoemd.

## Media

- alttekst beschrijft functie/context, niet elk visueel detail;
- decoratieve beelden hebben lege alt;
- captions of transcript voor betekenisvolle video;
- controls voor play/pause, geluid en fullscreen waar nodig;
- geen autoplay met geluid.

## Visueel

- AA-contrast voor tekst en controls;
- focusindicator niet alleen kleur;
- tekst bruikbaar op 200% zoom;
- content werkt op 320–360 px zonder horizontale taakscroll;
- touch targets idealiter minimaal 44×44 px.

## Testmix

Automatisch:

- axe op componentstories en primaire routes;
- semantic queries in tests;
- broken labels/roles;
- contrast waar tooling betrouwbaar is.

Manueel:

- keyboard-only;
- VoiceOver of vergelijkbare screenreader smoke test;
- 200% zoom;
- reduced motion;
- mobiel/touch;
- captions/transcript.
