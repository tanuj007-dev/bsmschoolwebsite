"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const AdmissionsFormSection = () => {
  return (
    <section className="relative w-full py-12 flex items-center justify-center overflow-hidden bg-[#fafafa]">

      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden max-w-[1000px] mx-auto border border-white/40 flex flex-col md:flex-row">

          {/* Left Content Section */}
          <div className="md:w-5/12 p-8 flex flex-col justify-center relative bg-[#7A0C0C] text-white overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: "url('/bsm_logo-removebg-preview.png')", backgroundSize: '300px', backgroundRepeat: 'repeat', filter: 'grayscale(1)' }}></div>

            <div className="relative z-10">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-2 block"
              >
                Join Our Family
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4"
              >
                Start Your <br />
                <span className="text-[#D4AF37] italic">Journey</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/80 text-sm leading-relaxed mb-6 font-sans font-light"
              >
                Experience a world-class education that nurtures creativity, character, and excellence.
              </motion.p>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-3"
              >
                {[
                  "Holistic Education Model",
                  "State-of-the-Art Facilities",
                  "Expert Faculty"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="bg-[#D4AF37]/20 p-1 rounded-full">
                      <CheckCircle size={14} className="text-[#D4AF37]" />
                    </div>
                    <span className="text-white/90 font-medium tracking-wide text-xs">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="md:w-7/12 p-8 bg-white">
            <div className="mb-6 md:hidden">
              <h3 className="font-serif text-2xl font-bold text-[#2B2B2B]">Admissions Open</h3>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <input
                    type="text"
                    placeholder="Parent's Name"
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#7A0C0C] focus:bg-white transition-colors rounded-sm"
                  />
                </div>
                <div className="group">
                  <input
                    type="text"
                    placeholder="Student's Name"
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#7A0C0C] focus:bg-white transition-colors rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#7A0C0C] focus:bg-white transition-colors rounded-sm"
                  />
                </div>
                <div className="group">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+91</span>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-gray-50 border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#7A0C0C] focus:bg-white transition-colors rounded-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <select className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#7A0C0C] focus:bg-white transition-colors rounded-sm cursor-pointer">
                    <option value="">Select Class</option>
                    <option value="nursery">Nursery</option>
                    <option value="kg">Pre-Primary (KG)</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <div className="group">
                  <select className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#7A0C0C] focus:bg-white transition-colors rounded-sm cursor-pointer">
                    <option value="">Source</option>
                    <option value="google">Google</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="w-full bg-[#7A0C0C] text-white font-bold tracking-wider uppercase py-3 rounded-sm shadow-md hover:bg-[#961212] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm group"
                >
                  Submit Application
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsFormSection;
