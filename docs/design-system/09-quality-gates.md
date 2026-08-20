# Kwaliteitsgates

## Lokale check

`pnpm quality:fast` omvat de snelle lokale gate:

1. tokens build/check;
2. lint;
3. typecheck;
4. stylelint op de gemigreerde CSS-fundamenten.

`pnpm quality` voegt build, smoke, axe, reduced motion en visuele captures toe. Die volledige gate is verplicht vóór merge of release.

## CI-volgorde

1. dependency install met lockfile;
2. tokens genereren en git-diff check;
3. lint/format/stylelint;
4. Next static export;
5. Playwright smoke/a11y/reduced-motion/visual;
6. deploy job alleen bij groen resultaat.

Unit- en Storybookcomponenttests zijn een geregistreerde vervolgstap. Ze worden pas een harde gate nadat de infrastructuur werkelijk is geïnstalleerd en een eerste betrouwbare baseline heeft.

## Accessibilitygate

- zero serious/critical axe findings;
- geen ontbrekende form labels;
- menu en contactflow keyboardtest;
- manuele checklist als release-artifact.

## Visuele gate

Baseline op Linux CI voor:

- home;
- diensten;
- werk + actieve filter;
- representatieve case;
- team;
- contact default/error/success of fallback;
- menu open;
- reduced motion waar visueel relevant.

Baselinewijzigingen worden expliciet gereviewd; snapshots worden niet blind geaccepteerd.

## Performancegate

- geen layout shifts door ontbrekende media-afmetingen;
- geen nieuwe zware client boundary zonder rationale;
- geen hero- of fontregressie;
- Core Web Vitals meten en rapporteren;
- assetbudget baseren op de nulmeting en daarna bewaken.

## Contentgate

- geen `0,0`, lorem ipsum of onbedoelde placeholder in productie;
- geen `[CONTENT NEEDED]` zonder geregistreerde debt;
- links, telefoon, mail en wettelijke pagina’s gecontroleerd;
- quotes en metrics hebben een bron.
