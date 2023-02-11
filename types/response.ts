import { CommentWithAuthor, RecommentWithAuthor } from './comment';
import { PostsList, PostWithComments } from './post';

export interface APIResponse {
  result: boolean;
  error?: string;
}
export interface PostListResponse extends APIResponse {
  newPosts: PostsList[];
  //hotPosts: PostsList[];
}
export interface PostListWithCountResponse extends APIResponse {
  posts: PostsList[];
  postCount: number;
}
export interface PostDetailResponse extends APIResponse {
  post: PostWithComments;
}
export interface CommentRegistResponse extends APIResponse {
  comment: CommentWithAuthor;
}
export interface RecommentRegistResponse extends APIResponse {
  recomment: RecommentWithAuthor;
}
