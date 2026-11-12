# Mitt Hem 2.0 – genomförd första byggomgång

## Implementerat i den befintliga privata appen
- Sammanhängande marinblå/cyan appskal: Hem, Rum, Musik, Familj och Mer. Mobil bottenmeny, sidomeny på större skärmar, originalikon oförändrad.
- Återanvända lamp- och musikkomponenter; gamla appvyn finns kvar under `/hem/legacy`.
- Stor, tangentbordsåtkomlig 2D-översikt av entréplanet. Schematisk, uttryckligen inte måttverifierad 3D eller en fysisk statusmätning.
- Hemmets status hämtas läsande från befintliga anslutningar. Fel ger okänd/ej tillgänglig status, inte uppdiktade värden.
- Recept med sökning på titel/ingredienser, svenska sökfraser, kategori/tid/favoriter och bortfiltrering av namngivna ingredienser. Ingrediensfiltret är ingen allergengaranti.
- Portioner/glas 1–30, direktinmatning och +/−, grundmängder, enheter och delmängder. Separata råd för mat och drinkar.
- Matfavoriter, lagat-historik, senaste sökningar, varierade veckoförslag måndag–söndag, byte av en rätt, portioner per dag och veckans sammanräknade inköpslista.
- Direkt ingredienslista från ett recept. Samma recept ersätts när det läggs till på nytt med andra portioner.
- Har-hemma-kryss och delning/kopiering av återstående inköp.
- Drinkar med/utan alkohol, glas/garnering/smakprofil och ml/cl/US fl oz.
- Kontobunden D1-lagring med versionskontroll, felåterkoppling och skydd mot att en annan flik skriver över nyare val. Nya tabellen är separat från befintliga anslutningsuppgifter.
- Familjens egen uppgiftslista. Den beskrivs inte som synkroniserad extern kalender.
- Serier/dokumentärer via TVmazes officiella API med källbetyg, genre, beskrivning och egen tittlista/sett/gillat. Urvalet är inte en premiärlista. Röstantal och svensk tillgänglighet saknas i denna källa och hittas inte på.
- Befintlig TMDB-adapter återanvänds för filmer och svensk streamingdata när nyckel finns. Abonnemang, gratis/reklam, hyra och köp hålls åtskilda.

## Testnivå och kvarvarande arbete
Portionsmotor och datalagring har automatiska tester, inklusive 2/4/7/10/15 personer, gränserna 1/30, ägarisolering och samtidiga ändringar. Mobilgränssnittet har provats med lokalt testkonto: sökning, sju portioner, favorit, inköpslista och omladdning med bevarad lista. Verkliga hushållsanslutningar ska inte beskrivas som omtestade genom dessa lokala tester.

Denna leverans är inte hela masterprompten färdig. Följande återstår eller är beroende av verklig anslutning:
- TMDB-nyckeln saknas: flödena ”ny högt betygsatt film”, verifierad svensk streaming och spara den filmen kan inte slutverifieras ännu.
- Exakt uppmätt 3D-rekonstruktion, enhetsplaceringar och fullständig kontroll över alla rum.
- Nytt fysiskt uppspelningstest på Sonos och dimring på riktiga lampor.
- Extern kalender, familjeprofiler/barnbehörigheter, kameror, Roborock och familjepositionering.
- Verifierad Home Assistant-backend; ingen sådan har installerats eller aktiverats i denna omgång.
- Livsmedelspriser, närings-/allergencertifiering och automatisk inhämtning av nya externa recept. Budgetfältet är en anteckning, inte en kostnadsberäkning.
- Full assistent med naturliga instruktioner och rutiner. Dagens funktionssökning är regelbaserad och benämns inte AI.

## Källor
TVmaze: https://www.tvmaze.com/api – officiellt gratis API; attribution/CC BY-SA visas i appen. Befintliga serveradaptrar behåller sina respektive källor. Recepten är eget kuraterat innehåll. Illustrationsbilder är separata från verifierade enhetsdata.
