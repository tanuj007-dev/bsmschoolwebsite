"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";

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
    { name: "Home", href: "/", active: pathname === "/" },
    { name: "About Us", href: "/about-us", hasDropdown: true },
    { name: "Amenities", href: "/amenities", active: pathname === "/amenities" },
    { name: "Blogs", href: "/blogs", active: pathname.startsWith("/blogs") },
    { name: "Gallery", href: "/gallery", active: pathname === "/gallery" },
  ];

  const dropdownLinks = [
    { name: "What Makes Us Unique", href: "/about-us/what-makes-us-unique" },
    { name: "Registration Form", href: "/about-us/registration-form" },
  ];

  return (
    <nav
      className={`sticky top-[40px] z-[990] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex h-[92px] items-center justify-between">
          {/* LOGO + NAME */}
          <Link href="/" className="flex items-center gap-4 group">
           <Image
  src="/bsm_logo-removebg-preview.png"
  alt="BSM Public School"
  width={90}
  height={90}
  priority
  className="h-[90px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
/>


            <div className="leading-tight hidden sm:block">
              <h1 className="text-[22px] font-bold tracking-wide text-[#7A0C0C]">
                BSM Public School
              </h1>
              <p className="text-xs tracking-widest text-gray-500 uppercase">
                Excellence • Discipline • Growth
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden xl:flex flex-1 justify-center">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group flex h-full items-center"
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-[15px] font-medium transition-colors ${
                      link.active
                        ? "text-[#7A0C0C]"
                        : "text-gray-800 hover:text-[#7A0C0C]"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="transition-transform group-hover:rotate-180 text-gray-400"
                      />
                    )}
                  </Link>

                  {link.active && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-[#7A0C0C] rounded-full"
                    />
                  )}

                  {link.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden">
                        {dropdownLinks.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#7A0C0C]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden xl:flex">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#7A0C0C] text-white text-sm font-semibold rounded-md hover:bg-[#961212] transition-all shadow-sm"
            >
              Contact Us
            </Link>
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
                  BSM Public School
                </span>
                <button onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="p-5 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-3 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      {link.name}
                    </Link>

                    {link.hasDropdown && (
                      <div className="ml-5 border-l pl-4 space-y-2">
                        {dropdownLinks.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-gray-500 hover:text-[#7A0C0C]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto p-5 border-t">
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
