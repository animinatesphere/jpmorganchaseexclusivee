/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  User,
  ShieldAlert,
  AlertTriangle,
  Clock,
  CircleDollarSign,
  X,
  CheckCircle2,
  Search,
  Menu,
} from "lucide-react";

const ACCOUNTS = [
  {
    id: 1,
    type: "Savings",
    name: "TOTAL SAVINGS...0161",
    num: "...0161",
    bal: 206553.0,
    avail: 206553.0,
  },
  {
    id: 2,
    type: "Checking",
    name: "TOTAL CHECKING...7427",
    num: "...7427",
    bal: 1050447.0,
    avail: 1050447.0,
  },
  {
    id: 3,
    type: "Invest",
    name: "YOU INVEST...8701",
    num: "...8701",
    bal: 2543000.0,
    avail: 2543000.0,
  },
];

const TXS = [
  {
    id: 1,
    date: "02/28/2026",
    desc: "Estate Fund Transfer — Rilex-Hendrickson Estate",
    acct: "Investment ****8701",
    amt: 2543000.0,
    ref: "ETF-INV-0934870100",
    type: "ETF",
    note: "Release to Beneficiary & His Next-Of-Kin",
  },
  {
    id: 2,
    date: "02/28/2026",
    desc: "Estate Fund Transfer — Rilex-Hendrickson Estate",
    acct: "Checking ****7427",
    amt: 1050447.0,
    ref: "ETF-CHK-8919742700",
    type: "ETF",
    note: "Release to Beneficiary & His Next-Of-Kin",
  },
  {
    id: 3,
    date: "02/28/2026",
    desc: "Estate Fund Transfer — Rilex-Hendrickson Estate",
    acct: "Savings ****0161",
    amt: 206553.0,
    ref: "ETF-SAV-4760016100",
    type: "ETF",
    note: "Release to Beneficiary & His Next-Of-Kin",
  },
];

const fmt = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
const total = ACCOUNTS.reduce((s, a) => s + a.bal, 0);

const NAV_ITEMS = [
  "Overview",
  "Pay & Transfer",
  "Collect & Deposit",
  "Account Management",
  "Security",
];
const SUBNAV = ["Transactions", "Documents", "Rewards", "Statements"];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #005eb8; --blue-dark: #003f82; --blue-nav: #00529b; --blue-light: #e8f1fb;
    --green: #2e7d32; --red: #c62828;
    --white: #fff; --bg: #f4f5f7; --border: #d0d4da; --muted: #6b737d; --txt: #1a1a1a;
    --sidebar-w: 218px;
  }
  html,body { font-family: 'Open Sans', Arial, sans-serif; background: var(--bg); color: var(--txt); font-size: 13px; }

  /* HEADER */
  .hdr { background: var(--blue-dark); height: 44px; display: flex; align-items: center; padding: 0 18px; position: sticky; top: 0; z-index: 100; gap: 0; }
  .hdr-logo { font-size: 19px; font-weight: 700; color: #fff; margin-right: 28px; letter-spacing: -0.3px; white-space: nowrap; }
  .hdr-logo em { font-style: normal; font-weight: 300; color: rgba(255,255,255,0.8); }
  .hdr-nav { display: flex; flex: 1; }
  .hdr-nav-btn { color: rgba(255,255,255,0.8); font-size: 12.5px; font-weight: 600; padding: 0 14px; height: 44px; background: none; border: none; border-bottom: 3px solid transparent; margin-bottom: -0px; cursor: pointer; white-space: nowrap; font-family: inherit; transition: all .15s; }
  .hdr-nav-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .hdr-nav-btn.act { color: #fff; border-bottom-color: #fff; }
  .hdr-right { margin-left: auto; display: flex; align-items: center; gap: 6px; }
  .hdr-btn { color: rgba(255,255,255,0.82); font-size: 12px; font-weight: 500; padding: 5px 10px; border: 1px solid rgba(255,255,255,0.22); border-radius: 3px; background: none; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 5px; transition: all .15s; }
  .hdr-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .hamburger { display: none; background: none; border: none; color: #fff; cursor: pointer; padding: 4px; }

  /* SUBNAV */
  .subnav { background: #1976d2; height: 36px; display: flex; align-items: center; padding: 0 18px; border-bottom: 1px solid #1565c0; }
  .subnav-btn { color: rgba(255,255,255,0.78); font-size: 12px; font-weight: 600; padding: 0 14px; height: 36px; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-family: inherit; transition: all .15s; white-space: nowrap; }
  .subnav-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .subnav-btn.act { color: #fff; border-bottom-color: #fff; }

  /* LAYOUT */
  .layout { display: flex; min-height: calc(100vh - 80px); }

  /* SIDEBAR */
  .sidebar { width: var(--sidebar-w); flex-shrink: 0; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; }
  .sb-section-hdr { font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); padding: 10px 14px 6px; background: var(--bg); border-bottom: 1px solid var(--border); }
  .sb-acct { padding: 9px 14px; border-bottom: 1px solid #eaecef; cursor: pointer; transition: background .12s; border-left: 3px solid transparent; }
  .sb-acct:hover { background: var(--blue-light); }
  .sb-acct.act { background: var(--blue-light); border-left-color: var(--blue); padding-left: 11px; }
  .sb-acct-name { font-size: 11.5px; font-weight: 700; color: var(--blue); margin-bottom: 1px; }
  .sb-acct-num { font-size: 10.5px; color: var(--muted); margin-bottom: 4px; }
  .sb-bal-row { display: flex; justify-content: space-between; align-items: center; margin-top: 1px; }
  .sb-bal-lbl { font-size: 10.5px; color: var(--muted); }
  .sb-bal-val { font-size: 12px; font-weight: 700; color: var(--txt); }
  .sb-link { display: flex; align-items: center; gap: 6px; padding: 8px 14px; font-size: 12px; color: var(--blue); cursor: pointer; border-bottom: 1px solid #eaecef; background: none; border-left: none; border-right: none; border-top: none; width: 100%; text-align: left; font-family: inherit; transition: background .12s; }
  .sb-link:hover { background: var(--blue-light); text-decoration: underline; }
  .sb-total { padding: 10px 14px; background: var(--bg); border-top: 2px solid var(--border); margin-top: auto; }
  .sb-total-lbl { font-size: 10.5px; color: var(--muted); margin-bottom: 2px; }
  .sb-total-val { font-size: 16px; font-weight: 700; color: var(--txt); }

  /* MAIN */
  .main { flex: 1; overflow: hidden; }

  /* ACCOUNT CARDS STRIP */
  .accts-strip { display: flex; background: #fff; border-bottom: 1px solid var(--border); overflow-x: auto; }
  .asc { flex: 1; min-width: 150px; padding: 11px 14px; border-right: 1px solid var(--border); cursor: pointer; transition: background .12s; }
  .asc:last-child { border-right: none; }
  .asc:hover { background: var(--blue-light); }
  .asc-type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); margin-bottom: 2px; }
  .asc-name { font-size: 11.5px; color: var(--blue); font-weight: 600; margin-bottom: 1px; }
  .asc-num { font-size: 10.5px; color: var(--muted); margin-bottom: 5px; }
  .asc-bal-lbl { font-size: 10.5px; color: var(--muted); }
  .asc-bal-val { font-size: 13.5px; font-weight: 700; color: var(--txt); }

  /* ACCOUNT HEADER */
  .acct-hdr { background: #fff; border-bottom: 1px solid var(--border); padding: 11px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  .acct-hdr-title { font-size: 15px; font-weight: 700; color: var(--txt); }
  .acct-hdr-sub { font-size: 11.5px; color: var(--muted); margin-top: 1px; }
  .acct-hdr-btns { display: flex; gap: 7px; flex-wrap: wrap; }
  .action-btn { font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 3px; cursor: pointer; font-family: inherit; transition: all .15s; white-space: nowrap; }
  .action-btn.solid { background: var(--blue); color: #fff; border: none; }
  .action-btn.solid:hover { background: var(--blue-dark); }
  .action-btn.outline { background: #fff; color: var(--blue); border: 1px solid var(--blue); }
  .action-btn.outline:hover { background: var(--blue-light); }

  /* BALANCE STRIP */
  .bal-strip { display: flex; background: #fff; border-bottom: 1px solid var(--border); }
  .bal-cell { flex: 1; padding: 11px 18px; border-right: 1px solid var(--border); }
  .bal-cell:last-child { border-right: none; }
  .bal-lbl { font-size: 10.5px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 3px; }
  .bal-val { font-size: 17px; font-weight: 700; color: var(--txt); }
  .bal-val.green { color: var(--green); }
  .bal-val.gray { font-size: 14px; color: var(--muted); font-weight: 400; }
  .bal-sub { font-size: 10.5px; color: var(--muted); margin-top: 2px; }

  /* FILTER BAR */
  .filter-bar { background: var(--bg); border-bottom: 1px solid var(--border); padding: 8px 18px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .filter-lbl { font-size: 12px; font-weight: 700; color: var(--txt); }
  .filter-sel { border: 1px solid var(--border); border-radius: 3px; padding: 5px 9px; font-size: 12px; color: var(--txt); background: #fff; font-family: inherit; cursor: pointer; }
  .filter-btn { background: var(--blue); color: #fff; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 3px; border: none; cursor: pointer; font-family: inherit; }
  .search-wrap { display: flex; align-items: center; gap: 5px; border: 1px solid var(--border); border-radius: 3px; padding: 4px 9px; background: #fff; flex: 1; max-width: 200px; }
  .search-wrap input { border: none; outline: none; font-size: 12px; font-family: inherit; width: 100%; }

  /* TXN TABLE */
  .txn-box { background: #fff; }
  .txn-box-hdr { padding: 9px 18px; background: #dde4ed; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .txn-box-hdr-title { font-size: 12.5px; font-weight: 700; color: var(--txt); }
  .txn-box-hdr-count { font-size: 11.5px; color: var(--muted); }
  table.txn { width: 100%; border-collapse: collapse; }
  .txn th { font-size: 10.5px; font-weight: 700; color: var(--muted); padding: 8px 12px; background: #eef1f6; border-bottom: 2px solid var(--border); text-align: left; text-transform: uppercase; letter-spacing: .05em; white-space: nowrap; }
  .txn th.r { text-align: right; }
  .txn tr.txn-row { border-bottom: 1px solid #eaecef; transition: background .1s; }
  .txn tr.txn-row:hover { background: var(--blue-light); }
  .txn td { padding: 10px 12px; vertical-align: top; font-size: 12.5px; }
  .txn-date { color: var(--muted); white-space: nowrap; font-size: 12px; }
  .txn-desc-main { color: var(--blue); font-weight: 600; cursor: pointer; margin-bottom: 2px; }
  .txn-desc-main:hover { text-decoration: underline; }
  .txn-ref { font-size: 11px; color: var(--muted); font-family: monospace; }
  .txn-note { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .txn-badge { font-size: 10.5px; font-weight: 700; background: #e3f0ff; color: var(--blue); padding: 2px 7px; border-radius: 2px; letter-spacing: .04em; }
  .txn-amt { text-align: right; font-weight: 700; color: var(--green); font-size: 13px; white-space: nowrap; }
  .txn-status { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 700; color: var(--green); background: #eaf6ef; border: 1px solid #b7dfca; padding: 2px 8px; border-radius: 2px; white-space: nowrap; }
  .txn-total-bar { padding: 9px 12px; background: #eef1f6; border-top: 2px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .ttb-lbl { font-size: 12px; font-weight: 700; color: var(--txt); }
  .ttb-amt { font-size: 15px; font-weight: 700; color: var(--txt); }
  .txn-source-bar { padding: 9px 12px; background: #f0f4ff; border-top: 1px solid #ccd5f0; display: flex; gap: 10px; align-items: flex-start; }
  .tsb-title { font-size: 12px; font-weight: 700; color: #1a2a6c; }
  .tsb-sub { font-size: 11px; color: rgba(26,42,108,0.6); margin-top: 1px; }

  /* PROFILE DROPDOWN */
  .prof-drop { position: absolute; right: 0; top: calc(100% + 4px); width: 196px; background: #fff; border: 1px solid var(--border); border-radius: 3px; box-shadow: 0 4px 16px rgba(0,0,0,0.13); z-index: 200; }
  .prof-item { display: flex; align-items: center; gap: 9px; padding: 9px 14px; font-size: 13px; color: var(--txt); cursor: pointer; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
  .prof-item:hover { background: var(--blue-light); }
  .prof-item.red { color: var(--red); }
  .prof-item.red:hover { background: #fdecea; }
  .prof-div { border: none; border-top: 1px solid var(--border); }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; z-index: 500; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); }
  .modal-box { background: #fff; border-radius: 3px; width: 100%; max-width: 440px; box-shadow: 0 8px 40px rgba(0,0,0,0.2); overflow: hidden; }
  .modal-hdr { background: var(--blue); color: #fff; padding: 13px 18px; display: flex; align-items: center; justify-content: space-between; }
  .modal-hdr-title { font-size: 14.5px; font-weight: 700; }
  .modal-close { background: none; border: none; color: #fff; cursor: pointer; }
  .modal-body { padding: 22px; }
  .modal-icon-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .modal-icon-wrap { width: 42px; height: 42px; border-radius: 50%; background: #fff3e0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .modal-title { font-size: 14.5px; font-weight: 700; color: var(--txt); }
  .modal-sub { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .modal-info { background: var(--bg); border: 1px solid var(--border); border-radius: 3px; padding: 13px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 9px; }
  .modal-info-item { display: flex; gap: 9px; font-size: 12.5px; color: var(--muted); line-height: 1.5; align-items: flex-start; }
  .modal-btns { display: flex; gap: 9px; }
  .modal-btn { flex: 1; padding: 9px; border-radius: 3px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; font-family: inherit; }
  .modal-btn.p { background: var(--blue); color: #fff; }
  .modal-btn.p:hover { background: var(--blue-dark); }
  .modal-btn.s { background: #fff; color: var(--blue); border: 1px solid var(--blue); }
  .modal-btn.s:hover { background: var(--blue-light); }
  .modal-help { text-align: center; font-size: 12px; color: var(--muted); margin-top: 12px; }

  /* MOBILE DRAWER */
  .mobile-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 300; display: none; }
  .mobile-drawer-overlay.open { display: block; }
  .mobile-drawer { position: fixed; top: 0; left: 0; bottom: 0; width: 280px; background: #fff; z-index: 301; transform: translateX(-100%); transition: transform .25s ease; overflow-y: auto; box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
  .mobile-drawer.open { transform: translateX(0); }
  .mobile-drawer-hdr { background: var(--blue-dark); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
  .mobile-drawer-logo { font-size: 17px; font-weight: 700; color: #fff; }
  .mobile-drawer-logo em { font-style: normal; font-weight: 300; color: rgba(255,255,255,0.8); }
  .mobile-drawer-close { background: none; border: none; color: #fff; cursor: pointer; padding: 4px; }
  .mobile-drawer-nav { padding: 8px 0; border-bottom: 1px solid var(--border); }
  .mobile-drawer-nav-btn { display: flex; align-items: center; gap: 8px; width: 100%; padding: 11px 16px; font-size: 13.5px; font-weight: 600; color: var(--txt); background: none; border: none; cursor: pointer; font-family: inherit; text-align: left; }
  .mobile-drawer-nav-btn:hover, .mobile-drawer-nav-btn.act { background: var(--blue-light); color: var(--blue); }
  .mobile-drawer-section { padding: 6px 16px; font-size: 10.5px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; margin-top: 6px; }
  .mobile-drawer-acct { padding: 10px 16px; border-bottom: 1px solid #eaecef; cursor: pointer; }
  .mobile-drawer-acct:hover { background: var(--blue-light); }
  .mobile-drawer-acct-name { font-size: 12px; font-weight: 700; color: var(--blue); }
  .mobile-drawer-acct-bal { font-size: 12px; font-weight: 600; color: var(--txt); margin-top: 2px; }
  .mobile-drawer-logout { display: flex; align-items: center; gap: 8px; width: 100%; padding: 11px 16px; font-size: 13px; font-weight: 600; color: var(--red); background: none; border: none; border-top: 1px solid var(--border); cursor: pointer; font-family: inherit; margin-top: auto; }

  /* MOBILE ACCOUNT CARDS (shown on mobile) */
  .mobile-acct-cards { display: none; padding: 10px; gap: 8px; flex-direction: column; background: var(--bg); }
  .mobile-acct-card { background: #fff; border: 1px solid var(--border); border-radius: 4px; padding: 12px 14px; cursor: pointer; }
  .mobile-acct-card.act { border-left: 3px solid var(--blue); background: var(--blue-light); }
  .mobile-acct-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
  .mobile-acct-card-type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
  .mobile-acct-card-name { font-size: 12px; font-weight: 700; color: var(--blue); }
  .mobile-acct-card-bal { font-size: 15px; font-weight: 700; color: var(--txt); }
  .mobile-acct-card-avail { font-size: 11px; color: var(--green); font-weight: 600; margin-top: 2px; }

  /* MOBILE ACTION BUTTONS */
  .mobile-actions { display: none; padding: 8px 10px; gap: 6px; background: #fff; border-bottom: 1px solid var(--border); overflow-x: auto; }
  .mobile-actions .action-btn { font-size: 11px; padding: 7px 12px; flex-shrink: 0; }

  @media (max-width: 900px) {
    .hdr-nav, .subnav { display: none; }
    .hamburger { display: flex; }
    .sidebar { display: none; }
    .accts-strip { display: none; }
    .mobile-acct-cards { display: flex; }
    .mobile-actions { display: flex; }
    .acct-hdr { padding: 10px 12px; }
    .acct-hdr-btns { display: none; }
    .bal-strip { flex-wrap: wrap; }
    .bal-cell { min-width: 50%; border-bottom: 1px solid var(--border); padding: 10px 14px; }
    .filter-bar { padding: 7px 10px; }
    .search-wrap { max-width: 100%; }
    .hdr-right .hdr-btn:not(:last-of-type) { display: none; }
    .hdr-right { gap: 4px; }
    .hdr-btn { padding: 5px 8px; font-size: 11px; }
    .modal-box { max-width: calc(100% - 24px); margin: 12px; }
    .modal-btns { flex-direction: column; }
    .prof-drop { right: -8px; }

    /* table scroll */
    .txn-box { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    table.txn { min-width: 600px; }
  }

  @media (max-width: 600px) {
    .hdr { padding: 0 10px; height: 42px; }
    .hdr-logo { font-size: 16px; margin-right: 12px; }
    .hdr-right .hdr-btn { display: none; }
    .hamburger { display: flex; }

    .mobile-acct-cards { padding: 8px; gap: 6px; }
    .mobile-acct-card { padding: 10px 12px; }

    .acct-hdr { padding: 8px 10px; }
    .acct-hdr-title { font-size: 13px; }
    .acct-hdr-sub { font-size: 10.5px; }

    .bal-strip { flex-direction: column; }
    .bal-cell { min-width: 100%; padding: 9px 12px; border-right: none; }

    .filter-bar { flex-direction: column; align-items: stretch; gap: 6px; padding: 8px 10px; }
    .filter-lbl { display: none; }
    .search-wrap { max-width: 100%; }
    .filter-sel { width: 100%; }
    .filter-btn { width: 100%; padding: 8px; }

    .txn-box-hdr { flex-direction: column; gap: 2px; padding: 8px 10px; }
    .txn-box-hdr-count { font-size: 10.5px; }
    table.txn { min-width: 500px; font-size: 11.5px; }
    .txn td, .txn th { padding: 7px 8px; }
    .txn-total-bar { padding: 8px 10px; flex-direction: column; gap: 2px; align-items: flex-start; }
    .txn-source-bar { padding: 8px 10px; }
    .tsb-sub { font-size: 10.5px; }

    .modal-body { padding: 16px; }
    .modal-sub { font-size: 12.5px; }
  }
`;

export default function Dashboard({ onLogout }) {
  const [modal, setModal] = useState(null);
  const [activeAcct, setActiveAcct] = useState(0);
  const [prof, setProf] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div>
      <style>{style}</style>

      {/* HEADER */}
      <header className="hdr">
        <div className="hdr-logo">
          CHASE <em>connect</em>
        </div>
        <div className="hdr-nav">
          {NAV_ITEMS.map((n, i) => (
            <button key={n} className={`hdr-nav-btn ${i === 0 ? "act" : ""}`}>
              {n} {i < 3 && <ChevronDown size={11} />}
            </button>
          ))}
        </div>
        <div className="hdr-right">
          <button className="hdr-btn">
            <Bell size={12} /> Alerts
          </button>
          <div style={{ position: "relative" }}>
            <button className="hdr-btn" onClick={() => setProf(!prof)}>
              <User size={12} /> Tommy Hendrickson and Rebecca B. Hendrickson{" "}
              <ChevronDown size={11} />
            </button>
            {prof && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 150 }}
                  onClick={() => setProf(false)}
                />
                <div className="prof-drop">
                  <div
                    style={{
                      padding: "9px 14px 4px",
                      fontSize: 10.5,
                      color: "#888",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    Tommy Hendrickson and Rebecca B. Hendrickson
                  </div>
                  <button className="prof-item">
                    <User size={13} /> Profile & Settings
                  </button>
                  <button className="prof-item">
                    <Settings size={13} /> Account Settings
                  </button>
                  <hr className="prof-div" />
                  <button className="prof-item red" onClick={logout}>
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
          <button className="hdr-btn" onClick={logout}>
            <LogOut size={12} /> Sign out
          </button>
          <button className="hamburger" onClick={() => setDrawer(true)}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* SUBNAV */}
      <div className="subnav">
        {SUBNAV.map((s, i) => (
          <button key={s} className={`subnav-btn ${i === 0 ? "act" : ""}`}>
            {s}
          </button>
        ))}
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`mobile-drawer-overlay ${drawer ? "open" : ""}`}
        onClick={() => setDrawer(false)}
      />
      <div className={`mobile-drawer ${drawer ? "open" : ""}`}>
        <div className="mobile-drawer-hdr">
          <div className="mobile-drawer-logo">
            CHASE <em>connect</em>
          </div>
          <button
            className="mobile-drawer-close"
            onClick={() => setDrawer(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="mobile-drawer-nav">
          {NAV_ITEMS.map((n, i) => (
            <button
              key={n}
              className={`mobile-drawer-nav-btn ${i === 0 ? "act" : ""}`}
              onClick={() => setDrawer(false)}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mobile-drawer-section">Accounts</div>
        {ACCOUNTS.map((a, i) => (
          <div
            key={a.id}
            className="mobile-drawer-acct"
            onClick={() => {
              setActiveAcct(i);
              setDrawer(false);
            }}
          >
            <div className="mobile-drawer-acct-name">{a.name}</div>
            <div className="mobile-drawer-acct-bal">{fmt(a.bal)}</div>
          </div>
        ))}
        <button className="mobile-drawer-logout" onClick={logout}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-section-hdr">Accounts</div>
          {ACCOUNTS.map((a, i) => (
            <div
              key={a.id}
              className={`sb-acct ${activeAcct === i ? "act" : ""}`}
              onClick={() => setActiveAcct(i)}
            >
              <div className="sb-acct-name">{a.name}</div>
              <div className="sb-acct-num">{a.num}</div>
              <div className="sb-bal-row">
                <span className="sb-bal-lbl">Current balance</span>
                <span className="sb-bal-val">{fmt(a.bal)}</span>
              </div>
              <div className="sb-bal-row">
                <span className="sb-bal-lbl">Available balance</span>
                <span className="sb-bal-val" style={{ color: "#2e7d32" }}>
                  {fmt(a.avail)}
                </span>
              </div>
            </div>
          ))}
          <button className="sb-link">
            <ChevronRight size={11} /> See all accounts
          </button>
          <button className="sb-link">
            <ChevronRight size={11} /> Open new account
          </button>
          <div className="sb-total">
            <div className="sb-total-lbl">Total deposited balance</div>
            <div className="sb-total-val">{fmt(total)}</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* ACCOUNT CARDS */}
          <div className="accts-strip">
            {ACCOUNTS.map((a, i) => (
              <div key={a.id} className="asc" onClick={() => setActiveAcct(i)}>
                <div className="asc-type">{a.type}</div>
                <div className="asc-name">{a.name}</div>
                <div className="asc-num">{a.num}</div>
                <div className="asc-bal-lbl">Current balance</div>
                <div className="asc-bal-val">{fmt(a.bal)}</div>
              </div>
            ))}
          </div>

          {/* MOBILE ACCOUNT CARDS */}
          <div className="mobile-acct-cards">
            {ACCOUNTS.map((a, i) => (
              <div
                key={a.id}
                className={`mobile-acct-card ${activeAcct === i ? "act" : ""}`}
                onClick={() => setActiveAcct(i)}
              >
                <div className="mobile-acct-card-top">
                  <div>
                    <div className="mobile-acct-card-type">{a.type}</div>
                    <div className="mobile-acct-card-name">{a.name}</div>
                  </div>
                  <div className="mobile-acct-card-bal">{fmt(a.bal)}</div>
                </div>
                <div className="mobile-acct-card-avail">
                  Available: {fmt(a.avail)}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="mobile-actions">
            <button
              className="action-btn outline"
              onClick={() => setModal("transfer")}
            >
              Transfer
            </button>
            <button
              className="action-btn outline"
              onClick={() => setModal("pay")}
            >
              Pay Bills
            </button>
            <button
              className="action-btn solid"
              onClick={() => setModal("withdraw")}
            >
              Withdraw
            </button>
          </div>

          {/* ACCOUNT HEADER */}
          <div className="acct-hdr">
            <div>
              <div className="acct-hdr-title">{ACCOUNTS[activeAcct].name}</div>
              <div className="acct-hdr-sub">
                Account number: {ACCOUNTS[activeAcct].num} &nbsp;·&nbsp; As of
                03/04/2026 9:32 AM ET
              </div>
            </div>
            <div className="acct-hdr-btns">
              <button
                className="action-btn outline"
                onClick={() => setModal("transfer")}
              >
                Transfer Money
              </button>
              <button
                className="action-btn outline"
                onClick={() => setModal("pay")}
              >
                Pay Bills
              </button>
              <button
                className="action-btn solid"
                onClick={() => setModal("withdraw")}
              >
                Withdraw / Move Money
              </button>
            </div>
          </div>

          {/* BALANCE STRIP */}
          <div className="bal-strip">
            <div className="bal-cell">
              <div className="bal-lbl">Current Balance</div>
              <div className="bal-val">{fmt(total)}</div>
            </div>
            <div className="bal-cell">
              <div className="bal-lbl">Available Balance</div>
              <div className="bal-val green">{fmt(total)}</div>
              <div className="bal-sub">Includes pending transactions</div>
            </div>
            <div className="bal-cell">
              <div className="bal-lbl">Next Payment Due</div>
              <div className="bal-val gray">—</div>
              <div className="bal-sub">No payment scheduled</div>
            </div>
            <div className="bal-cell">
              <div className="bal-lbl">Amount Due</div>
              <div className="bal-val gray">$0.00</div>
              <div className="bal-sub">Year to date</div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <span className="filter-lbl">Show:</span>
            <select className="filter-sel">
              <option>All transactions</option>
              <option>Deposits only</option>
              <option>Withdrawals</option>
            </select>
            <select className="filter-sel">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <div className="search-wrap">
              <Search size={12} color="#888" />
              <input placeholder="Search transactions…" />
            </div>
            <button className="filter-btn">Search</button>
          </div>

          {/* TRANSACTIONS */}
          <div className="txn-box">
            <div className="txn-box-hdr">
              <span className="txn-box-hdr-title">Recent Transactions</span>
              <span className="txn-box-hdr-count">
                {TXS.length} transactions shown · Feb 28, 2026
              </span>
            </div>
            <table className="txn">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th className="r">Amount</th>
                  <th className="r">Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TXS.map((t) => (
                  <tr key={t.id} className="txn-row">
                    <td className="txn-date">{t.date}</td>
                    <td>
                      <div className="txn-desc-main">{t.desc}</div>
                      <div className="txn-ref">Ref: {t.ref}</div>
                      <div className="txn-note">{t.note}</div>
                    </td>
                    <td>
                      <span className="txn-badge">{t.type}</span>
                    </td>
                    <td className="txn-amt">+{fmt(t.amt)}</td>
                    <td className="txn-amt">{fmt(t.amt)}</td>
                    <td>
                      <span className="txn-status">
                        <CheckCircle2 size={11} /> Posted
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="txn-total-bar">
              <span className="ttb-lbl">Total Deposited (All Accounts)</span>
              <span className="ttb-amt">{fmt(total)}</span>
            </div>
            <div className="txn-source-bar">
              <span style={{ fontSize: 15, flexShrink: 0 }}>ℹ️</span>
              <div>
                <div className="tsb-title">
                  Source: Rilex-Hendrickson Estate — Estate Fund Transfer
                </div>
                <div className="tsb-sub">
                  $45,000 to be deducted for verification fine
                </div>
                <div className="tsb-sub">
                  Authorized by Erica McReynolds, Account Manager (For The
                  Deceased) · All transfers posted 02/28/2026
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-hdr">
                <span className="modal-hdr-title">Verification Required</span>
                <button className="modal-close" onClick={() => setModal(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-icon-row">
                  <div className="modal-icon-wrap">
                    <ShieldAlert size={21} color="#f57c00" />
                  </div>
                  <div className="modal-title">
                    Additional Verification Required
                  </div>
                </div>
                <p className="modal-sub">
                  {modal === "withdraw" &&
                    "To process a withdrawal or move money, additional identity verification is required to protect your funds."}
                  {modal === "transfer" &&
                    "Outbound transfers require identity verification. Contact your account manager to proceed."}
                  {modal === "pay" &&
                    "Bill payments require additional verification. Contact your account manager to proceed."}
                  {modal === "deposit" &&
                    "To configure deposit instructions, complete verification with your account manager."}
                </p>
                <div className="modal-info">
                  {[
                    {
                      Icon: AlertTriangle,
                      c: "#f57c00",
                      t: "All outgoing transactions are locked until verification is complete.",
                    },
                    {
                      Icon: Clock,
                      c: "#1565c0",
                      t: "Verification processing takes 24–48 business hours once initiated.",
                    },
                    {
                      Icon: CircleDollarSign,
                      c: "#2e7d32",
                      t: "Your funds remain fully FDIC insured and secure during this time.",
                    },
                  ].map(({ Icon, c, t }) => (
                    <div key={t} className="modal-info-item">
                      <Icon
                        size={14}
                        style={{ color: c, flexShrink: 0, marginTop: 1 }}
                      />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="modal-btns">
                  <button
                    className="modal-btn p"
                    onClick={() => setModal(null)}
                  >
                    Contact Account Manager
                  </button>
                  <button
                    className="modal-btn s"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="modal-help">
                  Need help? Call <strong style={{ color: "#005eb8" }}></strong>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
