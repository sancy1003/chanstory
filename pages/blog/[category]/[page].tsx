import { useRouter } from "next/router";
import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";
import Category from "@components/blog/category";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import useSWR from "swr";
import { categoryToNumber, dateToString } from "@libs/client/commonFunction";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

interface PostsResponse {
  result: boolean;
  posts: PostsType[];
  postCount: number;
}
interface PostsType {
  id: number;
  title: string;
  commentCount: number;
  createdAt: string;
  thumbnailURL: string | null;
  _count: {
    comments: number;
    recomments: number;
  };
}

const Blog: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const { data } = useSWR<PostsResponse>(
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
            {data?.posts?.map((post, idx) => {
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
            })}
          </div>
          {data && data.postCount > 8 ? (
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
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  return {
    props: { user: user ? user : null },
  };
});

export default Blog;
