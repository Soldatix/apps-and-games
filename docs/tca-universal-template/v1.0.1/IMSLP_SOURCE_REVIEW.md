# IMSLP – provjera audio izvora prije lokalnog renderiranja (v1.0.1)

Ovaj dokument **nadopunjuje**, a ne mijenja postojeći TCA Universal Local Template v1.0.1. Primjenjuje se za svaki budući video (prvi sljedeći: Schubert, zatim Puccini). **Nije pravno mišljenje.**

## Koraci prije dodavanja audio datoteke

1. Pretraži https://imslp.org/wiki/Main_Page po skladatelju i djelu.
2. Uđi u **Performances → Recordings**. PDF partiture, MIDI i sintetizirane izvedbe nisu naši kandidati.
3. Zapiši **točan IMSLP file/recording ID** (primjer: `#907155`) i permalink kartice izvedbe; ne oslanjati se samo na naslov djela.
4. Zapiši stvarnog izvođača/orkestar, dirigenta, producenta, godinu/datum snimke i aranžera, ako postoji.
5. Snimka mora imati **konkretnu i primjenjivu** licenciju. Prioritet: CC0 ili neovisno utvrđena javna domena; CC BY 3.0/4.0 uz propisnu atribuciju. **NC i ograničenja „personal use only” = HOLD**. CC BY-SA ili ND = dodatna prava/provjera prije objave.
6. Spremi snimku zaslona IMSLP kartice s licencom i datumom provjere. Ako izvorni nositelj prava postoji izvan IMSLP-a, usporedi njegov opis licence s IMSLP karticom.
7. **Odvojeno** provjeri prava na skladbu, konkretnu snimku/master, izvođače, producenta, obradu, eventualni tekst, povijesni portret te međunarodnu komercijalnu uporabu (Švicarska/EU/SAD).
8. Ručno preuzmi **točnu** audio datoteku. Ako IMSLP ne objavljuje upstream hash, zapiši `UPSTREAM_HASH=UNAVAILABLE`; naknadni lokalni SHA-256 samo zaključava preuzete bajtove i **nije** neovisna potvrda IMSLP izvornika.
9. Provjeri MP3/FLAC/OGG trajanje, format i broj kanala. Tek nakon toga pripremi `video.json`, autentični portret i generiranu pozadinu.
10. Uz render spremi `rights_and_hashes.json`, puni engleski tekst CC BY atribucije s URL-om licence i opisom adaptacije te opise za video/playlistu.
11. YouTube najprije **Private → Checks**; nema automatskog `Public`. Content ID i reused-content monetizacija ostaju zasebni rizici.
12. Ako je bilo koji ključni dokaz nejasan: **`PUBLICATION_NO_GO=TRUE`**, ne tvrdimo da je uporaba bez ograničenja.

## Minimalna evidencija (po snimci)

```text
COMPOSER:
WORK_AND_CATALOGUE:
IMSLP_WORK_URL:
IMSLP_AUDIO_RECORDING_ID:
IMSLP_AUDIO_SOURCE_URL:
PERFORMER:
CONDUCTOR:
PRODUCER_AND_ARRANGER_IF_KNOWN:
RECORDING_DATE:
AUDIO_LICENSE_EXACT:
AUDIO_LICENSE_SOURCE_AND_CAPTURE_DATE:
ORIGINAL_RIGHTS_HOLDER_EVIDENCE:
COMMERCIAL_USE_PERMITTED: YES / NO / UNCERTAIN
TERRITORY_RIGHTS_NOTES:
UPSTREAM_AUDIO_HASH: UNAVAILABLE / <verified hash>
LOCAL_AUDIO_SHA256:
ORIGINAL_AUDIO_FILENAME:
AUDIO_DURATION_SECONDS:
PORTRAIT_SOURCE_AND_LICENSE:
ATTRIBUTION_TEXT_AND_LICENSE_URL:
YOUTUBE_CONTENT_ID_CHECKS: NOT_RUN
PUBLICATION_NO_GO: TRUE
USER_PUBLIC_APPROVAL: NO
```

**Pozitivni primjer s ograničenjima:** Strauss II – The Blue Danube (Das Orchester Tsumugi, Takashi Inoue, IMSLP #907155), licenca navedena CC BY 4.0, lokalni MP3 hash zabilježen ali bez javno objavljenog IMSLP checksum-a. Ta licenca vrijedi samo za odgovarajuću datoteku i ne dokazuje prava na druge IMSLP snimke.

**Izvori pravila:** https://imslp.org/wiki/IMSLP:Copyright_Made_Simple i https://imslp.org/wiki/IMSLP:Creative_Commons_licenses

**Sigurnost:** nema automatiziranog preuzimanja kataloga, ne mijenjati produkcijsku AI Factory niti postojeće završne MP4 datoteke bez izričitog korisničkog odobrenja.
