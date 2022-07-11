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
              🏠&nbsp;&nbsp;홈
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/develop/1">
            <a className={currentCategory === "develop" ? styles.active : ""}>
              📕&nbsp;&nbsp;개발 일기
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/study/1">
            <a className={currentCategory === "study" ? styles.active : ""}>
              ✏&nbsp;&nbsp;스터디
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/hobby/1">
            <a className={currentCategory === "hobby" ? styles.active : ""}>
              😎&nbsp;&nbsp;취미
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/daily/1">
            <a className={currentCategory === "daily" ? styles.active : ""}>
              🥰&nbsp;&nbsp;일상
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
