# Motion

## Rol

Motion geeft Ami Amis energie en filmisch karakter. Het is geen permanente achtergrondruis.

## Prioriteiten

1. signature storytelling, zoals de skydive-hero;
2. duidelijke interfacefeedback;
3. overgang en oriëntatie;
4. decoratie, alleen wanneer de eerste drie niet lijden.

## Tokenrichting

- instant: 0 ms bij reduced motion;
- quick: 120 ms;
- feedback: 200 ms;
- transition: 320 ms;
- expressive: 600 ms;
- standaard easing: gecontroleerde ease-out;
- expressive easing: alleen voor hero/merkbeweging.

## Regels

- Animeer bij voorkeur transform en opacity.
- Maximaal één hoofdbeweging per sectie.
- Geen scrolljacking.
- Geen noodzakelijke content die pas na animatie bestaat.
- Pauzeer/stop langdurige beweging buiten viewport.
- Gebruik pointer parallax alleen op geschikte pointers; touch blijft stabiel.
- Voorkom layout shift door vaste dimensies en stabiele startstates.

## Reduced motion

Bij `prefers-reduced-motion: reduce`:

- content staat meteen op eindpositie;
- parallax en decoratieve loops zijn uit;
- feedback blijft duidelijk via kleur, border of onmiddellijke state;
- video autoplay wordt vermeden of eenvoudig te stoppen.

## Testen

- Storybook reduced-motionvariant;
- Playwright-emulatie voor reduced motion;
- keyboard en touch zonder afhankelijkheid van hover;
- performanceprofiel voor hero listeners en RAF-cycli.
