# Mitt Hem 2.0

Vidareutveckling av befintliga Mitt Hem. Det separata MittHemTV-projektet ingår inte.

`index.html` behåller den tidigare adressens omdirigering till den privata, anslutna appen. Den aktiva appen använder den befintliga privata Sites-källan och dess ägarinloggning. Detta repo är offentligt; därför ingår inga hemligheter, privata planritningar eller hushållsuppgifter här.

## Återanvändbara delar

- `src/kitchen.mjs`: exakta grundmängder, portioner 1–30, enheter, summerad inköpslista, sökning och varierade veckoförslag.
- `src/recipes.json`: egna kuraterade mat- och drinkrecept, inte en livekopplad extern databas.
- `src/preferences.mjs`: begränsad validerad modell för privata favoriter, listor och planering.
- `src/preference-store.mjs`: ägaravgränsad D1-lagring med versionskontroll. Tabellen skapas genom en separat migration i den privata appen, aldrig vid en begäran.
- `test/kitchen.test.mjs`: portions- och inköpslistetester utan nätverk eller enhetskommandon.

Kör `node --test test/kitchen.test.mjs` med en aktuell Node-version. Ingen installation krävs för dessa tester.

Se [granskningen och planen](docs/AUDIT-2.0.md) och [leveransens status](docs/STATUS-2.0.md). Kod i detta repo ger inte på egen hand åtkomst till hemmets anslutningar.
