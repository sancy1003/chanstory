import Layout from '@components/Layout';
import type { NextPage } from 'next';
import { dateToString } from '@libs/client/commonFunction';
import useSWR from 'swr';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostListWithCountResponse } from 'types/response';
import GalleryItem from '@components/gallery/GalleryItem';
import { SimplePostType } from 'types/post';
import GalleryItemSkeleton from '@components/gallery/GalleryItemSkeleton';
import * as S from '@styles/pages/gallery.style';

const Gallery: NextPage = () => {
  const [leftPosts, setLeftPost] = useState<SimplePostType[]>([]);
  const [rightPosts, setRightPosts] = useState<SimplePostType[]>([]);
  const [posts, setPosts] = useState<SimplePostType[]>([]);
  const [scrollLoading, setScrollLoading] = useState<boolean>(false);
  const maxPage = useRef(0);
  const page = useRef(1);
  const { data } = useSWR<PostListWithCountResponse>(
    `/api/gallery?page=${page.current}`
  );

  const observer = useRef<null | IntersectionObserver>(null);

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
      const left: SimplePostType[] = [];
      const right: SimplePostType[] = [];
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
    <Layout activeMenu={'GALLERY'}>
      <S.GalleryContainer>
        <S.GalleryListContainer>
          <S.GalleryList>
            {leftPosts.map((post) => {
              return (
                <li key={post.id}>
                  <GalleryItem
                    createdAt={dateToString(post.createdAt)}
                    imageURL={post.thumbnailURL}
                    postId={post.id}
                    title={post.title}
                  />
                </li>
              );
            })}
            {(!data || scrollLoading) &&
              [0, 0].map((item, index) => <GalleryItemSkeleton key={index} />)}
          </S.GalleryList>
          <S.GalleryList>
            {rightPosts.map((post) => {
              return (
                <li key={post.id}>
                  <GalleryItem
                    createdAt={dateToString(post.createdAt)}
                    imageURL={post.thumbnailURL}
                    postId={post.id}
                    title={post.title}
                  />
                </li>
              );
            })}
            {(!data || scrollLoading) &&
              [0, 0].map((_, index) => <GalleryItemSkeleton key={index} />)}
          </S.GalleryList>
          <S.MobileGalleryList>
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <GalleryItem
                    createdAt={dateToString(post.createdAt)}
                    imageURL={post.thumbnailURL}
                    postId={post.id}
                    title={post.title}
                  />
                </li>
              );
            })}
            {(!data || scrollLoading) &&
              [0, 0].map((item, index) => <GalleryItemSkeleton key={index} />)}
          </S.MobileGalleryList>
        </S.GalleryListContainer>
        {posts && (
          <div
            style={{ height: 100, display: 'flex', alignItems: 'flex-start' }}
            ref={lastPostElementRef}
          />
        )}
      </S.GalleryContainer>
    </Layout>
  );
};

export default Gallery;
