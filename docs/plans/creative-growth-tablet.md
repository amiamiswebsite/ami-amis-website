# Creative growth tablet layout

## Scope

Alleen de responsive compositie van de eerste `intro--home-two`-band wordt aangepast. Copy, media, interne collageposities, desktop vanaf 1280 px en smartphone onder 768 px blijven behouden.

## Aanpak

- [x] Bestaande tabletweergaven vastleggen.
- [x] Structurele oorzaak in het algemene 1180 px-breakpoint identificeren.
- [x] Een 12-kolomsgrid voor brede tablets toevoegen.
- [x] Een 8-kolomsgrid voor portrait-tablets toevoegen.
- [x] Een compacte lage-landscapevariant toevoegen.
- [x] Dezelfde elf viewports na de wijziging vastleggen en beoordelen.
- [x] Overflow, console, assets, zoom en projectchecks valideren.

## Beslissing

De gedeelde DOM blijft behouden. Op tablet maakt `display: contents` de bestaande titel en body afzonderlijk plaatsbaar in het grid; de collage blijft één schaalbare stage met dezelfde procentuele kaartposities en rotaties.

## Validatie

- Elf voor/na-formaten staan in `artifacts/creative-growth-tablet`.
- Op alle elf formaten: geen contentoverlap, geen horizontale pagina-overflow en geen gebroken sectie-assets.
- Lint, stylelint, tokencheck, generated-root-check en productiebuild slagen.
- Gerichte WebKit-controle op 1024x768 en 834x1194 slaagt zonder overlap of overflow.
- De algemene zoom- en copy-paritytests blijven falen op bestaande hero/copy-baselines buiten deze CSS-wijziging.
