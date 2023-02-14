import { formattingImageURL } from '@libs/client/commonFunction';
import * as S from '@styles/components/gallery/galleryItem.style';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  commentNum: number;
  createdAt: string;
  title: string;
  imageURL: string | null;
  postId: number;
}

const GalleryItem = ({ createdAt, title, imageURL, postId }: Props) => {
  return (
    <S.GalleryItemContainer>
      <Link href={`/gallery/post/${postId}`}>
        <S.ImageBox>
          <S.ImageWrapper>
            <Image
              fill
              alt={`${title}-thumbnail`}
              src={formattingImageURL(imageURL, 'galleryThumbnail')}
            />
          </S.ImageWrapper>
        </S.ImageBox>
        <S.Title title={title}>{title}</S.Title>
        <S.Info>
          <div>{createdAt}</div>
        </S.Info>
      </Link>
    </S.GalleryItemContainer>
  );
};

export default GalleryItem;
