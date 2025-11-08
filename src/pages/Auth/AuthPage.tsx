import { useEffect, useMemo, useState } from "react";
import "./AuthPage.css";

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [accountType, setAccountType] = useState<"freelancer" | "buyer">(() => {
    if (typeof window === "undefined") return "freelancer";
    return (localStorage.getItem("kmong-role") as "freelancer" | "buyer") ?? "freelancer";
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kmong-role", accountType);
    }
  }, [accountType]);

  const handleModeSwitch = (next: "login" | "signup") => {
    setMode(next);
    setError(null);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const role = accountType;

    if (role === "freelancer" && email.toLowerCase() === "freelancer@kmong.com" && password === "kmong123") {
      window.location.href = "/freelancer/dashboard";
      return;
    }
    if (role === "buyer" && email.toLowerCase() === "buyer@kmong.com" && password === "kmong123") {
      window.location.href = "/buyer-dashboard";
      return;
    }
    setError("Incorrect email or password. Try the preview credentials highlighted above.");
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Great! We’ve created a ${accountType} workspace preview for you. Use the login tab to continue.`);
    setMode("login");
  };

  const loginDefaults = useMemo(
    () => ({
      email: accountType === "freelancer" ? "freelancer@kmong.com" : "buyer@kmong.com",
      password: "kmong123",
    }),
    [accountType]
  );

  return (
    <div className="auth-page">
      <div className="auth-page__language" role="navigation" aria-label="Language selector">
        <button type="button" className="auth-lang is-active">EN</button>
        <button type="button" className="auth-lang">KR</button>
        <button type="button" className="auth-lang">JP</button>
        <button type="button" className="auth-lang">MM</button>
      </div>

      <div className="auth-grid">
        <aside className="auth-spotlight" aria-label="Freelancer spotlight">
          <div className="auth-spotlight__halo" aria-hidden="true" />
          <span className="auth-spotlight__chip">Freelancer spotlight</span>
          <h1>
            Work with global clients, <span>on your terms.</span>
          </h1>
          <p className="auth-spotlight__subtitle">
            Join thousands of independent designers, developers, and marketers growing their careers worldwide.
          </p>
          <article className="auth-testimonial" aria-label="Freelancer testimonial">
            <div className="auth-testimonial__avatar">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80" alt="Ava Kim avatar" />
            </div>
            <div className="auth-testimonial__body">
              <p className="auth-testimonial__name">Ava Kim</p>
              <p className="auth-testimonial__role">Product Designer · Singapore</p>
              <blockquote>
                “Kmong turned side gigs into a global practice. I collaborate with founders in 12 countries and hit payouts the same day.”
              </blockquote>
            </div>
          </article>
          <ul className="auth-spotlight__benefits">
            <li><span aria-hidden="true">✅</span> Verified clients</li>
            <li><span aria-hidden="true">⚡</span> Instant payouts</li>
            <li><span aria-hidden="true">💬</span> 24/7 global support</li>
          </ul>
          <div className="auth-spotlight__illustration" aria-hidden="true" />
        </aside>

        <main className="auth-panel" aria-label="Authentication">
          <div className="auth-panel__tabs" role="tablist" aria-label="Choose form">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={`auth-panel__tab ${mode === "login" ? "is-active" : ""}`}
              onClick={() => handleModeSwitch("login")}
            >
              Log in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              className={`auth-panel__tab ${mode === "signup" ? "is-active" : ""}`}
              onClick={() => handleModeSwitch("signup")}
            >
              Sign up
            </button>
          </div>

          <div className="auth-role-toggle" role="group" aria-label="Account role">
            <button
              type="button"
              className={`auth-role-toggle__chip ${accountType === "freelancer" ? "is-active" : ""}`}
              onClick={() => setAccountType("freelancer")}
            >
              Freelancer account
            </button>
            <button
              type="button"
              className={`auth-role-toggle__chip ${accountType === "buyer" ? "is-active" : ""}`}
              onClick={() => setAccountType("buyer")}
            >
              Buyer account
            </button>
          </div>

          {mode === "login" ? (
            <form className="auth-form" aria-label="Login form" onSubmit={handleLogin}>
              <label>
                Email
                <input name="email" type="email" placeholder="you@example.com" defaultValue={loginDefaults.email} required />
              </label>
              <label>
                Password
                <input name="password" type="password" placeholder="••••••••" defaultValue={loginDefaults.password} required />
              </label>
              <div className="auth-form__row">
                <label className="auth-checkbox">
                  <input type="checkbox" defaultChecked />
                  Remember me
                </label>
                <button type="button" className="auth-link">Forgot password?</button>
              </div>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-primary" type="submit">Login to Dashboard</button>
              <p className="auth-hint">
                Freelancer preview · <strong>freelancer@kmong.com / kmong123</strong>
                <br />Buyer preview · <strong>buyer@kmong.com / kmong123</strong>
              </p>
              <p className="auth-secondary">New here? <button type="button" className="auth-link" onClick={() => handleModeSwitch("signup")}>Create an account</button></p>
            </form>
          ) : (
            <form className="auth-form" aria-label="Signup form" onSubmit={handleSignup}>
              <label>
                Full name
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Password
                <input name="password" type="password" placeholder="Minimum 8 characters" minLength={8} required />
              </label>
              <label className="auth-checkbox">
                <input type="checkbox" defaultChecked required />
                I agree to the Terms of Service &amp; Privacy Policy
              </label>
              <button className="auth-primary" type="submit">Create Account</button>
              <p className="auth-secondary">Already have an account? <button type="button" className="auth-link" onClick={() => handleModeSwitch("login")}>Log in</button></p>
            </form>
          )}

          <div className="auth-divider">
            <span />
            <p>or continue with</p>
            <span />
          </div>
          <div className="auth-social">
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>

          <div className="auth-benefits-mini" role="list">
            <span>🔒 Secure login</span>
            <span>⚙️ One account for both dashboards</span>
            <span>🌐 Global access</span>
          </div>
        </main>
      </div>
    </div>
  );
};
