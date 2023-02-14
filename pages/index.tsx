import Category from 'backup/blog/category';
import Layout from '@components/layout';
import type { GetStaticProps, NextPage } from 'next';
import PostItem from 'backup/blog/postItem';
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
          <div className="title">✨&nbsp;&nbsp;최근 포스팅</div>
          <S.PostContainer>
            {data.newPosts.map((post) => {
              return (
                <PostItem
                  key={post.id}
                  createdAt={post.createdAt}
                  title={post.title}
                  imageURL={post.thumbnailURL}
                  postId={post.id}
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
      thumbnailURL: true,
      _count: {
        select: {
          comments: true,
          recomments: true,
        },
      },
    },
    take: 12,
    orderBy: { createdAt: 'desc' },
  });

  return {
    revalidate: 600,
    props: {
      data: {
        newPosts: newPosts.map((post) => ({
          ...post,
          createdAt: dateToStringFromServer(post.createdAt),
          commentCount: post._count.comments + post._count.recomments,
        })),
      },
    },
  };
};

export default Home;
