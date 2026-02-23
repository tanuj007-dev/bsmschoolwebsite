"use client";

import React from "react";
import LazySection from "../Components/LazySection";

export default function ContactPage() {

  return (
    <main className="contact-page-root">
      {/* ── Hero grid: form + map ── */}
      <section className="contact-hero">
        {/* Left panel – contact details */}
        <div className="contact-left">
          <h1 className="contact-heading text-red-[#7A0C0C]">Contact us</h1>
          <div className="contact-heading-bar" />
          <p className="contact-subtext">Reach out to us for any inquiry</p>

          <div className="cd-list">
            {/* Phone */}
            <div className="cd-item">
              <div className="cd-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <h3 className="cd-label">Phone</h3>
                <p className="cd-text">
                  <strong>Junior:</strong> +91 99712 31386, +91 73030 61386
                </p>
                <p className="cd-text">
                  <strong>Senior:</strong> +91 99999 99999
                </p>
              </div>
            </div>

            {/* E-mail */}
            <div className="cd-item">
              <div className="cd-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <div>
                <h3 className="cd-label">E-mail</h3>
                <a href="mailto:bsmpublicschool.karala@gmail.com" className="cd-text cd-link">
                  bsmpublicschool.karala@gmail.com
                </a>
                <a href="mailto:info@bsmschool.in" className="cd-text cd-link">
                  info@bsmschool.in
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="cd-item">
              <div className="cd-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418-4.418-7-7.582-7-11A7 7 0 1 1 19 10c0 3.418-2.582 6.582-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div>
                <h3 className="cd-label">Address</h3>
                <p className="cd-text">BSM Public School, Karala, Delhi – 110081</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: map with blue accent block */}
        <div className="contact-right">
          <div className="contact-map-accent" aria-hidden="true" />
          <LazySection minHeight="100%" className="contact-map-wrapper">
            <iframe
              title="BSM Public School Location"
              src="https://www.google.com/maps?q=BSM%20Public%20School%20Karala%20Delhi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contact-map-iframe"
            />
          </LazySection>
        </div>
      </section>

      {/* ── Info bar at bottom ── */}


      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Root ── */
        .contact-page-root {
          min-height: 100vh;
          background: #fafafa;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          padding: 48px 0 0;
        }

        /* ── Hero ── */
        .contact-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 56px;
          align-items: start;
        }

        /* ── Left ── */
        .contact-left {
          padding-right: 48px;
        }

        .contact-heading {
          font-size: 2rem;
          font-weight: 700;
          color: #111;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }

        .contact-heading-bar {
          width: 40px;
          height: 3px;
           
          border-radius: 2px;
          margin-bottom: 14px;
        }

        .contact-subtext {
          font-size: 0.95rem;
          color: #666;
          margin: 0 0 28px;
        }


        /* Contact detail list */
        .cd-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
          margin-top: 8px;
        }

        .cd-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .cd-icon-wrap {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          color: #7A0C0C;
          margin-top: 2px;
        }

        .cd-icon-wrap svg {
          width: 100%;
          height: 100%;
        }

        .cd-label {
          font-size: 1rem;
          font-weight: 700;
          color: #7A0C0C;
          font-family: Georgia, serif;
          margin: 0 0 6px;
        }

        .cd-text {
          display: block;
          font-size: 0.88rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .cd-link {
          text-decoration: none;
          transition: color 0.2s;
        }

        .cd-link:hover {
          color: #7A0C0C;
        }



        /* ── Right (map) ── */
        .contact-right {
          position: relative;
          height: 420px;
        }

        .contact-map-accent {
          position: absolute;
          top: -18px;
          right: -18px;
          width: 120px;
          height: 160px;
          
          z-index: 0;
          border-radius: 2px;
        }

        .contact-map-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: 2px;
          overflow: hidden;
        }

        .contact-map-iframe {
          width: 100%;
          height: 100%;
          display: block;
          border: 0;
        }

        /* ── Info bar ── */
        .contact-info-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          border-top: 1px solid #e5e7eb;
          background: #fff;
          padding: 32px 24px;
          max-width: 1100px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .cib-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          flex: 1;
          min-width: 220px;
          padding: 0 32px;
        }

        .cib-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        
          stroke-width: 1.4;
        }

        .cib-label {
          display: block;
          font-weight: 700;
          font-size: 0.95rem;
          color: #111;
          margin-bottom: 3px;
        }

        .cib-value {
          display: block;
          font-size: 0.82rem;
          color: #6b7280;
          line-height: 1.5;
        }

        .cib-link {
          text-decoration: none;
          transition: color 0.2s;
        }

        .cib-link:hover {
        
        }

        .cib-divider {
          width: 1px;
          height: 56px;
          background: #e5e7eb;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .contact-hero {
            grid-template-columns: 1fr;
            padding-bottom: 40px;
          }

          .contact-left {
            padding-right: 0;
            margin-bottom: 40px;
          }

          .contact-right {
            height: 300px;
          }

          .contact-map-accent {
            display: none;
          }

          .contact-info-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .cib-item {
            padding: 0 8px;
          }

          .cib-divider {
            width: 100%;
            height: 1px;
          }
        }

        @media (max-width: 480px) {
          .contact-page-root {
            padding-top: 32px;
          }

          .contact-hero {
            padding: 0 16px 32px;
          }

          .contact-heading {
            font-size: 1.5rem;
          }

          .contact-info-bar {
            padding: 24px 16px;
          }
        }
      `}</style>
    </main>
  );
}
