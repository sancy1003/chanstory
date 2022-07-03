import Layout from "@components/layout";
import type { NextPage, NextPageContext } from "next";
import styles from "@styles/gallery.module.css";
import SimpleImageSlider from "react-simple-image-slider/dist";
import React, { useEffect, useState } from "react";
import { APIResponse } from "types/response";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { useRouter } from "next/router";
import { MdUploadFile, MdClose } from "react-icons/md";
import useMutation from "@libs/client/useMutation";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import TagEditor from "@components/post/tag-editor";

interface PostResponse extends APIResponse {
  id: number;
}

interface RegistForm {
  title: string;
  date: string;
  content: string;
}

const fileTypes = ["JPG", "PNG", "GIF"];

const Write: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const [isHide, setIsHide] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [imageList, setImageList] = useState<{ url: string }[]>([]);
  const [post, { loading, data, error }] =
    useMutation<PostResponse>("/api/gallery");
  const { register, handleSubmit, setValue } = useForm<RegistForm>();
  const onPost = async (formData: RegistForm) => {
    return;
    post({
      createdAt: new Date(formData.date).toUTCString(),
      imageURLs: "",
      title: formData.title,
      content: formData.date,
      isHide,
      tags: tags.join(", "),
    });
  };

  const imageRegistHandler = (files: File[]) => {
    let tempImagelist = [...imageList];
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push({ url: URL.createObjectURL(files[i]) });
    }
    setImageList(tempImagelist);
  };

  const imageDeleteHandler = (index: number) => {
    setImageList([...imageList].filter((item, idx) => idx !== index));
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
            {imageList.length === 0 ? (
              <div className={styles.imageNoneBox}>이미지를 추가해 주세요.</div>
            ) : (
              <div className={styles.imagePrevBox}>
                <SimpleImageSlider
                  style={{
                    backgroundSize: "contain",
                    backgroundRepeat: "none",
                  }}
                  width={"100%"}
                  height={"100%"}
                  images={imageList}
                  showBullets={true}
                  showNavs={true}
                  bgColor="#E1DFE9"
                />
              </div>
            )}
            <ul className={styles.imageRegistWrap}>
              {imageList.map((image, index) => {
                return (
                  <li key={index} className={styles.imageRegistItem}>
                    <div className={styles.imageRegistItemCover}>
                      <MdClose onClick={() => imageDeleteHandler(index)} />
                    </div>
                    <img alt="갤러리 이미지" src={image.url} />
                  </li>
                );
              })}
              <FileUploader
                handleChange={imageRegistHandler}
                name="file"
                types={fileTypes}
                multiple={true}
                hoverTitle="놓으세요!"
                onDraggingStateChange={(dragging: boolean) =>
                  setIsDrag(dragging)
                }
              >
                <button type="button" className={styles.BtnImageRegist}>
                  {!isDrag && <MdUploadFile />}
                </button>
              </FileUploader>
            </ul>
          </div>
          <div className={styles.sectionTitle}>내용</div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className={styles.postContetInput}
          />
          <div className={styles.sectionTitle}>태그</div>
          <div style={{ marginBottom: 50 }}>
            <TagEditor tags={tags} setTags={setTags} />
          </div>
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