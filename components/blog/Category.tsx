import * as S from '@styles/components/blog/category.style';
import Link from 'next/link';

interface Props {
  active: string;
}

const Category = ({ active }: Props) => {
  const currentCategory = active;

  return (
    <S.CategoryContainer>
      <S.CategoryList>
        <li>
          <Link
            href="/blog/all/1"
            className={currentCategory === 'all' ? 'active' : ''}
          >
            <span>📄&nbsp;&nbsp;전체보기</span>
          </Link>
        </li>
        <li>
          <Link
            href="/blog/develop/1"
            className={currentCategory === 'develop' ? 'active' : ''}
          >
            <span>📕&nbsp;&nbsp;개발 일기</span>
          </Link>
        </li>
        <li>
          <Link
            href="/blog/study/1"
            className={currentCategory === 'study' ? 'active' : ''}
          >
            <span>✏&nbsp;&nbsp;스터디</span>
          </Link>
        </li>
        <li>
          <Link
            href="/blog/hobby/1"
            className={currentCategory === 'hobby' ? 'active' : ''}
          >
            <span>😎&nbsp;&nbsp;취미</span>
          </Link>
        </li>
        <li>
          <Link
            href="/blog/daily/1"
            className={currentCategory === 'daily' ? 'active' : ''}
          >
            🥰&nbsp;&nbsp;일상
          </Link>
        </li>
      </S.CategoryList>
    </S.CategoryContainer>
  );
};

export default Category;
