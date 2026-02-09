"use client";

import { usePathname } from "next/navigation";
import TopBar from "./top-bar";
import Navbar from "./nav-bar";
import FooterSection from "./footer";

/**
 * Wraps main site content with header/footer. Admin routes get no header/footer.
 */
export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Navbar />
      {children}
      <FooterSection />
    </>
  );
}
