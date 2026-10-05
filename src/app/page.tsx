import Image from "next/image";
import Carousel, { type CarouselImage } from "@/components/Carousel";
import OrderCta from "@/components/OrderCta";
import PhotoSection from "@/components/PhotoSection";
import SectionIntro from "@/components/SectionIntro";
import { akceItems } from "@/data/akce";
import { nabidkaCategories } from "@/data/nabidka";
import { ORDER_MAILTO } from "@/data/site";

const features = [
  {
    icon: "/images/Untitled-design-6.svg",
    title: "Čerstvé a kvalitní maso",
    text: "U nás máte jistotu, že získáte vždy čerstvé a vysoce kvalitní maso. Informace o původu rádi poskytneme na vyžádání.",
  },
  {
    icon: "/images/5.svg",
    title: "Rychlost dodání",
    text: "Objednejte do 9 hodin a vaše maso doručíme ještě tentýž den. Rychlost a spolehlivost jsou naší prioritou.",
  },
  {
    icon: "/images/4.svg",
    title: "Spolehlivost",
    text: "Potřebujete maso dovézt přesně na určitou hodinu? Žádný problém. Přizpůsobíme se vašim požadavkům a doručíme přesně, kdy potřebujete.",
  },
  {
    icon: "/images/6.svg",
    title: "Firma s historií",
    text: "Na trhu působíme již od roku 1997. Našim službám dlouhodobě důvěřují největší pražské hotelové řetězce, základní školy a další podniky.",
  },
];

const certificates: CarouselImage[] = [
  {
    src: "/images/dokumenty-MASO-pdf-2.jpg",
    width: 722,
    height: 1024,
    alt: "Certifikát Maso Klasa – strana 3",
  },
  {
    src: "/images/dokumenty-MASO-pdf-1.jpg",
    width: 724,
    height: 1024,
    alt: "Certifikát Maso Klasa – strana 2",
  },
  {
    src: "/images/dokumenty-MASO-pdf.jpg",
    width: 726,
    height: 1024,
    alt: "Certifikát Maso Klasa – strana 1",
  },
];

export default function HomePage() {
  return (
    <>
      <PhotoSection
        image="/images/pexels-photo-65175.jpeg"
        className="hero hero--full"
        priority
      >
        <SectionIntro
          as="h1"
          pretitle="Maso Klasa"
          title="Dodavatel čerstvého masa v Praze"
          light
        >
          Zásobujeme restaurace, školy i další podniky po celé Praze čerstvým
          masem – už téměř 30 let.
        </SectionIntro>
        <div className="btn-group btn-group--stack-mobile">
          <a href={ORDER_MAILTO} className="btn">
            Objednat teď
          </a>
          <a href="#nabidka" className="btn btn--outline">
            Zobrazit nabídku
          </a>
        </div>
      </PhotoSection>

      <section className="section section--gray">
        <div className="section__inner">
          <div className="features">
            {features.map((feature) => (
              <div key={feature.title} className="feature">
                <Image
                  src={feature.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="feature__icon"
                />
                <div className="feature__body">
                  <h3 className="feature__title">{feature.title}</h3>
                  <p className="feature__text">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="akce" className="akce section--dark">
        <div className="akce__inner">
          <SectionIntro pretitle="Nabídka čerstvého masa" title="Akce">
            Objevte naše jedinečné akce! Pravidelně pro vás připravujeme výhodné
            nabídky na vybrané druhy masa a uzenin.
          </SectionIntro>
          <table className="akce-table">
            <tbody>
              {akceItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section--gray">
        <div className="section__inner">
          <div className="offer">
            <div className="offer__text">
              <SectionIntro
                pretitle="Čerstvé maso již od roku 1997"
                title="Co nabízíme"
                align="left"
              >
                Rozvážíme <strong>čerstvé maso a masné výrobky</strong> každý
                všední den (i v sobotu) po celém území Prahy a okolí (do 10 km).
                Zásobujeme hotely, restaurace, jídelny, školy, školky, výrobny,
                cateringy a další.{" "}
                <strong>
                  Objednávky na týž den přijímáme do 9. hodiny dopolední
                </strong>
                . Minimální cena objednávky je pro dovoz v PO – PÁ{" "}
                {"1 500 Kč"} bez DPH (pro dovoz v sobotu{" "}
                {"2 500 Kč"} bez DPH). Cena za dopravu po Praze a okolí
                je {"100 Kč"} (při nedodržení min. ceny závozu na daný den).
              </SectionIntro>
              <div className="btn-group btn-group--left btn-group--stack-mobile">
                <a href={ORDER_MAILTO} className="btn">
                  Objednat teď
                </a>
              </div>
            </div>
            <div className="offer__photos">
              <div className="offer__photo-main">
                <Image
                  src="/images/pexels-photo-8792899.jpeg"
                  alt="Čerstvé maso"
                  fill
                  sizes="(max-width: 767px) 100vw, 30vw"
                />
              </div>
              <Image
                src="/images/pexels-photo-8477071.jpeg"
                alt="Detail syrového masa"
                width={267}
                height={510}
                className="offer__photo-side"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="nabidka" className="section section--dark nabidka">
        <div className="section__inner">
          <SectionIntro pretitle="Nabídka čerstvého masa" title="Naše nabídka">
            Prohlédněte si naši bohatou nabídku čerstvého masa a masných
            výrobků.
          </SectionIntro>
          <div className="menu-columns">
            {nabidkaCategories.map((category, index) => (
              <div key={index} className="menu-columns__col">
                <h2>{category.title}</h2>
                <p>
                  {category.items.map((item, itemIndex) => (
                    <span key={itemIndex}>
                      {itemIndex > 0 && <br />}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifikace" className="section section--gray">
        <div className="section__inner">
          <div className="certs">
            <div className="certs__gallery">
              <Carousel images={certificates} />
            </div>
            <div className="certs__text">
              <SectionIntro
                pretitle="Jedinečná kvalita"
                title="Naše certifikace"
                align="left"
              >
                Naše firma se může pochlubit tím, že získala jako jedna z
                prvních na území hl. m. Prahy certifikát o schválení a
                registraci pod schvalovacím číslem CZ 11920115 (oválné
                razítko). Tento certifikát opravňuje firmu obchodovat po celém území EU,
                dále je zárukou stálé veterinární kontroly.
                <br />S námi máte jistotu, že dostáváte{" "}
                <strong>kvalitní masné produkty</strong> podléhající
                nejpřísnějším kontrolám, ať už jste kdekoliv v EU.
              </SectionIntro>
              <div className="btn-group btn-group--left btn-group--stack-mobile">
                <a href={ORDER_MAILTO} className="btn">
                  Objednat teď
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderCta
        image="/images/pexels-photo-8477071.jpeg"
        position="50% 52%"
        text="Zajistěte si každodenní přísun čerstvého masa od profesionálů."
      />
    </>
  );
}
