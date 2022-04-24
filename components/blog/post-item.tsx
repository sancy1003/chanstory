import { loadProfileURL } from "@libs/client/commonFunction";
import styles from "@styles/blog.module.css";
import { useRouter } from "next/router";
import { FaRegCommentDots } from "react-icons/fa";

interface PostItemProps {
  commentNum: number;
  registTime: string;
  title: string;
  imageURL: string | null;
  postId: number;
}

export default function PostItem({
  commentNum,
  registTime,
  title,
  imageURL,
  postId,
}: PostItemProps) {
  const router = useRouter();
  const onClickPost = () => {
    router.push(`/blog/post/${postId}`);
  };
  return (
    <div className={styles.postItem} onClick={onClickPost}>
      <div className={styles.postImageWrap}>
        <img
          className={styles.postImage}
          src={
            imageURL
              ? loadProfileURL(imageURL)
              : "/images/logo/default_thumbnail.png"
          }
        />
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
