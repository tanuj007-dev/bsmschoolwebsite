"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, User, Clock, ChevronRight } from "lucide-react";
import { useBlogs } from "../hooks/useBlogs";

const BlogCard = ({ post, index }) => {
  const isDataUrl = post.image?.startsWith?.("data:");
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(122,12,12,0.15)] transition-all duration-500 border border-gray-100"
    >
      {/* Image Container */}
      <Link href={`/blogs/${post.id}`} className="relative h-64 w-full overflow-hidden block">
        {isDataUrl ? (
          <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
        ) : (
          <Image
            src={post.image || "/images/blog/blog-1.webp"}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2 min-w-[60px] text-center border border-white/50">
          <span className="text-xl font-bold text-[#7A0C0C] leading-none">{post.date.day}</span>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mt-1">{post.date.month}</span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 right-4 bg-[#A97E3C]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
          {post.category}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 sm:p-7 relative">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-[#A97E3C]" />
            <span>{post.author}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#A97E3C]" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <Link href={`/blogs/${post.id}`} className="block">
          <h3 className="text-xl font-bold text-[#2B2B2B] leading-tight mb-3 line-clamp-2 group-hover:text-[#7A0C0C] transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between group/btn">
          <Link href={`/blogs/${post.id}`}>
            <button className="text-sm font-bold text-[#7A0C0C] uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              Read Full Article
              <ArrowUpRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  const { blogs } = useBlogs();
  return (
    <section className="relative bg-[#FAFAFA] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-[#FAFAFA] -z-10" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#A97E3C]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-[#7A0C0C]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 px-2">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#7A0C0C] font-bold tracking-[0.2em] uppercase text-sm mb-3 block"
            >
              School Updates & Insights
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B] leading-tight"
            >
              Latest from <span className="text-[#A97E3C] relative inline-block">
                Our Blog

              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <button className="group flex items-center gap-2 px-8 py-3 bg-white text-[#2B2B2B] font-semibold rounded-full border border-gray-200 shadow-sm hover:border-[#7A0C0C] hover:text-[#7A0C0C] transition-all duration-300">
              View All Articles
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Blog Grid - data from admin store (localStorage) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogs.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <button className="flex items-center justify-center gap-2 px-8 py-3 bg-[#7A0C0C] text-white font-semibold rounded-full shadow-lg active:scale-95 transition-all w-full sm:w-auto">
            View All Articles
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
