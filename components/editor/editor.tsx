import React, { forwardRef, useImperativeHandle, useRef } from "react";
import dynamic from "next/dynamic";
export const DynamicEditor = dynamic(() => import("./editor"), { ssr: false });

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { useTheme } from "next-themes";
import { BlockNoteEditor } from "@blocknote/core";

export interface EditorRef {
  editor: BlockNoteEditor | null; // Ensure this matches the actual type
}

interface EditorProps {
  onChange?: () => void;
}

const Editor = forwardRef<EditorRef, EditorProps>((prop, ref) => {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useCreateBlockNote({
    uploadFile: async (file) => {
      console.log(file);
      return "Uploaded";
    },
  });

  // Expose the editor instance to the parent
  useImperativeHandle(ref, () => ({
    editor,
  }));

  return (
    <BlockNoteView
      ref={editorRef}
      editor={editor}
      data-color-scheme={resolvedTheme}
      data-sator-theme
      sideMenu={false}
      className="min-h-[100px]"
    >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />
    </BlockNoteView>
  );
});

Editor.displayName = "Editor";

export default Editor;
