"use client";

import React from "react";

const ShippingAndRefundPolicy = () => {
  return (
    <section className="w-full bg-[#F8F9FA] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-10 lg:p-14">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7A0C0C]">
            Shipping & Refund Policy
          </h1>
          <div className="mt-3 h-1 w-28 bg-[#7A0C0C] mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          
          <p>
            This Shipping and Refund Policy outlines the terms governing payments,
            refunds, and delivery of any documents, services, or materials
            associated with the school. By making any payment through the school
            website or official channels, users agree to the terms stated below.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            Shipping / Delivery Policy
          </h2>

          <p>
            The school does not engage in the physical shipping of goods through
            its website. Any communication, receipts, confirmations, or academic
            documents generated after payment are typically delivered through
            digital means such as email, online portals, or in-person collection
            at the school premises.
          </p>

          <p>
            In cases where physical documents are required, the mode of delivery,
            timelines, and collection process will be communicated separately by
            the school administration. The school shall not be held responsible
            for delays caused due to external factors beyond its control.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            Refund Policy
          </h2>

          <p>
            All fees paid to the school are subject to the school’s official fee
            structure and refund guidelines. Fees once paid are generally
            non-refundable unless explicitly stated otherwise in writing by the
            school administration.
          </p>

          <p>
            Refund requests, if applicable, must be submitted in writing along
            with valid supporting reasons and documents. Each request will be
            reviewed on a case-by-case basis in accordance with school policies
            and applicable regulations.
          </p>

          <p>
            Approved refunds, if any, will be processed through the original mode
            of payment within a reasonable timeframe. The school shall not be
            responsible for delays caused by banking systems or third-party
            payment gateways.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">
            Policy Updates
          </h2>

          <p>
            The school reserves the right to modify or update this Shipping and
            Refund Policy at any time without prior notice. Users are encouraged
            to review this policy periodically to stay informed of any changes.
          </p>

          <p>
            Continued use of the school’s website or payment facilities shall be
            deemed as acceptance of the current Shipping and Refund Policy.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ShippingAndRefundPolicy;
