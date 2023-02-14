import Layout from '@components/layout';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import client from '@libs/server/client';
import {
  dateToString,
  dateToStringFromServer,
  formattingImageURL,
} from '@libs/client/commonFunction';
import { useRouter } from 'next/router';
import Comment from '@components/common/comment';
import { Post } from '@prisma/client';
import EmblaCarousel from '@components/gallery/EmblaCarousel';
import * as S from '@styles/pages/gallery.style';

interface postFromSSG extends Post {
  url: string;
  description: string;
}

interface Props {
  post: postFromSSG;
}

const GalleryDetail: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  const images = post.imageURLs?.split(', ');
  const tags = post.tags?.split(', ');

  return (
    <Layout
      activeMenu="GALLERY"
      title={post.title}
      description={post.description}
      thumbnailURL={post ? formattingImageURL(post.thumbnailURL) : null}
      keywords={post.tags}
      url={post.url}
    >
      <S.GalleryContainer>
        <S.GalleryDetailHeader>
          <S.GalleryDetailTitleBox>
            <FaChevronLeft onClick={() => router.back()} />
            <h1>{post.title}</h1>
          </S.GalleryDetailTitleBox>
          <div className="registTime">{dateToString(post.createdAt)}</div>
        </S.GalleryDetailHeader>
        <S.GalleryDetailContent>
          <EmblaCarousel slides={images as string[]} />
          <div className="content">{post.content}</div>
          {tags && tags.length > 0 ? (
            <S.GalleryDetailTagList>
              {tags.map((tag: string, idx: number) => {
                return <li key={idx}># {tag}</li>;
              })}
            </S.GalleryDetailTagList>
          ) : (
            ''
          )}
        </S.GalleryDetailContent>
        <Comment />
      </S.GalleryContainer>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = [];
  const galleryPosts = await client.post?.findMany({
    where: {
      isHide: false,
      type: 'GALLERY',
    },
    select: {
      id: true,
    },
  });

  for (const data of galleryPosts) {
    paths.push({ params: { id: String(data.id) } });
  }

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = await client.post?.findUnique({
    where: {
      id: Number(params?.id),
    },
    select: {
      id: true,
      title: true,
      thumbnailURL: true,
      content: true,
      tags: true,
      imageURLs: true,
      createdAt: true,
    },
  });

  let description = '';

  if (post?.content) {
    if (post?.content.length > 150)
      description = post?.content.substring(0, 150);
    else description = post?.content;
  }

  return {
    revalidate: 600,
    props: {
      post: {
        ...post,
        description,
        url: `${process.env.SITE_URL}/gallery/post/${post?.id}`,
        createdAt: dateToStringFromServer(post?.createdAt!),
      },
    },
  };
}

export default GalleryDetail;
