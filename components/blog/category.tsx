import styles from "@styles/blog.module.css";

export default function Category() {
  return (
    <div className={styles.section} style={{ marginBottom: "86px" }}>
      <div className={styles.sectionTitle}>카테고리</div>
      <ul className={styles.category}>
        <li className={styles.active}>홈</li>
        <li>개발 일기</li>
        <li>스터디</li>
        <li>취미</li>
        <li>일상</li>
      </ul>
    </div>
  );
}
