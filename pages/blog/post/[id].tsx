import { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import Layout from "@components/layout";
import PostItem from "@components/blog/post-item";
import { FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { dateToString, loadProfileURL } from "@libs/client/commonFunction";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import useMutation from "@libs/client/useMutation";
import { useForm } from "react-hook-form";
import { Comment, Recomment, User } from "@prisma/client";

interface PostProps {
  user: SessionUserData | null;
}
interface CommentResponse {
  result: boolean;
  error?: string;
}
interface CommentForm {
  comment: string;
}
interface CommentWithAuthor extends Comment {
  author: User;
  recomments: Recomment[];
}

const Viewer = dynamic(() => import("@components/viewer"), { ssr: false });

const Post: NextPage<PostProps> = ({ user }) => {
  const router = useRouter();
  const { data } = useSWR<any>(
    router?.query?.id ? `/api/blog/${router.query.id}` : null
  );
  const [regist, { loading, data: commentData, error }] =
    useMutation<CommentResponse>(`/api/blog/comment/${router?.query?.id}`);
  const { register, watch, handleSubmit } = useForm<CommentForm>();
  const onRegistComment = (commentForm: CommentForm) => {
    if (loading) return;
    regist({ content: commentForm.comment });
  };
  const tags = data?.post?.tags?.split(", ");
  console.log(data?.post);
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft />
            <div>{data?.post?.title}</div>
          </div>
          <div className={styles.postingRegistTime}>
            {dateToString(data?.post?.createdAt)}
          </div>
        </div>
        <div className={styles.postingContentWrap}>
          <div className={styles.postingCotnet}>
            {data?.post?.content && <Viewer content={data?.post?.content} />}
          </div>
          {tags && tags.length > 0 ? (
            <ul className={styles.postingTag}>
              {tags.map((tag: string, idx: number) => {
                return <li key={idx}># {tag}</li>;
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className={styles.commentWrap}>
          {data?.post.comments.map(
            (comment: CommentWithAuthor, idx: number) => {
              return (
                <div className={styles.commentBox} key={`comment_${idx}`}>
                  <img
                    className={styles.profileImage}
                    src={loadProfileURL(
                      comment.author.profileURL
                        ? comment.author.profileURL
                        : "",
                      "avatar"
                    )}
                  />
                  <div className={styles.comment}>
                    <div className={styles.commentInfo}>
                      <div className={styles.commentWriterInfo}>
                        <div className={styles.nickname}>
                          {comment.author.nickname}
                        </div>
                        <div className={styles.registTime}>
                          {dateToString(comment.author.createdAt)}
                        </div>
                      </div>
                      <FaEllipsisH />
                    </div>
                    <div className={styles.commentContent}>
                      {comment.content}
                    </div>
                  </div>
                </div>
              );
            }
          )}
          <div>
            <div className={styles.commentBox} style={{ marginBottom: "30px" }}>
              <img className={styles.profileImage} src="#" />
              <div className={styles.comment}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentWriterInfo}>
                    <div className={styles.nickname}>상하이버거</div>
                    <div className={styles.registTime}>2022-04-15</div>
                  </div>
                  <FaEllipsisH />
                </div>
                <div className={styles.commentContent}>
                  {`포스팅 잘 보고갑니다.`}
                </div>
              </div>
            </div>
            <div className={styles.underCommentBox}>
              <img className={styles.profileImage} src="#" />
              <div className={styles.comment}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentWriterInfo}>
                    <div className={styles.nickname}>주인</div>
                    <div className={styles.registTime}>2022-04-15</div>
                  </div>
                  <FaEllipsisH />
                </div>
                <div className={styles.commentContent}>
                  <span>@ 상하이버거</span>
                  {`감사합니다.`}
                </div>
              </div>
            </div>
            <div className={styles.underCommentBox}>
              <img className={styles.profileImage} src="#" />
              <div className={styles.comment}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentWriterInfo}>
                    <div className={styles.nickname}>상하이버거</div>
                    <div className={styles.registTime}>2022-04-15</div>
                  </div>
                  <FaEllipsisH />
                </div>
                <div className={styles.commentContent}>
                  <span>@ 주인</span>
                  {`넴`}
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onRegistComment)}>
            <div className={styles.commentBox} style={{ marginBottom: 10 }}>
              <img
                className={styles.profileImage}
                src={loadProfileURL(
                  user?.profileURL ? user?.profileURL : "",
                  "avatar"
                )}
              />
              <textarea
                {...register("comment", {
                  required: true,
                })}
                placeholder="댓글을 남겨보세요. 🙋‍♂️"
                maxLength={300}
                className={styles.commentInput}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div className={styles.commentLength}>
                {watch("comment") ? watch("comment").length : 0} / 300
              </div>
              <button className={styles.btnWriteComment}>작성</button>
            </div>
          </form>
        </div>
        <div className={styles.morePostWrap}>
          <div className={styles.morePostTitle}>
            <span>프론트엔드</span> 카테고리의 다른 포스트
          </div>
          <div className={styles.postContainer}>
            {[1, 1, 1, 1].map((item, idx) => {
              return (
                <PostItem
                  key={idx}
                  commentNum={5}
                  registTime="2022-04-15"
                  title="NextJS Framework 구성과 기본 사용방법 포스팅"
                  imageURL="#"
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  return {
    props: {
      user: user ? user : null,
    },
  };
});

export default Post;
