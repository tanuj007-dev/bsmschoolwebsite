"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { FileText, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useBlogs } from "../../hooks/useBlogs";

export default function AdminDashboardPage() {
  const { user, hydrated } = useAuth();
  const { blogs } = useBlogs();
  const [galleryCount, setGalleryCount] = useState(0);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setGalleryCount(Array.isArray(data) ? data.length : 0))
      .catch(() => { });
  }, []);

  if (!hydrated) {
    return <div className="animate-pulse h-64 bg-slate-200 dark:bg-slate-700 rounded-xl" />;
  }


  const stats = [
    { label: "Total Blogs", value: blogs.length, icon: FileText, href: "/admin/blogs", color: "bg-blue-500" },
    { label: "Gallery Images", value: galleryCount, icon: ImageIcon, href: "/admin/gallery", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, {user?.username || "Admin"}. Here’s an overview of your content.
        </p>
      </m.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg hover:border-[#7A0C0C]/30 transition-all">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{stat.label}</p>
                  <span className="inline-flex items-center gap-1 text-[#7A0C0C] text-sm font-medium mt-3">
                    Manage <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </m.div>
          );
        })}
      </div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blogs/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7A0C0C] text-white text-sm font-medium hover:bg-[#5a0909] transition-colors"
          >
            <FileText className="w-4 h-4" /> Add New Blog
          </Link>
          <Link
            href="/admin/gallery/upload"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <ImageIcon className="w-4 h-4" /> Upload Image
          </Link>
        </div>
      </m.div>
    </div>
  );
}
