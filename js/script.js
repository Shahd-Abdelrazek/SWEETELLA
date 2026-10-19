
"use strict";

const LOGO = "images/ChatGPT_Image_Jul_2__2025__10_43_21_PM-removebg-preview.png";
const CATEGORIES = ["birthday", "wedding", "cupcakes", "candies", "donuts"];

const NAV_PAGES = [
  { page: "home", href: "index.html", key: "nav.home", icon: "fa-house" },
  { page: "menu", href: "menu.html", key: "nav.menu", icon: "fa-cake-candles", dropdown: true },
  { page: "builder", href: "builder.html", key: "nav.builder", icon: "fa-wand-magic-sparkles", highlight: true },
  { page: "team", group: "about", href: "team.html", key: "nav.team", icon: "fa-user-group" },
  { page: "news", group: "about", href: "news.html", key: "nav.news", icon: "fa-newspaper" },
  { page: "join", group: "about", href: "join.html", key: "nav.join", icon: "fa-heart" },
  { page: "feedback", href: "feedback.html", key: "nav.feedback", icon: "fa-star" },
  { page: "contact", href: "contact.html", key: "nav.contact", icon: "fa-envelope" },
];

function headerTemplate(currentPage) {
  const aboutPages = NAV_PAGES.filter((item) => item.group === "about");
  const links = NAV_PAGES.map((item) => {
    // Team, News and Join Us share one "About" dropdown, rendered where the first of them sits.
    if (item.group === "about") {
      if (item !== aboutPages[0]) return "";
      const inAbout = aboutPages.some((p) => p.page === currentPage);
      const aboutLinks = aboutPages.map((p) => {
        const isCurrent = p.page === currentPage;
        return `<li><a class="dropdown-item${isCurrent ? " active" : ""}" href="${p.href}"${isCurrent ? ' aria-current="page"' : ""}><i class="fa-solid ${p.icon} me-2" aria-hidden="true"></i><span data-i18n="${p.key}"></span></a></li>`;
      }).join("");
      return `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle${inAbout ? " active" : ""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span data-i18n="nav.about"></span>
        </a>
        <ul class="dropdown-menu sweet-dropdown">${aboutLinks}</ul>
      </li>`;
    }
    const active = item.page === currentPage ? " active" : "";
    const current = item.page === currentPage ? ' aria-current="page"' : "";
    if (!item.dropdown) {
      const highlight = item.highlight ? " nav-cta" : "";
      const icon = item.highlight ? `<i class="fa-solid ${item.icon}" aria-hidden="true"></i> ` : "";
      return `<li class="nav-item"><a class="nav-link${active}${highlight}" href="${item.href}"${current}>${icon}<span data-i18n="${item.key}"></span></a></li>`;
    }
    const categoryLinks = CATEGORIES.map(
      (cat) => `<li><a class="dropdown-item" href="menu.html#${cat}" data-i18n="cat.${cat}"></a></li>`
    ).join("");
    return `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle${active}" href="${item.href}" role="button" data-bs-toggle="dropdown" aria-expanded="false"${current}>
          <span data-i18n="${item.key}"></span>
        </a>
        <ul class="dropdown-menu sweet-dropdown">
          ${categoryLinks}
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item diet-link" href="menu.html?mode=diet">🌿 <span data-i18n="nav.dietMenu"></span></a></li>
          <li><a class="dropdown-item fw-bold" href="menu.html?mode=regular" data-i18n="nav.fullMenu"></a></li>
        </ul>
      </li>`;
  }).join("");

  const languageItems = Object.entries(LANGUAGES)
    .map(
      ([code, info]) =>
        `<li><button class="dropdown-item lang-option" type="button" data-set-lang="${code}" lang="${code}">
           <span class="lang-code">${code.toUpperCase()}</span>${info.label}
         </button></li>`
    )
    .join("");

  return `
  <nav class="navbar navbar-expand-xl sweet-nav" id="mainNav">
    <div class="container">
      <a class="navbar-brand brand" href="index.html">
        <img src="${LOGO}" alt="Sweetella logo" class="brand-logo">
        <span class="brand-name">SWEETELLA</span>
      </a>

      <div class="d-flex align-items-center gap-2 order-xl-3">
        <div class="dropdown">
          <button class="icon-btn lang-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-i18n-aria="nav.language">
            <i class="fa-solid fa-globe" aria-hidden="true"></i>
            <span class="lang-current" data-lang-current></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end sweet-dropdown lang-menu">${languageItems}</ul>
        </div>
        <button class="icon-btn theme-btn d-none d-sm-inline-flex" type="button" data-theme-toggle data-i18n-aria="theme.toggle">
          <i class="fa-solid fa-moon" aria-hidden="true"></i><i class="fa-solid fa-sun" aria-hidden="true"></i>
        </button>
        <button class="icon-btn" type="button" data-bs-toggle="collapse" data-bs-target="#searchPanel" aria-expanded="false" aria-controls="searchPanel" data-i18n-aria="nav.search">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        </button>
        <button class="icon-btn cart-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer" aria-controls="cartDrawer" data-i18n-aria="cart.open">
          <i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>
          <span class="cart-badge" data-cart-count hidden>0</span>
        </button>
        <button class="icon-btn d-none d-sm-inline-flex" type="button" data-bs-toggle="modal" data-bs-target="#loginModal" data-i18n-aria="nav.login">
          <i class="fa-regular fa-user" aria-hidden="true"></i>
        </button>
        <button class="navbar-toggler icon-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain"
                aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      <div class="collapse navbar-collapse order-xl-2" id="navbarMain">
        <ul class="navbar-nav mx-xl-auto mb-0">${links}
          <li class="nav-item d-sm-none"><a class="nav-link theme-btn" href="#" data-theme-toggle><i class="fa-solid fa-moon me-2" aria-hidden="true"></i><i class="fa-solid fa-sun me-2" aria-hidden="true"></i><span data-i18n="theme.toggle"></span></a></li>
          <li class="nav-item d-sm-none"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="fa-regular fa-user me-2" aria-hidden="true"></i><span data-i18n="nav.login"></span></a></li>
        </ul>
      </div>
    </div>
    <div class="collapse search-panel" id="searchPanel">
      <div class="container">
        <form class="sweet-search" id="searchForm" role="search" action="menu.html">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input type="search" name="q" id="siteSearch" data-i18n-placeholder="nav.searchPh" data-i18n-aria="nav.search">
          <button type="submit" class="btn-sweet btn-sm-sweet" data-i18n="nav.search"></button>
        </form>
      </div>
    </div>
  </nav>

  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content sweet-modal">
        <div class="login-head">
          <img src="${LOGO}" alt="" class="login-logo">
          <h5 class="modal-title" id="loginModalLabel" data-i18n="nav.login"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" data-i18n-aria="modal.close"></button>
        </div>
        <div class="modal-body">
          <form id="loginForm">
            <div class="mb-3">
              <label for="emailInput" class="form-label" data-i18n="login.email"></label>
              <input type="email" class="form-control sweet-input" id="emailInput" required>
              <div class="form-text" data-i18n="login.never"></div>
            </div>
            <div class="mb-3">
              <label for="passwordInput" class="form-label" data-i18n="login.password"></label>
              <input type="password" class="form-control sweet-input" id="passwordInput" required>
            </div>
            <div class="form-check form-switch mb-4">
              <input class="form-check-input" type="checkbox" id="rememberMe">
              <label class="form-check-label" for="rememberMe" data-i18n="login.remember"></label>
            </div>
            <button type="submit" class="btn-sweet w-100" data-i18n="nav.login"></button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="sweet-toast" id="sweetToast" role="status" aria-live="polite"></div>`;
}

function footerTemplate() {
  const pageLinks = NAV_PAGES.map(
    (item) => `<li><a href="${item.href}"><i class="fa-solid ${item.icon}" aria-hidden="true"></i><span data-i18n="${item.key}"></span></a></li>`
  ).join("");

  return `
  <div class="footer-wave" aria-hidden="true">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z"></path></svg>
  </div>
  <div class="footer-body">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <a class="brand footer-brand" href="index.html">
            <img src="${LOGO}" alt="Sweetella logo" class="brand-logo">
            <span class="brand-name">SWEETELLA</span>
          </a>
          <p class="footer-tagline" data-i18n="footer.tagline"></p>
          <div class="footer-badges">
            <span><i class="fa-solid fa-building" aria-hidden="true"></i> <span data-i18n="footer.company"></span></span>
            <span><i class="fa-solid fa-link" aria-hidden="true"></i> <span data-i18n="footer.links"></span></span>
            <span><i class="fa-solid fa-eye" aria-hidden="true"></i> <span data-i18n="footer.vision"></span></span>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h6 class="footer-title" data-i18n="footer.pages"></h6>
          <ul class="footer-list">${pageLinks}
            <li><a href="track.html"><i class="fa-solid fa-truck-fast" aria-hidden="true"></i><span data-i18n="track.cta"></span></a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-3">
          <h6 class="footer-title" data-i18n="footer.contact"></h6>
          <ul class="footer-list">
            <li><i class="fa-solid fa-phone" aria-hidden="true"></i><span><span data-i18n="footer.tel"></span>: <bdi>000-000-000</bdi></span></li>
            <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span><span data-i18n="footer.address"></span>: <span data-i18n="footer.egypt"></span></span></li>
            <li><i class="fa-solid fa-fax" aria-hidden="true"></i><span><span data-i18n="footer.fax"></span>: <bdi>000-000-000</bdi></span></li>
          </ul>
        </div>
        <div class="col-lg-3">
          <h6 class="footer-title" data-i18n="footer.services"></h6>
          <ul class="footer-list footer-plain">
            <li data-i18n="footer.best"></li>
            <li data-i18n="footer.better"></li>
            <li data-i18n="footer.look"></li>
            <li data-i18n="footer.health"></li>
          </ul>
          <div class="social-row">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom"><p data-i18n="footer.copy"></p></div>`;
}

function showToast(message) {
  const toast = document.getElementById("sweetToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "home";

  const header = document.getElementById("site-header");
  if (header) header.innerHTML = headerTemplate(page);
  const footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = footerTemplate();

  initStore();
  initChatbot();
  applyLanguage(getLang());

  // Light / dark mode: follows the device until the visitor picks one, then remembers it.
  function setTheme(theme, remember) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#1a1216" : "#f86999");
    if (remember) {
      try {
        localStorage.setItem("sweetella-theme", theme);
      } catch (error) {
        // Not remembered, but the switch still works on this page.
      }
    }
  }
  setTheme(document.documentElement.getAttribute("data-theme") || "light", false);
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-theme-toggle]")) return;
    event.preventDefault();
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next, true);
    showToast(t(next === "dark" ? "theme.dark" : "theme.light"));
  });
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  systemDark.addEventListener("change", (event) => {
    let saved = null;
    try {
      saved = localStorage.getItem("sweetella-theme");
    } catch (error) {
      saved = null;
    }
    if (!saved) setTheme(event.matches ? "dark" : "light", false);
  });

  // Language switcher
  document.addEventListener("click", (event) => {
    const option = event.target.closest("[data-set-lang]");
    if (option) applyLanguage(option.dataset.setLang);
  });

  // Navbar gets a solid background once the page is scrolled.
  const nav = document.getElementById("mainNav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Fade sections in as they enter the screen.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Demo login validation. This does not authenticate against a real server.
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;

      showToast(t("login.success"));
      const modalElement = document.getElementById("loginModal");
      if (window.bootstrap && modalElement) {
        bootstrap.Modal.getOrCreateInstance(modalElement).hide();
      }
      loginForm.reset();
    });
  }

  // Focus the search box as soon as the panel opens.
  const searchPanel = document.getElementById("searchPanel");
  if (searchPanel) {
    searchPanel.addEventListener("shown.bs.collapse", () => document.getElementById("siteSearch").focus());
  }

  // Search goes to the menu page, which filters the items.
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      const query = document.getElementById("siteSearch").value.trim();
      if (!query) {
        event.preventDefault();
        showToast(t("search.empty"));
      }
    });
  }

  if (page === "menu") initMenuPage();
  if (page === "contact") initContactPage();
  if (page === "builder") initBuilder();
  if (page === "track") initTrackPage();
  if (typeof initReminders === "function") initReminders();

  const isLocal = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
  if ("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol) && !isLocal) {
    navigator.serviceWorker.register("sw.js").catch((error) => console.warn("Service worker not registered:", error));
  }
  if (document.getElementById("reviewList")) initReviews(page === "feedback");
});

// One menu card; diet items get a green ribbon and the visitor's daily-goal line.
function menuCardHtml(product) {
  const nameKey = product.name || `cat.${product.category}`;
  const ribbon = product.diet ? `<span class="diet-ribbon">🌿 <span data-i18n="diet.badge"></span></span>` : "";
  return `
    <article class="menu-item reveal visible${product.diet ? " is-diet" : ""}" data-product="${product.id}" data-category="${product.category}">
      <div class="menu-img"><img src="${product.img}" alt="${escapeHtml(productName(product.id, "en"))}" loading="lazy"><span class="stock-badge" data-stock-badge></span><span class="menu-chip" data-i18n="cat.${product.category}"></span>${ribbon}
        <button type="button" class="fav-btn" data-fav aria-pressed="false" data-i18n-aria="fav.add"><i class="fa-regular fa-heart" aria-hidden="true"></i><i class="fa-solid fa-heart" aria-hidden="true"></i></button></div>
      <div class="menu-body">
        <h3 data-i18n="${nameKey}"></h3>
        <div class="price-row"><p class="price-tag" data-price></p><span data-kcal></span></div>
        <p class="goal-line" data-goal hidden></p>
        <div class="allergens" data-allergens></div>
        <p data-i18n="menu.love"></p>
        <div class="menu-actions">
          <button type="button" class="btn-outline-sweet" data-bs-toggle="modal" data-bs-target="#itemModal" data-i18n="menu.knowMore"></button>
          <button type="button" class="btn-sweet btn-sm-sweet" data-add-to-cart><i class="fa-solid fa-cart-plus" aria-hidden="true"></i> <span data-i18n="cart.add"></span></button>
        </div>
      </div>
    </article>`;
}

function readSetting(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
  }
}

function initMenuPage() {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = PRODUCTS.map(menuCardHtml).join("");
  const items = Array.from(grid.querySelectorAll(".menu-item"));
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const modeSwitch = document.querySelector(".mode-switch");
  const dietPanel = document.getElementById("dietPanel");
  const goalInput = document.getElementById("kcalGoal");
  const emptyState = document.getElementById("menuEmpty");
  const searchInfo = document.getElementById("searchInfo");
  const searchTerm = document.getElementById("searchTerm");
  const sortOptions = Array.from(document.querySelectorAll("[data-sort]"));
  let sortValue = "default";
  const avoidButtons = Array.from(document.querySelectorAll("[data-avoid]"));
  const favFilter = document.getElementById("favFilter");
  let favOnly = false;
  // Favourite items, remembered in this browser.
  let favs = [];
  try {
    favs = JSON.parse(readSetting("sweetella-favs", "[]")).filter((id) => store.product(id));
  } catch (error) {
    favs = [];
  }

  function renderFavs() {
    items.forEach((item) => {
      const on = favs.includes(item.dataset.product);
      const button = item.querySelector("[data-fav]");
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
      button.dataset.i18nAria = on ? "fav.remove" : "fav.add";
      button.setAttribute("aria-label", t(button.dataset.i18nAria));
    });
    document.getElementById("favCount").textContent = favs.length;
    favFilter.classList.toggle("active", favOnly);
    favFilter.setAttribute("aria-pressed", String(favOnly));
  }

  const params = new URLSearchParams(window.location.search);
  let category = "all";
  let query = params.get("q") || "";
  // Regular or diet menu: a link like menu.html?mode=diet wins, otherwise the last choice is remembered.
  let mode = ["regular", "diet"].includes(params.get("mode")) ? params.get("mode") : readSetting("sweetella-menu-mode", "regular");
  if (mode !== "diet") mode = "regular";
  goalInput.value = readSetting("sweetella-kcal-goal", "1500");
  // Allergens the visitor wants to avoid (remembered between visits).
  let avoid = [];
  try {
    avoid = JSON.parse(readSetting("sweetella-avoid", "[]"));
  } catch (error) {
    avoid = [];
  }

  // Re-order the cards by calories or price (the original order is "recommended").
  function applySort() {
    const sorters = {
      kcal: (a, b) => store.product(a.dataset.product).kcal - store.product(b.dataset.product).kcal,
      priceAsc: (a, b) => store.product(a.dataset.product).price - store.product(b.dataset.product).price,
      priceDesc: (a, b) => store.product(b.dataset.product).price - store.product(a.dataset.product).price,
    };
    const sorted = sorters[sortValue] ? [...items].sort(sorters[sortValue]) : items;
    sorted.forEach((item) => grid.appendChild(item));

    sortOptions.forEach((option) => {
      const on = option.dataset.sort === sortValue;
      option.classList.toggle("active", on);
      option.setAttribute("aria-checked", String(on));
    });
    const current = document.getElementById("sortCurrent");
    current.dataset.i18n = `sort.${sortValue}`;
    current.textContent = t(current.dataset.i18n);
  }

  // In diet mode every card says how much of the visitor's daily calorie goal it uses.
  function renderGoals() {
    const goal = Math.max(800, Math.min(4000, Number(goalInput.value) || 1500));
    items.forEach((item) => {
      const line = item.querySelector("[data-goal]");
      const product = store.product(item.dataset.product);
      line.hidden = mode !== "diet";
      if (mode === "diet") line.textContent = fill(t("diet.ofGoal"), { p: Math.round((product.kcal / goal) * 100) });
    });
  }

  const hashCategory = window.location.hash.replace("#", "");
  if (CATEGORIES.includes(hashCategory)) category = hashCategory;

  function render() {
    const needle = query.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const cat = item.dataset.category;
      const product = store.product(item.dataset.product);
      // Match the search against the item's name in every language, so "تورتة" and "cake" both work.
      const names = Object.keys(LANGUAGES).flatMap((lang) => [t(`cat.${cat}`, lang), productName(product.id, lang)]).map((n) => n.toLowerCase());
      // "My favourites" shows saved items from both the regular and the diet menu.
      const matchesMode = favOnly ? favs.includes(product.id) : Boolean(product.diet) === (mode === "diet");
      const matchesCategory = category === "all" || cat === category;
      const matchesSearch = !needle || names.some((name) => name.includes(needle)) || cat.includes(needle);
      const safe = !product.allergens.some((a) => avoid.includes(a));
      const show = matchesMode && matchesCategory && matchesSearch && safe;
      item.hidden = !show;
      if (show) visibleCount += 1;
    });

    modeButtons.forEach((button) => {
      const on = button.dataset.mode === mode;
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });
    modeSwitch.classList.toggle("diet-on", mode === "diet");
    dietPanel.hidden = mode !== "diet";
    document.body.classList.toggle("diet-mode", mode === "diet");
    renderGoals();

    avoidButtons.forEach((button) => {
      const on = avoid.includes(button.dataset.avoid);
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
      const text = emptyState.querySelector("[data-i18n]");
      text.dataset.i18n = favOnly && !favs.length ? "fav.empty" : "menu.empty";
      text.textContent = t(text.dataset.i18n);
    }
    renderFavs();
    if (searchInfo) {
      searchInfo.hidden = !needle;
      if (searchTerm) searchTerm.textContent = `“${query}”`;
    }
    const searchInput = document.getElementById("siteSearch");
    if (searchInput && needle) searchInput.value = query;
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      saveSetting("sweetella-menu-mode", mode);
      const url = new URL(window.location.href);
      url.searchParams.set("mode", mode);
      history.replaceState(null, "", url);
      render();
    });
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fav]");
    if (!button) return;
    const id = button.closest("[data-product]").dataset.product;
    const adding = !favs.includes(id);
    favs = adding ? [...favs, id] : favs.filter((f) => f !== id);
    saveSetting("sweetella-favs", JSON.stringify(favs));
    button.classList.remove("pop");
    void button.offsetWidth; // restart the heart animation
    if (adding) button.classList.add("pop");
    showToast(t(adding ? "fav.added" : "fav.removed"));
    render();
  });

  favFilter.addEventListener("click", () => {
    favOnly = !favOnly;
    render();
  });

  goalInput.addEventListener("input", () => {
    saveSetting("sweetella-kcal-goal", goalInput.value);
    renderGoals();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      const url = category === "all" ? window.location.pathname + window.location.search : `#${category}`;
      history.replaceState(null, "", url);
      render();
    });
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sortValue = option.dataset.sort;
      applySort();
    });
  });
  applySort();

  avoidButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const allergen = button.dataset.avoid;
      avoid = avoid.includes(allergen) ? avoid.filter((a) => a !== allergen) : [...avoid, allergen];
      saveSetting("sweetella-avoid", JSON.stringify(avoid));
      render();
    });
  });

  const clearSearch = document.getElementById("clearSearch");
  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      query = "";
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      history.replaceState(null, "", url);
      const searchInput = document.getElementById("siteSearch");
      if (searchInput) searchInput.value = "";
      render();
    });
  }

  // Dropdown links like menu.html#cupcakes while already on the menu page.
  window.addEventListener("hashchange", () => {
    const next = window.location.hash.replace("#", "");
    category = CATEGORIES.includes(next) ? next : "all";
    render();
  });

  // "Know More" opens a detail modal for the clicked item.
  const detailModal = document.getElementById("itemModal");
  if (detailModal) {
    detailModal.addEventListener("show.bs.modal", (event) => {
      const item = event.relatedTarget && event.relatedTarget.closest(".menu-item");
      if (!item) return;
      const product = store.product(item.dataset.product);
      const cat = product.category;
      const image = item.querySelector("img");
      detailModal.querySelector(".item-modal-content").dataset.product = product.id;
      renderStockBadges();
      const modalImage = detailModal.querySelector(".item-modal-img");
      modalImage.src = image.getAttribute("src");
      modalImage.alt = image.alt;
      detailModal.querySelector("[data-modal-title]").dataset.i18n = product.name || `cat.${cat}`;
      detailModal.querySelector("[data-modal-lead]").dataset.i18n = `desc.${cat}.lead`;
      detailModal.querySelector("[data-modal-body]").dataset.i18n = `desc.${cat}.body`;

      // Diet items: show how much lighter they are than the regular ones in the same category.
      const note = detailModal.querySelector("[data-diet-note]");
      const regular = PRODUCTS.filter((p) => !p.diet && p.category === cat);
      note.hidden = !product.diet || !regular.length;
      if (product.diet && regular.length) {
        const avg = regular.reduce((sum, p) => sum + p.kcal, 0) / regular.length;
        note.textContent = fill(t("diet.saving"), { p: Math.round((1 - product.kcal / avg) * 100), cat: t(`cat.${cat}`) });
      }
      applyLanguage(getLang());
    });
  }

  renderStockBadges();
  render();
  applyLanguage(getLang());
}

// ---------- Contact page ----------

function initContactPage() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("contactSuccess");
  if (!form || !success) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    // Demo only: there is no backend yet, so we just show the thank-you panel.
    form.hidden = true;
    success.hidden = false;
    form.reset();
  });

  document.getElementById("contactAgain").addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
    form.querySelector("input").focus();
  });
}

// ---------- Customer reviews (home preview + feedback page) ----------

const REVIEWS = [
  { id: "r1", category: "birthday", stars: 5, date: "2025-09-12" },
  { id: "r2", category: "wedding", stars: 5, date: "2025-08-30" },
  { id: "r3", category: "cupcakes", stars: 5, date: "2025-10-02" },
  { id: "r4", category: "donuts", stars: 4, date: "2025-07-21" },
  { id: "r5", category: "candies", stars: 5, date: "2025-06-05" },
  { id: "r6", category: "birthday", stars: 4, date: "2025-05-18" },
];
const REVIEWS_STORAGE_KEY = "sweetella-reviews";

function loadSavedReviews() {
  try {
    const saved = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
}

function starsHtml(count) {
  let html = "";
  for (let i = 1; i <= 5; i += 1) {
    html += `<i class="${i <= count ? "fa-solid" : "fa-regular"} fa-star" aria-hidden="true"></i>`;
  }
  return `<span class="stars" role="img" aria-label="${count}/5">${html}</span>`;
}

function reviewCardHtml(review, index) {
  // Built-in reviews are translated; reviews typed by a visitor are shown as written.
  const name = review.name
    ? `<h4>${escapeHtml(review.name)}</h4>`
    : `<h4 data-i18n="review.${review.id}.name"></h4>`;
  const text = review.text
    ? `<p class="review-text">${escapeHtml(review.text)}</p>`
    : `<p class="review-text" data-i18n="review.${review.id}.text"></p>`;
  const initial = review.name ? escapeHtml(review.name.trim().charAt(0).toUpperCase()) : t(`review.${review.id}.name`, "en").charAt(0);
  const badge = review.name ? '<span class="review-new" data-i18n="fb.new"></span>' : "";

  return `
    <article class="review-card reveal visible" style="--i:${index % 6}">
      <i class="fa-solid fa-quote-left review-quote" aria-hidden="true"></i>
      <div class="review-top">${starsHtml(review.stars)}${badge}</div>
      ${text}
      <div class="review-author">
        <span class="review-avatar">${initial}</span>
        <div>
          ${name}
          <p class="review-meta"><span data-i18n="cat.${review.category}"></span> · <time datetime="${review.date}"></time></p>
        </div>
      </div>
    </article>`;
}

function initReviews(isFeedbackPage) {
  const list = document.getElementById("reviewList");
  const limit = Number(list.dataset.limit) || Infinity;

  function render() {
    const all = [...loadSavedReviews(), ...REVIEWS];
    list.innerHTML = all.slice(0, limit).map(reviewCardHtml).join("");

    const summary = document.getElementById("ratingSummary");
    if (summary) {
      const total = all.length;
      const average = all.reduce((sum, r) => sum + r.stars, 0) / total;
      summary.querySelector("[data-avg]").textContent = average.toFixed(1);
      summary.querySelector("[data-avg-stars]").innerHTML = starsHtml(Math.round(average));
      summary.querySelector("[data-count]").textContent = total;
      summary.querySelectorAll("[data-bar]").forEach((bar) => {
        const stars = Number(bar.dataset.bar);
        const count = all.filter((r) => r.stars === stars).length;
        bar.querySelector(".bar-fill").style.width = `${(count / total) * 100}%`;
        bar.querySelector(".bar-count").textContent = count;
      });
    }
    applyLanguage(getLang());
  }

  render();
  if (document.getElementById("reviewSlider")) initReviewSlider();
  if (!isFeedbackPage) return;

  const form = document.getElementById("feedbackForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rating = form.querySelector('input[name="rating"]:checked');
    if (!rating) {
      showToast(t("fb.needRating"));
      return;
    }
    if (!form.reportValidity()) return;

    const review = {
      id: `u${Date.now()}`,
      name: form.elements.reviewName.value.trim(),
      text: form.elements.reviewText.value.trim(),
      category: form.elements.reviewItem.value,
      stars: Number(rating.value),
      date: new Date().toISOString().slice(0, 10),
    };
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify([review, ...loadSavedReviews()]));
    } catch (error) {
      console.warn("Could not save the review:", error);
    }
    form.reset();
    render();
    showToast(t("fb.thanks"));
    list.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ---------- Home page review slider ----------

function initReviewSlider() {
  const slider = document.getElementById("reviewSlider");
  const viewport = slider.querySelector(".slider-viewport");
  const track = document.getElementById("reviewList");
  const dotsBox = document.getElementById("reviewDots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTOPLAY_MS = 5000;
  let index = 0;
  let timer = null;
  let paused = false;

  const cards = () => Array.from(track.children);
  const perView = () => (window.innerWidth >= 992 ? 3 : window.innerWidth >= 640 ? 2 : 1);
  const lastIndex = () => Math.max(0, cards().length - perView());

  function update() {
    const list = cards();
    if (!list.length) return;
    index = Math.min(index, lastIndex());
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = list[0].getBoundingClientRect().width + gap;
    // In Arabic the cards flow right-to-left, so the track moves the other way.
    const dir = document.documentElement.dir === "rtl" ? 1 : -1;
    track.style.transform = `translateX(${dir * index * step}px)`;

    list.forEach((card, i) => {
      const visible = i >= index && i < index + perView();
      card.classList.toggle("is-visible", visible);
      card.setAttribute("aria-hidden", String(!visible));
    });

    const pages = lastIndex() + 1;
    if (dotsBox.children.length !== pages) {
      dotsBox.innerHTML = Array.from({ length: pages }, (_, i) => `<button type="button" data-dot="${i}" aria-label="${i + 1} / ${pages}"></button>`).join("");
    }
    Array.from(dotsBox.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", String(i === index));
    });
  }

  function go(next) {
    const max = lastIndex();
    index = next > max ? 0 : next < 0 ? max : next; // wrap around at both ends
    update();
  }

  function restart() {
    window.clearInterval(timer);
    if (reduceMotion) return;
    timer = window.setInterval(() => {
      if (!paused && !document.hidden) go(index + 1);
    }, AUTOPLAY_MS);
  }

  slider.addEventListener("click", (event) => {
    const arrow = event.target.closest("[data-slide]");
    if (!arrow) return;
    go(index + Number(arrow.dataset.slide));
    restart();
  });
  dotsBox.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-dot]");
    if (!dot) return;
    go(Number(dot.dataset.dot));
    restart();
  });

  // Pause while the visitor is reading or using the keyboard.
  slider.addEventListener("mouseenter", () => { paused = true; });
  slider.addEventListener("mouseleave", () => { paused = false; });
  slider.addEventListener("focusin", () => { paused = true; });
  slider.addEventListener("focusout", () => { paused = false; });

  // Swipe on touch screens.
  let startX = null;
  viewport.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  viewport.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) < 40) return;
    const forward = document.documentElement.dir === "rtl" ? delta > 0 : delta < 0;
    go(index + (forward ? 1 : -1));
    restart();
  });

  window.addEventListener("resize", update);
  document.addEventListener("sweetella:languagechange", () => requestAnimationFrame(update));
  update();
  restart();
}

