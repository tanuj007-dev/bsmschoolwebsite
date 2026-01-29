"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-[9999] w-full bg-[#7A0C0C] text-white">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-10 text-xs sm:text-sm">

          {/* LEFT : Contact */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+919971231386"
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition"
            >
              <Phone size={13} />
              <span className="whitespace-nowrap">+91 99712 31386</span>
            </a>

            <a
              href="tel:+917303061386"
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition"
            >
              <Phone size={13} />
              <span className="whitespace-nowrap">+91 73030 61386</span>
            </a>

            {/* Email only desktop */}
            <a
              href="mailto:bsmpublicschool.karala@gmail.com"
              className="hidden lg:flex items-center gap-2 hover:text-[#D4AF37] transition"
            >
              <Mail size={14} />
              bsmpublicschool.karala@gmail.com
            </a>
          </div>

          {/* RIGHT : Social */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#"
              className="hover:text-[#D4AF37] transition hover:scale-110"
            >
              <Facebook size={15} />
            </Link>

            <Link
              href="#"
              className="hover:text-[#D4AF37] transition hover:scale-110"
            >
              <Twitter size={15} />
            </Link>

            <Link
              href="https://www.instagram.com/bsmpublicschoolkarala/"
              className="hover:text-[#D4AF37] transition hover:scale-110"
            >
              <Instagram size={15} />
            </Link>

            <Link
              href="https://www.youtube.com/@bsmpublicschoolkarala"
              className="hover:text-[#D4AF37] transition hover:scale-110"
            >
              <Youtube size={15} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;
