"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  /* ---------------- Device Detect ---------------- */
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );
  };

  const handlePhoneClick = (number) => {
    const cleanNumber = number.replace(/\s+/g, "");

    if (isMobile()) {
      window.location.href = `tel:${cleanNumber}`;
    } else {
      window.open(`https://wa.me/${cleanNumber}`, "_blank");
    }
  };

  /* ---------------- Social Links ---------------- */
  const socialLinks = [
    {
      icon: "/facebooklogo.webp",
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: "/instagramlogo.webp",
      href: "https://www.instagram.com/bsmpublicschoolkarala/",
      label: "Instagram",
    },
    {
      icon: "/youtubelogo.webp",
      href: "https://www.youtube.com/@bsmpublicschoolkarala",
      label: "Youtube",
    },
  ];

  /* ---------------- Quick Links ---------------- */
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    // { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#1a0505] text-white pt-24 pb-12 overflow-hidden font-sans">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/bsm logo.webp')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
          filter: "grayscale(1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#7A0C0C]/90 to-[#1a0505] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-5 lg:px-0">

        {/* Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 border-b border-white/10 pb-12">
          <div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
              <span className="text-[#D4AF37]">B.S.M</span> Public School
            </h2>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mt-2">
              Est. 2000 | Excellence in Education
            </p>
          </div>

          {/* Custom Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5 group"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Philosophy */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-semibold text-[#D4AF37]">
              Our Philosophy
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              At B.S.M. Public School, we believe in nurturing not just students,
              but future leaders. Our holistic approach blends academic
              excellence with strong values and character building.
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors group"
            >
              Read More
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold border-l-4 border-[#D4AF37] pl-4">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 group-hover:bg-[#D4AF37]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-semibold border-l-4 border-[#D4AF37] pl-4">
              Contact Info
            </h3>

            <ContactItem
              icon={<MapPin size={20} className="text-[#D4AF37]" />}
              title="Address"
              desc={
                <>
                  B.S.M PUBLIC SCHOOL
                  <br />
                  ANANDPUR DHAM, SULTANPUR ROAD,
                  <br />
                  KARALA, DELHI-81
                </>
              }
            />

            <ContactItem
              icon={<Phone size={20} className="text-[#D4AF37]" />}
              title="Phone"
              desc={
                <>
                  <p onClick={() => handlePhoneClick("+919971231386")} className="cursor-pointer hover:text-[#D4AF37] transition-colors">
                    +91 99712 31386 - Senior Desk
                  </p>
                  <p onClick={() => handlePhoneClick("+917303061386")} className="cursor-pointer hover:text-[#D4AF37] transition-colors">
                    +91 73030 61386 - Senior Desk
                  </p>
                  <p onClick={() => handlePhoneClick("+919818301260")} className="cursor-pointer hover:text-[#D4AF37] transition-colors">
                    +91 98183 01260 - Junior Desk
                  </p>
                </>
              }
            />

            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-lg h-fit">
                <Mail size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Email
                </p>
                <a href="mailto:bsmpublicschool.karala@gmail.com" className="block text-white/60 text-sm hover:text-[#D4AF37] transition-colors break-all">
                  bsmpublicschool.karala@gmail.com
                </a>
                <a href="mailto:info@bsmschool.in" className="block text-white/60 text-sm hover:text-[#D4AF37] transition-colors break-all mt-1">
                  info@bsmschool.in
                </a>
              </div>
            </div>
          </div>

          {/* Map Section (NOW INCLUDED 😎) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-semibold border-l-4 border-[#D4AF37] pl-4">
              Locate Us
            </h3>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-white/20 shadow-2xl">
              <iframe
                title="BSM School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4672304423425!2d77.02670447563709!3d28.73546387560868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0636ebcf42c3%3A0x8de81c36941e46b4!2sB.S.M%20Sr%20Sec%20School!5e0!3m2!1sen!2sin!4v1770030697775!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
            <p className="text-xs text-white/40 italic">
              Visit us between 8:00 AM – 2:30 PM.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {currentYear} BSM Public School. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#D4AF37]">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#D4AF37]">
              Terms of Service
            </Link>
            <Link href="/shipping-and-refund-policy" className="hover:text-[#D4AF37]">
              Shipping & Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* Contact Item */
function ContactItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="p-3 bg-white/5 rounded-lg h-fit">{icon}</div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
        <div className="text-white/60 text-sm leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}
