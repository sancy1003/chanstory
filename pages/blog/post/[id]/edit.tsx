import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import dynamic from "next/dynamic";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Recomment, User } from "@prisma/client";
import { PostRegistForm } from "types/post";
import { APIResponse, PostDetailResponse } from "types/response";

interface PostResponse extends APIResponse {
  id: number;
}

const PostEditor = dynamic(() => import("@components/post/editor"), {
  ssr: false,
});

const Edit: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const { data: prevData, mutate } = useSWR<PostDetailResponse>(
    router?.query?.id ? `/api/blog/${router.query.id}` : null
  );
  const [isHide, setIsHide] = useState(false);
  const [post, { loading, data, error }] =
    useMutation<PostResponse>("/api/blog");
  const { register, handleSubmit, setValue } = useForm<PostRegistForm>();
  const [content, setContent] = useState<string | null>(null);
  const onPost = async (formData: PostRegistForm) => {
    if (loading) return;
    let Imageurl = null;
    if (formData.thumbnailImage && formData.thumbnailImage.length > 0) {
      const { uploadURL } = await (await fetch(`/api/uploadImage`)).json();
      const form = new FormData();
      form.append(
        "file",
        formData.thumbnailImage[0],
        `thumbnail_${formData.title}`
      );
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      Imageurl = id;
    }
    post({
      title: formData.title,
      content,
      category: +formData.category,
      isHide,
      tags: formData.tags,
      thumbnailURL: Imageurl ? Imageurl : prevData?.post.thumbnailURL,
      postId: +prevData?.post.id!,
    });
  };
  useEffect(() => {
    if (data && data.result) {
      router.push(`/blog/post/${prevData?.post?.id}`);
    } else if (data?.error) {
      alert(data.error);
    }
  }, [data, router]);
  useEffect(() => {
    if (prevData && prevData.result && prevData.post) {
      setIsHide(prevData.post.isHide);
      if (prevData.post.tags) setValue("tags", prevData.post.tags);
      setValue("category", prevData.post.category + "");
      setValue("title", prevData.post.title);
      setContent(prevData.post.content);
    }
  }, [prevData]);
  return (
    <Layout activeMenu="BLOG">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onPost)}>
          <input {...register("title")} className={styles.postTitleInput} />
          {content && <PostEditor content={content} fn={setContent} />}
          <div className={styles.btnPostingBox}>
            <div>
              <input
                {...register("tags")}
                className={styles.tagInput}
                placeholder="?????? ?????? ', '??? ?????? ?????? ??????"
              />
              <div style={{ marginBottom: 20 }}>
                <span>?????????</span>
                <input
                  style={{ marginLeft: 10, marginRight: 20, cursor: "pointer" }}
                  {...register("thumbnailImage")}
                  id="input-file"
                  type="file"
                  accept="image/*"
                />
              </div>
              <input
                {...register("category")}
                className={styles.tagInput}
                placeholder="???????????? / 1: ???????????? 2: ????????? 3: ?????? 4: ??????"
              />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setIsHide(!isHide)}
              >
                ????????? {isHide ? "on" : "off"}
              </div>
            </div>
            <button className={styles.btnPosting}>?????????</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  if (user?.role !== "ADMIN") {
    return {
      redirect: {
        permanent: false,
        destination: "/blog",
      },
      props: {},
    };
  }
  return {
    props: { user: user ? user : null },
  };
});

export default Edit;
