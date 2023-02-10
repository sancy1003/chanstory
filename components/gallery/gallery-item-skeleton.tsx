import styles from "@styles/gallery.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function GalleryItemSkeleton() {
  return (
    <div style={{ marginBottom: 50 }}>
      <Skeleton style={{ marginBottom: 16 }} height={350} />
      <Skeleton className={styles.postTitle} height={24} />
      <div className={styles.postInfo}>
        <Skeleton width={50} height={24} />
        <Skeleton width={100} height={24} />
      </div>
    </div>
  );
}
