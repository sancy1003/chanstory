import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
    const { user } = req.session;
    if (!user || user?.role !== "ADMIN") {
      return res.json({
        result: false,
      });
    }
    const {
      body: { content, tags, category, title, thumbnailURL, isHide },
    } = req;
    const post = await client.post.create({
      data: {
        content,
        tags: tags ? tags : null,
        category,
        title,
        thumbnailURL: thumbnailURL ? thumbnailURL : null,
        isHide: isHide ? isHide : false,
      },
    });

    return res.json({
      result: true,
      id: post.id,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
