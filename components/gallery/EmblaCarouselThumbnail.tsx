import React from 'react';
import Image from 'next/image';
import * as S from '@styles/components/gallery/emblaCarouselThumbnail.style';

interface Props {
  selected: boolean;
  onClick: () => void;
  imgSrc: string;
}

const EmblaCarouselThumbnail = ({ selected, onClick, imgSrc }: Props) => {
  return (
    <S.ThumbnailContainer>
      <S.BtnImage onClick={onClick} type="button">
        <S.ImageWrapper className={selected ? 'isSelected' : ''}>
          <Image
            src={imgSrc}
            alt="thumbnail"
            fill
            placeholder="blur"
            blurDataURL={imgSrc}
          />
        </S.ImageWrapper>
      </S.BtnImage>
    </S.ThumbnailContainer>
  );
};

export default EmblaCarouselThumbnail;
