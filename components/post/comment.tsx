import styles from "@styles/blog.module.css";
import { useEffect, useRef } from "react";

export default function Comment() {
  const commentsEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", "sancy1003/chanstory-comments");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", "github-light");
    scriptEl.setAttribute("crossorigin", "anonymous");
    commentsEl.current?.appendChild(scriptEl);
    console.log(1);
  }, []);

  return (
    <div className={styles.commentWrap} style={{ borderBottom: 0 }}>
      <div ref={commentsEl} />
    </div>
  );
}
