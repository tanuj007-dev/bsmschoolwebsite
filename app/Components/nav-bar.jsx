"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { BiLogoFacebookSquare } from "react-icons/bi";

const socialLinks = [
  {
    href: "https://www.instagram.com/bsmpublicschoolkarala/",
    Icon: FaInstagram,
    label: "Instagram",
    color: "#E1306C"
  },
  {
    href: "https://www.facebook.com/",
    Icon: BiLogoFacebookSquare,
    label: "Facebook",
    color: "#1877F2"
  },
  {
    href: "https://www.youtube.com/",
    Icon: FaYoutube,
    label: "YouTube",
    color: "#FF0000"
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ✅ passive: true — tells browser this listener won't call preventDefault()
  //    which allows the browser to optimise scrolling without waiting for JS.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ useMemo — navLinks array only created once, not on every render
  const navLinks = useMemo(() => [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Gallery", href: "/gallery" },
  ], []);

  // ✅ useCallback — stable refs prevent m.div remounting
  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav
      className={`sticky top-0 sm:top-11 z-[990] w-full transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-md shadow-sm"
        : "bg-white"
        }`}
    >
      <div className="container-wide px-4 sm:px-6 lg:px-10">
        <div className="flex h-[85px] items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/bsm_logo-removebg-preview.webp"
              alt="BSM Public School Logo"
              width={70}
              height={70}
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight hidden sm:block">
              <h1 className="text-[20px] font-bold text-[#7A0C0C]">
                B.S.M Public School
              </h1>
              <p className="text-xs text-gray-600 uppercase">
                Excellence • Discipline • Growth
              </p>
            </div>
          </Link>

          {/* CENTER NAV */}
          <div className="hidden xl:flex flex-1 justify-center">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <div key={link.name} className="relative">
                    <Link
                      href={link.href}
                      className={`text-[15px] font-medium transition ${active
                        ? "text-[#7A0C0C]"
                        : "text-gray-800 hover:text-[#7A0C0C]"
                        }`}
                    >
                      {link.name}
                    </Link>
                    {active && (
                      <span
                        className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#7A0C0C] rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden xl:flex items-center gap-4">

            <a
              href="https://schoolbook.edukee.in/default.php?school=bsmpublicschoolkarala"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border-2 border-[#7A0C0C] text-[#7A0C0C] text-sm font-semibold rounded-lg hover:bg-[#7A0C0C] hover:text-white transition"
            >
              Student Login
            </a>

            <Link
              href="/contact"
              className="px-6 py-2.5 bg-[#7A0C0C] text-white text-sm font-semibold rounded-lg hover:bg-[#961212] transition shadow-md"
            >
              Contact Us
            </Link>

            <div className="flex items-center gap-3 ml-2">
              {/* Unique gradient definition for Navbar icons */}
              <svg width="0" height="0" className="absolute">
                <linearGradient id="nav-instagram-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop stopColor="#833ab4" offset="0%" />
                  <stop stopColor="#fd1d1d" offset="50%" />
                  <stop stopColor="#fcb045" offset="100%" />
                </linearGradient>
              </svg>

              {socialLinks.map((item, i) => (
                <m.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center transition p-1"
                  aria-label={item.label}
                >
                  <item.Icon
                    size={26}
                    style={{
                      fill:
                        item.label === "Instagram"
                          ? "url(#nav-instagram-gradient)"
                          : item.color,
                      color:
                        item.label === "Instagram"
                          ? undefined
                          : item.color,
                    }}
                  />
                </m.a>
              ))}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={openMenu}
            className="xl:hidden p-2 text-gray-800"
            aria-label="Open navigation menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
            />

            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl z-[1001] flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="font-semibold text-[#7A0C0C] text-lg">Menu</h2>
                <button onClick={closeMenu} aria-label="Close menu">
                  <X size={26} />
                </button>
              </div>

              <div className="flex flex-col px-6 py-6 gap-6">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition ${active
                        ? "text-[#7A0C0C]"
                        : "text-gray-700"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-center py-3 bg-[#7A0C0C] text-white rounded-lg font-semibold"
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-auto p-6 border-t space-y-5 text-sm text-gray-600">

                <div className="flex gap-4">
                  {/* Separate gradient for mobile to ensure visibility if desktop is hidden */}
                  <svg width="0" height="0" className="absolute">
                    <linearGradient id="nav-mobile-instagram-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop stopColor="#833ab4" offset="0%" />
                      <stop stopColor="#fd1d1d" offset="50%" />
                      <stop stopColor="#fcb045" offset="100%" />
                    </linearGradient>
                  </svg>

                  {socialLinks.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-1"
                      aria-label={item.label}
                    >
                      <item.Icon
                        size={28}
                        style={{
                          fill:
                            item.label === "Instagram"
                              ? "url(#nav-mobile-instagram-gradient)"
                              : item.color,
                          color:
                            item.label === "Instagram"
                              ? undefined
                              : item.color,
                        }}
                      />
                    </a>
                  ))}
                </div>

                <a href="tel:+919971231386" className="flex items-center gap-3">
                  <Phone size={16} /> +91 99712 31386
                </a>

                <a
                  href="mailto:bsmpublicschool.karala@gmail.com"
                  className="flex items-center gap-3 truncate"
                >
                  <Mail size={16} /> bsmpublicschool.karala@gmail.com
                </a>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
