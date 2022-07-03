import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/gallery.module.css";
import { dateToString } from "@libs/client/commonFunction";
import React, { useEffect, useState } from "react";
import { APIResponse } from "types/response";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { useRouter } from "next/router";
import { MdUploadFile } from "react-icons/md";
import useMutation from "@libs/client/useMutation";
import { useForm } from "react-hook-form";

interface PostResponse extends APIResponse {
  id: number;
}

interface RegistForm {
  title: string;
  tags: string;
  date: string;
  content: string;
}

const Write: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const [isHide, setIsHide] = useState(false);
  const [post, { loading, data, error }] =
    useMutation<PostResponse>("/api/gallery");
  const { register, handleSubmit, setValue } = useForm<RegistForm>();
  const onPost = async (formData: RegistForm) => {
    return;
    post({
      title: formData.title,
      content: formData.date,
      isHide,
      tags: formData.tags,
    });
  };
  useEffect(() => {
    if (data && data.result) {
      router.push(`/gallery/post/${data.id}`);
    } else if (data?.error) {
      alert(data.error);
    }
  }, [data, router]);
  useEffect(() => {
    setValue(
      "date",
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    );
  }, [setValue]);

  return (
    <Layout user={user} activeMenu="GALLERY">
      <div className={styles.galleryContainer}>
        <form onSubmit={handleSubmit(onPost)}>
          <div style={{ display: "flex", gap: 24 }}>
            <input
              placeholder="제목을 입력해 주세요."
              {...register("title")}
              className={styles.postTitleInput}
            />
            <input {...register("date")} className={styles.postDateInput} />
          </div>
          <div className={styles.imageEditWrap}>
            <div className={styles.imageNoneBox}>이미지를 추가해 주세요.</div>
            <ul className={styles.imageRegistWrap}>
              <li className={styles.imageRegistItem}></li>
              <button type="button" className={styles.BtnImageRegist}>
                <MdUploadFile />
              </button>
            </ul>
          </div>
          <div className={styles.sectionTitle}>내용</div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className={styles.postContetInput}
          />
          <div className={styles.sectionTitle}>태그</div>
          <div className={styles.btnPostingBox}>
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
        destination: "/gallery",
      },
      props: {},
    };
  }
  return {
    props: { user: user ? user : null },
  };
});

export default Write;
