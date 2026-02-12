"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, FileText } from "lucide-react";
import { useBlogs } from "../../hooks/useBlogs";

export default function AdminBlogsPage() {
  const router = useRouter();
  const { blogs, deleteBlog } = useBlogs();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setDeletingId(id);
    deleteBlog(id);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Blogs</h1>
        <Link
          href="/admin/blogs/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7A0C0C] text-white font-medium hover:bg-[#5a0909] transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Blog
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No blogs yet. Create your first blog post.</p>
            <Link href="/admin/blogs/add" className="mt-4 inline-block text-[#7A0C0C] font-medium">
              Add Blog
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            <AnimatePresence>
              {blogs.map((blog, i) => (
                <motion.li
                  key={blog.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-600 flex-shrink-0">
                    <Image
                      src={blog.image || "/images/blog/blog-1.webp"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 dark:text-white truncate">{blog.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {blog.date?.day} {blog.date?.month} {blog.date?.year} · {blog.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/blogs/${blog.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                      className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      disabled={deletingId === blog.id}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
