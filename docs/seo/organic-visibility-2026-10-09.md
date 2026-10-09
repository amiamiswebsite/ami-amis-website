# SEO-audit: organische zichtbaarheid

## Scope

Deze audit verbetert uitsluitend niet-zichtbare SEO-elementen: paginatitels,
meta descriptions, robotsinstructies en structured data. De zichtbare copy,
volgorde, cases en vormgeving blijven ongewijzigd.

## Bevindingen

De merknaam Ami Amis wordt al correct gekoppeld aan de website. De homepage en
belangrijkste landingspagina's gebruikten in hun titel en snippet vooral de
merkbelofte “creatieve groeipartner”. Die term is onderscheidend, maar sluit
niet direct aan op de concrete zoekintentie van een prospect.

Een actuele controle van de organische zoekresultaten voor Antwerpen toont dat
vergelijkbare bureaus zich consequent positioneren rond videoproductie, video
content, videomarketing, social content en creatieve campagnes. Voorbeelden:

- [Ohana: video content bureau Antwerpen](https://weareohana.co/)
- [Club Gewoon: creatief contentbureau Antwerpen](https://www.clubgewoon.be/)
- [HighTide: creatief en social media bureau Antwerpen](https://hightide.be/?lang=nl)
- [Movid: videoproductiehuis in Antwerpen](https://www.movid.be/)

Dit is een kwalitatieve SERP-analyse, geen zoekvolume-onderzoek. Kies pas
nieuwe contentthema's na toetsing aan Search Console-impressies en -posities.

## Keywordmap

| Prioriteit | Zoekintentie                         | Beste pagina                                         | Gebruikt in metadata |
| ---------- | ------------------------------------ | ---------------------------------------------------- | -------------------- |
| Hoog       | videoproductie Antwerpen             | `/` en `/diensten/`                                  | Ja                   |
| Hoog       | video content bureau Antwerpen       | `/` en `/team/`                                      | Ja                   |
| Hoog       | social content bureau Antwerpen      | `/` en `/diensten/`                                  | Ja                   |
| Hoog       | creatieve campagnes Antwerpen        | `/diensten/` en `/work/`                             | Ja                   |
| Middel     | fotografie en content Antwerpen      | `/` en `/work/`                                      | Ja                   |
| Middel     | videomarketing Antwerpen             | toekomstige, inhoudelijk goedgekeurde landingspagina | Nee                  |
| Middel     | employer-brandingvideo Antwerpen     | toekomstige, inhoudelijk goedgekeurde landingspagina | Nee                  |
| Middel     | aftermovie of eventvideo laten maken | toekomstige, inhoudelijk goedgekeurde landingspagina | Nee                  |

## Doorgevoerde verbeteringen

- Iedere commerciële hoofdpagina heeft een unieke, natuurlijke titel met een
  dienst en Antwerpen waar dat relevant is.
- Meta descriptions benoemen alleen diensten die Ami Amis al aanbiedt:
  videoproductie, social content, campagnes, fotografie en strategie.
- De globale robotsmetadata staat indexering, volgen, grote afbeeldingspreview,
  onbeperkte snippets en videopreview toe.
- De bestaande `Organization`-markup bevat nu de juridische naam, locatie,
  werkgebied, diensten en een verbonden `WebSite`-entiteit.
- Canonicals blijven ongewijzigd. De oude `/ons-werk/`-routes verwijzen
  doelbewust met een canonical naar `/work/`; “Alternatieve pagina met correcte
  canonieke tag” is voor die duplicaatroutes daarom een verwacht Search
  Console-signaal, geen indexeringsfout.

## Wat vervolgens meten

Controleer maandelijks in Search Console, telkens voor de laatste 90 dagen:

1. Queries met minstens 20 impressies en een gemiddelde positie 8–20.
2. Pagina's met hoge impressies maar lage CTR; verbeter daar eerst titel en
   description, zonder de zoekintentie te veranderen.
3. De verhouding tussen branded (`ami amis`) en non-branded queries zoals
   `videoproductie antwerpen`.
4. Voor `/diensten/`, `/work/` en `/contact/`: organische klikken, engaged
   sessions en contactintentie in GA4.

Maak pas nieuwe servicepagina's voor videomarketing, employer branding of
aftermovies wanneer er goedgekeurde, unieke zichtbare copy en voorbeelden zijn.
Zo voorkomen we dunne of concurrerende pagina's.
