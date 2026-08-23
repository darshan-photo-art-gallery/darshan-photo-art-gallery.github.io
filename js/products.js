/* ============================================================
   DARSHAN PHOTO ART GALLERY — PRODUCTS & STORE SYSTEM (products.js)
   ============================================================ */

const SITE = {
  name: "Darshan Photo Art Gallery",
  tagline: "Frames That Turn Memories Into Art.",
  phone: "+91 9723202162",
  phoneRaw: "919723202162",
  whatsapp: "919723202162",
  email: "jigarbhati1234@gmail.com",
  address: "05, પહેલો માળ વિમલ પારસ-2 કોમ્પલેક્ષ નવા બસ સ્ટેશનની સામે ઠાકોર સમાજ લાઈબ્રેરી ની નીચે , ડીસા, તા. ડીસા, જી. બનાસકાંઠા, ગુજરાત, પીનકોડ- 38 55 35",
  founded: 1995,
  social: {
    instagram: "https://instagram.com/jigar_bhati_21_62",
    facebook: "https://facebook.com/DarshanPhotoArtGallery",
    youtube: "https://youtube.com/@JigarBhati2162",
    pinterest: "https://pinterest.com/darshanphotoartgallery",
  },
  stats: [
    { label: "Years of Legacy", labelGu: "વર્ષોનો વારસો", value: 30, suffix: "+" },
    { label: "Happy Families", labelGu: "ખુશ પરિવારો", value: 25000, suffix: "+" },
    { label: "Frames Crafted", labelGu: "ફ્રેમ બનાવેલ", value: 120000, suffix: "+" },
    { label: "Google Rating", labelGu: "ગૂગલ રેટિંગ", value: 4.9, suffix: "/5" },
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
    heroHeadline: `Your Vision, <span class="text-gradient-gold">Our Art.</span>`
  },
  gu: {
    home: "હોમ",
    catalog: "કેટલોગ",
    gallery: "ગેલેરી",
    offers: "ઓફર્સ",
    about: "અમારા વિશે",
    contact: "સંપર્ક",
    whatsappUs: "વોટ્સએપ કરો",
    heroHeadline: `તમારી કલ્પના, <span class="text-gradient-gold">અમારી કળા.</span>`
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
    if (!STORE.categories.length) {
      const resCat = await fetch('data/categories.json');
      if (resCat.ok) STORE.categories = await resCat.json();
    }
    if (!STORE.products.length) {
      const resProd = await fetch('data/products.json');
      if (resProd.ok) STORE.products = await resProd.json();
    }
    if (!STORE.offers.length) {
      const resOff = await fetch('data/offers.json');
      if (resOff.ok) STORE.offers = await resOff.json();
    }
    if (!STORE.gallery.length) {
      const resGal = await fetch('data/gallery.json');
      if (resGal.ok) STORE.gallery = await resGal.json();
    }
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
              showToast('⚠️ Cloud Write Error: ' + (err.message || 'Permission Denied'));
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
    apiKey: "AIzaSyB-DarshanPhotoArtGalleryConfigKey2026",
    authDomain: "darshan-photo-art-gallery.firebaseapp.com",
    databaseURL: "https://darshan-photo-art-gallery-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "darshan-photo-art-gallery",
    storageBucket: "darshan-photo-art-gallery.appspot.com",
    appId: "1:100000000000:web:darshanphotoartgallery2026"
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

          const lastLocalWrite = (typeof localStorage !== 'undefined' && Number(localStorage.getItem('dpag_last_write_' + k))) || 0;
          const timeSinceWrite = Date.now() - Math.max(localWriteAt[k] || 0, lastLocalWrite);

          if (val && Array.isArray(val) && val.length > 0) {
            // If local admin modified store recently (within 24 hours), sync local to cloud instead of overwriting
            if (timeSinceWrite < 86400000 && STORE[k] && STORE[k].length > 0) {
              const localStr = JSON.stringify(STORE[k]);
              const cloudStr = JSON.stringify(val);
              if (localStr !== cloudStr) {
                db.ref('dpag_store/' + k).set(STORE[k]).catch(err => console.error('Cloud update error:', err));
              }
              return;
            }
            const incoming = JSON.stringify(val);
            const current = JSON.stringify(STORE[k]);
            if (incoming === current) return;
            STORE[k] = val;
            try {
              if (typeof localStorage !== 'undefined') localStorage.setItem('dpag_' + k, incoming);
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
