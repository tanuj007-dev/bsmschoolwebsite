"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Upload,
  Settings,
  School,
  LogOut,
  Menu,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Manage Blogs", icon: FileText },
  { href: "/admin/blogs/add", label: "Add Blog", icon: FileText },
  { href: "/admin/gallery", label: "Manage Gallery", icon: ImageIcon },
  { href: "/admin/gallery/add", label: "Add Image by URL", icon: LinkIcon },
  { href: "/admin/gallery/upload", label: "Upload Images", icon: Upload },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const DESKTOP_BREAKPOINT = 1024;

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 dark:bg-slate-700 text-white shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay when mobile menu open */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isDesktop ? 0 : mobileOpen ? 0 : "-100%" }}
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0
          bg-slate-800 dark:bg-slate-900 border-r border-slate-700
          transform lg:transform-none
          transition-transform duration-200 ease-out
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#7A0C0C] flex items-center justify-center">
                <School className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">BSM Admin</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive ? "bg-[#7A0C0C] text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-700">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <School className="w-5 h-5" />
              View Site
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-700 hover:text-red-400"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
