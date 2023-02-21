import * as S from '@styles/components/googleAds/GoogleAdvertise.style';
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAdvertise = () => {
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
      <S.AdvertiseContainer>
        <S.DisabledAdvertise>광고가 표시됩니다.</S.DisabledAdvertise>
      </S.AdvertiseContainer>
    );
  }

  return (
    <S.AdvertiseContainer>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3131973401944410"
        data-ad-slot="2962835951"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </S.AdvertiseContainer>
  );
};

export default GoogleAdvertise;
