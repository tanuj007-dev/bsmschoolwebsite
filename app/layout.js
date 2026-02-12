import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteLayout from "./Components/SiteLayout";
import ThemeProvider from "./Components/ThemeProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "B.S.M. Public School",
  description: "B.S.M. Public School - Excellence in Education",
  icons: {
    icon: [
      { url: "/bsm_logo-removebg-preview.png", type: "image/png", sizes: "32x32" },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider>
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
