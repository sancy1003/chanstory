import Layout from '@components/Layout';
import type { NextPage, NextPageContext } from 'next';
import SimpleImageSlider from 'react-simple-image-slider/dist';
import React, { useEffect, useState } from 'react';
import { APIResponse } from 'types/response';
import { withSsrSession } from '@libs/server/withSession';
import { useRouter } from 'next/router';
import { MdUploadFile, MdClose } from 'react-icons/md';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { FileUploader } from 'react-drag-drop-files';
import TagEditor from '@components/post/TagEditor';
import uploadImageToStorage from '@libs/client/uploadImageToStorage';
import Lottie from 'react-lottie-player';
import ring from '@resource/lottie/ring.json';
import * as S from '@styles/pages/gallery.style';

interface PostResponse extends APIResponse {
  id: number;
}

interface RegistForm {
  title: string;
  date: string;
  content: string;
}

const fileTypes = ['JPG', 'PNG', 'GIF'];

const GalleryWrite: NextPage = () => {
  const router = useRouter();
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const isHide = false;
  const [isDrag, setIsDrag] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [imageList, setImageList] = useState<File[]>([]);
  const [post, { loading, data }] = useMutation<PostResponse>('/api/gallery');
  const { register, handleSubmit, setValue } = useForm<RegistForm>();

  const onPost = async (formData: RegistForm) => {
    if (loading || imageUploadLoading) return;
    setImageUploadLoading(true);
    const imageURLs = [];
    for (let i = 0; i < imageList.length; i++) {
      const imageFile = new File([imageList[i]], 'image');
      const imageURL = await uploadImageToStorage(
        imageFile,
        `gallery_${formData.title}_${i}`
      );
      imageURLs.push(imageURL);
    }

    if (imageURLs) {
      setImageUploadLoading(false);
      post({
        createdAt: new Date(formData.date),
        thumbnailURL: imageURLs[0],
        imageURLs: imageURLs.join(', '),
        title: formData.title,
        content: formData.content,
        isHide,
        tags: tags.join(', '),
      });
    }
  };

  const imageRegistHandler = (files: File[]) => {
    const tempImagelist = [...imageList];
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push(files[i]);
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
      'date',
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    );
  }, [setValue]);

  return (
    <>
      {(loading || imageUploadLoading) && (
        <S.UploadLoadingContainer>
          <Lottie
            loop
            animationData={ring}
            play
            style={{ width: 200, height: 200, margin: '0 auto' }}
          />
        </S.UploadLoadingContainer>
      )}

      <Layout activeMenu="GALLERY">
        <S.GalleryContainer>
          <S.PostingForm onSubmit={handleSubmit(onPost)}>
            <S.PostingTitleBox>
              <input
                placeholder="제목을 입력해 주세요."
                {...register('title')}
                className="titleInput"
              />
              <input {...register('date')} className="dateInput" />
            </S.PostingTitleBox>
            <S.ImageEditContainer>
              {imageList.length === 0 ? (
                <div className="imageEmptyBox">이미지를 추가해 주세요.</div>
              ) : (
                <div className="imagePrevBox">
                  <SimpleImageSlider
                    style={{
                      backgroundSize: 'contain',
                      backgroundRepeat: 'none',
                    }}
                    width={'100%'}
                    height={'100%'}
                    images={imageList.map((item) => {
                      return { url: URL.createObjectURL(item) };
                    })}
                    showBullets={true}
                    showNavs={true}
                    bgColor="#E1DFE9"
                  />
                </div>
              )}
              <S.UploadImageList>
                {imageList.map((image, index) => {
                  return (
                    <li key={index}>
                      <div className="cover">
                        <MdClose onClick={() => imageDeleteHandler(index)} />
                      </div>
                      <img
                        alt="갤러리 이미지"
                        src={URL.createObjectURL(image)}
                      />
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
                  <S.BtnUploadImage type="button">
                    {!isDrag && <MdUploadFile />}
                  </S.BtnUploadImage>
                </FileUploader>
              </S.UploadImageList>
            </S.ImageEditContainer>
            <div className="sectionTitle">내용</div>
            <S.ContentTextarea
              {...register('content')}
              placeholder="내용을 입력해 주세요."
            />
            <div className="sectionTitle">태그</div>
            <div style={{ marginBottom: 50 }}>
              <TagEditor tags={tags} setTags={setTags} />
            </div>
            <S.ButtonBox>
              <S.BtnWrite>포스팅</S.BtnWrite>
            </S.ButtonBox>
          </S.PostingForm>
        </S.GalleryContainer>
      </Layout>
    </>
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
        destination: '/gallery',
      },
      props: {},
    };
  }
  return {
    props: { user: user ? user : null },
  };
});

export default GalleryWrite;
