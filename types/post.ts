import { Post } from "@prisma/client";
import { CommentWithAuthor } from "./comment";

export interface PostsList {
  id: number;
  title: string;
  commentCount: number;
  createdAt: string;
  thumbnailURL: string | null;
  _count: {
    comments: number;
    recomments: number;
  };
}
export interface PostRegistForm {
  title: string;
  tags: string;
  category: string;
  thumbnailImage: FileList;
}
export interface PostWithComments extends Post {
  imageURLs: string;
  comments: CommentWithAuthor[];
}
