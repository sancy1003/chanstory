import { NextPage, NextPageContext } from "next";
import styles from "@styles/profile.module.css";
import Layout from "@components/layout";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Lottie from "react-lottie-player";
import ring from "@resource/lottie/ring.json";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/router";
import useDelete from "@libs/client/useDelete";
import ConfirmModal from "@components/modal/confirm-modal";
import NicknameChangeModal from "@components/modal/nickname-change-modal";

interface ProfileImageForm {
  profileImage: FileList;
}
interface Respone {
  result: boolean;
  nickname: string;
  error?: string;
}

const Login: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const router = useRouter();
  const [nicknameChangeModal, setNicknameChangeModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const moreBtnRef = useRef<HTMLSpanElement>(null);
  const [moreBtnView, setMoreBtnView] = useState<Boolean>(false);
  const modalCloseHandler = ({ target }: any) => {
    if (moreBtnView && !moreBtnRef?.current?.contains(target))
      setMoreBtnView(false);
  };
  useEffect(() => {
    window.addEventListener("click", modalCloseHandler);
    return () => {
      window.removeEventListener("click", modalCloseHandler);
    };
  });
  const [userProfile, setUserProfile] = useState<SessionUserData | null>(user);
  const [profileURL, setProfileURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [editProfileImage, { data }] = useMutation<Respone>(
    `/api/user/profileImage`
  );
  const { watch, register } = useForm<ProfileImageForm>();
  const deleteImage = async () => {
    if (loading) return;
    setLoading(true);
    const response = await useDelete("/api/user/profileImage");
    if (response && response.result && userProfile) {
      setUserProfile({ ...userProfile, profileURL: null });
    }
    setLoading(false);
  };
  const profileImage = watch("profileImage");
  const ProfileImageForm = async (image: FileList) => {
    if (loading) return;
    setLoading(true);
    const { uploadURL } = await (await fetch(`/api/uploadImage`)).json();

    const form = new FormData();
    form.append("file", image[0], String(user?.id));
    const {
      result: { id },
    } = await (
      await fetch(uploadURL, {
        method: "POST",
        body: form,
      })
    ).json();
    setProfileURL(id);
    editProfileImage({
      profileURL: id,
    });
  };
  useEffect(() => {
    if (profileImage && profileImage.length > 0) {
      ProfileImageForm(profileImage);
    }
  }, [profileImage]);
  useEffect(() => {
    if (data && data.result) {
      if (data.result) {
        if (userProfile) {
          setUserProfile({ ...userProfile, profileURL });
          setLoading(false);
        }
      }
    }
  }, [data]);
  const onLogout = async () => {
    const response = await (await fetch(`/api/user/logout`)).json();
    if (response.result) router.push("/");
  };
  const onDelete = async () => {
    const response = await useDelete("/api/user");
    if (response && response.result) router.push("/");
  };
  const [
    onChangeNickname,
    { data: changeNicknameData, loading: changeNicknameLoading },
  ] = useMutation<Respone>(`/api/user/`);
  useEffect(() => {
    if (changeNicknameData && changeNicknameData.result && userProfile) {
      setNicknameChangeModal(false);
      setUserProfile({ ...userProfile, nickname: changeNicknameData.nickname });
    }
  }, [changeNicknameData]);

  return (
    <>
      <Layout user={userProfile}>
        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>프로필 정보</span>
              <span
                ref={moreBtnRef}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaEllipsisV
                  onClick={() => {
                    setMoreBtnView(!moreBtnView);
                  }}
                />
                {moreBtnView && (
                  <ul className={styles.moreBtnBox}>
                    <li
                      onClick={() => {
                        setMoreBtnView(false);
                        setNicknameChangeModal(true);
                      }}
                    >
                      닉네임 변경
                    </li>
                    <li onClick={onLogout}>로그아웃</li>
                    <li
                      onClick={() => {
                        setMoreBtnView(false);
                        setDeleteConfirmModal(true);
                      }}
                    >
                      회원 탈퇴
                    </li>
                  </ul>
                )}
              </span>
            </div>
            <div className={styles.profileBox}>
              {loading ? (
                <div className={styles.profileImageWrap}>
                  <div
                    style={{ display: "flex", backgroundColor: "#fff" }}
                    className={styles.profileImageCover}
                  >
                    <Lottie
                      loop
                      animationData={ring}
                      play
                      style={{ width: 150, height: 150 }}
                    />
                  </div>
                </div>
              ) : userProfile?.profileURL ? (
                <div className={styles.profileImageWrap}>
                  <div className={styles.profileImageCover}>
                    <label
                      style={{ marginRight: "10px" }}
                      className="input-file-button"
                      htmlFor="input-file"
                    >
                      수정
                    </label>
                    <input
                      style={{ display: "none" }}
                      {...register("profileImage")}
                      id="input-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                    <span onClick={() => deleteImage()}>삭제</span>
                  </div>
                  <img
                    className={styles.profileImage}
                    src={`https://imagedelivery.net/R2WiK4wfRK3oBXTwjgzQfA/${userProfile?.profileURL}/avatar`}
                  />
                </div>
              ) : (
                <div className={styles.profileImageWrap}>
                  <div className={styles.profileImageCover}>
                    <label className="input-file-button" htmlFor="input-file">
                      추가
                    </label>
                    <input
                      style={{ display: "none" }}
                      {...register("profileImage")}
                      id="input-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <img
                    className={styles.profileImage}
                    src="https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTBfMzEg/MDAxNjEwMjY1OTUzMDYw.AxFQ9Wdgv12xNiWneVpoLZGvpPRT1n2P4dWJ133saWIg.QbSPY2ColrEk1IhmRlxh8kacD6r1SBEp6b2hdjVHRU4g.JPEG.wjswldms0191/IMG_6859.jpg?type=w800"
                  />
                </div>
              )}
              <div className={styles.profileInfoBox}>
                <div className={styles.profileInfo}>
                  <div className={styles.title}>아이디</div>
                  <div className={styles.content}>{userProfile?.account}</div>
                </div>
                <div className={styles.profileInfo}>
                  <div className={styles.title}>닉네임</div>
                  <div className={styles.content}>{userProfile?.nickname}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <NicknameChangeModal
        isView={nicknameChangeModal}
        cancel={() => setNicknameChangeModal(false)}
        fn={({ text }: { text: string }) =>
          onChangeNickname({ nickname: text })
        }
        changeNicknameLoading={changeNicknameLoading}
        changeNicknameData={changeNicknameData}
      />
      <ConfirmModal
        isView={deleteConfirmModal}
        cancel={() => setDeleteConfirmModal(false)}
        fn={onDelete}
        message={`회원 탈퇴 시 모든 기록이 삭제됩니다.\n정말 탈퇴하시나요?`}
      />
    </>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  return {
    props: { user: user ? user : null },
  };
});

export default Login;
