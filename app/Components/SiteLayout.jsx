"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load layout chunks so initial JS bundle is smaller
const TopBar = dynamic(() => import("./top-bar").then((m) => m.default), {
  ssr: true,
});
const Navbar = dynamic(() => import("./nav-bar").then((m) => m.default), {
  ssr: true,
});
const FooterSection = dynamic(() => import("./footer").then((m) => m.default), {
  ssr: true,
});

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
