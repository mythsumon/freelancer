import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [, setMobileOpen] = useState(false);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0, 153, 255, 0.1)",
      padding: "16px 0"
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: "1.25rem", color: "#0099ff" }}>
          kmong
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }} aria-label="Primary">
          <Link to="/categories" style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}>Categories</Link>
          <Link to="/services" style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}>Services</Link>
          <Link to="/for-freelancers" style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}>For Freelancers</Link>
          <Link to="/freelancers" style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}>Featured Talent</Link>
          <Link to="/pricing" style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}>Pricing</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid #eaf2f7",
              borderRadius: "999px",
              padding: "8px 16px",
              color: "#0099ff",
              cursor: "pointer"
            }}
            aria-label="Select language"
          >
            EN ▼
          </button>
          <Link
            to="/login"
            style={{
              background: "transparent",
              border: "1px solid #eaf2f7",
              borderRadius: "999px",
              padding: "8px 16px",
              color: "#0099ff",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              background: "#0099ff",
              border: "none",
              borderRadius: "999px",
              padding: "8px 24px",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Sign Up
          </Link>
          <button
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "none"
            }}
            aria-label="Open mobile navigation"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};