"use client";

import React from "react";

const TOC_ITEMS = [
  { id: "accuracy", label: "Accuracy of Information" },
  { id: "modifications", label: "Modifications" },
  { id: "no-legal-relationship", label: "No Legal Relationship" },
  { id: "user-responsibility", label: "User Responsibility" },
  { id: "acceptance", label: "Acceptance" },
];

const TermsAndConditions = () => {
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
              Terms & Conditions
            </h1>
            <div className="mt-3 h-1 w-24 bg-[#7A0C0C] mx-auto rounded-full" />
          </div>

          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <div id="accuracy" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Accuracy of Information</h2>
              <p>
                The information available on the school website is provided for
                general guidance and informational purposes only. While the school
                makes every reasonable effort to ensure that the content is accurate,
                complete, and up to date, it does not guarantee the absolute accuracy
                of all information at all times.
              </p>
            </div>

            <div id="modifications" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Modifications</h2>
              <p>
                The school reserves the right to modify, update, or remove any
                information, content, policies, or services displayed on the website
                without prior notice. Such changes may be made to reflect academic,
                administrative, or regulatory requirements.
              </p>
            </div>

            <div id="no-legal-relationship" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">No Legal Relationship</h2>
              <p>
                The use of this website does not create any legal or contractual
                relationship between the school and the user. All admissions,
                academic activities, and institutional decisions are governed by
                applicable school rules, guidelines, and regulatory frameworks.
              </p>
            </div>

            <div id="user-responsibility" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">User Responsibility</h2>
              <p>
                Users are expected to use the website responsibly and refrain from
                any activity that may disrupt its functionality, compromise security,
                or violate applicable laws and regulations.
              </p>
            </div>

            <div id="acceptance" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Acceptance</h2>
              <p>
                Continued access to and use of the school website shall be deemed as
                acceptance of these terms and conditions. If any user does not agree
                with the terms stated herein, they are advised to discontinue use of
                the website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
