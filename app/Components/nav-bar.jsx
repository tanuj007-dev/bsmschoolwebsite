"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.instagram.com/bsmpublicschoolkarala/",
    icon: "/instagramlogo.png",
  },
  {
    href: "https://www.facebook.com/",
    icon: "/facebooklogo.png",
  },
  {
    href: "https://www.youtube.com/",
    icon: "/youtubelogo.png",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Amenities", href: "/amenities" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav
      className={`sticky top-0 sm:top-11 z-[990] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex h-[85px] items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/bsm_logo-removebg-preview.png"
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
                      className={`text-[15px] font-medium transition ${
                        active
                          ? "text-[#7A0C0C]"
                          : "text-gray-800 hover:text-[#7A0C0C]"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {active && (
                      <motion.div
                        layoutId="nav-line"
                        className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#7A0C0C] rounded-full"
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
              {socialLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center transition"
                >
                  <Image
                    src={item.icon}
                    alt="social"
                    width={31}
                    height={31}
                    className="object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="xl:hidden p-2 text-gray-800"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl z-[1001] flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="font-semibold text-[#7A0C0C] text-lg">
                  Menu
                </h2>
                <button onClick={() => setIsOpen(false)}>
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
                      className={`text-lg font-medium transition ${
                        active
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
                  {socialLinks.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image
                        src={item.icon}
                        alt="social"
                        width={22}
                        height={22}
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
