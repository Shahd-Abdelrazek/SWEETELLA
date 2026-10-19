
"use strict";

const SHOP = {
  whatsapp: "201000000000",
  currency: "EGP",
  trackingSheetCsv: "",
};

const PRODUCTS = [
  { id: "p1", category: "cupcakes", img: "images/pexels-taryn-elliott-4099126.jpg", stock: 12, price: 180, allergens: ["gluten", "dairy", "eggs"], kcal: 320, per: "piece" },
  { id: "p2", category: "wedding", img: "images/pexels-jeremy-wong-382920-1038711.jpg", stock: 3, price: 2500, allergens: ["gluten", "dairy", "eggs"], kcal: 420, per: "slice" },
  { id: "p3", category: "birthday", img: "images/pexels-gordon-ky-331483739-14612608.jpg", stock: 6, price: 650, allergens: ["gluten", "dairy", "eggs", "nuts"], kcal: 460, per: "slice" },
  { id: "p4", category: "candies", img: "images/pexels-polina-tankilevitch-5469044.jpg", stock: 20, price: 120, allergens: [], kcal: 380, per: "100g" },
  { id: "p5", category: "donuts", img: "images/pexels-cottonbro-4686958.jpg", stock: 15, price: 150, allergens: ["gluten", "dairy", "eggs"], kcal: 290, per: "piece" },
  { id: "p6", category: "cupcakes", img: "images/pexels-karolina-grabowska-5477986.jpg", stock: 8, price: 200, allergens: ["gluten", "dairy", "eggs"], kcal: 340, per: "piece" },
  { id: "p7", category: "birthday", img: "images/pexels-ron-lach-10033205.jpg", stock: 5, price: 750, allergens: ["gluten", "dairy", "eggs"], kcal: 430, per: "slice" },
  { id: "p8", category: "wedding", img: "images/pexels-rquiros-1727415.jpg", stock: 2, price: 3200, allergens: ["gluten", "dairy", "eggs", "nuts"], kcal: 450, per: "slice" },
  { id: "p9", category: "birthday", name: "prod.p9", img: "images/pexels-29192489.jpg", stock: 7, price: 600, allergens: ["gluten", "dairy", "eggs"], kcal: 440, per: "slice" },
  { id: "p10", category: "birthday", name: "prod.p10", img: "images/pexels-433527.jpg", stock: 5, price: 680, allergens: ["gluten", "dairy", "eggs"], kcal: 450, per: "slice" },
  { id: "p11", category: "wedding", name: "prod.p11", img: "images/pexels-31243101.jpg", stock: 3, price: 2900, allergens: ["gluten", "dairy", "eggs"], kcal: 430, per: "slice" },
  { id: "p12", category: "wedding", name: "prod.p12", img: "images/pexels-265801.jpg", stock: 2, price: 3500, allergens: ["gluten", "dairy", "eggs"], kcal: 440, per: "slice" },
  { id: "p13", category: "donuts", name: "prod.p13", img: "images/pexels-9157323.jpg", stock: 18, price: 170, allergens: ["gluten", "dairy", "eggs"], kcal: 310, per: "piece" },
  { id: "p14", category: "candies", name: "prod.p14", img: "images/pexels-4202952.jpg", stock: 25, price: 60, allergens: [], kcal: 390, per: "100g" },
  { id: "p16", category: "candies", name: "prod.p16", img: "images/pexels-1906435.jpg", stock: 30, price: 90, allergens: [], kcal: 395, per: "100g" },
  { id: "p17", category: "candies", name: "prod.p17", img: "images/pexels-15779773.jpg", stock: 12, price: 220, allergens: ["eggs", "nuts", "dairy"], kcal: 410, per: "100g" },
  { id: "p15", category: "cupcakes", name: "prod.p15", img: "images/pexels-853005.jpg", stock: 14, price: 190, allergens: ["gluten", "dairy", "eggs"], kcal: 330, per: "piece" },
  // 🌿 Diet menu: lighter recipes shown when a visitor switches the menu to "Diet".
  { id: "d1", category: "cupcakes", diet: true, name: "prod.d1", img: "images/pexels-4109792.jpg", stock: 10, price: 200, allergens: ["gluten", "dairy", "eggs"], kcal: 190, per: "piece" },
  { id: "d2", category: "birthday", diet: true, name: "prod.d2", img: "images/pexels-4686833.jpg", stock: 4, price: 700, allergens: ["gluten", "dairy", "eggs"], kcal: 240, per: "slice" },
  { id: "d3", category: "wedding", diet: true, name: "prod.d3", img: "images/pexels-4693617.jpg", stock: 2, price: 2800, allergens: ["gluten", "dairy", "eggs"], kcal: 260, per: "slice" },
  { id: "d4", category: "candies", diet: true, name: "prod.d4", img: "images/pexels-1236662.jpg", stock: 15, price: 140, allergens: [], kcal: 150, per: "100g" },
  { id: "d5", category: "donuts", diet: true, name: "prod.d5", img: "images/pexels-9619310.jpg", stock: 12, price: 160, allergens: ["gluten", "dairy", "eggs"], kcal: 170, per: "piece" },
];
const LOW_STOCK = 5;
const CART_KEY = "sweetella-cart";
const STOCK_KEY = "sweetella-stock";
const CUSTOM_KEY = "sweetella-custom-cakes";
const INGREDIENT_KEY = "sweetella-ingredients";

const CAKE_OPTIONS = {
  size: [
    { id: "small", servings: 6, units: 1, price: 300 },
    { id: "medium", servings: 12, units: 2, price: 500 },
    { id: "large", servings: 20, units: 3, price: 750 },
  ],
  tiers: [{ id: 1 }, { id: 2 }, { id: 3 }],
  shape: [{ id: "round", price: 0 }, { id: "square", price: 50 }],
  sponge: [
    { id: "vanilla", color: "#f3dfa2", stock: 30, price: 0, allergens: ["gluten", "eggs", "dairy"], kcal: 180 },
    { id: "chocolate", color: "#6b3e26", stock: 24, price: 20, allergens: ["gluten", "eggs", "dairy"], kcal: 200 },
    { id: "redvelvet", color: "#a4161a", stock: 6, price: 40, allergens: ["gluten", "eggs", "dairy"], kcal: 195 },
    { id: "strawberry", color: "#f7a1b5", stock: 9, price: 30, allergens: ["gluten", "eggs", "dairy"], kcal: 175 },
    { id: "lemon", color: "#f6e27a", stock: 0, price: 25, allergens: ["gluten", "eggs", "dairy"], kcal: 170 },
    { id: "lightvanilla", color: "#f7ecc8", stock: 14, price: 35, allergens: ["gluten", "eggs", "dairy"], light: true, kcal: 115 },
  ],
  filling: [
    { id: "buttercream", color: "#fff3e0", stock: 30, price: 0, allergens: ["dairy"], kcal: 110 },
    { id: "ganache", color: "#4a2511", stock: 12, price: 30, allergens: ["dairy"], kcal: 130 },
    { id: "jam", color: "#d7263d", stock: 4, price: 20, allergens: [], kcal: 60 },
    { id: "creamcheese", color: "#fffaf0", stock: 8, price: 35, allergens: ["dairy"], kcal: 100 },
    { id: "caramel", color: "#c8813a", stock: 3, price: 30, allergens: ["dairy"], kcal: 120 },
    { id: "fruit", color: "#ffd1dc", stock: 10, price: 30, allergens: ["dairy"], light: true, kcal: 45 },
  ],
  frosting: [
    { id: "white", color: "#fffaf5", stock: 30, price: 0, allergens: ["dairy"], kcal: 120 },
    { id: "pink", color: "#f9b9cf", stock: 15, price: 0, allergens: ["dairy"], kcal: 120 },
    { id: "chocolate", color: "#7b4a2e", stock: 10, price: 25, allergens: ["dairy"], kcal: 140 },
    { id: "blue", color: "#bfe3f2", stock: 5, price: 15, allergens: ["dairy"], kcal: 120 },
    { id: "mint", color: "#c8efd9", stock: 2, price: 15, allergens: ["dairy"], kcal: 120 },
    { id: "whipped", color: "#fffdf8", stock: 12, price: 20, allergens: ["dairy"], light: true, kcal: 55 },
  ],
  toppings: [
    { id: "strawberries", icon: "🍓", stock: 6, price: 40, allergens: [], kcal: 5 },
    { id: "sprinkles", icon: "✨", stock: 20, price: 15, allergens: [], kcal: 15 },
    { id: "macarons", icon: "🍪", stock: 4, price: 60, allergens: ["nuts", "eggs"], kcal: 40 },
    { id: "drip", icon: "🍫", stock: 10, price: 35, allergens: ["dairy"], kcal: 45 },
    { id: "flowers", icon: "🌸", stock: 3, price: 50, allergens: [], kcal: 10 },
    { id: "gold", icon: "⭐", stock: 2, price: 90, allergens: [], kcal: 0 },
    { id: "candles", icon: "🕯️", stock: 50, price: 10, allergens: [], kcal: 0 },
  ],
};
const INGREDIENT_GROUPS = ["sponge", "filling", "frosting", "toppings"];

// Calories are estimates per serving (a slice of cake, one piece, or 100 g of candy).
const LIGHT_KCAL = 350;
const DAILY_KCAL = 2000;

function cakeKcalPerSlice(cfg) {
  const base = ["sponge", "filling", "frosting"].reduce((sum, group) => sum + cakeOption(group, cfg[group]).kcal, 0);
  return base + cfg.toppings.reduce((sum, id) => sum + cakeOption("toppings", id).kcal, 0);
}

function cakeServings(cfg) {
  return cakeOption("size", cfg.size).servings * cfg.tiers;
}

function formatKcal(n) {
  const locale = (typeof LANGUAGES !== "undefined" && LANGUAGES[getLang()].locale) || "en-US";
  return `${new Intl.NumberFormat(locale).format(Math.round(n))} ${t("kcal.unit")}`;
}

// Calories for one serving of a product, e.g. "320 kcal / piece".
function kcalLabel(product) {
  return `${formatKcal(product.kcal)} ${t(`kcal.per.${product.per}`)}`;
}

function orderKcal() {
  const products = Object.entries(store.cart).reduce((sum, [id, qty]) => sum + (store.product(id) ? store.product(id).kcal * qty : 0), 0);
  return products + store.customs.reduce((sum, cake) => sum + cakeKcalPerSlice(cake.cfg) * cakeServings(cake.cfg), 0);
}

// Allergen info is a guide shown to customers; keep it in sync with the real recipes.
const ALLERGENS = { gluten: "🌾", dairy: "🥛", eggs: "🥚", nuts: "🥜" };
const LAST_ORDER_KEY = "sweetella-last-order";

function cakeAllergens(cfg) {
  const found = new Set();
  ["sponge", "filling", "frosting"].forEach((group) => cakeOption(group, cfg[group]).allergens.forEach((a) => found.add(a)));
  cfg.toppings.forEach((id) => cakeOption("toppings", id).allergens.forEach((a) => found.add(a)));
  return Object.keys(ALLERGENS).filter((a) => found.has(a));
}

function allergenChips(list) {
  if (!list.length) return `<span class="allergen none">✅ ${t("allergen.none")}</span>`;
  return list.map((a) => `<span class="allergen" title="${t(`allergen.${a}`)}">${ALLERGENS[a]} ${t(`allergen.${a}`)}</span>`).join("");
}

// Price of a custom cake: base per tier + shape + ingredient extras (per unit) + toppings (per tier).
function cakePrice(cfg) {
  const size = cakeOption("size", cfg.size);
  const units = size.units * cfg.tiers;
  const extras = ["sponge", "filling", "frosting"].reduce((sum, group) => sum + cakeOption(group, cfg[group]).price, 0);
  const toppings = cfg.toppings.reduce((sum, id) => sum + cakeOption("toppings", id).price, 0);
  return size.price * cfg.tiers + cakeOption("shape", cfg.shape).price + extras * units + toppings * cfg.tiers;
}

function formatPrice(amount) {
  const locale = (typeof LANGUAGES !== "undefined" && LANGUAGES[getLang()].locale) || "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency: SHOP.currency, maximumFractionDigits: 0 }).format(amount);
}

function cakeOption(group, id) {
  return CAKE_OPTIONS[group].find((o) => o.id === id);
}

// Ingredient units a cake needs, keyed like "sponge:vanilla".
function cakeUsage(cfg) {
  const units = cakeOption("size", cfg.size).units * cfg.tiers;
  const usage = {
    [`sponge:${cfg.sponge}`]: units,
    [`filling:${cfg.filling}`]: units,
    [`frosting:${cfg.frosting}`]: units,
  };
  cfg.toppings.forEach((top) => {
    usage[`toppings:${top}`] = cfg.tiers;
  });
  return usage;
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? value : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Storage blocked: the cart still works until the page is reloaded.
  }
}

const store = {
  cart: readJson(CART_KEY, {}),
  stock: readJson(STOCK_KEY, {}),
  customs: Array.isArray(readJson(CUSTOM_KEY, [])) ? readJson(CUSTOM_KEY, []) : [],
  ingredients: readJson(INGREDIENT_KEY, {}),

  ingredientStock(key) {
    const saved = this.ingredients[key];
    if (Number.isInteger(saved)) return saved;
    const [group, id] = key.split(":");
    const option = cakeOption(group, id);
    return option ? option.stock : 0;
  },
  // Ingredient units still free: stock minus what custom cakes in the cart have reserved.
  ingredientAvailable(key) {
    const reserved = this.customs.reduce((sum, cake) => sum + (cakeUsage(cake.cfg)[key] || 0), 0);
    return Math.max(0, this.ingredientStock(key) - reserved);
  },
  addCustom(cfg) {
    this.customs.push({ id: `c${Date.now()}`, cfg });
    writeJson(CUSTOM_KEY, this.customs);
  },
  removeCustom(id) {
    this.customs = this.customs.filter((cake) => cake.id !== id);
    writeJson(CUSTOM_KEY, this.customs);
  },

  product(id) {
    return PRODUCTS.find((p) => p.id === id);
  },
  stockOf(id) {
    const saved = this.stock[id];
    return Number.isInteger(saved) ? saved : this.product(id).stock;
  },
  inCart(id) {
    return this.cart[id] || 0;
  },
  // What a shopper can still add: stock minus what is already in their cart.
  available(id) {
    return Math.max(0, this.stockOf(id) - this.inCart(id));
  },
  availableByCategory(category) {
    return PRODUCTS.filter((p) => p.category === category).reduce((sum, p) => sum + this.available(p.id), 0);
  },
  total() {
    const products = Object.entries(this.cart).reduce((sum, [id, qty]) => sum + (this.product(id) ? this.product(id).price * qty : 0), 0);
    return products + this.customs.reduce((sum, cake) => sum + cakePrice(cake.cfg), 0);
  },
  count() {
    return Object.values(this.cart).reduce((sum, qty) => sum + qty, 0) + this.customs.length;
  },
  setQty(id, qty) {
    const clamped = Math.max(0, Math.min(qty, this.stockOf(id)));
    if (clamped === 0) delete this.cart[id];
    else this.cart[id] = clamped;
    writeJson(CART_KEY, this.cart);
  },
  checkout() {
    Object.entries(this.cart).forEach(([id, qty]) => {
      this.stock[id] = Math.max(0, this.stockOf(id) - qty);
    });
    this.customs.forEach((cake) => {
      Object.entries(cakeUsage(cake.cfg)).forEach(([key, units]) => {
        this.ingredients[key] = Math.max(0, this.ingredientStock(key) - units);
      });
    });
    this.cart = {};
    this.customs = [];
    writeJson(STOCK_KEY, this.stock);
    writeJson(CART_KEY, this.cart);
    writeJson(CUSTOM_KEY, this.customs);
    writeJson(INGREDIENT_KEY, this.ingredients);
  },
};

function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
}

function productName(id, lang) {
  const product = store.product(id);
  return t(product.name || `cat.${product.category}`, lang);
}

// ---------- UI ----------

function cartDrawerTemplate() {
  return `
  <div class="offcanvas offcanvas-end cart-drawer" tabindex="-1" id="cartDrawer" aria-labelledby="cartTitle">
    <div class="offcanvas-header cart-head">
      <h5 class="offcanvas-title" id="cartTitle"><i class="fa-solid fa-basket-shopping" aria-hidden="true"></i> <span data-i18n="cart.title"></span></h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-i18n-aria="modal.close"></button>
    </div>
    <div class="offcanvas-body">
      <a class="track-link" href="track.html"><i class="fa-solid fa-truck-fast" aria-hidden="true"></i> <span data-i18n="track.cta"></span> <i class="fa-solid fa-chevron-right flip-rtl ms-auto" aria-hidden="true"></i></a>
      <div id="cartItems" class="cart-items"></div>
      <div id="cartEmpty" class="cart-empty">
        <span class="cart-empty-ic"><i class="fa-solid fa-basket-shopping" aria-hidden="true"></i></span>
        <p data-i18n="cart.empty"></p>
        <a class="btn-sweet btn-sm-sweet" href="menu.html" data-i18n="cart.browse"></a>
      </div>
      <button type="button" class="reorder-btn" id="reorderBtn" hidden>
        <span class="reorder-ic"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i></span>
        <span><strong data-i18n="reorder.title"></strong><small id="reorderInfo"></small></span>
      </button>
    </div>
    <div class="cart-foot" id="cartFoot">
      <div class="cart-total"><span data-i18n="cart.items"></span><strong id="cartTotal">0</strong></div>
      <div class="cart-total cart-kcal-total"><span>🔥 <span data-i18n="kcal.orderTotal"></span></span><strong id="cartKcal">0</strong></div>
      <div class="cart-total cart-grand"><span data-i18n="cart.total"></span><strong id="cartPrice">0</strong></div>
      <button type="button" class="btn-sweet w-100 justify-content-center" id="cartCheckout"><span data-i18n="cart.checkout"></span> <i class="fa-solid fa-check" aria-hidden="true"></i></button>
      <button type="button" class="link-btn mt-2" id="cartClear" data-i18n="cart.clear"></button>
    </div>
  </div>`;
}

function renderCart() {
  const list = document.getElementById("cartItems");
  if (!list) return;

  const ids = Object.keys(store.cart).filter((id) => store.product(id));
  list.innerHTML = ids
    .map((id) => {
      const product = store.product(id);
      const left = store.available(id);
      const low = left <= LOW_STOCK;
      return `
      <div class="cart-line" data-line="${id}">
        <img src="${product.img}" alt="">
        <div class="cart-line-info">
          <h6>${productName(id)} <span class="line-price">${formatPrice(product.price * store.inCart(id))}</span></h6>
          <p class="cart-kcal">🔥 ${kcalLabel(product)}</p>
          <p class="cart-stock${left === 0 ? " out" : low ? " low" : ""}">
            <i class="fa-solid fa-box" aria-hidden="true"></i>
            ${left === 0 ? t("cart.out") : fill(t("cart.left"), { n: left })}
          </p>
          <div class="qty">
            <button type="button" data-qty="-1" aria-label="-"><i class="fa-solid fa-minus" aria-hidden="true"></i></button>
            <span>${store.inCart(id)}</span>
            <button type="button" data-qty="1" aria-label="+" ${left === 0 ? "disabled" : ""}><i class="fa-solid fa-plus" aria-hidden="true"></i></button>
          </div>
        </div>
        <button type="button" class="cart-remove" data-remove aria-label="${t("cart.remove")}"><i class="fa-regular fa-trash-can" aria-hidden="true"></i></button>
      </div>`;
    })
    .join("") + store.customs.map(customLineHtml).join("");

  const count = store.count();
  document.getElementById("cartEmpty").hidden = count > 0;
  document.getElementById("cartFoot").hidden = count === 0;
  document.getElementById("cartTotal").textContent = count;
  document.getElementById("cartPrice").textContent = formatPrice(store.total());
  document.getElementById("cartKcal").textContent = formatKcal(orderKcal());
  const last = readJson(LAST_ORDER_KEY, null);
  const reorder = document.getElementById("reorderBtn");
  const lastCount = last ? Object.values(last.cart || {}).reduce((a, b) => a + b, 0) + (last.customs || []).length : 0;
  reorder.hidden = !lastCount;
  if (lastCount) document.getElementById("reorderInfo").textContent = fill(t("reorder.info"), { n: lastCount });

  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
    badge.hidden = count === 0;
  });
}

function cakeSummary(cfg) {
  const parts = [
    `${t(`size.${cfg.size}`)} · ${t(`builder.tier${cfg.tiers}`)} · ${t(`shape.${cfg.shape}`)}`,
    `${t(`sponge.${cfg.sponge}`)} + ${t(`filling.${cfg.filling}`)} · ${t(`frosting.${cfg.frosting}`)}`,
  ];
  if (cfg.toppings.length) {
    parts.push(cfg.toppings.map((id) => `${cakeOption("toppings", id).icon} ${t(`top.${id}`)}`).join(getLang() === "ar" ? "، " : ", "));
  }
  return parts;
}

function customLineHtml(cake) {
  const frosting = cakeOption("frosting", cake.cfg.frosting).color;
  const message = cake.cfg.message ? `<p class="custom-msg">“${escapeHtml(cake.cfg.message)}”</p>` : "";
  return `
    <div class="cart-line custom-line" data-custom="${cake.id}">
      <span class="custom-thumb" style="--frost:${frosting}">🎂</span>
      <div class="cart-line-info">
        <h6>${t("builder.customCake")} <span class="line-price">${formatPrice(cakePrice(cake.cfg))}</span></h6>
        ${cakeSummary(cake.cfg).map((line) => `<p class="custom-detail">${line}</p>`).join("")}
        <p class="cart-kcal">🔥 ${formatKcal(cakeKcalPerSlice(cake.cfg))} ${t("kcal.per.slice")} · ${fill(t("builder.serves"), { n: cakeServings(cake.cfg) })}</p>
        ${message}
      </div>
      <button type="button" class="cart-remove" data-remove-custom aria-label="${t("cart.remove")}"><i class="fa-regular fa-trash-can" aria-hidden="true"></i></button>
    </div>`;
}

function renderStockBadges() {
  document.querySelectorAll("[data-product]").forEach((el) => {
    const id = el.dataset.product;
    if (!store.product(id)) return;
    const left = store.available(id);

    el.querySelectorAll("[data-price]").forEach((price) => {
      price.textContent = formatPrice(store.product(id).price);
    });
    el.querySelectorAll("[data-kcal]").forEach((box) => {
      const product = store.product(id);
      const light = product.kcal < LIGHT_KCAL;
      box.className = `kcal-chip${light ? " light" : ""}`;
      box.innerHTML = `${light ? "🌿" : "🔥"} ${kcalLabel(product)}`;
    });
    el.querySelectorAll("[data-kcal-daily]").forEach((box) => {
      box.textContent = fill(t("kcal.daily"), { p: Math.round((store.product(id).kcal / DAILY_KCAL) * 100) });
    });
    el.querySelectorAll("[data-allergens]").forEach((box) => {
      box.innerHTML = allergenChips(store.product(id).allergens);
    });

    const badge = el.querySelector("[data-stock-badge]");
    if (badge) {
      badge.className = `stock-badge${left === 0 ? " out" : left <= LOW_STOCK ? " low" : ""}`;
      badge.textContent =
        left === 0 ? t("cart.out") : left <= LOW_STOCK ? fill(t("cart.onlyLeft"), { n: left }) : fill(t("cart.inStock"), { n: left });
    }
    el.querySelectorAll("[data-add-to-cart]").forEach((button) => {
      button.disabled = left === 0;
    });
  });
}

function refreshStore() {
  renderCart();
  renderStockBadges();
  document.dispatchEvent(new CustomEvent("sweetella:storechange"));
}

// The product photo flies up into the cart icon.
function flyToCart(sourceImg) {
  const target = document.querySelector(".cart-btn");
  if (!sourceImg || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const from = sourceImg.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const flyer = sourceImg.cloneNode();
  flyer.className = "cart-flyer";
  Object.assign(flyer.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
  document.body.appendChild(flyer);

  requestAnimationFrame(() => {
    Object.assign(flyer.style, {
      left: `${to.left + to.width / 2 - 20}px`,
      top: `${to.top + to.height / 2 - 20}px`,
      width: "40px",
      height: "40px",
      opacity: "0.3",
    });
  });
  flyer.addEventListener("transitionend", () => flyer.remove(), { once: true });
  window.setTimeout(() => flyer.remove(), 1200);
}

function bumpCartIcon() {
  const button = document.querySelector(".cart-btn");
  if (!button) return;
  button.classList.remove("bump");
  void button.offsetWidth; // restart the animation
  button.classList.add("bump");
}

function addToCart(id, sourceImg) {
  if (store.available(id) === 0) {
    showToast(fill(t("cart.maxReached"), { name: productName(id) }));
    return;
  }
  store.setQty(id, store.inCart(id) + 1);
  flyToCart(sourceImg);
  window.setTimeout(bumpCartIcon, 650);
  refreshStore();
  showToast(fill(t("cart.added"), { name: productName(id), n: store.available(id) }));
}

function initStore() {
  document.body.insertAdjacentHTML("beforeend", cartDrawerTemplate());

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
      const holder = addButton.closest("[data-product]");
      if (holder) addToCart(holder.dataset.product, holder.querySelector("img"));
      return;
    }

    const customLine = event.target.closest("[data-custom]");
    if (customLine && event.target.closest("[data-remove-custom]")) {
      store.removeCustom(customLine.dataset.custom);
      refreshStore();
      return;
    }

    const line = event.target.closest("[data-line]");
    if (!line) return;
    const id = line.dataset.line;
    const qtyButton = event.target.closest("[data-qty]");
    if (qtyButton) {
      store.setQty(id, store.inCart(id) + Number(qtyButton.dataset.qty));
      refreshStore();
    } else if (event.target.closest("[data-remove]")) {
      store.setQty(id, 0);
      refreshStore();
    }
  });

  document.getElementById("cartClear").addEventListener("click", () => {
    Object.keys(store.cart).forEach((id) => store.setQty(id, 0));
    refreshStore();
  });

  initCheckout();

  // Put the previous order back in the cart, as far as stock allows.
  document.getElementById("reorderBtn").addEventListener("click", () => {
    const last = readJson(LAST_ORDER_KEY, null);
    if (!last) return;
    let skipped = 0;
    Object.entries(last.cart || {}).forEach(([id, qty]) => {
      if (!store.product(id)) return;
      const add = Math.min(qty, store.available(id));
      skipped += qty - add;
      if (add) store.setQty(id, store.inCart(id) + add);
    });
    (last.customs || []).forEach((cfg) => {
      const usage = cakeUsage(cfg);
      if (Object.keys(usage).every((key) => store.ingredientAvailable(key) >= usage[key])) store.addCustom(cfg);
      else skipped += 1;
    });
    refreshStore();
    showToast(t(skipped ? "reorder.partial" : "reorder.done"));
  });

  // Keep the cart in sync if it changes in another tab.
  window.addEventListener("storage", (event) => {
    if ([CART_KEY, STOCK_KEY, CUSTOM_KEY, INGREDIENT_KEY].includes(event.key)) {
      store.cart = readJson(CART_KEY, {});
      store.stock = readJson(STOCK_KEY, {});
      store.customs = readJson(CUSTOM_KEY, []);
      store.ingredients = readJson(INGREDIENT_KEY, {});
      refreshStore();
    }
  });

  document.addEventListener("sweetella:languagechange", refreshStore);
  refreshStore();
}

// ---------- Checkout: collect delivery details, then send the order on WhatsApp ----------

function checkoutTemplate() {
  const payments = ["cash", "vodafone", "instapay"]
    .map((id, i) => `<input type="radio" class="btn-check" name="payment" id="pay-${id}" value="${id}" ${i === 0 ? "checked" : ""}><label class="pill-choice" for="pay-${id}" data-i18n="co.pay.${id}"></label>`)
    .join("");
  return `
  <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content sweet-modal">
        <div class="login-head checkout-head">
          <h5 class="modal-title" id="checkoutTitle"><i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> <span data-i18n="co.title"></span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" data-i18n-aria="modal.close"></button>
        </div>
        <div class="modal-body">
          <form id="checkoutForm">
            <div class="row g-4">
              <div class="col-md-7">
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label class="form-label" for="coName"><span data-i18n="contact.name"></span> <span class="req">*</span></label>
                    <input class="form-control sweet-input" id="coName" name="name" autocomplete="name" required>
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label" for="coPhone"><span data-i18n="contact.phone"></span> <span class="req">*</span></label>
                    <input class="form-control sweet-input" id="coPhone" name="phone" type="tel" dir="ltr" autocomplete="tel" pattern="[0-9+ ]{8,}" required>
                  </div>
                  <div class="col-12">
                    <span class="form-label d-block" data-i18n="co.method"></span>
                    <div class="pill-group">
                      <input type="radio" class="btn-check" name="method" id="m-delivery" value="delivery" checked><label class="pill-choice" for="m-delivery"><i class="fa-solid fa-truck" aria-hidden="true"></i> <span data-i18n="co.delivery"></span></label>
                      <input type="radio" class="btn-check" name="method" id="m-pickup" value="pickup"><label class="pill-choice" for="m-pickup"><i class="fa-solid fa-store" aria-hidden="true"></i> <span data-i18n="co.pickup"></span></label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-switch gift-switch">
                      <input class="form-check-input" type="checkbox" id="coGift" name="gift">
                      <label class="form-check-label" for="coGift">🎁 <strong data-i18n="gift.toggle"></strong> <small data-i18n="gift.hint"></small></label>
                    </div>
                  </div>
                  <div class="col-12 gift-box" id="coGiftBox" hidden>
                    <div class="row g-3">
                      <div class="col-sm-6">
                        <label class="form-label" for="coGiftName"><span data-i18n="gift.name"></span> <span class="req">*</span></label>
                        <input class="form-control sweet-input" id="coGiftName" name="giftName">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label" for="coGiftPhone"><span data-i18n="gift.phone"></span> <span class="req">*</span></label>
                        <input class="form-control sweet-input" id="coGiftPhone" name="giftPhone" type="tel" dir="ltr" pattern="[0-9+ ]{8,}">
                      </div>
                      <div class="col-12">
                        <label class="form-label" for="coGiftCard" data-i18n="gift.card"></label>
                        <textarea class="form-control sweet-input gift-card-input" id="coGiftCard" name="giftCard" rows="2" maxlength="160" data-i18n-placeholder="gift.cardPh"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-12" id="coAddressWrap">
                    <label class="form-label" for="coAddress"><span data-i18n="co.address"></span> <span class="req">*</span></label>
                    <input class="form-control sweet-input" id="coAddress" name="address" autocomplete="street-address" required>
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label" for="coDate"><span data-i18n="co.date"></span> <span class="req">*</span></label>
                    <input class="form-control sweet-input" id="coDate" name="date" type="date" required>
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label" for="coTime" data-i18n="co.time"></label>
                    <input class="form-control sweet-input" id="coTime" name="time" type="time">
                  </div>
                  <p class="co-hint col-12" id="coDateHint"></p>
                  <div class="col-12">
                    <span class="form-label d-block" data-i18n="co.payment"></span>
                    <div class="pill-group">${payments}</div>
                  </div>
                  <div class="col-12">
                    <label class="form-label" for="coNotes" data-i18n="co.notes"></label>
                    <textarea class="form-control sweet-input" id="coNotes" name="notes" rows="2"></textarea>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="co-summary">
                  <p class="side-label" data-i18n="co.summary"></p>
                  <ul id="coItems"></ul>
                  <div class="co-total"><span data-i18n="cart.total"></span><strong id="coTotal"></strong></div>
                  <button type="submit" class="btn-whatsapp w-100"><i class="fab fa-whatsapp" aria-hidden="true"></i> <span data-i18n="co.send"></span></button>
                  <p class="co-note" data-i18n="co.note"></p>
                </div>
              </div>
            </div>
          </form>

          <div class="contact-success" id="coSuccess" hidden>
            <span class="success-icon"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
            <h2 data-i18n="co.doneTitle"></h2>
            <p><span data-i18n="co.orderNo"></span> <strong id="coOrderNo"></strong></p>
            <p data-i18n="co.doneText"></p>
            <div class="co-done-actions">
              <a class="btn-whatsapp" id="coReopen" href="#" target="_blank" rel="noopener"><i class="fab fa-whatsapp" aria-hidden="true"></i> <span data-i18n="co.reopen"></span></a>
              <a class="btn-outline-sweet" id="coTrack" href="track.html"><i class="fa-solid fa-truck-fast" aria-hidden="true"></i> <span data-i18n="track.cta"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function isoDate(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function orderLines() {
  const lines = Object.entries(store.cart)
    .filter(([id]) => store.product(id))
    .map(([id, qty]) => ({ text: `${qty} × ${productName(id)}`, price: store.product(id).price * qty, kcal: store.product(id).kcal * qty }));
  store.customs.forEach((cake) => {
    const details = cakeSummary(cake.cfg).join(" · ");
    const message = cake.cfg.message ? ` · “${cake.cfg.message}”` : "";
    lines.push({ text: `${t("builder.customCake")}: ${details}${message}`, price: cakePrice(cake.cfg), kcal: cakeKcalPerSlice(cake.cfg) * cakeServings(cake.cfg) });
  });
  return lines;
}

function buildWhatsAppMessage(form, orderNo) {
  const data = new FormData(form);
  const delivery = data.get("method") === "delivery";
  const rows = [
    `🍰 *${t("co.waTitle")}* — ${orderNo}`,
    "",
    `👤 ${t("contact.name")}: ${data.get("name")}`,
    `📞 ${t("contact.phone")}: ${data.get("phone")}`,
    `${delivery ? "🚚" : "🏪"} ${t(delivery ? "co.delivery" : "co.pickup")}${delivery ? `: ${data.get("address")}` : ""}`,
    ...(data.get("gift")
      ? [
          `🎁 *${t("gift.toggle")}*`,
          `   ${t("gift.name")}: ${data.get("giftName")} — ${data.get("giftPhone")}`,
          ...(data.get("giftCard").trim() ? [`   💌 ${t("gift.card")}: “${data.get("giftCard").trim()}”`] : []),
        ]
      : []),
    `📅 ${t("co.date")}: ${data.get("date")}${data.get("time") ? ` ${data.get("time")}` : ""}`,
    `💳 ${t("co.payment")}: ${t(`co.pay.${data.get("payment")}`)}`,
    "",
    ...orderLines().map((line) => `• ${line.text} — ${formatPrice(line.price)}`),
    "",
    `*${t("cart.total")}: ${formatPrice(store.total())}*`,
    "",
    `📦 ${t("track.waLine")} ${trackUrl(orderNo)}`,
  ];
  if (data.get("notes").trim()) rows.push("", `📝 ${t("co.notes")}: ${data.get("notes").trim()}`);
  return rows.join("\n");
}

function initCheckout() {
  document.body.insertAdjacentHTML("beforeend", checkoutTemplate());
  const modalEl = document.getElementById("checkoutModal");
  const form = document.getElementById("checkoutForm");
  const success = document.getElementById("coSuccess");
  const addressWrap = document.getElementById("coAddressWrap");
  const address = document.getElementById("coAddress");
  const dateInput = document.getElementById("coDate");

  function fillSummary() {
    document.getElementById("coItems").innerHTML = orderLines()
      .map((line) => `<li><span>${escapeHtml(line.text)}<small class="co-kcal">🔥 ${formatKcal(line.kcal)}</small></span><strong>${formatPrice(line.price)}</strong></li>`)
      .join("");
    document.getElementById("coTotal").textContent = formatPrice(store.total());
    // Custom cakes need two days' notice; ready-made items can be ordered for tomorrow.
    const leadDays = store.customs.length ? 2 : 1;
    dateInput.min = isoDate(leadDays);
    if (!dateInput.value || dateInput.value < dateInput.min) dateInput.value = dateInput.min;
    document.getElementById("coDateHint").textContent = t(store.customs.length ? "co.hintCustom" : "co.hint");
  }

  form.addEventListener("change", (event) => {
    if (event.target.name === "gift") {
      const gift = event.target.checked;
      document.getElementById("coGiftBox").hidden = !gift;
      document.getElementById("coGiftName").required = gift;
      document.getElementById("coGiftPhone").required = gift;
      // A gift is always delivered to the recipient.
      if (gift) {
        document.getElementById("m-delivery").checked = true;
        addressWrap.hidden = false;
        address.required = true;
      }
      document.getElementById("m-pickup").disabled = gift;
    }
    if (event.target.name === "method") {
      const delivery = event.target.value === "delivery";
      addressWrap.hidden = !delivery;
      address.required = delivery;
    }
  });

  document.getElementById("cartCheckout").addEventListener("click", () => {
    if (!store.count()) return;
    form.hidden = false;
    success.hidden = true;
    fillSummary();
    const drawer = bootstrap.Offcanvas.getInstance(document.getElementById("cartDrawer"));
    if (drawer) drawer.hide();
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const orderNo = `SW-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const url = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage(form, orderNo))}`;
    window.open(url, "_blank", "noopener");

    writeJson(LAST_ORDER_KEY, { cart: { ...store.cart }, customs: store.customs.map((cake) => cake.cfg) });
    rememberMyOrder(orderNo, store.total());
    store.checkout();
    refreshStore();
    document.getElementById("coOrderNo").textContent = orderNo;
    document.getElementById("coReopen").href = url;
    document.getElementById("coTrack").href = `track.html?order=${encodeURIComponent(orderNo)}`;
    form.hidden = true;
    success.hidden = false;
    form.reset();
    addressWrap.hidden = false;
    address.required = true;
    document.getElementById("coGiftBox").hidden = true;
    document.getElementById("coGiftName").required = false;
    document.getElementById("coGiftPhone").required = false;
    document.getElementById("m-pickup").disabled = false;
  });

  document.addEventListener("sweetella:languagechange", () => {
    if (modalEl.classList.contains("show") && !form.hidden) fillSummary();
  });
}
