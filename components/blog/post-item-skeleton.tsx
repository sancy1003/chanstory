import { formattingImageURL } from "@libs/client/commonFunction";
import styles from "@styles/blog.module.css";
import { useRouter } from "next/router";
import { FaRegCommentDots } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostItemSkeleton() {
  return (
    <div className={styles.postItem}>
      <Skeleton className={styles.postImageWrap} />
      <Skeleton className={styles.postTitle} />
      <div className={styles.postInfo}>
        <Skeleton width={"50px"} />
        <Skeleton width={"100px"} />
      </div>
    </div>
  );
}
