
"use strict";

const BUILDER_DEFAULTS = {
  size: "medium",
  tiers: 1,
  shape: "round",
  sponge: "vanilla",
  filling: "buttercream",
  frosting: "pink",
  toppings: ["strawberries"],
  message: "",
};
const MAX_TOPPINGS = 3;
const STEP_ORDER = ["size", "tiers", "shape", "sponge", "filling", "frosting", "toppings"];

const builder = { ...BUILDER_DEFAULTS, toppings: [...BUILDER_DEFAULTS.toppings] };

function optionLabel(group, id) {
  if (group === "tiers") return t(`builder.tier${id}`);
  if (group === "toppings") return t(`top.${id}`);
  return t(`${group}.${id}`);
}

// Units this option would use with the current size/tiers.
function unitsNeeded(group) {
  if (group === "toppings") return builder.tiers;
  return cakeOption("size", builder.size).units * builder.tiers;
}

function optionStatus(group, id) {
  if (!INGREDIENT_GROUPS.includes(group)) return null;
  const left = store.ingredientAvailable(`${group}:${id}`);
  const need = unitsNeeded(group);
  if (left === 0) return { left, state: "out", label: t("cart.out") };
  if (left < need) return { left, state: "short", label: fill(t("builder.left"), { n: left }) };
  return { left, state: left <= LOW_STOCK ? "low" : "ok", label: fill(t("builder.left"), { n: left }) };
}

// Extra cost of an option with the current size and tiers (sizes show their own base price).
function optionPriceDelta(group, option) {
  const units = cakeOption("size", builder.size).units * builder.tiers;
  if (group === "size") return option.price * builder.tiers;
  if (group === "shape") return option.price;
  if (group === "toppings") return option.price * builder.tiers;
  if (["sponge", "filling", "frosting"].includes(group)) return option.price * units;
  return 0;
}

function isSelected(group, id) {
  return group === "toppings" ? builder.toppings.includes(id) : builder[group] === id;
}

function optionVisual(group, option) {
  if (option.color) return `<span class="swatch" style="--c:${option.color}"></span>`;
  if (option.icon) return `<span class="opt-emoji">${option.icon}</span>`;
  if (group === "size") return `<span class="size-dot size-${option.id}"></span>`;
  if (group === "tiers") return `<span class="tier-icon">${"<i></i>".repeat(option.id)}</span>`;
  if (group === "shape") return `<span class="shape-icon ${option.id}"></span>`;
  return "";
}

function renderSteps() {
  const container = document.getElementById("builderSteps");
  container.innerHTML = STEP_ORDER.map((group, index) => {
    const tiles = CAKE_OPTIONS[group]
      .map((option) => {
        const status = optionStatus(group, option.id);
        const selected = isSelected(group, option.id);
        const unavailable = status && (status.state === "out" || status.state === "short");
        const sub = group === "size" ? `<small>${fill(t("builder.serves"), { n: option.servings })}</small>` : "";
        const pill = status ? `<span class="opt-stock ${status.state}">${status.label}</span>` : "";
        const extra = optionPriceDelta(group, option);
        const price = extra > 0 ? `<span class="opt-price">${group === "size" ? "" : "+"}${formatPrice(extra)}</span>` : "";
        const kcal = option.kcal !== undefined && group !== "toppings" ? `<span class="opt-kcal">🔥 ${formatKcal(option.kcal)}</span>` : option.kcal ? `<span class="opt-kcal">+${formatKcal(option.kcal)}</span>` : "";
        const light = option.light ? `<span class="light-badge">🌿 ${t("kcal.light")}</span>` : "";
        return `
          <button type="button" class="opt${selected ? " selected" : ""}${unavailable ? " unavailable" : ""}"
                  data-group="${group}" data-value="${option.id}" aria-pressed="${selected}" ${unavailable && !selected ? "disabled" : ""}>
            <span class="opt-check"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
            ${optionVisual(group, option)}
            <span class="opt-name">${optionLabel(group, option.id)}</span>
            ${light}${sub}${price}${kcal}${pill}
          </button>`;
      })
      .join("");
    return `
      <div class="step-card">
        <h3 class="step-title"><span class="step-num">${index + 1}</span>${t(`builder.step.${group}`)}</h3>
        <div class="opt-grid opt-grid-${group}">${tiles}</div>
      </div>`;
  }).join("");
  document.getElementById("messageStepNum").textContent = STEP_ORDER.length + 1;
}

function tierHtml(level, total) {
  const widths = { 1: [100], 2: [70, 100], 3: [50, 75, 100] }[total];
  const classes = ["tier"];
  if (builder.toppings.includes("sprinkles")) classes.push("sprinkles");
  if (builder.toppings.includes("drip")) classes.push("drip");
  if (builder.toppings.includes("gold")) classes.push("gold");
  return `<div class="${classes.join(" ")}" style="width:${widths[level]}%; animation-delay:${(total - level) * 0.08}s"></div>`;
}

function drawCake() {
  const frost = cakeOption("frosting", builder.frosting).color;
  const sponge = cakeOption("sponge", builder.sponge).color;
  const filling = cakeOption("filling", builder.filling).color;

  const toppers = [];
  if (builder.toppings.includes("strawberries")) toppers.push("🍓", "🍓", "🍓");
  if (builder.toppings.includes("flowers")) toppers.push("🌸", "🌸");
  if (builder.toppings.includes("macarons")) toppers.push('<i class="macaron m1"></i>', '<i class="macaron m2"></i>', '<i class="macaron m3"></i>');
  if (builder.toppings.includes("candles")) toppers.push('<i class="candle"></i>', '<i class="candle"></i>', '<i class="candle"></i>');

  const tiers = [];
  for (let level = 0; level < builder.tiers; level += 1) tiers.push(tierHtml(level, builder.tiers));

  const message = builder.message.trim();
  document.getElementById("cakeStage").innerHTML = `
    <div class="cake shape-${builder.shape} size-${builder.size}" style="--frost:${frost}">
      <div class="cake-tiers">
        <div class="toppers">${toppers.join("")}</div>
        ${tiers.join("")}
      </div>
      <div class="plate">${message ? `<span class="plate-msg"></span>` : ""}</div>
    </div>`;
  const plateMsg = document.querySelector(".plate-msg");
  if (plateMsg) plateMsg.textContent = message;

  const layers = [];
  for (let i = 0; i < 3; i += 1) {
    layers.push(`<span class="layer sponge" style="background:${sponge}"></span>`);
    if (i < 2) layers.push(`<span class="layer filling" style="background:${filling}"></span>`);
  }
  document.getElementById("cakeInside").innerHTML = `<div class="slice" style="--frost:${frost}">${layers.join("")}</div>
    <ul class="slice-legend">
      <li><i style="background:${sponge}"></i>${t(`sponge.${builder.sponge}`)}</li>
      <li><i style="background:${filling}"></i>${t(`filling.${builder.filling}`)}</li>
      <li><i style="background:${frost}"></i>${t(`frosting.${builder.frosting}`)}</li>
    </ul>`;
}

function renderSummary() {
  const servings = cakeOption("size", builder.size).servings * builder.tiers;
  const rows = [
    ["builder.step.size", `${t(`size.${builder.size}`)} · ${fill(t("builder.serves"), { n: servings })}`],
    ["builder.step.tiers", t(`builder.tier${builder.tiers}`)],
    ["builder.step.shape", t(`shape.${builder.shape}`)],
    ["builder.step.sponge", t(`sponge.${builder.sponge}`)],
    ["builder.step.filling", t(`filling.${builder.filling}`)],
    ["builder.step.frosting", t(`frosting.${builder.frosting}`)],
    ["builder.step.toppings", builder.toppings.length ? builder.toppings.map((id) => `${cakeOption("toppings", id).icon} ${t(`top.${id}`)}`).join(", ") : t("builder.none")],
  ];
  document.getElementById("cakeSummary").innerHTML = rows
    .map(([key, value]) => `<li><span>${t(key)}</span><strong>${value}</strong></li>`)
    .join("");
  document.getElementById("cakePrice").textContent = formatPrice(cakePrice(builder));
  const perSlice = cakeKcalPerSlice(builder);
  document.getElementById("cakeKcal").innerHTML = `
    <div><span>🔥 ${t("kcal.perSlice")}</span><strong>${formatKcal(perSlice)}</strong></div>
    <div><span>${t("kcal.wholeCake")}</span><strong>${formatKcal(perSlice * cakeServings(builder))}</strong></div>
    <small>${fill(t("kcal.daily"), { p: Math.round((perSlice / DAILY_KCAL) * 100) })}</small>
    ${perSlice >= 330 ? `<button type="button" class="make-lighter" id="makeLighter">🌿 ${t("kcal.makeLighter")}</button>` : `<p class="is-light">🌿 ${t("kcal.isLight")}</p>`}`;
  document.getElementById("cakeAllergens").innerHTML = `<span class="allergen-label">${t("allergen.contains")}</span>${allergenChips(cakeAllergens(builder))}`;

  // Every chosen ingredient must still be in stock in the needed amount.
  const usage = cakeUsage(builder);
  const missing = Object.keys(usage).find((key) => store.ingredientAvailable(key) < usage[key]);
  const warning = document.getElementById("cakeWarning");
  const addButton = document.getElementById("addCake");
  if (missing) {
    const [group, id] = missing.split(":");
    warning.textContent = fill(t("builder.notEnough"), { name: optionLabel(group, id) });
    warning.hidden = false;
    addButton.disabled = true;
  } else {
    warning.hidden = true;
    addButton.disabled = false;
  }
}

function renderBuilder() {
  renderSteps();
  drawCake();
  renderSummary();
  renderGuests();
  syncShareLink();
}

// ---------- "How many guests?" ----------

function suggestForGuests(guests) {
  const combos = [];
  CAKE_OPTIONS.size.forEach((size) => {
    CAKE_OPTIONS.tiers.forEach((tier) => combos.push({ size: size.id, tiers: tier.id, serves: size.servings * tier.id }));
  });
  combos.sort((a, b) => a.serves - b.serves || a.tiers - b.tiers);
  return combos.find((c) => c.serves >= guests) || { ...combos[combos.length - 1], tooMany: true };
}

function renderGuests() {
  const input = document.getElementById("guestCount");
  const guests = Math.max(1, Math.min(200, Number(input.value) || 1));
  const pick = suggestForGuests(guests);
  const label = `${t(`size.${pick.size}`)} · ${t(`builder.tier${pick.tiers}`)}`;
  const current = builder.size === pick.size && builder.tiers === pick.tiers;
  document.getElementById("guestResult").innerHTML = `
    <span>${t("guests.suggest")}</span>
    <strong>${label}</strong>
    <small>${fill(t("builder.serves"), { n: pick.serves })}${pick.tooMany ? ` — ${t("guests.tooMany")}` : ""}</small>`;
  const apply = document.getElementById("applyGuests");
  apply.disabled = current;
  apply.dataset.size = pick.size;
  apply.dataset.tiers = pick.tiers;
}

// ---------- Share & download ----------

function designParams() {
  return new URLSearchParams({
    size: builder.size,
    tiers: builder.tiers,
    shape: builder.shape,
    sponge: builder.sponge,
    filling: builder.filling,
    frosting: builder.frosting,
    toppings: builder.toppings.join(","),
    msg: builder.message.trim(),
  }).toString();
}

function designUrl() {
  return `${window.location.href.split("#")[0]}#${designParams()}`;
}

function syncShareLink() {
  history.replaceState(null, "", `#${designParams()}`);
  document.getElementById("shareWhatsApp").href = `https://wa.me/?text=${encodeURIComponent(`${t("share.text")} ${designUrl()}`)}`;
}

function loadDesignFromUrl() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  if (!params.has("size")) return false;
  ["size", "shape", "sponge", "filling", "frosting"].forEach((group) => {
    if (cakeOption(group, params.get(group))) builder[group] = params.get(group);
  });
  const tiers = Number(params.get("tiers"));
  if (cakeOption("tiers", tiers)) builder.tiers = tiers;
  builder.toppings = (params.get("toppings") || "")
    .split(",")
    .filter((id) => cakeOption("toppings", id))
    .slice(0, MAX_TOPPINGS);
  builder.message = (params.get("msg") || "").slice(0, 25);
  return true;
}

async function shareDesign() {
  const url = designUrl();
  if (navigator.share) {
    try {
      await navigator.share({ title: t("builder.title"), text: t("share.text"), url });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await copyText(url);
    showToast(t("share.copied"));
  } catch (error) {
    window.prompt(t("share.copyPrompt"), url);
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy failed");
}

// Draws the cake on a canvas and saves it as a PNG card.
async function downloadDesign() {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const W = 900;
  const baseWidth = { small: 440, medium: 520, large: 600 }[builder.size];
  const tierH = { small: 115, medium: 130, large: 145 }[builder.size];
  const widths = { 1: [1], 2: [0.7, 1], 3: [0.5, 0.75, 1] }[builder.tiers];
  const summaryLines = cakeSummary(builder);
  const hasMessage = Boolean(builder.message.trim());

  const plateY = 250 + widths.length * tierH;
  const cardY = plateY + (hasMessage ? 130 : 70);
  const cardH = 60 + summaryLines.length * 44 + 50;
  const H = cardY + cardH + 60;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const rtl = document.documentElement.dir === "rtl";
  const bodyFont = getComputedStyle(document.body).fontFamily;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#fffafc");
  bg.addColorStop(1, "#ffd6e9");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.fillStyle = "#e0407a";
  ctx.font = `900 54px "Cinzel Decorative", serif`;
  ctx.fillText("SWEETELLA", W / 2, 90);
  ctx.fillStyle = "#6e5262";
  ctx.font = `600 28px ${bodyFont}`;
  ctx.fillText(t("builder.customCake"), W / 2, 135);

  const frost = cakeOption("frosting", builder.frosting).color;
  const round = builder.shape === "round";

  // plate
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(W / 2, plateY, baseWidth * 0.68, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ead9e1";
  ctx.lineWidth = 3;
  ctx.stroke();

  let bottom = plateY;
  let topY = bottom;
  for (let i = widths.length - 1; i >= 0; i -= 1) {
    const w = baseWidth * widths[i];
    const x = W / 2 - w / 2;
    const y = bottom - tierH;
    ctx.fillStyle = frost;
    ctx.beginPath();
    if (round) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, bottom - 12);
      ctx.ellipse(W / 2, bottom - 12, w / 2, 16, 0, Math.PI, 0, true);
      ctx.lineTo(x + w, y);
      ctx.closePath();
    } else {
      ctx.roundRect(x, y, w, tierH, 8);
    }
    ctx.fill();
    // soft shading
    const shade = ctx.createLinearGradient(x, 0, x + w, 0);
    shade.addColorStop(0, "rgba(0,0,0,0.10)");
    shade.addColorStop(0.45, "rgba(255,255,255,0.25)");
    shade.addColorStop(1, "rgba(0,0,0,0.10)");
    ctx.fillStyle = shade;
    ctx.fill();
    if (round) {
      ctx.fillStyle = frost;
      ctx.beginPath();
      ctx.ellipse(W / 2, y, w / 2, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    if (builder.toppings.includes("sprinkles")) {
      const colors = ["#ff5fa2", "#43b9ff", "#ffd23f"];
      for (let k = 0; k < Math.round(w / 9); k += 1) {
        ctx.fillStyle = colors[k % 3];
        ctx.beginPath();
        ctx.arc(x + 10 + ((k * 37) % (w - 20)), y + 20 + ((k * 53) % (tierH - 34)), 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (builder.toppings.includes("drip")) {
      ctx.fillStyle = "#4a2511";
      ctx.beginPath();
      ctx.moveTo(x, y);
      const drops = 9;
      for (let d = 0; d <= drops; d += 1) {
        const dx = x + (w / drops) * d;
        const len = 16 + ((d * 29) % 30);
        ctx.lineTo(dx, y + 8);
        if (d < drops) ctx.quadraticCurveTo(dx + w / drops / 2, y + len + 12, dx + w / drops, y + 8);
      }
      ctx.lineTo(x + w, y);
      ctx.closePath();
      ctx.fill();
      if (round) {
        ctx.beginPath();
        ctx.ellipse(W / 2, y, w / 2, 16, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (builder.toppings.includes("gold")) {
      ctx.fillStyle = "#d9a93c";
      [[0.7, 0.35, 16], [0.3, 0.6, 11], [0.5, 0.45, 8]].forEach(([fx, fy, r]) => {
        ctx.beginPath();
        ctx.arc(x + w * fx, y + tierH * fy, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    topY = y;
    bottom = y;
  }

  // toppers on the top tier
  const toppers = [];
  if (builder.toppings.includes("strawberries")) toppers.push("🍓", "🍓", "🍓");
  if (builder.toppings.includes("flowers")) toppers.push("🌸", "🌸");
  if (builder.toppings.includes("macarons")) toppers.push("🍪", "🍪");
  if (builder.toppings.includes("candles")) toppers.push("🕯️", "🕯️", "🕯️");
  ctx.font = "52px serif";
  toppers.forEach((emoji, i) => {
    ctx.fillText(emoji, W / 2 + (i - (toppers.length - 1) / 2) * 54, topY - 4);
  });

  // message on the plate
  if (hasMessage) {
    ctx.fillStyle = "#e0407a";
    ctx.font = rtl ? `700 46px "Aref Ruqaa", serif` : `700 52px "Dancing Script", cursive`;
    ctx.fillText(builder.message.trim(), W / 2, plateY + 90);
  }

  // details card
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.roundRect(70, cardY, W - 140, cardH, 28);
  ctx.fill();
  ctx.fillStyle = "#3a2230";
  ctx.font = `600 26px ${bodyFont}`;
  ctx.direction = rtl ? "rtl" : "ltr";
  summaryLines.forEach((line, i) => ctx.fillText(line, W / 2, cardY + 55 + i * 44));
  ctx.fillStyle = "#e0407a";
  ctx.font = `700 36px ${bodyFont}`;
  ctx.fillText(formatPrice(cakePrice(builder)), W / 2, cardY + 55 + summaryLines.length * 44 + 20);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sweetella-cake.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 2000);
    showToast(t("share.saved"));
  }, "image/png");
}

function flyCakeToCart() {
  const target = document.querySelector(".cart-btn");
  const source = document.querySelector("#cakeStage .cake");
  if (!target || !source || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const flyer = document.createElement("span");
  flyer.className = "cake-flyer";
  flyer.textContent = "🎂";
  Object.assign(flyer.style, { left: `${from.left + from.width / 2 - 40}px`, top: `${from.top + from.height / 2 - 40}px` });
  document.body.appendChild(flyer);
  requestAnimationFrame(() => {
    Object.assign(flyer.style, { left: `${to.left + to.width / 2 - 40}px`, top: `${to.top + to.height / 2 - 40}px`, transform: "scale(0.3)", opacity: "0.4" });
  });
  window.setTimeout(() => flyer.remove(), 900);
}

function initBuilder() {
  const fromLink = loadDesignFromUrl();
  if (fromLink) {
    document.getElementById("cakeMessage").value = builder.message;
    document.getElementById("messageCount").textContent = `${builder.message.length}/25`;
  }

  const guestInput = document.getElementById("guestCount");
  guestInput.addEventListener("input", renderGuests);
  document.querySelectorAll("[data-guests]").forEach((button) => {
    button.addEventListener("click", () => {
      guestInput.value = Math.max(1, Math.min(200, (Number(guestInput.value) || 0) + Number(button.dataset.guests)));
      renderGuests();
    });
  });
  document.getElementById("applyGuests").addEventListener("click", (event) => {
    builder.size = event.currentTarget.dataset.size;
    builder.tiers = Number(event.currentTarget.dataset.tiers);
    renderBuilder();
    showToast(t("guests.applied"));
  });

  document.getElementById("cakeKcal").addEventListener("click", (event) => {
    if (!event.target.closest("#makeLighter")) return;
    const units = cakeOption("size", builder.size).units * builder.tiers;
    ["sponge", "filling", "frosting"].forEach((group) => {
      const light = CAKE_OPTIONS[group].find((o) => o.light);
      if (light && store.ingredientAvailable(`${group}:${light.id}`) >= units) builder[group] = light.id;
    });
    builder.toppings = builder.toppings.filter((id) => cakeOption("toppings", id).kcal <= 15);
    renderBuilder();
    showToast(fill(t("kcal.lighterDone"), { n: formatKcal(cakeKcalPerSlice(builder)) }));
  });

  document.getElementById("shareCake").addEventListener("click", shareDesign);
  document.getElementById("downloadCake").addEventListener("click", downloadDesign);

  document.getElementById("builderSteps").addEventListener("click", (event) => {
    const tile = event.target.closest(".opt");
    if (!tile || tile.disabled) return;
    const { group } = tile.dataset;
    const value = group === "tiers" ? Number(tile.dataset.value) : tile.dataset.value;

    if (group === "toppings") {
      if (builder.toppings.includes(value)) {
        builder.toppings = builder.toppings.filter((id) => id !== value);
      } else if (builder.toppings.length >= MAX_TOPPINGS) {
        showToast(t("builder.maxToppings"));
        return;
      } else {
        builder.toppings.push(value);
      }
    } else {
      builder[group] = value;
    }
    renderBuilder();
  });

  const messageInput = document.getElementById("cakeMessage");
  const messageCount = document.getElementById("messageCount");
  messageInput.addEventListener("input", () => {
    builder.message = messageInput.value;
    messageCount.textContent = `${messageInput.value.length}/${messageInput.maxLength}`;
    drawCake();
    syncShareLink();
  });

  document.getElementById("addCake").addEventListener("click", () => {
    store.addCustom({ ...builder, toppings: [...builder.toppings], message: builder.message.trim() });
    flyCakeToCart();
    window.setTimeout(bumpCartIcon, 650);
    refreshStore();
    showToast(t("builder.added"));
  });

  document.getElementById("resetCake").addEventListener("click", () => {
    Object.assign(builder, BUILDER_DEFAULTS, { toppings: [...BUILDER_DEFAULTS.toppings] });
    messageInput.value = "";
    messageCount.textContent = `0/${messageInput.maxLength}`;
    renderBuilder();
  });

  if (fromLink) showToast(t("share.opened"));
  document.addEventListener("sweetella:languagechange", renderBuilder);
  document.addEventListener("sweetella:storechange", renderBuilder);
  renderBuilder();
}
