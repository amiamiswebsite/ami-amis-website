# Gecontroleerde publicatie naar amiamis.com

## Doel

De laatste lokaal goedgekeurde website in één push naar main publiceren, na volledige productievalidatie. De bestaande live site blijft beschikbaar tot het gevalideerde artifact wordt gepubliceerd.

## Niet-doelen

Geen redesign, inhoudelijke wijzigingen of nieuwe functionaliteit.

## Huidige toestand

Lokale branch restore/yesterday-evening-2026-08-26 en origin/main beginnen op f30a0082cdb9995a5a471cd931e78abff2ec1046. Alle bedoelde websitewijzigingen zijn nog lokaal. Oude, ongetrackte auditscreenshots vallen buiten deze release. Het domein amiamis.com en HTTPS zijn actief.

## Beslissingen

- build:pages maakt het lege productiebasepath expliciet, zodat een lokale previewvariabele nooit de productie-export kan veranderen.
- De workflow controleert de volledige bestaande testsuite, inclusief de recent toegevoegde video-, timeline- en scrolltests.
- Een artifactcheck valideert CNAME, rootroutes, lokale verwijzingen en het ontbreken van de oude repositoryprefix.
- GitHub Pages staat nog op legacy naast de Next.js-workflow. Na lokale goedkeuring wordt uitsluitend de publicatiebron op workflow gezet, met behoud van domein en HTTPS, vóór de enige push.
- Bestaande ongetrackte screenshots blijven lokaal. Geen force-push of wijziging aan eerdere commits.

## Fasen

- [x] Gitstatus, huidige main en live configuratie inspecteren.
- [x] Productiegates en rootpad expliciet vastleggen.
- [x] Frozen dependency-install, quality:fast, productiebuild en volledige testsuite.
- [x] Productie-export op desktop en mobiel controleren: home, diensten, werk, Imore en contact.
- [x] Artifact, assets, links, console, overflow, video en contactflow valideren.
- [ ] Pages-bron veilig corrigeren, bedoelde bestanden committen en één keer naar main pushen.
- [ ] GitHub Action success afwachten en live home, case en contact controleren.

## Validatie

Exacte logs en screenshots worden in de werkmap van deze Codex-taak opgeslagen. Alle runtimechecks gebruiken de statische productie-export op rootpad, met zes relevante schermbreedtes. De GitHub-workflow moet dezelfde commit publiceren die lokaal is gecontroleerd.

## Risico en rollback

De oude branchpublicatie kan de bronbestanden ten onrechte publiceren en wordt vóór de push uitgeschakeld door de bestaande Pages-site op workflow te zetten. De vorige succesvolle Next.js-deployment is run 34126152451 op f30a008. Bij een lokaal kritiek probleem volgt geen push. Een mislukte qualityjob mag geen nieuw Pages-artifact publiceren; de vorige deployment blijft de herstelbasis.

## Voortgang

Configuratie en huidige live HTTP 200 bevestigd. Domeincertificaat goedgekeurd en HTTPS afgedwongen. Lokale wijzigingen beperken zich tijdens deze release tot deployment en validatie.

## Resultaten vóór publicatie

- Schone kandidaatkopie met Node 22.23.2 en frozen lockfile: quality:fast, productiebuild en 309/309 tests geslaagd.
- Productiebuild met bewust ingestelde oude previewvariabele levert correct rootpad op. Artifactcontrole: 65 HTML-bestanden en 252 lokale verwijzingen; geen ontbrekende paden of oude productieprefix.
- 30 pagina-/viewportcontroles op de vijf vereiste pagina’s en zes schermbreedtes geslaagd; afbeeldingen, fonts, styles, interne links en overflow gecontroleerd. Geen eigen resource-, console- of hydrationfouten.
- Vimeo blokkeerde de geautomatiseerde verbinding met een beveiligingsmelding. Onafhankelijke controle in de app-browser bevestigde de bewegende dienstenvideo en afspelen, pauzeren en doorspoelen van Imore Project N. De externe beveiligingsmeldingen zijn daarom apart geregistreerd en niet als applicatiefout behandeld.
- Imore Fintro: echte native playback, pauzeren en seek bevestigd. Volgende-case-link, diensten-naar-contact-prefill, veldvalidatie en mailfallback werken; niets verzonden.
- De gebruiker heeft Pages op GitHub Actions gezet. API bevestigt build_type=workflow, cname=amiamis.com, https_enforced=true. De bestaande live site bleef HTTP 200 antwoorden.
- Alle 526 kandidaatbronbestanden gecontroleerd tegen de lokale versie; alleen dit releaselog is daarna aangevuld. De gepubliceerde bron wordt dezelfde gecontroleerde versie.
