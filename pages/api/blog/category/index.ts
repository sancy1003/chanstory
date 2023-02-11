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
    const { category } = req.query;
    const postCount = await client.post.count({
      where: { isHide: false, category: +category },
    });
    const posts = await client.post.findMany({
      where: { isHide: false, category: +category },
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
      take: 8,
      skip: 8 * (+page - 1),
      orderBy: { createdAt: 'desc' },
    });
    return res.json({
      result: true,
      postCount,
      posts: posts.map((post) => {
        return {
          ...post,
          commentCount: post._count.comments + post._count.recomments,
        };
      }),
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
