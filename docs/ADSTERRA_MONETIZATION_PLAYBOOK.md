# Apps & Games — Adsterra monetizacija: predložak + prijenos u novi chat

**Verzija:** 1.0 · **Datum:** 8. 11. 2026. · **Jezik:** hrvatski  
**Namjena:** ponovno korištenje postojećeg koda za web-igre i web-aplikacije. Ovo je dokumentacija; ne odobrava automatsku produkcijsku objavu.

## I. Obvezna pravila (prije pisanja koda)

1. Cilj je **stvarna, priznata, isplativa zarada**, a ne samo prikaz oglasa. Koristiti besplatnu postojeću Cloudflare/GitHub infrastrukturu, bez nepotrebnih testova.
2. Svaki zasebni hostname/poddomena mora se najprije prijaviti na **Adsterra Websites** i imati status **Approved**; traženi Ad Unit treba imati **Active**. Za sljedeću igru ne kopirati odobrenje glavne domene.
3. Uzeti isključivo originalni **GET CODE te odobrene domene**, zasebno za 728×90 i 320×50 ili odgovarajuće dimenzije. Ne mijenjati Adsterra kod, ne dodavati vlastiti iframe i ne kopirati ključ druge igre. Adsterra formalno još nije odgovorila na upit od 4. 11. o parser-time \`document.write()\`; na postojećim projektima taj način prikazuje oglase, ali to nije službena potvrda metode.
4. Prije tehničkog širenja potvrditi ostvariv put do isplate za **fizičku osobu sa švicarskim prebivalištem**, uz minimalni iznos, naknade, identifikaciju, porezne zahtjeve i metodu. Za web-igre na vlastitim domenama Google Play nije potreban.
5. Za igre: **jedan prilagodljivi banner**, u startnom/izbornom/rezultatnom prostoru ili drugom sigurnom položaju, **nikad preko aktivne igre, šahovske ploče, timera ni kontrola**. Bez automatskog osvježavanja, umjetnih prikaza, vlastitih klikova, popunder i nametnutih preusmjeravanja.
6. Jedan zajednički 5-jezični sustav privola. Odbijanje oglašavanja znači **0 Adsterra zahtjeva**; analitika ima vlastiti odabir. Izbor se može povući. Novi partneri ili značajne promjene zahtijevaju ažuriranje informacija i novu privolu prema potrebi.
7. Najprije razvojna grana + PR; bez spajanja u produkciju dok vlasnik to izričito ne odobri. Nakon merga: Cloudflare **Ready**, jedna vizualna provjera, provjera da banner ne prekriva gameplay, te prirodna statistika po domeni.
8. Ne dodavati Adsterra u CrazyGames build samo zato što je dopuštena na našoj poddomeni: uvjete partnerskih portala provjeravati zasebno. Ovo nije predložak za Android SDK oglase.

## II. Trenutačni dokazani status (8. 11. 2026.)

| Stranica | Website ID | Status |
| --- | --- | --- |
| \`appsandgames.org\` | \`6168026\` | Adsterra **Approved**, glavni banneri aktivni |
| \`phoenix-arcade.appsandgames.org\` | \`6185853\` | Adsterra **Approved**, Phoenix banner prikazan i nestaje po početku igre |
| \`chess.appsandgames.org\` | **Nije dostavljen** | **Sljedeći projekt: registracija/odobrenje prije implementacije** |

**Statistika s portala, 8. 11. 2026. (trenutačni rezultat, ne garancija isplate):** glavna stranica 52 prikaza / 6 klikova / $0.01; Phoenix Arcade 3 prikaza / 0 klikova / $0.00; ukupno **55 prikaza i $0.01**. Iznosi mogu biti naknadno prilagođeni; **prva stvarna isplata nije potvrđena**.

**Postojeći raspored glavne domene:** mobilni 320×50 na 320–799 px; desktop 728×90 od 800 px; dodatni odobreni bočni 300×250 od 1280 px. Kod: [apps-and-games/adsterra-banner-loader.js](https://github.com/Soldatix/apps-and-games/blob/main/adsterra-banner-loader.js).

**Phoenix pilot:** jedan banner u startnom izborniku, 728×90 kada je viewport najmanje 1024×800; inače 320×50 kada ima barem 320 px širine. Sakriven tijekom igranja; potvrđeno u stvarnom pregledniku. Kod: [Phoenix-Arcade/phoenix-adsterra-loader.js](https://github.com/Soldatix/Phoenix-Arcade/blob/main/phoenix-adsterra-loader.js). **Dva originalna Phoenix ključa nisu predložak za druge domene!**

## III. Privole i dijeljenje po poddomenama

- Izvor: [privacy-choice.js](https://github.com/Soldatix/apps-and-games/blob/main/privacy-choice.js), [privacy-choice.css](https://github.com/Soldatix/apps-and-games/blob/main/privacy-choice.css), [privacy-policy.html](https://github.com/Soldatix/apps-and-games/blob/main/privacy-policy.html).
- Jezici: HR / EN / DE / IT / ES. Prvi prozor **Prihvati sve / Odbij sve / Postavke**. U postavkama neovisno **Analitika** i **Oglašavanje**; dostupan naknadni link za povlačenje.
- Središnja domena čuva \`appsGamesPrivacyConsentV1\` u localStorage i zajednički first-party kolačić \`ag_privacy_choices_v1\` (Domain=appsandgames.org, Secure, SameSite=Lax, maksimalno 180 dana), koji može čitati poddomena.
- Oglasni loader mora provjeriti ispravan hostname, \`version: 1\`, \`partnerRevision: "adsterra-2026-11"\`, valjan \`timestamp\`, te **\`advertising: true\`**. Bez toga **nema zahtjeva prema oglašivaču**. \`analytics: true\` nije privola za oglase.
- Kod za privole ponovo koristiti, ne stvarati zaseban popup. Ako dođe novi partner ili druga svrha, revidirati informacije, verziju partnera i privolu. Naš vlastiti UI **nije Google-certificirani CMP / IAB TCF** za AdSense.

## IV. Predložak jedne nove igre — popuniti prije implementacije

\`\`\`text
APP_NAME:
APP_CATEGORY: GAME / UTILITY
PUBLIC_HOSTNAME:
GITHUB_REPOSITORY:
PRODUCTION_BRANCH:
CLOUDFLARE_PROJECT:
ADSTERRA_WEBSITE_ID: [mora biti Approved]
DESKTOP_AD_UNIT_ID: [Active; originalni GET CODE]
MOBILE_AD_UNIT_ID: [Active; originalni GET CODE]
BANNER_LOCATION: [izvan gameplaya i kontrola]
PR_URL:
EXPLICIT_PRODUCTION_APPROVAL: NO
CLOUDFLARE_DEPLOYMENT: [Ready nakon merga]
ADSTERRA_IMPRESSIONS: [samo stvarna statistika]
ADSTERRA_REVENUE: [samo priznata statistika]
\`\`\`

**Kratka procedura za svaki novi projekt:**

1. Provjeriti aktualnu GitHub granu koja se objavljuje, Cloudflare hostname, gameplay i prostor na desktopu/tabletu/mobitelu. Za React/Vite, Unity WebGL ili druge strukture ne pretpostavljati isti HTML raspored.
2. U [Adsterra Websites](https://beta.publishers.adsterra.com/websites) dodati točan HTTPS hostname; kategorija Games ako postoji; Adult ads ostaviti **OFF** kao u postojećim projektima. Pričekati Approved.
3. Izraditi 728×90 i 320×50 prema slobodnom prostoru. Prije kodiranja dohvatiti oba **originalna** GET CODE bloka i njihove jedinstvene placement ID-ove.
4. Preuzeti i prilagoditi Phoenix **logiku** (host, zajednička privola, točno jedan prikladan format), ne kopirati njegove ključeve ni poziciju naslijepo. Originalni tag ne mijenjati.
5. Minimalni test: bez/odbijena/istekla privola → 0 ad requests; odgovarajući prikaz na desktopu/mobitelu; gameplay ili funkcija ostaju upotrebljivi. Bez serijskog klikanja i osvježavanja.
6. Pripremiti PR bez merga; vlasnik mora izričito odobriti produkciju. Nakon Cloudflare Ready jednom vizualno provjeriti i očitati \`Statistics → Domain\` ili \`Placement\`, bez zaključivanja o isplati iz jednoga prikaza.

## V. Prioritet i iznimka Digital Clock

**Faza 1: web-igre, od Animated 3D Chess.**
- **Animated 3D Chess** — \`chess.appsandgames.org\`, GitHub: [Soldatix/Wizard-Chess-3D-Table-Edition](https://github.com/Soldatix/Wizard-Chess-3D-Table-Edition). Repozitorij koristi React/Three.js/Vite; referentna release grana \`release/wizard-chess-workers-v1\`. Potvrditi aktualnu Cloudflare granu. **Još nema potvrđen Adsterra Website ID.**
- Zatim Neon Pac-Man, Tetris, UFO Invaders, Memory Game, Modern Snake i ostale web-igre. Za svaku zasebno odobrenje/ad tag; prednost onima s prometom i malo potrebnih izmjena.

**Faza 2: web Utility** — Date Lotto Generator, Unit Converter, Crossword, Emoji Copy & Paste, Habit Tracker i ostale aplikacije.

**Posebno pravilo za Digital Clock:** **NEMA bannera na glavnoj površini sata**, niti u stalnom/screen-saver prikazu. Eventualno zaseban banner na podstranici **Alarm, Timer** i sličnim pomoćnim funkcijama, nikad preko kontrola, uz zasebno vlasnikovo odobrenje.

## VI. Isplata — otvorena obveza

Na zadnjem prikazu Adsterra Payouts način isplate **nije odabran**. Iako su opcije za fizičke osobe prikazane, to **ne potvrđuje** dovršenu provjeru konkretne švicarske osobe niti uspješnu isplatu.

Prikazane opcije (provjeriti u računu prije odabira):

| Metoda | Minimum | Naknada prikazana u portalu | Provjera fizičke osobe |
| --- | --- | --- | --- |
| WebMoney WMZ | $5 | 1% | Na zahtjev |
| Paxum | $5 | $1 | Na zahtjev |
| WebMoney WMT | $5 | 2% | Na zahtjev |
| PayPal via Hyperwallet | $25 | $0.65 | Na zahtjev; nedostupno do minimuma |
| Local Bank Transfer CHF | $25 | $7 + tečaj | Obavezna |
| Wire Transfer | $1,000 | $0 za EUR / $50 za USD | Obavezna |

Portal navodi dvotjedno zadržavanje nakon praga radi verifikacije prometa, potom sljedeće raspoloživo razdoblje isplate; Adsterra javno opisuje isplate dvaput mjesečno. Obratiti pozornost na porezne obveze, naknade i eventualnu verifikaciju Hyperwallet/PayPal računa. **Nema obećanja zarade/isplate dok proces nije dokazan.**

## VII. Korisni izvori

- Adsterra publisher: https://beta.publishers.adsterra.com/websites
- Upute za banner formate: https://adsterra.com/blog/how-banner-ads-make-money/
- Odobrenje, GET CODE i statistika: https://adsterra.com/blog/set-up-publishers-dashboard/
- Isplata/opći postupak: https://adsterra.com/monetize-traffic/
- Glavni repo: https://github.com/Soldatix/apps-and-games
- Referentni pilot: https://github.com/Soldatix/Phoenix-Arcade

## VIII. Prompt za novi chat (kopirati u cijelosti)

\`\`\`text
Nastavljamo projekt “Oglašavanje i monetizacija — Apps & Games”.
Prvo pročitaj trajni playbook:
https://github.com/Soldatix/apps-and-games/blob/docs/adsterra-monetization-playbook-2026-11-08/docs/ADSTERRA_MONETIZATION_PLAYBOOK.md

8. 11. 2026.: appsandgames.org (Adsterra Website ID 6168026) i
phoenix-arcade.appsandgames.org (Website ID 6185853) su Approved.
Glavna stranica ima 728x90, 320x50 i 300x250; Phoenix odabire jedan od
728x90/320x50, oglas je u izborniku i nestaje tijekom gameplaya.
Jedinstvena 5-jezična privola dijeli se preko first-party kolačića.
U Adsterra Statistics evidentirano 55 prikaza i ukupno $0.01 prihoda.
Stvarna isplata i konačni izbor metode nisu potvrđeni.

PRIORITET: Animated 3D Chess, chess.appsandgames.org,
repo Soldatix/Wizard-Chess-3D-Table-Edition (React/Three.js/Vite).
Provjeri aktualnu deployment granu, pripremi mjesto za banner izvan 3D
ploče/kontrola. Najprije Adsterra odobrenje domene i originalni GET CODE.
Ne programirati prije ostvarivog puta do isplate niti mijenjati produkciju
bez jasnog odobrenja. Nakon Animated 3D Chess slijede druge WEB GAMES,
a tek zatim WEB UTILITY.
DIGITAL CLOCK IZUZETAK: nema bannera na glavnom satu; eventualno samo u
Alarms, Timer i pomoćnim funkcijama uz zasebnu odluku.

Komuniciraj na hrvatskom, bez nepotrebnog ponavljanja testova.
\`\`\`
