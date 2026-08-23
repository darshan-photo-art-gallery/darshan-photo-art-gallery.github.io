/* ============================================================
   DARSHAN PHOTO ART GALLERY — MAIN CONTROLLER & APPLICATION (main.js)
   ============================================================ */

function getRoute() {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash || '#/home';
  return hash.replace('#', '').replace(/^\//, '');
}

function navigate(path) {
  if (typeof window === 'undefined') return;
  const target = path.startsWith('/') ? '#' + path : '#/' + path;
  window.location.hash = target;
}

function getCategoryLabel(catSlug) {
  if (!catSlug) return 'General';
  const c = (STORE.categories || []).find(x => x.slug === catSlug || x.name === catSlug || (x.slug && catSlug && x.slug.toLowerCase() === catSlug.toLowerCase()));
  if (c) {
    return c.name + (c.nameGu ? ` (${c.nameGu})` : '');
  }
  return String(catSlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ---------------- RENDER VIEWS ----------------

function renderHome() {
  const featuredCats = (STORE.categories || []).slice(0, 6);
  const featuredProducts = (STORE.products || []).filter(p => p.featured).slice(0, 8);

  return `
  <!-- HERO SECTION -->
  <section class="relative flex min-h-[92vh] items-center overflow-hidden -mt-[76px]">
    <div class="absolute inset-0 z-0">
      <img src="images/banners/hero1.jpg" alt="Hero Background" width="1920" height="1080" fetchpriority="high" decoding="async" class="w-full h-full object-cover opacity-35 scale-105" />
      <div class="absolute inset-0 bg-gradient-to-b from-noir-950/80 via-noir-950/60 to-noir-950"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/15 via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20 lg:px-10 w-full text-center">
      <span class="section-eyebrow">Est. ${SITE.founded} · DEESA, GUJARAT</span>
      <h1 class="mt-6 font-display text-4xl leading-[1.08] text-ivory-50 sm:text-6xl md:text-7xl font-extrabold max-w-4xl mx-auto">
        ${I18N[currentLang].heroHeadline}
      </h1>
      <p class="mt-6 max-w-2xl mx-auto text-base text-ivory-100/70 sm:text-lg leading-relaxed">
       ફોટો ફ્રેમિંગ, મંદિર ડેકોર અને સ્મૃતિ ચિન્હો માટે વિશ્વસનીયસ નામ-દર્શન ફોટો આર્ટ ગેલેરી
      </p>
      
      <div class="hero-btns">
        <a href="#/catalog" class="btn-luxury">Explore Catalog <i class="fa-solid fa-arrow-right text-xs"></i></a>
        <a href="tel:919723202162" class="btn-call-luxury" aria-label="કોલ કરો">
          <i class="fa-solid fa-phone text-sm"></i>
          <span class="font-gujarati">કોલ કરો</span>
        </a>
        <a href="https://wa.me/919723202162?text=Namaste%20%F0%9F%99%8F%20Darshan%20Photo%20Art%20Gallery,%20I'd%20like%20to%20know%20more%20about%20your%20frame%20collection." target="_blank" rel="noopener noreferrer" class="btn-outline-luxury border-[#25D366]/60 text-white hover:bg-[#25D366] hover:border-[#25D366]">
          <i class="fa-brands fa-whatsapp text-sm"></i> WhatsApp
        </a>
        <a href="${SITE.social.instagram}" target="_blank" rel="noopener noreferrer" class="btn-outline-luxury border-pink-500/50 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400" style="grid-column:1/-1">
          <i class="fa-brands fa-instagram text-sm"></i> Follow Us on Instagram
        </a>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <section class="border-y border-gold-400/20 bg-noir-900/80 py-12 relative z-10 backdrop-blur-md">
    <div class="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
      ${SITE.stats.map((s, i) => `
        <div class="text-center reveal reveal-d${i+1}">
          <p class="font-display text-3xl font-bold text-gradient-gold sm:text-4xl tabular-nums">
            <span class="counter" data-value="${s.value}">0</span>${s.suffix}
          </p>
          <p class="mt-2 text-xs uppercase tracking-[0.2em] text-ivory-100/60 font-medium">${currentLang === 'gu' ? s.labelGu : s.label}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- FEATURED CATEGORIES -->
  <section class="mx-auto max-w-7xl px-6 py-24 lg:px-10">
    <div class="text-center">
      <span class="section-eyebrow">Handcrafted Mastery</span>
      <h2 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Signature Collections</h2>
    </div>
    <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${featuredCats.map((c, i) => `
        <a href="#/catalog/${c.slug}" class="group relative block h-80 overflow-hidden rounded-3xl border border-white/10 glass-panel reveal-scale reveal-d${(i%3)+1}">
          <img src="${escapeHTML(c.cover)}" alt="${escapeHTML(c.name)}" width="400" height="320" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6">
            <p class="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300 font-semibold">${(STORE.products || []).filter(p => p.category === c.slug).length} Masterpieces</p>
            <h3 class="mt-2 font-display text-2xl text-ivory-50 font-bold transition group-hover:text-gold-300">${escapeHTML(currentLang === 'gu' ? c.nameGu || c.name : c.name)}</h3>
            <p class="mt-2 line-clamp-2 text-xs text-ivory-100/60 leading-relaxed">${escapeHTML(c.description)}</p>
          </div>
        </a>
      `).join('')}
    </div>
  </section>

  <!-- FEATURED PRODUCTS -->
  <section class="bg-noir-900/50 py-24 border-t border-white/5">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">Artisanal Selection</span>
        <h2 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Trending Masterpieces</h2>
      </div>
      <div class="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        ${featuredProducts.map((p, i) => renderProductCard(p, i)).join('')}
      </div>
      <div class="mt-14 text-center">
        <a href="#/catalog" class="btn-luxury">Browse Entire Catalog</a>
      </div>
    </div>
  </section>
  `;
}

function renderCatalog(categorySlug) {
  const allProducts = STORE.products || [];
  const currentCat = categorySlug ? (STORE.categories || []).find(c => c.slug === categorySlug) : null;
  const totalCount = allProducts.length;

  return `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div class="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-gold-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        <div class="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold-400/10 blur-3xl"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-gold-300 font-semibold">
              <span class="inline-block h-2 w-2 rounded-full bg-gold-400 animate-pulse"></span>
              <span>Catalog Collection</span>
            </div>
            <h1 class="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ivory-50 tracking-tight">
              ${currentCat ? escapeHTML(currentLang === 'gu' ? currentCat.nameGu || currentCat.name : currentCat.name) : 'All Crafted Products'}
            </h1>
            <p class="mt-2 text-xs sm:text-sm text-ivory-100/70 leading-relaxed font-light">
              ${currentCat && currentCat.description ? escapeHTML(currentCat.description) : 'Explore our complete handcrafted collection of divine Mataji frames, temple décor, LED backlights & luxury photo art.'}
            </p>
          </div>

          <div class="flex items-center gap-3 self-start md:self-auto flex-wrap sm:flex-nowrap">
            <div class="relative min-w-[210px] sm:min-w-[240px]">
              <select onchange="window.location.hash = this.value ? '#/catalog/' + this.value : '#/catalog'" class="w-full appearance-none rounded-2xl border border-gold-400/40 bg-noir-950/90 px-4 py-2.5 pr-10 text-xs font-bold uppercase tracking-wider text-gold-200 outline-none transition-all duration-300 hover:border-gold-300 hover:bg-noir-900 focus:border-gold-300 focus:ring-1 focus:ring-gold-400/50 cursor-pointer shadow-lg">
                <option value="" ${!categorySlug ? 'selected' : ''}>✨ All Categories (${totalCount})</option>
                ${(STORE.categories || []).map(c => {
                  const cCount = allProducts.filter(p => p.category === c.slug).length;
                  return `<option value="${escapeHTML(c.slug)}" ${categorySlug === c.slug ? 'selected' : ''}>
                    ${escapeHTML(c.name)} (${cCount})
                  </option>`;
                }).join('')}
              </select>
              <div class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-300 text-xs">
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            <div class="inline-flex items-center gap-1.5 rounded-2xl bg-gold-400/10 border border-gold-400/35 px-4 py-2.5 text-xs font-extrabold text-gold-300 shadow-md whitespace-nowrap">
              <i class="fa-solid fa-box-archive text-[11px]"></i>
              <span>${categorySlug ? allProducts.filter(p => p.category === categorySlug).length : totalCount} Items</span>
            </div>
          </div>
        </div>
      </div>

      ${categorySlug ? `
        <!-- SINGLE CATEGORY VIEW -->
        <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          ${allProducts.filter(p => p.category === categorySlug).length > 0 
            ? allProducts.filter(p => p.category === categorySlug).map((p, i) => renderProductCard(p, i)).join('') 
            : `<div class="col-span-full py-16 text-center text-ivory-100/60 glass-panel rounded-3xl"><i class="fa-solid fa-box-open text-4xl text-gold-300/40 mb-3 block"></i><p class="text-base font-semibold text-ivory-100">No products available in this category.</p><a href="#/catalog" class="btn-luxury mt-4 text-xs">View All Products</a></div>`}
        </div>
      ` : `
        <!-- ALL CATEGORIES PARTITIONED VIEW -->
        <div class="mt-12 space-y-16">
          ${(STORE.categories || []).map(cat => {
            const catProds = allProducts.filter(p => p.category === cat.slug);
            if (!catProds.length) return '';
            return `
              <section class="relative border-t border-gold-400/20 pt-8">
                <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
                  <div>
                    <div class="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold-300 font-semibold">
                      <span class="inline-block h-1.5 w-1.5 rounded-full bg-gold-400"></span>
                      <span>${catProds.length} ${catProds.length === 1 ? 'Product' : 'Products'}</span>
                    </div>
                    <h2 class="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-ivory-50 tracking-tight">
                      ${escapeHTML(currentLang === 'gu' ? cat.nameGu || cat.name : cat.name)}
                    </h2>
                  </div>
                  <a href="#/catalog/${cat.slug}" class="inline-flex items-center gap-1.5 rounded-full bg-gold-400/10 px-4 py-1.5 text-xs font-bold text-gold-300 border border-gold-400/30 hover:bg-gold-400 hover:text-noir-950 transition">
                    View Collection <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>

                <div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  ${catProds.map((p, i) => renderProductCard(p, i)).join('')}
                </div>
              </section>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

function renderProduct(slug) {
  const p = (STORE.products || []).find(x => x.slug === slug);
  if (!p) return `<div class="py-24 text-center text-ivory-100/60"><h2 class="font-display text-3xl text-gold-200">Product Not Found</h2><a href="#/catalog" class="btn-luxury mt-6">Back to Catalog</a></div>`;
  addRecent(p);

  const images = (p.images && p.images.length) ? p.images : ['images/products/1.jpeg'];
  currentProductImgIndex = 0;
  const hasPrice = p.price && Number(p.price) > 0;
  const formattedSizes = (Array.isArray(p.sizes) ? p.sizes : (p.sizes ? [p.sizes] : ["8x10 in", "12x16 in", "16x20 in"])).map(s => escapeHTML(s)).join(', ');

  return `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div class="flex flex-col gap-4">
          <div class="relative group aspect-square sm:aspect-[4/5] w-full overflow-hidden rounded-3xl glass-panel p-2 flex items-center justify-center bg-noir-900 border border-gold-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <img id="prodMainImg" src="${escapeHTML(images[0])}" alt="${escapeHTML(p.name)}" width="600" height="600" fetchpriority="high" class="h-full w-full object-contain rounded-2xl cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]" onerror="this.onerror=null;this.style.opacity='0.35'" onclick="openMediaLightbox(this.src, 'image', '${escapeHTML(p.name)}', ${JSON.stringify(images).replace(/"/g, '&quot;')}, currentProductImgIndex)" />
            ${hasPrice && discount(p.price, p.offerPrice) > 0 ? `<span class="absolute left-4 top-4 rounded-full bg-gold-metallic px-3 py-1 text-xs font-bold text-noir-950 shadow-lg">-${discount(p.price, p.offerPrice)}% OFF</span>` : ''}
          </div>

          <div class="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            ${images.map((img, idx) => `
              <button onclick="selectProductThumb('${escapeHTML(img)}', ${idx})" class="prod-thumb-btn relative flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl glass-panel p-1 transition-all duration-300 ${idx === 0 ? 'border-2 border-gold-400 scale-105 shadow-[0_0_15px_rgba(212,168,51,0.5)]' : 'border border-white/20 opacity-70 hover:opacity-100'}" data-index="${idx}">
                <img src="${escapeHTML(safeMediaUrl(img))}" alt="Thumbnail ${idx+1}" width="80" height="80" loading="lazy" onerror="this.onerror=null;this.style.opacity='0.3'" class="h-full w-full object-cover rounded-xl" />
              </button>
            `).join('')}
          </div>
          <p class="text-[0.7rem] text-ivory-100/50 text-center font-gujarati">💡 ફોટો બદલવા માટે થંબનેલ પર ક્લિક કરો · મોટો જોવા માટે ઇમેજ પર ટૅપ કરો</p>
        </div>

        <div class="flex flex-col justify-center">
          <span class="section-eyebrow font-gujarati">${escapeHTML(getCategoryLabel(p.category))}</span>
          <h1 class="mt-3 font-display text-3xl font-bold text-ivory-50 sm:text-4xl md:text-5xl">${escapeHTML(p.name)}</h1>
          
          <div class="mt-6 flex items-center gap-4">
            ${hasPrice ? `
              <span class="font-display text-3xl font-bold text-gradient-gold">${formatPrice(p.offerPrice || p.price)}</span>
              ${p.offerPrice ? `<span class="text-lg text-ivory-100/40 line-through">${formatPrice(p.price)}</span><span class="rounded-full bg-gold-metallic px-3 py-1 text-xs font-bold text-noir-950">${discount(p.price, p.offerPrice)}% OFF</span>` : ''}
            ` : `
              <div class="inline-flex items-center gap-2.5 rounded-2xl bg-gold-400/10 border border-gold-400/35 px-5 py-3 text-sm font-semibold text-gold-300 shadow-lg">
                <i class="fa-brands fa-whatsapp text-emerald-400 text-xl"></i>
                <div>
                  <p class="font-bold text-gold-200">Price on Request</p>
                  <p class="text-[0.7rem] text-ivory-100/60 font-gujarati">કિંમત માટે વોટ્સએપ પર સંપર્ક કરો</p>
                </div>
              </div>
            `}
          </div>

          <p class="mt-6 text-sm leading-relaxed text-ivory-100/75 whitespace-pre-line">${escapeHTML(p.description || p.shortDesc || '')}</p>

          <div class="mt-6 space-y-2 border-y border-white/10 py-4 text-xs text-ivory-100/70">
            <p><strong class="text-gold-300">Material:</strong> ${escapeHTML(p.material || '24K Gold Polish Teakwood')}</p>
            <p><strong class="text-gold-300">Available Sizes:</strong> ${formattedSizes}</p>
            <p><strong class="text-gold-300">Rating:</strong> ⭐ ${p.rating || 5.0} / 5 (${p.reviews || 100}+ reviews)</p>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <a href="${waLink(productMessage(p.name))}" target="_blank" rel="noopener noreferrer" class="btn-luxury w-full justify-center !py-3.5">
              <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp Order (ઓર્ડર કરો)
            </a>
          </div>
        </div>
      </div>

      ${renderSuggestedSection(
        getRelatedProducts({ categorySlug: p.category, excludeSlugs: [p.slug], limit: 4 }),
        'Similar Masterpieces',
        'You may also like'
      )}
    </div>
  `;
}

let currentGalleryFilter = 'all';

function renderGallery() {
  const items = currentGalleryFilter === 'all' 
    ? STORE.gallery 
    : (currentGalleryFilter === 'video' ? STORE.gallery.filter(g => g.mediaType === 'video') : STORE.gallery.filter(g => g.category === currentGalleryFilter || g.mediaType === currentGalleryFilter));

  const galleryMediaList = items.map(g => ({ url: g.mediaUrl || g.image, type: g.mediaType || 'image', title: g.title }));

  return `
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">Visual Heritage</span>
        <h1 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Our Gallery Showcase</h1>
        <p class="mt-3 text-xs text-ivory-100/60 max-w-md mx-auto font-gujarati">ફોટા અને વિડિયો ફુલ સ્ક્રીનમાં જોવા માટે કાર્ડ પર ક્લિક કરો.</p>
      </div>

      <div class="mt-8 flex flex-wrap justify-center gap-2">
        <button onclick="setGalleryFilter('all')" class="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${currentGalleryFilter === 'all' ? 'bg-gold-400 text-noir-950' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">All (બધા)</button>
        <button onclick="setGalleryFilter('video')" class="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${currentGalleryFilter === 'video' ? 'bg-gold-400 text-noir-950' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">🎬 Videos (વિડિયો)</button>
        <button onclick="setGalleryFilter('temple')" class="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${currentGalleryFilter === 'temple' ? 'bg-gold-400 text-noir-950' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">🖼️ Temple Art</button>
        <button onclick="setGalleryFilter('frames')" class="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${currentGalleryFilter === 'frames' ? 'bg-gold-400 text-noir-950' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">✨ Luxury Frames</button>
      </div>

      <div class="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        ${items.map((g, idx) => {
          const isVid = g.mediaType === 'video' || (g.mediaUrl && g.mediaUrl.match(/\.(mp4|webm)$/i));
          return `
            <div class="glass-panel p-2 rounded-2xl overflow-hidden cursor-pointer relative group transition-all duration-300 hover:scale-[1.02]" onclick="openMediaLightbox('${escapeHTML(g.mediaUrl || g.image)}', '${isVid ? 'video' : 'image'}', '${escapeHTML(g.title)}', ${JSON.stringify(galleryMediaList).replace(/"/g, '&quot;')}, ${idx})">
              <div class="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-xl bg-noir-900">
                <img src="${escapeHTML(g.image)}" alt="${escapeHTML(g.title)}" width="300" height="375" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ${isVid ? `
                  <div class="absolute inset-0 bg-noir-950/40 flex items-center justify-center">
                    <div class="h-12 w-12 rounded-full bg-gold-400 text-noir-950 flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform">
                      <i class="fa-solid fa-play text-lg ml-0.5"></i>
                    </div>
                  </div>
                  <span class="absolute top-3 left-3 rounded-full bg-rose-600 px-2.5 py-0.5 text-[0.65rem] font-bold text-white shadow-md">🎬 VIDEO</span>
                ` : `
                  <div class="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span class="text-xs text-gold-300 font-semibold"><i class="fa-solid fa-expand mr-1"></i> ફુલ સ્ક્રીન જુઓ</span>
                  </div>
                `}
              </div>
              <p class="mt-2 text-xs font-semibold text-ivory-100 truncate px-1">${escapeHTML(g.title)}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function setGalleryFilter(cat) {
  currentGalleryFilter = cat;
  render();
}

function renderOffers() {
  return `
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">Limited Savings</span>
        <h1 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Offers &amp; Festive Specials</h1>
      </div>
      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        ${(STORE.offers || []).map(o => `
          <div class="glass-panel rounded-3xl p-6">
            <img src="${escapeHTML(o.image)}" alt="${escapeHTML(o.title)}" width="600" height="224" loading="lazy" class="h-56 w-full rounded-2xl object-cover" />
            <span class="mt-4 inline-block rounded-full bg-gold-metallic px-3 py-1 text-xs font-bold text-noir-950">${escapeHTML(o.badge)}</span>
            <h3 class="mt-2 font-display text-2xl font-bold text-gold-200">${escapeHTML(o.title)}</h3>
            <p class="mt-2 text-xs text-ivory-100/70 leading-relaxed">${escapeHTML(o.description)}</p>
            <a href="${waLink(`Namaste 🙏 I want to claim offer: ${o.title}`)}" target="_blank" rel="noopener noreferrer" class="btn-luxury mt-6">Claim Offer</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAbout() {
  return `
    <div class="mx-auto max-w-4xl px-6 py-16 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">30 Years of Craft</span>
        <h1 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Our Legacy Since 1995</h1>
      </div>
      <div class="glass-panel mt-12 rounded-3xl p-8 leading-relaxed text-sm text-ivory-100/75 space-y-4">
        <p>What began as a small frame workshop in Gujarat has grown into a premier destination for luxury photo art, temple arches, Mataji Paat (Bajot), and illuminated LED frames.</p>
        <p>Over the past three decades, we have crafted more than 120,000 frames for 25,000+ satisfied families across Deesa, Banaskantha, and worldwide.</p>
      </div>
    </div>
  `;
}

function renderContact() {
  return `
    <div class="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">Get In Touch</span>
        <h1 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Contact Showroom</h1>
      </div>
      <div class="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
        <div class="glass-panel rounded-3xl p-8 space-y-4">
          <p class="text-sm"><strong class="text-gold-300">Address:</strong> ${escapeHTML(SITE.address)}</p>
          <p class="text-sm"><strong class="text-gold-300">Phone:</strong> <a href="tel:${SITE.phoneRaw}" class="hover:underline">${escapeHTML(SITE.phone)}</a></p>
          <p class="text-sm"><strong class="text-gold-300">Email:</strong> ${escapeHTML(SITE.email)}</p>
          <a href="${waLink()}" target="_blank" rel="noopener noreferrer" class="btn-luxury mt-4"><i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp</a>
        </div>
        <div class="glass-panel rounded-3xl p-2 overflow-hidden h-64">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.4078892145094!2d72.1870946!3d24.262479799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cbd1d320aa22b%3A0xe58adc3852bed85e!2sDarshan%20Photo%20Art%20Gallery!5e0!3m2!1sen!2sin!4v1786434040676!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </div>
  `;
}

function renderWishlist() {
  return `
    <div class="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">Saved Items</span>
        <h1 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Your Wishlist</h1>
      </div>
      ${(STORE.wishlist || []).length ? `
        <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          ${STORE.wishlist.map(w => {
            const p = (STORE.products || []).find(x => x.slug === w.slug);
            return p ? renderProductCard(p, 0) : '';
          }).join('')}
        </div>
      ` : '<p class="mt-12 text-center text-ivory-100/50">Your wishlist is currently empty.</p>'}
    </div>
  `;
}

function renderCompare() {
  const products = (STORE.compare || []).map(c => (STORE.products || []).find(p => p.slug === c.slug)).filter(Boolean);
  return `
    <div class="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <div class="text-center">
        <span class="section-eyebrow">Side-by-Side</span>
        <h1 class="mt-4 font-display text-3xl font-bold text-ivory-50 sm:text-5xl">Compare Products</h1>
      </div>
      ${products.length ? `
        <div class="mt-10 overflow-x-auto">
          <table class="w-full min-w-[600px] text-sm text-left">
            <thead>
              <tr>
                ${products.map(p => `<th class="p-3"><img src="${escapeHTML(p.images[0])}" alt="${escapeHTML(p.name)}" class="h-36 w-full rounded-xl object-cover" /><p class="mt-2 font-display text-sm text-gold-200">${escapeHTML(p.name)}</p></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>${products.map(p => `<td class="p-3 font-bold text-gold-300">${formatPrice(p.offerPrice || p.price)}</td>`).join('')}</tr>
              <tr>${products.map(p => `<td class="p-3 text-xs text-ivory-100/70">${escapeHTML(p.material)}</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
      ` : '<p class="mt-12 text-center text-ivory-100/50">No products selected for comparison.</p>'}
    </div>
  `;
}

// ---------------- ADMIN DASHBOARD & FULL CRUD ----------------

let adminSelectedCategoryFilter = 'all';

function setAdminCategoryFilter(catSlug) {
  adminSelectedCategoryFilter = catSlug;
  render();
}

function setAdminTab(tab) {
  STORE.adminTab = tab;
  render();
}

function renderAdminLogin() {
  return `
    <div class="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      <form onsubmit="adminLogin(event)" class="glass-panel w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <h1 class="font-display text-3xl font-bold text-gradient-gold text-center">Admin Access</h1>
        <p class="text-xs text-ivory-100/60 mt-1 text-center">Enter administrator credentials to log in.</p>
        
        <label class="mt-6 block text-xs uppercase tracking-wider text-gold-300 font-semibold">Username</label>
        <input id="aUser" required autocomplete="username" placeholder="Username" class="admin-input mt-2" />
        
        <label class="mt-4 block text-xs uppercase tracking-wider text-gold-300 font-semibold">Password</label>
        <input id="aPass" type="password" required autocomplete="current-password" placeholder="••••••••" class="admin-input mt-2" />
        
        <button class="btn-luxury mt-6 w-full justify-center">Sign In</button>
        
        <p id="adminMsg" class="mt-4 text-sm hidden text-center"></p>
      </form>
    </div>
  `;
}

function renderAdmin() {
  if (!STORE.adminUser) { 
    return renderAdminLogin(); 
  }

  const activeTab = STORE.adminTab || 'products';

  return `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4 border-b border-gold-400/20 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span class="section-eyebrow">Admin Dashboard</span>
          <h1 class="font-display text-3xl font-bold text-ivory-50 sm:text-4xl">Store Management Console</h1>
        </div>
        <div class="flex items-center gap-3">
          <span id="firebaseStatusBadge" class="rounded-full px-3 py-1 text-xs font-semibold border ${isFirebaseConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">
            <i class="fa-solid ${isFirebaseConnected ? 'fa-cloud-bolt' : 'fa-database'} mr-1"></i> ${isFirebaseConnected ? 'Firebase Live Cloud Synced' : 'Local Storage Mode'}
          </span>
          <button onclick="adminLogout()" class="btn-outline-luxury !py-2 !px-4 !text-xs">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button onclick="setAdminTab('products')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'products' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-box-archive mr-1.5"></i> Products (${(STORE.products || []).length})
        </button>
        <button onclick="setAdminTab('categories')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'categories' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-layer-group mr-1.5"></i> Categories (${(STORE.categories || []).length})
        </button>
        <button onclick="setAdminTab('offers')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'offers' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-tags mr-1.5"></i> Offers (${(STORE.offers || []).length})
        </button>
        <button onclick="setAdminTab('gallery')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'gallery' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-images mr-1.5"></i> Gallery (${(STORE.gallery || []).length})
        </button>
        <button onclick="setAdminTab('subscribers')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'subscribers' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-envelope mr-1.5"></i> Subscribers (${(STORE.subscribers || []).length})
        </button>
        <button onclick="setAdminTab('security')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'security' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-lock mr-1.5"></i> Security &amp; Password
        </button>
        <button onclick="setAdminTab('backup')" class="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'backup' ? 'bg-gold-400 text-noir-950 shadow-lg' : 'glass-panel-light text-ivory-100/70 hover:border-gold-400/50'}">
          <i class="fa-solid fa-database mr-1.5"></i> Backup &amp; JSON
        </button>
      </div>

      <div class="mt-8">
        ${activeTab === 'products' ? renderAdminProducts() : ''}
        ${activeTab === 'categories' ? renderAdminCategories() : ''}
        ${activeTab === 'offers' ? renderAdminOffers() : ''}
        ${activeTab === 'gallery' ? renderAdminGallery() : ''}
        ${activeTab === 'subscribers' ? renderAdminSubscribers() : ''}
        ${activeTab === 'security' ? renderAdminSecurity() : ''}
        ${activeTab === 'backup' ? renderAdminBackup() : ''}
      </div>
    </div>
  `;
}

function renderAdminProductRow(p) {
  const sizesText = Array.isArray(p.sizes) ? p.sizes.join(', ') : (p.sizes || '8x10 in, 12x16 in, 16x20 in');
  return `
    <tr class="hover:bg-white/5 transition">
      <td class="p-3">
        <img src="${escapeHTML(p.images[0])}" class="h-12 w-12 rounded-xl object-cover border border-gold-400/30" />
      </td>
      <td class="p-3">
        <p class="font-semibold text-ivory-100">${escapeHTML(p.name)}</p>
        <p class="text-[0.68rem] text-gold-300/80">Sizes: ${escapeHTML(sizesText)}</p>
      </td>
      <td class="p-3 text-xs font-medium text-gold-300 whitespace-nowrap">
        ${escapeHTML(getCategoryLabel(p.category))}
      </td>
      <td class="p-3 text-xs">
        ${p.price && Number(p.price) > 0 ? `<span class="line-through text-ivory-100/60">${formatPrice(p.price)}</span>` : '<span class="text-ivory-100/40 font-italic">Custom</span>'}
      </td>
      <td class="p-3 font-bold text-gold-300 text-xs">
        ${p.price && Number(p.price) > 0 ? formatPrice(p.offerPrice || p.price) : '<span class="text-emerald-400 flex items-center gap-1"><i class="fa-brands fa-whatsapp text-[11px]"></i> Request</span>'}
      </td>
      <td class="p-3"><span class="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-400 font-semibold">${p.stock || 50}</span></td>
      <td class="p-3 text-right space-x-2">
        <button onclick="openProductModal('${escapeHTML(p.slug)}')" class="rounded-lg bg-gold-400/15 p-2 text-gold-300 hover:bg-gold-400 hover:text-noir-950 transition" title="Edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button onclick="deleteProduct('${escapeHTML(p.slug)}')" class="rounded-lg bg-rose-500/15 p-2 text-rose-400 hover:bg-rose-500 hover:text-white transition" title="Delete">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
}

function renderAdminProducts() {
  const allProds = STORE.products || [];
  const categories = STORE.categories || [];

  // Group products by category
  const knownCatSlugs = new Set(categories.map(c => c.slug));
  const uncategorizedProds = allProds.filter(p => !knownCatSlugs.has(p.category));

  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="font-display text-2xl font-bold text-gold-200">Manage Products</h2>
          <p class="text-xs text-ivory-100/60 mt-0.5">Filter by category or manage products in separate category sections.</p>
        </div>
        <button onclick="openProductModal()" class="btn-luxury !py-2.5 !px-5 text-xs">
          <i class="fa-solid fa-plus"></i> Add New Product
        </button>
      </div>

      <!-- CATEGORY FILTER PILLS -->
      <div class="flex flex-wrap items-center gap-2 mb-8 glass-panel p-3 rounded-2xl border border-white/10">
        <span class="text-xs font-bold uppercase tracking-wider text-gold-300 mr-2"><i class="fa-solid fa-filter text-[11px]"></i> Filter:</span>
        <button onclick="setAdminCategoryFilter('all')" class="rounded-full px-4 py-1.5 text-xs font-bold transition ${adminSelectedCategoryFilter === 'all' ? 'bg-gold-400 text-noir-950 shadow-md' : 'bg-white/5 text-ivory-100/70 hover:bg-white/10'}">
          All Categories (${allProds.length})
        </button>
        ${categories.map(c => {
          const cCount = allProds.filter(p => p.category === c.slug).length;
          return `
            <button onclick="setAdminCategoryFilter('${escapeHTML(c.slug)}')" class="rounded-full px-4 py-1.5 text-xs font-bold transition ${adminSelectedCategoryFilter === c.slug ? 'bg-gold-400 text-noir-950 shadow-md' : 'bg-white/5 text-ivory-100/70 hover:bg-white/10'}">
              ${escapeHTML(c.name)} (${cCount})
            </button>
          `;
        }).join('')}
      </div>

      <!-- SEPARATE CATEGORY PRODUCT SECTIONS -->
      <div class="space-y-8">
        ${(adminSelectedCategoryFilter === 'all' ? categories : categories.filter(c => c.slug === adminSelectedCategoryFilter)).map(c => {
          const catProds = allProds.filter(p => p.category === c.slug);
          return `
            <div class="glass-panel rounded-3xl p-5 border border-gold-400/20 shadow-lg">
              <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                <div class="flex items-center gap-3">
                  <img src="${escapeHTML(c.cover)}" class="h-10 w-10 rounded-xl object-cover border border-gold-400/30" />
                  <div>
                    <h3 class="font-display text-xl font-bold text-ivory-50">${escapeHTML(c.name)} <span class="text-xs text-gold-300 font-semibold">${c.nameGu ? `(${escapeHTML(c.nameGu)})` : ''}</span></h3>
                    <p class="text-xs text-ivory-100/60">${catProds.length} ${catProds.length === 1 ? 'Product' : 'Products'} in this category</p>
                  </div>
                </div>
                <button onclick="openProductModal(null, '${escapeHTML(c.slug)}')" class="btn-luxury !py-2 !px-4 text-xs">
                  <i class="fa-solid fa-plus"></i> Add Product to ${escapeHTML(c.name)}
                </button>
              </div>

              ${catProds.length > 0 ? `
                <div class="overflow-x-auto rounded-xl">
                  <table class="w-full text-left text-sm">
                    <thead class="border-b border-white/10 text-xs uppercase text-gold-300 font-semibold bg-white/5">
                      <tr>
                        <th class="p-3">Image &amp; Details</th>
                        <th class="p-3">Category</th>
                        <th class="p-3">Price</th>
                        <th class="p-3">Offer Price</th>
                        <th class="p-3">Stock</th>
                        <th class="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                      ${catProds.map(p => renderAdminProductRow(p)).join('')}
                    </tbody>
                  </table>
                </div>
              ` : `
                <div class="py-8 text-center text-xs text-ivory-100/50">
                  <p>No products added in <strong>${escapeHTML(c.name)}</strong> yet.</p>
                  <button onclick="openProductModal(null, '${escapeHTML(c.slug)}')" class="btn-outline-luxury !py-1.5 !px-3 text-xs mt-3">
                    <i class="fa-solid fa-plus"></i> Add First Product Here
                  </button>
                </div>
              `}
            </div>
          `;
        }).join('')}

        ${(adminSelectedCategoryFilter === 'all' && uncategorizedProds.length > 0) ? `
          <div class="glass-panel rounded-3xl p-5 border border-amber-500/30 shadow-lg">
            <div class="pb-4 border-b border-white/10 mb-4">
              <h3 class="font-display text-xl font-bold text-amber-300">Other / Custom Categories (${uncategorizedProds.length})</h3>
            </div>
            <div class="overflow-x-auto rounded-xl">
              <table class="w-full text-left text-sm">
                <thead class="border-b border-white/10 text-xs uppercase text-gold-300 font-semibold bg-white/5">
                  <tr>
                    <th class="p-3">Image &amp; Details</th>
                    <th class="p-3">Category</th>
                    <th class="p-3">Price</th>
                    <th class="p-3">Offer Price</th>
                    <th class="p-3">Stock</th>
                    <th class="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  ${uncategorizedProds.map(p => renderAdminProductRow(p)).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ---------------- PRODUCT PHOTO & MODAL MANAGER ----------------
let PHOTO_QUEUE = [];
let PHOTO_TARGET_SLUG = null;
let PHOTO_REPLACE_INDEX = null;
const MAX_PHOTOS = 8;

function openProductModal(editSlug = null, defaultCategory = null) {
  const p = editSlug ? STORE.products.find(x => x.slug === editSlug) : null;
  const activeCatSlug = p ? p.category : (defaultCategory || '');
  PHOTO_TARGET_SLUG = editSlug || null;
  PHOTO_QUEUE = (p && Array.isArray(p.images) ? p.images : []).map((src, i) => ({
    file: null, name: 'Photo ' + (i + 1), status: 'done', data: src, error: null, existing: true
  }));

  let mc = document.getElementById('modalContainer');
  if (!mc) {
    mc = document.createElement('div');
    mc.id = 'modalContainer';
    document.body.appendChild(mc);
  }

  const availableCats = (STORE.categories && STORE.categories.length)
    ? STORE.categories
    : [
        { slug: 'mataji-frames', name: 'Mataji Paat (Bajot)' },
        { slug: 'gold-work-temple', name: 'Gold Work Temple Photo' },
        { slug: 'heavy-lighting-photo', name: 'Heavy Lighting Photo' },
        { slug: 'led-light-photos', name: 'LED Light Photos' },
        { slug: 'momentos', name: 'Momentos & Trophies' },
        { slug: 'acrylic-wall-photo', name: 'Acrylic Wall Photo' }
      ];

  // Look up default sizes for category if adding new product
  const catObj = availableCats.find(c => c.slug === activeCatSlug);
  const defaultCategorySizes = (catObj && Array.isArray(catObj.sizes) && catObj.sizes.length)
    ? catObj.sizes.join(', ')
    : '8x10 in, 12x16 in, 16x20 in';

  const productSizesText = p
    ? (Array.isArray(p.sizes) ? p.sizes.join(', ') : (p.sizes || defaultCategorySizes))
    : defaultCategorySizes;

  mc.innerHTML = `
    <div class="modal-overlay">
      <div class="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-page-entry">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 class="font-display text-2xl font-bold text-gradient-gold">${p ? 'Edit Product' : 'Add New Product'}</h3>
          <button onclick="closeModal()" class="text-ivory-100 hover:text-gold-300 p-2"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <form onsubmit="saveProductForm(event, ${p ? `'${escapeHTML(p.slug)}'` : 'null'})" class="mt-6 space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Product Name</label>
            <input id="pName" required value="${p ? escapeHTML(p.name) : ''}" class="admin-input" placeholder="e.g. Royal Gold Mataji Frame" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Category</label>
              <select id="pCat" class="admin-input">
                ${availableCats.map(c => {
                  const isSelected = (activeCatSlug && (activeCatSlug === c.slug || activeCatSlug === c.name || activeCatSlug.toLowerCase() === c.slug.toLowerCase()));
                  return `<option value="${escapeHTML(c.slug)}" ${isSelected ? 'selected' : ''}>${escapeHTML(c.name)} ${c.nameGu ? `(${escapeHTML(c.nameGu)})` : ''}</option>`;
                }).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Stock Quantity</label>
              <input id="pStock" type="number" value="${p ? p.stock || 50 : 50}" class="admin-input" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Regular Price (₹) <span class="text-[0.65rem] text-ivory-100/50 normal-case">(Leave 0 for Price on Request)</span></label>
              <input id="pPrice" type="number" value="${p && p.price ? p.price : ''}" class="admin-input" placeholder="0 or 3499" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Offer Price (₹)</label>
              <input id="pOfferPrice" type="number" value="${p && p.offerPrice ? p.offerPrice : ''}" class="admin-input" placeholder="2499" />
            </div>
          </div>

          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Material Details</label>
            <input id="pMaterial" value="${p ? escapeHTML(p.material || '') : ''}" class="admin-input" placeholder="e.g. 24K Gold Polish Teakwood" />
          </div>

          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Available Sizes <span class="text-[0.65rem] text-ivory-100/50 normal-case">(Comma separated, e.g. 8x10 in, 12x16 in, 16x20 in)</span></label>
            <input id="pSizes" value="${escapeHTML(productSizesText)}" class="admin-input" placeholder="e.g. 8x10 in, 12x16 in, 16x20 in, 20x24 in, Custom Size" />
          </div>

          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Description</label>
            <textarea id="pDesc" rows="3" class="admin-input">${p ? escapeHTML(p.description || p.shortDesc || '') : ''}</textarea>
          </div>

          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Product Photos (Max 8)</label>

            <div id="pDropZone"
                 ondragover="event.preventDefault(); this.classList.add('ring-2','ring-gold-400')"
                 ondragleave="this.classList.remove('ring-2','ring-gold-400')"
                 ondrop="handleProductPhotoDrop(event)"
                 onclick="document.getElementById('pImageFile').click()"
                 class="mt-1 cursor-pointer rounded-2xl border border-dashed border-gold-400/40 bg-white/5 px-4 py-6 text-center transition hover:bg-white/10">
              <i class="fa-solid fa-cloud-arrow-up text-2xl text-gold-300"></i>
              <p class="mt-2 text-xs font-semibold text-ivory-100/80">Drop photos here or click to select</p>
            </div>
            <input id="pImageFile" type="file" accept="image/*" multiple onchange="handleProductPhotoSelect(event)" class="hidden" />
            <input id="pReplaceFile" type="file" accept="image/*" class="hidden" onchange="handleProductPhotoReplaceFile(event)" />

            <div id="pUploadProgress" class="mt-3 hidden">
              <div class="flex items-center justify-between text-[0.7rem] font-semibold text-ivory-100/70">
                <span id="pProgressText">Preparing photos...</span>
                <span id="pProgressPct">0%</span>
              </div>
              <div class="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div id="pProgressBar" class="h-full w-0 rounded-full bg-gold-400 transition-all duration-300"></div>
              </div>
              <ul id="pPhotoList" class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto"></ul>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-2">
            <label class="flex items-center gap-2 text-xs font-semibold text-gold-300 cursor-pointer">
              <input id="pFeatured" type="checkbox" ${p && p.featured ? 'checked' : ''} class="accent-gold-400 h-4 w-4" />
              Featured on Home Page
            </label>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onclick="closeModal()" class="btn-outline-luxury !py-2.5 text-xs">Cancel</button>
            <button type="submit" class="btn-luxury !py-2.5 text-xs"><i class="fa-solid fa-floppy-disk"></i> Save Product</button>
          </div>
        </form>
      </div>
    </div>
  `;
  renderPhotoQueue();
}

function queueFiles(fileList) {
  const room = MAX_PHOTOS - PHOTO_QUEUE.length;
  if (room <= 0) { showToast('⚠️ Max ' + MAX_PHOTOS + ' photos allowed.'); return; }
  const files = Array.from(fileList || []).filter(f => f && f.type.startsWith('image/')).slice(0, room);
  if (!files.length) return;
  PHOTO_QUEUE = PHOTO_QUEUE.concat(files.map(f => ({ file: f, name: f.name, status: 'pending', data: null, error: null, existing: false })));
  renderPhotoQueue();
  processProductPhotos().then(() => syncPhotosToSavedProduct());
}

function handleProductPhotoSelect(e) { queueFiles(e.target.files); e.target.value = ''; }
function handleProductPhotoDrop(e) {
  e.preventDefault();
  const dz = document.getElementById('pDropZone');
  if (dz) dz.classList.remove('ring-2', 'ring-gold-400');
  queueFiles(e.dataTransfer && e.dataTransfer.files);
}

function handleProductPhotoReplaceFile(e) {
  if (PHOTO_REPLACE_INDEX !== null && e.target && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    PHOTO_QUEUE[PHOTO_REPLACE_INDEX] = { file: file, name: file.name, status: 'pending', data: null, error: null, existing: false };
    renderPhotoQueue();
    processProductPhotos([PHOTO_REPLACE_INDEX]).then(() => syncPhotosToSavedProduct());
    e.target.value = '';
  }
}

function renderPhotoQueue() {
  const wrap = document.getElementById('pUploadProgress');
  if (!wrap) return;
  if (!PHOTO_QUEUE.length) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');

  const done = PHOTO_QUEUE.filter(x => x.status === 'done').length;
  const failed = PHOTO_QUEUE.filter(x => x.status === 'error').length;
  const pct = Math.round((done / PHOTO_QUEUE.length) * 100);

  const bar = document.getElementById('pProgressBar'); if (bar) bar.style.width = pct + '%';
  const pctText = document.getElementById('pProgressPct'); if (pctText) pctText.textContent = pct + '%';
  const txt = document.getElementById('pProgressText');
  if (txt) txt.textContent = failed ? `${done}/${PHOTO_QUEUE.length} ready · ${failed} failed` : `${done}/${PHOTO_QUEUE.length} photos ready`;

  const badge = {
    pending: '<i class="fa-regular fa-clock text-ivory-100/50"></i>',
    working: '<i class="fa-solid fa-spinner fa-spin text-gold-300"></i>',
    done: '<i class="fa-solid fa-circle-check text-emerald-400"></i>',
    error: '<i class="fa-solid fa-circle-exclamation text-rose-400"></i>'
  };

  const photoList = document.getElementById('pPhotoList');
  if (photoList) {
    photoList.innerHTML = PHOTO_QUEUE.map((it, i) => `
      <li class="relative overflow-hidden rounded-xl border ${it.status === 'error' ? 'border-rose-400/50' : 'border-white/10'} bg-white/5">
        <div class="aspect-square w-full bg-noir-950/40 flex items-center justify-center">
          ${it.status === 'done' && it.data ? `<img src="${it.data}" alt="${escapeHTML(it.name)}" class="h-full w-full object-cover" />` : `<span class="text-xl">${badge[it.status]}</span>`}
        </div>
        <div class="flex items-center gap-1 px-1.5 py-1 text-[0.62rem] text-ivory-100/70">
          ${badge[it.status]}<span class="flex-1 truncate">${escapeHTML(it.name)}</span>
        </div>
        <div class="flex border-t border-white/10 text-[0.6rem] font-bold">
          <button type="button" onclick="removeProductPhoto(${i})" class="flex-1 py-1.5 text-rose-400 hover:bg-rose-500 hover:text-white transition">Remove</button>
        </div>
      </li>
    `).join('');
  }
}

async function processProductPhotos(indexes = null) {
  const targets = indexes || PHOTO_QUEUE.map((_, i) => i).filter(i => PHOTO_QUEUE[i].status !== 'done');
  for (const i of targets) {
    const item = PHOTO_QUEUE[i];
    if (!item || !item.file) continue;
    item.status = 'working'; item.error = null; renderPhotoQueue();
    try {
      item.data = await compressImage(item.file, 600, 600, 0.65);
      item.status = 'done';
    } catch (err) {
      item.status = 'error';
      item.error = (err && err.message) ? err.message : 'Could not read file';
    }
    renderPhotoQueue();
  }
  return PHOTO_QUEUE.filter(x => x.status === 'error').length;
}

function removeProductPhoto(index) {
  if (!PHOTO_QUEUE[index]) return;
  PHOTO_QUEUE.splice(index, 1);
  renderPhotoQueue();
  syncPhotosToSavedProduct();
  showToast('✓ Photo removed');
}

function syncPhotosToSavedProduct() {
  if (!PHOTO_TARGET_SLUG) return;
  const prod = STORE.products.find(x => x.slug === PHOTO_TARGET_SLUG);
  if (!prod) return;
  const good = PHOTO_QUEUE.filter(x => x.status === 'done' && x.data).map(x => x.data);
  prod.images = good.length ? good : ['images/products/1.jpeg'];
  saveStore('products');
  render();
}

async function saveProductForm(e, existingSlug) {
  e.preventDefault();
  const submitBtn = e.target ? e.target.querySelector('button[type=submit]') : null;
  if (submitBtn) {
    if (submitBtn.disabled) return;
    submitBtn.disabled = true;
    submitBtn.dataset.label = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
  }
  try {
    const nameEl = document.getElementById('pName');
    const name = nameEl ? nameEl.value.trim() : '';
    if (!name) { showToast('❌ Product name is required.'); return; }

    const catEl = document.getElementById('pCat');
    const cat = catEl && catEl.value ? catEl.value : (STORE.categories?.[0]?.slug || 'mataji-frames');

    const stockEl = document.getElementById('pStock');
    const stock = stockEl ? (parseInt(stockEl.value) || 50) : 50;

    const priceEl = document.getElementById('pPrice');
    const priceVal = priceEl ? priceEl.value.trim() : '';
    const price = priceVal !== '' ? parseFloat(priceVal) : 0;

    const offerEl = document.getElementById('pOfferPrice');
    const offerVal = offerEl ? offerEl.value.trim() : '';
    const offerPrice = offerVal !== '' ? parseFloat(offerVal) : null;

    const matEl = document.getElementById('pMaterial');
    const material = matEl ? matEl.value.trim() : '';

    const sizesEl = document.getElementById('pSizes');
    const sizesVal = sizesEl ? sizesEl.value.trim() : '';
    const sizes = sizesVal ? sizesVal.split(',').map(s => s.trim()).filter(Boolean) : ["8x10 in", "12x16 in", "16x20 in"];

    const descEl = document.getElementById('pDesc');
    const desc = descEl ? descEl.value.trim() : '';

    const featEl = document.getElementById('pFeatured');
    const featured = featEl ? featEl.checked : false;

    if (PHOTO_QUEUE.length) {
      if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing photos...';
      await processProductPhotos();
    }

    const targetSlug = (existingSlug && existingSlug !== 'null' && existingSlug !== 'undefined' && existingSlug !== '') ? existingSlug : null;

    let imageSrcs = PHOTO_QUEUE.filter(x => x.status === 'done' && x.data).map(x => x.data);
    if (!imageSrcs.length) {
      imageSrcs = targetSlug ? (STORE.products.find(x => x.slug === targetSlug)?.images || ['images/products/1.jpeg']) : ['images/products/1.jpeg'];
    }

    const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = targetSlug || (cleanSlug.length > 0 ? cleanSlug : ('prod-' + Date.now()));

    const productData = {
      slug, name, category: cat, shortDesc: desc, description: desc, material,
      sizes, colors: ["Gold"], images: imageSrcs,
      price: isNaN(price) ? 0 : price, offerPrice: isNaN(offerPrice) ? null : offerPrice, stock, rating: 5.0, reviews: 1, featured
    };

    if (targetSlug) {
      const idx = STORE.products.findIndex(x => x.slug === targetSlug);
      if (idx >= 0) STORE.products[idx] = productData;
      else STORE.products.unshift(productData);
    } else {
      STORE.products.unshift(productData);
    }

    saveStore('products');
    closeModal();
    showToast('✓ Product saved successfully!');
    render();
  } catch (err) {
    console.error('Save product error:', err);
    showToast('❌ Error saving product: ' + (err && err.message ? err.message : err));
  } finally {
    if (submitBtn && document.body.contains(submitBtn)) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitBtn.dataset.label || 'Save Product';
    }
  }
}

function deleteProduct(slug) {
  if (!slug) return;
  if (confirm('Are you sure you want to delete this product?')) {
    STORE.products = (STORE.products || []).filter(x => x.slug !== slug);
    saveStore('products');
    showToast('✓ Product deleted');
    render();
  }
}

// ---------------- CATEGORY CRUD ----------------

function renderAdminCategories() {
  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="font-display text-2xl font-bold text-gold-200">Manage Categories</h2>
        </div>
        <button onclick="openCategoryModal()" class="btn-luxury !py-2.5 !px-5 text-xs">
          <i class="fa-solid fa-plus"></i> Add New Category
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${(STORE.categories || []).map((c, idx) => `
          <div class="glass-panel p-5 rounded-2xl flex flex-col justify-between">
            <div class="flex items-center gap-4">
              <img src="${escapeHTML(c.cover)}" class="h-16 w-16 rounded-xl object-cover border border-gold-400/30 shrink-0" />
              <div class="flex-1 min-w-0">
                <h3 class="font-display text-lg font-bold text-ivory-50 truncate">${escapeHTML(c.name)}</h3>
                <p class="text-xs text-gold-300 font-semibold truncate">${escapeHTML(c.nameGu || '')}</p>
                <p class="text-[0.68rem] text-gold-300/80 mt-0.5 truncate">Sizes: ${escapeHTML(Array.isArray(c.sizes) ? c.sizes.join(', ') : (c.sizes || '8x10 in, 12x16 in, 16x20 in'))}</p>
                <p class="text-[0.7rem] text-ivory-100/50 mt-0.5">Slug: ${escapeHTML(c.slug)}</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span class="text-xs text-ivory-100/60">${(STORE.products || []).filter(p => p.category === c.slug).length} Products</span>
              <div class="flex items-center gap-1.5">
                <button onclick="moveCategory(${idx}, -1)" ${idx === 0 ? 'disabled class="opacity-30 cursor-not-allowed p-1.5 text-xs text-ivory-100/40"' : 'class="rounded-lg bg-white/10 p-1.5 text-xs text-gold-300 hover:bg-gold-400 hover:text-noir-950 transition"'} title="Move Up">
                  <i class="fa-solid fa-arrow-up"></i>
                </button>
                <button onclick="moveCategory(${idx}, 1)" ${idx === STORE.categories.length - 1 ? 'disabled class="opacity-30 cursor-not-allowed p-1.5 text-xs text-ivory-100/40"' : 'class="rounded-lg bg-white/10 p-1.5 text-xs text-gold-300 hover:bg-gold-400 hover:text-noir-950 transition"'} title="Move Down">
                  <i class="fa-solid fa-arrow-down"></i>
                </button>
                <button onclick="openCategoryModal('${escapeHTML(c.slug)}')" class="rounded-lg bg-gold-400/15 p-1.5 text-gold-300 hover:bg-gold-400 hover:text-noir-950 transition ml-1" title="Edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteCategory('${escapeHTML(c.slug)}')" class="rounded-lg bg-rose-500/15 p-1.5 text-rose-400 hover:bg-rose-500 hover:text-white transition" title="Delete">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function moveCategory(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= STORE.categories.length) return;
  const temp = STORE.categories[index];
  STORE.categories[index] = STORE.categories[newIndex];
  STORE.categories[newIndex] = temp;
  saveStore('categories');
  showToast('✓ Category reordered');
  render();
}

function openCategoryModal(existingSlug = null) {
  const c = existingSlug ? STORE.categories.find(x => x.slug === existingSlug) : null;
  let mc = document.getElementById('modalContainer');
  if (!mc) {
    mc = document.createElement('div');
    mc.id = 'modalContainer';
    document.body.appendChild(mc);
  }

  const categorySizesText = c
    ? (Array.isArray(c.sizes) ? c.sizes.join(', ') : (c.sizes || '8x10 in, 12x16 in, 16x20 in'))
    : '8x10 in, 12x16 in, 16x20 in';

  mc.innerHTML = `
    <div class="modal-overlay">
      <div class="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 animate-page-entry">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 class="font-display text-2xl font-bold text-gradient-gold">${c ? 'Edit Category' : 'Add Category'}</h3>
          <button onclick="closeModal()" class="text-ivory-100 hover:text-gold-300 p-2"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <form onsubmit="saveCategoryForm(event, ${existingSlug ? `'${escapeHTML(existingSlug)}'` : 'null'})" class="mt-6 space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Category Name (English)</label>
            <input id="cName" required value="${c ? escapeHTML(c.name) : ''}" class="admin-input" placeholder="e.g. Mataji Paat (Bajot)" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Category Name (Gujarati)</label>
            <input id="cNameGu" value="${c ? escapeHTML(c.nameGu || '') : ''}" class="admin-input" placeholder="દા.ત. ભુવાજી પાટ" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Default Available Sizes <span class="text-[0.65rem] text-ivory-100/50 normal-case">(Comma separated)</span></label>
            <input id="cSizes" value="${escapeHTML(categorySizesText)}" class="admin-input" placeholder="e.g. 12x18 in, 18x24 in, 24x36 in" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Description</label>
            <textarea id="cDesc" rows="2" class="admin-input">${c ? escapeHTML(c.description || '') : ''}</textarea>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Cover Image</label>
            <input id="cCoverFile" type="file" accept="image/*" class="admin-input text-xs" />
          </div>
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onclick="closeModal()" class="btn-outline-luxury !py-2.5 text-xs">Cancel</button>
            <button type="submit" class="btn-luxury !py-2.5 text-xs"><i class="fa-solid fa-floppy-disk"></i> ${c ? 'Update Category' : 'Save Category'}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

async function saveCategoryForm(e, existingSlug) {
  e.preventDefault();
  try {
    const nameEl = document.getElementById('cName');
    const name = nameEl ? nameEl.value.trim() : '';
    if (!name) { showToast('❌ Category name is required.'); return; }

    const nameGuEl = document.getElementById('cNameGu');
    const nameGu = nameGuEl ? nameGuEl.value.trim() : '';

    const sizesEl = document.getElementById('cSizes');
    const sizesVal = sizesEl ? sizesEl.value.trim() : '';
    const sizes = sizesVal ? sizesVal.split(',').map(s => s.trim()).filter(Boolean) : ["8x10 in", "12x16 in", "16x20 in"];

    const descEl = document.getElementById('cDesc');
    const desc = descEl ? descEl.value.trim() : '';

    const file = document.getElementById('cCoverFile')?.files?.[0];

    const targetSlug = (existingSlug && existingSlug !== 'null' && existingSlug !== 'undefined' && existingSlug !== '') ? existingSlug : null;
    const existingCat = targetSlug ? STORE.categories.find(x => x.slug === targetSlug) : null;
    let cover = existingCat ? existingCat.cover : 'images/products/3.jpeg';
    if (file) cover = await compressImage(file, 600, 600, 0.65);

    const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = targetSlug || (cleanSlug.length > 0 ? cleanSlug : ('cat-' + Date.now()));

    const categoryData = { slug, name, nameGu, description: desc, sizes, cover, icon: existingCat?.icon || 'fa-box', featured: true };

    if (targetSlug) {
      const idx = STORE.categories.findIndex(x => x.slug === targetSlug);
      if (idx >= 0) STORE.categories[idx] = categoryData;
      else STORE.categories.push(categoryData);
    } else {
      STORE.categories.push(categoryData);
    }

    saveStore('categories');
    closeModal();
    showToast(targetSlug ? '✓ Category updated!' : '✓ Category added!');
    render();
  } catch (err) {
    console.error('Save category error:', err);
    showToast('❌ Error saving category.');
  }
}

function deleteCategory(slug) {
  if (!slug) return;
  if (confirm('Delete this category? Products in this category will remain.')) {
    STORE.categories = (STORE.categories || []).filter(c => c.slug !== slug);
    saveStore('categories');
    showToast('✓ Category deleted');
    render();
  }
}

// ---------------- OFFER CRUD ----------------

function renderAdminOffers() {
  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="font-display text-2xl font-bold text-gold-200">Manage Offers</h2>
        </div>
        <button onclick="openOfferModal()" class="btn-luxury !py-2.5 !px-5 text-xs">
          <i class="fa-solid fa-plus"></i> Add New Offer
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        ${(STORE.offers || []).map((o, idx) => `
          <div class="glass-panel p-5 rounded-2xl flex flex-col justify-between">
            <div class="flex items-center gap-4">
              <img src="${escapeHTML(o.image)}" class="h-20 w-24 rounded-xl object-cover border border-gold-400/30 shrink-0" />
              <div class="flex-1 min-w-0">
                <span class="inline-block rounded-full bg-gold-metallic px-2.5 py-0.5 text-[0.65rem] font-bold text-noir-950">${escapeHTML(o.badge)}</span>
                <h3 class="mt-1 font-display text-lg font-bold text-ivory-50 truncate">${escapeHTML(o.title)}</h3>
                <p class="text-xs text-ivory-100/60 line-clamp-2 mt-1">${escapeHTML(o.description)}</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <div class="flex items-center gap-1.5">
                <button onclick="openOfferModal(${idx})" class="rounded-lg bg-gold-400/15 p-1.5 text-gold-300 hover:bg-gold-400 hover:text-noir-950 transition" title="Edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteOffer(${idx})" class="rounded-lg bg-rose-500/15 p-1.5 text-rose-400 hover:bg-rose-500 hover:text-white transition" title="Delete">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openOfferModal(existingIdx = null) {
  const o = (existingIdx !== null && existingIdx !== undefined) ? STORE.offers[existingIdx] : null;
  let mc = document.getElementById('modalContainer');
  if (!mc) {
    mc = document.createElement('div');
    mc.id = 'modalContainer';
    document.body.appendChild(mc);
  }

  mc.innerHTML = `
    <div class="modal-overlay">
      <div class="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 animate-page-entry">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 class="font-display text-2xl font-bold text-gradient-gold">${o ? 'Edit Offer' : 'Add Offer'}</h3>
          <button onclick="closeModal()" class="text-ivory-100 hover:text-gold-300 p-2"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <form onsubmit="saveOfferForm(event, ${existingIdx !== null && existingIdx !== undefined ? existingIdx : 'null'})" class="mt-6 space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Offer Title</label>
            <input id="oTitle" required value="${o ? escapeHTML(o.title) : ''}" class="admin-input" placeholder="e.g. Diwali Divine Offer" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Badge Tag</label>
            <input id="oBadge" value="${o ? escapeHTML(o.badge) : ''}" class="admin-input" placeholder="FESTIVAL SPECIAL" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Description</label>
            <textarea id="oDesc" rows="2" class="admin-input">${o ? escapeHTML(o.description) : ''}</textarea>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Cover Image</label>
            <input id="oCoverFile" type="file" accept="image/*" class="admin-input text-xs" />
          </div>
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onclick="closeModal()" class="btn-outline-luxury !py-2.5 text-xs">Cancel</button>
            <button type="submit" class="btn-luxury !py-2.5 text-xs"><i class="fa-solid fa-floppy-disk"></i> ${o ? 'Update Offer' : 'Save Offer'}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

async function saveOfferForm(e, existingIdx) {
  e.preventDefault();
  try {
    const title = document.getElementById('oTitle')?.value.trim();
    if (!title) { showToast('❌ Offer title is required.'); return; }
    const badge = document.getElementById('oBadge')?.value.trim() || 'PROMO';
    const desc = document.getElementById('oDesc')?.value.trim() || '';
    const file = document.getElementById('oCoverFile')?.files?.[0];

    const hasIdx = (existingIdx !== null && existingIdx !== undefined && existingIdx !== 'null');
    const existingOffer = hasIdx ? STORE.offers[existingIdx] : null;
    let image = existingOffer ? existingOffer.image : 'images/products/16.jpeg';
    if (file) image = await compressImage(file, 600, 600, 0.65);

    const offerData = { id: existingOffer ? existingOffer.id : ('off-' + Date.now()), title, badge, description: desc, image };

    if (hasIdx && existingIdx >= 0 && existingIdx < STORE.offers.length) {
      STORE.offers[existingIdx] = offerData;
    } else {
      STORE.offers.push(offerData);
    }

    saveStore('offers');
    closeModal();
    showToast(hasIdx ? '✓ Offer updated!' : '✓ Offer added!');
    render();
  } catch (err) {
    console.error('Save offer error:', err);
    showToast('❌ Error saving offer.');
  }
}

function deleteOffer(idx) {
  if (confirm('Delete this offer?')) {
    STORE.offers.splice(idx, 1);
    saveStore('offers');
    showToast('✓ Offer deleted');
    render();
  }
}

// ---------------- GALLERY CRUD ----------------

function renderAdminGallery() {
  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 class="font-display text-2xl font-bold text-gold-200">Manage Showcase Gallery</h2>
        <button onclick="openGalleryModal()" class="btn-luxury !py-2.5 !px-5 text-xs">
          <i class="fa-solid fa-plus"></i> Upload Photo to Gallery
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${(STORE.gallery || []).map((g, idx) => `
          <div class="glass-panel p-2 rounded-2xl relative group">
            <img src="${escapeHTML(g.image)}" class="h-44 w-full rounded-xl object-cover" />
            <p class="mt-2 text-xs font-semibold text-ivory-100 truncate px-1">${escapeHTML(g.title)}</p>
            <button onclick="deleteGalleryItem(${idx})" class="absolute top-4 right-4 h-8 w-8 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openGalleryModal() {
  let mc = document.getElementById('modalContainer');
  if (!mc) {
    mc = document.createElement('div');
    mc.id = 'modalContainer';
    document.body.appendChild(mc);
  }

  mc.innerHTML = `
    <div class="modal-overlay">
      <div class="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 animate-page-entry">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 class="font-display text-2xl font-bold text-gradient-gold">Upload Gallery Photo</h3>
          <button onclick="closeModal()" class="text-ivory-100 hover:text-gold-300 p-2"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <form onsubmit="saveGalleryForm(event)" class="mt-6 space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Photo Title</label>
            <input id="gTitle" required class="admin-input" placeholder="e.g. Gold Temple Arch Installation" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Select Photo File</label>
            <input id="gFile" type="file" accept="image/*" required class="admin-input text-xs" />
          </div>
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onclick="closeModal()" class="btn-outline-luxury !py-2.5 text-xs">Cancel</button>
            <button type="submit" class="btn-luxury !py-2.5 text-xs"><i class="fa-solid fa-upload"></i> Upload</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

async function saveGalleryForm(e) {
  e.preventDefault();
  const title = document.getElementById('gTitle')?.value.trim();
  const file = document.getElementById('gFile')?.files?.[0];
  if (!title || !file) return;

  const image = await compressImage(file, 600, 600, 0.65);
  STORE.gallery.unshift({ id: 'gal-' + Date.now(), title, image, category: 'general' });
  saveStore('gallery');
  closeModal();
  showToast('✓ Photo uploaded to gallery');
  render();
}

function deleteGalleryItem(idx) {
  if (confirm('Delete this photo from gallery?')) {
    STORE.gallery.splice(idx, 1);
    saveStore('gallery');
    showToast('✓ Photo deleted');
    render();
  }
}

// ---------------- NEWSLETTER & SUBSCRIBERS ----------------

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  const email = input ? input.value.trim() : '';

  if (email) {
    if (!STORE.subscribers) STORE.subscribers = [];
    if (!STORE.subscribers.some(s => s.email === email)) {
      STORE.subscribers.push({ email: email, date: new Date().toLocaleDateString('en-IN') });
      saveStore('subscribers');
    }
    if (msg) {
      msg.textContent = '✓ Thank you! Your email has been subscribed.';
      msg.className = 'mt-2 text-xs text-emerald-400 font-semibold block';
      setTimeout(() => msg.classList.add('hidden'), 5000);
    }
    if (input) input.value = '';
  }
}

function renderAdminSubscribers() {
  const list = STORE.subscribers || [];
  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="font-display text-2xl font-bold text-gold-200">Email Subscribers List (${list.length})</h2>
        </div>
        ${list.length > 0 ? `
          <button onclick="copySubscribersList()" class="btn-luxury !py-2.5 !px-5 text-xs">
            <i class="fa-solid fa-copy mr-1"></i> Copy All Emails
          </button>
        ` : ''}
      </div>

      <div class="overflow-x-auto rounded-2xl glass-panel p-2">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-white/10 text-xs uppercase text-gold-300 font-semibold">
            <tr>
              <th class="p-3">#</th>
              <th class="p-3">Customer Email Address</th>
              <th class="p-3">Subscription Date</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            ${list.length === 0 ? `
              <tr><td colspan="4" class="p-6 text-center text-xs text-ivory-100/50">No email subscribers found.</td></tr>
            ` : list.map((s, idx) => `
              <tr class="hover:bg-white/5 transition">
                <td class="p-3 text-xs text-ivory-100/40">${idx + 1}</td>
                <td class="p-3 font-semibold text-ivory-100">${escapeHTML(s.email)}</td>
                <td class="p-3 text-xs text-ivory-100/70">${escapeHTML(s.date || 'Today')}</td>
                <td class="p-3 text-right">
                  <button onclick="deleteSubscriber('${escapeHTML(s.email)}')" class="rounded-lg bg-rose-500/15 p-2 text-rose-400 hover:bg-rose-500 hover:text-white transition" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function copySubscribersList() {
  const emails = (STORE.subscribers || []).map(s => s.email).join(', ');
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(emails);
  }
  showToast('✓ All emails copied to clipboard!');
}

function deleteSubscriber(email) {
  if (confirm(`Remove email (${email})?`)) {
    STORE.subscribers = (STORE.subscribers || []).filter(s => s.email !== email);
    saveStore('subscribers');
    showToast('✓ Email removed');
    render();
  }
}

// ---------------- SECURITY ----------------

function renderAdminSecurity() {
  return `
    <div class="max-w-xl mx-auto">
      <div class="glass-panel rounded-3xl p-8 shadow-2xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-10 w-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-300">
            <i class="fa-solid fa-key text-lg"></i>
          </div>
          <div>
            <h2 class="font-display text-2xl font-bold text-gradient-gold">Admin Security Settings</h2>
            <p class="text-xs text-ivory-100/60">Change your password and manage authentication security.</p>
          </div>
        </div>

        <form onsubmit="changeAdminPassword(event)" class="space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Current Password</label>
            <input id="currPass" type="password" required class="admin-input" placeholder="••••••••" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">New Password</label>
            <input id="newPass" type="password" required minlength="6" class="admin-input" placeholder="••••••••" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Confirm New Password</label>
            <input id="confirmPass" type="password" required minlength="6" class="admin-input" placeholder="••••••••" />
          </div>
          <button type="submit" class="btn-luxury w-full justify-center mt-6">
            <i class="fa-solid fa-shield-halved"></i> Update Password
          </button>
        </form>
      </div>
    </div>
  `;
}

async function changeAdminPassword(e) {
  e.preventDefault();
  const curr = document.getElementById('currPass')?.value.trim();
  const nxt = document.getElementById('newPass')?.value.trim();
  const cnf = document.getElementById('confirmPass')?.value.trim();

  if (nxt !== cnf) {
    alert('New passwords do not match.');
    return;
  }

  const storedHash = safeGetStorage('dpag_admin_hash', null);
  const currHash = await hashPassword(curr);
  const legacyPass = safeGetStorage('dpag_admin_pass', 'Darshan@2026');

  if ((storedHash && currHash !== storedHash) && (curr !== legacyPass)) {
    alert('Current password is incorrect.');
    return;
  }

  const newHash = await hashPassword(nxt);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('dpag_admin_hash', newHash);
    localStorage.setItem('dpag_admin_pass', nxt);
  }
  showToast('✓ Password updated securely!');
  if (document.getElementById('currPass')) document.getElementById('currPass').value = '';
  if (document.getElementById('newPass')) document.getElementById('newPass').value = '';
  if (document.getElementById('confirmPass')) document.getElementById('confirmPass').value = '';
}

// ---------------- BACKUP & JSON ----------------

function renderAdminBackup() {
  return `
    <div class="max-w-2xl mx-auto glass-panel rounded-3xl p-8">
      <h2 class="font-display text-2xl font-bold text-gold-200 mb-2">Database Backup &amp; Recovery</h2>
      <p class="text-xs text-ivory-100/60 mb-6">Download a complete JSON snapshot of all products, categories, offers, and gallery items for safekeeping.</p>
      <div class="flex flex-wrap gap-4">
        <button onclick="exportDatabaseJSON()" class="btn-luxury !py-3">
          <i class="fa-solid fa-download"></i> Export Entire Database (JSON)
        </button>
        <label class="btn-outline-luxury !py-3 cursor-pointer">
          <i class="fa-solid fa-upload"></i> Import &amp; Restore (JSON)
          <input type="file" accept=".json" onchange="importDatabaseJSON(event)" class="hidden" />
        </label>
      </div>
    </div>
  `;
}

async function adminLogin(e) {
  e.preventDefault();
  const u = (document.getElementById('aUser')?.value || '').trim().toLowerCase();
  const p = (document.getElementById('aPass')?.value || '').trim();

  if (!u || !p) {
    const msg = document.getElementById('adminMsg');
    if (msg) {
      msg.textContent = 'Please enter both username and password.';
      msg.className = 'text-sm text-rose-400 mt-4 block text-center';
      msg.classList.remove('hidden');
    }
    return;
  }
  
  const storedHash = safeGetStorage('dpag_admin_hash', null);
  const inputHash = await hashPassword(p);
  const isValidPass = (storedHash ? inputHash === storedHash : inputHash === DEFAULT_ADMIN_HASH);

  if (u === 'admin' && isValidPass) {
    STORE.adminUser = { username: 'admin', loginTime: Date.now() };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('dpag_admin', JSON.stringify(STORE.adminUser));
      localStorage.setItem('dpag_admin_hash', inputHash);
    }
    render();
  } else {
    const msg = document.getElementById('adminMsg');
    if (msg) {
      msg.textContent = 'Invalid username or password.';
      msg.className = 'text-sm text-rose-400 mt-4 block text-center';
      msg.classList.remove('hidden');
    }
  }
}

function adminLogout() {
  STORE.adminUser = null;
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('dpag_admin');
  }
  render();
}

function closeModal() {
  PHOTO_QUEUE = [];
  PHOTO_TARGET_SLUG = null;
  const mc = document.getElementById('modalContainer');
  if (mc) mc.innerHTML = '';
}

function exportDatabaseJSON() {
  const data = { PRODUCTS: STORE.products, CATEGORIES: STORE.categories, OFFERS: STORE.offers, GALLERY_ITEMS: STORE.gallery, SITE };
  const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const a = document.createElement('a'); a.setAttribute("href", str); a.setAttribute("download", "darshan_gallery_backup.json");
  if (typeof document !== 'undefined' && document.body) {
    document.body.appendChild(a); a.click(); a.remove();
  }
  showToast('✓ Backup downloaded!');
}

function importDatabaseJSON(e) {
  const f = e.target.files?.[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const d = JSON.parse(evt.target.result);
      if (d.PRODUCTS) { STORE.products = d.PRODUCTS; saveStore('products'); }
      if (d.CATEGORIES) { STORE.categories = d.CATEGORIES; saveStore('categories'); }
      if (d.OFFERS) { STORE.offers = d.OFFERS; saveStore('offers'); }
      if (d.GALLERY_ITEMS) { STORE.gallery = d.GALLERY_ITEMS; saveStore('gallery'); }
      showToast('✓ Data restored successfully!');
      setTimeout(() => render(), 800);
    } catch(err) { alert('Invalid backup JSON file.'); }
  };
  reader.readAsText(f);
}

// ---------------- LIGHTBOX MODAL ----------------
let currentGalleryList = [];
let currentGalleryIndex = 0;

function normalizeMediaItem(it, fallbackTitle = '') {
  if (typeof it === 'string') {
    return { url: it, type: /\.(mp4|webm|mov)$/i.test(it) ? 'video' : 'image', title: fallbackTitle };
  }
  if (it && typeof it === 'object') {
    const url = it.url || it.mediaUrl || it.image || it.src || '';
    return { url, type: it.type || it.mediaType || (/\.(mp4|webm|mov)$/i.test(url) ? 'video' : 'image'), title: it.title || fallbackTitle };
  }
  return { url: '', type: 'image', title: fallbackTitle };
}

function openMediaLightbox(mediaUrl, mediaType = 'image', title = '', list = [], index = 0) {
  const arr = (list && list.length) ? list.map(it => normalizeMediaItem(it, title)) : [];
  currentGalleryList = arr.length ? arr : [normalizeMediaItem(mediaUrl, title)];
  let i = Number(index);
  if (!Number.isInteger(i) || i < 0 || i >= currentGalleryList.length) i = 0;
  if (mediaUrl && currentGalleryList[i] && currentGalleryList[i].url !== mediaUrl) {
    const found = currentGalleryList.findIndex(x => x.url === mediaUrl);
    if (found > -1) i = found;
    else { currentGalleryList = [normalizeMediaItem(mediaUrl, title)]; i = 0; }
  }
  currentGalleryIndex = i;
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = 'hidden';
  }
  renderMediaLightbox();
}

function renderMediaLightbox() {
  const item = currentGalleryList[currentGalleryIndex] || { url: '', type: 'image', title: '' };
  let mc = document.getElementById('modalContainer');
  if (!mc) {
    mc = document.createElement('div');
    mc.id = 'modalContainer';
    document.body.appendChild(mc);
  }
  const url = safeMediaUrl(item.url);
  const isVideo = item.type === 'video' || /\.(mp4|webm|mov)$/i.test(item.url || '');

  mc.innerHTML = `
    <div id="mediaLightbox" onclick="if(event.target===this) closeMediaLightbox()" class="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-4 sm:p-6 text-white select-none">
      <div class="flex items-center justify-between z-10 py-2 gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <span class="rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold text-gold-300 border border-gold-400/40 whitespace-nowrap">
            ${currentGalleryList.length > 1 ? `${currentGalleryIndex + 1} / ${currentGalleryList.length}` : (isVideo ? '🎬 Video' : '🖼️ Photo')}
          </span>
          <h3 class="font-display text-sm sm:text-base font-semibold text-ivory-100 truncate max-w-[150px] sm:max-w-md">${escapeHTML(item.title || '')}</h3>
        </div>
        <button onclick="closeMediaLightbox()" aria-label="Close preview" class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-ivory-100 hover:bg-rose-500 hover:text-white transition">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div class="relative flex-1 flex items-center justify-center overflow-hidden my-3" onclick="if(event.target===this) closeMediaLightbox()">
        ${currentGalleryList.length > 1 ? `
          <button onclick="event.stopPropagation();navLightbox(-1)" aria-label="Previous" class="absolute left-1 sm:left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-noir-950/80 border border-gold-400/40 text-gold-300 backdrop-blur-md hover:bg-gold-400 hover:text-noir-950 transition">
            <i class="fa-solid fa-chevron-left text-lg"></i>
          </button>
          <button onclick="event.stopPropagation();navLightbox(1)" aria-label="Next" class="absolute right-1 sm:right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-noir-950/80 border border-gold-400/40 text-gold-300 backdrop-blur-md hover:bg-gold-400 hover:text-noir-950 transition">
            <i class="fa-solid fa-chevron-right text-lg"></i>
          </button>
        ` : ''}

        ${isVideo ? `
          <video src="${escapeHTML(url)}" controls autoplay playsinline loop class="max-h-[78vh] max-w-[92vw] object-contain rounded-2xl shadow-[0_0_50px_rgba(212,168,51,0.25)] border border-gold-400/30"></video>
        ` : `
          <img src="${escapeHTML(url)}" alt="${escapeHTML(item.title || 'Preview')}" class="max-h-[78vh] max-w-[92vw] w-auto h-auto object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/10" />
        `}
      </div>

      <div class="text-center py-2 text-xs text-ivory-100/60 font-gujarati">
        ${isVideo ? '▶ વિડિયો પ્લે થઈ રહ્યો છે' : 'બંધ કરવા ✕ દબાવો અથવા ESC કી વાપરો'}
      </div>
    </div>
  `;
}

function navLightbox(dir) {
  if (!currentGalleryList.length) return;
  currentGalleryIndex = (currentGalleryIndex + dir + currentGalleryList.length) % currentGalleryList.length;
  renderMediaLightbox();
}

function closeMediaLightbox() {
  const mc = document.getElementById('modalContainer');
  if (mc) mc.innerHTML = '';
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }
}

function populateFooter() {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
  const sl = document.getElementById('socialLinks');
  if (sl) {
    sl.innerHTML = [
      { icon: 'fa-instagram', href: SITE.social.instagram },
      { icon: 'fa-facebook-f', href: SITE.social.facebook },
      { icon: 'fa-youtube', href: SITE.social.youtube },
    ].map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-noir-950 transition"><i class="fa-brands ${s.icon}"></i></a>`).join('');
  }
  const fl = document.getElementById('footerLinks');
  if (fl) {
    fl.innerHTML = [
      ['Catalog', '/catalog'], ['Gallery', '/gallery'], ['Offers', '/offers'], ['About Us', '/about'], ['Contact', '/contact'],
    ].map(([l, h]) => `<li><a href="#${h}" class="transition hover:text-gold-300">${escapeHTML(l)}</a></li>`).join('');
  }
  const fc = document.getElementById('footerContact');
  if (fc) {
    fc.innerHTML = `
      <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot mt-1 shrink-0 text-gold-400"></i>${escapeHTML(SITE.address)}</li>
      <li class="flex items-center gap-3"><i class="fa-solid fa-phone shrink-0 text-gold-400"></i><a href="tel:${SITE.phoneRaw}" class="hover:text-gold-300">${escapeHTML(SITE.phone)}</a></li>
      <li class="flex items-center gap-3"><i class="fa-brands fa-whatsapp shrink-0 text-gold-400"></i><a href="${waLink()}" target="_blank" rel="noopener noreferrer" class="hover:text-gold-300">WhatsApp Direct Chat</a></li>
    `;
  }
}

// ---------------- MAIN ROUTER & SWITCHER ----------------

function render() {
  const route = getRoute();
  const app = document.getElementById('app');
  if (!app) return;

  let content = '';
  let title = 'Darshan Photo Art Gallery | Royal Photo Frames';

  if (route === '' || route === 'home') { content = renderHome(); }
  else if (route === 'catalog') { content = renderCatalog(); title = 'Catalog | Darshan Gallery'; }
  else if (route.startsWith('catalog/')) { content = renderCatalog(route.split('/')[1]); title = 'Catalog | Darshan Gallery'; }
  else if (route.startsWith('product/')) { content = renderProduct(route.split('/')[1]); title = 'Product Details | Darshan Gallery'; }
  else if (route === 'gallery') { content = renderGallery(); title = 'Showcase Gallery | Darshan Gallery'; }
  else if (route === 'offers') { content = renderOffers(); title = 'Special Offers | Darshan Gallery'; }
  else if (route === 'about') { content = renderAbout(); title = 'About Us | Darshan Gallery'; }
  else if (route === 'contact') { content = renderContact(); title = 'Contact Us | Darshan Gallery'; }
  else if (route === 'wishlist') { content = renderWishlist(); title = 'Wishlist | Darshan Gallery'; }
  else if (route === 'compare') { content = renderCompare(); title = 'Compare | Darshan Gallery'; }
  else if (route === 'admin/login') { content = renderAdminLogin(); title = 'Admin Access | Darshan Gallery'; }
  else if (route === 'admin' || route.startsWith('admin/')) { content = renderAdmin(); title = 'Admin Dashboard | Darshan Gallery'; }
  else { content = renderHome(); }

  app.innerHTML = `<div class="animate-page-entry">${content}</div>`;
  if (typeof document !== 'undefined') document.title = title;
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
  setTimeout(initAfterRender, 50);
}

function initAfterRender() {
  if (typeof initCounters === 'function') initCounters();
  if (typeof initScrollReveal === 'function') requestAnimationFrame(() => setTimeout(initScrollReveal, 60));
}

// Bind ALL Admin and Navigation Handlers to global window object
if (typeof window !== 'undefined') {
  if (!window.__dpagLightboxKeys) {
    window.__dpagLightboxKeys = true;
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('mediaLightbox')) return;
      if (e.key === 'Escape') closeMediaLightbox();
      else if (e.key === 'ArrowLeft') navLightbox(-1);
      else if (e.key === 'ArrowRight') navLightbox(1);
    });
  }

  window.getRoute = getRoute;
  window.navigate = navigate;
  window.render = render;
  window.getCategoryLabel = getCategoryLabel;
  window.setAdminCategoryFilter = setAdminCategoryFilter;
  window.setAdminTab = setAdminTab;
  window.renderAdmin = renderAdmin;
  window.renderAdminProducts = renderAdminProducts;
  window.openProductModal = openProductModal;
  window.saveProductForm = saveProductForm;
  window.deleteProduct = deleteProduct;
  window.handleProductPhotoSelect = handleProductPhotoSelect;
  window.handleProductPhotoDrop = handleProductPhotoDrop;
  window.handleProductPhotoReplaceFile = handleProductPhotoReplaceFile;
  window.removeProductPhoto = removeProductPhoto;
  window.moveCategory = moveCategory;
  window.openCategoryModal = openCategoryModal;
  window.saveCategoryForm = saveCategoryForm;
  window.deleteCategory = deleteCategory;
  window.openOfferModal = openOfferModal;
  window.saveOfferForm = saveOfferForm;
  window.deleteOffer = deleteOffer;
  window.openGalleryModal = openGalleryModal;
  window.saveGalleryForm = saveGalleryForm;
  window.deleteGalleryItem = deleteGalleryItem;
  window.handleNewsletterSubmit = handleNewsletterSubmit;
  window.copySubscribersList = copySubscribersList;
  window.deleteSubscriber = deleteSubscriber;
  window.changeAdminPassword = changeAdminPassword;
  window.adminLogin = adminLogin;
  window.adminLogout = adminLogout;
  window.closeModal = closeModal;
  window.exportDatabaseJSON = exportDatabaseJSON;
  window.importDatabaseJSON = importDatabaseJSON;
  window.openMediaLightbox = openMediaLightbox;
  window.closeMediaLightbox = closeMediaLightbox;
  window.navLightbox = navLightbox;

  // Global Initialization
  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', async () => {
    await loadDataStoreFromJSON();
    populateFooter();
    updateBadges();
    if (typeof initFirebaseSync === 'function') initFirebaseSync();
    if (typeof initCustomCursor === 'function') initCustomCursor();
    if (typeof initScrollListeners === 'function') initScrollListeners();
    render();
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 300);
      }
    }, 250);

    // Search Button & Drawer Listeners
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const mob = document.getElementById('mobileMenu');
        if (mob) mob.classList.remove('hidden');
        const nav = document.getElementById('mobileNav');
        if (nav) {
          nav.innerHTML = `
            <a href="#/home" onclick="document.getElementById('mobileMenu').classList.add('hidden')" class="py-3 text-base font-display text-ivory-100 border-b border-white/10 flex items-center justify-between">
              <span>Home</span> <i class="fa-solid fa-chevron-right text-xs text-gold-400/60"></i>
            </a>
            <a href="#/catalog" onclick="document.getElementById('mobileMenu').classList.add('hidden')" class="py-3 text-base font-display text-ivory-100 border-b border-white/10 flex items-center justify-between">
              <span>Catalog</span> <i class="fa-solid fa-chevron-right text-xs text-gold-400/60"></i>
            </a>
            <a href="#/gallery" onclick="document.getElementById('mobileMenu').classList.add('hidden')" class="py-3 text-base font-display text-ivory-100 border-b border-white/10 flex items-center justify-between">
              <span>Gallery</span> <i class="fa-solid fa-chevron-right text-xs text-gold-400/60"></i>
            </a>
            <a href="#/offers" onclick="document.getElementById('mobileMenu').classList.add('hidden')" class="py-3 text-base font-display text-ivory-100 border-b border-white/10 flex items-center justify-between">
              <span>Offers</span> <i class="fa-solid fa-chevron-right text-xs text-gold-400/60"></i>
            </a>
            <a href="#/about" onclick="document.getElementById('mobileMenu').classList.add('hidden')" class="py-3 text-base font-display text-ivory-100 border-b border-white/10 flex items-center justify-between">
              <span>About Us</span> <i class="fa-solid fa-chevron-right text-xs text-gold-400/60"></i>
            </a>
            <a href="#/contact" onclick="document.getElementById('mobileMenu').classList.add('hidden')" class="py-3 text-base font-display text-ivory-100 border-b border-white/10 flex items-center justify-between">
              <span>Contact</span> <i class="fa-solid fa-chevron-right text-xs text-gold-400/60"></i>
            </a>
            <a href="${waLink()}" target="_blank" rel="noopener noreferrer" class="btn-luxury mt-6 justify-center w-full">
              <i class="fa-brands fa-whatsapp text-base"></i> Chat on WhatsApp
            </a>
          `;
        }
      });
    }

    const closeMenu = document.getElementById('closeMenu');
    if (closeMenu) {
      closeMenu.addEventListener('click', () => {
        const mob = document.getElementById('mobileMenu');
        if (mob) mob.classList.add('hidden');
      });
    }

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const overlay = document.getElementById('searchOverlay');
        if (overlay) {
          overlay.classList.remove('hidden');
          overlay.classList.add('flex');
          setTimeout(() => document.getElementById('searchInput')?.focus(), 200);
        }
      });
    }

    const closeSearch = document.getElementById('closeSearch');
    if (closeSearch) {
      closeSearch.addEventListener('click', () => {
        const overlay = document.getElementById('searchOverlay');
        if (overlay) {
          overlay.classList.add('hidden');
          overlay.classList.remove('flex');
        }
      });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        const res = document.getElementById('searchResults');
        if (!res) return;
        if (!q) { res.innerHTML = ''; return; }
        const matches = (STORE.products || []).filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5);
        if (!matches.length) { res.innerHTML = '<p class="glass-panel p-4 text-xs text-ivory-100/60">No products found.</p>'; return; }
        res.innerHTML = matches.map(p => `
          <a href="#/product/${escapeHTML(p.slug)}" onclick="document.getElementById('closeSearch')?.click()" class="glass-panel flex items-center gap-4 p-3 rounded-2xl hover:border-gold-400/60 transition">
            <img src="${escapeHTML(p.images[0])}" class="h-12 w-12 rounded-xl object-cover" />
            <div><p class="text-sm font-bold text-ivory-100">${escapeHTML(p.name)}</p><p class="text-xs text-gold-300">${formatPrice(p.offerPrice || p.price)}</p></div>
          </a>
        `).join('');
      });
    }

    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'gu' : 'en';
        if (typeof localStorage !== 'undefined') localStorage.setItem('dpag_lang', currentLang);
        const label = document.getElementById('langLabel');
        if (label) label.textContent = currentLang === 'en' ? 'EN' : 'ગુ';
        render();
      });
    }
  });
}
