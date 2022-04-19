import { NextPage, NextPageContext } from "next";
import styles from "@styles/profile.module.css";
import Layout from "@components/layout";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";

const Login: NextPage<{ user: SessionUserData | null }> = ({ user }) => {
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>프로필 정보</div>
          <div className={styles.profileBox}>
            <img className={styles.profileImage} src="#" />
            <div className={styles.profileInfoBox}>
              <div className={styles.profileInfo}>
                <div className={styles.title}>아이디</div>
                <div className={styles.content}>frontchan1003@gmail.com</div>
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.title}>닉네임</div>
                <div className={styles.content}>상하이스파이시</div>
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
