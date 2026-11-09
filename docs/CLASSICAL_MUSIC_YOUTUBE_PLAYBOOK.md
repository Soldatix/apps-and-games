# Timeless Classical Archive — YouTube Playbook + prijenos u novi chat

**Verzija:** 1.0 · **Datum:** 9. 11. 2026. · **Jezik koordinacije:** hrvatski · **Jezik kanala:** engleski

**Namjena:** trajni predložak za dokumentiranje prava, pripremu izvornih vizuala, lokalni FFmpeg render, opise, kontrolu kvalitete i nastavak rada u novom chatu. **Ovo je dokumentacija, a ne odobrenje za automatsku objavu ili monetizaciju.**

> Ne miješati s [Adsterra Monetization Playbookom (PR #49)](https://github.com/Soldatix/apps-and-games/pull/49). Taj zasebni dokument uređuje oglašavanje na web-igrama i web-aplikacijama, ne licence za YouTube snimke klasične glazbe.

## I. Identitet i trenutačni status

- **YouTube kanal:** [Timeless Classical Archive](https://www.youtube.com/@TimelessClassicalArchive), kreiran 8. 11. 2026.
- **Publika i jezik sadržaja:** međunarodna publika; engleski. Razgovor i upute: hrvatski.
- **Tema:** isključivo klasična glazba za sada; kasnije zasebno odlučiti o drugim žanrovima/kanalima.
- **Audio:** samo stvarne izvedbe glazbenika, pijanista i orkestara, bez AI-simulirane glazbe.
- **Vizualni identitet:** crno-zlatni logo, klasična koncertna dvorana, zlatni detalji; povijesni autentični portreti. Nježan prijelaz portreta u pozadinu, bez pravokutnog okvira.
- **Video:** 1920 × 1080; kvalitetan zvuk; tekst čitljiv i bez ometanja glazbe.
- **Poziv na pretplatu:** kratko na kraju opisa kanala i videa; bez ometanja reprodukcije.
- **Apps & Games:** jedna poveznica za informacije i podršku: https://appsandgames.org/#info
- **Status YouTube funkcija, 9. 11. 2026.:** Standard i Intermediate enabled; Advanced još nije enabled (prema snimci zaslona). Vanjski URL-ovi u opisima nisu klikabilni dok potrebna značajka nije omogućena. Ne uklanjati identifikaciju izvora; prikazati nazive i zadržati pune URL-ove u arhivi.
- **Dopisivanje Liber Liberu:** talijanski upit o komercijalnoj uporabi/monetizaciji poslan putem kontaktnog obrasca 8. 11. 2026.; čeka se pisani odgovor. **Bez korištenja njihovih snimki do provjere dopuštenja za konkretne snimke.**

### Objavljeni pilot-videozapisi

| Skladatelj | Djelo / izvođač | Status |
| --- | --- | --- |
| Johann Sebastian Bach | Goldberg Variations, BWV 988: Aria / Kimiko Ishizaka | Javno objavljen 8. 11. 2026.; [YouTube video](https://www.youtube.com/watch?v=Xh07Z5mdKbg); playlista **Johann Sebastian Bach – Masterpieces** |
| Ludwig van Beethoven | Coriolan Overture, Op. 62 / Czech National Symphony Orchestra (Musopen Symphony) | Korisnik 9. 11. 2026. potvrdio javnu objavu snimkama zaslona; playlista **Ludwig van Beethoven – Masterpieces**. Izravnu URL adresu videa unijeti tek nakon provjere. |

**Napomena:** YouTube `Checks: No issues found` znači samo da tada nije prijavljen problem. Ne dokazuje trajnu odsutnost Content ID zahtjeva niti prihvatljivost kanala za monetizaciju.

## II. Nepregovaračka pravila prava

1. Odvojeno provjeriti: **autorsko pravo na kompoziciju**, **prava konkretne audio snimke/mastera**, **prava izvođača i proizvođača**, **prava portreta i grafika**, **prava eventualnih aranžmana i prijevoda** i relevantna teritorijalna pravila.
2. Prednost: **CC0** ili dokumentirana javna domena; **CC BY** može biti prikladna uz punu atribuciju i ostale uvjete konkretne licence. **NC** ne koristiti za komercijalni YouTube bez dodatnog pisanog dopuštenja; druge restrikcije (npr. ND) razmotriti prije spajanja u video.
3. Svaka **konkretna datoteka** mora imati URL stranice izvora, licenciju, stvarne nositelje prava, datum provjere, dokaz (npr. spremljenu stranicu/PDF/snimku zaslona), naziv datoteke, veličinu i SHA-256 ili izvorno objavljeni hash. Različite oznake na različitim portalima zahtijevaju dodatnu provjeru, ne automatski odabir povoljnije.
4. **Hash potvrđuje identitet bajtova, ne autorsko pravo.** To što je skladatelj umro prije 70+ godina ne čini novu snimku slobodnom.
5. Komercijalno dopuštena snimka **ne jamči** dopuštenje YouTube Partner Programa. Reused/inauthentic content ocjenjuje se zasebno; raditi vlastiti obrazovni i urednički sadržaj, ne mehanički presnimavati katalog.
6. Za Content ID zahtjev zapisati vrstu i podnositelja; ne osporavati automatski, nego prvo pregledati dokaznu dokumentaciju.
7. **Bez javne objave, slanja e-mailova u ime korisnika, troškova, GitHub merga ili izmjena produkcijskog AI Factoryja bez izričitog odobrenja korisnika.** Privatni lokalni test ne znači dopuštenje za javnu objavu.

### Poznati izvori za postojeće pilote (provjera po datoteci)

- **Bach audio:** https://commons.wikimedia.org/wiki/File:Kimiko_Ishizaka_-_01_-_Aria.ogg — usporediti CC0 oznaku konkretnog zapisa i izvornu dokumentaciju [Open Goldberg Variations](https://opengoldbergvariations.org/); zabilježiti moguća odstupanja u označavanju.
- **Bach portret:** https://commons.wikimedia.org/wiki/File:Johann_Sebastian_Bach.jpg — povijesna slika Eliasa Gottloba Haussmanna.
- **Beethoven audio:** https://commons.wikimedia.org/wiki/File:Beethoven_-_Coriolan_Overture,_Op._62_(Musopen_Symphony).flac — dokumentacija projekta Musopen Symphony i konkretne datoteke.
- **Beethoven portret:** https://commons.wikimedia.org/wiki/File:Beethoven_1820.jpg — Joseph Karl Stieler (1820.).
- Lokalne probe imaju datoteke `rights_and_hashes_v2.json` (Bach) i `rights_and_hashes_v1.json` (Beethoven). One su dio dokaza, ali **ne zamjenjuju originalne stranice licenci**.

## III. Standard YouTube opisa — v1.1

Svaki video ima istih **šest odjeljaka na engleskom**, uz provjerene podatke i bez lažnih tvrdnji:

1. **ABOUT THIS PERFORMANCE** — puni naziv skladbe, kataloška oznaka, izvođač/orkestar, dirigent ako je primjenjivo, godina snimke ako je potvrđena.
2. **ABOUT THE COMPOSER** — provjerena kratka biografija (ime, godine, glavna povijesna mjesta/uloge, stilski značaj).
3. **FAMOUS WORKS** — 4–7 točnih naziva drugih djela; oznake samo gdje su potvrđene.
4. **ABOUT THIS COMPOSITION** — kontekst nastanka, glazbena struktura, kratka povijesna zanimljivost; činjenice zasebno provjeriti na autoritativnom izvoru.
5. **RECORDING & COPYRIGHT INFORMATION** — precizan izvor audio snimke, izvođač, vrsta licence i uvjeti; autor, godina, izvor i prava za portret; originalni linkovi lokalno dokumentirani. U javnom tekstu zadržati potpune nazive izvora čak i kad vanjske poveznice još nisu klikabilne.
6. **SUBSCRIBE & SUPPORT** — diskretan poziv na pretplatu, zvonce i poveznica https://appsandgames.org/#info; nema agresivnih oglasa.

**Važno:** u tekst za YouTube ne lijepiti Markdown znakove `**` i `*` kao oznake oblikovanja; koristiti obične naslovne retke. Ne obećavati „najnovije izvedbe” ako je arhiva povijesnih snimki; koristiti „new additions to our collection”.

### Copy/paste predložak opisa (EN)

```text
ABOUT THIS PERFORMANCE

[Composer] – [Full work title, catalogue number]
Performer(s): [Verified performer / orchestra / conductor]
Recording: [Verified year / project only if known]

ABOUT THE COMPOSER

[Short verified biography, 3–5 sentences.]

FAMOUS WORKS

• [Verified work 1]
• [Verified work 2]
• [Verified work 3]
• [Verified work 4]

ABOUT THIS COMPOSITION

[3–5 sentences with verified historical and musical context.]

RECORDING & COPYRIGHT INFORMATION

Audio: [Full exact recording title; performer; originating project; license]
Source: [Full attribution and stable source page]
Historical artwork: [Artist, year, title, source, license]
Video design and educational text: Timeless Classical Archive
[Required attribution / adaptation notice for CC BY as applicable]

SUBSCRIBE & SUPPORT

Subscribe to Timeless Classical Archive to discover new additions to our collection.
Turn on notifications for future uploads.
Learn more about our independent projects: https://appsandgames.org/#info

#ClassicalMusic #[Composer] #[Work]
```

## IV. Produkcija i obvezni pregled

1. **Odabir snimke:** verificirati stvarnu izvedbu, komercijalnu licenciju i eventualni Content ID rizik; otvoriti zaseban zapis prava za svaku datoteku.
2. **Slike i metapodaci:** koristiti verificirani povijesni portret. Originalno dizajnirati pozadinu; portret blago uklopiti. Ne prikazivati AI-generirani portret kao autentičan povijesni.
3. **Local-first render:** koristiti postojeći Lenovo/Windows/FFmpeg postupak; raditi u zasebnoj radnoj mapi. Ne koristiti API kredite kada lokalni alat dostaje.
4. **Provjere:** hashovi, trajanje, rezolucija, čitljivost, prijelazi, zvuk od početka do kraja, sinkronizacija i raspored na telefonu/računalu.
5. **Dokumentacija:** izvorne licence i dokaze arhivirati s `rights_and_hashes.json`, izvornim nazivima, datumom i URL-ovima. Ručni download umjesto ponavljanja zahtjeva kad Wikimedia vrati HTTP 429. Nikad ne preskakati hash provjeru samo da render prođe.
6. **YouTube:** vlasnik ručno unosi naslov/opis/playlistu, bira Audience po stvarnoj publici, prolazi Checks, pregledava eventualne zahtjeve, odlučuje o Public objavi. Nema automatske objave.
7. **Nakon objave:** zapisati YouTube URL, status playliste, promjene u Content ID zahtjevima, datum i relevantnu analitiku; zasebno procjenjivati monetizacijsku prihvatljivost kanala.

## V. Registar idućih zadataka

- Dovršiti opise Bacha i Beethovena s kratkim biografijama i sekcijama iz odjeljka III, bez zamjene izvora/attributiona.
- Za Mozarta pronaći **konkretnu profesionalnu snimku** s dokazanim komercijalnim pravima; zatim Vivaldi. Ne pretpostavljati da je cijeli Musopen katalog iste licence.
- Izraditi povratno iskoristiv video/description predložak za skladatelje, bez potrebe da se razvije puni Classical Music Publisher prije osnovnog pilotskog QA.
- Kad YouTube omogući Advanced features, provjeriti vanjske poveznice na izvore i vratiti klikabilne URL-ove u opise.
- Zaprimiti i provjeriti eventualni odgovor Liber Libera; ishod i dopuštene snimke zabilježiti pojedinačno.
- Pratiti reused content politiku i razmotriti originalne edukativne videozapise, naraciju ili vrijedne analize bez ometanja glazbenih izvedbi.

## VI. Kartica za svaki novi video

```text
COMPOSER:
WORK_TITLE:
CATALOGUE_NUMBER:
PERFORMER_OR_ORCHESTRA:
CONDUCTOR_IF_APPLICABLE:
RECORDING_DATE_IF_KNOWN:
AUDIO_SOURCE_PAGE:
AUDIO_LICENSE:
AUDIO_RIGHTS_HOLDER:
AUDIO_LICENSE_EVIDENCE_PATH:
AUDIO_LOCAL_FILENAME:
AUDIO_SOURCE_HASH:
PORTRAIT_ARTIST_YEAR:
PORTRAIT_SOURCE_PAGE:
PORTRAIT_LICENSE:
PORTRAIT_LICENSE_EVIDENCE_PATH:
PORTRAIT_SOURCE_HASH:
RIGHTS_REVIEW_STATUS: PENDING
CONTENT_ID_RISK_NOTE:
VIDEO_TEMPLATE_VERSION:
LOCAL_MP4_PATH:
QUALITY_CHECK: PENDING
YOUTUBE_PLAYLIST:
YOUTUBE_CHECKS_STATUS: NOT_RUN
USER_PUBLICATION_APPROVAL: NO
YOUTUBE_VISIBILITY: NOT_UPLOADED
YOUTUBE_URL:
```

## VII. Prompt za novi chat (kopirati)

```text
Nastavljamo projekt “Classical Music – YouTube Channel”, kanal
Timeless Classical Archive (@TimelessClassicalArchive).
Prvo pročitaj trajni GitHub playbook:
https://github.com/Soldatix/apps-and-games/blob/docs/classical-music-youtube-playbook-2026-11-09/docs/CLASSICAL_MUSIC_YOUTUBE_PLAYBOOK.md

Komunikacija hrvatski; sav tekst javnog kanala engleski.
Koristimo isključivo stvarne, dopuštene izvedbe glazbenika/orkestara,
ne AI generiranu glazbu. Svaka snimka i portret moraju imati zasebno
dokumentirana prava za planiranu međunarodnu komercijalnu YouTube uporabu.
CC0/javna domena ili odgovarajući CC BY; ne koristiti NC bez posebnog
pisanog dopuštenja. Content ID provjera i monetizacija nisu jamstvo.

Kanal je aktivan, s objavljenim videima Bach – Goldberg Variations:
Aria (Kimiko Ishizaka) i Beethoven – Coriolan Overture, Op. 62
(Czech National Symphony Orchestra); imaju zasebne playliste.
Trenutačno Advanced features još nisu Enabled, pa poveznice na izvore
u opisima nisu klikabilne.

NOVI STANDARD OPISA: About This Performance; About the Composer;
Famous Works; About This Composition; Recording & Copyright Information;
Subscribe & Support, uz link https://appsandgames.org/#info.
Prvo urediti postojeće opise; zatim pripremiti Mozarta i Vivaldija,
pojedinačno uz potvrđene licence i realne izvore.

Lokalni Lenovo/FFmpeg, minimalni troškovi/API; bez promjena
produkcijskog AI Factoryja. Nema automatskog objavljivanja,
GitHub merga, troškova ili slanja poruka bez mojeg odobrenja.
Bez nepotrebnog ponavljanja već prošlih testova.
```
