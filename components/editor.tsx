import { createRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export default function PostEditor({
  fn,
}: {
  fn: (content: string) => void;
}): JSX.Element {
  const editorRef = createRef<any>();
  const onChangeIntroFunction = () => {
    fn(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <>
      <Editor
        onChange={onChangeIntroFunction}
        ref={editorRef}
        initialValue="내용을 입력하세요."
        previewStyle="vertical"
        height="700px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[colorSyntax]}
      />
    </>
  );
}
