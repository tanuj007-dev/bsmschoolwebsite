import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SiteLayout from "./Components/SiteLayout";
import ThemeProvider from "./Components/ThemeProvider";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "B.S.M. Public School",
  description: "B.S.M. Public School - Excellence in Education",
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
        <ThemeProvider>
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
