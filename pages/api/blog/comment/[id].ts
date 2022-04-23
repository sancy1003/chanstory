import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { id: postId } = req.query;
    const { user } = req.session;
    const { content } = req.body;
    if (!user) {
      return res.json({
        result: false,
      });
    }
    const createdComment = await client.comment.create({
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
    const comment = await client.comment.findUnique({
      where: { id: createdComment.id },
      include: {
        author: {},
        recomments: {},
      },
    });

    return res.json({
      result: true,
      comment,
    });
  }
  if (req.method === "DELETE") {
    const { id: commentId } = req.query;
    await client.comment.delete({
      where: {
        id: +commentId,
      },
    });
    return res.json({
      result: true,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "DELETE"],
    handler,
    isPrivate: true,
  })
);
