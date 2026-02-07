"use client";

import { Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div
      className="hidden sm:block sticky top-0 w-full z-[99999]
      bg-[#7A0C0C]/95 backdrop-blur-md text-white shadow-md"
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-11 text-sm">

          {/* LEFT — Phone Numbers */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Junior Desk */}
            <a
              href="tel:+919818301260"
              className="flex items-center gap-2 px-3 py-1 rounded-full
              bg-white/10 border border-white/20
              hover:bg-[#D4AF37] hover:text-[#7A0C0C]
              transition-all duration-200"
            >
              <Phone size={13} />
              <span className="font-medium whitespace-nowrap">
                +91 98183 01260
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full
                bg-green-500 text-white font-semibold"
              >
                Junior Desk
              </span>
            </a>

            {/* Senior Desk 1 */}
            <a
              href="tel:+919971231386"
              className="flex items-center gap-2 px-3 py-1 rounded-full
              bg-yellow-400 text-[#7A0C0C] font-semibold shadow-sm
              hover:scale-105 transition-all duration-200"
            >
              <Phone size={13} />
              <span className="whitespace-nowrap">
                +91 99712 31386
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full
                bg-[#7A0C0C] text-white"
              >
                Senior Desk
              </span>
            </a>

            {/* Senior Desk 2 */}
            <a
              href="tel:+917303061386"
              className="flex items-center gap-2 px-3 py-1 rounded-full
              bg-yellow-400 text-[#7A0C0C] font-semibold shadow-sm
              hover:scale-105 transition-all duration-200"
            >
              <Phone size={13} />
              <span className="whitespace-nowrap">
                +91 73030 61386
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full
                bg-[#7A0C0C] text-white"
              >
                Senior Desk
              </span>
            </a>

          </div>

          {/* RIGHT — Emails */}
          <div className="flex items-center gap-3 flex-wrap">

            <a
              href="mailto:bsmpublicschool.karala@gmail.com"
              className="flex items-center gap-2 px-3 py-1 rounded-full
              bg-white/10 border border-white/20
              hover:bg-[#D4AF37] hover:text-[#7A0C0C]
              transition-all duration-200"
            >
              <Mail size={14} />
              <span className="font-medium whitespace-nowrap">
                bsmpublicschool.karala@gmail.com
              </span>
            </a>

            <a
              href="mailto:info@bsmschool.in"
              className="flex items-center gap-2 px-3 py-1 rounded-full
              bg-white/10 border border-white/20
              hover:bg-[#D4AF37] hover:text-[#7A0C0C]
              transition-all duration-200"
            >
              <Mail size={14} />
              <span className="font-medium whitespace-nowrap">
                info@bsmschool.in
              </span>
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}
