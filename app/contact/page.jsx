import React from "react";
import { ChevronRight } from "lucide-react";

// Breadcrumb Component
const Breadcrumb = () => (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-[#7A0C0C] transition-colors">Home</a>
        <ChevronRight size={14} />
        <span className="text-[#7A0C0C] font-medium">Contact</span>
    </nav>
);

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pt-10 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <Breadcrumb />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
                    {/* LEFT COLUMN: Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-[#7A0C0C] font-bold text-xl mb-4">Phone Number:</h3>
                            <p className="text-gray-600 leading-relaxed font-sans text-lg md:text-xl">
                                0440087080, 8448087081, 8448087082, 8448087083,<br />
                                8448087084
                            </p>
                            <div className="h-px w-full bg-gray-200 mt-8"></div>
                        </div>

                        <div>
                            <h3 className="text-[#7A0C0C] font-bold text-xl mb-4">E-mail:</h3>
                            <p className="text-gray-600 font-sans text-lg md:text-xl">
                                info@thevenkateshwarschool.com
                            </p>
                            <div className="h-px w-full bg-gray-200 mt-8"></div>
                        </div>

                        <div>
                            <h3 className="text-[#7A0C0C] font-bold text-xl mb-4">Address:</h3>
                            <p className="text-gray-600 font-sans max-w-md text-lg md:text-xl">
                                F-Block, Sushant Lok II, Sector 57, Gurgaon, Haryana
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Get in touch Form */}
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#1a0505] mb-8">
                            Get in touch
                        </h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        placeholder="First name*"
                                        className="w-full border border-gray-300 px-5 py-4 rounded text-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="flex">
                                    <span className="bg-[#D4AF37] text-white px-4 py-4 rounded-l text-lg font-medium flex items-center justify-center min-w-[60px]">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="Phone no"
                                        className="w-full border border-gray-300 border-l-0 px-5 py-4 rounded-r text-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    className="w-full border border-gray-300 px-5 py-4 rounded text-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-gray-400"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="relative">
                                <textarea
                                    rows={5}
                                    placeholder="Your message"
                                    className="w-full border border-gray-300 px-5 py-4 rounded text-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-gray-400 resize-none"
                                ></textarea>
                                <div className="absolute bottom-4 right-4 text-gray-400 pointer-events-none">
                                    <span className="text-sm">///</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button className="w-full bg-[#D4AF37] hover:bg-[#bfa035] text-white font-bold text-lg py-5 rounded transition-all shadow-sm hover:shadow-md uppercase tracking-wider">
                                Send enquiry
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.893214057766!2d77.04256257551068!3d28.75260027560021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0793666016e1%3A0x6b4ef896791e25e!2sBSM%20Public%20School!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-10 hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>
            </div>
        </main>
    );
}
