import { CommentWithAuthor, RecommentWithAuthor } from './comment';
import { PostWithComments, SimplePostType } from './post';

export interface APIResponse {
  result: boolean;
  error?: string;
}
export interface PostListResponse {
  newBlogPosts: SimplePostType[];
  newGalleryPosts: SimplePostType[];
  //hotPosts: PostsList[];
}
export interface PostListWithCountResponse extends APIResponse {
  posts: SimplePostType[];
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
