import { Recomment, User, Comment } from "@prisma/client";

export interface CommentWithAuthor extends Comment {
  author: User;
  recomments: RecommentWithAuthor[];
}
export interface RecommentWithAuthor extends Recomment {
  author: User;
  tagUser: User;
}
export interface CommentForm {
  comment: string;
}
export interface CommentState {
  type: string;
  id: number;
  content: string;
  basicCommentId?: number;
}
export interface RecommentState {
  id: number;
  nickname: string;
  tagedUserId: number;
}
