import { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import Layout from "@components/layout";
import PostItem from "@components/blog/post-item";
import { FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { dateToString, formattingImageURL } from "@libs/client/commonFunction";
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
import client from "@libs/server/client";

interface PostProps {
  user: SessionUserData | null;
}
interface CommentResponse {
  result: boolean;
  comment: CommentWithAuthor;
  error?: string;
}
interface RecommentResponse {
  result: boolean;
  recomment: RecommentWithAuthor;
  error?: string;
}
interface CommentForm {
  comment: string;
}
interface CommentWithAuthor extends Comment {
  author: User;
  recomments: RecommentWithAuthor[];
}
interface RecommentWithAuthor extends Recomment {
  author: User;
  tagUser: User;
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
interface CommentState {
  type: string;
  id: number;
  content: string;
  basicCommentId?: number;
}
interface RecommentState {
  id: number;
  nickname: string;
  tagedUserId: number;
}

const Viewer = dynamic(() => import("@components/viewer"), { ssr: false });

const PostDetail: NextPage<PostProps> = ({ user }) => {
  const router = useRouter();
  const [editComment, setEditComment] = useState<CommentState | null>(null);
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
    if (loading || !user) return;
    regist({ content: commentForm.comment });
  };
  const onDeleteComment = async (type: string, commentId: number) => {
    if (type === "comment") {
      const response = await fetchDelete(`/api/blog/comment/${commentId}`);
      if (response.result) {
        await mutate(
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
    } else if (type === "recomment") {
      const response = await fetchDelete(`/api/blog/recomment/${commentId}`);
      if (response.result && data) {
        let changedComments: CommentWithAuthor[] = [];
        for (let i = 0; i < data.post.comments.length; i++) {
          if (
            data.post.comments[i].recomments.find(
              (recomment) => recomment.id === commentId
            )
          ) {
            changedComments.push({
              ...data.post.comments[i],
              recomments: data.post.comments[i].recomments.filter(
                (recomment) => recomment.id !== commentId
              ),
            });
          } else {
            changedComments.push({ ...data.post.comments[i] });
          }
        }
        mutate(
          (prev) =>
            prev && {
              ...prev,
              post: {
                ...prev.post,
                comments: changedComments,
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
  const [recomment, setRecomment] = useState<RecommentState | null>(null);
  const [eidt, { loading: editLoading, data: editCommentData }] =
    useMutation<Response>(`/api/blog/comment/${router?.query?.id}`);
  const [
    eidtRecomment,
    { loading: editRecommentLoading, data: editRecommentCommentData },
  ] = useMutation<Response>(
    `/api/blog/recomment/${editComment?.basicCommentId}`
  );
  const onEditComment = (commentForm: CommentForm) => {
    if (editLoading || editRecommentLoading) return;
    if (editComment?.type === "comment") {
      eidt({ content: commentForm.comment, commentId: editComment?.id });
    } else if (editComment?.type === "recomment") {
      eidtRecomment({
        content: commentForm.comment,
        recommentId: editComment?.id,
      });
    }
  };
  useEffect(() => {
    if (
      editRecommentCommentData &&
      editRecommentCommentData.result &&
      data &&
      editComment
    ) {
      let changedComments: CommentWithAuthor[] = [];
      for (let i = 0; i < data?.post?.comments.length; i++) {
        if (
          data?.post?.comments[i].recomments.find(
            (recomment) => recomment.id === editComment.id
          )
        ) {
          changedComments.push({
            ...data?.post?.comments[i],
            recomments: [
              ...data?.post?.comments[i].recomments.map((recomment) => {
                if (recomment.id === editComment.id) {
                  return { ...recomment, content: editComment.content };
                } else {
                  return { ...recomment };
                }
              }),
            ],
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
  }, [editRecommentCommentData]);
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
  const {
    register: recommentRegister,
    watch: recommentWatch,
    handleSubmit: recommentHandleSubmit,
    reset: recommentReset,
  } = useForm<CommentForm>();
  const [
    registRecomment,
    { loading: registRecommentLoading, data: registRecommentData },
  ] = useMutation<RecommentResponse>(`/api/blog/recomment/${recomment?.id}`);
  const onRegisterRecomment = (commentForm: CommentForm) => {
    if (registRecommentLoading) return;
    registRecomment({
      content: commentForm.comment,
      tagedUserId: recomment?.tagedUserId,
      postId: router.query.id,
    });
  };
  useEffect(() => {
    if (
      registRecommentData &&
      registRecommentData.result &&
      data &&
      data.post &&
      recomment
    ) {
      let changedComments: CommentWithAuthor[] = []; //registRecommentData.recomment
      for (let i = 0; i < data.post.comments.length; i++) {
        if (data.post.comments[i].id === recomment.id) {
          changedComments.push({
            ...data.post.comments[i],
            recomments: [
              ...data.post.comments[i].recomments,
              registRecommentData.recomment,
            ],
          });
        } else {
          changedComments.push(data.post.comments[i]);
        }
      }
      const recommentMutate = async () => {
        mutate(
          (prev) =>
            prev && {
              ...prev,
              post: {
                ...prev.post,
                comments: changedComments,
              },
            }
        );
        recommentReset();
        setRecomment(null);
      };
      recommentMutate();
    }
  }, [registRecommentData]);
  const allStateReset = () => {
    setEditComment(null);
    setRecomment(null);
    recommentReset();
    editReset();
  };
  const tags = data?.post?.tags?.split(", ");
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft onClick={() => router.back()} />
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
        <div className={styles.commentWrap} style={{ borderBottom: 0 }}>
          {data?.post.comments.map(
            (comment: CommentWithAuthor, commentIdx: number) => {
              return (
                <div
                  className={styles.commentBox}
                  key={`comment_${commentIdx}`}
                >
                  <img
                    className={styles.profileImage}
                    src={formattingImageURL(
                      comment.author.profileURL,
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
                        ref={(el) =>
                          (moreBtnRef.current[moreBtnRef.current.length] = el!)
                        }
                        className={styles.commentBtnMoreBox}
                      >
                        {user ? (
                          <FaEllipsisH
                            onClick={() =>
                              setMoreBtnView({
                                type: "comment",
                                id: comment.id,
                              })
                            }
                          />
                        ) : (
                          ""
                        )}
                        {moreBtnView?.type === "comment" &&
                        moreBtnView.id === comment.id ? (
                          <ul className={styles.moreBtnBox}>
                            <li
                              onClick={() => {
                                allStateReset();
                                setRecomment({
                                  id: comment.id,
                                  nickname: comment.author.nickname,
                                  tagedUserId: comment.author.id,
                                });
                                setMoreBtnView(null);
                              }}
                            >
                              답글
                            </li>
                            {user?.id === comment.author.id ||
                            user?.role === "ADMIN" ? (
                              <>
                                <li
                                  onClick={() => {
                                    allStateReset();
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
                          placeholder="내용을 입력해주세요."
                          maxLength={300}
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
                    {comment.recomments?.length > 0
                      ? comment.recomments.map((recomment, recommentIdx) => (
                          <div
                            style={recommentIdx === 0 ? { marginTop: 30 } : {}}
                            className={styles.underCommentBox}
                            key={`recomment_${recommentIdx}`}
                          >
                            <img
                              className={styles.profileImage}
                              src={formattingImageURL(
                                recomment.author.profileURL,
                                "avatar"
                              )}
                            />
                            <div className={styles.comment}>
                              <div className={styles.commentInfo}>
                                <div className={styles.commentWriterInfo}>
                                  <div className={styles.nickname}>
                                    {recomment?.author.nickname}
                                  </div>
                                  <div className={styles.registTime}>
                                    {dateToString(recomment.createdAt)}
                                  </div>
                                </div>
                                <div
                                  ref={(el) =>
                                    (moreBtnRef.current[
                                      moreBtnRef.current.length
                                    ] = el!)
                                  }
                                  className={styles.commentBtnMoreBox}
                                >
                                  {user ? (
                                    <FaEllipsisH
                                      onClick={() =>
                                        setMoreBtnView({
                                          type: "recomment",
                                          id: recomment.id,
                                        })
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {moreBtnView?.type === "recomment" &&
                                  moreBtnView.id === recomment.id ? (
                                    <ul className={styles.moreBtnBox}>
                                      <li
                                        onClick={() => {
                                          allStateReset();
                                          setRecomment({
                                            id: comment.id,
                                            nickname: recomment.author.nickname,
                                            tagedUserId: recomment.author.id,
                                          });
                                          setMoreBtnView(null);
                                        }}
                                      >
                                        답글
                                      </li>
                                      {user?.id === recomment.author.id ||
                                      user?.role === "ADMIN" ? (
                                        <>
                                          <li
                                            onClick={() => {
                                              allStateReset();
                                              setEditValue(
                                                "comment",
                                                recomment.content
                                              );
                                              setEditComment({
                                                type: "recomment",
                                                id: recomment.id,
                                                content: recomment.content,
                                              });
                                              setMoreBtnView(null);
                                            }}
                                          >
                                            수정
                                          </li>
                                          <li
                                            onClick={() => {
                                              onDeleteComment(
                                                "recomment",
                                                recomment.id
                                              );
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
                              {editComment?.type === "recomment" &&
                              editComment?.id === recomment.id ? (
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
                                    placeholder="내용을 입력해주세요."
                                    style={{ width: "100%" }}
                                    maxLength={300}
                                    className={styles.commentInput}
                                  />
                                  <div className={styles.editBtnBox}>
                                    <div className={styles.commentLength}>
                                      {editWatch("comment")
                                        ? editWatch("comment").length
                                        : 0}{" "}
                                      / 300
                                    </div>
                                    <button className={styles.btnEdit}>
                                      수정
                                    </button>
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
                                  {recomment?.tagUser.nickname !==
                                  recomment?.author.nickname ? (
                                    <span>@ {recomment?.tagUser.nickname}</span>
                                  ) : (
                                    ""
                                  )}
                                  {recomment.content}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                    {recomment?.id === comment.id ? (
                      <form
                        onSubmit={recommentHandleSubmit(onRegisterRecomment)}
                        className={styles.recommentBox}
                      >
                        <div className={styles.recommentTagBox}>
                          {`@ ${recomment.nickname}`}
                        </div>
                        <textarea
                          {...recommentRegister("comment", {
                            required: true,
                            maxLength: {
                              value: 300,
                              message: "",
                            },
                          })}
                          placeholder="내용을 입력해주세요."
                          maxLength={300}
                          style={{ width: "100%" }}
                          className={styles.commentInput}
                        />
                        <div className={styles.editBtnBox}>
                          <div className={styles.commentLength}>
                            {recommentWatch("comment")
                              ? recommentWatch("comment").length
                              : 0}{" "}
                            / 300
                          </div>
                          <button className={styles.btnEdit}>등록</button>
                          <div
                            onClick={() => setRecomment(null)}
                            className={styles.btnEditCancel}
                          >
                            취소
                          </div>
                        </div>
                      </form>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            }
          )}
          <form onSubmit={handleSubmit(onRegistComment)}>
            <div className={styles.commentBox} style={{ marginBottom: 10 }}>
              <img
                className={styles.profileImage}
                src={formattingImageURL(user?.profileURL, "avatar")}
              />
              <textarea
                {...register("comment", {
                  required: true,
                })}
                placeholder={`${
                  !user ? "로그인 후 " : ""
                }댓글을 남겨보세요. 🙋‍♂️`}
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
              {!user ? (
                <div
                  className={styles.btnWriteComment}
                  onClick={() => {
                    if (!user) {
                      router.push("/login");
                    }
                  }}
                >
                  로그인
                </div>
              ) : (
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
              )}
            </div>
          </form>
        </div>
        {/* <div className={styles.morePostWrap}>
          <div className={styles.morePostTitle}>
            <span>프론트엔드</span> 카테고리의 다른 포스트
          </div>
          <div className={styles.postContainer}>
            {[1, 1, 1, 1].map((post, idx) => {
              return (
                <PostItem
                  key={idx}
                  commentNum={5}
                  registTime="2022-04-15"
                  title="NextJS Framework 구성과 기본 사용방법 포스팅"
                  imageURL={null}
                  postId={0}
                />
              );
            })}
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

// export const getServerSideProps = withSsrSession(async function ({
//   req,
// }: NextPageContext) {
//   const user = req?.session.user;
//   if (user) {
//     const userData = await client?.user.findUnique({ where: { id: user.id } });
//     if (!userData) req.session.destroy();
//   }
//   return {
//     props: {
//       user: user ? user : null,
//     },
//   };
// });

export default PostDetail;
