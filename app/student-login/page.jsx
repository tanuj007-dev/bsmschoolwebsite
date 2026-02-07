"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./StudentLogin.module.css";

export default function StudentLogin() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!admissionNo || !dob) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/student-login/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admissionNo, dob }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        setSuccess("Login successful 🎉");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Image src="/bsm_logo-removebg-preview.png" alt="BSM Public School" width={90} height={90} />
        </div>

        <h2 className={styles.title}>Student Login</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <span className={styles.bar}></span>
            <input
              className={styles.input}
              type="text"
              placeholder="Admission Number"
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.bar}></span>
            <input
              className={styles.input}
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button className={styles.loginButton} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
