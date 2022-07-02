import Layout from "@components/layout";
import type { NextPage } from "next";
import styles from "@styles/gallery.module.css";
import { dateToString } from "@libs/client/commonFunction";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PostListWithCountResponse } from "types/response";
import GalleryItem from "@components/gallery/gallery-item";
import { PostsList } from "types/post";
import Lottie from "react-lottie-player";
import ring from "@resource/lottie/ring.json";

const Gallery: NextPage = () => {
  const { user, isLoading } = useUser();
  const [leftPosts, setLeftPost] = useState<PostsList[]>([]);
  const [rightPosts, setRightPosts] = useState<PostsList[]>([]);
  const [posts, setPosts] = useState<PostsList[]>([]);
  const [scrollLoading, setScrollLoading] = useState<boolean>(false);
  const maxPage = useRef(0);
  const page = useRef(1);
  const { data, error, mutate } = useSWR<PostListWithCountResponse>(
    `/api/gallery?page=${page.current}`
  );

  const observer = useRef<any>(null);

  const lastPostElementRef = useCallback(
    (element: HTMLDivElement) => {
      if (scrollLoading) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (maxPage.current > 0 && page.current < maxPage.current) {
            setScrollLoading(true);
            if (page.current < maxPage.current) page.current += 1;
          }
        }
      });
      if (observer.current) observer.current.disconnect();
      if (element) {
        observer.current.observe(element);
      }
    },
    [scrollLoading, maxPage, page]
  );

  useEffect(() => {
    if (data && data.result) {
      let left: PostsList[] = [];
      let right: PostsList[] = [];
      data.posts.forEach((post, idx) => {
        if (idx % 2 === 0) left.push(post);
        else right.push(post);
      });
      setLeftPost([...leftPosts, ...left]);
      setRightPosts([...rightPosts, ...right]);
      setPosts([...posts, ...data.posts]);
      maxPage.current = Math.ceil(data.postCount / 8);
      setScrollLoading(false);
    }
  }, [data]);

  return (
    <Layout user={user} userLoading={isLoading} activeMenu={"GALLEY"}>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryListWrap}>
          <ul className={styles.galleryList}>
            {leftPosts.map((post) => {
              return (
                <li
                  id="masonryItem"
                  key={post.id}
                  className={styles.galleryListItem}
                >
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
          <ul className={styles.galleryList}>
            {rightPosts.map((post) => {
              return (
                <li
                  id="masonryItem"
                  key={post.id}
                  className={styles.galleryListItem}
                >
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
          <ul className={styles.galleryListM}>
            {posts.map((post) => {
              return (
                <li
                  id="masonryItem"
                  key={post.id}
                  className={styles.galleryListItem}
                >
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
        {posts && (
          <div
            style={{ height: 100, display: "flex", alignItems: "flex-start" }}
            ref={lastPostElementRef}
          >
            {scrollLoading && (
              <div style={{ width: "100%", marginBottom: "50px" }}>
                <Lottie
                  loop
                  animationData={ring}
                  play
                  style={{ width: 150, height: 150, margin: "0 auto" }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
