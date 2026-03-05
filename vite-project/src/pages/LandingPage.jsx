/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChevronRight,
  Lock,
  Menu,
  X,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Banknote,
  Globe,
  Smartphone,
  Shield,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";

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
  }

  body { font-family: 'Open Sans', Arial, sans-serif; background: var(--chase-white); color: var(--chase-dark-text); }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--chase-white);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 18px;
    color: var(--chase-navy); text-decoration: none; letter-spacing: -0.01em;
  }
  .chase-octagon {
    width: 34px; height: 34px;
    background: var(--chase-blue);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .chase-octagon-inner {
    width: 22px; height: 22px;
    background: var(--chase-white);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a { color: var(--chase-dark-text); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s; }
  .nav-links a:hover { color: var(--chase-blue); }
  .nav-cta {
    background: var(--chase-cta-blue); color: var(--chase-white); font-weight: 600; font-size: 14px;
    padding: 10px 24px; border-radius: 4px; text-decoration: none;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--chase-hover-blue); }
  .hamburger { display: none; background: none; border: none; color: var(--chase-blue); cursor: pointer; padding: 4px; }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #002F6C 0%, #005EB8 60%, #0077CC 100%);
    min-height: 72vh;
    display: flex; align-items: center;
    position: relative; overflow: hidden;
    padding: 80px 32px;
  }
  .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
    color: var(--chase-white); font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 7px 16px; border-radius: 4px; margin-bottom: 28px;
  }
  .hero-badge span { width: 6px; height: 6px; background: #4FC3F7; border-radius: 50%; display: inline-block; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  .hero-title {
    font-family: 'Open Sans', sans-serif;
    font-size: clamp(38px, 5.5vw, 64px);
    font-weight: 800; color: var(--chase-white);
    line-height: 1.1; letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  .hero-subtitle { font-size: clamp(16px, 2vw, 19px); color: rgba(255,255,255,0.8); line-height: 1.65; max-width: 540px; margin-bottom: 40px; font-weight: 400; }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--chase-white); color: var(--chase-blue); font-weight: 700; font-size: 15px;
    padding: 14px 30px; border-radius: 4px; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  }
  .btn-primary:hover { background: #F0F4F8; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
  .btn-ghost {
    border: 2px solid rgba(255,255,255,0.4); color: var(--chase-white); font-weight: 600; font-size: 15px;
    padding: 13px 30px; border-radius: 4px; text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover { border-color: var(--chase-white); background: rgba(255,255,255,0.1); }

  .hero-stats-row {
    display: flex; gap: 48px; margin-top: 56px; padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.15);
  }
  .hero-stat-num { font-family: 'Open Sans', sans-serif; font-size: 32px; font-weight: 800; color: var(--chase-white); letter-spacing: -0.02em; }
  .hero-stat-num span { color: #4FC3F7; }
  .hero-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.55); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 4px; }

  /* MARQUEE */
  .marquee-bar { background: var(--chase-light-gray); overflow: hidden; height: 40px; display: flex; align-items: center; border-bottom: 1px solid #E0E0E0; }
  .marquee-track { display: flex; gap: 0; animation: marquee 30s linear infinite; white-space: nowrap; }
  .marquee-item { color: var(--chase-secondary-text); font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0 28px; }
  .marquee-dot { color: var(--chase-blue); opacity: 0.5; padding: 0 4px; font-size: 8px; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* PRODUCTS */
  .products { background: var(--chase-light-gray); padding: 96px 32px; }
  .products-inner { max-width: 1200px; margin: 0 auto; }
  .section-label { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--chase-blue); margin-bottom: 12px; }
  .section-title { font-family: 'Open Sans', sans-serif; font-size: clamp(30px, 4vw, 46px); font-weight: 800; color: var(--chase-dark-text); line-height: 1.15; margin-bottom: 14px; }
  .section-sub { font-size: 16px; color: var(--chase-secondary-text); max-width: 480px; line-height: 1.65; font-weight: 400; margin-bottom: 48px; }

  .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .product-card {
    background: var(--chase-white); padding: 36px 32px;
    border: 1px solid #E0E0E0; border-radius: 8px;
    transition: box-shadow 0.25s, transform 0.25s;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .product-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); transform: translateY(-3px); }
  .product-icon-wrap {
    width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; background: #E8F1FB;
  }
  .product-title { font-family: 'Open Sans', sans-serif; font-size: 19px; font-weight: 700; color: var(--chase-dark-text); margin-bottom: 8px; }
  .product-desc { font-size: 14px; color: var(--chase-secondary-text); line-height: 1.65; margin-bottom: 20px; font-weight: 400; }
  .product-link { font-size: 14px; font-weight: 700; color: var(--chase-cta-blue); display: flex; align-items: center; gap: 4px; transition: gap 0.2s; }
  .product-card:hover .product-link { gap: 8px; }

  /* SECURITY */
  .security { background: var(--chase-white); padding: 96px 32px; }
  .security-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .security-label { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--chase-blue); margin-bottom: 12px; }
  .security-title { font-family: 'Open Sans', sans-serif; font-size: clamp(28px, 3.5vw, 42px); color: var(--chase-dark-text); font-weight: 800; line-height: 1.15; margin-bottom: 16px; }
  .security-sub { font-size: 16px; color: var(--chase-secondary-text); line-height: 1.65; font-weight: 400; margin-bottom: 40px; }
  .security-list { display: flex; flex-direction: column; gap: 22px; }
  .security-item { display: flex; gap: 14px; align-items: flex-start; }
  .security-check {
    width: 24px; height: 24px; border-radius: 50%;
    background: #E8F1FB; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
  }
  .security-item-title { font-size: 15px; font-weight: 700; color: var(--chase-dark-text); margin-bottom: 3px; }
  .security-item-desc { font-size: 14px; color: var(--chase-secondary-text); line-height: 1.6; font-weight: 400; }

  .security-card {
    background: var(--chase-light-gray); border: 1px solid #E0E0E0;
    border-radius: 12px; padding: 44px;
    position: relative; overflow: hidden;
  }
  .security-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--chase-blue), #4FC3F7);
  }
  .security-card-shield { margin-bottom: 20px; color: var(--chase-blue); opacity: 0.2; }
  .security-card-title { font-family: 'Open Sans', sans-serif; font-size: 24px; color: var(--chase-dark-text); font-weight: 800; margin-bottom: 12px; }
  .security-card-desc { font-size: 14px; color: var(--chase-secondary-text); line-height: 1.7; font-weight: 400; margin-bottom: 24px; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag { font-size: 12px; font-weight: 600; letter-spacing: 0.03em; background: #E8F1FB; border: 1px solid #C5D9F0; color: var(--chase-blue); padding: 6px 14px; border-radius: 4px; }

  /* CTA */
  .cta-section { background: linear-gradient(135deg, #002F6C 0%, #005EB8 100%); padding: 96px 32px; }
  .cta-inner { max-width: 680px; margin: 0 auto; text-align: center; }
  .cta-title { font-family: 'Open Sans', sans-serif; font-size: clamp(30px, 4vw, 48px); color: var(--chase-white); font-weight: 800; line-height: 1.15; margin-bottom: 16px; }
  .cta-sub { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.65; font-weight: 400; margin-bottom: 36px; }

  /* FOOTER */
  footer { background: #1A1A1A; color: rgba(255,255,255,0.4); }
  .footer-inner { max-width: 1200px; margin: 0 auto; padding: 56px 32px 28px; }
  .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 44px; }
  .footer-brand { font-family: 'Open Sans', sans-serif; font-weight: 800; font-size: 18px; color: var(--chase-white); margin-bottom: 12px; letter-spacing: -0.01em; }
  .footer-brand-desc { font-size: 13px; line-height: 1.65; }
  .footer-heading { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 16px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a { color: rgba(255,255,255,0.4); font-size: 13.5px; text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--chase-white); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
  .footer-lock { display: flex; align-items: center; gap: 6px; }

  /* MOBILE */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .hamburger { display: block; }
    .hero { min-height: auto; padding: 56px 20px; }
    .hero-stats-row { gap: 24px; flex-wrap: wrap; }
    .products-grid { grid-template-columns: 1fr 1fr; }
    .security-inner { grid-template-columns: 1fr; gap: 48px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
    .products { padding: 64px 20px; }
    .security { padding: 64px 20px; }
    .cta-section { padding: 64px 20px; }
  }
  @media (max-width: 600px) {
    .products-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .nav-inner { padding: 0 20px; }
    .product-card { padding: 28px 24px; }
    .hero-stats-row { padding-top: 28px; margin-top: 36px; }
  }
  .mobile-menu {
    position: fixed; inset: 0; z-index: 200;
    background: var(--chase-white);
    display: flex; flex-direction: column;
    padding: 24px;
  }
  .mobile-menu-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; }
  .mobile-menu-links { display: flex; flex-direction: column; gap: 4px; }
  .mobile-menu-links a { font-family: 'Open Sans', sans-serif; font-size: 24px; font-weight: 700; color: var(--chase-dark-text); text-decoration: none; padding: 12px 0; border-bottom: 1px solid #E0E0E0; transition: color 0.2s; }
  .mobile-menu-links a:hover { color: var(--chase-blue); }
  .mobile-menu-cta { margin-top: 32px; }
`;

const products = [
  {
    icon: CreditCard,
    title: "Checking",
    desc: "No monthly fees, 16,000+ ATMs, and seamless mobile deposits at your fingertips.",
    color: "#005EB8",
  },
  {
    icon: PiggyBank,
    title: "Savings",
    desc: "Competitive APY rates with intelligent automated savings tools built in.",
    color: "#005EB8",
  },
  {
    icon: TrendingUp,
    title: "Investments",
    desc: "Stocks, bonds, ETFs, and expertly managed portfolios from $1.",
    color: "#005EB8",
  },
  {
    icon: Banknote,
    title: "Mortgage",
    desc: "Competitive rates for purchase, refinance, or home equity lending.",
    color: "#005EB8",
  },
  {
    icon: Globe,
    title: "International",
    desc: "Global wire transfers with real-time exchange rates and zero hidden fees.",
    color: "#005EB8",
  },
  {
    icon: Smartphone,
    title: "Mobile Banking",
    desc: "Full-service banking from your phone — deposits, payments, and Zelle.",
    color: "#005EB8",
  },
];

const securityItems = [
  {
    t: "FDIC Insured",
    d: "Deposits protected up to $250,000 per depositor, per category.",
  },
  {
    t: "24/7 Fraud Monitoring",
    d: "AI-powered surveillance with instant alerts and zero liability.",
  },
  {
    t: "Biometric Authentication",
    d: "Multi-factor and biometric sign-in keeps your account yours alone.",
  },
  {
    t: "Real-Time Alerts",
    d: "Instant push notifications for every transaction and account change.",
  },
];

const marqueeItems = [
  "Private Banking",
  "Wealth Management",
  "Investment Solutions",
  "Global Markets",
  "Retirement Planning",
  "Estate Planning",
  "Tax Advisory",
  "Institutional Services",
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo">
            <div className="chase-octagon">
              <div className="chase-octagon-inner" />
            </div>
            JPMorgan Chase
          </Link>
          <ul className="nav-links">
            {["Personal", "Wealth Management", "Business", "About"].map((x) => (
              <li key={x}>
                <a href="#">{x}</a>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link to="/login" className="nav-cta">
              Sign In
            </Link>
            <button className="hamburger" onClick={() => setMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <span className="logo" style={{ color: "#002F6C" }}>
              <div className="chase-octagon">
                <div className="chase-octagon-inner" />
              </div>
              JPMorgan Chase
            </span>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#676C6F",
                cursor: "pointer",
              }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={26} />
            </button>
          </div>
          <div className="mobile-menu-links">
            {["Personal", "Wealth Management", "Business", "About"].map((x) => (
              <a key={x} href="#" onClick={() => setMenuOpen(false)}>
                {x}
              </a>
            ))}
          </div>
          <div className="mobile-menu-cta">
            <Link
              to="/login"
              className="nav-cta"
              style={{ display: "inline-flex", padding: "12px 28px", fontSize: 15 }}
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span />
            Over 225 Years of Financial Excellence
          </div>
          <h1 className="hero-title">
            Banking that puts
            <br />
            you first.
          </h1>
          <p className="hero-subtitle">
            World-class banking, investment solutions, and wealth management —
            crafted for those who demand more from their financial institution.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn-primary">
              Access Your Account <ArrowRight size={15} />
            </Link>
            <a href="#products" className="btn-ghost">
              Explore Services
            </a>
          </div>
          <div className="hero-stats-row">
            {[
              { v: "$3.9", s: "T", l: "Assets Under Management" },
              { v: "100", s: "+", l: "Countries Served" },
              { v: "310", s: "K+", l: "Employees Worldwide" },
              { v: "225", s: "+", l: "Years of Heritage" },
            ].map(({ v, s, l }) => (
              <div key={l}>
                <div className="hero-stat-num">
                  {v}
                  <span>{s}</span>
                </div>
                <div className="hero-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="products" className="products">
        <div className="products-inner">
          <div className="section-label">Our Services</div>
          <h2 className="section-title">
            Financial solutions
            <br />
            for every ambition.
          </h2>
          <p className="section-sub">
            From everyday banking to sophisticated wealth management — services
            tailored precisely to you.
          </p>
          <div className="products-grid">
            {products.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="product-card">
                <div className="product-icon-wrap">
                  <Icon size={22} style={{ color }} />
                </div>
                <div className="product-title">{title}</div>
                <p className="product-desc">{desc}</p>
                <div className="product-link">
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="security">
        <div className="security-inner">
          <div>
            <div className="security-label">Security & Trust</div>
            <h2 className="security-title">
              Your security is
              <br />
              our foundation.
            </h2>
            <p className="security-sub">
              We employ the highest standards of encryption, fraud detection,
              and identity protection to keep every account secure.
            </p>
            <div className="security-list">
              {securityItems.map(({ t, d }) => (
                <div key={t} className="security-item">
                  <div className="security-check">
                    <CheckCircle2 size={14} color="#005EB8" />
                  </div>
                  <div>
                    <div className="security-item-title">{t}</div>
                    <div className="security-item-desc">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="security-card">
            <div className="security-card-shield">
              <Shield size={56} />
            </div>
            <div className="security-card-title">
              Zero Liability
              <br />
              Protection
            </div>
            <p className="security-card-desc">
              You will never be held responsible for unauthorized transactions.
              Our 24/7 monitoring and instant alert system ensures your peace of
              mind around the clock.
            </p>
            <div className="tags">
              {[
                "256-bit SSL",
                "Biometric Login",
                "FDIC Insured",
                "Zero Liability",
              ].map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">
            Ready to take control
            <br />
            of your future?
          </h2>
          <p className="cta-sub">
            Sign in to manage your accounts, investments, and long-term
            financial goals — all from one secure platform.
          </p>
          <Link
            to="/login"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            Sign In to Your Account <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">JPMorgan Chase</div>
              <p className="footer-brand-desc">
                JPMorgan Chase & Co.
                <br />
                Member FDIC · Equal Housing Lender.
                <br />© 2026 JPMorgan Chase & Co.
              </p>
            </div>
            {[
              {
                h: "Products",
                i: [
                  "Checking",
                  "Savings",
                  "Credit Cards",
                  "Investments",
                  "Mortgage",
                ],
              },
              {
                h: "Support",
                i: [
                  "Help Center",
                  "Security",
                  "Privacy",
                  "Terms",
                  "Accessibility",
                ],
              },
              {
                h: "Company",
                i: [
                  "About Us",
                  "Careers",
                  "Investor Relations",
                  "Media Center",
                ],
              },
            ].map(({ h, i }) => (
              <div key={h}>
                <div className="footer-heading">{h}</div>
                <ul className="footer-links">
                  {i.map((x) => (
                    <li key={x}>
                      <a href="#">{x}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span className="footer-lock">
              <Lock size={11} /> FDIC Insured · Equal Housing Lender · Member
              SIPC
            </span>
            <span>© 2026 JPMorgan Chase & Co. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
