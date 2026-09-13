"use client";

import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  placeholder?: string;
};

export function BlogEditor({ value, onChange, onImageUpload, placeholder = "Write something..." }: BlogEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const [imageDialog, setImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const insertImage = (url: string) => {
    const editor = quillRef.current?.getEditor();

    if (!editor || !url.trim()) return;

    const range = editor.getSelection(true);

    editor.insertEmbed(range.index, "image", url.trim());
    editor.setSelection(range.index + 1);

    setImageUrl("");
    setImageDialog(false);
  };

  const handleImageUrl = () => {
    insertImage(imageUrl);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      try {
        setUploading(true);

        const url = await onImageUpload(file);

        insertImage(url);
      } catch (error  : any) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: () => setImageDialog(true),
      },
    },
  };

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />

      {imageDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-lg font-semibold">Insert Image</h2>

            <div className="space-y-3">
              {/* Upload */}
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className="w-full rounded-lg border p-4 text-left transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <p className="font-medium">{uploading ? "Uploading..." : "Upload Image"}</p>

                <p className="text-sm text-gray-500">Choose an image from your device</p>
              </button>

              {/* URL */}
              <div className="rounded-lg border p-4">
                <p className="mb-2 font-medium">Insert from URL</p>

                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleImageUrl();
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                />

                <button
                  type="button"
                  onClick={handleImageUrl}
                  disabled={!imageUrl.trim()}
                  className="mt-3 rounded-lg bg-black px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Insert Image
                </button>
              </div>

              {/* Cancel */}
              <button
                type="button"
                onClick={() => {
                  setImageDialog(false);
                  setImageUrl("");
                }}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
