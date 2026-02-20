"use client";

import React from "react";

const TOC_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "shipping-delivery", label: "Shipping / Delivery" },
  { id: "refund-policy", label: "Refund Policy" },
  { id: "policy-updates", label: "Policy Updates" },
];

const ShippingAndRefundPolicy = () => {
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
              Shipping & Refund Policy
            </h1>
            <div className="mt-3 h-1 w-28 bg-[#7A0C0C] mx-auto rounded-full" />
          </div>

          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <div id="overview" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
              <p>
                This Shipping and Refund Policy outlines the terms governing payments,
                refunds, and delivery of any documents, services, or materials
                associated with the school. By making any payment through the school
                website or official channels, users agree to the terms stated below.
              </p>
            </div>

            <div id="shipping-delivery" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Shipping / Delivery Policy
              </h2>
              <p>
                The school does not engage in the physical shipping of goods through
                its website. Any communication, receipts, confirmations, or academic
                documents generated after payment are typically delivered through
                digital means such as email, online portals, or in-person collection
                at the school premises.
              </p>
              <p className="mt-4">
                In cases where physical documents are required, the mode of delivery,
                timelines, and collection process will be communicated separately by
                the school administration. The school shall not be held responsible
                for delays caused due to external factors beyond its control.
              </p>
            </div>

            <div id="refund-policy" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Refund Policy</h2>
              <p>
                All fees paid to the school are subject to the school's official fee
                structure and refund guidelines. Fees once paid are generally
                non-refundable unless explicitly stated otherwise in writing by the
                school administration.
              </p>
              <p className="mt-4">
                Refund requests, if applicable, must be submitted in writing along
                with valid supporting reasons and documents. Each request will be
                reviewed on a case-by-case basis in accordance with school policies
                and applicable regulations.
              </p>
              <p className="mt-4">
                Approved refunds, if any, will be processed through the original mode
                of payment within a reasonable timeframe. The school shall not be
                responsible for delays caused by banking systems or third-party
                payment gateways.
              </p>
            </div>

            <div id="policy-updates" className="scroll-mt-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Policy Updates</h2>
              <p>
                The school reserves the right to modify or update this Shipping and
                Refund Policy at any time without prior notice. Users are encouraged
                to review this policy periodically to stay informed of any changes.
              </p>
              <p className="mt-4">
                Continued use of the school's website or payment facilities shall be
                deemed as acceptance of the current Shipping and Refund Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingAndRefundPolicy;
