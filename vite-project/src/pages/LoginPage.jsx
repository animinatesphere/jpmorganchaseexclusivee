import { useState } from "react";
import { Eye, EyeOff, AlertCircle, ArrowRight, Lock, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const VALID_USERNAME = "Tmhendrickson38195";
const VALID_PASSWORD = "TomBecklove1";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --chase-blue: #005EB8;
    --chase-navy: #002F6C;
    --chase-white: #FFFFFF;
    --chase-light-gray: #F5F7F8;
    --chase-dark-text: #101820;
    --chase-secondary-text: #676C6F;
    --chase-cta-blue: #0060F0;
    --chase-hover-blue: #0A4386;
    --chase-border: #D6D6D6;
    --chase-red: #B3261E;
  }

  .login-root {
    font-family: 'Open Sans', Arial, sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--chase-navy);
  }

  /* LEFT PANEL */
  .login-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 56px 48px;
    overflow: hidden;
    background: linear-gradient(135deg, #002F6C 0%, #005EB8 60%, #0077CC 100%);
  }
  .login-left-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 20% 80%, rgba(79,195,247,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 70%);
  }
  .login-left-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .left-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px;
    color: var(--chase-white); text-decoration: none;
    position: relative; z-index: 1;
  }
  .chase-octagon {
    width: 32px; height: 32px;
    background: var(--chase-white);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .chase-octagon-inner {
    width: 20px; height: 20px;
    background: var(--chase-blue);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  }
  .left-content {
    position: relative; z-index: 1;
    max-width: 420px;
  }
  .left-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: var(--chase-white); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 28px;
  }
  .left-badge-dot { width: 6px; height: 6px; background: #4FC3F7; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
  .left-title {
    font-family: 'Open Sans', sans-serif;
    font-size: clamp(32px, 3.5vw, 48px);
    font-weight: 800;
    color: var(--chase-white);
    line-height: 1.12;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  .left-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    line-height: 1.7;
    font-weight: 400;
    margin-bottom: 44px;
  }
  .left-features { display: flex; flex-direction: column; gap: 16px; }
  .left-feature { display: flex; align-items: center; gap: 14px; }
  .left-feature-icon {
    width: 36px; height: 36px; border-radius: 6px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .left-feature-text { font-size: 13.5px; color: rgba(255,255,255,0.7); font-weight: 400; line-height: 1.5; }
  .left-feature-text strong { color: rgba(255,255,255,0.95); font-weight: 700; display: block; font-size: 13px; }
  .left-footer {
    position: relative; z-index: 1;
    font-size: 12px; color: rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 20px;
  }

  /* RIGHT PANEL */
  .login-right {
    background: var(--chase-white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 56px;
    position: relative;
  }
  .login-right::before {
    content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 0;
  }
  .login-card { width: 100%; max-width: 400px; }
  .login-card-label {
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--chase-blue); margin-bottom: 10px;
  }
  .login-card-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 28px; font-weight: 800; color: var(--chase-dark-text);
    line-height: 1.15; margin-bottom: 6px;
  }
  .login-card-sub { font-size: 14px; color: var(--chase-secondary-text); font-weight: 400; margin-bottom: 32px; line-height: 1.6; }

  /* FORM */
  .form-group { margin-bottom: 22px; }
  .form-label {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; font-weight: 600; color: var(--chase-dark-text);
    margin-bottom: 8px;
  }
  .form-label a { font-size: 13px; font-weight: 600; color: var(--chase-cta-blue); text-decoration: none; }
  .form-label a:hover { text-decoration: underline; }
  .form-input {
    width: 100%; height: 48px; padding: 0 16px;
    background: var(--chase-white); border: none; border-bottom: 2px solid var(--chase-border);
    font-family: 'Open Sans', sans-serif; font-size: 15px; color: var(--chase-dark-text);
    outline: none; transition: border-color 0.2s;
    border-radius: 0;
  }
  .form-input::placeholder { color: #ABABAB; }
  .form-input:focus { border-bottom-color: var(--chase-blue); }
  .form-input-wrap { position: relative; }
  .pw-toggle {
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: var(--chase-secondary-text);
    padding: 8px; display: flex; align-items: center;
    transition: color 0.2s;
  }
  .pw-toggle:hover { color: var(--chase-dark-text); }

  .remember-row { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; cursor: pointer; user-select: none; }
  .remember-box {
    width: 18px; height: 18px; border: 2px solid var(--chase-border); border-radius: 3px;
    background: var(--chase-white); display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s, background 0.2s; flex-shrink: 0;
  }
  .remember-box.checked { background: var(--chase-blue); border-color: var(--chase-blue); }
  .remember-check { color: var(--chase-white); font-size: 11px; font-weight: 700; }
  .remember-label { font-size: 14px; color: var(--chase-secondary-text); font-weight: 400; }

  .error-box {
    background: #FEF2F2; border: 1px solid rgba(179,38,30,0.2); border-left: 3px solid var(--chase-red);
    border-radius: 4px; padding: 12px 14px;
    display: flex; gap: 10px; align-items: flex-start; margin-bottom: 20px;
  }
  .error-text { font-size: 13px; color: var(--chase-red); line-height: 1.55; font-weight: 400; }

  .submit-btn {
    width: 100%; height: 50px;
    background: var(--chase-cta-blue); color: var(--chase-white);
    border: none; border-radius: 4px;
    font-family: 'Open Sans', sans-serif; font-size: 16px; font-weight: 700;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,96,240,0.2);
  }
  .submit-btn:hover:not(:disabled) { background: var(--chase-hover-blue); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,96,240,0.3); }
  .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .login-divider { border: none; border-top: 1px solid #E0E0E0; margin: 24px 0; }
  .login-links { display: flex; flex-direction: column; gap: 10px; text-align: center; }
  .login-links a { font-size: 14px; color: var(--chase-cta-blue); font-weight: 600; text-decoration: none; }
  .login-links a:hover { text-decoration: underline; }
  .login-links p { font-size: 14px; color: var(--chase-secondary-text); }
  .login-links p a { font-weight: 600; color: var(--chase-cta-blue); }

  .ssl-bar {
    margin-top: 20px;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-size: 11.5px; color: var(--chase-secondary-text); font-weight: 500;
  }
  .ssl-dot { width: 4px; height: 4px; background: var(--chase-secondary-text); border-radius: 50%; opacity: 0.3; }

  .right-home-link {
    position: absolute; top: 28px; right: 40px;
    font-size: 13px; color: var(--chase-cta-blue); font-weight: 600;
    text-decoration: none; display: flex; align-items: center; gap: 6px;
    transition: color 0.2s;
  }
  .right-home-link:hover { color: var(--chase-hover-blue); }

  /* MOBILE */
  @media (max-width: 768px) {
    .login-root { grid-template-columns: 1fr; }
    .login-left { display: none; }
    .login-right { padding: 40px 24px; min-height: 100vh; }
    .login-card { max-width: 100%; }
    .right-home-link { top: 20px; right: 20px; }
  }
`;

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) return setError("Please enter your username.");
    if (!password) return setError("Please enter your password.");
    if (
      username.trim().toLowerCase() !== VALID_USERNAME.toLowerCase() ||
      password !== VALID_PASSWORD
    ) {
      return setError(
        "The username or password you entered doesn't match our records. Please try again",
      );
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
      navigate("/dashboard");
    }, 1600);
  };

  return (
    <div className="login-root">
      <style>{style}</style>

      {/* LEFT */}
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="login-left-grid" />
        <Link to="/" className="left-logo">
          <div className="chase-octagon">
            <div className="chase-octagon-inner" />
          </div>
          JPMorgan Chase
        </Link>
        <div className="left-content">
          <div className="left-badge">
            <span className="left-badge-dot" />
            Secure Client Portal
          </div>
          <h1 className="left-title">
            Your wealth,
            <br />
            always within
            <br />
            reach.
          </h1>
          <p className="left-sub">
            Sign in to access your accounts, investments, and personalized
            financial tools — all secured to the highest standard.
          </p>
          <div className="left-features">
            {[
              {
                icon: "🔒",
                title: "Bank-grade security",
                desc: "256-bit SSL encryption on every session",
              },
              {
                icon: "📊",
                title: "Real-time portfolio",
                desc: "Live market data and account balances",
              },
              {
                icon: "⚡",
                title: "Instant transfers",
                desc: "Move funds across accounts in seconds",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="left-feature">
                <div className="left-feature-icon">{icon}</div>
                <div className="left-feature-text">
                  <strong>{title}</strong>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="left-footer">
          © 2026 JPMorgan Chase & Co. · FDIC Insured · Member SIPC · Equal
          Housing Lender
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <Link to="/" className="right-home-link">
          ← Back to home
        </Link>

        <div className="login-card">
          <div className="login-card-label">Client Access</div>
          <h2 className="login-card-title">Welcome back</h2>
          <p className="login-card-sub">
            Sign in to your JPMorgan Chase account to continue.
          </p>

          {error && (
            <div className="error-box">
              <AlertCircle
                size={15}
                color="#B3261E"
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              <p className="error-text">{error}</p>
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-group">
              <div className="form-label">Username</div>
              <input
                type="text"
                value={username}
                className="form-input"
                placeholder="Enter your username"
                autoComplete="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="form-group">
              <div className="form-label">
                Password
                <a href="#">Forgot password?</a>
              </div>
              <div className="form-input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  className="form-input"
                  style={{ paddingRight: 44 }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <label
              className="remember-row"
              onClick={() => setRemember(!remember)}
            >
              <div className={`remember-box ${remember ? "checked" : ""}`}>
                {remember && <span className="remember-check">✓</span>}
              </div>
              <span className="remember-label">Remember me on this device</span>
            </label>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <svg
                    className="spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <hr className="login-divider" />
          <div className="login-links">
            <a href="#">Forgot username or password?</a>
            <p>
              Not enrolled? <a href="#">Open an account</a>
            </p>
          </div>

          <div className="ssl-bar">
            <Lock size={11} />
            256-bit SSL Encrypted
            <span className="ssl-dot" />
            FDIC Insured
            <span className="ssl-dot" />
            Secure Access{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
