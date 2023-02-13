import { GetStaticPropsContext, NextPage } from 'next';
import styles from '@styles/blog.module.css';
import Layout from '@components/layout';
import { FaChevronLeft } from 'react-icons/fa';
import {
  dateToString,
  dateToStringFromServer,
  formattingImageURL,
} from '@libs/client/commonFunction';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';
import ring from '@resource/lottie/ring.json';
import client from '@libs/server/client';
import Comment from 'backup/comment';
import { Post } from '@prisma/client';

interface postFromSSG extends Post {
  url: string;
  description: string;
}

interface PostProps {
  post: postFromSSG;
}

const Viewer = dynamic(() => import('@components/viewer'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100vh', paddingTop: '100px' }}>
      <Lottie
        loop
        animationData={ring}
        play
        style={{ width: 150, height: 150, margin: '0 auto' }}
      />
    </div>
  ),
});

const PostDetail: NextPage<PostProps> = ({ post }) => {
  const router = useRouter();
  const tags = post.tags?.split(', ');
  return (
    <Layout
      activeMenu="BLOG"
      description={post.description}
      title={post.title}
      thumbnailURL={formattingImageURL(post.thumbnailURL)}
      keywords={post.tags}
      url={post.url}
    >
      <div className={styles.postContentContainer}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft onClick={() => router.back()} />
            <h1>{post?.title}</h1>
          </div>
          <div className={styles.postingRegistTime}>
            {dateToString(post.createdAt)}
          </div>
        </div>
        <div className={styles.postingContentWrap}>
          <div className={styles.postingCotnet}>
            <Viewer content={post.content!} />
          </div>
          {tags && tags.length > 0 ? (
            <ul className={styles.postingTag}>
              {tags.map((tag: string, idx: number) => {
                return <li key={idx}># {tag}</li>;
              })}
            </ul>
          ) : (
            ''
          )}
        </div>
        <Comment />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = [];
  const blogPosts = await client.post?.findMany({
    where: {
      isHide: false,
      type: 'POST',
    },
    select: {
      id: true,
    },
  });

  for (const data of blogPosts) {
    paths.push({ params: { id: String(data.id) } });
  }

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = await client.post?.findUnique({
    where: {
      id: Number(params?.id),
    },
    select: {
      id: true,
      title: true,
      thumbnailURL: true,
      content: true,
      tags: true,
      imageURLs: true,
      createdAt: true,
    },
  });

  let description = '';

  if (post?.content) {
    if (post?.content.length > 150)
      description = post?.content.substring(0, 150);
    else description = post?.content;
  }

  return {
    revalidate: 600,
    props: {
      post: {
        ...post,
        description,
        url: `${process.env.SITE_URL}/blog/post/${post?.id}`,
        createdAt: dateToStringFromServer(post?.createdAt!),
      },
    },
  };
}

export default PostDetail;
