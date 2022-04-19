import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { account, password } = req.body;
  const foundUser = await client.user.findUnique({
    where: {
      account,
    },
  });
  if (!foundUser) {
    return res.json({
      result: false,
      error: "아이디 혹은 비밀번호가 일치하지 않습니다.",
    });
  }
  if (password !== foundUser.password) {
    return res.json({
      result: false,
      error: "아이디 혹은 비밀번호가 일치하지 않습니다.",
    });
  }
  req.session.user = {
    id: foundUser.id,
    account: foundUser.account,
    profileURL: foundUser.profileURL,
    nickname: foundUser.nickname,
    role: foundUser.role,
    status: foundUser.status,
  };
  await req.session.save();
  res.json({ result: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
