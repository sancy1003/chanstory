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
          <Link href="/blog">
            <a className={currentCategory === "home" ? styles.active : ""}>
              홈&nbsp;&nbsp;🏠
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/develop/1">
            <a className={currentCategory === "develop" ? styles.active : ""}>
              개발 일기&nbsp;&nbsp;📕
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/study/1">
            <a className={currentCategory === "study" ? styles.active : ""}>
              스터디&nbsp;&nbsp;✏
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/hobby/1">
            <a className={currentCategory === "hobby" ? styles.active : ""}>
              취미&nbsp;&nbsp;😎
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/daily/1">
            <a className={currentCategory === "daily" ? styles.active : ""}>
              일상&nbsp;&nbsp;🥰
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
