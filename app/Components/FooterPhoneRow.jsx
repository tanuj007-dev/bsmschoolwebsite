"use client";
// Tiny client component just for the phone click handler.
// Everything else in footer.jsx is a server component.

import { Phone } from "lucide-react";

const phones = [
    { number: "+919971231386", display: "+91 99712 31386", desk: "Senior Desk" },
    { number: "+917303061386", display: "+91 73030 61386", desk: "Senior Desk" },
    { number: "+919818301260", display: "+91 98183 01260", desk: "Junior Desk" },
];

function isMobile() {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
    );
}

function handlePhoneClick(number) {
    const clean = number.replace(/\s+/g, "");
    if (isMobile()) {
        window.location.href = `tel:${clean}`;
    } else {
        window.open(`https://wa.me/${clean.replace("+", "")}`, "_blank");
    }
}

export default function PhoneClickRow() {
    return (
        <div className="flex gap-4">
            <div className="p-3 bg-white/5 rounded-lg h-fit">
                <Phone size={20} className="text-[#D4AF37]" />
            </div>
            <div>
                <p className="text-sm font-semibold uppercase tracking-wide">Phone</p>
                <div className="space-y-1 mt-1">
                    {phones.map(({ number, display, desk }) => (
                        <p
                            key={number}
                            onClick={() => handlePhoneClick(number)}
                            className="cursor-pointer text-white/60 text-sm hover:text-[#D4AF37] transition-colors"
                        >
                            {display} — {desk}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
