"use client";
import dynamic from "next/dynamic";
export const DynamicRenderContent = dynamic(() => import("./render-content"), {
  ssr: false,
});

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
export default function RenderContent({ content }: { content: Block[] }) {
  const { resolvedTheme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: content,
  });
  return (
    <BlockNoteView
      editor={editor}
      data-color-scheme={resolvedTheme}
      data-sator-render-theme
      editable={false}
      sideMenu={false}
    />
  );
}
