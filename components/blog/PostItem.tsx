import { formattingImageURL } from '@libs/client/commonFunction';
import * as S from '@styles/components/blog/postItem.style';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  createdAt: string;
  title: string;
  imageURL: string | null;
  postId: number;
}
const PostItem = ({ createdAt, title, imageURL, postId }: Props) => {
  return (
    <S.PostItemCard>
      <Link href={`/blog/post/${postId}`}>
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
          <S.Title title={title}>{title}</S.Title>
          <S.Info>
            <div>{createdAt}</div>
          </S.Info>
        </S.InfoBox>
      </Link>
    </S.PostItemCard>
  );
};

export default PostItem;
