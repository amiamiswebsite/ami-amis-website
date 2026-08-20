# Contactflow

## Huidig gedrag

Zonder `NEXT_PUBLIC_CONTACT_ENDPOINT` valideert het formulier lokaal en opent het
een vooraf ingevulde e-mail naar `brent@amiamis.be`. De knop noemt dit gedrag
expliciet; de pagina toont geen verzonnen successtatus.

## Echte endpointintegratie

Stel `NEXT_PUBLIC_CONTACT_ENDPOINT` alleen in op een door Ami Amis gekozen en
beheerd HTTPS-endpoint dat JSON aanvaardt. De client verstuurt naam, e-mail,
telefoon, onderwerp, bericht en de optionele dienstencontext. De bestaande UI
bevat loading-, success- en errorstates en houdt bij een fout de mailtofallback
beschikbaar.

Nog te beslissen door de business:

- provider en verwerkersovereenkomst;
- endpoint-URL en toegestane origin;
- spambeveiliging/rate limiting;
- bewaartermijn en privacytekst;
- ontvanger en operationele opvolging.

Een secret hoort nooit in een `NEXT_PUBLIC_*`-variabele of in de repository.
