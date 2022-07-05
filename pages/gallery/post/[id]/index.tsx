import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/gallery.module.css";
import SimpleImageSlider from "react-simple-image-slider/dist";
import React from "react";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { FaChevronLeft } from "react-icons/fa";
import TagEditor from "@components/post/tag-editor";
import client from "@libs/server/client";
import { dateToString, formattingImageURL } from "@libs/client/commonFunction";
import { useRouter } from "next/router";
import useSWR from "swr";
import { PostDetailResponse } from "types/response";
import Comment from "@components/comment";

interface PostSeoInfo {
  title: string;
  thumbnailURL: string | null;
  tags: string | null;
  url: string;
}

interface PostProps {
  user: SessionUserData | null;
  postSeoInfo: PostSeoInfo;
}

const PostDetail: NextPage<PostProps> = ({ user, postSeoInfo }) => {
  const router = useRouter();
  const { data, mutate } = useSWR<PostDetailResponse>(
    router?.query?.id ? `/api/gallery/${router.query.id}` : null
  );
  const images = data?.post?.imageURLs?.split(", ");
  const tags = data?.post?.tags?.split(", ");

  console.log(data, "data");

  return (
    <Layout
      activeMenu="GALLERY"
      user={user}
      title={postSeoInfo?.title}
      thumbnailURL={
        postSeoInfo ? formattingImageURL(postSeoInfo.thumbnailURL) : null
      }
      keywords={postSeoInfo?.tags}
      url={postSeoInfo?.url}
    >
      <div className={styles.galleryContainer}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft onClick={() => router.back()} />
            <div>{data?.post?.title}</div>
          </div>
          <div className={styles.postingRegistTime}>
            {data?.post && dateToString(data.post.createdAt)}
          </div>
        </div>
        <div className={styles.postingContentWrap}>
          <div className={styles.imageEditWrap}>
            <div className={styles.imagePrevBox}>
              {images && (
                <SimpleImageSlider
                  style={{
                    backgroundSize: "contain",
                    backgroundRepeat: "none",
                  }}
                  width={"100%"}
                  height={"100%"}
                  images={images!.map((image) => {
                    return { url: formattingImageURL(image) };
                  })}
                  showBullets={true}
                  showNavs={true}
                  bgColor="#E1DFE9"
                />
              )}
            </div>
          </div>
          <div className={styles.postContent}>{data?.post?.content}</div>
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
        <Comment type="gallery" id={Number(router?.query?.id)} user={user} />
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
    select: { title: true, thumbnailURL: true, tags: true },
  });

  return {
    props: {
      user: user ? user : null,
      postSeoInfo: {
        title: post?.title,
        thumbnailURL: post?.thumbnailURL,
        tags: post?.tags,
        url: req?.url,
      },
    },
  };
});

export default PostDetail;
