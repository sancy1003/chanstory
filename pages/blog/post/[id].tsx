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
import { Comment, Post, Recomment, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import ring from "@resource/lottie/ring.json";
import fetchDelete from "@libs/client/fetchDelete";
import Response from "@utils/types/response";

interface PostProps {
  user: SessionUserData | null;
}
interface CommentResponse {
  result: boolean;
  comment: CommentWithAuthor;
  error?: string;
}
interface CommentForm {
  comment: string;
}
interface CommentWithAuthor extends Comment {
  author: User;
  recomments: Recomment[];
}
interface PostWithComments extends Post {
  comments: CommentWithAuthor[];
}
interface PostResponse {
  result: boolean;
  error?: string;
  post: PostWithComments;
}
interface MoreBtn {
  type: string;
  id: number;
}
interface EditCommentState {
  type: string;
  id: number;
  content: string;
}

const Viewer = dynamic(() => import("@components/viewer"), { ssr: false });

const PostDetail: NextPage<PostProps> = ({ user }) => {
  const router = useRouter();
  const [editComment, setEditComment] = useState<EditCommentState | null>(null);
  const [moreBtnView, setMoreBtnView] = useState<MoreBtn | null>(null);
  const moreBtnRef = useRef<HTMLDivElement[]>([]);
  const modalCloseHandler = ({ target }: any) => {
    if (moreBtnRef) {
      for (let i = 0; i < moreBtnRef?.current?.length; i++) {
        if (moreBtnRef?.current[i]?.contains(target)) {
          return;
        }
      }
      setMoreBtnView(null);
    }
  };
  useEffect(() => {
    window.addEventListener("click", modalCloseHandler);
    return () => {
      window.removeEventListener("click", modalCloseHandler);
    };
  });
  const { data, mutate } = useSWR<PostResponse>(
    router?.query?.id ? `/api/blog/${router.query.id}` : null
  );
  const [regist, { loading, data: commentData, error }] =
    useMutation<CommentResponse>(`/api/blog/comment/${router?.query?.id}`);
  useEffect(() => {
    if (commentData && commentData.result) {
      reset();
      mutate(
        (prev) =>
          prev && {
            ...prev,
            post: {
              ...prev.post,
              comments: [...prev.post.comments, commentData.comment],
            },
          }
      );
    }
  }, [commentData]);
  const { register, watch, handleSubmit, reset } = useForm<CommentForm>();
  const onRegistComment = (commentForm: CommentForm) => {
    if (loading) return;
    regist({ content: commentForm.comment });
  };
  const onDeleteComment = async (type: string, commentId: number) => {
    if (type === "comment") {
      const response = await fetchDelete(`/api/blog/comment/${commentId}`);
      if (response.result) {
        mutate(
          (prev) =>
            prev && {
              ...prev,
              post: {
                ...prev.post,
                comments: prev.post.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              },
            }
        );
      }
    }
  };
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    setValue: setEditValue,
    watch: editWatch,
  } = useForm<CommentForm>();
  const [eidt, { loading: editLoading, data: editCommentData }] =
    useMutation<Response>(`/api/blog/comment/${router?.query?.id}`);
  const onEditComment = (commentForm: CommentForm) => {
    if (editLoading) return;
    eidt({ content: commentForm.comment, commentId: editComment?.id });
  };
  useEffect(() => {
    if (
      editCommentData &&
      editCommentData.result &&
      data &&
      data.post &&
      editComment
    ) {
      let changedComments: CommentWithAuthor[] = [];
      for (let i = 0; i < data?.post?.comments.length; i++) {
        if (data?.post?.comments[i].id === editComment.id) {
          changedComments.push({
            ...data?.post?.comments[i],
            content: editComment.content,
          });
        } else {
          changedComments.push({ ...data?.post?.comments[i] });
        }
      }
      const editMutate = async () => {
        await mutate(
          (prev) =>
            prev && {
              ...prev,
              post: {
                ...prev.post,
                comments: changedComments,
              },
            }
        );
        editReset();
        setEditComment(null);
      };
      editMutate();
    }
  }, [editCommentData]);
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
            {data?.post && dateToString(data.post.createdAt)}
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
                      <div
                        ref={(el) => (moreBtnRef.current[idx] = el!)}
                        className={styles.commentBtnMoreBox}
                      >
                        <FaEllipsisH
                          onClick={() =>
                            setMoreBtnView({ type: "comment", id: comment.id })
                          }
                        />
                        {moreBtnView?.type === "comment" &&
                        moreBtnView.id === comment.id ? (
                          <ul className={styles.moreBtnBox}>
                            <li
                              onClick={() => {
                                setMoreBtnView(null);
                              }}
                            >
                              답글
                            </li>
                            {user?.id === comment.author.id ? (
                              <>
                                <li
                                  onClick={() => {
                                    editReset();
                                    setEditValue("comment", comment.content);
                                    setEditComment({
                                      type: "comment",
                                      id: comment.id,
                                      content: comment.content,
                                    });
                                    setMoreBtnView(null);
                                  }}
                                >
                                  수정
                                </li>
                                <li
                                  onClick={() => {
                                    onDeleteComment("comment", comment.id);
                                    setMoreBtnView(null);
                                  }}
                                >
                                  삭제
                                </li>
                              </>
                            ) : (
                              ""
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {editComment?.type === "comment" &&
                    editComment?.id === comment.id ? (
                      <form
                        onSubmit={editHandleSubmit(onEditComment)}
                        className={styles.commentEditBox}
                      >
                        <textarea
                          {...editRegister("comment", {
                            required: true,
                            maxLength: {
                              value: 300,
                              message: "",
                            },
                          })}
                          style={{ width: "100%" }}
                          className={styles.commentInput}
                        />
                        <div className={styles.editBtnBox}>
                          <div className={styles.commentLength}>
                            {editWatch("comment")
                              ? editWatch("comment").length
                              : 0}{" "}
                            / 300
                          </div>
                          <button className={styles.btnEdit}>수정</button>
                          <div
                            onClick={() => setEditComment(null)}
                            className={styles.btnEditCancel}
                          >
                            취소
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className={styles.commentContent}>
                        {comment.content}
                      </div>
                    )}
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
              <button
                className={
                  loading
                    ? styles.btnWriteCommentLoading
                    : styles.btnWriteComment
                }
              >
                {loading ? (
                  <Lottie
                    loop
                    animationData={ring}
                    play
                    style={{ width: 50, height: 50 }}
                  />
                ) : (
                  "등록"
                )}
              </button>
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

export default PostDetail;
