import Image from "next/image";
import type { ReactNode } from "react";

type PhotoSectionProps = {
  image: string;
  className: string;
  /** Background focus point, e.g. "50% 52%". */
  position?: string;
  priority?: boolean;
  id?: string;
  children: ReactNode;
};

/** Full-width section with a photo background and a dark 70 % overlay. */
export default function PhotoSection({
  image,
  className,
  position,
  priority = false,
  id,
  children,
}: PhotoSectionProps) {
  return (
    <section id={id} className={`photo-section ${className}`}>
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="photo-section__bg"
        style={position ? { objectPosition: position } : undefined}
      />
      <div className="photo-section__inner">{children}</div>
    </section>
  );
}
