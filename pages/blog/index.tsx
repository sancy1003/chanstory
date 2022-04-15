import Category from "@components/blog/category";
import Layout from "@components/layout";
import type { NextPage } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";

const Blog: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Category isHome />
        <div className={styles.section} style={{ marginBottom: "70px" }}>
          <div className={styles.sectionTitle}>인기 포스팅</div>
          <div className={styles.postContainer}>
            {[1, 1, 1, 1].map((item, idx) => {
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
        <div className={styles.section}>
          <div className={styles.sectionTitle}>최근 포스팅</div>
          <div className={styles.postContainer}>
            {[1, 1, 1, 1].map((item, idx) => {
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

export default Blog;
