import Link from "next/link";
import PhotoSection from "@/components/PhotoSection";
import { ORDER_MAILTO } from "@/data/site";

type OrderCtaProps = {
  image: string;
  text: string;
  position?: string;
};

/** "Objednejte si u nás" call to action at the bottom of a page. */
export default function OrderCta({ image, text, position }: OrderCtaProps) {
  return (
    <PhotoSection image={image} className="cta" position={position}>
      <div>
        <h2>Objednejte si u nás</h2>
        <p>{text}</p>
      </div>
      <div className="btn-group btn-group--stack-mobile">
        <a href={ORDER_MAILTO} className="btn">
          Objednat teď
        </a>
        <Link href="/#nabidka" className="btn btn--outline">
          Zobrazit nabídku
        </Link>
      </div>
    </PhotoSection>
  );
}
