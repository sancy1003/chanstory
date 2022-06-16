import styles from "@styles/blog.module.css";
import { CATEGORY } from "@utils/define/category";
import { useRouter } from "next/router";

interface CategoryProps {
  active: string;
}

export default function Category({ active }: CategoryProps) {
  const router = useRouter();
  const currentCategory = active;
  const onClickCategory = (link: string) => {
    if (link === "home") {
      router.push(`/blog`);
    } else {
      router.push(`/blog/${link}/1`);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>카테고리</div>
      <ul className={styles.category}>
        {CATEGORY.map((item, idx) => {
          return (
            <li
              onClick={() => onClickCategory(item.query)}
              className={currentCategory === item.query ? styles.active : ""}
              key={idx}
            >
              {item.title}&nbsp;&nbsp;{item.emoji}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
