"use client";

import React from "react";

const TOC_ITEMS = [
  { id: "introduction", label: "Introduction" },
  { id: "data-collection", label: "Data Collection" },
  { id: "data-use", label: "Use of Information" },
  { id: "data-security", label: "Data Security" },
  { id: "data-sharing", label: "Sharing & Disclosure" },
  { id: "consent", label: "Consent" },
];

const PrivacyPolicy = () => {
  return (
    <section className="w-full min-h-screen bg-[#F8F9FA] py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:gap-10 lg:gap-12">
        {/* Table of contents - hidden on mobile */}
        <aside className="hidden md:block md:w-56 lg:w-64 shrink-0">
          <nav
            className="sticky top-24 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 p-4"
            aria-label="Table of contents"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              On this page
            </h2>
            <ul className="space-y-2 text-sm">
              {TOC_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-gray-600 hover:text-[#7A0C0C] transition-colors block py-1 border-l-2 border-transparent hover:border-[#7A0C0C] pl-3 -ml-px"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-12">
          <div className="mb-8 sm:mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7A0C0C]">
              Privacy Policy
            </h1>
            <div className="mt-3 h-1 w-20 bg-[#7A0C0C] mx-auto rounded-full" />
          </div>

          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <div id="introduction" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Introduction</h2>
              <p>
                The school is committed to maintaining the highest standards of
                confidentiality and data protection. All personal information
                related to students, parents, staff members, and visitors is handled
                with utmost care and responsibility.
              </p>
            </div>

            <div id="data-collection" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Collection</h2>
              <p>
                Any information collected through admission forms, registration
                processes, official documents, or the school website is used
                strictly for academic, administrative, communication, and
                institutional purposes only.
              </p>
            </div>

            <div id="data-use" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Use of Information</h2>
              <p>
                Collected information is used strictly for academic, administrative,
                communication, and institutional purposes in the best interest of
                the institution and its stakeholders.
              </p>
            </div>

            <div id="data-security" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h2>
              <p>
                The school ensures that appropriate security measures are in place
                to protect personal data from unauthorized access, alteration, or
                disclosure. Access to such information is limited to authorized
                personnel only.
              </p>
            </div>

            <div id="data-sharing" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Sharing & Disclosure</h2>
              <p>
                Personal information is not shared, sold, or disclosed to any
                external individual, organization, or agency except when required
                under statutory provisions, legal obligations, or by an order of a
                competent authority.
              </p>
            </div>

            <div id="consent" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Consent</h2>
              <p>
                By interacting with the school or submitting personal information
                through any official channel, individuals consent to the collection
                and use of information as outlined in this privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
