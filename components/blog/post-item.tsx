import styles from "@styles/blog.module.css";
import { FaRegCommentDots } from "react-icons/fa";

interface PostItemProps {
  commentNum: number;
  registTime: string;
  title: string;
  imageURL: string;
}

export default function PostItem({
  commentNum,
  registTime,
  title,
  imageURL,
}: PostItemProps) {
  return (
    <div className={styles.postItem}>
      <div className={styles.postImageWrap}>
        <img className={styles.postImage} src={imageURL} />
      </div>
      <div title={title} className={styles.postTitle}>
        {title}
      </div>
      <div className={styles.postInfo}>
        <div className={styles.postCommentWrap}>
          <FaRegCommentDots />
          <div>{commentNum}</div>
        </div>
        <div>{registTime}</div>
      </div>
    </div>
  );
}
