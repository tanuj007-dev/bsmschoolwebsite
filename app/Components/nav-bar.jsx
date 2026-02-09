"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Instagram, Facebook } from "lucide-react";

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
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex h-[92px] items-center justify-between">

          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/bsm_logo-removebg-preview.png"
              alt="BSM Public School"
              width={88}
              height={88}
              priority
              className="h-[88px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight hidden sm:block">
              <h1 className="text-[22px] font-bold tracking-widest text-[#7A0C0C]">
                B.S.M. Public School
              </h1>
              <p className="text-xs tracking-widest text-gray-500 uppercase">
                Excellence • Discipline • Growth
              </p>
            </div>
          </Link>

          {/* CENTER — NAV */}
          <div className="hidden xl:flex flex-1 justify-center bf-white">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <div key={link.name} className="relative">
                    <Link
                      href={link.href}
                      className={`text-[15px] font-medium transition-colors ${
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

          {/* RIGHT — STUDENT LOGIN + CONTACT + SOCIAL ICONS */}
          <div className="hidden xl:flex items-center gap-4 bg-white">
            <a
              href="https://schoolbook.edukee.in/default.php?school=bsmpublicschoolkarala"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border-2 border-[#7A0C0C] text-[#7A0C0C] text-sm font-semibold rounded-md hover:bg-[#7A0C0C] hover:text-white transition shadow-sm"
            >
              Student Login
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#7A0C0C] text-white text-sm font-semibold rounded-md hover:bg-[#961212] transition shadow-sm">
              Contact Us
            </Link>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bsmpublicschoolkarala/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full border border-gray-200
                         hover:border-[#E1306C] hover:bg-[#E1306C]/10
                         transition duration-300"
            >
              <Instagram size={26} className="text-[#E1306C]" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full border border-gray-200
                         hover:border-[#1877F2] hover:bg-[#1877F2]/10
                         transition duration-300"
            >
              <Facebook size={26} className="text-[#1877F2]" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="xl:hidden p-2 text-gray-800 hover:text-[#7A0C0C]"
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
              className="fixed inset-0 bg-black/40 z-[1000]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed right-0 top-0 h-full w-[300px] bg-white z-[1001] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b">
                <span className="text-lg font-bold text-[#7A0C0C]">
                  B.S.M. Public School
                </span>
                <button onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="p-5 space-y-2 bg-white">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-3 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* MOBILE SOCIAL */}
              <div className="px-5 flex gap-4 bg-white">
                <Instagram size={22} className="text-[#E1306C]" />
                <Facebook size={22} className="text-[#1877F2]" />
              </div>

              <div className="mt-auto p-5 border-t bg-white">
                <a
                  href="https://schoolbook.edukee.in/default.php?school=bsmpublicschoolkarala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center border-2 border-[#7A0C0C] text-[#7A0C0C] py-3 rounded-md font-semibold mb-3"
                >
                  Student Login
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-[#7A0C0C] text-white py-3 rounded-md font-semibold mb-4"
                >
                  Contact Us
                </Link>

                <div className="space-y-3 text-sm text-gray-500">
                  <a href="tel:+919971231386" className="flex items-center gap-3">
                    <Phone size={14} /> +91 99712 31386
                  </a>
                  <a
                    href="mailto:bsmpublicschool.karala@gmail.com"
                    className="flex items-center gap-3 truncate"
                  >
                    <Mail size={14} /> bsmpublicschool.karala@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
