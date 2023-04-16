import { Post } from '@prisma/client';
import { CommentWithAuthor } from './comment';

export interface SimplePostType {
  id: number;
  title: string;
  createdAt: string;
  category: number;
  thumbnailURL: string | null;
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
