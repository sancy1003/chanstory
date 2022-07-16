import { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import Layout from "@components/layout";
import { FaChevronLeft } from "react-icons/fa";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { dateToString, formattingImageURL } from "@libs/client/commonFunction";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import ring from "@resource/lottie/ring.json";
import client from "@libs/server/client";
import { PostDetailResponse } from "types/response";
import Comment from "@components/post/comment";

interface PostSeoInfo {
  title: string;
  thumbnailURL: string | null;
  content: string;
  tags: string | null;
  url: string;
}

interface PostProps {
  user: SessionUserData | null;
  postSeoInfo: PostSeoInfo;
}

const Viewer = dynamic(() => import("@components/viewer"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100vh", paddingTop: "100px" }}>
      <Lottie
        loop
        animationData={ring}
        play
        style={{ width: 150, height: 150, margin: "0 auto" }}
      />
    </div>
  ),
});

const PostDetail: NextPage<PostProps> = ({ user, postSeoInfo }) => {
  const router = useRouter();
  const { data, mutate } = useSWR<PostDetailResponse>(
    router?.query?.id ? `/api/blog/${router.query.id}` : null
  );
  const tags = data?.post?.tags?.split(", ");
  if (!data) {
    return (
      <Layout
        activeMenu="BLOG"
        title={postSeoInfo?.title}
        thumbnailURL={
          postSeoInfo ? formattingImageURL(postSeoInfo.thumbnailURL) : null
        }
        keywords={postSeoInfo?.tags}
        url={postSeoInfo?.url}
      >
        <div />
      </Layout>
    );
  }
  return (
    <Layout
      activeMenu="BLOG"
      description={postSeoInfo?.content}
      title={postSeoInfo?.title}
      thumbnailURL={
        postSeoInfo ? formattingImageURL(postSeoInfo.thumbnailURL) : null
      }
      keywords={postSeoInfo?.tags}
      url={postSeoInfo?.url}
    >
      <div className={styles.postContentContainer}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft onClick={() => router.back()} />
            <h1>{data?.post?.title}</h1>
          </div>
          <div className={styles.postingRegistTime}>
            {data?.post && dateToString(data.post.createdAt)}
          </div>
        </div>
        <div className={styles.postingContentWrap}>
          <div className={styles.postingCotnet}>
            {data?.post?.content && <Viewer content={data?.post?.content} />}
          </div>
          {tags && tags.length > 0 ? (
            <ul className={styles.postingTag}>
              {tags.map((tag: string, idx: number) => {
                return <li key={idx}># {tag}</li>;
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
        <Comment type="blog" id={Number(router?.query?.id)} user={user} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
  query,
}: NextPageContext) {
  const user = req?.session.user;
  if (user) {
    const userData = await client?.user.findUnique({ where: { id: user.id } });
    if (!userData) req.session.destroy();
  }

  const id = Number(query.id);

  const post = await client.post.findUnique({
    where: { id: +id },
    select: { title: true, thumbnailURL: true, tags: true, content: true },
  });

  let content = "";

  if (post?.content) {
    if (post.content.length > 150) content = post.content.substring(0, 150);
    else content = post.content;
  }

  return {
    props: {
      user: user ? user : null,
      postSeoInfo: {
        title: post?.title,
        thumbnailURL: post?.thumbnailURL,
        content: content,
        tags: post?.tags,
        url: req?.url,
      },
    },
  };
});

export default PostDetail;
