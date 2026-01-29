"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Printer, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../../data/blogs';
import HeaderHero from '../../Components/herosection';

export default function BlogPost({ params }) {
    // Use React.use() to unwrap params if you are in React 19/Next.js 15, otherwise just destructuring works for now in earlier versions.
    // Assuming standard Next.js 14/15 behavior where params is a promise in the newest versions, but let's try direct access first or standard async component pattern.
    // Since this is a client component ('use client'), params are passed as props.

    const { id } = React.use(params);
    const post = blogPosts.find((p) => p.id === parseInt(id));

    if (!post) {
        return notFound();
    }

    // Find related posts (just exclude current one and take first 3)
    const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <article className="min-h-screen bg-[#FFFDF9] pb-20">
            {/* Dynamic Header/Hero Area for the Post */}
            <div className="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-[#A97E3C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <Calendar size={14} />
                                <span>{post.date.day} {post.date.month}, {post.date.year}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-sm font-medium text-white/80">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>By {post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 md:p-12 rounded-2xl border border-gray-100 shadow-sm"
                >
                    {/* Breadcrumb / Back Link */}
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-[#7A0C0C] font-semibold mb-8 hover:underline">
                        <ArrowLeft size={16} /> Back to All Posts
                    </Link>

                    {/* Actual Content */}
                    <div
                        className="prose text-black prose-lg prose-red max-w-none 
              prose-headings:font-bold prose-headings:text-black 
              prose-p:text-black prose-p:leading-relaxed prose-p:text-justify
              prose-a:text-[#A97E3C] prose-a:no-underline hover:prose-a:underline
              prose-li:text-black prose-li:text-justify
              prose-strong:text-[#7A0C0C]"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Section */}
                    <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="font-bold text-[#2B2B2B]">Share this article:</span>
                        <div className="flex gap-4">
                            <button className="h-10 w-10 rounded-full bg-[#7A0C0C]/10 text-[#7A0C0C] flex items-center justify-center hover:bg-[#7A0C0C] hover:text-white transition-colors">
                                <Facebook size={18} />
                            </button>
                            <button className="h-10 w-10 rounded-full bg-[#7A0C0C]/10 text-[#7A0C0C] flex items-center justify-center hover:bg-[#7A0C0C] hover:text-white transition-colors">
                                <Twitter size={18} />
                            </button>
                            <button className="h-10 w-10 rounded-full bg-[#7A0C0C]/10 text-[#7A0C0C] flex items-center justify-center hover:bg-[#7A0C0C] hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </button>
                            <button className="h-10 w-10 rounded-full bg-[#7A0C0C]/10 text-[#7A0C0C] flex items-center justify-center hover:bg-[#7A0C0C] hover:text-white transition-colors">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Search/Author Widget */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-[#FFF6EA] flex items-center justify-center mx-auto mb-4 text-[#7A0C0C]">
                            <User size={32} />
                        </div>
                        <h3 className="text-center text-[#7A0C0C] font-bold text-lg mb-2">About the Author</h3>
                        <p className="text-center text-[#7A0C0C] text-sm">
                            Written by the {post.author} team at B.S.M. Public School, dedicated to providing educational insights.
                        </p>
                    </div>

                    {/* Related Posts Widget */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[#7A0C0C] text-lg mb-6 border-l-4 border-[#7A0C0C] pl-3">
                            Related Articles
                        </h3>
                        <div className="space-y-6">
                            {relatedPosts.map(related => (
                                <Link key={related.id} href={`/blogs/${related.id}`} className="group flex gap-4 items-start">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                        <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#2B2B2B] leading-snug group-hover:text-[#7A0C0C] transition-colors line-clamp-2">
                                            {related.title}
                                        </h4>
                                        <span className="text-xs text-gray-400 mt-2 block">{related.date.day} {related.date.month}, {related.date.year}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter/CTA Widget */}
                    <div className="bg-[#7A0C0C] p-8 rounded-xl text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <h3 className="text-xl font-bold mb-4 relative z-10">Admissions Open</h3>
                        <p className="text-white/80 text-sm mb-6 relative z-10">
                            Secure your child's future with our world-class educational programs.
                        </p>
                        <Link href="/about-us/registration-form">
                            <button className="w-full bg-[#A97E3C] hover:bg-[#cfa55b] text-white font-bold py-3 rounded shadow-lg transition-colors relative z-10">
                                Apply Now
                            </button>
                        </Link>
                    </div>
                </aside>

            </div>
        </article>
    );
}
