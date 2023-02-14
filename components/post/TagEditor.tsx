import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import * as S from '@styles/components/post/tagEditor.style';

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagEditor = ({ tags, setTags }: Props) => {
  const [text, setText] = useState<string>('');

  const addTag = () => {
    if (text.length === 0) return;
    setTags([...tags, text]);
    setText('');
  };
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  const deleteTag = (deleteIndex: number) => {
    setTags(tags.filter((tag, index) => index !== deleteIndex));
  };

  return (
    <S.TagListContainer>
      {tags.map((tag, index) => {
        return (
          <li key={index}>
            <div>{tag}</div>
            <MdClose onClick={() => deleteTag(index)} />
          </li>
        );
      })}
      <li>
        <S.TagInputBox>
          <input
            onKeyDown={handleInput}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTag} type="button">
            추가
          </button>
        </S.TagInputBox>
      </li>
    </S.TagListContainer>
  );
};

export default TagEditor;
