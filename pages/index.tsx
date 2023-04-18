import Category from '@components/blog/Category';
import Layout from '@components/Layout';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import PostItem from '@components/blog/PostItem';
import { dateToStringFromServer } from '@libs/client/commonFunction';
import client from '@libs/server/client';
import { PostListResponse } from 'types/response';
import * as S from '@styles/pages/blog.style';
import GoogleAdvertise from '@components/googleAds/GoogleAdvertise';
import Link from 'next/link';

interface Props {
  postResponse: PostListResponse;
}

const Home: NextPage<Props> = ({ postResponse }) => {
  return (
    <Layout activeMenu={'NONE'}>
      <S.BlogContainer>
        <S.BlogContentsContainer>
          <S.HomeSectionTitle>
            블로그
            <Link href="/blog/all/1">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29289 18.9483C8.90237 18.5578 8.90237 17.9246 9.29289 17.5341L14.5858 12.2412L9.29289 6.94832C8.90237 6.55779 8.90237 5.92463 9.29289 5.5341C9.68342 5.14358 10.3166 5.14358 10.7071 5.5341L16.7071 11.5341C17.0976 11.9246 17.0976 12.5578 16.7071 12.9483L10.7071 18.9483C10.3166 19.3388 9.68342 19.3388 9.29289 18.9483Z"
                  fill="#7360BD"
                />
              </svg>
            </Link>
          </S.HomeSectionTitle>
          <S.BlogSection>
            <S.PostContainer>
              {postResponse.newBlogPosts.map((post) => {
                return (
                  <PostItem
                    key={post.id}
                    createdAt={post.createdAt}
                    title={post.title}
                    imageURL={post.thumbnailURL}
                    postId={post.id}
                    category={post.category}
                    type="blog"
                  />
                );
              })}
            </S.PostContainer>
          </S.BlogSection>
          <GoogleAdvertise marginY={50} />
          <S.HomeSectionTitle>
            갤러리
            <Link href="/gallery">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29289 18.9483C8.90237 18.5578 8.90237 17.9246 9.29289 17.5341L14.5858 12.2412L9.29289 6.94832C8.90237 6.55779 8.90237 5.92463 9.29289 5.5341C9.68342 5.14358 10.3166 5.14358 10.7071 5.5341L16.7071 11.5341C17.0976 11.9246 17.0976 12.5578 16.7071 12.9483L10.7071 18.9483C10.3166 19.3388 9.68342 19.3388 9.29289 18.9483Z"
                  fill="#7360BD"
                />
              </svg>
            </Link>
          </S.HomeSectionTitle>
          <S.BlogSection>
            <S.PostContainer>
              {postResponse.newGalleryPosts.map((post) => {
                return (
                  <PostItem
                    key={post.id}
                    createdAt={post.createdAt}
                    title={post.title}
                    imageURL={post.thumbnailURL}
                    postId={post.id}
                    category={post.category}
                    type="gallery"
                  />
                );
              })}
            </S.PostContainer>
          </S.BlogSection>
        </S.BlogContentsContainer>
      </S.BlogContainer>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async function () {
  const newBlogPosts = await client.post.findMany({
    where: { isHide: false, type: 'POST' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      category: true,
      thumbnailURL: true,
    },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  const newGalleryPosts = await client.post.findMany({
    where: { isHide: false, type: 'GALLERY' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      category: true,
      imageURLs: true,
    },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  const postResponse = {
    newBlogPosts: newBlogPosts.map((post) => ({
      ...post,
      createdAt: dateToStringFromServer(post.createdAt),
    })),
    newGalleryPosts: newGalleryPosts.map((post) => ({
      ...post,
      createdAt: dateToStringFromServer(post.createdAt),
      thumbnailURL: post.imageURLs?.split(', ')[0] || null,
    })),
  };

  return {
    revalidate: 600,
    props: { postResponse },
  };
};

export default Home;
