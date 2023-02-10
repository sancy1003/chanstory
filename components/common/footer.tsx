import styles from "@styles/Layout.module.css";
import { AiFillGithub, AiFillMail } from "react-icons/ai";

export default function Footer(): React.ReactElement {
  const goGit = () => {
    window.open("https://github.com/sancy1003");
  };
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrap}>
        <p className={styles.footerCopyright}>© chanstory.dev</p>
        <div className={styles.footerInfoBox}>
          <div className={styles.footerEmail}>
            <AiFillMail />
            <span>frontchan1003@gmail.com</span>
          </div>
          <div className={styles.footerGit} onClick={goGit}>
            <AiFillGithub />
            <span>github.com/sancy1003</span>
          </div>
        </div>
      </div>
    </div>
  );
}
