import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import type { GetStaticPropsContext, NextPage } from 'next';
import PostItem from '@components/blog/PostItem';
import Category from '@components/blog/Category';
import {
  categoryToNumber,
  categoryToString,
  dateToStringFromServer,
} from '@libs/client/commonFunction';
import Pagination from 'react-js-pagination';
import client from '@libs/server/client';
import { PostListWithCountResponse } from 'types/response';
import {
  MdOutlineFirstPage,
  MdOutlineLastPage,
  MdOutlineChevronRight,
  MdOutlineChevronLeft,
} from 'react-icons/md';
import * as S from '@styles/pages/blog.style';

interface Props {
  postResponse: PostListWithCountResponse;
  category: string;
}

const PostCategory: NextPage<Props> = ({ postResponse, category }) => {
  const router = useRouter();

  return (
    <Layout activeMenu={'BLOG'}>
      <S.BlogContainer>
        <S.BlogContentsContainer>
          <Category active={category} />
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
            {postResponse.postCount > 8 && (
              <div style={{ marginTop: 80 }}>
                <Pagination
                  activePage={router?.query?.page ? +router?.query?.page : 1}
                  itemsCountPerPage={8}
                  totalItemsCount={postResponse ? postResponse.postCount : 0}
                  pageRangeDisplayed={5}
                  prevPageText={
                    <S.PaginationIconBox>
                      <MdOutlineChevronLeft />
                    </S.PaginationIconBox>
                  }
                  nextPageText={
                    <S.PaginationIconBox>
                      <MdOutlineChevronRight />
                    </S.PaginationIconBox>
                  }
                  firstPageText={
                    <S.PaginationIconBox>
                      <MdOutlineFirstPage />
                    </S.PaginationIconBox>
                  }
                  lastPageText={
                    <S.PaginationIconBox>
                      <MdOutlineLastPage />
                    </S.PaginationIconBox>
                  }
                  onChange={(page) => {
                    router.push(`/blog/${router.query.category}/${page}`);
                  }}
                />
              </div>
            )}
          </S.BlogSection>
        </S.BlogContentsContainer>
      </S.BlogContainer>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = [];
  const categoryData = [];

  const allPostCount = await client.post.count({
    where: {
      isHide: false,
      type: 'POST',
    },
  });

  categoryData.push({
    category: 'all',
    maxPage: Math.ceil(allPostCount / 8),
  });

  for (let i = 1; i <= 4; i++) {
    const postCountPerCategory = await client.post.count({
      where: {
        isHide: false,
        type: 'POST',
        category: i,
      },
    });
    categoryData.push({
      category: categoryToString({ index: i, type: 'query' }),
      maxPage: Math.ceil(postCountPerCategory / 8),
    });
  }

  for (const data of categoryData) {
    if (data.maxPage <= 1) {
      paths.push({ params: { category: data.category, page: '1' } });
    } else {
      for (let i = 1; i <= data.maxPage; i++) {
        paths.push({ params: { category: data.category, page: i.toString() } });
      }
    }
  }

  return { paths, fallback: 'blocking' };
}

type Params = {
  category: string;
  page: string;
};

interface Context extends GetStaticPropsContext {
  params: Params;
}

export async function getStaticProps({ params }: Context) {
  const { category, page } = params;

  const postCount = await client.post.count({
    where: {
      isHide: false,
      type: 'POST',
      category:
        params?.category !== 'all'
          ? categoryToNumber({ query: category.toString() })
          : undefined,
    },
  });

  const posts = await client.post.findMany({
    where: {
      isHide: false,
      type: 'POST',
      category:
        params?.category !== 'all'
          ? categoryToNumber({ query: category.toString() })
          : undefined,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      thumbnailURL: true,
      category: true,
    },
    take: 8,
    skip: 8 * (+page - 1),
    orderBy: { createdAt: 'desc' },
  });

  return {
    revalidate: 600,
    props: {
      category,
      postResponse: {
        postCount,
        posts: posts.map((post) => ({
          ...post,
          createdAt: dateToStringFromServer(post.createdAt),
        })),
      },
    },
  };
}

export default PostCategory;
