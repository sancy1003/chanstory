import styles from "@styles/blog.module.css";
import Link from "next/link";

interface CategoryProps {
  active: string;
}

export default function Category({ active }: CategoryProps) {
  const currentCategory = active;

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>์นดํ๊ณ ๋ฆฌ</div>
      <ul className={styles.category}>
        <li>
          <Link href="/blog">
            <a className={currentCategory === "home" ? styles.active : ""}>
              ๐ &nbsp;&nbsp;ํ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/develop/1">
            <a className={currentCategory === "develop" ? styles.active : ""}>
              ๐&nbsp;&nbsp;๊ฐ๋ฐ ์ผ๊ธฐ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/study/1">
            <a className={currentCategory === "study" ? styles.active : ""}>
              โ&nbsp;&nbsp;์คํฐ๋
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/hobby/1">
            <a className={currentCategory === "hobby" ? styles.active : ""}>
              ๐&nbsp;&nbsp;์ทจ๋ฏธ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog/daily/1">
            <a className={currentCategory === "daily" ? styles.active : ""}>
              ๐ฅฐ&nbsp;&nbsp;์ผ์
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
