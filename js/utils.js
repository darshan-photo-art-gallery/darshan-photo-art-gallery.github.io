/* ============================================================
   DARSHAN PHOTO ART GALLERY — UTILITIES & HELPERS (utils.js)
   ============================================================ */

/**
 * Escapes HTML characters to prevent XSS.
 */
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  if (typeof str !== 'string') return String(str);
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// SHA-256 digest of the initial admin password.
const DEFAULT_ADMIN_HASH = '0b851c70c888aaa33b0295d10cb9504c12766a0c4d4dee2f89f229946ece263e';

/**
 * SHA-256 Web Crypto Hashing for Admin Passwords.
 */
async function hashPassword(pwd) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pwd + '_DPAG_SALT_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates direct WhatsApp chat link with custom message.
 */
function waLink(message) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Generates WhatsApp inquiry pre-filled message for a product.
 */
function productMessage(name, size, color) {
  let msg = `Namaste 🙏 Darshan Photo Art Gallery,\nI'm interested in "${name}".`;
  if (size) msg += `\nSize: ${size}`;
  if (color) msg += `\nColor: ${color}`;
  msg += `\nPlease share pricing & order details.`;
  return msg;
}

/**
 * Formats price in INR currency.
 */
function formatPrice(v) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(v || 0);
}

/**
 * Calculates percentage discount between regular price and offer price.
 */
function discount(price, offer) {
  return offer && offer < price ? Math.round(((price - offer) / price) * 100) : 0;
}

/**
 * Displays floating toast message notification with auto-fadeout.
 */
let toastTimeout = null;

function showToast(msg, duration = 1800) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.classList.remove('show');
  }, duration);
}

/**
 * Normalizes media URL relative to root / GitHub Pages path.
 */
function safeMediaUrl(u) {
  if (!u) return '';
  u = String(u).trim();
  if (/^(data:|blob:|https?:)/i.test(u)) return u;
  try {
    return u.split('/').map(part => encodeURIComponent(decodeURIComponent(part))).join('/');
  } catch (e) {
    return u;
  }
}
