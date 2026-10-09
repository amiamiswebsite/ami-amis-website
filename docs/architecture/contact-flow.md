# Contactflow

## Huidig gedrag

Zonder `NEXT_PUBLIC_CONTACT_ENDPOINT` valideert het formulier lokaal en opent het
een vooraf ingevulde e-mail naar `brent@amiamis.be`. De knop noemt dit gedrag
expliciet; de pagina toont geen verzonnen successtatus.

De fallback registreert `contact_form_fallback` en `contact_click`. Dat zijn
intentie-events. Er wordt in deze route bewust geen `generate_lead` verstuurd,
omdat de website niet kan vaststellen of de bezoeker de e-mail werkelijk
verzendt.

## Echte endpointintegratie

Stel `NEXT_PUBLIC_CONTACT_ENDPOINT` alleen in op een door Ami Amis gekozen en
beheerd HTTPS-endpoint dat JSON aanvaardt. De client verstuurt naam, e-mail,
telefoon, onderwerp, bericht en de optionele dienstencontext. Na toestemming
worden eventuele UTM-parameters toegevoegd onder `marketing_attribution`. De bestaande UI
bevat loading-, success- en errorstates en houdt bij een fout de mailtofallback
beschikbaar.

Alleen een HTTP 2xx-respons activeert `generate_lead`. Het endpoint moet daarom
pas succes teruggeven nadat de aanvraag duurzaam is opgeslagen of naar de
gekozen inbox/CRM is afgeleverd.

Nog te beslissen door de business:

- provider en verwerkersovereenkomst;
- endpoint-URL en toegestane origin;
- spambeveiliging/rate limiting;
- bewaartermijn en privacytekst;
- ontvanger en operationele opvolging.

De statische GitHub Pages-site kan zelf geen secrets, webhookvalidatie of
server-side CRM-koppeling uitvoeren. Plaats die verantwoordelijkheden in het
gekozen endpoint.

Een secret hoort nooit in een `NEXT_PUBLIC_*`-variabele of in de repository.
