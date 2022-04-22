import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export default function PostVeiwer({
  content,
}: {
  content: string;
}): JSX.Element {
  return (
    <>
      <Viewer initialValue={content} />
    </>
  );
}
