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
 * Displays floating toast message notification.
 */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
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

/**
 * Canvas Image Compressor (HD clarity up to 900px @ 0.72 quality).
 */
function compressImage(file, maxWidth = 900, maxHeight = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > h) {
          if (w > maxWidth) { h = Math.round((h * maxWidth) / w); w = maxWidth; }
        } else {
          if (h > maxHeight) { w = Math.round((w * maxHeight) / h); h = maxHeight; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        let out = canvas.toDataURL('image/jpeg', quality);
        let q = quality;
        while (out.length > 350000 && q > 0.4) {
          q -= 0.1;
          out = canvas.toDataURL('image/jpeg', q);
        }
        resolve(out);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
