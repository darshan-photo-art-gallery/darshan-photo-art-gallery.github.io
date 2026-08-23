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
let currentLang = localStorage.getItem('dpag_lang') || 'en';

// Central State Store
const STORE = {
  wishlist: JSON.parse(localStorage.getItem('dpag_wishlist') || '[]'),
  compare: JSON.parse(localStorage.getItem('dpag_compare') || '[]'),
  recentlyViewed: JSON.parse(localStorage.getItem('dpag_recent') || '[]'),
  adminUser: JSON.parse(localStorage.getItem('dpag_admin') || 'null'),
  products: JSON.parse(localStorage.getItem('dpag_products') || '[]'),
  categories: JSON.parse(localStorage.getItem('dpag_categories') || '[]'),
  offers: JSON.parse(localStorage.getItem('dpag_offers') || '[]'),
  gallery: JSON.parse(localStorage.getItem('dpag_gallery') || '[]'),
  subscribers: JSON.parse(localStorage.getItem('dpag_subscribers') || '[]'),
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
  localWriteAt[key] = Date.now();
  const payload = JSON.stringify(STORE[key]);

  try {
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length && firebase.database && window.FIREBASE_CONFIG) {
      firebase.database().ref('dpag_store/' + key).set(STORE[key])
        .catch(err => { console.error('Cloud sync error:', err); showToast('⚠️ ક્લાઉડ સેવ નિષ્ફળ: ' + (err.message || err)); });
    }
  } catch (err) {
    console.error('Cloud sync error:', err);
  }

  try {
    localStorage.setItem('dpag_' + key, payload);
  } catch (err) {
    console.warn('LocalStorage quota exceeded:', err);
    showToast('⚠️ ફોટા મોટા છે - ડેટા ક્લાઉડમાં સેવ થયો.');
  }
}

function initFirebaseSync() {
  const firebaseConfig = window.FIREBASE_CONFIG || {
    databaseURL: "https://darshan-photo-art-gallery-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "darshan-photo-art-gallery"
  };

  if (typeof firebase !== 'undefined' && firebaseConfig && firebaseConfig.databaseURL) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const db = firebase.database();
      const keys = ['products', 'categories', 'offers', 'gallery', 'subscribers'];

      keys.forEach(k => {
        db.ref('dpag_store/' + k).on('value', snapshot => {
          const val = snapshot.val();
          if (val && Array.isArray(val) && val.length > 0) {
            if (Date.now() - (localWriteAt[k] || 0) < 8000) { isFirebaseConnected = true; return; }
            const incoming = JSON.stringify(val);
            if (incoming === JSON.stringify(STORE[k])) { isFirebaseConnected = true; return; }
            STORE[k] = val;
            try { localStorage.setItem('dpag_' + k, incoming); } catch (e) {}
            isFirebaseConnected = true;
            if (typeof render === 'function') render();
          } else if (STORE[k] && STORE[k].length) {
            db.ref('dpag_store/' + k).set(STORE[k]);
            isFirebaseConnected = true;
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
