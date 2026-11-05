(function () {
  'use strict';

  // --- Lightweight security helpers for a static, client-side site ---

  // 1. Content Security Policy via meta tag (runtime-injected so it covers
  //    dynamically created inline handlers; CSP meta can't use nonces reliably,
  //    so we keep it restrictive but allow the inline scripts already in pages).
  function injectCSP() {
    if (document.querySelector('meta[http-equiv="Content-Security-Policy"]')) return;
    var csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.tailwindcss.com https://cdn.jsdelivr.net/npm/mermaid@11",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'"
    ].join('; ');
    var meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'Content-Security-Policy');
    meta.setAttribute('content', csp);
    document.head.appendChild(meta);
  }

  // 2. Block obvious script/attribute injection (XSS) in any string we render.
  function sanitize(input) {
    if (input === null || input === undefined) return '';
    return String(input).replace(/[&<>"']/g, function (ch) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[ch];
    });
  }

  // 3. LocalStorage access with try/catch (privacy mode / quota errors).
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  // 4. Only allow URLs that are http(s) (blocks "javascript:" links etc.)
  function safeUrl(value) {
    if (!value) return '';
    if (/^(https?:)?\/\//i.test(value)) return value;
    if (/^data:image\//i.test(value)) return value;
    return '';
  }

  // 5. Reject IDs that aren't integers (defends against weird admin inputs).
  function safeId(value) {
    var n = Number(value);
    return Number.isInteger(n) && n > 0 ? n : null;
  }

  // 6. Hardening headers can't be set from the browser, but we can detect and
  //    warn the developer when the page isn't served with security headers.
  function checkHeaders() {
    // Placeholder: with a real server you'd add these headers:
    //   X-Content-Type-Options: nosniff
    //   X-Frame-Options: SAMEORIGIN
    //   Referrer-Policy: strict-origin-when-cross-origin
    //   Permissions-Policy: camera=(), microphone=(), geolocation=()
    // In a static host, configure them in your web server / host dashboard.
  }

  // 7. Password hashing (Web Crypto SHA-256). Only the hash is stored.
  var PW_PREFIX = 'hash$';
  function bytesToHex(bytes) {
    return Array.prototype.map.call(bytes, function (b) {
      return ('0' + (b & 0xff).toString(16)).slice(-2);
    }).join('');
  }
  function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle) {
      // Fallback (non-HTTPS / older): simple FNV-ish hash so we NEVER store plaintext.
      var h = 2166136261;
      var s = PW_PREFIX + String(password);
      for (var i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return Promise.resolve(PW_PREFIX + (h >>> 0).toString(16));
    }
    return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(PW_PREFIX + password))
      .then(function (buf) { return PW_PREFIX + bytesToHex(new Uint8Array(buf)); });
  }
  function isHashed(pw) {
    return typeof pw === 'string' && pw.indexOf(PW_PREFIX) === 0;
  }

  // 8. Login rate-limiting / lockout (local brute-force protection).
  var LIMIT_KEY = 'appora_login_attempts';
  var THRESHOLD = 5;
  function readLimits() {
    try { return JSON.parse(localStorage.getItem(LIMIT_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function writeLimits(obj) {
    try { localStorage.setItem(LIMIT_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  function getLockStatus(identity) {
    var limits = readLimits();
    var rec = limits[identity] || {};
    var now = Date.now();
    if (rec.lockUntil && now < rec.lockUntil) {
      return { locked: true, waitMs: rec.lockUntil - now, count: rec.count || 0 };
    }
    return { locked: false, count: rec.count || 0 };
  }
  function recordAttempt(identity, ok) {
    var limits = readLimits();
    var rec = limits[identity] || { count: 0, lockUntil: 0 };
    if (ok) {
      delete limits[identity];
      writeLimits(limits);
      return null;
    }
    rec.count = (rec.count || 0) + 1;
    if (rec.count >= THRESHOLD) {
      var cooldown = 30000 * Math.pow(2, rec.count - THRESHOLD); // 30s, 60s, 120s...
      rec.lockUntil = Date.now() + Math.min(cooldown, 1800000); // cap 30min
    }
    limits[identity] = rec;
    writeLimits(limits);
    return { count: rec.count, lockUntil: rec.lockUntil };
  }

  // 9. Honeypot: reject submissions where a hidden trap field is filled.
  function honeypotValue(form) {
    if (!form) return '';
    var trap = form.querySelector('[data-honeypot]');
    return trap ? (trap.value || '').trim() : '';
  }
  function isBot(form) {
    return honeypotValue(form) !== '';
  }

  function init() {
    injectCSP();
    window.ApporaSecurity = {
      sanitize: sanitize,
      safeGet: safeGet,
      safeSet: safeSet,
      safeRemove: safeRemove,
      safeUrl: safeUrl,
      safeId: safeId,
      hashPassword: hashPassword,
      isHashed: isHashed,
      getLockStatus: getLockStatus,
      recordAttempt: recordAttempt,
      isBot: isBot,
      honeypotValue: honeypotValue
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
