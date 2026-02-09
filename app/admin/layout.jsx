"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";

/**
 * Admin layout: login page has no shell; all other admin routes get sidebar + main area.
 */
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 pt-0 lg:pt-0 lg:pl-0 overflow-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
