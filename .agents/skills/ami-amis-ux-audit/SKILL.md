---
name: ami-amis-ux-audit
description: Audit een Ami Amis-pagina, flow of component op hiërarchie, conversie, responsive gedrag, toegankelijkheid en bewijs. Gebruik vóór grote refactors of wanneer de gebruiker vraagt wat beter kan; implementeer alleen wanneer dat expliciet bij de taak hoort.
---

# Ami Amis UX-audit

## Input

- route, flow of component;
- doel van de pagina;
- primaire doelgroep en actie;
- bestaande code, content en screenshots.

## Werkwijze

1. Bepaal de primaire gebruikersvraag en gewenste actie.
2. Doorloop de ervaring als:
   - nieuwe bezoeker;
   - potentiële klant die bewijs zoekt;
   - keyboardgebruiker;
   - mobiele gebruiker;
   - bezoeker met reduced motion;
   - crawler/no-JS fallback waar relevant.
3. Controleer:
   - informatiehiërarchie en één duidelijke H1;
   - waardepropositie, bewijs en CTA-volgorde;
   - navigatie en oriëntatie;
   - interactiestates en foutscenario’s;
   - leesbaarheid en contentdichtheid;
   - responsive en touch;
   - toegankelijkheid;
   - performance-impact;
   - geloofwaardigheid van claims/data.
4. Prioriteer bevindingen:
   - P0 blokkeert taak, vertrouwen of toegankelijkheid;
   - P1 veroorzaakt duidelijke frictie/inconsistentie;
   - P2 optimalisatie of polish.
5. Scheid geverifieerde problemen van hypotheses.
6. Geef per bevinding een concrete acceptatiecheck.

## Outputformat

- doel en hoofdflow;
- wat werkt;
- P0/P1/P2-tabel;
- aanbevolen volgorde;
- meetpunten en acceptatiecriteria.
