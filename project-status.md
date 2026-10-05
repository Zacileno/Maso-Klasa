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
- Hosting: Vercel, napojený na GitHub repozitář `maso-klasa` (flow: local → GitHub → Vercel)
- Backend / administrace: Supabase — **až fáze 2**. Cíl: klient sám edituje sekce „Akce" a „Nabídka".

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
- [ ] Supabase (databáze + přihlášení)
- [ ] Administrace sekce „Akce"
- [ ] Administrace sekce „Nabídka"

---

## 3. Aktuální stav

**Fáze:** 1 – web překlopen 1:1 (všechny 3 stránky), schválen, nahrán na GitHub (`origin` = Zacileno/Maso-Klasa, větev `main`).
Git autor v tomto repu (lokální config): Lenka Štěpánková <l.stepankova.18@seznam.cz>.
`next.config.ts`: `allowedDevOrigins: ["192.168.*.*"]` – bez toho Next 16 v dev režimu blokuje skripty pro telefon
přes síťovou IP (stránka se na mobilu „nenačte"). Týká se jen `npm run dev`.
Next 16.3.8, React 19.2, Tailwind 4 (jen import; styly jsou v `src/app/globals.css` jako čisté CSS třídy kvůli
přesným breakpointům originálu 976/767 a 921/544 px), TS strict, `src/`. Lint + typecheck OK.

**Struktura kódu:**
- `src/app/layout.tsx` – fonty (`next/font`: Playfair Display, Lato, Josefin Sans, latin-ext), Header, Footer, ScrollToTop, lang=cs
- `src/app/page.tsx`, `src/app/kariera/page.tsx`, `src/app/kontakt/page.tsx`
- `src/components/` – Header (client, mobilní menu), Footer, ScrollToTop, Carousel (certifikáty), PhotoSection
  (fotka + overlay 0.7), OrderCta („Objednejte si u nás"), SectionIntro (nadtitulek + nadpis + text), icons
- `src/data/` – `site.ts` (kontakty, menu, e-mail), `akce.ts`, `nabidka.ts` → ve fázi 2 nahradit Supabase

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
6. Napojit repo na Vercel (Lenka v dashboardu Vercelu: Add New → Project → Import `Zacileno/Maso-Klasa`, výchozí nastavení Next.js).
7. Fáze 2: Supabase + administrace Akce a Nabídka.

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
   V.líčka MR 166,90 · Telecí kýta MR 179,90 · Kuřecí nudličky MR 107,90 (Kč/kg) — *editovatelné ve fázi 2*
4. **Co nabízíme** – rozvoz každý všední den (i v sobotu), Praha + 10 km; min. objednávka 1 500 Kč (po–pá),
   2 500 Kč (so); doprava 100 Kč
5. **Naše nabídka** (`#nabidka`) – kategorie Maso / Uzeniny se seznamy položek — *editovatelné ve fázi 2*;
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

**Footer:** 4 sloupce (Sídlo firmy / Provoz / Obchodní ředitel / Obchodní zástupce), nadpisy Lato bold,
telefony a e-mail červeně podtržené, dole linka + „Autorská práva © {rok}" na střed.

---

## 8. Rozhodnutí
- 2026-10-05: Projekt ve složce `Desktop/Claude/Maso Klasa/` (vedle `Loga/`).
- 2026-10-05: Design a obrázky získáme přes Claude in Chrome na Windows PC.
- 2026-10-05: Loga schválena – header `Logo bílé.png`, favicon `Logo hnědé kulaté.png`, footer bez loga.
- Data sekcí Akce a Nabídka budou v samostatných souborech (`src/data/`), aby šla ve fázi 2 snadno napojit na Supabase.

## 9. Log práce
- 2026-10-05: Analýza textů a struktury originálu (3 stránky), vytvořen tento soubor. Kód zatím žádný.
- 2026-10-05: Přes Chrome staženo HTML, CSS a 16 obrázků do `_original/`; screenshoty všech stránek prohlédnuty;
  design tokeny zapsány (sekce 7). Zjištěno: chybí Node.js.
- 2026-10-05: Nainstalován Node.js 24.19 LTS; připojen Context7 MCP (user scope) + pravidlo v globálním CLAUDE.md.
- 2026-10-05: Založen Next.js 16.3.8 projekt (scaffold v dočasné složce → přesun do kořene, protože create-next-app nejde do neprázdné složky). git init, `.gitignore` doplněn o `_original/` a `Loga/`. Assety v `public/`. Build OK, `npm audit --omit=dev` = 0 zranitelností (5 high jen v dev nástrojích).
- 2026-10-05: Web překlopen 1:1 – Header, Footer, homepage (hero, 4 boxy, Akce, Co nabízíme, Naše nabídka, Certifikace, CTA), Kariéra, Kontakt. Styly převzaty z CSS originálu (Astra + Spectra), porovnáno v Chrome vedle originálu na desktopu i mobilu (390 px). Lint + typecheck OK.
- 2026-10-05: Oprava mobilu přes síť (allowedDevOrigins), kontrola pravopisu, kontrola tabletu 820/768 px, první commit a push na GitHub Zacileno/Maso-Klasa.
