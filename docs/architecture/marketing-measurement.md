# Marketingmeting

## Meetmodel

De website gebruikt GA4-property `G-QW4PPJD7ST` via GTM-container
`GTM-WZ3LC9DC`. De website laadt GTM pas nadat de bezoeker analytische
toestemming geeft. Advertentie-, personalisatie- en remarketingtoestemming
blijven geweigerd.

De broncode verstuurt geen namen, e-mailadressen, telefoonnummers,
formulierberichten of volledige externe URL's naar Analytics. Vrije tekst hoort
nooit in eventparameters.

## Funnel en events

| Fase       | Event                       | Betekenis                              | Primaire conversie   |
| ---------- | --------------------------- | -------------------------------------- | -------------------- |
| Interesse  | `select_content`            | Een bezoeker opent een case            | Nee                  |
| Interesse  | `video_start`               | Een case- of teamvideo start           | Nee                  |
| Engagement | `video_progress`            | Een video bereikt 25, 50 of 75 procent | Nee                  |
| Engagement | `video_complete`            | Een video eindigt                      | Nee                  |
| Intentie   | `service_problem_cta_click` | CTA bij een dienstenprobleem           | Nee                  |
| Intentie   | `contact_intent_click`      | Interne link naar contact              | Nee                  |
| Intentie   | `contact_choice`            | Keuze op de contactpagina              | Nee                  |
| Intentie   | `contact_form_start`        | Eerste interactie met het formulier    | Nee                  |
| Intentie   | `contact_click`             | Klik op e-mail of telefoon             | Nee                  |
| Intentie   | `book_meeting_click`        | Klik naar Calendly                     | Nee                  |
| Fallback   | `contact_form_fallback`     | Formulier opent e-mailclient           | Nee                  |
| Fout       | `contact_form_error`        | Endpoint kon niet afleveren            | Nee                  |
| Lead       | `generate_lead`             | Endpoint bevestigt duurzame aflevering | **Ja**               |
| Afspraak   | `meeting_scheduled`         | Calendly/webhook bevestigt een boeking | **Ja, na koppeling** |

Een klik is nooit een lead. `generate_lead` mag alleen na een bevestigde
succesrespons worden verzonden. `meeting_scheduled` vereist een Calendly-webhook
of een ingebedde Calendly-flow die het bevestigingsevent betrouwbaar ontvangt.

## Eventparameters

Registreer in GA4 alleen dimensies die nodig zijn voor rapportage:

| Parameter                                                   | Voor events                      | Gebruik                                          |
| ----------------------------------------------------------- | -------------------------------- | ------------------------------------------------ |
| `source_path`                                               | contact-, case- en meetingclicks | Pagina van vertrek                               |
| `link_context`                                              | click-events                     | `page`, `navigation`, `footer` of `contact_page` |
| `content_type`, `item_id`                                   | `select_content`                 | Case-interesse                                   |
| `service_interest`                                          | form-events                      | Veilige interne service-ID                       |
| `contact_method`                                            | `contact_click`                  | `email` of `phone`                               |
| `form_name`, `lead_method`                                  | form- en lead-events             | Formulieridentiteit en leadroute                 |
| `video_client`, `video_id`, `video_provider`, `video_title` | video-events                     | Publieke videocontext                            |
| `video_percent`, `video_current_time`, `video_duration`     | video-events                     | Voortgang en voltooiing                          |

`problem_id`, `problem_number`, `problem_title`, `cta_label` en `source` blijven
beschikbaar voor de bestaande dienstenfunnel. Gebruik `problem_title` alleen met
redactioneel beheerde titels.

## Campagneafspraken

Gebruik voor iedere campagne dezelfde lowercase naamgeving:

- `utm_source`: platform of partner, bijvoorbeeld `linkedin` of `newsletter`;
- `utm_medium`: kanaaltype, bijvoorbeeld `paid_social`, `organic_social` of `email`;
- `utm_campaign`: stabiele campagnenaam, bijvoorbeeld `zomercampagne_2026`;
- `utm_content`: creatieve variant, bijvoorbeeld `video_bert_v1`;
- `utm_term`: alleen wanneer een relevante zoekterm nodig is.

Na analytische toestemming bewaart de site de aanwezige UTM-waarden voor de
lopende browsersessie. Calendly krijgt die waarden mee. Een toekomstig
contactendpoint ontvangt ze als `marketing_attribution`.

## GA4-inrichting

1. Markeer `generate_lead` als key event.
2. Markeer `meeting_scheduled` pas als key event wanneer de bevestigde koppeling
   live en getest is.
3. Maak event-scoped custom dimensions voor de parameters waarop het team echt
   rapporteert; begin met `service_interest`, `link_context`, `content_type`,
   `item_id`, `video_client`, `video_provider` en `video_percent`.
4. Stel eventdataretentie in op veertien maanden en controleer de instelling
   ieder kwartaal.
5. Sluit intern verkeer pas uit wanneer de vaste kantoor- en test-IP's bekend
   zijn. Verzin of gok geen IP-adressen.
6. Gebruik DebugView en Realtime voor releasecontrole; gebruik standaardrapporten
   pas na 24 tot 48 uur voor beslissingen.

## Rapportage

De kernrapportage beantwoordt maandelijks vier vragen:

1. Welke bron/campagne brengt relevante bezoeken?
2. Welke cases en video's creëren engagement?
3. Welke diensten leiden tot contactintentie?
4. Hoeveel bevestigde leads en afspraken ontstaan, en welke worden klant?

De laatste vraag wordt volledig zodra een gekozen formulier-/CRM-endpoint en
Calendly-bevestiging zijn gekoppeld. Voeg daarna CRM-kwalificatie toe buiten de
publieke website: leadstatus, dealwaarde en gewonnen omzet. Stuur die gegevens
nooit als vrije tekst naar de browser.

## Releasecontrole

- Zonder toestemming bestaat er geen GTM-netwerkrequest en geen
  campagnesessie-opslag.
- Na toestemming laadt GTM één keer en verschijnen events één keer in DebugView.
- Video-start, mijlpalen en voltooiing zijn per speler gededupliceerd.
- E-mail-, telefoon- en Calendly-clicks bevatten geen contactgegevens of URL.
- Een mislukte formulierrespons verstuurt geen `generate_lead`.
- De privacytekst, consentversie en leverancierslijst worden bij iedere nieuwe
  tag of provider samen bijgewerkt.
