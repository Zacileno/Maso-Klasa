import type { Metadata } from "next";
import Image from "next/image";
import PhotoSection from "@/components/PhotoSection";
import SectionIntro from "@/components/SectionIntro";
import { pageMetadata } from "@/data/seo";
import { ORDER_MAILTO } from "@/data/site";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Práce řezník a řidič v Praze, nástup ihned – Maso Klasa",
  description:
    "Hledáme řezníka (36 000 Kč čistého) a řidiče sk. B (32 000 Kč čistého) do firmy Maso Klasa v Praze 9. Jídlo zdarma, HPP, DPP i brigáda, nástup možný ihned.",
  path: "/kariera",
});

type Job = {
  title: string;
  /** Lines of the job description; an empty string renders a blank line. */
  duties: string[];
  offerTitle?: string;
  offer?: string[];
  image: { src: string; alt: string };
  /** Photo left, text right (the original alternates the layout). */
  photoFirst: boolean;
};

const jobs: Job[] = [
  {
    title: "Řezník",
    duties: [
      "– bourání vepřového, hovězího a kuřecího masa",
      "– úprava a kompletace objednávek k expedici",
      "– denní a noční směny",
      "– pracovní doba pondělí až pátek, víkendy a svátky volné",
    ],
    offerTitle: "Nabízíme",
    offer: [
      "– nástupní mzda 36 000 Kč čistého + osobní ohodnocení",
      "– jídlo a nápoje zdarma",
      "– HPP, DPP, OSVČ nebo brigáda",
      "– nástup možný IHNED",
    ],
    image: {
      src: "/images/reznik-s-nozem.jpg",
      alt: "Řezník s nožem při práci",
    },
    photoFirst: false,
  },
  {
    title: "Řidič sk. B",
    duties: [
      "– rozvoz masa dodávkou po Praze",
      "– nutná znalost Prahy",
      "– požadujeme fyzickou zdatnost a chuť do práce",
      "– pevná pracovní doba pondělí až pátek + 1 sobota měsíčně",
    ],
    offerTitle: "Nabízíme",
    offer: [
      "– nástupní mzda 32 000 Kč čistého + osobní ohodnocení",
      "– jídlo a nápoje zdarma",
      "– HPP, DPP, OSVČ nebo brigáda",
      "– nástup možný IHNED",
    ],
    image: { src: "/images/rozvoz-masa-dodavka.jpg", alt: "Nakládání zásilek masa do dodávky" },
    photoFirst: true,
  },
  {
    title: "Brigáda",
    duties: [
      "– rozvoz masa po Praze od 4:00 do 12:00",
      "– ohodnocení 1 500 Kč čistého",
      "– výplata po každém dni",
    ],
    image: { src: "/images/rozvoz-masa-dodavka.jpg", alt: "Nakládání zásilek masa do dodávky" },
    photoFirst: false,
  },
];

function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => (
    <span key={index}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export default function KarieraPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Kariéra", "/kariera")} />
      <PhotoSection
        image="/images/uzene-hovezi-maso.jpg"
        className="hero hero--sub"
        priority
      >
        <SectionIntro as="h1" pretitle="Kariéra" title="Nabídka práce" light>
          Do našich řad nyní hledáme kolegy. Přidejte se k nám.
        </SectionIntro>
        <div className="btn-group btn-group--stack-mobile">
          <a href={ORDER_MAILTO} className="btn">
            Ozvěte se nám
          </a>
          <a href="#volne-mista" className="btn btn--outline">
            Zobrazit volné pozice
          </a>
        </div>
      </PhotoSection>

      <section id="volne-mista" className="jobs section--dark">
        <div className="section__inner" style={{ margin: "0 auto" }}>
          {jobs.map((job) => {
            const text = (
              <div className="job__text">
                <SectionIntro
                  pretitle="Volná pozice"
                  title={job.title}
                  align="left"
                />
                <div className="job__desc">
                  <p>
                    <Lines lines={job.duties} />
                    {job.offerTitle && (
                      <>
                        <br />
                        <br />
                        {job.offerTitle}
                      </>
                    )}
                  </p>
                  {job.offer && (
                    <p>
                      <Lines lines={job.offer} />
                    </p>
                  )}
                </div>
                <div className="btn-group btn-group--left btn-group--stack-mobile">
                  <a href={ORDER_MAILTO} className="btn">
                    Ozvěte se nám
                  </a>
                </div>
              </div>
            );

            const photo = (
              <div className="job__photo">
                <Image
                  src={job.image.src}
                  alt={job.image.alt}
                  width={560}
                  height={500}
                  sizes="(max-width: 767px) 100vw, 560px"
                />
              </div>
            );

            return (
              <div
                key={job.title}
                className={`job${job.photoFirst ? "" : " job--reverse-mobile"}`}
              >
                {job.photoFirst ? (
                  <>
                    {photo}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {photo}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
