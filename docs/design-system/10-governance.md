# Governance

## Wanneer een token wijzigen

Wijzig een token wanneer een gedeelde ontwerpbeslissing verandert. Gebruik geen globale token om één component visueel te repareren.

## Wanneer een component maken

Maak een reusable component wanneer:

- hetzelfde patroon minstens twee keer bestaat;
- gedrag of toegankelijkheid centraal moet worden bewaakt;
- een toekomstige variant waarschijnlijk is.

Een unieke hero-illustratie hoeft geen generieke component te worden.

## Reviewvragen

- Is dit herkenbaar Ami Amis?
- Lost het een gebruikersprobleem op?
- Gebruikt het bestaande tokens/patronen?
- Is een nieuwe variant echt nodig?
- Werkt het met keyboard, touch, zoom en reduced motion?
- Is de content waar en duidelijk?
- Is de performance-impact gemeten?
- Zijn story en tests bijgewerkt?

## Design debt

Houd `docs/design-system/design-debt.md` bij met:

- probleem;
- route/component;
- impact;
- prioriteit;
- eigenaarstype: design, content, development of businessdata;
- voorgestelde oplossing;
- datum.

## Releasecadans

- Kleine componentfix: relevante story/test + check.
- Pagina-aanpassing: baselinevergelijking + keyboardcheck.
- Systeemwijziging: plan, componentreview, volledige CI en documentatie.

## Beslissingslog

Nieuwe structurele designbeslissingen gaan in `docs/design-system/decisions/` met context, keuze, alternatieven en gevolg. Zo hoeft Codex dezelfde discussie niet opnieuw te voeren.
