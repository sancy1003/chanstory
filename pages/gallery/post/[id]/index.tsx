import Layout from '@components/layout';
import type { GetStaticPropsContext, NextPage } from 'next';
import styles from '@styles/gallery.module.css';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import client from '@libs/server/client';
import {
  dateToString,
  dateToStringFromServer,
  formattingImageURL,
} from '@libs/client/commonFunction';
import { useRouter } from 'next/router';
import Comment from '@components/post/comment';
import { Post } from '@prisma/client';
import EmblaCarousel from '@components/gallery/EmblaCarousel';

interface postFromSSG extends Post {
  url: string;
  description: string;
}

interface PostProps {
  post: postFromSSG;
}

const PostDetail: NextPage<PostProps> = ({ post }) => {
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
      <div className={styles.galleryContainer}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft onClick={() => router.back()} />
            <h1>{post.title}</h1>
          </div>
          <div className={styles.postingRegistTime}>
            {dateToString(post.createdAt)}
          </div>
        </div>
        <div className={styles.postingContentWrap}>
          <EmblaCarousel slides={images} />
          {/* <div className={styles.imageEditWrap}>
            <div className={styles.imagePrevBox}>
              {images && (
                <SimpleImageSlider
                  style={{
                    backgroundSize: "contain",
                    backgroundRepeat: "none",
                  }}
                  width={"100%"}
                  height={"100%"}
                  images={images!.map((image) => {
                    return { url: formattingImageURL(image) };
                  })}
                  showBullets={images && images.length > 1}
                  showNavs={images && images.length > 1}
                  bgColor="#E1DFE9"
                />
              )}
            </div>
          </div> */}
          <div className={styles.postContent}>{post.content}</div>
          {tags && tags.length > 0 ? (
            <ul className={styles.postingTag}>
              {tags.map((tag: string, idx: number) => {
                return <li key={idx}># {tag}</li>;
              })}
            </ul>
          ) : (
            ''
          )}
        </div>
        <Comment />
      </div>
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

export default PostDetail;
