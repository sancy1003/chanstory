import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id: postId } = req.query;
  if (req.method === "POST") {
    const { user } = req.session;
    const { content } = req.body;
    if (!user) {
      return res.json({
        result: false,
      });
    }
    await client.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +postId,
          },
        },
      },
    });

    return res.json({
      result: true,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
