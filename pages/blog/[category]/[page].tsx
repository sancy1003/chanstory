import { useRouter } from "next/router";
import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";
import Category from "@components/blog/category";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import useSWR from "swr";
import { categoryToNumber, dateToString } from "@libs/client/commonFunction";
import Pagination from "react-js-pagination";
import client from "@libs/server/client";
import { PostListByCategoryResponse } from "types/response";
import PostItemSkeleton from "@components/blog/post-item-skeleton";
import PaginationSkeleton from "@components/paginationSkeleton";
import { CATEGORY } from "@utils/define/category";

const Blog: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const { data } = useSWR<PostListByCategoryResponse>(
    router?.query?.category
      ? `/api/blog/category?category=${categoryToNumber({
          query: router?.query?.category + "",
        })}&page=${router?.query?.page}`
      : `/api/blog/category`
  );

  return (
    <Layout user={user}>
      <div className={styles.container}>
        <Category />
        <div className={styles.section}>
          <div className={styles.postContainer}>
            {data
              ? data?.posts?.map((post, idx) => {
                  return (
                    <PostItem
                      key={idx}
                      commentNum={post.commentCount}
                      registTime={dateToString(post.createdAt)}
                      title={post.title}
                      imageURL={post.thumbnailURL}
                      postId={post.id}
                    />
                  );
                })
              : [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <PostItemSkeleton key={item} />
                ))}
          </div>
          {data ? (
            data.postCount > 8 && (
              <Pagination
                activePage={router?.query?.page ? +router?.query?.page : 1}
                itemsCountPerPage={8}
                totalItemsCount={data ? data.postCount : 0}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(page) => {
                  router.replace(`/blog/${router.query.category}/${page}`);
                }}
              />
            )
          ) : (
            <PaginationSkeleton width={200} marginTop={30} height={30} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
  query,
}: NextPageContext) {
  const categoryList = CATEGORY.map((item) => item.query);
  if (
    +query.page! === 0 ||
    (query?.category && !categoryList.includes(String(query.category)))
  ) {
    return {
      redirect: {
        destination: "/blog",
      },
    };
  }

  const user = req?.session.user;
  if (user) {
    const userData = await client?.user.findUnique({ where: { id: user.id } });
    if (!userData) req.session.destroy();
  }
  return {
    props: { user: user ? user : null },
  };
});

export default Blog;
