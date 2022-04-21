import { NextPage, NextPageContext } from "next";
import styles from "@styles/profile.module.css";
import Layout from "@components/layout";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Lottie from "react-lottie-player";
import ring from "@resource/lottie/ring.json";
import Image from "next/image";

interface ProfileImageForm {
  profileImage: FileList;
}
interface EditProfileImageResponse {
  result: boolean;
  error?: string;
}

const Login: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  const [userProfile, setUserProfile] = useState(user);
  const [profileURL, setProfileURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editProfileImage, { data }] = useMutation<EditProfileImageResponse>(
    `/api/user/profileImage`
  );
  const { watch, register } = useForm<ProfileImageForm>();
  const deleteImage = async () => {
    if (loading) return;
    setLoading(true);
    const response = await (
      await fetch("/api/user/profileImage", {
        method: "DELETE",
      })
    ).json();
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
  return (
    <Layout user={userProfile}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>프로필 정보</div>
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
