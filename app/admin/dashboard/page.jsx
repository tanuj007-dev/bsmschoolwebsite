"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useBlogs } from "../../hooks/useBlogs";
import { useGallery } from "../../hooks/useGallery";

export default function AdminDashboardPage() {
  const { user, hydrated } = useAuth();
  const { blogs } = useBlogs();
  const { images } = useGallery();

  if (!hydrated) {
    return <div className="animate-pulse h-64 bg-slate-200 dark:bg-slate-700 rounded-xl" />;
  }

  const stats = [
    { label: "Total Blogs", value: blogs.length, icon: FileText, href: "/admin/blogs", color: "bg-blue-500" },
    { label: "Gallery Images", value: images.length, icon: ImageIcon, href: "/admin/gallery", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, {user?.username || "Admin"}. Here’s an overview of your content.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
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
            </motion.div>
          );
        })}
      </div>

      <motion.div
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
      </motion.div>
    </div>
  );
}
