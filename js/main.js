/* ============================================================
   DARSHAN PHOTO ART GALLERY — MAIN CONTROLLER & APPLICATION (main.js)
   ============================================================ */

function getRoute() {
  const hash = window.location.hash || '#/home';
  return hash.replace('#', '').replace(/^\//, '');
}

function navigate(path) {
  const target = path.startsWith('/') ? '#' + path : '#/' + path;
  window.location.hash = target;
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
  const products = categorySlug ? (STORE.products || []).filter(p => p.category === categorySlug) : (STORE.products || []);
  const currentCat = (STORE.categories || []).find(c => c.slug === categorySlug);
  const totalCount = (STORE.products || []).length;

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
                  const cCount = (STORE.products || []).filter(p => p.category === c.slug).length;
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
              <span>${products.length} ${products.length === 1 ? 'Item' : 'Items'}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        ${products.length > 0 ? products.map((p, i) => renderProductCard(p, i)).join('') : `
          <div class="col-span-full py-16 text-center text-ivory-100/60 glass-panel rounded-3xl">
            <i class="fa-solid fa-box-open text-4xl text-gold-300/40 mb-3 block"></i>
            <p class="text-base font-semibold text-ivory-100">No products available in this category.</p>
            <a href="#/catalog" class="btn-luxury mt-4 text-xs">View All Products</a>
          </div>
        `}
      </div>

      ${(() => {
        if (!categorySlug) return '';
        const suggestions = getRelatedProducts({
          categorySlug,
          excludeSlugs: products.map(p => p.slug),
          limit: 8
        });
        return renderSuggestedSection(suggestions, 'Related Collections', 'Suggested for you');
      })()}
    </div>
  `;
}

function renderProduct(slug) {
  const p = (STORE.products || []).find(x => x.slug === slug);
  if (!p) return `<div class="py-24 text-center text-ivory-100/60"><h2 class="font-display text-3xl text-gold-200">Product Not Found</h2><a href="#/catalog" class="btn-luxury mt-6">Back to Catalog</a></div>`;
  addRecent(p);

  const images = (p.images && p.images.length) ? p.images : ['images/products/1.jpeg'];
  currentProductImgIndex = 0;

  return `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div class="flex flex-col gap-4">
          <div class="relative group aspect-square sm:aspect-[4/5] w-full overflow-hidden rounded-3xl glass-panel p-2 flex items-center justify-center bg-noir-900 border border-gold-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <img id="prodMainImg" src="${escapeHTML(images[0])}" alt="${escapeHTML(p.name)}" width="600" height="600" fetchpriority="high" class="h-full w-full object-contain rounded-2xl cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]" onerror="this.onerror=null;this.style.opacity='0.35'" onclick="openMediaLightbox(this.src, 'image', '${escapeHTML(p.name)}', ${JSON.stringify(images).replace(/"/g, '&quot;')}, currentProductImgIndex)" />
            ${discount(p.price, p.offerPrice) > 0 ? `<span class="absolute left-4 top-4 rounded-full bg-gold-metallic px-3 py-1 text-xs font-bold text-noir-950 shadow-lg">-${discount(p.price, p.offerPrice)}% OFF</span>` : ''}
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
          <span class="section-eyebrow font-gujarati">${escapeHTML(p.category)}</span>
          <h1 class="mt-3 font-display text-3xl font-bold text-ivory-50 sm:text-4xl md:text-5xl">${escapeHTML(p.name)}</h1>
          
          <div class="mt-6 flex items-center gap-4">
            <span class="font-display text-3xl font-bold text-gradient-gold">${formatPrice(p.offerPrice || p.price)}</span>
            ${p.offerPrice ? `<span class="text-lg text-ivory-100/40 line-through">${formatPrice(p.price)}</span><span class="rounded-full bg-gold-metallic px-3 py-1 text-xs font-bold text-noir-950">${discount(p.price, p.offerPrice)}% OFF</span>` : ''}
          </div>

          <p class="mt-6 text-sm leading-relaxed text-ivory-100/75 whitespace-pre-line">${escapeHTML(p.description || p.shortDesc || '')}</p>

          <div class="mt-6 space-y-2 border-y border-white/10 py-4 text-xs text-ivory-100/70">
            <p><strong class="text-gold-300">Material:</strong> ${escapeHTML(p.material || '24K Gold Polish Teakwood')}</p>
            <p><strong class="text-gold-300">Available Sizes:</strong> ${(p.sizes || []).join(', ')}</p>
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

// ---------------- ADMIN DASHBOARD & CRUD ----------------

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
          <span class="rounded-full px-3 py-1 text-xs font-semibold border ${isFirebaseConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">
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

function renderAdminProducts() {
  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 class="font-display text-2xl font-bold text-gold-200">Manage Products</h2>
        <button onclick="openProductModal()" class="btn-luxury !py-2.5 !px-5 text-xs">
          <i class="fa-solid fa-plus"></i> Add New Product
        </button>
      </div>

      <div class="overflow-x-auto rounded-2xl glass-panel p-2">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-white/10 text-xs uppercase text-gold-300 font-semibold">
            <tr>
              <th class="p-3">Image</th>
              <th class="p-3">Product Name</th>
              <th class="p-3">Category</th>
              <th class="p-3">Price</th>
              <th class="p-3">Offer Price</th>
              <th class="p-3">Stock</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            ${(STORE.products || []).map(p => `
              <tr class="hover:bg-white/5 transition">
                <td class="p-3">
                  <img src="${escapeHTML(p.images[0])}" class="h-12 w-12 rounded-xl object-cover border border-gold-400/30" />
                </td>
                <td class="p-3 font-semibold text-ivory-100">${escapeHTML(p.name)}</td>
                <td class="p-3 text-xs text-ivory-100/70">${escapeHTML(p.category)}</td>
                <td class="p-3 text-ivory-100/60 line-through">${formatPrice(p.price)}</td>
                <td class="p-3 font-bold text-gold-300">${formatPrice(p.offerPrice || p.price)}</td>
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
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminCategories() {
  return `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="font-display text-2xl font-bold text-gold-200">Manage Categories</h2>
          <p class="text-xs text-ivory-100/60 font-gujarati mt-1">કેટેગરીનું સ્થાન બદલવા માટે ⬆ ⬇ એરો બટન વાપરો.</p>
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
                <p class="text-[0.7rem] text-ivory-100/50 mt-1">Slug: ${escapeHTML(c.slug)}</p>
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
  
  const storedHash = localStorage.getItem('dpag_admin_hash');
  const inputHash = await hashPassword(p);
  const isValidPass = (storedHash ? inputHash === storedHash : inputHash === DEFAULT_ADMIN_HASH);

  if (u === 'admin' && isValidPass) {
    STORE.adminUser = { username: 'admin', loginTime: Date.now() };
    localStorage.setItem('dpag_admin', JSON.stringify(STORE.adminUser));
    localStorage.setItem('dpag_admin_hash', inputHash);
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
  localStorage.removeItem('dpag_admin');
  render();
}

function closeModal() {
  const mc = document.getElementById('modalContainer');
  if (mc) mc.innerHTML = '';
}

function exportDatabaseJSON() {
  const data = { PRODUCTS: STORE.products, CATEGORIES: STORE.categories, OFFERS: STORE.offers, GALLERY_ITEMS: STORE.gallery, SITE };
  const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const a = document.createElement('a'); a.setAttribute("href", str); a.setAttribute("download", "darshan_gallery_backup.json");
  document.body.appendChild(a); a.click(); a.remove();
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
  document.body.style.overflow = 'hidden';
  renderMediaLightbox();
}

function renderMediaLightbox() {
  const item = currentGalleryList[currentGalleryIndex] || { url: '', type: 'image', title: '' };
  const mc = document.getElementById('modalContainer');
  if (!mc) return;
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
  document.body.style.overflow = '';
}

if (!window.__dpagLightboxKeys) {
  window.__dpagLightboxKeys = true;
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('mediaLightbox')) return;
    if (e.key === 'Escape') closeMediaLightbox();
    else if (e.key === 'ArrowLeft') navLightbox(-1);
    else if (e.key === 'ArrowRight') navLightbox(1);
  });
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
  document.title = title;
  window.scrollTo(0, 0);
  setTimeout(initAfterRender, 50);
}

function initAfterRender() {
  if (typeof initCounters === 'function') initCounters();
  if (typeof initScrollReveal === 'function') requestAnimationFrame(() => setTimeout(initScrollReveal, 60));
}

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
      localStorage.setItem('dpag_lang', currentLang);
      const label = document.getElementById('langLabel');
      if (label) label.textContent = currentLang === 'en' ? 'EN' : 'ગુ';
      render();
    });
  }
});
