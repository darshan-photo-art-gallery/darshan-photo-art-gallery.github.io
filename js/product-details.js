/* ============================================================
   DARSHAN PHOTO ART GALLERY — PRODUCT DETAILS & RELATED (product-details.js)
   ============================================================ */

let currentProductImgIndex = 0;

function selectProductThumb(imgSrc, idx) {
  currentProductImgIndex = idx;
  const main = document.getElementById('prodMainImg');
  if (main) main.src = safeMediaUrl(imgSrc);
  document.querySelectorAll('.prod-thumb-btn').forEach((btn, i) => {
    if (i === idx) {
      btn.className = 'prod-thumb-btn relative flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl glass-panel p-1 transition-all duration-300 border-2 border-gold-400 scale-105 shadow-[0_0_15px_rgba(212,168,51,0.5)]';
    } else {
      btn.className = 'prod-thumb-btn relative flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl glass-panel p-1 transition-all duration-300 border border-white/20 opacity-70 hover:opacity-100';
    }
  });
}

function getRelatedProducts(opts) {
  const { categorySlug = '', excludeSlugs = [], limit = 8 } = opts || {};
  const all = (STORE.products || []).filter(p => p && p.slug && !excludeSlugs.includes(p.slug));
  const catName = (STORE.categories.find(c => c.slug === categorySlug)?.name || categorySlug || '').toLowerCase();
  const words = catName.split(/[^a-z]+/).filter(w => w.length > 3);

  const score = (p) => {
    let sc = 0;
    if (categorySlug && p.category === categorySlug) sc += 100;
    const hay = `${p.name || ''} ${p.shortDesc || ''} ${p.material || ''} ${p.category || ''}`.toLowerCase();
    words.forEach(w => { if (hay.includes(w)) sc += 20; });
    if (p.bestSeller) sc += 6;
    if (p.featured) sc += 4;
    if (p.trending) sc += 3;
    sc += (Number(p.rating) || 0);
    return sc;
  };

  const seen = new Set();
  return all
    .map(p => ({ p, sc: score(p) }))
    .filter(x => x.sc > 0)
    .sort((a, b) => b.sc - a.sc)
    .map(x => x.p)
    .filter(p => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
    .slice(0, limit);
}

function renderSuggestedSection(list, heading, sub) {
  if (!list || !list.length) return '';
  return `
    <section class="mt-14 border-t border-white/10 pt-10">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span class="section-eyebrow">${escapeHTML(sub || 'You may also like')}</span>
          <h2 class="mt-2 font-display text-2xl font-bold text-gradient-gold sm:text-3xl">${escapeHTML(heading)}</h2>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        ${list.map((p, i) => renderProductCard(p, i)).join('')}
      </div>
    </section>
  `;
}

function renderProductCard(p, i = 0) {
  const hasPrice = p.price && Number(p.price) > 0;
  const d = hasPrice ? discount(p.price, p.offerPrice) : 0;
  const imgUrl = (p.images && p.images[0]) ? p.images[0] : 'images/products/1.jpeg';
  const isAboveFold = i < 4;

  return `
    <div class="product-card group relative overflow-hidden rounded-3xl glass-panel transition-all duration-500 hover:-translate-y-2 reveal reveal-d${(i%4)+1}">
      <div class="relative aspect-[4/5] overflow-hidden bg-noir-800 rounded-t-3xl">
        <a href="#/product/${escapeHTML(p.slug)}">
          <img src="${escapeHTML(safeMediaUrl(imgUrl))}" alt="${escapeHTML(p.name)}" width="400" height="500" ${isAboveFold ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" class="product-img w-full h-full object-cover" onerror="if(!this.dataset.fb){this.dataset.fb='1';this.src='images/products/1.jpeg';}" />
        </a>
        ${d > 0 ? `<span class="absolute left-3 top-3 rounded-full bg-gold-metallic px-3 py-1 text-[0.65rem] font-bold text-noir-950 shadow-lg">-${d}% OFF</span>` : ''}
        <div class="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button onclick="event.preventDefault();toggleWishlist(STORE.products.find(x=>x.slug==='${escapeHTML(p.slug)}'))" class="flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${isWishlisted(p.slug) ? 'bg-gold-400 text-noir-950' : 'bg-noir-950/70 text-ivory-100 hover:bg-gold-400 hover:text-noir-950'}">
            <i class="fa-solid fa-heart text-[13px]"></i>
          </button>
          <a href="${waLink(productMessage(p.name))}" target="_blank" rel="noopener noreferrer" class="flex h-9 w-9 items-center justify-center rounded-full bg-noir-950/70 text-ivory-100 backdrop-blur-md transition hover:bg-[#25D366] hover:text-white">
            <i class="fa-brands fa-whatsapp text-[14px]"></i>
          </a>
        </div>
      </div>
      <div class="p-4 sm:p-5">
        <a href="#/product/${escapeHTML(p.slug)}">
          <h3 class="line-clamp-2 font-display text-base font-bold text-ivory-50 transition group-hover:text-gold-300 sm:text-lg">${escapeHTML(p.name)}</h3>
        </a>
        <div class="mt-3 flex items-center gap-2">
          ${hasPrice ? `
            <span class="font-display text-lg font-bold text-gold-200 sm:text-xl">${formatPrice(p.offerPrice || p.price)}</span>
            ${p.offerPrice ? `<span class="text-xs text-ivory-100/40 line-through">${formatPrice(p.price)}</span>` : ''}
          ` : `
            <span class="inline-flex items-center gap-1.5 rounded-full bg-gold-400/10 px-2.5 py-1 text-xs font-semibold text-gold-300 border border-gold-400/25">
              <i class="fa-brands fa-whatsapp text-emerald-400"></i> Price on Request
            </span>
          `}
        </div>
      </div>
    </div>
  `;
}
