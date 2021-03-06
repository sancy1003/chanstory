import Category from "@components/blog/category";
import Layout from "@components/layout";
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";
import { dateToStringFromServer } from "@libs/client/commonFunction";
import client from "@libs/server/client";
import { PostListResponse } from "types/response";
import useUser from "@libs/client/useUser";

interface Props {
  data: PostListResponse;
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Layout activeMenu={"BLOG"}>
      <div className={styles.container}>
        <Category active="home" />
        <div className={styles.section} style={{ marginBottom: "70px" }}>
          <div className={styles.sectionTitle}>🔥&nbsp;&nbsp;인기 포스팅</div>
          <div className={styles.postContainer}>
            {data.hotPosts.map((post, idx) => {
              return (
                <PostItem
                  key={post.id}
                  commentNum={post.commentCount}
                  createdAt={post.createdAt}
                  title={post.title}
                  imageURL={post.thumbnailURL}
                  postId={post.id}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>✨&nbsp;&nbsp;최근 포스팅</div>
          <div className={styles.postContainer}>
            {data.newPosts.map((post, idx) => {
              return (
                <PostItem
                  key={post.id}
                  commentNum={post.commentCount}
                  createdAt={post.createdAt}
                  title={post.title}
                  imageURL={post.thumbnailURL}
                  postId={post.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async function (
  context: GetStaticPropsContext
) {
  const newPosts = await client.post.findMany({
    where: { isHide: false, type: "POST" },
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
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  const hotPosts = await client.post.findMany({
    where: { isHide: false, type: "POST" },
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
    take: 4,
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
      {
        recomments: {
          _count: "desc",
        },
      },
    ],
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
        hotPosts: hotPosts.map((post) => ({
          ...post,
          createdAt: dateToStringFromServer(post.createdAt),
          commentCount: post._count.comments + post._count.recomments,
        })),
      },
    },
  };
};

export default Home;
