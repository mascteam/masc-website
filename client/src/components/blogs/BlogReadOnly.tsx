"use client";

import { useMemo } from "react";

type BlogReadOnlyProps = {
  value: string;
};

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export function BlogReadOnly({ value }: BlogReadOnlyProps) {
  const config = useMemo(
    () => ({
      readonly: true,
      toolbar: false,
      statusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      height: "auto",
    }),
    [],
  );

  return <ReactQuill theme="snow" value={value} readOnly={true} modules={{ toolbar: false }} />;
}
