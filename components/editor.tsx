import { createRef, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { formattingImageURL } from "@libs/client/commonFunction";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
// @ts-ignore
import Prism from "prismjs";

export default function PostEditor({
  content,
  fn,
}: {
  content: string | null;
  fn: (content: string) => void;
}): JSX.Element {
  const editorRef = createRef<any>();
  const onChangeIntroFunction = () => {
    fn(editorRef.current.getInstance().getMarkdown());
  };
  const uploadImage = async (image: File) => {
    let Imageurl = null;
    const { uploadURL } = await (await fetch(`/api/uploadImage`)).json();
    const form = new FormData();
    form.append("file", image, `post_conetent_${new Date()}`);
    const {
      result: { id },
    } = await (
      await fetch(uploadURL, {
        method: "POST",
        body: form,
      })
    ).json();
    Imageurl = id;
    return id;
  };

  return (
    <>
      <Editor
        onChange={onChangeIntroFunction}
        ref={editorRef}
        initialValue={content ? content : "내용을 입력해주세요."}
        previewStyle="vertical"
        height="700px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        hooks={{
          addImageBlobHook: async (blob: any, callback: any) => {
            const imageURL = formattingImageURL(await uploadImage(blob));
            callback(imageURL, "");
            return;
          },
        }}
      />
    </>
  );
}
