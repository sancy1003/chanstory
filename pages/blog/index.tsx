import Category from '@components/blog/Category';
import Layout from '@components/Layout';
import type { GetStaticProps, NextPage } from 'next';
import PostItem from '@components/blog/PostItem';
import client from '@libs/server/client';
import { dateToStringFromServer } from '@libs/client/commonFunction';
import { PostListResponse } from 'types/response';
import * as S from '@styles/pages/blog.style';
import GoogleAdvertise from '@components/googleAds/GoogleAdvertise';

interface Props {
  data: PostListResponse;
}

const Blog: NextPage<Props> = ({ data }) => {
  return (
    <Layout activeMenu={'BLOG'}>
      <S.BlogContainer>
        <S.BlogContentsContainer>
          <Category active="home" />
          <S.BlogSection>
            <S.PostContainer>
              {data.newPosts.map((post, idx) => {
                if (idx < 8) {
                  return (
                    <PostItem
                      key={post.id}
                      createdAt={post.createdAt}
                      title={post.title}
                      imageURL={post.thumbnailURL}
                      postId={post.id}
                      category={post.category}
                    />
                  );
                }
              })}
              <GoogleAdvertise />
              {data.newPosts.map((post, idx) => {
                if (idx >= 8) {
                  return (
                    <PostItem
                      key={post.id}
                      createdAt={post.createdAt}
                      title={post.title}
                      imageURL={post.thumbnailURL}
                      postId={post.id}
                      category={post.category}
                    />
                  );
                }
              })}
            </S.PostContainer>
          </S.BlogSection>
        </S.BlogContentsContainer>
      </S.BlogContainer>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async function () {
  const newPosts = await client.post.findMany({
    where: { isHide: false, type: 'POST' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      thumbnailURL: true,
      category: true,
    },
    take: 16,
    orderBy: { createdAt: 'desc' },
  });

  return {
    revalidate: 600,
    props: {
      data: {
        newPosts: newPosts.map((post) => ({
          ...post,
          createdAt: dateToStringFromServer(post.createdAt),
        })),
      },
    },
  };
};

export default Blog;
