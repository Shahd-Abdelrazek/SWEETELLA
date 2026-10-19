// "Never miss a sweet moment": visitors save occasions and add yearly reminders to their own calendar.
"use strict";

const REMINDERS_KEY = "sweetella-reminders";
const OCCASIONS = { birthday: "🎂", anniversary: "💍", graduation: "🎓", other: "🎉" };

function loadReminders() {
  try {
    const list = JSON.parse(localStorage.getItem(REMINDERS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

function saveReminders(list) {
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(list));
  } catch (error) {
  }
}

function nextOccurrence(isoDate) {
  const [, month, day] = isoDate.split("-").map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let next = new Date(today.getFullYear(), month - 1, day);
  if (next < today) next = new Date(today.getFullYear() + 1, month - 1, day);
  const days = Math.round((next - today) / 86400000);
  return { date: next, days };
}

function compactDate(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function reminderTitle(item) {
  return `${OCCASIONS[item.occasion]} ${t(`occ.${item.occasion}`)} — ${item.name}`;
}

function builderLink() {
  return new URL("builder.html", window.location.href).href;
}

function googleCalendarUrl(item) {
  const { date } = nextOccurrence(item.date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: reminderTitle(item),
    dates: `${compactDate(date)}/${compactDate(end)}`,
    details: `${t("rem.calendarText")} ${builderLink()}`,
    recur: "RRULE:FREQ=YEARLY",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function icsEscape(text) {
  return text.replace(/\\/g, "\\\\").replace(/[,;]/g, (ch) => `\\${ch}`).replace(/\n/g, "\\n");
}

function downloadIcs(item) {
  const { date } = nextOccurrence(item.date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sweetella//Reminders//EN",
    "BEGIN:VEVENT",
    `UID:${item.id}@sweetella`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compactDate(date)}`,
    `DTEND;VALUE=DATE:${compactDate(end)}`,
    "RRULE:FREQ=YEARLY",
    `SUMMARY:${icsEscape(reminderTitle(item))}`,
    `DESCRIPTION:${icsEscape(`${t("rem.calendarText")} ${builderLink()}`)}`,
    "BEGIN:VALARM",
    `TRIGGER:-P${item.before}D`,
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsEscape(fill(t("rem.alarm"), { title: reminderTitle(item), n: item.before }))}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `sweetella-${item.occasion}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 2000);
}

function renderReminders() {
  const listEl = document.getElementById("reminderList");
  if (!listEl) return;
  const list = loadReminders()
    .map((item) => ({ ...item, next: nextOccurrence(item.date) }))
    .sort((a, b) => a.next.days - b.next.days);

  document.getElementById("reminderEmpty").hidden = list.length > 0;
  const dateFormat = new Intl.DateTimeFormat(LANGUAGES[getLang()].locale, { day: "numeric", month: "long" });

  listEl.innerHTML = list
    .map((item) => {
      const days = item.next.days;
      const when = days === 0 ? t("rem.today") : days === 1 ? t("rem.tomorrow") : fill(t("rem.inDays"), { n: days });
      const soon = days <= 14;
      return `
      <li class="reminder${soon ? " soon" : ""}" data-reminder="${item.id}">
        <span class="rem-emoji">${OCCASIONS[item.occasion]}</span>
        <div class="rem-info">
          <strong></strong>
          <small>${t(`occ.${item.occasion}`)} · ${dateFormat.format(item.next.date)}</small>
        </div>
        <span class="rem-count">${when}</span>
        <div class="rem-actions">
          <a href="${googleCalendarUrl(item)}" target="_blank" rel="noopener" title="${t("rem.google")}" aria-label="${t("rem.google")}"><i class="fab fa-google" aria-hidden="true"></i></a>
          <button type="button" data-ics title="${t("rem.ics")}" aria-label="${t("rem.ics")}"><i class="fa-regular fa-calendar-plus" aria-hidden="true"></i></button>
          <a href="builder.html" class="rem-order" title="${t("nav.builder")}" aria-label="${t("nav.builder")}"><i class="fa-solid fa-cake-candles" aria-hidden="true"></i></a>
          <button type="button" data-delete title="${t("cart.remove")}" aria-label="${t("cart.remove")}"><i class="fa-regular fa-trash-can" aria-hidden="true"></i></button>
        </div>
      </li>`;
    })
    .join("");
  list.forEach((item) => {
    listEl.querySelector(`[data-reminder="${item.id}"] .rem-info strong`).textContent = item.name;
  });
}

function initReminders() {
  const form = document.getElementById("reminderForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const item = {
      id: `r${Date.now()}`,
      name: form.elements.remName.value.trim(),
      occasion: form.elements.remOccasion.value,
      date: form.elements.remDate.value,
      before: Number(form.elements.remBefore.value),
    };
    saveReminders([...loadReminders(), item]);
    form.reset();
    renderReminders();
    showToast(t("rem.saved"));
  });

  document.getElementById("reminderList").addEventListener("click", (event) => {
    const row = event.target.closest("[data-reminder]");
    if (!row) return;
    const item = loadReminders().find((r) => r.id === row.dataset.reminder);
    if (!item) return;
    if (event.target.closest("[data-ics]")) downloadIcs(item);
    if (event.target.closest("[data-delete]")) {
      saveReminders(loadReminders().filter((r) => r.id !== item.id));
      renderReminders();
    }
  });

  document.addEventListener("sweetella:languagechange", renderReminders);
  renderReminders();
}
