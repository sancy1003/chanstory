import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  if (!user) {
    return res.json({
      result: false,
      error: "유저 정보가 없습니다.",
    });
  }
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: user?.id },
    });
    res.json({
      result: true,
      profile,
    });
  }
  if (req.method === "POST") {
    const { nickname, password } = req.body;
    if (nickname) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          nickname,
        },
      });
      req.session.user = {
        ...user,
        nickname,
      };
      await req.session.save();
    } else if (password) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          password,
        },
      });
    }
  }
  if (req.method === "DELETE") {
    await client.user.delete({
      where: {
        id: user?.id,
      },
    });
    req.session.destroy();
    res.json({
      result: true,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST", "DELETE"],
    handler,
  })
);
