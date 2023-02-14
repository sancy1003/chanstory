import Image from 'next/image';
import * as S from '@styles/components/common/autoHeightImageWrapper.style';
import { CSSProperties } from 'react';

interface Props {
  src: string;
  alt: string;
  style: CSSProperties;
}

const AutoHeightImageWrapper = ({ ...props }: Props) => {
  return (
    <S.AutoHeightImageWrapper>
      <Image fill {...props} />
    </S.AutoHeightImageWrapper>
  );
};

export default AutoHeightImageWrapper;
