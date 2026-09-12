"use client";

import { useMemo } from "react";
import JoditEditor from "jodit-react";

type BlogReadOnlyProps = {
  value: string;
};

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

  return <JoditEditor className="bg-slate-100" value={value} config={config} />;
}
