"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/icons";

export type CarouselImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type CarouselProps = {
  images: CarouselImage[];
};

/** Slides visible at once per viewport width, as in the original Spectra gallery. */
function slidesForWidth(width: number): number {
  if (width <= 767) return 1;
  if (width <= 976) return 2;
  return 3;
}

export default function Carousel({ images }: CarouselProps) {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => setPerView(slidesForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.max(images.length - perView + 1, 1);
  const current = Math.min(index, pageCount - 1);

  const go = (next: number) => setIndex((next + pageCount) % pageCount);

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${(current * 100) / perView}%)` }}
        >
          {images.map((image) => (
            <div
              key={image.src}
              className="carousel__slide"
              style={{ width: `${100 / perView}%` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 767px) 100vw, (max-width: 976px) 50vw, 220px"
              />
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            aria-label="Předchozí"
            onClick={() => go(current - 1)}
          >
            <ArrowIcon />
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            aria-label="Další"
            onClick={() => go(current + 1)}
          >
            <ArrowIcon className="rotate-180" />
          </button>
          <ul className="carousel__dots">
            {Array.from({ length: pageCount }, (_, page) => (
              <li key={page}>
                <button
                  type="button"
                  className="carousel__dot"
                  aria-label={`Snímek ${page + 1}`}
                  aria-current={page === current}
                  onClick={() => go(page)}
                >
                  •
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
