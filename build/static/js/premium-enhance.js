/**
 * ARMenu — Premium UI Enhancement Layer
 * Injects SVG icons, liquid glass effects, micro-animations
 * Zero dependency — runs after React mounts
 */
(function () {
  'use strict';

  /* ── SVG Icon Library ─────────────────────────────────────────────── */
  const ICONS = {
    dashboard:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    menu:         `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`,
    orders:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
    tables:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M3 7v12M21 7v12M3 12h18M8 7v12M16 7v12"/></svg>`,
    analytics:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
    restaurants:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    admins:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    categories:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h8M4 18h12"/></svg>`,
    settings:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    logout:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
    plus:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    edit:         `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash:        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
    qr:           `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3"/></svg>`,
    check:        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    x:            `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    search:       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    star:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    clock:        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    ar:           `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    cart:         `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
    phone:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.13 1.17 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 7.5A16 16 0 0016.5 17.59l.94-.94a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0124 19z"/></svg>`,
    tag:          `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    restaurant:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    fire:         `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23a7 7 0 01-7-7c0-2.38 1.19-4.47 3-5.74V11c0 .55.45 1 1 1s1-.45 1-1 .45-1 1-1 1 .45 1 1v.91c.65.45 1.18 1.01 1.58 1.64C14.67 11.63 15.9 10 17 8c0 0 1 .5 1 2 1-1 1-2.5.5-3.5C20.5 8 22 10.33 22 13a10 10 0 01-10 10z"/></svg>`,
    leaf:         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 014 13V6a7 7 0 017-7 7 7 0 017 7v7a7 7 0 01-7 7z"/><path d="M11 20v-9"/></svg>`,
    chevronRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    mapPin:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    eye:          `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    user:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    lock:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    alert:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    download:     `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    copy:         `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
    send:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  };

  /* ── Emoji → SVG mapping ──────────────────────────────────────────── */
  const EMOJI_MAP = {
    '🍽️': ICONS.restaurant,
    '🍴': ICONS.restaurant,
    '📋': ICONS.orders,
    '🪑': ICONS.tables,
    '📊': ICONS.analytics,
    '🏪': ICONS.restaurants,
    '👥': ICONS.admins,
    '🗂️': ICONS.categories,
    '⚙️': ICONS.settings,
    '🚪': ICONS.logout,
    '➕': ICONS.plus,
    '✏️': ICONS.edit,
    '🗑️': ICONS.trash,
    '📱': ICONS.qr,
    '✅': ICONS.check,
    '❌': ICONS.x,
    '🔍': ICONS.search,
    '⭐': ICONS.star,
    '🕐': ICONS.clock,
    '🛒': ICONS.cart,
    '📦': ICONS.orders,
    '🏠': ICONS.restaurants,
    '🔥': ICONS.fire,
    '🌿': ICONS.leaf,
    '📍': ICONS.mapPin,
    '👁': ICONS.eye,
    '👤': ICONS.user,
    '🔒': ICONS.lock,
    '⚠️': ICONS.alert,
    'ℹ️': ICONS.info,
    '💾': ICONS.download,
    '📤': ICONS.send,
    '📝': ICONS.edit,
    '🍕': ICONS.restaurant,
    '🥗': ICONS.leaf,
  };

  /* ── Replace emoji text nodes with SVG ───────────────────────────── */
  function replaceEmojis(root) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, null, false);
    const toProcess = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(node.nodeValue)) {
        toProcess.push(node);
      }
    }

    toProcess.forEach(textNode => {
      let html = textNode.nodeValue;
      let changed = false;
      for (const [emoji, svg] of Object.entries(EMOJI_MAP)) {
        if (html.includes(emoji)) {
          html = html.split(emoji).join(`<span class="svg-icon" style="display:inline-flex;align-items:center;vertical-align:middle;opacity:0.85">${svg}</span>`);
          changed = true;
        }
      }
      if (changed) {
        const span = document.createElement('span');
        span.innerHTML = html;
        if (textNode.parentNode) {
          textNode.parentNode.replaceChild(span, textNode);
        }
      }
    });
  }

  /* ── Inject cursor glow ───────────────────────────────────────────── */
  function initCursorGlow() {
    const dot = document.createElement('div');
    dot.id = 'cursor-glow';
    dot.style.cssText = `
      position: fixed; pointer-events: none; z-index: 99999;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      will-change: transform;
    `;
    document.body.appendChild(dot);

    let x = 0, y = 0;
    let targetX = 0, targetY = 0;
    let raf;

    document.addEventListener('mousemove', e => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });

    function animate() {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      raf = requestAnimationFrame(animate);
    }
    animate();
  }

  /* ── Add liquid ripple to buttons ────────────────────────────────── */
  function initRipple(el) {
    if (el._rippleInit) return;
    el._rippleInit = true;
    el.addEventListener('click', function(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position: absolute;
        left: ${x - size/2}px; top: ${y - size/2}px;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.12);
        transform: scale(0);
        pointer-events: none;
        z-index: 1;
        animation: rippleEffect 0.55s var(--ease-out) forwards;
      `;
      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ── Inject ripple keyframe ──────────────────────────────────────── */
  function injectGlobalStyles() {
    const s = document.createElement('style');
    s.textContent = `
      @keyframes rippleEffect {
        to { transform: scale(1); opacity: 0; }
      }
      .btn { position: relative; overflow: hidden; }

      /* Premium number font for stats */
      [style*="2rem"], [style*="1.8rem"], [style*="1.6rem"] {
        font-variant-numeric: tabular-nums;
      }

      /* Smooth page transitions */
      #root > * { animation: pageEnter 0.4s cubic-bezier(0.16,1,0.3,1) both; }
      @keyframes pageEnter {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Sidebar item hover glow */
      .ra-sidebar button:hover {
        background: rgba(212,168,83,0.08) !important;
        color: var(--gold) !important;
      }

      /* Liquid glass shimmer on cards */
      .card { will-change: transform; }

      /* Enhanced focus ring */
      .btn:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible {
        outline: 2px solid rgba(212,168,83,0.6) !important;
        outline-offset: 3px !important;
      }

      /* Empty state icon replacement */
      .empty-state-icon { display: none !important; }
      .empty-state::before {
        content: '' !important;
        display: block;
        width: 52px; height: 52px;
        margin: 0 auto 12px;
        border: 1.5px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        background: rgba(255,255,255,0.03);
        position: relative;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(212,168,83,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='12'/%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 22px;
      }

      /* Recharts premium tooltip */
      .recharts-tooltip-wrapper .recharts-default-tooltip {
        background: rgba(15,13,17,0.95) !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        backdrop-filter: blur(16px) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
      }

      /* Status indicator dots */
      .status-pending::before, .status-confirmed::before,
      .status-preparing::before, .status-ready::before,
      .status-served::before, .status-cancelled::before {
        content: '';
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: middle;
        background: currentColor;
        animation: statusPulse 2s ease-in-out infinite;
      }
      @keyframes statusPulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.5; transform:scale(0.8); }
      }
      .status-served::before, .status-cancelled::before {
        animation: none;
      }

      /* Gold gradient text for ARMenu logo */
      [style*="Playfair Display, serif"][style*="2rem"],
      [style*="Cormorant Garamond"][style*="2rem"] {
        background: linear-gradient(135deg, #d4a853 0%, #f0c97a 50%, #d4a853 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }

      /* Sidebar logo */
      .ra-sidebar [style*="Playfair"],
      .ra-sidebar [style*="1.1rem"] {
        background: linear-gradient(135deg, #d4a853, #f0c97a) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }

      /* Table row hover */
      tbody tr { transition: background 0.15s ease; }

      /* Input group label animation */
      .input-label { transition: color 0.2s ease; }
      .input:focus ~ .input-label { color: var(--gold) !important; }

      /* Card entering animation */
      .animate-fade {
        animation: premiumFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both !important;
      }
      @keyframes premiumFadeUp {
        from { opacity:0; transform:translateY(10px) scale(0.99); }
        to   { opacity:1; transform:translateY(0) scale(1); }
      }

      /* Badge pulse for active indicators */
      .badge-success { animation: badgeGlow 2.5s ease-in-out infinite; }
      @keyframes badgeGlow {
        0%,100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        50%      { box-shadow: 0 0 0 4px rgba(52,211,153,0.1); }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── Card tilt effect ────────────────────────────────────────────── */
  function initCardTilt(el) {
    if (el._tiltInit) return;
    el._tiltInit = true;

    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.005)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease';
    });
  }

  /* ── Number counter animation ────────────────────────────────────── */
  function animateNumber(el) {
    if (el._animated) return;
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;
    el._animated = true;

    const prefix = text.match(/^[^0-9]*/)?.[0] || '';
    const suffix = text.match(/[^0-9.]*$/)?.[0] || '';
    const duration = 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      el.textContent = prefix + (Number.isInteger(num) ? Math.round(current) : current.toFixed(2)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ── Observe & enhance DOM mutations ────────────────────────────── */
  function enhanceElements() {
    // Ripple on all buttons
    document.querySelectorAll('.btn').forEach(initRipple);

    // Emoji replacement
    replaceEmojis(document.body);

    // Card tilt on stat cards (not form cards)
    document.querySelectorAll('.card').forEach(card => {
      // Only tilt small stat cards, not form modals
      if (card.closest('.modal') || card.querySelector('form') || card.querySelector('.input')) return;
      if (card.offsetWidth > 500) return; // skip wide cards
    });

    // Animate numbers in stat displays
    document.querySelectorAll('[style*="2rem"], [style*="1.8rem"]').forEach(el => {
      if (el.closest('.modal')) return;
      if (/^\s*[$Rs.]?[\d,]+\.?\d*\s*$/.test(el.textContent.trim())) {
        animateNumber(el);
      }
    });
  }

  /* ── Intersection Observer for scroll animations ─────────────────── */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms`;
      observer.observe(card);
    });
  }

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    injectGlobalStyles();
    initCursorGlow();

    // Wait for React to render
    const timer = setInterval(() => {
      if (document.querySelector('.btn') || document.querySelector('.card')) {
        clearInterval(timer);
        enhanceElements();

        // MutationObserver for dynamic content
        const mo = new MutationObserver(() => {
          enhanceElements();
        });
        mo.observe(document.body, { childList: true, subtree: true });
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
