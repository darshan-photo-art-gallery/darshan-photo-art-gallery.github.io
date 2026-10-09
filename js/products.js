/* ============================================================
   DARSHAN PHOTO ART GALLERY \u00e2\u20ac\u201d PRODUCTS & STORE SYSTEM (products.js)
   ============================================================ */

const SITE = {
  name: "Darshan Photo Art Gallery",
  tagline: "Frames That Turn Memories Into Art.",
  phone: "+91 9723202162",
  phoneRaw: "919723202162",
  whatsapp: "919723202162",
  email: "jigarbhati1234@gmail.com",
  address: "05, \u0a8b\u0ab7\u0aad \u0a95\u0acb\u0aae\u0acd\u0aaa\u0ab2\u0ac7\u0a95\u0acd\u0ab7 \u0aac\u0acd\u0ab2\u0acb\u0a95-2 \u0a9c\u0ab2\u0abe\u0ab0\u0abe\u0aae\u0aa8\u0abe \u0aae\u0a82\u0aa6\u0abf\u0ab0 \u0aa8\u0ac0 \u0aaa\u0abe\u0a9b\u0ab3 \u0a9c\u0ac1\u0aa8\u0abe \u0a97\u0abe\u0aaf\u0aa4\u0acd\u0ab0\u0ac0 \u0aae\u0a82\u0aa6\u0abf\u0ab0 \u0aa8\u0ac0 \u0ab8\u0abe\u0aae\u0ac7 , \u0aa1\u0ac0\u0ab8\u0abe, \u0aa4\u0abe. \u0aa1\u0ac0\u0ab8\u0abe, \u0a9c\u0ac0. \u0aac\u0aa8\u0abe\u0ab8\u0a95\u0abe\u0a82\u0aa0\u0abe, \u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4, \u0aad\u0abe\u0ab0\u0aa4- 38 55 35",
  founded: 1995,
  social: {
    instagram: "https://instagram.com/jigar_bhati_21_62",
    facebook: "https://facebook.com/DarshanPhotoArtGallery",
    youtube: "https://youtube.com/@JigarBhati2162",
    pinterest: "https://pinterest.com/darshanphotoartgallery",
  },
  stats: [
    { label: "Years of Legacy", labelGu: "\u0ab5\u0ab0\u0acd\u0ab7\u0acb\u0aa8\u0acb \u0ab5\u0abe\u0ab0\u0ab8\u0acb", value: 30, suffix: "+" },
    { label: "Happy Families", labelGu: "\u0a96\u0ac1\u0ab6 \u0aaa\u0ab0\u0abf\u0ab5\u0abe\u0ab0\u0acb", value: 25000, suffix: "+" },
    { label: "Frames Crafted", labelGu: "\u0aac\u0aa8\u0abe\u0ab5\u0ac7\u0ab2\u0ac0 \u0aab\u0acd\u0ab0\u0ac7\u0aae\u0acd\u0ab8", value: 120000, suffix: "+" },
    { label: "Google Rating", labelGu: "\u0a97\u0ac2\u0a97\u0ab2 \u0ab0\u0ac7\u0a9f\u0abf\u0a82\u0a97", value: 4.9, suffix: "/5" },
  ],
  hours: [
    { day: "Monday - Saturday", time: "10:00 AM - 5:00 PM" },
    { day: "Sunday", time: "11:00 AM - 6:00 PM" },
  ],
};

const I18N = {
  en: {
    home: "Home",
    catalog: "Catalog",
    gallery: "Gallery",
    offers: "Offers",
    about: "About",
    contact: "Contact",
    whatsappUs: "WhatsApp Us",
    heroHeadline: `<span class="font-gujarati text-black font-black">\u0aa6\u0ab0\u0acd\u0ab6\u0aa8 \u0aab\u0acb\u0a9f\u0acb \u0a86\u0ab0\u0acd\u0a9f \u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0</span>`
  },
  gu: {
    home: "\u0ab9\u0acb\u0aae",
    catalog: "\u0a95\u0ac7\u0a9f\u0ac7\u0ab2\u0acb\u0a97",
    gallery: "\u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0",
    offers: "\u0a91\u0aab\u0ab0\u0acd\u0ab8",
    about: "\u0a85\u0aae\u0abe\u0ab0\u0abe \u0ab5\u0abf\u0ab6\u0ac7",
    contact: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95",
    whatsappUs: "\u0ab5\u0acb\u0a9f\u0acd\u0ab8\u0a8f\u0aaa \u0a95\u0ab0\u0acb",
    heroHeadline: `<span class="font-gujarati text-black font-black">\u0aa6\u0ab0\u0acd\u0ab6\u0aa8 \u0aab\u0acb\u0a9f\u0acb \u0a86\u0ab0\u0acd\u0a9f \u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0</span>`
  },
};

function safeGetStorage(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

let currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('dpag_lang')) || 'en';

// Central State Store
const STORE = {
  wishlist: safeGetStorage('dpag_wishlist', []),
  compare: safeGetStorage('dpag_compare', []),
  recentlyViewed: safeGetStorage('dpag_recent', []),
  adminUser: safeGetStorage('dpag_admin', null),
  products: safeGetStorage('dpag_products', []),
  categories: safeGetStorage('dpag_categories', []),
  offers: safeGetStorage('dpag_offers', []),
  gallery: safeGetStorage('dpag_gallery', []),
  subscribers: safeGetStorage('dpag_subscribers', []),
  adminTab: 'products',
};

// Async data loader from JSON files if LocalStorage is empty
async function loadDataStoreFromJSON() {
  try {
    // Merge helper: Local/cached data takes precedence, but fills missing from bundled JSON
    const mergeData = (primaryData, secondaryData) => {
      const p = Array.isArray(primaryData) ? primaryData : [];
      const s = Array.isArray(secondaryData) ? secondaryData : [];
      if (!p.length) return s;
      if (!s.length) return p;
      const seen = new Set(p.map(x => (x.slug || x.id || '').toLowerCase().trim()));
      const missing = s.filter(x => !seen.has((x.slug || x.id || '').toLowerCase().trim()));
      return [...p, ...missing];
    };

    const resCat = await fetch('data/categories.json');
    if (resCat.ok) {
      const fetchedCats = await resCat.json();
      STORE.categories = mergeData(STORE.categories, fetchedCats);
    }

    const resProd = await fetch('data/products.json');
    if (resProd.ok) {
      const fetchedProds = await resProd.json();
      // If STORE.products already has user-added products (like in localStorage), do not overwrite them!
      STORE.products = mergeData(STORE.products, fetchedProds);
    }

    const resOff = await fetch('data/offers.json');
    if (resOff.ok) STORE.offers = mergeData(STORE.offers, await resOff.json());

    const resGal = await fetch('data/gallery.json');
    if (resGal.ok) STORE.gallery = mergeData(STORE.gallery, await resGal.json());
  } catch (err) {
    console.warn('JSON Fetch Notice:', err);
  }
}

// Local Storage & Cloud Store Persistence
const localWriteAt = {};
let isFirebaseConnected = false;

function saveStore(key) {
  const now = Date.now();
  localWriteAt[key] = now;
  const payload = JSON.stringify(STORE[key]);

  // Save to LocalStorage cache first
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('dpag_last_write_' + key, String(now));
      localStorage.setItem('dpag_' + key, payload);
    }
  } catch (err) {
    console.warn('LocalStorage quota warning:', err);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('dpag_recent');
        localStorage.setItem('dpag_' + key, payload);
      }
    } catch (e2) {}
  }

  // Save to Firebase Cloud Database if available
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps || !firebase.apps.length) {
        initFirebaseSync();
      }
      if (firebase.apps && firebase.apps.length) {
        const db = firebase.database();
        db.ref('dpag_store/' + key).set(STORE[key])
          .then(() => {
            isFirebaseConnected = true;
            updateFirebaseBadgeUI(true);
          })
          .catch(err => {
            console.error('Cloud sync error:', err);
            if (typeof showToast === 'function') {
              showToast('\u00e2\u0161\u00a0\ufe0f Cloud Write Error: ' + (err.message || 'Permission Denied'));
            }
          });
      }
    }
  } catch (err) {
    console.error('Cloud sync exception:', err);
  }
}

function updateFirebaseBadgeUI(connected) {
  isFirebaseConnected = !!connected;
  const badge = document.getElementById('firebaseStatusBadge');
  if (badge) {
    if (connected) {
      badge.className = "rounded-full px-3 py-1 text-xs font-semibold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      badge.innerHTML = '<i class="fa-solid fa-cloud-bolt mr-1"></i> Firebase Live Cloud Synced';
    } else {
      badge.className = "rounded-full px-3 py-1 text-xs font-semibold border bg-amber-500/10 text-amber-400 border-amber-500/20";
      badge.innerHTML = '<i class="fa-solid fa-database mr-1"></i> Local Storage Mode';
    }
  }
}

function initFirebaseSync() {
  const firebaseConfig = (typeof window !== 'undefined' && window.FIREBASE_CONFIG) || {
    apiKey: "AIzaSyCkGFVs9fCb5K5wqYXNL8lKdZ4p7_lx3jU",
    authDomain: "darshan-photo-art-gallery.firebaseapp.com",
    databaseURL: "https://darshan-photo-art-gallery-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "darshan-photo-art-gallery",
    storageBucket: "darshan-photo-art-gallery.firebasestorage.app",
    messagingSenderId: "467407286892",
    appId: "1:467407286892:web:392bdbf76cb7b918441e49",
    measurementId: "G-LL8P7H0GNG"
  };

  if (typeof firebase !== 'undefined' && firebaseConfig && firebaseConfig.databaseURL) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const db = firebase.database();

      // Listen for Firebase Connection state
      db.ref('.info/connected').on('value', snap => {
        const connected = snap.val() === true;
        isFirebaseConnected = connected;
        updateFirebaseBadgeUI(connected);
        if (connected && typeof getRoute === 'function' && getRoute().startsWith('admin')) {
          const badge = document.getElementById('firebaseStatusBadge');
          if (badge) {
            badge.className = "rounded-full px-3 py-1 text-xs font-semibold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            badge.innerHTML = '<i class="fa-solid fa-cloud-bolt mr-1"></i> Firebase Live Cloud Synced';
          }
        }
      });

      const keys = ['products', 'categories', 'offers', 'gallery', 'subscribers'];

      keys.forEach(k => {
        db.ref('dpag_store/' + k).on('value', snapshot => {
          const val = snapshot.val();
          isFirebaseConnected = true;
          updateFirebaseBadgeUI(true);

          if (val && Array.isArray(val) && val.length > 0) {
            // Priority: Cloud database is the single source of truth
            STORE[k] = val;
            try {
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('dpag_' + k, JSON.stringify(val));
              }
            } catch (e) {}
            if (typeof render === 'function') render();
          } else if (STORE[k] && Array.isArray(STORE[k]) && STORE[k].length > 0) {
            // Cloud is empty for this key, populate cloud with local store
            db.ref('dpag_store/' + k).set(STORE[k]).catch(err => console.error('Cloud upload error:', err));
          }
        });
      });
    } catch (err) {
      console.warn('Firebase Sync Notice:', err);
    }
  }
}

function toggleWishlist(p) {
  if (!p) return;
  const idx = STORE.wishlist.findIndex(x => x.slug === p.slug);
  if (idx >= 0) {
    STORE.wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    STORE.wishlist.push({ slug: p.slug, name: p.name, image: p.images[0], price: p.price, offerPrice: p.offerPrice });
    showToast('Added to wishlist');
  }
  saveStore('wishlist');
  updateBadges();
}

function isWishlisted(slug) {
  return STORE.wishlist.some(x => x.slug === slug);
}

function toggleCompare(p) {
  if (!p) return;
  const idx = STORE.compare.findIndex(x => x.slug === p.slug);
  if (idx >= 0) {
    STORE.compare.splice(idx, 1);
    showToast('Removed from compare');
  } else {
    if (STORE.compare.length >= 4) { showToast('Max 4 products allowed'); return; }
    STORE.compare.push({ slug: p.slug, name: p.name, image: p.images[0], price: p.price, offerPrice: p.offerPrice, material: p.material, sizes: p.sizes, colors: p.colors });
    showToast('Added to compare');
  }
  saveStore('compare');
  updateBadges();
}

function addRecent(p) {
  if (!p) return;
  STORE.recentlyViewed = STORE.recentlyViewed.filter(x => x.slug !== p.slug);
  STORE.recentlyViewed.unshift({ slug: p.slug, name: p.name, image: p.images[0], price: p.price, offerPrice: p.offerPrice });
  STORE.recentlyViewed = STORE.recentlyViewed.slice(0, 6);
  saveStore('recentlyViewed');
}

function updateBadges() {
  const wc = document.getElementById('wishlistCount');
  const cc = document.getElementById('compareCount');
  if (wc) {
    if (STORE.wishlist.length > 0) { wc.textContent = STORE.wishlist.length; wc.style.display = 'flex'; }
    else wc.style.display = 'none';
  }
  if (cc) {
    if (STORE.compare.length > 0) { cc.textContent = STORE.compare.length; cc.style.display = 'flex'; }
    else cc.style.display = 'none';
  }
}

// Bind to global scope if available
if (typeof window !== 'undefined') {
  window.SITE = SITE;
  window.I18N = I18N;
  window.STORE = STORE;
  window.saveStore = saveStore;
  window.initFirebaseSync = initFirebaseSync;
  window.updateFirebaseBadgeUI = updateFirebaseBadgeUI;
  window.toggleWishlist = toggleWishlist;
  window.isWishlisted = isWishlisted;
  window.toggleCompare = toggleCompare;
  window.addRecent = addRecent;
  window.updateBadges = updateBadges;
}