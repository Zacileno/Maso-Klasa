# Maso Klasa – stav projektu

> Dokumentace a paměť projektu. **Aktualizovat po každém větším bloku práce.**
> Při novém kontextovém okně: přečti nejdřív sekce „Aktuální stav" a „Další krok".

---

## 1. Zadání

Vytvořit **1:1 kopii** současného WordPress webu https://gaube.zacileno.cz/ v Next.js —
shodný design, struktura i prokliky na podstránky (Kariéra, Kontakt).

**Výjimky / změny oproti originálu:**
- Odstranit tlačítko „Zobrazit kompletní nabídku" (na originále vede na `#`, tedy nikam).
- Všude nasadit nová loga „MASO KLASA" (složka `Loga/`).
- SEO zatím neřešit.

**Tech stack:**
- Frontend: Next.js (App Router, TypeScript strict, Tailwind CSS)
- Hosting: Vercel, napojený na GitHub repozitář https://github.com/Zacileno/Maso-Klasa (flow: local → GitHub → Vercel)
- Administrace: **Sanity** (headless CMS, tarif Free) – Studio vložené do webu na `/admin`. Klient edituje **jen sekci „Akce"**.
  (Původně plánovaný Supabase zamítnut – viz Rozhodnutí.)

---

## 2. Co má být celkově hotové (cílový stav)

### Fáze 1 – frontend
- [x] Analýza originálu (texty, struktura, design tokeny, obrázky, HTML+CSS staženo do `_original/`)
- [x] Založení Next.js projektu + git
- [x] Header (logo, menu, mobilní menu, CTA „Objednat teď") a Footer
- [x] Homepage – všechny sekce
- [x] Podstránka `/kariera`
- [x] Podstránka `/kontakt`
- [x] Responzivita desktop / tablet (820 a 768 px) / mobil (390 px) porovnaná s originálem
- [x] Kontrola pravopisu
- [x] Schválení Lenkou („vypadá to super")
- [x] GitHub repo https://github.com/Zacileno/Maso-Klasa (větev `main`)
- [ ] Nasazení na Vercel

### Fáze 2 – administrace
- [x] Sanity projekt „Maso Klasa" (ID `0n4phjgq`, dataset `production`, organizace Zacileno, tarif Free)
- [x] Administrace sekce „Akce" na `/admin` – otestováno Lenkou („funguje to")
- [ ] CORS v Sanity pro ostrou doménu (až bude známá)
- ~~Administrace sekce „Nabídka"~~ – zrušeno, Nabídka zůstává v kódu (`src/data/nabidka.ts`)

---

## 3. Aktuální stav

**Fáze:** 2 – administrace Akcí přes Sanity hotová a otestovaná. Fáze 1 (web 1:1, 3 stránky) hotová, na GitHubu
(`origin` = Zacileno/Maso-Klasa, větev `main`). Vercel řeší Lenka sama (pokyn: „Vercelem se vůbec nezaobírej").
Git autor v tomto repu (lokální config): Lenka Štěpánková <l.stepankova.18@seznam.cz>.
`next.config.ts`: `allowedDevOrigins: ["192.168.*.*"]` – bez toho Next 16 v dev režimu blokuje skripty pro telefon
přes síťovou IP (stránka se na mobilu „nenačte"). Týká se jen `npm run dev`.
Next 16.3.8, React 19.2, Tailwind 4 (jen import; styly jsou v `src/app/globals.css` jako čisté CSS třídy kvůli
přesným breakpointům originálu 976/767 a 921/544 px), TS strict, `src/`. Lint + typecheck OK.

**Struktura kódu:**
- `src/app/layout.tsx` – kořenový layout: fonty (`next/font`: Playfair Display, Lato, Josefin Sans, latin-ext), lang=cs
- `src/app/(site)/` – skupina stránek webu (adresy se nemění): `layout.tsx` (Header, Footer, ScrollToTop),
  `page.tsx` (homepage), `kariera/page.tsx`, `kontakt/page.tsx`
- `src/app/admin/[[...tool]]/page.tsx` – Sanity Studio přes celou obrazovku (bez hlavičky/patičky webu), `noindex`
- `sanity.config.ts` (kořen) – konfigurace Studia: basePath `/admin`, čeština (`@sanity/locale-cs-cz`),
  jediný dokument „Akce" (singleton – nejde vytvořit další ani smazat)
- `sanity.cli.ts` (kořen) – projectId/dataset pro příkazy `npx sanity …`
- `src/sanity/env.ts` – projectId `0n4phjgq`, dataset `production`, apiVersion, `AKCE_DOCUMENT_ID = "akce"`
  (veřejné hodnoty → v kódu, ne v `.env`; žádný tajný token se nepoužívá)
- `src/sanity/schemaTypes/akce.ts` – schéma: pole `items[]` s `name` + `price` (text vč. jednotky, např. „179,90 Kč/kg")
- `src/sanity/client.ts` – `getAkceItems()`; homepage má `revalidate = 60` → změna se na webu projeví do 1 minuty
- `src/components/` – Header (client, mobilní menu), Footer, ScrollToTop, Carousel (certifikáty), PhotoSection
  (fotka + overlay 0.7), OrderCta („Objednejte si u nás"), SectionIntro (nadtitulek + nadpis + text), icons
- `src/data/` – `site.ts` (kontakty, menu, e-mail), `akce.ts` (jen typ `AkceItem`, data jsou v Sanity), `nabidka.ts`

**Sanity – důležité:**
- Pozor: soubory importující balíček `sanity` (schéma, config) **nesmí** importovat serverové komponenty webu
  (chyba „export default was not found in swr…"). Proto je `AKCE_DOCUMENT_ID` v `env.ts`, ne ve schématu.
- CORS (Sanity → API → CORS origins, s credentials): `http://localhost:3333`, `http://localhost:3000`.
  **Ostrou doménu je nutné přidat** (`npx sanity cors add https://DOMENA --credentials`), jinak na ostrém webu
  nepůjde přihlášení do `/admin`.
- Další správce: sanity.io/manage → Maso Klasa → Members → Invite (Free = až 20 uživatelů).
- CLI je přihlášené účtem pristupy@zacileno.eu (GitHub), telemetrie vypnutá.
- `npm audit`: 18 nálezů v nástrojích Sanity CLI (braces, js-yaml, smol-toml – vývojové nástroje, ne běžící web).
  `npm audit fix --force` by vrátil sanity na 5.14 → nespouštět.

**Rozdíly oproti originálu (záměrné):**
- Odstraněno „Zobrazit kompletní nabídku" (zadání). Nové logo MASO KLASA (výška 54/46/40 px).
- Slider certifikátů na originále je **rozbitý** (ukazuje jen šipky a tečky) → u nás skeny skutečně zobrazuje (3/2/1 vedle sebe).
- Originál v menu zvýrazňuje Akce/Nabídka/Certifikace jako „aktuální" (chyba WP) → nepřebíráno.
- Kariéra / Řidič: na originále chybí zalomení „Nabízíme- nástupní mzda…" → sjednoceno s pozicí Řezník.
- Kontakt na mobilu: Karel Milec centrovaný stejně jako ostatní kontakty (originál ho má vlevo).
- Footer rok: generuje se při sestavení (statická stránka) → aktualizuje se s každým nasazením.
- Pravopis opraven: „Jelení kostky", „(oválné razítko). Tento", patička „Obchodní zástupci",
  částky s mezerou mezi tisíci („36 000 Kč", „1 500 Kč" místo „36.000,-", „1500,-").
- Tablet: v „Co nabízíme" má boční fotka max. 40 % šířky (na originále je hlavní fotka při 768 px jen úzký proužek).

**Prostředí:** Node.js 24.19 LTS (pozn.: v nové relaci Claude Code může chybět v PATH → načíst PATH z registru) + npm 11.17 nainstalováno (2026-10-05), Git 2.55.
Context7 MCP (`context7`) připojen globálně – používat pro aktuální dokumentaci knihoven.

Poznámka: originál chrání **WEDOS.protection** → přímé stahování skriptem nejde; vše se získalo přes
Claude in Chrome (prohlížeč „LAPTOP-HG73JT8H"). Při dalším použití Chrome vybrat tento prohlížeč.

## 4. Další krok
1. ~~Nainstalovat Node.js LTS~~ ✅
2. ~~Založit Next.js projekt, git init, `.gitignore`~~ ✅
3. ~~Zkopírovat obrázky a loga do `public/`~~ ✅
4. ~~Design tokeny, Header + Footer, homepage, Kariéra, Kontakt~~ ✅
5. ~~Kontrola Lenkou, pravopis, tablet, push na GitHub~~ ✅
6. Vercel – řeší Lenka sama.
7. ~~Fáze 2: administrace Akcí (Sanity)~~ ✅
8. Až bude známá ostrá doména: přidat ji do CORS v Sanity (viz sekce 3) a ověřit přihlášení na `/admin`.

**Tipy pro testování:** dev server `npm run dev` (port 3000). Chrome okno nejde zmenšit (maximalizované) →
mobil se testoval přes `<iframe>` šířky 390 px vložený do stránky. Pozor: při úpravě kódu HMR takovou
„hacknutou" stránku rozbije (chyby removeChild v logu jsou jen z toho, ne z webu).

---

## 5. Struktura původního webu

### Menu (všechny stránky)
Akce (`/#akce`) · Nabídka (`/#nabidka`) · Certifikace (`/#certifikace`) · Kariéra (`/kariera`) · Kontakt (`/kontakt`)
+ tlačítko **„Objednat teď"** → `mailto:gaubemaso@seznam.cz`

### Homepage `/`
1. **Hero** – „Maso Klasa" / „Dodavatel čerstvého masa v Praze", text o ~30 letech zásobování restaurací,
   škol a firem; tlačítka „Objednat teď" (mailto) a „Zobrazit nabídku" (`#nabidka`)
2. **4 boxy s ikonami** – Čerstvé a kvalitní maso · Rychlost dodání (objednávka do 9:00 = dodání týž den) ·
   Spolehlivost · Firma s historií (od 1997)
3. **Akce** (`#akce`) – 6 položek s cenou: Treska MR 109,90 · H.Plec CHL 159,90 · Jelení kostky na guláš MR 159,90 ·
   V.líčka MR 166,90 · Telecí kýta MR 179,90 · Kuřecí nudličky MR 107,90 (Kč/kg) — *editovatelné v Sanity (`/admin`)*
4. **Co nabízíme** – rozvoz každý všední den (i v sobotu), Praha + 10 km; min. objednávka 1 500 Kč (po–pá),
   2 500 Kč (so); doprava 100 Kč
5. **Naše nabídka** (`#nabidka`) – kategorie Maso / Uzeniny se seznamy položek — *v kódu (`src/data/nabidka.ts`)*;
   tlačítko „Zobrazit kompletní nabídku" **ODSTRANIT**
6. **Certifikace** (`#certifikace`) – „Jedinečná kvalita / Naše certifikace", reg. číslo EU CZ 11920115, 3 skeny dokumentů
7. **Objednejte si u nás** – CTA
8. **Footer**

### Kariéra `/kariera`
Nadpis „Kariéra", „Nabídka práce", „Do našich řad nyní hledáme kolegy. Přidejte se k nám.";
tlačítka „Ozvěte se nám" (mailto) a „Zobrazit volné pozice" (`#volne-mista`).
Pozice: **Řezník** (36 000 Kč čistého + os. ohodnocení), **Řidič sk. B** (32 000 Kč čistého + os. ohodnocení),
**Brigáda** (rozvoz 4:00–12:00, 1 500 Kč čistého/den, výplata týž den). Každá s tlačítkem na e-mail.

### Kontakt `/kontakt`
„Kontaktujte nás" / „Máte dotazy?"; stávající klienti: Václav Nechvátal, Pavel Krafek, Ivana Vostřelová;
noví zákazníci: Karel Milec (obchodní ředitel); firemní údaje; fotka na pozadí. Bez formuláře a mapy.

### Footer (všechny stránky)
Lovosická 778/2, 190 00 Praha 9 · IČO 02141990 · DIČ CZ02141990 · spis. zn. C 214392 (Městský soud v Praze)
Provoz: +420 603 251 519, gaubemaso@seznam.cz
Obchod: Karel Milec +420 774 704 731 · Václav Nechvátal +420 608 032 165 · Pavel Krafek +420 774 999 676 ·
Ivana Vostřelová +420 774 407 854 · © aktuální rok

---

## 6. Assety

**Nová loga** (`Loga/`): Logo bílé · Logo hnědobílé · Logo hnědé · Logo hnědé kulaté · Logo černé · Logo černé kulaté (PNG).

✅ **SCHVÁLENO (2026-10-05):** **Header = `Logo bílé.png`**, **favicon = `Logo hnědé kulaté.png`**.
Footer logo nemá (stejně jako originál).
Pozn.: originální logo v headeru je jen malé prasátko; nové je široké (prase + MASO KLASA) → výška cca 50 px.

**Záloha originálu – složka `_original/`** (staženo 2026-10-05):
- `_original/images/` – všech 16 obrázků v plné velikosti:
  - ikony boxů: `Untitled-design-6.svg`, `4.svg`, `5.svg`, `6.svg`
  - hero homepage: `pexels-photo-65175.jpeg`; Co nabízíme: `pexels-photo-8792899.jpeg`, `pexels-photo-8477071.jpeg`
  - pozadí „Objednejte si u nás" / kontakt / kariéra hero: `pexels-photo-4015401.jpeg`, `pexels-photo-8477072.jpeg`,
    `pexels-photo-13068566-13068566.jpg` (přesné přiřazení ověřit v HTML)
  - kariéra: `pexels-photo-15378096-15378096.jpg` (řezník), `Untitled-design-21.jpg` (řidič, brigáda)
  - certifikáty (slider): `dokumenty-MASO-pdf.jpg`, `-pdf-1.jpg`, `-pdf-2.jpg`
  - `klasa-svg.svg` = staré logo, NEPOUŽÍVAT
- `_original/pages/` – vyrenderované HTML: `home.html`, `kariera.html`, `kontakt.html`
- `_original/css/` – styly (Astra `main.min.css`, Spectra `uag-css-30/31/33.css` = styly bloků homepage/kariéra/kontakt,
  obsahují i mobilní/tabletové media queries)

---

## 7. Design tokeny
**Originál:** WordPress, šablona Astra 4.7 + Spectra (Ultimate Addons for Gutenberg) bloky.

**Barvy:**
| token | hodnota | použití |
|---|---|---|
| červená (primary) | `#de0909` | tlačítka, nadtitulky, odkazy ve footeru, ikony, scroll-to-top |
| tmavě červená | `#940606` | hover |
| bílá | `#ffffff` | nadpisy, text na tmavém |
| světle šedá | `#f5f5f5` | běžný text |
| šedá sekce | `#404040` | pozadí sekcí (4 boxy, Co nabízíme, Certifikace) |
| tmavá sekce | `#1a1a1a` | pozadí sekcí (Akce, Nabídka, footer, kariéra) |
| `#595959`, `#0d0d0d`, `#262626` | ostatní globální barvy | overlay hero = `#0d0d0d` s opacity 0.7 |

**Písma (Google Fonts):**
- Nadpisy: **Playfair Display** 600, VERSALKY (H1 54px/1.2, H2 42px/1.2)
- Text: **Lato** 400, 17px / 1.6 (27.2px)
- Nadpisy boxů (H3): **Josefin Sans** 600 20px, versalky (ověřit v CSS)
- Nadtitulky („Nabídka čerstvého masa", „Maso Klasa"): Lato 16px, červená (v hero bílá), mírné prostrkání

**Layout:** kontejner max. 1240px; sekce padding 100px 40px; hero padding 200px 40px 120px, výška ~790px,
fotka na pozadí + tmavý overlay.

**Tlačítka:** Lato 17px, padding 14px 28px, border 1.6px, radius 0 (hranatá).
Primární: bg `#de0909` + bílý text; sekundární (outline): průhledné + bílý rámeček.

**Header:** průhledný přes hero (transparent header), logo vlevo, menu vpravo (bílé, Lato), CTA „Objednat teď"
červené. Na podstránkách také přes hero fotku.

**Další prvky:** tlačítko „nahoru" vpravo dole (červený čtverec se šipkou); Akce = tabulka 2 sloupce s bílými
linkami (max. šířka ~800px); Nabídka = 3 sloupce (MASO / UZENINY / MASO) se seznamy na střed; Certifikace = slider
se 3 skeny vlevo (šipky + tečky), text vpravo; Kontakt = fotka vlevo, kontakty s ikonou telefonu vpravo;
Kariéra = střídání text/fotka (cik-cak).

**Footer:** 4 sloupce (Sídlo firmy / Provoz / Obchodní ředitel / Obchodní zástupci), nadpisy Lato bold,
telefony a e-mail červeně podtržené, dole linka + „Autorská práva © {rok}" na střed.

---

## 8. Rozhodnutí
- 2026-10-05: Projekt ve složce `Desktop/Claude/Maso Klasa/` (vedle `Loga/`).
- 2026-10-05: Design a obrázky získáme přes Claude in Chrome na Windows PC.
- 2026-10-05: Loga schválena – header `Logo bílé.png`, favicon `Logo hnědé kulaté.png`, footer bez loga.
- Data sekcí Akce a Nabídka budou v samostatných souborech (`src/data/`), aby šla ve fázi 2 snadno napojit na Supabase.
- 2026-10-05: Záměrné odchylky od originálu schváleny Lenkou (funkční slider certifikátů, opravený pravopis, viz sekce 3).
- 2026-10-05: Text „každý všední den (i v sobotu)" → „každý pracovní den i v sobotu" (sobota není všední den) – schváleno Lenkou.
- 2026-10-05: Git autor v repu = Lenka Štěpánková <l.stepankova.18@seznam.cz> (lokální config, ne globální).
- 2026-10-05: Administrace přes **Sanity (Free)** místo Supabase. Důvody: organizace Zacileno je v Supabase na tarifu
  Pro → nový projekt +10 $/měs.; bezplatný Supabase se po týdnu bez provozu uspí a sám se neprobudí. Sanity je hotový
  editor s přihlášením, zdarma, bez uspávání. Neon (Vercel) zvažován, ale vyžadoval by vlastní přihlášení.
- 2026-10-05: Editovat se bude **jen sekce Akce** (Nabídka zůstává v kódu). Admin na `/admin` na stejném webu.
- 2026-10-05: Vercel řeší Lenka sama – Claude se jím nezabývá.
- 2026-10-05: Účet Sanity si Lenka založila sama přes GitHub (zakládání účtů / OAuth Claude dělat nesmí).

## 9. Log práce
- 2026-10-05: Analýza textů a struktury originálu (3 stránky), vytvořen tento soubor. Kód zatím žádný.
- 2026-10-05: Přes Chrome staženo HTML, CSS a 16 obrázků do `_original/`; screenshoty všech stránek prohlédnuty;
  design tokeny zapsány (sekce 7). Zjištěno: chybí Node.js.
- 2026-10-05: Nainstalován Node.js 24.19 LTS; připojen Context7 MCP (user scope) + pravidlo v globálním CLAUDE.md.
- 2026-10-05: Založen Next.js 16.3.8 projekt (scaffold v dočasné složce → přesun do kořene, protože create-next-app nejde do neprázdné složky). git init, `.gitignore` doplněn o `_original/` a `Loga/`. Assety v `public/`. Build OK, `npm audit --omit=dev` = 0 zranitelností (5 high jen v dev nástrojích).
- 2026-10-05: Web překlopen 1:1 – Header, Footer, homepage (hero, 4 boxy, Akce, Co nabízíme, Naše nabídka, Certifikace, CTA), Kariéra, Kontakt. Styly převzaty z CSS originálu (Astra + Spectra), porovnáno v Chrome vedle originálu na desktopu i mobilu (390 px). Lint + typecheck OK.
- 2026-10-05: Oprava mobilu přes síť (allowedDevOrigins), kontrola pravopisu, kontrola tabletu 820/768 px, první commit.
- 2026-10-05: Úprava textu „pracovní den i v sobotu" (commit `8d034f1`). Push na GitHub nejdřív selhal – počítač nebyl
  u GitHubu přihlášený a Claude Code přihlašovací okno neotevře. Řešení: Lenka spustila `! git push -u origin main`
  a v okně Git Credential Manager se přihlásila přes prohlížeč („Sign in with your browser" → Authorize).
  Přihlášení je teď uložené ve Windows → další pushe zvládne Claude sám. Na GitHubu: `da02976`, `8d034f1`.
- 2026-10-05: Fáze 2 – Sanity. Projekt založen přes CLI (`sanity login --provider github`, pak
  `sanity init --bare --project-name "Maso Klasa" --organization oXwPfANg9 --dataset production`), protože klikání
  na sanity.io/manage blokovalo jiné rozšíření Chromu. Nainstalováno `next-sanity`, `sanity`, `styled-components`,
  `@sanity/locale-cs-cz`. Stránky přesunuty do `src/app/(site)/`, Studio na `/admin`. Do Sanity importováno
  6 současných akcí. CORS pro localhost:3000. Lenka otestovala úpravu Akcí – funguje.
