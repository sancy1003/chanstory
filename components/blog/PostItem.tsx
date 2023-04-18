import {
  categoryToString,
  formattingImageURL,
} from '@libs/client/commonFunction';
import * as S from '@styles/components/blog/postItem.style';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  createdAt: string;
  title: string;
  imageURL: string | null;
  postId: number;
  category?: number;
  type: 'blog' | 'gallery';
}

const PostItem = ({
  createdAt,
  title,
  imageURL,
  postId,
  category,
  type,
}: Props) => {
  return (
    <S.PostItemCard>
      <Link href={`/${type}/post/${postId}`}>
        <S.ImageWrapper>
          <Image
            alt={`${title}-thumbnail`}
            fill
            placeholder="blur"
            src={
              imageURL
                ? formattingImageURL(imageURL, 'blogThumbnail')
                : '/images/thumbnail/default_thumbnail.png'
            }
            blurDataURL={
              imageURL
                ? formattingImageURL(imageURL, 'blogThumbnail')
                : '/images/thumbnail/default_thumbnail.png'
            }
          />
        </S.ImageWrapper>
        <S.InfoBox>
          {category && (
            <S.Category category={category}>
              {categoryToString({ index: category, type: 'title' })}
            </S.Category>
          )}
          <S.Title title={title}>{title}</S.Title>
          <S.CreatedAt>
            <div>{createdAt}</div>
          </S.CreatedAt>
        </S.InfoBox>
      </Link>
    </S.PostItemCard>
  );
};

export default PostItem;
