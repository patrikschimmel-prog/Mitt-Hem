# Mitt Hem 2.0 – granskning 12 november 2026

## Omfattning och säker utgångspunkt
Arbetsbranch: `feat/mitt-hem-2-audit`. Den befintliga privata appens versionshistorik har säkerhetskopierats separat. MittHemTV, TV-installation, launcher och gateway ingår inte. Originalikonen ska behållas.

Det här offentliga GitHub-repot innehåller i nuläget en omdirigering till den privata appen. Tidigare commits innehåller en lokal Telldus-demo, inte riktiga lampanslutningar. Den aktiva privata appen använder React, Vinext/Vite, Cloudflare Workers, D1 och Drizzle. Vi återanvänder den och dess autentisering. Privata planritningar, enhetsuppgifter och anslutningshemligheter hör inte hemma i detta offentliga repo.

## Inventering före ändringar
| Del | Klassificering | Belägg / begränsning |
|---|---|---|
| GitHub-startsida | Fungerande omdirigering | Ett index.html, ingen självständig appbackend |
| Telldus | Delvis fungerande, tidigare hårdvarubekräftad | Riktig OAuth, status, på/av och dimring; nya ändringar behöver provas separat |
| Sonos/Spotify | Delvis fungerande | Riktiga anslutningar, rum, volym, uppspelning och sökning; användaren har rapporterat problem med musikval |
| Verisure | Läsande integration finns | Separat skyddad inloggning; ingen larm-/låsstyrning ska införas |
| Väder/nyheter | Implementerade externa källor | SMHI/RSS; nätverksfel och aktualitet måste framgå |
| Äldre hemöversikt | Trasig kodväg | En integrationslista läser ett femte element ur en lista med fyra element |
| Entréplan/3D | Endast illustration | Befintlig bild är AI-genererad, inte en måttverifierad digital tvilling |
| Home Assistant | Inte verifierad | Ingen adapter eller deklarerad HA-hemlighet; ingen lokal process/port 8123 påvisad. Det utesluter inte installation på annan maskin |
| Life360, kameror, robot, extern kalender | Ej anslutna | Ska inte visa påhittad data |
| Recept/drinkar | Delvis byggda i äldre separat vy | Egen kuraterad katalog; inte en automatiskt uppdaterad extern receptdatabas |
| Portioner | Otillräckligt | Äldre kod begränsad till 20, nya kravet är 30 |
| Veckoplanering/kontosparande | Ej byggt | Befintliga matlistor är enhetslokala |
| TMDB | Förberett, ej anslutet | Serveradapter finns men nyckel saknas. Ingen bekräftad svensk streamingtillgänglighet |

## Prioriterad plan
1. Rätta kraschen, skapa appens fem huvudingångar och behåll befintliga reglage.
2. Testbar receptmotor med grundmängder, 1–30 portioner, enheter och summering utan dubbelräkning.
3. Mat/drinkvy, veckomeny och inköpslista med privat kontolagring och konfliktkontroll.
4. Större entréplansvy från användarens underlag, tydlig åtskillnad mellan illustration och verifierad status.
5. Katalog/favoriter, befintlig musik och tydliga anslutningslägen. TMDB/HA/familjekarta kräver verkliga tillgängliga anslutningar.
6. Automatiska tester, mobil/datorgranskning och privat publicering. Rapportera fysiska enheter som oprövade tills verklig test gjorts.

Ingen installation av Home Assistant, inget köp och ingen ändring av säkerhetssystem planeras inom denna granskning.
