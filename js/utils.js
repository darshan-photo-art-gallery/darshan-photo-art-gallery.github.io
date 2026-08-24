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
  if (!u) return 'images/products/1.jpeg';
  u = String(u).trim();
  if (/^(data:|blob:|https?:)/i.test(u)) return u;
  try {
    return u.split('/').map(part => encodeURIComponent(decodeURIComponent(part))).join('/');
  } catch (e) {
    return u;
  }
}

/**
 * Helper to check WebP canvas encoding support in client browser.
 */
let _webpCanvasSupported = null;
function isWebpCanvasSupported() {
  if (_webpCanvasSupported !== null) return _webpCanvasSupported;
  try {
    const c = document.createElement('canvas');
    if (c.getContext && c.getContext('2d')) {
      _webpCanvasSupported = c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } else {
      _webpCanvasSupported = false;
    }
  } catch (e) {
    _webpCanvasSupported = false;
  }
  return _webpCanvasSupported;
}

/**
 * Reads, validates, and optimizes uploaded image files to WebP / JPEG format.
 * Target: Max 2000px longest side, 85% WebP quality / 88% JPEG quality.
 * Preserves original aspect ratio and prevents double-compression.
 */
function compressImage(file, maxW = 2000, maxH = 2000, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error('No file provided')); return; }

    // If already a Data URL or URL string
    if (typeof file === 'string') {
      resolve(file);
      return;
    }

    // File size validation (safety limit 50MB)
    if (file.size && file.size > 50 * 1024 * 1024) {
      reject(new Error('Image file is too large (max 50MB). Please select a smaller file.'));
      return;
    }

    const isPNG = file.type === 'image/png';
    const isWebPFile = file.type === 'image/webp';

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        // Skip re-compression if image is under max dimensions and already WebP or light PNG
        if (w <= maxW && h <= maxH && (isWebPFile || (isPNG && file.size < 600 * 1024))) {
          resolve(e.target.result);
          return;
        }

        // Calculate proportional dimensions (preserve exact aspect ratio)
        if (w > maxW || h > maxH) {
          if (w > h) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          } else {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // High quality bicubic image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        let targetMime = 'image/jpeg';
        let targetQuality = Math.max(quality, 0.85);

        if (isWebpCanvasSupported()) {
          targetMime = 'image/webp';
          targetQuality = 0.85; // 85% WebP quality per specification
        } else if (isPNG) {
          targetMime = 'image/png';
        } else {
          targetMime = 'image/jpeg';
          targetQuality = 0.88; // 88% JPEG fallback quality per specification
        }

        // Fill background white only for JPEG output to prevent black transparent areas
        if (targetMime === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, w, h);
        }

        ctx.drawImage(img, 0, 0, w, h);

        try {
          const res = canvas.toDataURL(targetMime, targetQuality);
          resolve(res);
        } catch (err) {
          resolve(e.target.result);
        }
      };
      img.onerror = () => reject(new Error('Invalid or corrupted image file.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

if (typeof window !== 'undefined') {
  window.escapeHTML = escapeHTML;
  window.hashPassword = hashPassword;
  window.waLink = waLink;
  window.productMessage = productMessage;
  window.formatPrice = formatPrice;
  window.discount = discount;
  window.showToast = showToast;
  window.safeMediaUrl = safeMediaUrl;
  window.isWebpCanvasSupported = isWebpCanvasSupported;
  window.compressImage = compressImage;
}
