import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
// @ts-ignore
import Prism from "prismjs";

export default function PostVeiwer({
  content,
}: {
  content: string;
}): JSX.Element {
  return (
    <>
      <Viewer
        initialValue={content}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </>
  );
}
