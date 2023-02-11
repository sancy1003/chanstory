import React, { useState } from 'react';
import styles from '@styles/post.module.css';
import { MdClose } from 'react-icons/md';

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagEditor({ tags, setTags }: Props) {
  const [text, setText] = useState<string>('');
  const addTag = () => {
    if (text.length === 0) return;
    setTags([...tags, text]);
    setText('');
  };
  const deleteTag = (deleteIndex: number) => {
    setTags(tags.filter((tag, index) => index !== deleteIndex));
  };
  return (
    <ul className={styles.tagList}>
      {tags.map((tag, index) => {
        return (
          <li key={index} className={styles.tagItem}>
            <div>{tag}</div>
            <MdClose onClick={() => deleteTag(index)} />
          </li>
        );
      })}
      <li>
        <div className={styles.inputWrap}>
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTag} type="button">
            추가
          </button>
        </div>
      </li>
    </ul>
  );
}
