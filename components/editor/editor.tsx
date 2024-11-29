"use client";
import dynamic from "next/dynamic";
export const DynamicEditor = dynamic(() => import("./editor"), { ssr: false });

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  SideMenuProps,
  useBlockNoteEditor,
  useComponentsContext,
  useCreateBlockNote,
} from "@blocknote/react";
import { useTheme } from "next-themes";
import { MdDelete } from "react-icons/md";
export default function Editor() {
  const { resolvedTheme } = useTheme();
  const editor = useCreateBlockNote({
    uploadFile: async (file) => {
      console.log(file);
      return "Uploaded";
    },
  });

  return (
    <BlockNoteView
      editor={editor}
      data-color-scheme={resolvedTheme}
      data-sator-theme
      sideMenu={false}
      className="min-h-[100px]"
    >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            {/* Button which removes the hovered block. */}
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />
    </BlockNoteView>
  );
}

export function RemoveBlockButton(props: SideMenuProps) {
  const editor = useBlockNoteEditor();

  const Components = useComponentsContext()!;

  return (
    <Components.SideMenu.Button
      label="Remove block"
      icon={
        <MdDelete
          size={24}
          onClick={() => {
            editor.removeBlocks([props.block]);
          }}
        />
      }
    />
  );
}
