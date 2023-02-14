import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import client from '@libs/server/client';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const posts = await client.post.findMany({
    where: { isHide: false },
    select: { id: true, type: true },
  });

  const postFileds = posts.map((post) => ({
    loc: `${process.env.SITE_URL}/${
      post.type === 'GALLERY' ? 'gallery' : 'blog'
    }/post/${post.id}`, // Absolute url
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  }));

  const fields = [...postFileds];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {
  return;
};
