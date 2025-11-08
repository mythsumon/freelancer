export const Footer = () => {
  return (
    <footer style={{ 
      borderTop: "1px solid rgba(0, 153, 255, 0.12)", 
      backgroundColor: "#ffffff", 
      padding: "64px 0 32px" 
    }}>
      <div className="container">
        <div style={{ 
          display: "grid", 
          gap: "32px", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginBottom: "32px"
        }}>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "16px" }}>Marketplace</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
              <li style={{ color: "#707070", cursor: "pointer" }}>Categories</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Popular</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "16px" }}>Resources</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
              <li style={{ color: "#707070", cursor: "pointer" }}>Help Center</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Safety</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Guides</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "16px" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
              <li style={{ color: "#707070", cursor: "pointer" }}>About</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Careers</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Contact</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "16px" }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
              <li style={{ color: "#707070", cursor: "pointer" }}>Terms</li>
              <li style={{ color: "#707070", cursor: "pointer" }}>Privacy</li>
            </ul>
          </div>
        </div>
        <div style={{ 
          borderTop: "1px solid rgba(0, 153, 255, 0.12)", 
          paddingTop: "16px", 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "16px", 
          alignItems: "center", 
          justifyContent: "space-between",
          color: "#707070",
          fontSize: "0.9rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{ 
              background: "transparent", 
              border: "1px solid #eaf2f7", 
              borderRadius: "999px", 
              padding: "4px 12px", 
              color: "#0099ff", 
              cursor: "pointer" 
            }}>
              EN ▼
            </button>
            <div style={{ display: "flex", gap: "12px" }}>
              <span style={{ cursor: "pointer" }}>📘</span>
              <span style={{ cursor: "pointer" }}>🐦</span>
              <span style={{ cursor: "pointer" }}>📸</span>
            </div>
          </div>
          <div>© 2023 Kmong. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};