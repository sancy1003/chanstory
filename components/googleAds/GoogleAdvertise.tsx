import * as S from '@styles/components/googleAds/GoogleAdvertise.style';
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface Props {
  marginY?: number;
}

const GoogleAdvertise = ({ marginY }: Props) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      if (process.env.NODE_ENV !== 'production')
        console.error('AdvertiseError', e);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <S.AdvertiseContainer
        style={{ marginTop: marginY, marginBottom: marginY }}
      >
        <S.DisabledAdvertise>광고가 표시됩니다.</S.DisabledAdvertise>
      </S.AdvertiseContainer>
    );
  }

  return (
    <S.AdvertiseContainer style={{ marginTop: marginY, marginBottom: marginY }}>
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3131973401944410"
        data-ad-slot="2962835951"
        data-ad-format="auto"
        data-full-width-responsive="true"
      /> */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-3131973401944410"
        data-ad-slot="5792448771"
      />
    </S.AdvertiseContainer>
  );
};

export default GoogleAdvertise;
