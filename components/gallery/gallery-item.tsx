import { formattingImageURL } from "@libs/client/commonFunction";
import styles from "@styles/gallery.module.css";
import Link from "next/link";
import { FaRegCommentDots } from "react-icons/fa";

interface GalleryItemProps {
  commentNum: number;
  createdAt: string;
  title: string;
  imageURL: string | null;
  postId: number;
}

export default function GalleryItem({
  commentNum,
  createdAt,
  title,
  imageURL,
  postId,
}: GalleryItemProps) {
  return (
    <Link href={`/blog/post/${postId}`}>
      <a className={styles.postItem}>
        <div className={styles.postImageWrap}>
          <img
            style={{ borderRadius: 8 }}
            className={styles.postImage}
            src={formattingImageURL(imageURL)}
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
