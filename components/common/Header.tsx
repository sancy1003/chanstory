import * as S from '@styles/components/common/header.style';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  activeMenu: 'BLOG' | 'GALLERY' | 'NONE';
}

const Header = ({ activeMenu }: Props) => {
  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <Link href={'/'} className="mainLogo">
          <Image src="/images/logo/logo.svg" fill alt="logo" priority={true} />
        </Link>
        <S.Navbar>
          <ul>
            <li>
              <Link
                href={'/blog'}
                className={activeMenu === 'BLOG' ? 'active' : ''}
              >
                blog
              </Link>
            </li>
            <li>
              <Link
                href={'/gallery'}
                className={activeMenu === 'GALLERY' ? 'active' : ''}
              >
                gallery
              </Link>
            </li>
          </ul>
        </S.Navbar>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
};

export default Header;
