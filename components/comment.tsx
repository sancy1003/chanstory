import {
  dateToString,
  formattingUserProfileURL,
} from "@libs/client/commonFunction";
import useMutation from "@libs/client/useMutation";
import styles from "@styles/blog.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEllipsisH } from "react-icons/fa";
import Lottie from "react-lottie-player";
import useSWR from "swr";
import { CommentForm, CommentResponse, CommentWithAuthor } from "types/comment";
import { APIResponse } from "types/response";
import ring from "@resource/lottie/ring.json";
import { SessionUserData } from "@libs/server/withSession";
import useDelete from "@libs/client/useDelete";

interface Props {
  type: "blog" | "gallery";
  id: number;
  user: SessionUserData | null;
}
interface MoreBtn {
  type: string;
  id: number;
}
interface RecommentState {
  tagedUserId: number;
  commentId: number;
  nickname: string;
}
interface EditCommentState {
  type: "comment" | "recomment";
  id: number;
}

export default function Comment({ type, id, user }: Props) {
  const [editCommentState, setEditCommentState] =
    useState<EditCommentState | null>(null);
  const [recommentState, setRecommentState] = useState<RecommentState | null>(
    null
  );
  const router = useRouter();
  const moreBtnRef = useRef<HTMLDivElement[]>([]);
  const [moreBtnView, setMoreBtnView] = useState<MoreBtn | null>(null);
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

  const {
    handleSubmit: commentHandleSubmit,
    watch: commentWatch,
    register: commentRegister,
    reset: commentReset,
  } = useForm<CommentForm>();

  const {
    handleSubmit: recommentHandleSubmit,
    watch: recommentWatch,
    register: recommentRegister,
    reset: recommentReset,
  } = useForm<CommentForm>();

  const {
    handleSubmit: editHandleSubmit,
    watch: editWatch,
    register: editRegister,
    reset: editReset,
    setValue: setEditValue,
  } = useForm<CommentForm>();

  const { data, mutate } = useSWR<CommentResponse>(
    `/api/comment?type=${type}&id=${id}`
  );

  const [
    registComment,
    { loading: registCommentLoading, data: registCommentData },
  ] = useMutation<APIResponse>(`/api/comment?type=${type}&id=${id}`);

  const [
    registRecomment,
    { loading: registRecommentLoading, data: registRecommentData },
  ] = useMutation<APIResponse>(`/api/recomment?type=${type}&id=${id}`);

  const [editComment, { loading: editCommentLoading, data: editCommentData }] =
    useMutation<APIResponse>(`/api/comment?type=${type}&id=${id}`);

  const [
    editRecomment,
    { loading: editRecommentLoading, data: editRecommentData },
  ] = useMutation<APIResponse>(`/api/recomment?type=${type}&id=${id}`);

  const onRegisterRecomment = (commentForm: CommentForm) => {
    if (registRecommentLoading) return;
    registRecomment({
      comment: commentForm.comment,
      tagedUserId: recommentState?.tagedUserId,
      commentId: recommentState?.commentId,
    });
  };

  const onEditComment = (commentForm: CommentForm) => {
    if (editCommentLoading || editRecommentLoading) return;
    if (editCommentState?.type === "comment") {
      editComment({
        comment: commentForm.comment,
        commentId: editCommentState?.id,
      });
    }
    if (editCommentState?.type === "recomment") {
      editRecomment({
        comment: commentForm.comment,
        recommentId: editCommentState?.id,
      });
    }
  };

  const [deleteComment, deleteCommentLoading, deleteCommentResponse] =
    useDelete("/api/comment");
  const [deleteRecomment, deleteRecommentLoading, deleteRecommentResponse] =
    useDelete("/api/recomment");

  useEffect(() => {
    window.addEventListener("click", modalCloseHandler);
    return () => {
      window.removeEventListener("click", modalCloseHandler);
    };
  });

  useEffect(() => {
    mutate();
    if (registCommentData?.result) commentReset();
    if (registRecommentData?.result) {
      recommentReset();
      setRecommentState(null);
    }
    if (editCommentData?.result) {
      setEditCommentState(null);
      editReset();
    }
    if (editRecommentData?.result) {
      setEditCommentState(null);
      editReset();
    }
  }, [
    registCommentData,
    registRecommentData,
    editCommentData,
    editRecommentData,
    deleteCommentResponse,
    deleteRecommentResponse,
  ]);

  return (
    <div className={styles.commentWrap} style={{ borderBottom: 0 }}>
      {data?.comments?.map((comment, idx) => {
        return (
          <div className={styles.commentBox} key={comment.id}>
            <img
              alt="avatar"
              className={styles.profileImage}
              src={formattingUserProfileURL(
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
                    moreBtnView.id === comment.id && (
                      <ul className={styles.moreBtnBox}>
                        <li
                          onClick={() => {
                            setEditCommentState(null);
                            setRecommentState({
                              commentId: comment.id,
                              tagedUserId: comment.author.id,
                              nickname: comment.author.nickname,
                            });
                            setMoreBtnView(null);
                          }}
                        >
                          답글
                        </li>
                        {(user?.id === comment.author.id ||
                          user?.role === "ADMIN") && (
                          <>
                            <li
                              onClick={() => {
                                setRecommentState(null);
                                setEditCommentState({
                                  type: "comment",
                                  id: comment.id,
                                });
                                setEditValue("comment", comment.content);
                                setMoreBtnView(null);
                              }}
                            >
                              수정
                            </li>
                            <li
                              onClick={() => {
                                setMoreBtnView(null);
                                if (deleteCommentLoading) return;
                                deleteComment({
                                  id: comment.id,
                                });
                              }}
                            >
                              삭제
                            </li>
                          </>
                        )}
                      </ul>
                    )}
                </div>
              </div>
              {editCommentState?.type === "comment" &&
              editCommentState?.id === comment.id ? (
                <form
                  onSubmit={editHandleSubmit(onEditComment)}
                  className={styles.commentEditBox}
                >
                  <textarea
                    {...editRegister("comment", {
                      required: true,
                      maxLength: 300,
                    })}
                    style={{ width: "100%" }}
                    placeholder="내용을 입력해주세요."
                    maxLength={300}
                    className={styles.commentInput}
                  />
                  <div className={styles.editBtnBox}>
                    <div className={styles.commentLength}>
                      {editWatch("comment") ? editWatch("comment").length : 0} /
                      300
                    </div>
                    <button type="submit" className={styles.btnEdit}>
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditCommentState(null)}
                      className={styles.btnEditCancel}
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                <div className={styles.commentContent}>{comment.content}</div>
              )}
              {comment.recomments?.length > 0
                ? comment.recomments.map((recomment, idx) => (
                    <div
                      style={idx === 0 ? { marginTop: 30 } : {}}
                      className={styles.underCommentBox}
                      key={recomment.id}
                    >
                      <img
                        alt="avatar"
                        className={styles.profileImage}
                        src={formattingUserProfileURL(
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
                              (moreBtnRef.current[moreBtnRef.current.length] =
                                el!)
                            }
                            className={styles.commentBtnMoreBox}
                          >
                            {user && (
                              <FaEllipsisH
                                onClick={() =>
                                  setMoreBtnView({
                                    type: "recomment",
                                    id: recomment.id,
                                  })
                                }
                              />
                            )}
                            {moreBtnView?.type === "recomment" &&
                              moreBtnView.id === recomment.id && (
                                <ul className={styles.moreBtnBox}>
                                  <li
                                    onClick={() => {
                                      setEditCommentState(null);
                                      setRecommentState({
                                        commentId: comment.id,
                                        tagedUserId: recomment.author.id,
                                        nickname: recomment.author.nickname,
                                      });
                                      setMoreBtnView(null);
                                    }}
                                  >
                                    답글
                                  </li>
                                  {(user?.id === recomment.author.id ||
                                    user?.role === "ADMIN") && (
                                    <>
                                      <li
                                        onClick={() => {
                                          setRecommentState(null);
                                          setEditCommentState({
                                            type: "recomment",
                                            id: recomment.id,
                                          });
                                          setEditValue(
                                            "comment",
                                            recomment.content
                                          );
                                          setMoreBtnView(null);
                                        }}
                                      >
                                        수정
                                      </li>
                                      <li
                                        onClick={() => {
                                          setMoreBtnView(null);
                                          if (deleteRecommentLoading) return;
                                          deleteRecomment({ id: recomment.id });
                                        }}
                                      >
                                        삭제
                                      </li>
                                    </>
                                  )}
                                </ul>
                              )}
                          </div>
                        </div>
                        {editCommentState?.type === "recomment" &&
                        recomment.id === editCommentState.id ? (
                          <form
                            onSubmit={editHandleSubmit(onEditComment)}
                            className={styles.commentEditBox}
                          >
                            <textarea
                              {...editRegister("comment", {
                                required: true,
                                maxLength: 300,
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
                              <button type="submit" className={styles.btnEdit}>
                                수정
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditCommentState(null)}
                                className={styles.btnEditCancel}
                              >
                                취소
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className={styles.commentContent}>
                            {recomment?.tagUser.nickname !==
                              recomment?.author.nickname && (
                              <span>@ {recomment?.tagUser.nickname}</span>
                            )}
                            {recomment.content}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                : ""}
              {recommentState?.commentId === comment.id && (
                <form
                  onSubmit={recommentHandleSubmit(onRegisterRecomment)}
                  className={styles.recommentBox}
                >
                  <div className={styles.recommentTagBox}>
                    {`@ ${recommentState.nickname}`}
                  </div>
                  <textarea
                    {...recommentRegister("comment", {
                      required: true,
                      maxLength: 300,
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
                    <button type="submit" className={styles.btnEdit}>
                      {registRecommentLoading ? (
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
                    <div
                      onClick={() => {
                        recommentReset();
                        setRecommentState(null);
                      }}
                      className={styles.btnEditCancel}
                    >
                      취소
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        );
      })}
      <form onSubmit={commentHandleSubmit(registComment)}>
        <div className={styles.commentBox} style={{ marginBottom: 10 }}>
          <img
            className={styles.profileImage}
            src={formattingUserProfileURL(user?.profileURL, "avatar")}
          />
          <textarea
            {...commentRegister("comment", {
              required: true,
              maxLength: 300,
            })}
            placeholder={`${!user ? "로그인 후 " : ""}댓글을 남겨보세요. 🙋‍♂️`}
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
            {commentWatch("comment") ? commentWatch("comment").length : 0} / 300
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
              type="submit"
              className={
                registCommentLoading
                  ? styles.btnWriteCommentLoading
                  : styles.btnWriteComment
              }
            >
              {registCommentLoading ? (
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
  );
}
