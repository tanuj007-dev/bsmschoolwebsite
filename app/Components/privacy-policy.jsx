"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="w-full bg-[#F8F9FA] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-10 lg:p-14">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7A0C0C]">
            Privacy Policy
          </h1>
          <div className="mt-3 h-1 w-20 bg-[#7A0C0C] mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            The school is committed to maintaining the highest standards of
            confidentiality and data protection. All personal information
            related to students, parents, staff members, and visitors is handled
            with utmost care and responsibility.
          </p>

          <p>
            Any information collected through admission forms, registration
            processes, official documents, or the school website is used
            strictly for academic, administrative, communication, and
            institutional purposes only.
          </p>

          <p>
            The school ensures that appropriate security measures are in place
            to protect personal data from unauthorized access, alteration, or
            disclosure. Access to such information is limited to authorized
            personnel only and is used solely in the best interest of the
            institution and its stakeholders.
          </p>

          <p>
            Personal information is not shared, sold, or disclosed to any
            external individual, organization, or agency except when required
            under statutory provisions, legal obligations, or by an order of a
            competent authority.
          </p>

          <p>
            By interacting with the school or submitting personal information
            through any official channel, individuals consent to the collection
            and use of information as outlined in this privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
