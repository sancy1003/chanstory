import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumb";
import styles from "@styles/embla.module.css";
import { formattingImageURL } from "@libs/client/commonFunction";
import Image from "next/image";

const EmblaCarousel = ({ slides }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    // @ts-ignore
    selectedClass: "",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={mainViewportRef}>
          <div className={styles.embla__container}>
            {slides.map((url: string, index: number) => (
              <div className={styles.embla__slide} key={index}>
                <div className={styles.embla__slide__inner}>
                  {/* <img
                    className={styles.embla__slide__img}
                    src={formattingImageURL(url)}
                    alt="image"
                  /> */}
                  <Image
                    src={formattingImageURL(url, "galleryThumbnail")}
                    alt="thumnail"
                    fill
                    placeholder="blur"
                    blurDataURL={formattingImageURL(url, "galleryThumbnail")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.embla} ${styles.emblaThumb}`}>
        <div className={styles.embla__viewport} ref={thumbViewportRef}>
          <div
            className={`${styles.embla__container} ${styles.embla__containerThumb}`}
          >
            {slides.map((url: string, index: number) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={formattingImageURL(url, "avatar")}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
