import styles from "@styles/blog.module.css";
import { CATEGORY } from "@utils/define/category";
import { useRouter } from "next/router";

interface CategoryProps {
  isHome?: boolean;
}

export default function Category({ isHome }: CategoryProps) {
  const router = useRouter();
  const currentCategory = isHome ? "home" : router.query.category;
  const onClickCategory = (link: string) => {
    router.push(`/blog/${link}`);
  };

  return (
    <div className={styles.section} style={{ marginBottom: "86px" }}>
      <div className={styles.sectionTitle}>카테고리</div>
      <ul className={styles.category}>
        {CATEGORY.map((item, idx) => {
          return (
            <li
              onClick={() => onClickCategory(item.query)}
              className={currentCategory === item.query ? styles.active : ""}
              key={idx}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
