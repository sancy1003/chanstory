import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

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
    console.log("1");
    return res.json({
      ok: false,
      error: "이미 사용중인 아이디가 있어요.",
    });
  }
  if (checkNickname) {
    console.log("2");
    return res.json({
      ok: false,
      error: "이미 사용중인 닉네임이 있어요.",
    });
  }
  const user = await client.user.create({
    data: {
      account,
      password,
      nickname,
    },
  });
  console.log("성공");
  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
});
