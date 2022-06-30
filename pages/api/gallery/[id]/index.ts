import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const post = await client.post.findUnique({
      where: { id: +id },
    });
    res.json({
      result: true,
      post,
    });
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    await client.post.delete({
      where: {
        id: +id,
      },
    });
    res.json({
      result: true,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "DELETE"],
    handler,
  })
);
