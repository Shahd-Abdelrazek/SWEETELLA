
"use strict";

const BOT_LOGO = "images/ChatGPT_Image_Jul_2__2025__10_43_21_PM-removebg-preview.png";

// Words that point to each topic, in English, Arabic, German and Italian.
const BOT_INTENTS = {
  calories: ["calor", "kcal", "diet", "light", "healthy", "سعرات", "كالوري", "كالوريز", "سعر حراري", "دايت", "رجيم", "صحي", "لايت", "kalorien", "diät", "leicht", "calorie", "dieta", "leggero"],
  track: ["track", "status", "where is my order", "my order", "تتبع", "تتبّع", "طلبي", "الأوردر بتاعي", "اوردري", "أوردري", "حالة الطلب", "وصل فين", "sendung", "verfolg", "status", "tracci", "stato", "il mio ordine"],
  allergy: ["allerg", "gluten", "nut", "lactose", "dairy", "حساسي", "جلوتين", "مكسرات", "لاكتوز", "ألبان", "allergi", "glutine", "nüsse", "noci", "laktose", "lattosio"],
  reminder: ["remind", "reminder", "تذكير", "فكرني", "ذكرني", "منبه", "erinner", "promemoria", "ricord"],
  guests: ["guest", "people", "persons", "how big", "ضيف", "ضيوف", "معازيم", "أفراد", "افراد", "اشخاص", "أشخاص", "gäste", "personen", "ospiti", "persone"],
  builder: ["design", "custom", "build", "own cake", "my own", "صمم", "تصميم", "مخصص", "خاصة", "اعمل تورت", "أعمل تورت", "خامات", "gestalt", "eigene", "personalizz", "crea"],
  price: ["price", "cost", "how much", "سعر", "اسعار", "أسعار", "بكام", "تكلفة", "preis", "kosten", "prezz", "costo", "quanto"],
  order: ["order", "buy", "cart", "purchase", "اطلب", "طلب", "شراء", "اشتري", "سلة", "اوردر", "أوردر", "bestell", "kaufen", "warenkorb", "ordin", "compr", "carrello"],
  stock: ["stock", "left", "available", "availab", "ستوك", "مخزون", "متاح", "متبقي", "فاضل", "باقي", "lager", "verfügbar", "vorrat", "scort", "disponibil", "magazzino", "rimast"],
  contact: ["contact", "phone", "call", "address", "where", "location", "تواصل", "رقم", "تليفون", "هاتف", "عنوان", "فين", "مكان", "kontakt", "telefon", "adresse", "contatt", "telefono", "indirizzo", "dove"],
  menu: ["menu", "menù", "منيو", "قائمة", "قايمة", "اصناف", "أصناف", "حلويات", "speisekarte", "karte", "sweets", "dolci"],
  thanks: ["thank", "thx", "شكرا", "شكرًا", "متشكر", "تسلم", "danke", "grazie"],
  greet: ["hi", "hello", "hey", "السلام", "اهلا", "أهلا", "مرحبا", "hallo", "ciao", "salve", "buongiorno", "guten tag"],
};

const BOT_CATEGORY_WORDS = {
  birthday: ["birthday", "عيد ميلاد", "ميلاد", "geburtstag", "compleanno"],
  wedding: ["wedding", "زفاف", "فرح", "hochzeit", "nuzial", "matrimoni"],
  cupcakes: ["cupcake", "كب كيك", "كاب كيك", "كبكيك"],
  candies: ["cand", "حلوى", "بونبون", "bonbon", "caramell", "gumm"],
  donuts: ["donut", "doughnut", "دونت", "دونات", "ciambell"],
};

function matchesAny(text, words) {
  return words.some((word) => {
    // Short Latin words like "hi" must be whole words, so "this" doesn't count as a greeting.
    if (/^[a-z]{1,3}$/.test(word)) return new RegExp(`\\b${word}\\b`).test(text);
    return text.includes(word);
  });
}

function botReply(message) {
  const text = message.toLowerCase().replace(/[ً-ْ]/g, "");
  const category = Object.keys(BOT_CATEGORY_WORDS).find((cat) => matchesAny(text, BOT_CATEGORY_WORDS[cat]));
  const has = (intent) => matchesAny(text, BOT_INTENTS[intent]);

  if (has("calories")) {
    const lightest = [...PRODUCTS].sort((a, b) => a.kcal - b.kcal).slice(0, 3)
      .map((p) => `<li><span>${productName(p.id)}</span><strong>${kcalLabel(p)}</strong></li>`).join("");
    return { html: `${t("bot.calories")}<ul class="bot-stock">${lightest}</ul>${t("bot.dietMenu")}` };
  }
  if (has("track")) return { html: t("bot.track") };
  if (has("allergy")) return { html: t("bot.allergy") };
  if (has("reminder")) return { html: t("bot.reminder") };
  if (has("guests")) return { html: t("bot.guests") };
  if (has("builder")) return { html: t("bot.builder") };
  if (has("price")) return { html: t("bot.price") };
  if (has("order")) return { html: t("bot.order") };
  if (category) {
    const left = store.availableByCategory(category);
    const status = left === 0 ? t("cart.out") : fill(t("cart.left"), { n: left });
    const fromPrice = Math.min(...PRODUCTS.filter((p) => p.category === category).map((p) => p.price));
    return {
      html: `<strong>${t(`cat.${category}`)}</strong> — ${fill(t("bot.from"), { price: formatPrice(fromPrice) })} · ${status}.<br>${t(`desc.${category}.lead`)} ${t(`desc.${category}.body`)}<br><a href="menu.html#${category}">${t("bot.see")}</a>`,
    };
  }
  if (has("stock")) {
    const rows = CATEGORIES.map((cat) => {
      const left = store.availableByCategory(cat);
      return `<li><span>${t(`cat.${cat}`)}</span><strong class="${left === 0 ? "out" : left <= LOW_STOCK ? "low" : ""}">${left}</strong></li>`;
    }).join("");
    return { html: `${t("bot.stockIntro")}<ul class="bot-stock">${rows}</ul>` };
  }
  if (has("contact")) return { html: t("bot.contact") };
  if (has("menu")) {
    const list = CATEGORIES.map((cat) => t(`cat.${cat}`)).join(getLang() === "ar" ? "، " : ", ");
    return { html: fill(t("bot.menu"), { list }) };
  }
  if (has("thanks")) return { html: t("bot.thanks") };
  if (has("greet")) return { html: t("bot.greet"), chips: true };
  return { html: t("bot.fallback"), chips: true };
}

function chatbotTemplate() {
  return `
  <button type="button" class="chat-fab" id="chatFab" aria-controls="chatPanel" aria-expanded="false" data-i18n-aria="bot.open">
    <i class="fa-solid fa-comment-dots chat-fab-open" aria-hidden="true"></i>
    <i class="fa-solid fa-xmark chat-fab-close" aria-hidden="true"></i>
  </button>
  <section class="chat-panel" id="chatPanel" aria-labelledby="chatTitle" hidden>
    <header class="chat-head">
      <img src="${BOT_LOGO}" alt="">
      <div>
        <h5 id="chatTitle" data-i18n="bot.title"></h5>
        <p><span class="online-dot"></span><span data-i18n="bot.status"></span></p>
      </div>
      <button type="button" class="chat-close" id="chatClose" data-i18n-aria="modal.close"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
    </header>
    <div class="chat-body" id="chatBody" aria-live="polite"></div>
    <form class="chat-input" id="chatForm">
      <input type="text" id="chatText" autocomplete="off" maxlength="200" data-i18n-placeholder="bot.placeholder" data-i18n-aria="bot.placeholder">
      <button type="submit" data-i18n-aria="bot.send"><i class="fa-solid fa-paper-plane flip-rtl" aria-hidden="true"></i></button>
    </form>
  </section>`;
}

function initChatbot() {
  document.body.insertAdjacentHTML("beforeend", chatbotTemplate());

  const fab = document.getElementById("chatFab");
  const panel = document.getElementById("chatPanel");
  const body = document.getElementById("chatBody");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  let greeted = false;

  function addMessage(html, from) {
    const row = document.createElement("div");
    row.className = `msg msg-${from}`;
    row.innerHTML = from === "bot" ? `<img src="${BOT_LOGO}" alt="" class="msg-avatar"><div class="bubble">${html}</div>` : `<div class="bubble"></div>`;
    if (from === "user") row.querySelector(".bubble").textContent = html;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }

  function addChips() {
    const chips = document.createElement("div");
    chips.className = "chips";
    [["menu", "nav.menu"], ["builder", "nav.builder"], ["stock", "bot.chip.stock"], ["order", "bot.chip.order"], ["contact", "bot.chip.contact"]].forEach(([intent, key]) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.textContent = t(key);
      chip.addEventListener("click", () => ask(t(key), intent));
      chips.appendChild(chip);
    });
    body.appendChild(chips);
    body.scrollTop = body.scrollHeight;
  }

  function ask(message, forcedIntent) {
    addMessage(message, "user");
    const typing = addMessage('<span class="typing"><i></i><i></i><i></i></span>', "bot");
    const reply = forcedIntent ? botReply(BOT_INTENTS[forcedIntent][0]) : botReply(message);
    window.setTimeout(() => {
      typing.remove();
      addMessage(reply.html, "bot");
      if (reply.chips) addChips();
    }, 650);
  }

  function setOpen(open) {
    panel.hidden = !open;
    fab.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", String(open));
    if (open && !greeted) {
      greeted = true;
      addMessage(t("bot.greet"), "bot");
      addChips();
    }
    if (open) input.focus();
  }

  fab.addEventListener("click", () => setOpen(panel.hidden));
  document.getElementById("chatClose").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    input.value = "";
    ask(message);
  });
}
