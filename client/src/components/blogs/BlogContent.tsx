"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Selection } from "@tiptap/extensions";

import "@/components/tiptap-templates/simple/simple-editor.scss";

export default function BlogContent({ content }: { content: string }) {
  const editor = useEditor({
    immediatelyRender: false,

    editable: false,

    extensions: [
      StarterKit.configure({
        horizontalRule: false,

        link: {
          openOnClick: false,
          enableClickSelection: false,
        },
      }),

      HorizontalRule,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      TaskList,

      TaskItem.configure({
        nested: true,
      }),

      Highlight.configure({
        multicolor: true,
      }),

      Image,

      Typography,

      Superscript,

      Subscript,

      Selection,
    ],

    content,
  });

  if (!editor) return null;

  return (
    <div className="simple-editor-content">
      <div
        className="simple-editor"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
}
