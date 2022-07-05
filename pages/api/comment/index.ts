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
    let comments = await client.comment.findMany({
      where: { postId: +id },
      include: {
        author: true,
        recomments: {
          include: {
            author: true,
            tagUser: true,
          },
        },
      },
    });
    res.json({
      result: true,
      comments,
    });
  }
  if (req.method === "POST") {
    const { id } = req.query;
    const { user } = req.session;
    const { comment: content, commentId } = req.body;
    if (!user) {
      return res.json({
        result: false,
      });
    }
    if (!commentId) {
      const comment = await client.comment.create({
        data: {
          content,
          author: {
            connect: {
              id: user?.id,
            },
          },
          post: {
            connect: {
              id: +id,
            },
          },
        },
      });
    } else {
      await client.comment.update({
        where: {
          id: commentId,
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
    methods: ["GET", "POST", "DELETE"],
    handler,
  })
);
