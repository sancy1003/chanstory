import styles from "@styles/blog.module.css";
import Link from "next/link";

interface CategoryProps {
  active: string;
}

export default function Category({ active }: CategoryProps) {
  const currentCategory = active;

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>카테고리</div>
      <ul className={styles.category}>
        <li>
          <Link
            href="/blog"
            className={currentCategory === "home" ? styles.active : ""}
          >
            🏠&nbsp;&nbsp;홈
          </Link>
        </li>
        <li>
          <Link
            href="/blog/develop/1"
            className={currentCategory === "develop" ? styles.active : ""}
          >
            📕&nbsp;&nbsp;개발 일기
          </Link>
        </li>
        <li>
          <Link
            href="/blog/study/1"
            className={currentCategory === "study" ? styles.active : ""}
          >
            ✏&nbsp;&nbsp;스터디
          </Link>
        </li>
        <li>
          <Link
            href="/blog/hobby/1"
            className={currentCategory === "hobby" ? styles.active : ""}
          >
            😎&nbsp;&nbsp;취미
          </Link>
        </li>
        <li>
          <Link
            href="/blog/daily/1"
            className={currentCategory === "daily" ? styles.active : ""}
          >
            🥰&nbsp;&nbsp;일상
          </Link>
        </li>
      </ul>
    </div>
  );
}
