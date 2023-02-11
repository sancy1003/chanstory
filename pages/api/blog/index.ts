import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const newPosts = await client.post.findMany({
      where: { isHide: false, type: 'POST' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        thumbnailURL: true,
        _count: {
          select: {
            comments: true,
            recomments: true,
          },
        },
      },
      take: 4,
      orderBy: { createdAt: 'desc' },
    });
    const hotPosts = await client.post.findMany({
      where: { isHide: false, type: 'POST' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        thumbnailURL: true,
        _count: {
          select: {
            comments: true,
            recomments: true,
          },
        },
      },
      take: 4,
      orderBy: [
        {
          comments: {
            _count: 'desc',
          },
        },
        {
          recomments: {
            _count: 'desc',
          },
        },
      ],
    });
    return res.json({
      result: true,
      newPosts: newPosts.map((post) => {
        return {
          ...post,
          commentCount: post._count.comments + post._count.recomments,
        };
      }),
      hotPosts: hotPosts.map((post) => {
        return {
          ...post,
          commentCount: post._count.comments + post._count.recomments,
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
      body: { content, tags, category, title, thumbnailURL, isHide, postId },
    } = req;
    if (!postId) {
      const post = await client.post.create({
        data: {
          content,
          tags: tags ? tags : null,
          category,
          title,
          thumbnailURL: thumbnailURL ? thumbnailURL : null,
          isHide: isHide ? isHide : false,
          type: 'POST',
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
          content,
          tags: tags ? tags : null,
          category,
          title,
          thumbnailURL: thumbnailURL ? thumbnailURL : null,
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
