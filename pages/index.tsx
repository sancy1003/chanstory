import Category from "@components/blog/category";
import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { dateToString } from "@libs/client/commonFunction";
import useSWR from "swr";
import client from "@libs/server/client";
import { PostListResponse } from "types/response";
import PostItemSkeleton from "@components/blog/post-item-skeleton";

const Home: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const { data } = useSWR<PostListResponse>(`/api/blog/`);
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <Category isHome />
        <div className={styles.section} style={{ marginBottom: "70px" }}>
          <div className={styles.sectionTitle}>인기 포스팅</div>
          <div className={styles.postContainer}>
            {data
              ? data.hotPosts?.map((post, idx) => {
                  return (
                    <PostItem
                      key={`hot_${idx}`}
                      commentNum={post.commentCount}
                      registTime={dateToString(post.createdAt)}
                      title={post.title}
                      imageURL={post.thumbnailURL}
                      postId={post.id}
                    />
                  );
                })
              : [1, 2, 3, 4].map((item) => <PostItemSkeleton key={item} />)}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>최근 포스팅</div>
          <div className={styles.postContainer}>
            {data
              ? data.newPosts?.map((post, idx) => {
                  return (
                    <PostItem
                      key={`new_${idx}`}
                      commentNum={post.commentCount}
                      registTime={dateToString(post.createdAt)}
                      title={post.title}
                      imageURL={post.thumbnailURL}
                      postId={post.id}
                    />
                  );
                })
              : [1, 2, 3, 4].map((item) => <PostItemSkeleton key={item} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  if (user) {
    const userData = await client?.user.findUnique({ where: { id: user.id } });
    if (!userData) req.session.destroy();
  }
  return {
    props: { user: user ? user : null },
  };
});

export default Home;
