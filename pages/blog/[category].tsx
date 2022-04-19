import { useRouter } from "next/router";
import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";
import Category from "@components/blog/category";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";

const Blog: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();

  return (
    <Layout user={user}>
      <div className={styles.container}>
        <Category />
        <div className={styles.section}>
          <div className={styles.postContainer}>
            {[1, 1, 1, 1, 1].map((item, idx) => {
              return (
                <PostItem
                  key={idx}
                  commentNum={5}
                  registTime="2022-04-15"
                  title="NextJS Framework 구성과 기본 사용방법 포스팅"
                  imageURL="#"
                />
              );
            })}
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
  return {
    props: { user: user ? user : null },
  };
});

export default Blog;
