"use client";

import { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";
import type { IJodit } from "jodit/esm/types";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  placeholder?: string;
};

export function BlogEditor({ value, onChange, onImageUpload, placeholder = "Write something..." }: BlogEditorProps) {
  const editor = useRef<IJodit | null>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      height: 500,
      saveSelectionOnBlur: true,

      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "align",
        "|",
        "link",
        "image",
        "|",
        "undo",
        "redo",
        "eraser",
      ],

      uploader: {
  insertImageAsBase64URI: false,

  customUploadFunction: async (
    requestData: FormData,
    showProgress: (progress: number) => void,
  ) => {
    const file = requestData.get("files[0]") as File | null;

    if (!file) {
      throw new Error("No image selected");
    }

    const url = await onImageUpload(file);

    showProgress(100);

    return {
      success: true,
      data: {
        files: [url],
        path: "",
        baseurl: "",
        isImages: [true],
        messages: [],
        error: 0,
      },
    };
  },

  imagesExtensions: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "webp",
  ],
},  
    }),
    [onImageUpload, placeholder],
  );

  return <JoditEditor ref={editor} value={value} config={config} onBlur={onChange} />;
}
