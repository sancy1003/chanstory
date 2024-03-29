import { createRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { formattingImageURL } from '@libs/client/commonFunction';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/themes/prism.css';

interface Props {
  content: string | null;
  fn: (content: string) => void;
}

const PostEditor = ({ content, fn }: Props) => {
  const editorRef = createRef<Editor>();
  const onChangeIntroFunction = () => {
    fn(editorRef.current!.getInstance().getMarkdown());
  };
  const uploadImage = async (image: File | Blob) => {
    //let Imageurl = null;
    const { uploadURL } = await (await fetch(`/api/uploadImage`)).json();
    const form = new FormData();
    form.append('file', image, `post_conetent_${new Date()}`);
    const {
      result: { id },
    } = await (
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })
    ).json();
    // Imageurl = id;
    return id;
  };

  return (
    <>
      <Editor
        onChange={onChangeIntroFunction}
        ref={editorRef}
        initialValue={content ? content : '내용을 입력해주세요.'}
        previewStyle="vertical"
        height="700px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        hooks={{
          addImageBlobHook: async (
            blob: Blob | File,
            callback: (imageURL: string, callbackString: string) => void
          ) => {
            const imageURL = formattingImageURL(await uploadImage(blob));
            callback(imageURL, '');
            return;
          },
        }}
      />
    </>
  );
};

export default PostEditor;
