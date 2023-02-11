import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const { page } = req.query;
    const postCount = await client.post.count({
      where: { isHide: false, type: 'GALLERY' },
    });
    const galleryPosts = await client.post.findMany({
      where: { isHide: false, type: 'GALLERY' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        imageURLs: true,
        _count: {
          select: {
            comments: true,
            recomments: true,
          },
        },
      },
      take: 8,
      skip: 8 * (+page - 1),
      orderBy: { createdAt: 'desc' },
    });
    return res.json({
      result: true,
      postCount,
      posts: galleryPosts.map((post) => {
        return {
          ...post,
          commentCount: post._count.comments + post._count.recomments,
          thumbnailURL: post.imageURLs?.split(', ')[0],
        };
      }),
    });
  }
  if (req.method === 'POST') {
    const { user } = req.session;
    if (!user || user?.role !== 'ADMIN') {
      return res.json({
        result: false,
      });
    }
    const {
      body: { content, tags, title, isHide, postId, createdAt, imageURLs },
    } = req;
    if (!postId) {
      const post = await client.post.create({
        data: {
          createdAt,
          content: content ? content : null,
          tags: tags ? tags : null,
          title,
          imageURLs,
          isHide: isHide ? isHide : false,
          type: 'GALLERY',
        },
      });
      return res.json({
        result: true,
        id: post.id,
      });
    } else {
      await client.post.update({
        where: {
          id: postId,
        },
        data: {
          content: content ? content : null,
          tags: tags ? tags : null,
          title,
          createdAt,
          imageURLs,
          isHide: isHide ? isHide : false,
        },
      });
      return res.json({
        result: true,
      });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
