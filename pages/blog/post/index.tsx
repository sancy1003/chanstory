import Layout from '@components/layout';
import type { NextPage, NextPageContext } from 'next';
import { withSsrSession } from '@libs/server/withSession';
import dynamic from 'next/dynamic';
import useMutation from '@libs/client/useMutation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { APIResponse } from 'types/response';
import { PostRegistForm } from 'types/post';
import * as S from '@styles/pages/blog.style';

interface PostResponse extends APIResponse {
  id: number;
}

const PostEditor = dynamic(() => import('@components/post/editor'), {
  ssr: false,
});

const BlogWrite: NextPage = () => {
  const router = useRouter();
  const [isHide, setIsHide] = useState(false);
  const [post, { loading, data }] = useMutation<PostResponse>('/api/blog');
  const { register, handleSubmit } = useForm<PostRegistForm>();
  const [content, setContent] = useState('내용을 입력해주세요.');
  const onPost = async (formData: PostRegistForm) => {
    if (loading) return;
    let Imageurl = null;
    if (formData.thumbnailImage && formData.thumbnailImage.length > 0) {
      const { uploadURL } = await (await fetch(`/api/uploadImage`)).json();
      const form = new FormData();
      form.append(
        'file',
        formData.thumbnailImage[0],
        `thumbnail_${formData.title}`
      );
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
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
    <Layout activeMenu="BLOG">
      <S.BlogContainer>
        <S.PostingForm onSubmit={handleSubmit(onPost)}>
          <input {...register('title')} className="titleInput" />
          <PostEditor content={content} fn={setContent} />
          <S.PostingOptionBox>
            <div>
              <input
                {...register('tags')}
                placeholder="태그 입력 ', '로 여러 태그 입력"
              />
              <div>
                <span>썸네일</span>
                <input
                  style={{ marginLeft: 10, marginRight: 20, cursor: 'pointer' }}
                  {...register('thumbnailImage')}
                  id="input-file"
                  type="file"
                  accept="image/*"
                />
              </div>
              <input
                {...register('category')}
                placeholder="카테고리 / 1: 개발일기 2: 스터디 3: 취미 4: 일상"
              />
              <div onClick={() => setIsHide(!isHide)}>
                숨기기 {isHide ? 'on' : 'off'}
              </div>
            </div>
            <S.BtnPost>포스팅</S.BtnPost>
          </S.PostingOptionBox>
        </S.PostingForm>
      </S.BlogContainer>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  if (user?.role !== 'ADMIN') {
    return {
      redirect: {
        permanent: false,
        destination: '/blog',
      },
      props: {},
    };
  }
  return {
    props: { user: user ? user : null },
  };
});

export default BlogWrite;
