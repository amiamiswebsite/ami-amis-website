# Applicatiecode

- Behoud per route exact één page-level `h1` en een logische headingvolgorde.
- Houd pagina's server-side waar mogelijk; isoleer interactieve widgets in kleine clientcomponenten.
- Gebruik bestaande casecomposities als inhoudelijke basis. Centraliseer herhaalbaar gedrag, niet unieke art direction.
- Nieuwe CSS gaat naar een begrensde component- of foundationlaag; voeg geen nieuwe overrides onderaan `globals.css` toe.
- Media onder de vouw is lazy of click-to-load, heeft intrinsieke maten of een getest aspect-ratiocontract en een zichtbare foutfallback.
- Betekenisvolle video krijgt minstens een transcript- of captionstrategie; autoplay respecteert reduced motion en viewportzichtbaarheid.
