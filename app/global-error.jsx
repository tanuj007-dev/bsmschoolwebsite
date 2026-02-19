"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#111", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: 24, maxWidth: 400 }}>
            A client-side error occurred. Check the browser console for details.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ padding: "10px 20px", background: "#7A0C0C", color: "#fff", border: "none", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
