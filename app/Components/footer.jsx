"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  // Social Media Links Data
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/bsmpublicschoolkarala/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@bsmpublicschoolkarala", label: "Youtube" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  // Quick Links Data
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Admissions", href: "/about-us/registration-form" },
    { name: "Syllabus", href: "#" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#1a0505] text-white pt-24 pb-12 overflow-hidden font-sans">
      {/* Background Pattern & Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/bsm logo.png')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
          filter: "grayscale(1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#7A0C0C]/90 to-[#1a0505] pointer-events-none" />

      {/* Golden Top Border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* --- BRANDING SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 border-b border-white/10 pb-12">
          <div>
            <h2 className="font-sans font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl">
              <span className="text-[#D4AF37]">BSM</span> Public School
            </h2>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mt-2 font-medium">
              EST. 2000 | Excellence in Education
            </p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1a0505] transition-all duration-300 group"
              >
                <social.icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* 1. Philosophy */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-sans font-semibold text-2xl text-[#D4AF37]">
              Our Philosophy
            </h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-base font-light">
              At BSM Public School, we believe in nurturing not just students, but
              future leaders. Our holistic approach combines academic rigor with
              character building, ensuring every child discovers their true
              potential.
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors group"
            >
              Read More
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-sans font-semibold text-xl border-l-4 border-[#D4AF37] pl-4">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 group-hover:bg-[#D4AF37]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-sans font-semibold text-xl border-l-4 border-[#D4AF37] pl-4">
              Contact Info
            </h3>
            <div className="space-y-5">
              <ContactItem 
                icon={<MapPin size={20} className="text-[#D4AF37]" />}
                title="Address"
                desc={<>BSM Public School, Karala,<br />North West Delhi - 110081</>}
              />
              <ContactItem 
                icon={<Phone size={20} className="text-[#D4AF37]" />}
                title="Phone"
                desc={<>+91 99712 31386<br />+91 73030 61386</>}
              />
              <div className="flex gap-4">
                <div className="p-3 bg-white/5 rounded-lg shrink-0 h-fit">
                  <Mail size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide">Email</p>
                  <a href="mailto:bsmpublicschool.karala@gmail.com" className="text-white/60 text-sm hover:text-[#D4AF37] break-all">
                    bsmpublicschool.karala@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Google Maps - WORKING VERSION */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-sans font-semibold text-xl border-l-4 border-[#D4AF37] pl-4">
              Locate Us
            </h3>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-white/20 shadow-2xl">
              <iframe
                title="BSM Public School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.026723238641!2d77.0371465753556!3d28.748641475599813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da98e6f1c9d2f%3A0x673467c6999a896!2sBSM%20Public%20School!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <p className="text-xs text-white/40 italic">
              Visit us between 8:00 AM - 2:30 PM.
            </p>
          </div>
        </div>

        {/* --- COPYRIGHT FOOTER --- */}
        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {currentYear} BSM Public School. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#D4AF37]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#D4AF37]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#D4AF37]">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Component for Contact Items
function ContactItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="p-3 bg-white/5 rounded-lg shrink-0 h-fit">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
        <div className="text-white/60 text-sm leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}