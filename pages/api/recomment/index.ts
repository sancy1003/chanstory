import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { comment: content, tagedUserId, commentId, recommentId } = req.body;
    const { id: postId, type } = req.query;
    const { user } = req.session;
    if (!user) {
      return res.json({
        result: false,
      });
    }
    if (!recommentId) {
      const createdRecomment = await client.recomment.create({
        data: {
          content,
          author: {
            connect: {
              id: user?.id,
            },
          },
          tagUser: {
            connect: {
              id: tagedUserId,
            },
          },
          post: {
            connect: {
              id: +postId,
            },
          },
          comment: {
            connect: {
              id: +commentId,
            },
          },
        },
      });
    } else {
      await client.recomment.update({
        where: {
          id: recommentId,
        },
        data: {
          content,
        },
      });
    }

    return res.json({
      result: true,
    });
  }
  if (req.method === "DELETE") {
    const { id: commentId } = req.query;
    await client.recomment.delete({
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
