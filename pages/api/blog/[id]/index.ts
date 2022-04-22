import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const post = await client.post.findUnique({
      where: { id: +id },
      include: {
        comments: {
          select: { id: true, updatedAt: true, content: true, status: true },
          include: {
            author: {
              select: { id: true, nickname: true },
            },
            recomments: {
              select: {
                id: true,
                updatedAt: true,
                content: true,
                status: true,
              },
              include: {
                author: {
                  select: { id: true, nickname: true },
                },
                tagUser: {
                  select: { id: true, nickname: true },
                },
              },
            },
          },
        },
      },
    });
    res.json({
      result: true,
      post,
    });
  }
  if (req.method === "POST") {
  }
  if (req.method === "DELETE") {
    await client.post.delete({
      where: {
        id: +id,
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
