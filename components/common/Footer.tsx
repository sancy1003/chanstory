import * as S from '@styles/components/common/footer.style';
import { AiFillGithub, AiFillMail } from 'react-icons/ai';

const Footer = () => {
  const openGithub = () => {
    window.open('https://github.com/sancy1003');
  };

  return (
    <S.FooterContainer>
      <S.FooterWrapper>
        <S.FooterCopyright>© chanstory.dev</S.FooterCopyright>
        <S.FooterInfoBox>
          <S.FooterEmail>
            <AiFillMail />
            <span>frontchan1003@gmail.com</span>
          </S.FooterEmail>
          <S.FooterGit onClick={openGithub}>
            <AiFillGithub />
            <span>github.com/sancy1003</span>
          </S.FooterGit>
        </S.FooterInfoBox>
      </S.FooterWrapper>
    </S.FooterContainer>
  );
};

export default Footer;
