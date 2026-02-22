import { Source_Sans_3 } from "next/font/google";
import nextDynamic from "next/dynamic";
import "./globals.css";
import SiteLayout from "./Components/SiteLayout";
import ThemeProvider from "./Components/ThemeProvider";
import MotionProvider from "./Components/MotionProvider";

// Code-split error UI so critical path stays smaller; still SSR so no flash.
const ErrorBoundary = nextDynamic(
  () => import("./Components/ErrorBoundary"),
  { ssr: true }
);

// Force the entire application to be dynamic (no static caching of HTML)
export const dynamic = "force-dynamic";
export const revalidate = 0;

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Prevent zoomed-out mobile view and black letterbox bars; ensure 1:1 scale.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata = {
  title: {
    default: "B.S.M. Public School | Excellence in Education",
    template: "%s | B.S.M. Public School",
  },
  description:
    "B.S.M. Public School, Karala Delhi – A premier CBSE school offering excellence, discipline and holistic growth from Nursery to Grade 12. Admissions open for 2026-27.",
  keywords: [
    "BSM Public School",
    "CBSE school Delhi",
    "Karala school",
    "best school North Delhi",
    "BSM school admissions",
  ],
  authors: [{ name: "B.S.M. Public School" }],
  metadataBase: new URL("https://bsmschool.in"),
  openGraph: {
    title: "B.S.M. Public School | Excellence in Education",
    description:
      "Premier CBSE school in Karala, Delhi. Admissions open 2026-27.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      { url: "/bsm_logo-removebg-preview.webp", type: "image/webp", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sourceSans3.variable} antialiased`}>
        <ErrorBoundary>
          <ThemeProvider>
            <MotionProvider>
              <SiteLayout>{children}</SiteLayout>
            </MotionProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
