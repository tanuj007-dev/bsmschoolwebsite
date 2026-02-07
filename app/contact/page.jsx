"use client";

import React from "react";
import { ChevronRight, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ---------------- Breadcrumb ---------------- */
const Breadcrumb = () => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
      <a
        href="/"
        className="hover:text-[#7A0C0C] transition-colors duration-200"
      >
        Home
      </a>
      <ChevronRight size={14} />
      <span className="text-[#7A0C0C] font-medium">Contact</span>
    </nav>
  );
};

/* ---------------- Contact Page ---------------- */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumb />

        {/* ---------------- Top Section ---------------- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          {/* LEFT: Contact Details */}
          <div className="space-y-12">
            {/* Phone */}
            <div>
              <h3 className="flex items-center gap-2 text-[#7A0C0C] font-bold text-xl mb-4">
                <Phone size={20} />
                Phone Numbers
              </h3>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                <strong>Junior Desk:</strong> +91 99712 31386, +91 73030 61386
                <br />
                <strong>Senior Desk:</strong> +91 99999 99999
              </p>

              <div className="h-px bg-gray-200 mt-8" />
            </div>

            {/* Email */}
            <div>
              <h3 className="flex items-center gap-2 text-[#7A0C0C] font-bold text-xl mb-4">
                <Mail size={20} />
                E-mail
              </h3>

              <p className="text-gray-600 text-lg md:text-xl space-y-1">
                <span className="block">
                  bsmpublicschool.karala@gmail.com
                </span>
                <span className="block font-medium">
                  info@bsmschool.in
                </span>
              </p>

              <div className="h-px bg-gray-200 mt-8" />
            </div>

            {/* Address */}
            <div>
              <h3 className="text-[#7A0C0C] font-bold text-xl mb-4">
                Address
              </h3>
              <p className="text-gray-600 text-lg md:text-xl max-w-md">
                BSM Public School, Karala, Delhi - 110081
              </p>
            </div>
          </div>

          {/* RIGHT: WhatsApp CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a0505] mb-6">
              Get in touch
            </h2>

            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-md">
              Admissions ya enquiry ke liye WhatsApp par directly connect karein.
            </p>

            <a
              href="https://wa.me/917303061386"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-lg md:text-xl py-5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <FaWhatsapp
                size={26}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ---------------- Map Section ---------------- */}
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=BSM%20Public%20School%20Karala%20Delhi&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full  hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </main>
  );
}
