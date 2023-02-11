import { encryptPassword } from '@libs/server/bcrypt';
import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { account, password, nickname } = req.body;
  const checkAccount = await client.user.findUnique({
    where: {
      account,
    },
  });
  const checkNickname = await client.user.findUnique({
    where: {
      nickname,
    },
  });
  if (checkAccount) {
    return res.json({
      result: false,
      error: '이미 사용중인 아이디가 있어요.',
    });
  }
  if (checkNickname) {
    return res.json({
      result: false,
      error: '이미 사용중인 닉네임이 있어요.',
    });
  }
  const encryptedPassword = await encryptPassword(password);
  await client.user.create({
    data: {
      account,
      password: encryptedPassword,
      nickname,
    },
  });
  return res.json({
    result: true,
  });
}

export default withHandler({
  methods: ['POST'],
  handler,
});
