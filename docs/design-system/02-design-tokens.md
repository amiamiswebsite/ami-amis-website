# Designtokens

## Waarom

Tokens maken designbeslissingen expliciet en herbruikbaar. Ze voorkomen dat kleuren, spacing, radii, schaduwen en timings per component opnieuw worden uitgevonden.

## Drie lagen

### 1. Reference

Ruwe merkwaarden zonder UI-betekenis:

- palette.red.500
- palette.yellow.500
- palette.blue.500
- palette.paper.500
- palette.ink.500
- space.4
- radius.3
- duration.fast

### 2. Semantic

Betekenis in de interface:

- color.background.canvas
- color.background.brand
- color.text.primary
- color.text.inverse
- color.border.strong
- color.focus.ring
- motion.feedback.duration

### 3. Component

Beslissingen die specifiek bij een component horen:

- button.primary.background
- button.radius
- button.shadow.offset
- nav.overlay.background
- card.project.radius
- icon.size.md

## Gebruiksregels

- Componentcode gebruikt semantic of component tokens.
- Reference tokens worden alleen in tokenbestanden gealiast.
- Een nieuwe tokennaam beschrijft een rol, niet een momentane kleurwaarde.
- Voeg geen token toe voor één willekeurige afwijking; controleer eerst of het component moet worden vereenvoudigd.
- Generated CSS is read-only en wordt door de tokenbuild gemaakt.

## CSS-naamgeving

Voorgesteld patroon:

```css
--aa-color-bg-canvas
--aa-color-text-primary
--aa-space-4
--aa-radius-control
--aa-motion-duration-feedback
--aa-button-primary-bg
```

## Bestaande merkwaarden

- rood: `#FF3500`
- geel: `#FABB00`
- blauw: `#0061FC`
- oranje: `#F29A2C`
- sky: `#449AFF`
- paper: `#FFFAE5`
- ink: `#1C1C1C`

Deze waarden zijn reference seeds. Contrast en context worden op semantic niveau beslist.

## Implementatie

- Valideer de JSON-seeds tegen de actuele DTCG- en Style Dictionary-versie.
- Genereer CSS variables in een expliciete generated map.
- Voeg een CI-check toe die faalt wanneer generated tokens niet overeenkomen met de bron.
- Documenteer tokens visueel in Storybook.
