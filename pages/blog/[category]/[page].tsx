import { useRouter } from "next/router";
import Layout from "@components/layout";
import type { GetStaticPropsContext, NextPage } from "next";
import styles from "@styles/blog.module.css";
import PostItem from "@components/blog/post-item";
import Category from "@components/blog/category";
import {
  categoryToNumber,
  categoryToString,
  dateToStringFromServer,
} from "@libs/client/commonFunction";
import Pagination from "react-js-pagination";
import client from "@libs/server/client";
import { PostListWithCountResponse } from "types/response";
import useUser from "@libs/client/useUser";
import {
  MdOutlineFirstPage,
  MdOutlineLastPage,
  MdOutlineChevronRight,
  MdOutlineChevronLeft,
} from "react-icons/md";

interface Props {
  data: PostListWithCountResponse;
  category: string;
}

const Blog: NextPage<Props> = ({ data, category }) => {
  const router = useRouter();

  return (
    <Layout activeMenu={"BLOG"}>
      <div className={styles.container}>
        <Category active={category} />
        <div className={styles.section}>
          <div className={styles.postContainer}>
            {data.posts.map((post, idx) => {
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
          {data.postCount > 8 && (
            <div style={{ marginTop: 80 }}>
              <Pagination
                activePage={router?.query?.page ? +router?.query?.page : 1}
                itemsCountPerPage={8}
                totalItemsCount={data ? data.postCount : 0}
                pageRangeDisplayed={5}
                prevPageText={
                  <div className={styles.pagenationIconBox}>
                    <MdOutlineChevronLeft />
                  </div>
                }
                nextPageText={
                  <div className={styles.pagenationIconBox}>
                    <MdOutlineChevronRight />
                  </div>
                }
                firstPageText={
                  <div className={styles.pagenationIconBox}>
                    <MdOutlineFirstPage />
                  </div>
                }
                lastPageText={
                  <div className={styles.pagenationIconBox}>
                    <MdOutlineLastPage />
                  </div>
                }
                onChange={(page) => {
                  router.push(`/blog/${router.query.category}/${page}`);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = [];
  const categoryData = [];
  for (let i = 1; i <= 4; i++) {
    const postCount = await client.post.count({
      where: {
        isHide: false,
        type: "POST",
        category: i,
      },
    });
    categoryData.push({
      category: categoryToString({ index: i, type: "query" }),
      maxPage: Math.ceil(postCount / 8),
    });
  }

  for (const data of categoryData) {
    if (data.maxPage <= 1) {
      paths.push({ params: { category: data.category, page: "1" } });
    } else {
      for (let i = 1; i <= data.maxPage; i++) {
        paths.push({ params: { category: data.category, page: i.toString() } });
      }
    }
  }

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const postCount = await client.post.count({
    where: {
      isHide: false,
      type: "POST",
      category: categoryToNumber({ query: params?.category?.toString() }),
    },
  });
  const posts = await client.post.findMany({
    where: {
      isHide: false,
      type: "POST",
      category: categoryToNumber({ query: params?.category?.toString() }),
    },
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
    take: 8,
    skip: 8 * (+params?.page! - 1),
    orderBy: { createdAt: "desc" },
  });

  return {
    revalidate: 600,
    props: {
      category: params?.category,
      data: {
        postCount,
        posts: posts.map((post) => ({
          ...post,
          createdAt: dateToStringFromServer(post.createdAt),
          commentCount: post._count.comments + post._count.recomments,
        })),
      },
    },
  };
}

export default Blog;
