import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ============================================================
// SUPABASE CLIENT — alag rakha, ek baar initialize hoga
// ============================================================
const supabase = createClient(
  "https://tamofyzunjjukdixkoft.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhbW9meXp1bmpqdWtkaXhrb2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyODg4MTIsImV4cCI6MjA5Njg2NDgxMn0.IX0MQNcCK0W94pxp0WkpuN2v3mdQNc6AVJ19HWsxDAo"
);

// ============================================================
// THEME TOKENS
// ============================================================
const T = {
  black:      "#0A0806",
  obsidian:   "#111009",
  brown:      "#1E1208",
  brownMid:   "#2E1A0A",
  brownLight: "#3D2210",
  gold:       "#C8972A",
  goldLight:  "#E2B94B",
  goldPale:   "#F0D080",
  cream:      "#F5ECD7",
  muted:      "#7A6A55",
};

// ============================================================
// MENU DATA — Unsplash permanent URLs (Google URLs hata diye)
// ============================================================
const MENU = [
  { id:1,  cat:"Starters",     name:"Paneer Tikka",           price:399, desc:"Smoky grilled paneer with aromatic spices & mint chutney",       img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&q=80", veg:true },
  { id:2,  cat:"Starters",     name:"Samosa (2 pcs)",         price:99,  desc:"Crispy golden pastry filled with spiced potato & peas",          img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", veg:true },
  { id:3,  cat:"Starters",     name:"Dahi Bhalla",            price:199, desc:"Soft lentil dumplings in chilled yogurt with tamarind drizzle",   img:"https://images.unsplash.com/photo-1626132647523-66e6a44b598c?w=600&q=80", veg:true },
  { id:4,  cat:"Starters",     name:"Momos",                  price:249, desc:"Steamed Himalayan dumplings with spicy red chilli dip",           img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80", veg:true },
  { id:5,  cat:"Starters",     name:"Red Chilli Momos",       price:299, desc:"Fiery tossed momos in our secret red chilli sauce",              img:"https://images.unsplash.com/photo-1625398407796-a06f5e4f7d90?w=600&q=80", veg:true },
  { id:6,  cat:"Main Course",  name:"Handi Chicken",          price:599, desc:"Slow-cooked chicken in a rich handi with whole spices",          img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80", veg:false },
  { id:7,  cat:"Main Course",  name:"Fried Chicken Leg Piece",price:349, desc:"Crispy golden fried chicken legs with house spice blend",        img:"https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80", veg:false },
  { id:8,  cat:"Main Course",  name:"Butter Chicken",         price:699, desc:"Velvety tomato-butter gravy with tender chicken — a classic",    img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80", veg:false },
  { id:9,  cat:"Main Course",  name:"Butter Paneer Masala",   price:499, desc:"Silky paneer cubes in a luscious butter-tomato gravy",           img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80", veg:true },
  { id:10, cat:"Main Course",  name:"Dal Makhani",            price:449, desc:"Black lentils simmered overnight in butter & cream",             img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", veg:true },
  { id:11, cat:"Main Course",  name:"Mutton Curry",           price:799, desc:"Tender mutton slow-braised in bold Bihari masala",               img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", veg:false },
  { id:12, cat:"Main Course",  name:"Palak Paneer",           price:499, desc:"Fresh spinach puree with golden paneer cubes & cream",           img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", veg:true },
  { id:13, cat:"Biryani",      name:"Chicken Biryani",        price:499, desc:"Fragrant basmati layered with spiced chicken & saffron",         img:"https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&q=80", veg:false },
  { id:14, cat:"Biryani",      name:"Veg Biryani",            price:399, desc:"Aromatic basmati with seasonal vegetables & whole spices",       img:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80", veg:true },
  { id:15, cat:"Biryani",      name:"Mutton Biryani",         price:699, desc:"Royal dum biryani with fall-off-the-bone mutton pieces",         img:"https://images.unsplash.com/photo-1633945274405-b6c8069d2c75?w=600&q=80", veg:false },
  { id:16, cat:"Breads & More",name:"Tandoori Roti",          price:45,  desc:"Whole wheat flatbread baked fresh in the tandoor",               img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", veg:true },
  { id:17, cat:"Breads & More",name:"Chole Bhature",          price:249, desc:"Fluffy deep-fried bhature with spiced chickpea curry",           img:"https://images.unsplash.com/photo-1626132647523-66e6a44b598c?w=600&q=80", veg:true },
  { id:18, cat:"Breads & More",name:"Chole Kulche",           price:229, desc:"Soft kulcha bread with tangy chickpea masala",                   img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", veg:true },
  { id:19, cat:"Breads & More",name:"Idli Sambar",            price:199, desc:"Steamed rice cakes with piping hot lentil sambar & chutneys",    img:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80", veg:true },
  { id:20, cat:"Breads & More",name:"Masala Dosa",            price:299, desc:"Crispy rice crepe with spiced potato filling & sambar",          img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", veg:true },
  { id:21, cat:"Chinese",      name:"Chicken Fried Rice",     price:120, desc:"Wok-tossed basmati rice with chicken, egg & soy glaze",          img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80", veg:false },
  { id:22, cat:"Chinese",      name:"Veg Burger",             price:90,  desc:"Juicy patty with fresh veggies in a toasted sesame bun",         img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", veg:true },
  { id:23, cat:"Drinks",       name:"Lassi",                  price:199, desc:"Thick chilled yogurt drink — sweet & refreshing",                img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80", veg:true },
  { id:24, cat:"Drinks",       name:"Masala Chai",            price:99,  desc:"Spiced Indian tea with ginger, cardamom & fresh milk",           img:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80", veg:true },
  { id:25, cat:"Drinks",       name:"Thandai",                price:249, desc:"Chilled milk blended with nuts, rose & cooling spices",          img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80", veg:true },
  { id:26, cat:"Drinks",       name:"Aam Panna",              price:179, desc:"Raw mango cooler with cumin & mint — summer's finest",           img:"https://images.unsplash.com/photo-1534353473418-4cfa0c01e9c5?w=600&q=80", veg:true },
  { id:27, cat:"Desserts",     name:"Malai Kulfi",            price:249, desc:"Frozen cream dessert with cardamom & saffron — old Delhi style", img:"https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&q=80", veg:true },
  { id:28, cat:"Desserts",     name:"Rasmalai",               price:299, desc:"Soft chenna discs soaked in saffron-cardamom rabri",             img:"https://images.unsplash.com/photo-1626082927389-6cd097cee6b4?w=600&q=80", veg:true },
  { id:29, cat:"Desserts",     name:"Gulab Jamun (2 pcs)",    price:199, desc:"Melt-in-mouth milk dumplings drenched in rose-cardamom syrup",   img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", veg:true },
  { id:30, cat:"Desserts",     name:"Rabri Kheer",            price:299, desc:"Slow-simmered rice pudding topped with thickened rabri cream",   img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80", veg:true },
];

const CATS = ["All", ...Array.from(new Set(MENU.map(i => i.cat)))];
const TRACKING_STEPS = ["Order Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
const SAMPLE_REVIEWS = [
  { id:1, name:"Rahul Singh",  rating:5, comment:"Best biryani in Chhapra! Mutton was fall-off-the-bone tender.", date:"10 Jun 2026" },
  { id:2, name:"Priya Sharma", rating:5, comment:"The butter chicken is heavenly. Premium experience at great value.", date:"8 Jun 2026" },
  { id:3, name:"Amit Kumar",   rating:4, comment:"Momos are absolutely delicious. Fast delivery too!", date:"5 Jun 2026" },
];

// ============================================================
// HELPERS
// ============================================================

// FIX #3: Collision-safe Order ID — Date.now() + random suffix
const generateOrderId = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return "DD" + ts + rand;
};

// FIX #6: Safe average — NaN se bachao
const safeAvg = (arr) => {
  if (!arr.length) return "0.0";
  const sum = arr.reduce((s, r) => s + Number(r.rating), 0);
  return (sum / arr.length).toFixed(1);
};

// FIX #5: Form validation helpers
const validators = {
  phone: (v) => /^[6-9]\d{9}$/.test(v.trim()),
  name:  (v) => v.trim().length >= 2,
  address: (v) => v.trim().length >= 8,
};

// FIX #1: localStorage helpers
const storage = {
  get: (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch { /* storage full — ignore */ }
  },
};

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: #0A0806;
      color: #F5ECD7;
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.6;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #1E1208; }
    ::-webkit-scrollbar-thumb { background: #C8972A; border-radius: 2px; }
    .display { font-family: 'Playfair Display', serif; }
    .gold-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #C8972A, transparent); margin: 0 auto; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    .fade-in { animation: fadeInUp 0.6s ease both; }
    .page { animation: fadeInUp 0.4s ease both; }
    .btn-gold {
      background: linear-gradient(135deg, #C8972A, #E2B94B);
      color: #0A0806; border: none;
      font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 12px 28px; border-radius: 2px; cursor: pointer;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-gold:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,151,42,0.35); }
    .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-outline {
      background: transparent; color: #C8972A; border: 1px solid #C8972A;
      font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 13px;
      letter-spacing: 0.06em; padding: 10px 22px; border-radius: 2px; cursor: pointer;
      transition: all 0.25s ease;
    }
    .btn-outline:hover { background: #C8972A; color: #0A0806; }
    .btn-ghost {
      background: transparent; color: #7A6A55; border: none;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      cursor: pointer; padding: 8px 16px; border-radius: 2px; transition: color 0.2s;
    }
    .btn-ghost:hover { color: #F5ECD7; }
    .card {
      background: #1E1208; border: 1px solid rgba(200,151,42,0.12);
      border-radius: 4px; overflow: hidden; transition: all 0.3s ease;
    }
    .card:hover { border-color: rgba(200,151,42,0.35); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
    .input {
      width: 100%; background: #2E1A0A; border: 1px solid rgba(200,151,42,0.2);
      color: #F5ECD7; font-family: 'DM Sans', sans-serif; font-size: 14px;
      padding: 12px 16px; border-radius: 2px; outline: none; transition: border-color 0.2s;
    }
    .input:focus { border-color: #C8972A; }
    .input.error { border-color: #ef4444; }
    .input::placeholder { color: #7A6A55; }
    .error-msg { font-size: 11px; color: #ef4444; margin-top: 4px; }
    .toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #3D2210; border: 1px solid #C8972A; color: #F5ECD7;
      padding: 12px 24px; border-radius: 2px; font-size: 14px;
      z-index: 9999; animation: fadeInUp 0.3s ease both; white-space: nowrap;
    }
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(10,8,6,0.92); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200,151,42,0.15);
    }
    .section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }
    @media (max-width: 640px) { .section { padding: 56px 16px; } }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    @media (max-width: 480px) { .menu-grid { grid-template-columns: 1fr 1fr; gap: 12px; } }
    .star { color: #C8972A; font-size: 14px; }
    .star.empty { color: #7A6A55; }
    .badge-veg {
      display: inline-block; width: 12px; height: 12px;
      border: 1.5px solid #22c55e; border-radius: 1px; position: relative;
    }
    .badge-veg::after {
      content: ''; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%,-50%); width: 6px; height: 6px;
      background: #22c55e; border-radius: 50%;
    }
    .badge-nonveg {
      display: inline-block; width: 12px; height: 12px;
      border: 1.5px solid #ef4444; border-radius: 1px; position: relative;
    }
    .badge-nonveg::after {
      content: ''; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%,-50%); width: 0;
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-bottom: 8px solid #ef4444; margin-top: -4px;
    }
    .track-bar { display: flex; align-items: center; width: 100%; margin: 24px 0; }
    .track-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
    .track-dot {
      width: 24px; height: 24px; border-radius: 50%; border: 2px solid #7A6A55;
      background: #1E1208; z-index: 1; display: flex; align-items: center;
      justify-content: center; font-size: 10px; transition: all 0.4s ease;
    }
    .track-dot.active { border-color: #C8972A; background: #C8972A; color: #0A0806; box-shadow: 0 0 12px rgba(200,151,42,0.5); }
    .track-dot.done { border-color: #C8972A; background: #3D2210; color: #C8972A; }
    .track-line { position: absolute; top: 12px; left: 50%; width: 100%; height: 1px; background: #7A6A55; }
    .track-line.done { background: #C8972A; }
    .track-label { font-size: 10px; color: #7A6A55; margin-top: 6px; text-align: center; line-height: 1.2; }
    .track-label.active { color: #E2B94B; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #C8972A; padding: 10px 12px; border-bottom: 1px solid rgba(200,151,42,0.2); }
    td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
    tr:hover td { background: rgba(200,151,42,0.04); }
    .pill {
      background: transparent; border: 1px solid rgba(200,151,42,0.25); color: #7A6A55;
      font-size: 12px; letter-spacing: 0.06em; padding: 6px 16px; border-radius: 100px;
      cursor: pointer; transition: all 0.2s; white-space: nowrap; font-family: 'DM Sans', sans-serif;
    }
    .pill:hover { border-color: #C8972A; color: #F5ECD7; }
    .pill.active { background: #C8972A; border-color: #C8972A; color: #0A0806; font-weight: 600; }
    .pills-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; -ms-overflow-style: none; scrollbar-width: none; }
    .pills-row::-webkit-scrollbar { display: none; }
    .cart-badge {
      position: absolute; top: -6px; right: -6px; background: #C8972A; color: #0A0806;
      font-size: 10px; font-weight: 700; width: 18px; height: 18px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .qty-ctrl { display: flex; align-items: center; gap: 8px; }
    .qty-btn {
      width: 28px; height: 28px; background: #3D2210; border: 1px solid rgba(200,151,42,0.3);
      color: #C8972A; font-size: 16px; border-radius: 2px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: background 0.2s;
    }
    .qty-btn:hover { background: #C8972A; color: #0A0806; }
    .hero {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      text-align: center; position: relative; overflow: hidden;
      background: radial-gradient(ellipse at 60% 40%, #2E1A0A 0%, #111009 50%, #0A0806 100%);
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8972A' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .hero-content { position: relative; z-index: 1; padding: 24px; }
    .hero-eyebrow { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #C8972A; margin-bottom: 20px; }
    .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(52px, 12vw, 96px); font-weight: 900; line-height: 0.95; color: #F5ECD7; margin-bottom: 8px; }
    .hero-title span { display: block; color: #C8972A; font-style: italic; font-size: clamp(36px, 8vw, 64px); }
    .hero-sub { font-size: 15px; color: #7A6A55; margin: 24px 0 40px; letter-spacing: 0.04em; }
    .hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
    .orb-1 { width: 300px; height: 300px; background: rgba(200,151,42,0.08); top: 10%; right: 5%; }
    .orb-2 { width: 200px; height: 200px; background: rgba(200,151,42,0.05); bottom: 15%; left: 5%; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr; gap: 32px; } }
    .desktop-nav { display: none !important; }
    @media (min-width: 768px) { .desktop-nav { display: flex !important; } }
    .spinner {
      display: inline-block; width: 14px; height: 14px;
      border: 2px solid rgba(10,8,6,0.3); border-top-color: #0A0806;
      border-radius: 50%; animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .realtime-dot {
      display: inline-block; width: 8px; height: 8px; background: #22c55e;
      border-radius: 50%; margin-right: 6px; animation: pulse 2s ease infinite;
    }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  `}</style>
);

// ============================================================
// SMALL COMPONENTS
// ============================================================
const Stars = ({ n }) => (
  <span>{[1,2,3,4,5].map(i => <span key={i} className={i<=n?"star":"star empty"}>★</span>)}</span>
);

const VegBadge = ({ veg }) => (
  <span className={veg?"badge-veg":"badge-nonveg"} title={veg?"Veg":"Non-veg"} />
);

// ============================================================
// NAV — FIX: cart button sirf ek jagah, mobile menu clean
// ============================================================
function Nav({ page, setPage, cartCount }) {
  const [open, setOpen] = useState(false);
  const links = [
    { key:"home",    label:"Home" },
    { key:"menu",    label:"Menu" },
    { key:"reserve", label:"Reserve" },
    { key:"track",   label:"Track Order" },
    { key:"reviews", label:"Reviews" },
    { key:"admin",   label:"Admin" },
  ];

  const navigate = (key) => { setPage(key); setOpen(false); };

  return (
    <nav>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <button onClick={()=>navigate("home")} style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18" stroke="#C8972A" strokeWidth="1.2"/>
            <ellipse cx="19" cy="20" rx="9" ry="7" stroke="#C8972A" strokeWidth="1"/>
            <path d="M13 12 Q11 15 13 17" stroke="#C8972A" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M25 12 L25 17 M23 12 L23 14 M25 12 L25 14 M27 12 L27 14" stroke="#C8972A" strokeWidth="1" strokeLinecap="round"/>
            <path d="M19 8 L19.5 9.5 L21 9.5 L20 10.5 L20.5 12 L19 11 L17.5 12 L18 10.5 L17 9.5 L18.5 9.5 Z" fill="#C8972A"/>
          </svg>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#C8972A" }}>Desi Delight</div>
            <div style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"#7A6A55", marginTop:1 }}>Chhapra · Est. 2024</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display:"flex", gap:4, alignItems:"center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l.key} onClick={()=>navigate(l.key)} className="btn-ghost"
              style={{ color: page===l.key?"#C8972A":undefined, fontWeight: page===l.key?500:300 }}>
              {l.label}
            </button>
          ))}
          {/* FIX: cart button sirf ek jagah desktop mein */}
          <button onClick={()=>navigate("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"8px 12px", color:"#F5ECD7", fontSize:20 }}>
            🛒{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button onClick={()=>navigate("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"8px", color:"#F5ECD7", fontSize:20 }}
            className="desktop-nav" style={{ display:"none" }}>
            🛒{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          {/* Mobile cart — always visible on mobile, hidden on desktop via class */}
          <button onClick={()=>navigate("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"8px", color:"#F5ECD7", fontSize:20 }}>
            🛒{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button onClick={()=>setOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C8972A", fontSize:22, padding:4 }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background:"#111009", borderTop:"1px solid rgba(200,151,42,0.15)", padding:"16px 24px" }}>
          {links.map(l => (
            <button key={l.key} onClick={()=>navigate(l.key)}
              style={{ display:"block", width:"100%", textAlign:"left", padding:"12px 0", background:"none", border:"none", cursor:"pointer",
                color: page===l.key?"#C8972A":"#F5ECD7", fontFamily:"'DM Sans',sans-serif", fontSize:15,
                borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
// HOME
// ============================================================
function Home({ setPage }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="orb orb-1" /><div className="orb orb-2" />
        <div className="hero-content fade-in">
          <p className="hero-eyebrow">✦ Fine Dining Experience ✦</p>
          <h1 className="hero-title display">Desi<span>Delight</span></h1>
          <p className="hero-sub">Authentic Indian flavours, crafted with love · Chhapra, Bihar</p>
          <div className="hero-cta">
            <button className="btn-gold" onClick={()=>setPage("menu")}>View Menu</button>
            <button className="btn-outline" onClick={()=>setPage("reserve")}>Reserve a Table</button>
          </div>
        </div>
      </div>

      <div style={{ background:"#1E1208", borderTop:"1px solid rgba(200,151,42,0.12)", borderBottom:"1px solid rgba(200,151,42,0.12)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, textAlign:"center" }}>
          {[["30+","Menu Items"],["1000+","Happy Customers"],["4.9 ★","Average Rating"]].map(([n,l])=>(
            <div key={l}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"#C8972A" }}>{n}</div>
              <div style={{ fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", color:"#7A6A55", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", textAlign:"center", marginBottom:8 }}>Our Signature</p>
        <h2 className="display" style={{ fontSize:36, fontWeight:700, textAlign:"center", marginBottom:8 }}>Chef's Selection</h2>
        <div className="gold-line" style={{ marginBottom:48 }} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
          {MENU.filter(i=>[8,11,15,27].includes(i.id)).map(item=>(
            <div key={item.id} className="card" onClick={()=>setPage("menu")} style={{ cursor:"pointer" }}>
              <img src={item.img} alt={item.name} loading="lazy" style={{ width:"100%", height:160, objectFit:"cover", display:"block" }} />
              <div style={{ padding:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:600, lineHeight:1.3 }}>{item.name}</span>
                  <VegBadge veg={item.veg} />
                </div>
                <div style={{ marginTop:8, color:"#C8972A", fontWeight:600, fontSize:15 }}>₹{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:40 }}>
          <button className="btn-gold" onClick={()=>setPage("menu")}>Explore Full Menu</button>
        </div>
      </div>

      <div style={{ background:"#111009", borderTop:"1px solid rgba(200,151,42,0.1)" }}>
        <div className="section" style={{ maxWidth:900 }}>
          <div className="about-grid">
            <div style={{ textAlign:"center" }}>
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="88" stroke="#C8972A" strokeWidth="1.5"/>
                <circle cx="90" cy="90" r="80" stroke="#C8972A" strokeOpacity="0.2" strokeWidth="0.8"/>
                <circle cx="90" cy="90" r="68" stroke="#C8972A" strokeOpacity="0.15" strokeWidth="0.6" strokeDasharray="4 4"/>
                <ellipse cx="90" cy="95" rx="44" ry="34" stroke="#C8972A" strokeWidth="1.5"/>
                <ellipse cx="90" cy="95" rx="36" ry="27" stroke="#C8972A" strokeOpacity="0.4" strokeWidth="0.8"/>
                <circle cx="74" cy="90" r="8" stroke="#C8972A" strokeWidth="1"/>
                <circle cx="106" cy="90" r="8" stroke="#C8972A" strokeWidth="1"/>
                <ellipse cx="90" cy="106" rx="10" ry="6" stroke="#C8972A" strokeWidth="1"/>
                <ellipse cx="90" cy="88" rx="12" ry="8" fill="#C8972A" fillOpacity="0.15" stroke="#C8972A" strokeWidth="0.8"/>
                <path d="M52 55 Q46 68 52 76" stroke="#C8972A" strokeWidth="2" strokeLinecap="round"/>
                <ellipse cx="52" cy="52" rx="5" ry="7" stroke="#C8972A" strokeWidth="1.5"/>
                <line x1="128" y1="48" x2="128" y2="76" stroke="#C8972A" strokeWidth="2" strokeLinecap="round"/>
                <line x1="122" y1="48" x2="122" y2="58" stroke="#C8972A" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="134" y1="48" x2="134" y2="58" stroke="#C8972A" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M122 58 Q128 62 134 58" stroke="#C8972A" strokeWidth="1.2"/>
                <path d="M90 18 L92.5 25 L100 25 L94 30 L96.5 37 L90 32.5 L83.5 37 L86 30 L80 25 L87.5 25 Z" fill="#C8972A"/>
                <text x="90" y="145" textAnchor="middle" fontFamily="serif" fontSize="11" letterSpacing="8" fill="#C8972A" fillOpacity="0.7">DESI DELIGHT</text>
              </svg>
            </div>
            <div>
              <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Our Story</p>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, marginBottom:8, lineHeight:1.2 }}>Crafted with Love,<br/><span style={{ color:"#C8972A", fontStyle:"italic" }}>Served with Soul</span></h2>
              <div className="gold-line" style={{ margin:"16px 0", marginLeft:0 }} />
              <p style={{ fontSize:14, color:"#7A6A55", lineHeight:1.9, marginBottom:16 }}>It began in a small kitchen in Chhapra — not with a grand plan, but with a simple belief: that every person deserves to eat food made with real love.</p>
              <p style={{ fontSize:14, color:"#7A6A55", lineHeight:1.9, marginBottom:20 }}>We don't believe in shortcuts. Our mutton simmers for hours. Our biryani is dum-cooked the old way. Our desserts are made fresh, every single day.</p>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#C8972A", fontStyle:"italic" }}>"Desi Delight is not just a restaurant. It is Chhapra's own little celebration of Indian food."</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background:"#1E1208", borderTop:"1px solid rgba(200,151,42,0.12)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:32, textAlign:"center" }}>
          {[["🕐","Open Daily","11:00 AM – 11:00 PM"],["📍","Location","Station Road, Chhapra"],["📱","Order & Enquiry","WhatsApp us anytime"],["🚚","Home Delivery","Within 5 km radius"]].map(([e,t,s])=>(
            <div key={t}>
              <div style={{ fontSize:28, marginBottom:8 }}>{e}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, color:"#C8972A", marginBottom:4 }}>{t}</div>
              <div style={{ fontSize:13, color:"#7A6A55" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:"#1E1208", borderTop:"1px solid rgba(200,151,42,0.12)" }}>
        <div className="section" style={{ maxWidth:900 }}>
          <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", textAlign:"center", marginBottom:8 }}>Get In Touch</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:700, textAlign:"center", marginBottom:8 }}>Contact Us</h2>
          <div className="gold-line" style={{ marginBottom:48 }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:24 }}>
            {[
              { icon:"📞", label:"Phone", val:<a href="tel:+918540868095" style={{ color:"#F5ECD7", fontSize:16, fontWeight:500, textDecoration:"none" }}>+91 85408 68095</a>, sub:"Mon – Sun · 11 AM – 11 PM" },
              { icon:"💬", label:"WhatsApp", val:<a href="https://wa.me/918540868095" target="_blank" rel="noreferrer" style={{ color:"#F5ECD7", fontSize:16, fontWeight:500, textDecoration:"none" }}>+91 85408 68095</a>, sub:"Quick replies within minutes" },
              { icon:"✉️", label:"Email", val:<a href="mailto:vivekkumarg28samelan@gmail.com" style={{ color:"#F5ECD7", fontSize:12, fontWeight:500, textDecoration:"none", wordBreak:"break-all" }}>vivekkumarg28samelan@gmail.com</a>, sub:"We reply within 24 hours" },
              { icon:"📍", label:"Location", val:<span style={{ color:"#F5ECD7", fontSize:15, fontWeight:500 }}>Station Road</span>, sub:"Chhapra, Bihar, India" },
            ].map(({ icon, label, val, sub }) => (
              <div key={label} style={{ background:"#2E1A0A", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:28, textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"#C8972A", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{label}</div>
                {val}
                <div style={{ fontSize:12, color:"#7A6A55", marginTop:6 }}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <a href="https://wa.me/918540868095?text=Hello%20Desi%20Delight!%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
              <button className="btn-gold" style={{ fontSize:15, padding:"14px 36px" }}>💬 Chat on WhatsApp</button>
            </a>
          </div>
        </div>
      </div>

      <footer style={{ background:"#111009", borderTop:"1px solid rgba(200,151,42,0.1)", padding:"32px 24px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#C8972A", marginBottom:4 }}>Desi Delight</div>
        <div style={{ fontSize:12, color:"#7A6A55" }}>Station Road, Chhapra, Bihar · © 2026</div>
      </footer>
    </div>
  );
}

// ============================================================
// MENU PAGE
// ============================================================
function MenuPage({ addToCart, cart }) {
  const [activeCat, setActiveCat] = useState("All");
  const [vegOnly, setVegOnly]     = useState(false);
  const [search, setSearch]       = useState("");

  const items = MENU.filter(i => {
    if (activeCat !== "All" && i.cat !== activeCat) return false;
    if (vegOnly && !i.veg) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // FIX #1: findLastIndex — safe polyfill using reduce
  const qtyInCart = (id) => cart.filter(c => c.id === id).length;

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Explore</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Our Menu</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <input className="input" placeholder="Search dishes..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1, minWidth:180 }} />
          <button onClick={()=>setVegOnly(v=>!v)} className={vegOnly?"btn-gold":"btn-outline"} style={{ whiteSpace:"nowrap", fontSize:12 }}>
            🌿 Veg Only
          </button>
        </div>

        <div className="pills-row" style={{ marginBottom:32 }}>
          {CATS.map(c => <button key={c} className={`pill ${activeCat===c?"active":""}`} onClick={()=>setActiveCat(c)}>{c}</button>)}
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#7A6A55" }}>No items found</div>
        ) : (
          <div className="menu-grid">
            {items.map(item => {
              const qty = qtyInCart(item.id);
              return (
                <div key={item.id} className="card">
                  <div style={{ position:"relative" }}>
                    <img src={item.img} alt={item.name} loading="lazy" style={{ width:"100%", height:160, objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", top:8, left:8 }}><VegBadge veg={item.veg} /></div>
                    <div style={{ position:"absolute", top:8, right:8, background:"rgba(10,8,6,0.75)", backdropFilter:"blur(4px)", padding:"2px 8px", borderRadius:100, fontSize:11, color:"#C8972A", fontWeight:600 }}>
                      {item.cat}
                    </div>
                  </div>
                  <div style={{ padding:14 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:600, marginBottom:4, lineHeight:1.3 }}>{item.name}</div>
                    <div style={{ fontSize:12, color:"#7A6A55", marginBottom:12, lineHeight:1.5 }}>{item.desc}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ color:"#C8972A", fontWeight:600, fontSize:16 }}>₹{item.price}</span>
                      {qty === 0 ? (
                        <button className="btn-gold" style={{ padding:"7px 16px", fontSize:12 }} onClick={()=>addToCart(item)}>+ Add</button>
                      ) : (
                        <div className="qty-ctrl">
                          <button className="qty-btn" onClick={()=>addToCart({...item, remove:true})}>−</button>
                          <span style={{ fontSize:14, fontWeight:600, color:"#C8972A", minWidth:16, textAlign:"center" }}>{qty}</span>
                          <button className="qty-btn" onClick={()=>addToCart(item)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CART
// ============================================================
function Cart({ cart, setCart, setPage, showToast }) {
  const grouped = cart.reduce((acc, item) => {
    acc[item.id] = acc[item.id] ? { ...acc[item.id], qty: acc[item.id].qty + 1 } : { ...item, qty: 1 };
    return acc;
  }, {});
  const items    = Object.values(grouped);
  const subtotal = cart.reduce((s,i) => s + i.price, 0);
  const delivery = subtotal > 0 ? 40 : 0;
  const total    = subtotal + delivery;

  // FIX #1: findLastIndex polyfill
  const removeOne = (id) => setCart(c => {
    let removed = false;
    return [...c].reverse().filter(x => {
      if (!removed && x.id === id) { removed = true; return false; }
      return true;
    }).reverse();
  });

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:680 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Your</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Cart</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        {items.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
            <div style={{ color:"#7A6A55", marginBottom:24 }}>Your cart is empty</div>
            <button className="btn-gold" onClick={()=>setPage("menu")}>Browse Menu</button>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} style={{ display:"flex", gap:14, alignItems:"center", padding:"16px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <img src={item.img} alt={item.name} loading="lazy" style={{ width:64, height:64, objectFit:"cover", borderRadius:2, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, marginBottom:2 }}>{item.name}</div>
                  <div style={{ color:"#C8972A", fontSize:14 }}>₹{item.price} each</div>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={()=>removeOne(item.id)}>−</button>
                  <span style={{ fontWeight:600, color:"#C8972A", minWidth:20, textAlign:"center" }}>{item.qty}</span>
                  <button className="qty-btn" onClick={()=>setCart(c=>[...c,item])}>+</button>
                </div>
                <div style={{ fontWeight:600, color:"#F5ECD7", minWidth:60, textAlign:"right" }}>₹{item.price * item.qty}</div>
              </div>
            ))}

            <div style={{ background:"#1E1208", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:20, marginTop:24 }}>
              <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8972A", marginBottom:12 }}>Bill Summary</div>
              {[["Subtotal", `₹${subtotal}`],["Delivery", `₹${delivery}`]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#7A6A55", marginBottom:8 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid rgba(200,151,42,0.2)", paddingTop:12, display:"flex", justifyContent:"space-between", fontWeight:600, fontSize:16 }}>
                <span>Total</span><span style={{ color:"#C8972A" }}>₹{total}</span>
              </div>
            </div>

            <div style={{ display:"flex", gap:12, marginTop:20, flexWrap:"wrap" }}>
              <button className="btn-gold" style={{ flex:1 }} onClick={()=>setPage("payment")}>Proceed to Pay ₹{total}</button>
              <button className="btn-ghost" onClick={()=>{ setCart([]); showToast("Cart cleared"); }}>Clear</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PAYMENT — FIX: validation + error handling + loading state
// ============================================================
function Payment({ cart, setCart, setPage, setOrders, showToast }) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors]   = useState({});
  const [paid, setPaid]       = useState(false);
  const [loading, setLoading] = useState(false); // FIX #7: loading state

  const total = cart.reduce((s,i) => s + i.price, 0) + (cart.length > 0 ? 40 : 0);

  // FIX #5: Proper validation
  const validate = () => {
    const e = {};
    if (!validators.name(name))       e.name    = "Naam kam se kam 2 characters ka hona chahiye";
    if (!validators.phone(phone))     e.phone   = "Valid 10-digit phone number likhein (6-9 se shuru hona chahiye)";
    if (!validators.address(address)) e.address = "Poora delivery address likhein (kam se kam 8 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = async () => {
    if (!validate()) return;
    setLoading(true);

    // FIX #3: Collision-safe Order ID
    const orderId = generateOrderId();
    const itemsData = Object.values(cart.reduce((a,i) => {
      a[i.id] = { ...i, qty: (a[i.id]?.qty || 0) + 1 };
      return a;
    }, {}));
    const newOrder = {
      id: orderId, items: itemsData, total, name, phone, address,
      status: "Confirmed",
      time: new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
      date: new Date().toLocaleDateString("en-IN"),
      trackStep: 1,
    };

    // FIX #7: try-catch for proper error handling
    try {
      const { error } = await supabase.from("orders").insert({
        id: orderId, customer_name: name, phone, address, total,
        status: "Confirmed", track_step: 1, items: itemsData,
      });
      if (error) throw error;

      setOrders(o => [newOrder, ...o]);
      setPaid(true);
      setCart([]);
      const msg = encodeURIComponent(`🍽️ New Order from Desi Delight!\nOrder ID: ${orderId}\nCustomer: ${name}\nPhone: ${phone}\nTotal: ₹${total}\nItems: ${itemsData.map(i=>i.name+"×"+i.qty).join(", ")}`);
      setTimeout(() => window.open(`https://wa.me/918540868095?text=${msg}`, "_blank"), 500);
    } catch (err) {
      console.error("Order error:", err);
      showToast("❌ Order fail hua! Network check karein ya WhatsApp pe order karein.");
    } finally {
      setLoading(false); // FIX #7: hamesha reset hoga — success ya failure dono mein
    }
  };

  if (paid) return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:500, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
        <h2 className="display" style={{ fontSize:32, color:"#C8972A", marginBottom:8 }}>Order Place Ho Gaya!</h2>
        <p style={{ color:"#7A6A55", marginBottom:32 }}>Aapka order mil gaya. Real time mein track karein.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-gold" onClick={()=>setPage("track")}>Track Order</button>
          <button className="btn-outline" onClick={()=>setPage("menu")}>Aur Order Karein</button>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ textAlign:"center" }}>
        <p style={{ color:"#7A6A55", marginBottom:24 }}>Cart mein koi item nahi hai</p>
        <button className="btn-gold" onClick={()=>setPage("menu")}>Menu Dekhein</button>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:540 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Checkout</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Payment</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
          {/* FIX #5: Error display for each field */}
          <div>
            <input className={`input ${errors.name?"error":""}`} placeholder="Aapka Naam *" value={name}
              onChange={e=>{ setName(e.target.value); setErrors(ev=>({...ev,name:""})); }} />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>
          <div>
            <input className={`input ${errors.phone?"error":""}`} placeholder="Phone Number * (10 digits)" value={phone}
              onChange={e=>{ setPhone(e.target.value); setErrors(ev=>({...ev,phone:""})); }} maxLength={10} />
            {errors.phone && <p className="error-msg">{errors.phone}</p>}
          </div>
          <div>
            <input className={`input ${errors.address?"error":""}`} placeholder="Delivery Address *" value={address}
              onChange={e=>{ setAddress(e.target.value); setErrors(ev=>({...ev,address:""})); }} />
            {errors.address && <p className="error-msg">{errors.address}</p>}
          </div>
        </div>

        <div style={{ background:"#1E1208", border:"1px solid rgba(200,151,42,0.2)", borderRadius:4, padding:20, marginBottom:24 }}>
          <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8972A", marginBottom:12 }}>UPI se Pay Karein</div>
          <div style={{ fontSize:13, color:"#7A6A55", marginBottom:8 }}>UPI ID:</div>
          <div style={{ fontFamily:"monospace", fontSize:16, color:"#F5ECD7", background:"#2E1A0A", padding:"10px 14px", borderRadius:2 }}>8540868095@fam</div>
          <div style={{ marginTop:12, fontSize:12, color:"#7A6A55" }}>GPay, PhonePe ya kisi bhi UPI app se ₹{total} bhejein. Screenshot WhatsApp pe share ho jayega.</div>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#3D2210", borderRadius:4, padding:"14px 18px", marginBottom:20 }}>
          <span style={{ fontSize:13, color:"#7A6A55" }}>Total Amount</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#C8972A", fontWeight:700 }}>₹{total}</span>
        </div>

        {/* FIX #7: disabled + spinner during loading */}
        <button className="btn-gold" style={{ width:"100%", justifyContent:"center", fontSize:15, padding:14 }}
          onClick={handleOrder} disabled={loading}>
          {loading ? <><span className="spinner" /> Processing...</> : `Confirm Order & Pay ₹${total}`}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// RESERVE — FIX: validation + error handling
// ============================================================
function Reserve({ showToast }) {
  const [form, setForm]     = useState({ name:"", phone:"", date:"", time:"", guests:"2", note:"" });
  const [errors, setErrors] = useState({});
  const [done, setDone]     = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };

  const validate = () => {
    const e = {};
    if (!validators.name(form.name))   e.name  = "Naam likhna zaroori hai";
    if (!validators.phone(form.phone)) e.phone = "Valid 10-digit phone number likhein";
    if (!form.date)                    e.date  = "Date choose karein";
    if (!form.time)                    e.time  = "Time choose karein";
    const today = new Date(); today.setHours(0,0,0,0);
    if (form.date && new Date(form.date) < today) e.date = "Aaj ya future date choose karein";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("reservations").insert({
        name: form.name, phone: form.phone, date: form.date,
        time: form.time, guests: form.guests, note: form.note || ""
      });
      if (error) throw error;
      const msg = encodeURIComponent(`🍽️ Table Reservation – Desi Delight\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nNote: ${form.note||"—"}`);
      window.open(`https://wa.me/918540868095?text=${msg}`, "_blank");
      setDone(true);
    } catch (err) {
      console.error("Reservation error:", err);
      showToast("❌ Booking fail hua! Dobara try karein ya call karein.");
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:500, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
        <h2 className="display" style={{ fontSize:32, color:"#C8972A", marginBottom:8 }}>Table Book Ho Gaya!</h2>
        <p style={{ color:"#7A6A55" }}>Hamari team WhatsApp pe confirm karegi jaldi.</p>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:540 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Dine With Us</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Table Reserve Karein</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <input className={`input ${errors.name?"error":""}`} placeholder="Aapka Naam *" value={form.name} onChange={e=>set("name",e.target.value)} />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>
          <div>
            <input className={`input ${errors.phone?"error":""}`} placeholder="Phone Number * (10 digits)" value={form.phone} onChange={e=>set("phone",e.target.value)} maxLength={10} />
            {errors.phone && <p className="error-msg">{errors.phone}</p>}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <input className={`input ${errors.date?"error":""}`} type="date" value={form.date} onChange={e=>set("date",e.target.value)}
                min={new Date().toISOString().split("T")[0]} />
              {errors.date && <p className="error-msg">{errors.date}</p>}
            </div>
            <div>
              <select className={`input ${errors.time?"error":""}`} value={form.time} onChange={e=>set("time",e.target.value)}>
                <option value="">Time Select Karein</option>
                {["12:00","13:00","14:00","19:00","19:30","20:00","20:30","21:00","21:30"].map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              {errors.time && <p className="error-msg">{errors.time}</p>}
            </div>
          </div>
          <select className="input" value={form.guests} onChange={e=>set("guests",e.target.value)}>
            {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}
          </select>
          <textarea className="input" placeholder="Special requests (optional)" rows={3} value={form.note} onChange={e=>set("note",e.target.value)} style={{ resize:"vertical" }} />
        </div>

        <button className="btn-gold" style={{ width:"100%", justifyContent:"center", marginTop:24, fontSize:15, padding:14 }}
          onClick={submit} disabled={loading}>
          {loading ? <><span className="spinner" /> Booking...</> : "Reservation Confirm Karein"}
        </button>
        <p style={{ textAlign:"center", fontSize:12, color:"#7A6A55", marginTop:12 }}>WhatsApp pe confirm hogi · Open 11 AM – 11 PM</p>
      </div>
    </div>
  );
}

// ============================================================
// TRACK ORDER
// ============================================================
function TrackOrder({ orders }) {
  const [orderId, setOrderId] = useState("");
  const [found, setFound]     = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [step, setStep]       = useState(1);

  useEffect(() => {
    if (orders.length > 0) { setFound(orders[0]); setStep(orders[0].trackStep); setNotFound(false); }
  }, [orders]);

  useEffect(() => {
    if (!found || step >= 4) return;
    const t = setTimeout(() => setStep(s => s + 1), 8000);
    return () => clearTimeout(t);
  }, [found, step]);

  const search = () => {
    const o = orders.find(x => x.id.toLowerCase() === orderId.toLowerCase().trim());
    if (o) { setFound(o); setStep(o.trackStep); setNotFound(false); }
    else   { setFound(null); setNotFound(true); }
  };

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:640 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Live</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Order Track Karein</h1>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"flex", gap:10, marginBottom:32 }}>
          <input className="input" placeholder="Order ID daalen (e.g. DD1K7X2MA)" value={orderId}
            onChange={e=>setOrderId(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&search()} />
          <button className="btn-gold" onClick={search}>Track</button>
        </div>

        {/* FIX: notFound aur found alag states mein */}
        {notFound && (
          <div style={{ textAlign:"center", padding:"24px", color:"#ef4444", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:4 }}>
            ❌ Yeh Order ID nahi mila. ID dobara check karein.
          </div>
        )}

        {found && (
          <div className="card" style={{ padding:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:20 }}>
              <div>
                <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"#7A6A55" }}>Order ID</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#C8972A" }}>{found.id}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"#7A6A55" }}>Status</div>
                <div style={{ color:"#E2B94B", fontWeight:600 }}>{TRACKING_STEPS[step]}</div>
              </div>
            </div>
            <div className="track-bar">
              {TRACKING_STEPS.map((s,i) => (
                <div key={s} className="track-step">
                  {i < TRACKING_STEPS.length-1 && <div className={`track-line ${i<step?"done":""}`} />}
                  <div className={`track-dot ${i===step?"active":i<step?"done":""}`}>{i<step?"✓":i===step?"●":""}</div>
                  <div className={`track-label ${i===step?"active":""}`}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:20, borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:16 }}>
              <div style={{ fontSize:12, color:"#7A6A55", marginBottom:8 }}>Items ordered:</div>
              {found.items.map(i => (
                <div key={i.id} style={{ display:"flex", justifyContent:"space-between", fontSize:13, padding:"4px 0" }}>
                  <span>{i.name} × {i.qty}</span>
                  <span style={{ color:"#C8972A" }}>₹{i.price*i.qty}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", fontWeight:600, borderTop:"1px solid rgba(200,151,42,0.15)", marginTop:8, paddingTop:8 }}>
                <span>Total</span><span style={{ color:"#C8972A" }}>₹{found.total}</span>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 && !found && (
          <div style={{ textAlign:"center", padding:"40px 0", color:"#7A6A55" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📦</div>
            Koi order nahi hai abhi. Pehle order karein.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// REVIEWS — FIX: safeAvg + error handling
// ============================================================
function Reviews({ showToast }) {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [form, setForm]       = useState({ name:"", rating:5, comment:"" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };

  const validate = () => {
    const e = {};
    if (!validators.name(form.name))     e.name    = "Naam likhna zaroori hai";
    if (form.comment.trim().length < 10) e.comment = "Review thodi lambi likhein (kam se kam 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("reviews").insert({ name: form.name, rating: form.rating, comment: form.comment });
      if (error) throw error;
      setReviews(r => [{ id:Date.now(), ...form, date: new Date().toLocaleDateString("en-IN") }, ...r]);
      setForm({ name:"", rating:5, comment:"" });
      showToast("✅ Review submit ho gaya!");
    } catch (err) {
      console.error("Review error:", err);
      showToast("❌ Review fail hua! Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  // FIX #6: NaN-safe average
  const avg = safeAvg(reviews);

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section" style={{ maxWidth:680 }}>
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Customers Kya Kehte Hain</p>
        <h1 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:8 }}>Reviews</h1>
        <div className="gold-line" style={{ margin:"0 0 16px 0" }} />
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:40 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:48, color:"#C8972A", fontWeight:700 }}>{avg}</span>
          <div>
            <Stars n={Math.round(Number(avg))} />
            <div style={{ fontSize:12, color:"#7A6A55" }}>{reviews.length} reviews</div>
          </div>
        </div>

        <div style={{ background:"#1E1208", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:20, marginBottom:32 }}>
          <div style={{ fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:"#C8972A", marginBottom:16 }}>Review Likhein</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <input className={`input ${errors.name?"error":""}`} placeholder="Aapka Naam" value={form.name} onChange={e=>set("name",e.target.value)} />
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>
            <div style={{ display:"flex", gap:4 }}>
              {[1,2,3,4,5].map(n=>(
                <button key={n} onClick={()=>set("rating",n)}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:24, color:n<=form.rating?"#C8972A":"#7A6A55", transition:"color 0.15s" }}>★</button>
              ))}
            </div>
            <div>
              <textarea className={`input ${errors.comment?"error":""}`} placeholder="Aapka experience share karein..." rows={3} value={form.comment} onChange={e=>set("comment",e.target.value)} style={{ resize:"vertical" }} />
              {errors.comment && <p className="error-msg">{errors.comment}</p>}
            </div>
            <button className="btn-gold" onClick={submit} disabled={loading} style={{ alignSelf:"flex-start" }}>
              {loading ? <><span className="spinner" /> Submitting...</> : "Review Submit Karein"}
            </button>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {reviews.map(r => (
            <div key={r.id} className="card" style={{ padding:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:8 }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:15 }}>{r.name}</span>
                <span style={{ fontSize:11, color:"#7A6A55" }}>{r.date}</span>
              </div>
              <Stars n={Number(r.rating)} />
              <p style={{ marginTop:8, fontSize:13, color:"#7A6A55", lineHeight:1.6 }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN — FIX #4: Supabase Realtime subscription
// ============================================================
function Admin({ orders, setOrders, showToast }) {
  const [loading, setLoading] = useState(false);

  const mapOrder = useCallback((o) => ({
    id: o.id, name: o.customer_name, phone: o.phone,
    address: o.address, total: o.total, status: o.status,
    trackStep: o.track_step, items: o.items || [],
    date: new Date(o.created_at).toLocaleDateString("en-IN"),
    time: new Date(o.created_at).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
  }), []);

  useEffect(() => {
    // Initial fetch
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending:false });
        if (error) throw error;
        if (data) setOrders(data.map(mapOrder));
      } catch (err) {
        console.error("Fetch orders error:", err);
        showToast("❌ Orders load nahi hue. Page refresh karein.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    // FIX #4: Realtime subscription — naye orders automatically aayenge
    const channel = supabase
      .channel("admin-orders-realtime")
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"orders" }, (payload) => {
        setOrders(prev => [mapOrder(payload.new), ...prev]);
        showToast("🔔 Naya Order Aaya!");
      })
      .on("postgres_changes", { event:"UPDATE", schema:"public", table:"orders" }, (payload) => {
        setOrders(prev => prev.map(o => o.id === payload.new.id ? mapOrder(payload.new) : o));
      })
      .subscribe();

    return () => supabase.removeChannel(channel); // FIX #4: cleanup
  }, [mapOrder, setOrders, showToast]);

  const revenue = orders.reduce((s,o) => s + o.total, 0);
  const statusColor = { "Order Placed":"#7A6A55", "Confirmed":"#E2B94B", "Preparing":"#f59e0b", "Out for Delivery":"#3b82f6", "Delivered":"#22c55e" };

  const advance = async (id) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const next = Math.min(order.trackStep + 1, 4);
    try {
      const { error } = await supabase.from("orders").update({ track_step:next, status:TRACKING_STEPS[next] }).eq("id", id);
      if (error) throw error;
      setOrders(prev => prev.map(o => o.id !== id ? o : {...o, trackStep:next, status:TRACKING_STEPS[next]}));
      showToast(`✅ Order ${id} → ${TRACKING_STEPS[next]}`);
    } catch (err) {
      console.error("Advance error:", err);
      showToast("❌ Status update fail hua!");
    }
  };

  return (
    <div className="page" style={{ paddingTop:80 }}>
      <div className="section">
        <p style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#C8972A", marginBottom:8 }}>Owner Panel</p>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <h1 className="display" style={{ fontSize:40, fontWeight:700 }}>Admin Dashboard</h1>
          {/* FIX #4: Realtime indicator */}
          <span style={{ fontSize:12, color:"#22c55e", display:"flex", alignItems:"center", paddingBottom:4 }}>
            <span className="realtime-dot" />Live
          </span>
        </div>
        <div className="gold-line" style={{ margin:"0 0 32px 0" }} />

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:40 }}>
          {[
            ["Total Orders", orders.length, "📦"],
            ["Revenue", `₹${revenue}`, "💰"],
            ["Pending", orders.filter(o=>o.trackStep<4).length, "⏳"],
            ["Delivered", orders.filter(o=>o.trackStep===4).length, "✅"],
          ].map(([l,v,e]) => (
            <div key={l} style={{ background:"#1E1208", border:"1px solid rgba(200,151,42,0.15)", borderRadius:4, padding:20, textAlign:"center" }}>
              <div style={{ fontSize:28 }}>{e}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"#C8972A", fontWeight:700 }}>{v}</div>
              <div style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"#7A6A55", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"#1E1208", border:"1px solid rgba(200,151,42,0.12)", borderRadius:4, overflowX:"auto" }}>
          <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(200,151,42,0.12)", fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:"#C8972A" }}>
            Recent Orders
          </div>
          {loading ? (
            <div style={{ padding:40, textAlign:"center", color:"#7A6A55" }}>
              <span className="spinner" style={{ width:24, height:24, borderWidth:3 }} /> Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding:"40px", textAlign:"center", color:"#7A6A55" }}>Koi order nahi aaya abhi</div>
          ) : (
            <table>
              <thead>
                <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ color:"#C8972A", fontFamily:"monospace" }}>{o.id}</td>
                    <td>
                      <div style={{ fontWeight:500 }}>{o.name}</div>
                      <div style={{ fontSize:11, color:"#7A6A55" }}>{o.phone}</div>
                    </td>
                    <td style={{ color:"#7A6A55", fontSize:12, maxWidth:180 }}>{o.items.map(i=>i.name+"×"+i.qty).join(", ")}</td>
                    <td style={{ color:"#C8972A", fontWeight:600 }}>₹{o.total}</td>
                    <td><span style={{ color:statusColor[TRACKING_STEPS[o.trackStep]]||"#7A6A55", fontSize:12 }}>{TRACKING_STEPS[o.trackStep]}</span></td>
                    <td>
                      {o.trackStep < 4 ? (
                        <button className="btn-outline" style={{ fontSize:11, padding:"5px 12px" }} onClick={()=>advance(o.id)}>Advance →</button>
                      ) : (
                        <span style={{ fontSize:12, color:"#22c55e" }}>✓ Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ROOT APP — FIX #1: localStorage persistence
// ============================================================
export default function App() {
  // FIX #1: Cart localStorage se initialize hogi
  const [cart, setCart] = useState(() => storage.get("dd_cart", []));
  // FIX #1: Orders localStorage se initialize honge
  const [orders, setOrders] = useState(() => storage.get("dd_orders", []));
  const [page, setPage]     = useState("home");
  const [toast, setToast]   = useState(null);

  // FIX #1: Cart change hone par localStorage mein save karo
  useEffect(() => { storage.set("dd_cart", cart); }, [cart]);
  // FIX #1: Orders change hone par localStorage mein save karo
  useEffect(() => { storage.set("dd_orders", orders); }, [orders]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = useCallback((item) => {
    if (item.remove) {
      // FIX #1: findLastIndex polyfill — reverse filter
      setCart(c => {
        let removed = false;
        return [...c].reverse().filter(x => {
          if (!removed && x.id === item.id) { removed = true; return false; }
          return true;
        }).reverse();
      });
    } else {
      setCart(c => [...c, item]);
      showToast(`✦ ${item.name} cart mein add ho gaya`);
    }
  }, [showToast]);

  return (
    <>
      <GlobalStyle />
      <Nav page={page} setPage={setPage} cartCount={cart.length} />
      {toast && <div className="toast">{toast}</div>}

      {page === "home"    && <Home setPage={setPage} />}
      {page === "menu"    && <MenuPage addToCart={addToCart} cart={cart} />}
      {page === "cart"    && <Cart cart={cart} setCart={setCart} setPage={setPage} showToast={showToast} />}
      {page === "payment" && <Payment cart={cart} setCart={setCart} setPage={setPage} setOrders={setOrders} showToast={showToast} />}
      {page === "reserve" && <Reserve showToast={showToast} />}
      {page === "track"   && <TrackOrder orders={orders} />}
      {page === "reviews" && <Reviews showToast={showToast} />}
      {page === "admin"   && <Admin orders={orders} setOrders={setOrders} showToast={showToast} />}
    </>
  );
}
