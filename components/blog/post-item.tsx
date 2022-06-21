import { formattingImageURL } from "@libs/client/commonFunction";
import styles from "@styles/blog.module.css";
import Link from "next/link";
import { FaRegCommentDots } from "react-icons/fa";

interface PostItemProps {
  commentNum: number;
  createdAt: string;
  title: string;
  imageURL: string | null;
  postId: number;
}

export default function PostItem({
  commentNum,
  createdAt,
  title,
  imageURL,
  postId,
}: PostItemProps) {
  return (
    <Link href={`/blog/post/${postId}`}>
      <a className={styles.postItem}>
        <div className={styles.postImageWrap}>
          <img
            className={styles.postImage}
            src={
              imageURL
                ? formattingImageURL(imageURL)
                : "/images/thumbnail/default_thumbnail.png"
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
          <div>{createdAt}</div>
        </div>
      </a>
    </Link>
  );
}
