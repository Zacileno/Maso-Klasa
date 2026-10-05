import type { ReactNode } from "react";

type SectionIntroProps = {
  pretitle: string;
  title: string;
  /** Use h1 for the page hero, h2 elsewhere. */
  as?: "h1" | "h2";
  children?: ReactNode;
  align?: "center" | "left";
  /** White pretitle and text, used on photo backgrounds. */
  light?: boolean;
};

/** Red pretitle + uppercase heading + optional text, the recurring block of the original site. */
export default function SectionIntro({
  pretitle,
  title,
  as: Heading = "h2",
  children,
  align = "center",
  light = false,
}: SectionIntroProps) {
  const classes = ["intro"];
  if (align === "left") classes.push("intro--left");
  if (light) classes.push("intro--light");

  return (
    <div className={classes.join(" ")}>
      <p className="pretitle">{pretitle}</p>
      <Heading className="intro__title">{title}</Heading>
      {children && <p className="intro__text">{children}</p>}
    </div>
  );
}
