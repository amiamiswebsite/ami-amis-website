# Huidige repo-bevindingen

Baseline van 14 augustus 2026; altijd opnieuw verifiëren vóór implementatie.

## Stack

- Next.js 16-range, React 19-range.
- App Router.
- Statische export met GitHub Pages base path.
- GitHub Action bouwt `out/` en publiceert dat artifact.

## Geobserveerde debt

- `package.json`: alleen dev/build/start; geen zichtbare QA-tooling.
- `app/globals.css`: circa 633.956 bytes.
- Homepage root is client-side en beheert section reveals globaal.
- Hero bevat omvangrijke pointer/scrollmotion en reduced-motioncheck.
- Intro gebruikt een tweede H1.
- Contact form gebruikt `mailto:`.
- Contact/Footer bevatten eigen inline SVG-functies.
- Nav overlay heeft Escape/body lock, maar focus trap/return is niet zichtbaar in de bekeken component.
- Rootmetadata is minimaal.
- Repo bevat broncode én gegenereerde exportoutput.

## Eerst verifiëren

- actuele branch en oncommitted wijzigingen;
- of gegenereerde output bewust getrackt is;
- werkelijke CSS-dead code versus noodzakelijke selectors;
- huidige client bundle en Core Web Vitals;
- actuele accessibility findings;
- echte bron van social metrics;
- echte form endpointbehoefte;
- fontlicentie en gewenste laadstrategie;
- welke teksten definitief door de klant zijn goedgekeurd.
