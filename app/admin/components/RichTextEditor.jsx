"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading2,
  Heading3,
  Minus,
} from "lucide-react";

/**
 * Client-only rich text editor (TipTap).
 * Use initialContent to prefill; call onChange(html) when content changes.
 */
export default function RichTextEditor({ initialContent = "", onChange, placeholder = "Write your content here...", className = "" }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none min-h-[200px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Editor uses initialContent only on first mount (no reactive sync to avoid overwriting user input)

  const setLink = useCallback(() => {
    const url = window.prompt("URL:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return <div className="animate-pulse h-[200px] bg-slate-200 dark:bg-slate-700 rounded-lg" />;

  return (
    <div className={`border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-800 ${className}`}>
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("bold") ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("italic") ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("heading", { level: 3 }) ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("bulletList") ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("orderedList") ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 ${editor.isActive("blockquote") ? "bg-slate-200 dark:bg-slate-600" : ""}`}
        >
          <Quote className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600">
          <Minus className="w-4 h-4" />
        </button>
        <button type="button" onClick={setLink} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600">
          Link
        </button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600">
          <Undo className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600">
          <Redo className="w-4 h-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
