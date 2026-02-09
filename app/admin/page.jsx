import { redirect } from "next/navigation";

/**
 * /admin has no content; redirect to dashboard.
 * Middleware already sends unauthenticated users to /admin/login.
 */
export default function AdminPage() {
  redirect("/admin/dashboard");
}
