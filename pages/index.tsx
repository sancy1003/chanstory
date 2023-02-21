import Category from '@components/blog/Category';
import Layout from '@components/Layout';
import type { GetStaticProps, NextPage } from 'next';
import PostItem from '@components/blog/PostItem';
import { dateToStringFromServer } from '@libs/client/commonFunction';
import client from '@libs/server/client';
import { PostListResponse } from 'types/response';
import * as S from '@styles/pages/blog.style';

interface Props {
  data: PostListResponse;
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Layout activeMenu={'BLOG'}>
      <S.BlogContainer>
        <Category active="home" />
        <S.BlogSection>
          <S.PostContainer>
            {data.newPosts.map((post) => {
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
            })}
          </S.PostContainer>
        </S.BlogSection>
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
      category: true,
      thumbnailURL: true,
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

export default Home;
