import { GetServerSidePropsContext, NextPage } from 'next';
import * as S from '@styles/pages/blog.style';
import Layout from '@components/Layout';
import client from '@libs/server/client';
import { dateToStringFromServer } from '@libs/client/commonFunction';
import { BlogPostListResponse } from 'types/response';
import PostItem from '@components/blog/PostItem';
import SearchInput from '@components/blog/SearchInput';

interface Props {
  searchText: string;
  postResponse: BlogPostListResponse;
}

const BlogSearch: NextPage<Props> = ({ searchText, postResponse }) => {
  return (
    <Layout activeMenu={'BLOG'}>
      <S.BlogContainer>
        <S.BlogContentsContainer>
          <S.BlogSectionHeader>
            <S.BlogSearchTitle>{searchText}</S.BlogSearchTitle>
            <SearchInput />
          </S.BlogSectionHeader>
          <S.BlogSection>
            <S.PostContainer>
              {postResponse.posts.map((post) => {
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
        </S.BlogContentsContainer>
      </S.BlogContainer>
    </Layout>
  );
};

type Querys = {
  searchText: string;
};

interface Context extends GetServerSidePropsContext {
  query: Querys;
}

export async function getServerSideProps({ query }: Context) {
  const { searchText } = query;

  const posts = await client.post.findMany({
    where: {
      isHide: false,
      type: 'POST',
      OR: [
        {
          title: {
            contains: searchText,
          },
        },
        {
          content: {
            contains: searchText,
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      thumbnailURL: true,
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const postResponse = {
    posts: posts.map((post) => ({
      ...post,
      createdAt: dateToStringFromServer(post.createdAt),
    })),
  };

  return {
    props: { searchText, postResponse },
  };
}

export default BlogSearch;
