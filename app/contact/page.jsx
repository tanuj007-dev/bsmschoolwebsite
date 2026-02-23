"use client";

import React from "react";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LazySection from "../Components/LazySection";

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
    <a href="/" className="hover:text-[#7A0C0C] transition-colors">Home</a>
    <ChevronRight size={14} />
    <span className="text-[#7A0C0C] font-medium">Contact</span>
  </nav>
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-6 pb-10">
      <div className="container-wide px-4 sm:px-6 max-w-4xl">
        <Breadcrumb />

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8">
          {/* Contact details */}
          <div className="space-y-5">
            <div>
              <h3 className="flex items-center gap-2 text-[#7A0C0C] font-semibold text-base mb-2">
                <Phone size={18} /> Phone
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>Junior:</strong> +91 99712 31386, +91 73030 61386
                <br />
                <strong>Senior:</strong> +91 99999 99999
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#7A0C0C] font-semibold text-base mb-2">
                <Mail size={18} /> E-mail
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                bsmpublicschool.karala@gmail.com
                <br />
                <span className="font-medium">info@bsmschool.in</span>
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#7A0C0C] font-semibold text-base mb-2">
                <MapPin size={18} /> Address
              </h3>
              <p className="text-gray-600 text-sm">
                BSM Public School, Karala, Delhi - 110081
              </p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-xl md:text-2xl text-[#1a0505] mb-2">
              Get in touch
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Admissions ya enquiry ke liye WhatsApp par directly connect karein.
            </p>
            <a
              href="https://wa.me/917303061386"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-base py-3 px-5 rounded-lg transition-colors"
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <LazySection minHeight="280px" className="w-full">
          <div className="w-full h-[280px] sm:h-[320px] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps?q=BSM%20Public%20School%20Karala%20Delhi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </LazySection>
      </div>
    </main>
  );
}
