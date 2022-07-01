import Layout from "@components/layout";
import type { NextPage } from "next";
import styles from "@styles/gallery.module.css";
import { dateToString } from "@libs/client/commonFunction";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { useState } from "react";
import { PostListWithCountResponse } from "types/response";
import GalleryItem from "@components/gallery/gallery-item";

const Gallery: NextPage = () => {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(1);
  const { data, error } = useSWR<PostListWithCountResponse>(
    `/api/gallery?page=${page}`
  );

  console.log(data, "data");

  return (
    <Layout user={user} userLoading={isLoading}>
      <div className={styles.galleryContainer}>
        <ul className={styles.galleryList}>
          {data?.posts?.map((post, index) => {
            return (
              <li key={post.id} className={styles.galleryListItem}>
                <GalleryItem
                  commentNum={post.commentCount}
                  createdAt={dateToString(post.createdAt)}
                  imageURL={post.thumbnailURL}
                  postId={post.id}
                  title={post.title}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Gallery;
