"use client";

import { Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden sm:block sticky top-0 w-full z-40 bg-[#7A0C0C]/95 backdrop-blur-md text-white shadow-md">
      <div className="container-wide">
        <div className="flex items-center justify-between h-11 text-sm">

          {/* LEFT — Phone Numbers */}
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { href: "tel:+919818301260", number: "+91 98183 01260", desk: "Junior Desk" },
              { href: "tel:+919971231386", number: "+91 99712 31386", desk: "Senior Desk" },
              { href: "tel:+917303061386", number: "+91 73030 61386", desk: "Senior Desk" },
            ].map(({ href, number, desk }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20"
              >
                <Phone size={14} />
                <span className="font-medium whitespace-nowrap">{number}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                  {desk}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT — Emails */}
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { href: "mailto:bsmpublicschool.karala@gmail.com", label: "bsmpublicschool.karala@gmail.com" },
              { href: "mailto:info@bsmschool.in", label: "info@bsmschool.in" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20"
              >
                <Mail size={14} />
                <span className="font-medium whitespace-nowrap">{label}</span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
