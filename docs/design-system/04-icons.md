# Iconsysteem

## Scope

Het iconsysteem geldt voor functionele UI-iconen: menu, sluiten, pijl, mail, telefoon, locatie, play/pause, volume, externe link, filter en formfeedback.

Grote illustraties, campagnegraphics, handgetekende assets en fotografie vallen buiten dit systeem.

## Architectuur

```txt
app/components/ui/Icon/
  Icon.tsx
  iconRegistry.ts
  Icon.stories.tsx
  Icon.test.tsx
public/assets/brand-icons/
  instagram.svg
  linkedin.svg
  facebook.svg
```

De exacte locatie mag aan de bestaande repo worden aangepast, maar UI en brand marks blijven gescheiden.

## API-richting

```tsx
<Icon name="mail" size="md" decorative />
<Icon name="external-link" size="sm" label="Opent in een nieuw venster" />
```

## Visuele regels

- UI-familie: consistent outlinekarakter en `currentColor`.
- Sizes: 16, 20, 24, 32 px via tokens.
- Icon + label gap: token, standaard 8 px.
- Geen mix van filled en outline zonder semantische reden.
- Geen CSS-schaaltrucs die strokes vervormen.
- Hover/focuskleur komt van de control, niet van individuele SVG-hardcodes.

## Toegankelijkheid

- Decoratief: verborgen voor assistive tech.
- Functioneel: toegankelijk label op de control.
- Social links hebben zichtbare naam of duidelijke `aria-label`.
- Externe-linkicoon is aanvullend; de linktekst blijft betekenisvol.
- Play/pause en mute/unmute communiceren de huidige actie, niet alleen de huidige staat.

## Migratievolgorde

1. Inventariseer inline SVG’s in ContactPage en Footer.
2. Migreer mail/phone/location naar UI registry.
3. Centraliseer social marks als brand assets.
4. Migreer menu/media/filtericonen.
5. Verwijder oude SVG-functies na stories en regressietests.
