import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import EmblaCarouselThumbnail from './emblaCarouselThumbnail';
import { formattingImageURL } from '@libs/client/commonFunction';
import Image from 'next/image';
import * as S from '@styles/components/gallery/emblaCarousel.style';

interface Props {
  slides: string[];
}

const EmblaCarousel = ({ slides }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    // @ts-ignore
    selectedClass: '',
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
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <S.CarouselContainer>
        <S.Viewport ref={mainViewportRef}>
          <S.CarouselImagesContainer>
            {slides.map((url: string, index: number) => (
              <S.CarouselImageBox key={index}>
                <S.CarouselImageWrapper>
                  <Image
                    src={formattingImageURL(url, 'galleryThumbnail')}
                    alt="thumnail"
                    fill
                    style={{ objectFit: 'contain' }}
                    placeholder="blur"
                    blurDataURL={formattingImageURL(url, 'galleryThumbnail')}
                  />
                </S.CarouselImageWrapper>
              </S.CarouselImageBox>
            ))}
          </S.CarouselImagesContainer>
        </S.Viewport>
      </S.CarouselContainer>

      <S.ThumbnailContainer>
        <S.Viewport ref={thumbViewportRef}>
          <S.ThumbnailImagesContainer>
            {slides.map((url: string, index: number) => (
              <EmblaCarouselThumbnail
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={formattingImageURL(url, 'avatar')}
                key={index}
              />
            ))}
          </S.ThumbnailImagesContainer>
        </S.Viewport>
      </S.ThumbnailContainer>
    </>
  );
};

export default EmblaCarousel;
