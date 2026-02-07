"use client";

import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="w-full bg-[#F8F9FA] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-10 lg:p-14">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7A0C0C]">
            Terms & Conditions
          </h1>
          <div className="mt-3 h-1 w-24 bg-[#7A0C0C] mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            The information available on the school website is provided for
            general guidance and informational purposes only. While the school
            makes every reasonable effort to ensure that the content is accurate,
            complete, and up to date, it does not guarantee the absolute accuracy
            of all information at all times.
          </p>

          <p>
            The school reserves the right to modify, update, or remove any
            information, content, policies, or services displayed on the website
            without prior notice. Such changes may be made to reflect academic,
            administrative, or regulatory requirements.
          </p>

          <p>
            The use of this website does not create any legal or contractual
            relationship between the school and the user. All admissions,
            academic activities, and institutional decisions are governed by
            applicable school rules, guidelines, and regulatory frameworks.
          </p>

          <p>
            Users are expected to use the website responsibly and refrain from
            any activity that may disrupt its functionality, compromise security,
            or violate applicable laws and regulations.
          </p>

          <p>
            Continued access to and use of the school website shall be deemed as
            acceptance of these terms and conditions. If any user does not agree
            with the terms stated herein, they are advised to discontinue use of
            the website.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
