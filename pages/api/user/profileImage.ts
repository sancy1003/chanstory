import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  if (!user) {
    return res.json({
      result: false,
      error: '유저 정보가 없습니다.',
    });
  }
  if (req.method === 'POST') {
    const { profileURL } = req.body;
    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        profileURL,
      },
    });
    req.session.user = {
      ...user,
      profileURL,
    };
    await req.session.save();
    return res.json({
      result: true,
    });
  }
  if (req.method === 'DELETE') {
    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        profileURL: null,
      },
    });
    req.session.user = {
      ...user,
      profileURL: null,
    };
    await req.session.save();
    return res.json({
      result: true,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['POST', 'DELETE'],
    handler,
    isPrivate: true,
  })
);
