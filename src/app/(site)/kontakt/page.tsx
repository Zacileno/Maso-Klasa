import type { Metadata } from "next";
import Image from "next/image";
import OrderCta from "@/components/OrderCta";
import PhotoSection from "@/components/PhotoSection";
import SectionIntro from "@/components/SectionIntro";
import { PhoneIcon } from "@/components/icons";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/data/seo";
import { type Person, salesDirector, salesReps, telHref } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt a objednávky čerstvého masa, Praha 9 – Maso Klasa",
  description:
    "Objednávky čerstvého masa na tel. +420 603 251 519 nebo e-mailem. Noví zákazníci volejte obchodnímu řediteli. Provoz Lovosická 778/2, Praha 9, od roku 1997.",
  path: "/kontakt",
});

function PersonContact({ person }: { person: Person }) {
  return (
    <div className="person">
      <PhoneIcon className="person__icon" />
      <div>
        <h3 className="person__name">{person.name}</h3>
        <p className="person__phone">
          <a href={telHref(person.phone)}>{person.phone}</a>
        </p>
      </div>
    </div>
  );
}

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Kontakt", "/kontakt")} />
      <PhotoSection
        image="/images/hovezi-steak-na-taliri.jpg"
        className="hero hero--sub"
        priority
      >
        <SectionIntro
          as="h1"
          pretitle="Kontaktujte nás"
          title="Máte dotazy?"
          light
        >
          Máte dotazy ohledně našich služeb nebo objednávek? Zavolejte nám.
        </SectionIntro>
      </PhotoSection>

      <section className="section section--dark">
        <div className="section__inner">
          <div className="contact">
            <div className="contact__photo">
              <Image
                src="/images/hovezi-steaky-detail.jpg"
                alt="Syrové hovězí steaky"
                width={470}
                height={520}
                sizes="(max-width: 767px) 100vw, 550px"
              />
            </div>
            <div className="contact__info">
              <div className="contact__heading">
                <h2>Kontaktujte nás</h2>
                <p>
                  Naši stávající klienti mohou kontaktovat přímo svého
                  obchodního zástupce:
                </p>
              </div>
              <div className="contact__people">
                {salesReps.map((rep) => (
                  <PersonContact key={rep.name} person={rep} />
                ))}
              </div>
              <div className="contact__heading">
                <h2>noví zákazníci</h2>
                <p>
                  Ještě jste od nás nic neodebírali? Kontaktujte našeho
                  obchodního ředitele:
                </p>
              </div>
              <PersonContact person={salesDirector} />
            </div>
          </div>
        </div>
      </section>

      <OrderCta
        image="/images/reznik-drzi-hovezi-maso.jpg"
        text="Zajistěte si každodenní přísun čerstvého a kvalitního masa od profesionálů."
      />
    </>
  );
}
