import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  await req.session.destroy();
  res.json({ result: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
