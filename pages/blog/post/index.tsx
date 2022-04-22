import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import dynamic from "next/dynamic";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface PostResult {
  result: boolean;
  id: number;
  error?: string;
}
interface Form {
  title: string;
  tags: string;
  category: string;
  thumbnailImage: FileList;
}

const PostEditor = dynamic(() => import("@components/editor"), { ssr: false });

const Write: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const [isHide, setIsHide] = useState(false);
  const [post, { loading, data, error }] = useMutation<PostResult>("/api/blog");
  const { register, handleSubmit } = useForm<Form>();
  const [content, setContent] = useState("");
  const onPost = async (formData: Form) => {
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
      thumbnailURL: Imageurl,
    });
  };
  useEffect(() => {
    if (data && data.result) {
      router.push(`/blog/post/${data.id}`);
    } else if (data?.error) {
      alert(data.error);
    }
  }, [data, router]);
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onPost)}>
          <input {...register("title")} className={styles.postTitleInput} />
          <PostEditor fn={setContent} />
          <div className={styles.btnPostingBox}>
            <div>
              <input
                {...register("tags")}
                className={styles.tagInput}
                placeholder="태그 입력 ', '로 여러 태그 입력"
              />
              <div style={{ marginBottom: 20 }}>
                <span>썸네일</span>
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
                placeholder="카테고리 / 1: 개발일기 2: 스터디 3: 취미 4: 일상"
              />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setIsHide(!isHide)}
              >
                숨기기 {isHide ? "on" : "off"}
              </div>
            </div>
            <button className={styles.btnPosting}>포스팅</button>
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
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: { user: user ? user : null },
  };
});

export default Write;
