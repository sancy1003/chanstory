import { formattingImageURL } from "@libs/client/commonFunction";
import styles from "@styles/gallery.module.css";
import Image from "next/image";
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
    <Link href={`/gallery/post/${postId}`} className={styles.postItem}>
      <div className={styles.postImageWrap}>
        <div
          className={styles.autoHeightImageWrap}
          style={{ width: "100%", position: "relative" }}
        >
          <Image
            fill
            className={styles.autoImage}
            alt={`${title}-thumbnail`}
            src={formattingImageURL(imageURL, "galleryThumbnail")}
            style={{ borderRadius: 8 }}
          />
        </div>
      </div>
      <div title={title} className={styles.postTitle}>
        {title}
      </div>
      <div className={styles.postInfo}>
        <div>{createdAt}</div>
      </div>
    </Link>
  );
}
