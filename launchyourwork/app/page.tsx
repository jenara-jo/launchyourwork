"use client";
import { useState, useEffect, type CSSProperties } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap";

export default function LaunchYourWorkLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_URL;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const handleSubmit = (e?: { preventDefault(): void }) => {
    if (e) e.preventDefault();
    if (!email.includes("@")) return;
    // In production, replace this with a Kit form submission:
    // fetch('https://app.kit.com/forms/YOUR_FORM_ID/subscriptions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email_address: email })
    // })
    setSubmitted(true);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        ::selection { background: #e85d04; color: #fff; }
        input::placeholder { color: #6a6560; }
        input:focus { outline: none; border-bottom-color: #e85d04 !important; }
        button:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(232, 93, 4, 0.3); }
        @media (max-width: 600px) {
          .headline { font-size: 32px !important; line-height: 1.1 !important; }
        }
      `}</style>

      {/* Accent stripe */}
      <div style={styles.stripe} />

      {/* Full-page centered content */}
      <div
        style={{
          ...styles.container,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Logo */}
        <div
          style={{
            ...styles.logoWrap,
            animation: loaded ? "fadeUp 0.7s ease both" : "none",
          }}
        >
          <div style={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="#2a2a42" />
              <path
                d="M24 36 L24 16 M16 22 L24 14 L32 22"
                stroke="#e85d04"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={styles.logoText}>
            <span style={styles.logoMain}>launch your </span>
            <span style={styles.logoAccent}>work</span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="headline"
          style={{
            ...styles.headline,
            animation: loaded ? "fadeUp 0.7s ease 0.1s both" : "none",
          }}
        >
          A free AI prompt + framework for talking about your job on LinkedIn
          without getting in trouble.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            ...styles.subheadline,
            animation: loaded ? "fadeUp 0.7s ease 0.2s both" : "none",
          }}
        >
          For people in tech who know visibility matters but aren&apos;t sure
          what&apos;s safe to share.
        </p>

        {/* Email capture */}
        {!submitted ? (
          <div
            style={{
              ...styles.captureWrap,
              animation: loaded ? "fadeUp 0.7s ease 0.3s both" : "none",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="your email"
              style={styles.input}
            />
            <button
              onClick={handleSubmit}
              style={{
                ...styles.button,
                opacity: email.includes("@") ? 1 : 0.4,
                cursor: email.includes("@") ? "pointer" : "not-allowed",
              }}
            >
              Get the free framework
            </button>
          </div>
        ) : (
          <div
            style={{
              ...styles.successWrap,
              animation: "fadeUp 0.4s ease both",
            }}
          >
            <div style={styles.successCheck}>✓</div>
            <div>
              <div style={styles.successTitle}>Check your inbox.</div>
              <div style={styles.successSub}>The framework is on its way.</div>
            </div>
          </div>
        )}

        {/* Privacy */}
        <p
          style={{
            ...styles.privacy,
            animation: loaded ? "fadeUp 0.7s ease 0.4s both" : "none",
          }}
        >
          No spam. Just the framework.
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerText}>
          © 2026 Launch Your Work. All rights reserved.
        </span>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#FAFAF7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontFamily: "'DM Sans', sans-serif",
    overflow: "hidden",
  },
  stripe: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "#e85d04",
    zIndex: 100,
  },
  container: {
    maxWidth: "580px",
    width: "100%",
    padding: "40px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  // Logo
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "48px",
  },
  logoIcon: {
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "22px",
    letterSpacing: "-0.01em",
  },
  logoMain: {
    color: "#1a1a2e",
  },
  logoAccent: {
    color: "#e85d04",
    fontStyle: "italic",
  },

  // Headline
  headline: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "clamp(34px, 6vw, 48px)",
    fontWeight: 400,
    lineHeight: 1.08,
    color: "#1a1a2e",
    letterSpacing: "-0.02em",
    marginBottom: "20px",
    maxWidth: "540px",
  },

  // Subheadline
  subheadline: {
    fontSize: "17px",
    lineHeight: 1.5,
    color: "#6a6560",
    marginBottom: "32px",
    maxWidth: "460px",
  },

  // Divider
  divider: {
    width: "50px",
    height: "2.5px",
    background: "#1a1a2e",
    marginBottom: "32px",
  },

  // Capture
  captureWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "16px",
  },
  input: {
    border: "none",
    borderBottom: "2px solid #1a1a2e",
    background: "transparent",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "17px",
    padding: "14px 0",
    color: "#1a1a2e",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  },
  button: {
    background: "#d4540a",
    color: "#fff",
    border: "none",
    padding: "16px 36px",
    fontSize: "15px",
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.02em",
    alignSelf: "flex-start",
    transition: "all 0.2s ease",
  },

  // Success
  successWrap: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 24px",
    background: "rgba(232, 93, 4, 0.08)",
    border: "1px solid rgba(232, 93, 4, 0.2)",
    marginBottom: "16px",
    maxWidth: "400px",
    width: "100%",
    boxSizing: "border-box",
  },
  successCheck: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#e85d04",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "16px",
    flexShrink: 0,
  },
  successTitle: {
    fontWeight: 700,
    fontSize: "15px",
    color: "#1a1a2e",
  },
  successSub: {
    fontSize: "13px",
    color: "#6a6560",
    marginTop: "2px",
  },

  // Privacy
  privacy: {
    fontSize: "12px",
    color: "#b0aba3",
    letterSpacing: "0.02em",
  },

  // Footer
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "20px",
    background: "linear-gradient(transparent, #FAFAF7 40%)",
  },
  footerText: {
    fontSize: "11px",
    color: "#b0aba3",
    letterSpacing: "0.02em",
  },
  footerDot: {
    fontSize: "11px",
    color: "#d5d0c8",
  },
};
