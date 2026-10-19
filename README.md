# Sweetella 🍰

A multi-language (English / العربية / Deutsch / Italiano / Français) bakery website with a shop, a cake designer,
order tracking and more. It is a static site: plain HTML, CSS and JavaScript, no build step.

## Run it

Open `index.html` in a browser, or use PyCharm's built-in server (right-click `index.html` → Open in Browser).

## Pages

| Page | What it does |
|---|---|
| `index.html` | Home: hero slider, best sellers, reviews slider, occasion reminders |
| `menu.html` | Shop: regular / 🌿 diet menu, categories, allergens, calories, sorting, favorites |
| `builder.html` | Design a Cake: live preview, ingredient stock, price & calories, share / save image |
| `track.html` | Order tracking (reads a Google Sheet — see `TRACKING_SETUP_AR.md`) |
| `feedback.html` | Customer reviews |
| `contact.html` | Contact form + map |
| `team.html`, `news.html`, `join.html` | About pages |

## Where to change things

| What | Where |
|---|---|
| WhatsApp number for orders, tracking sheet link | `SHOP` at the top of `js/store.js` |
| Products: prices, stock, calories, allergens, photos | `PRODUCTS` in `js/store.js` |
| Cake designer options (ingredients, stock, prices, calories) | `CAKE_OPTIONS` in `js/store.js` |
| All text in the 5 languages | `js/i18n.js` |
| Colours (light and dark mode) | the `:root` variables at the top of `css/style.css` |
| Sample reviews | `REVIEWS` in `js/script.js` + `review.*` keys in `js/i18n.js` |

> Prices, stock, calories and allergen info are sample values — replace them with the real ones before publishing.

## Files

- `js/i18n.js` — translations and language switching
- `js/store.js` — products, stock, cart, checkout (WhatsApp)
- `js/script.js` — shared header/footer, menu page, reviews, theme, contact form
- `js/builder.js` — Design a Cake page
- `js/chatbot.js` — the chat assistant
- `js/reminders.js` — occasion reminders (calendar files)
- `js/track.js` — order tracking
- `sw.js` + `manifest.webmanifest` — installable app (works once the site is online).
  Bump `CACHE_VERSION` in `sw.js` after changing files.

Image credits: see `IMAGE_CREDITS.md`.
