# Componentcontracten

## Layoutprimitives

### Container

- begrenst contentbreedte en page padding;
- varianten: content, visual, full bleed;
- geen inhoudelijke styling.

### Section

- semantisch element configureerbaar;
- surface, spacing en optional anchor;
- heading en content blijven composable.

### Stack / Inline / Grid

- uitsluitend gestandaardiseerde gap tokens;
- geen willekeurige pixelprops;
- responsive variants klein houden.

## Controls

### Button / LinkButton

Varianten: primary, secondary, ghost.
States: default, hover, focus-visible, active, disabled, loading.
Regels: juiste semantiek, minimaal 44×44 hit area, label blijft duidelijk, iconpositie gestandaardiseerd.

### IconButton

Alleen voor breed herkende acties. Vereist accessible name en tooltip waar herkenning niet vanzelfsprekend is.

### FormField

Beheert label, hint, error, required state en beschrijvingskoppeling. Geen placeholder als vervanging voor label.

## Contentprimitives

### Heading

Visuele stijl en semantisch niveau zijn los van elkaar. Een `display-xl` hoeft niet automatisch een H1 te zijn.

### Text

Beperkte body-, small- en meta-varianten met gecontroleerde measure.

### Tag

Voor categorie of metadata, niet als primaire CTA. Interactief alleen wanneer het semantisch een filter/control is.

## Media

### Media

Beheert aspect ratio, poster, lazy loading, alt/caption en reduced-data/reduced-motionkeuzes.

### ProjectCard

Minimaal: titel, categorie, media, route. Optioneel: korte outcome of diensten. Hele kaart mag klikbaar zijn zonder geneste interactieve elementen.

### Testimonial

Quote, bevestigde naam/organisatie wanneer beschikbaar en relevante case-link. Geen verzonnen attribution.

## Composities

### NavOverlay

Dialog/overlay semantics, initial focus, focus trap, Escape, focus return, scroll lock en routeclose.

### CTASection

Eén primaire actie, optioneel één secundaire. Geen decoratie die de CTA-hit area bedekt.

### ProcessStep

Nummer, titel, korte uitleg en optionele media. Moet zonder carouselinteractie begrijpelijk blijven.

## Storymatrix

Elke reusable component documenteert minimaal:

- default;
- varianten;
- lange Nederlandse copy;
- smalle viewport;
- keyboard focus;
- disabled/loading/error waar relevant;
- dark/brand/paper surface waar relevant;
- reduced motion waar relevant.
