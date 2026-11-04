# Tijdelijke rapvideosectie op de homepage

Toegevoegd op 4 november 2026. Alleen de root-homepage `/` krijgt dit blok,
direct onder de oorspronkelijke skydive-header. De header, intro, overige
inhoud en globale styles zijn behouden. Er is niets automatisch gepubliceerd.

## Uitzetten en later weer aanzetten

Wijzig in `src/data/homeRapVideoCampaign.js` uitsluitend:

```js
enabled: false,
```

Herbouw vervolgens met `pnpm build:pages` voor het hoofddomein of
`pnpm build:pages:preview` voor de GitHub Pages-preview. De export is statisch;
alleen de broninstelling veranderen wijzigt een bestaande export niet.

De oorspronkelijke homepage komt dan terug: geen campagnemarkup, speler of
actieve campagnemarges. De bestaande scrollpijl gaat weer rechtstreeks naar
`intro`. De permanente copybaseline blijft ongewijzigd. Voor opnieuw tonen:
`enabled: true` en opnieuw bouwen. De bestaande route `/home-2/` blijft
ongewijzigd doorsturen naar `/` en toont daardoor dezelfde homepage.

Dit is de aanbevolen manier om de tijdelijke campagne weg te halen. Alle
campagnebestanden kunnen blijven staan zonder de pagina te beïnvloeden.

## Afbakening van de implementatie

- `app/page.jsx`: server-side aan/uit-keuze, geeft een optionele `campaignSlot` door.
- `app/components/HomeExperience.jsx`: slot vóór Intro; doel van de bestaande
  scrollpijl volgt de aanwezigheid van het slot. De observer wordt bij een
  wijziging van die aanwezigheid opnieuw ingesteld.
- `app/components/HomeRapVideoCampaign.jsx`: los clientcomponent met eigen
  native dialog. Het Vimeo-iframe en de reeds aanwezige SDK laden na klikken.
  Sluiten ruimt de speler op, herstelt de body-scroll en de focus op de opener.
- `app/styles/components/HomeRapVideoCampaign.module.css`: uitsluitend
  begrensde campagne- en spelerstyles. De directe overgang naar `#intro`
  krijgt alleen een aangepaste marge wanneer de campagnesection bestaat.
- `src/data/homeRapVideoCampaign.js`: schakelaar, Vimeo-ID en posterpad.
- `public/assets/campaigns/rapvideo-2026/still033.jpg`: goedgekeurde originele
  still, 3840 × 2160, geen hercodering of uitsnede.
- `tests/e2e/home-rapvideo.spec.mjs`: aanwezigheid, referentieroute,
  responsive geometrie, lazy Vimeo, accessibility en dialog/focusherstel.
- `tests/e2e/copy-parity.spec.mjs`: voegt alleen bij een ingeschakelde campagne
  de twee goedgekeurde titelteksten aan de verwachte root-copy toe.
- `docs/audits/ASSET_BUDGET.json`: bewust verhoogd met één JPEG van 2.058.669 bytes.

De bronbestanden van Hero, Intro, globale styles, layout, home-polish, de
permanente copyfixture, dependencies en lockfile zijn niet aangepast.
Reeds aanwezige wijzigingen aan Icon, tokens en Studios zijn behouden.

## Herstelbewijs en oorspronkelijke werkstaat

De chatwerkmap bevat `outputs/rapvideo-integratie/herstel/` met:

- `before.json`: branch, HEAD en SHA-256 van 16 bronbestanden vóór integratie.
- `before/`: de bijbehorende oorspronkelijke bestanden.
- `pre-existing-changes.patch` en `pre-existing-status.txt`: de toen al
  aanwezige gebruikerswijzigingen en niet-getrackte bestanden.
- `header-voor.png`, `intro-voor.png`, `dom-voor.json`: nulmeting.
- `dom-uitgeschakeld.json` en `intro-uitgeschakeld.png`: werkelijke
  uitgeschakelde toestand, vóór opnieuw inschakelen.

Bronrepository bij de nulmeting:
`/Users/giosipinna/Documents/Codex/2026-09-15/ma/ami-amis-website`.
Chatwerkmap:
`/Users/giosipinna/Documents/Codex/2026-11-03/gh-repo-clone-amiamiswebsite-ami-amis`.
Branch `codex/aanpassingen`, HEAD
`423c0836d91bcb36b81e2991428c906ff57d0a61`.

De aan/uit-controle in de echte browser bevestigde gelijke headerinhoud,
introductieteksten/links/bediening en sectievolgorde. De reeds bestaande
collage wisselt foto's; die dynamische `IMG`-bronnen zijn geen vaste
herstelbaseline. Zonder campagne is er geen iframe en gaat de pijl naar
Intro met de oorspronkelijke marge. De campagne is daarna weer aangezet.

## Eventueel permanent opruimen

Doe dit later gericht, met behoud van wijzigingen die ondertussen zijn gemaakt:

1. Zet de schakelaar eerst uit, herbouw en controleer de homepage.
2. Verwijder uit `app/page.jsx` de campagne-imports en het `campaignSlot`-prop;
   behoud `<HomeExperience variant="home2" />` en bestaande metadata.
3. Verwijder uit HomeExperience alleen het slot, `hasCampaign` en de daarvan
   afhankelijke effectdependency. Het oorspronkelijke pijl-doel is `intro`.
   De `before/`-kopie bevat het exacte oorspronkelijke bestand als referentie.
4. Verwijder alleen de nieuwe campagnecomponent, CSS Module, configuratie,
   campagneposter en campagnetest. Verwijder de tijdelijke conditionele
   copytoevoeging uit `copy-parity.spec.mjs`; behoud de permanente fixture.
5. Voer `pnpm assets:baseline` opnieuw uit op de dan actuele assets.
   Kopieer de oude assetbudgetfile niet blind terug: die bevat ook ouder werk.
6. Controleer `pnpm quality:fast`, `pnpm quality` en de overgang header → intro.

Gebruik geen brede `git reset`, `git restore .` of stash voor deze campagne.
De herstelkopieën documenteren de nulmeting; het zijn geen instructies om
latere bronwijzigingen automatisch te overschrijven.

## Media en releasegegevens

Titel: **Ami Amis Rapvideo**. Vimeo: `1242780771`. De embed gebruikt `dnt=1`
en wordt pas na de afspeelactie geladen. De bezoekersinterface toont alleen
de eigen play/pause, speelbalk, geluid, fullscreen en het kruisje rechtsboven.
Een laadfout geeft een directe Vimeo-link. Geen extra zichtbare modaltitel.

Bij iedere bewuste opening zet de SDK het volume eerst op 100% en mute uit,
vóór afspelen. Daarna kan de bezoeker het geluid zelf aanpassen. Het iframe
start niet zelfstandig, zodat het niet eerst gedempt begint.

Voor een publieke release blijft controle/aanlevering van NL-captions of een
transcript een contentpunt. Er is geen tekst of captiontrack verzonnen.
Push is op 4 november 2026 apart goedgekeurd voor de gerichte campagnecommit
op `codex/aanpassingen`. Uitzetten blijft dezelfde enkele broninstelling.
De bestaande deploymentworkflow publiceert alleen na een push op `main` of
een expliciete workflowstart.
