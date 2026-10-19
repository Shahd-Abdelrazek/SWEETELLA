
const CACHE_VERSION = "sweetella-v11";

const PRECACHE = [
  "builder.html",
  "contact.html",
  "feedback.html",
  "index.html",
  "join.html",
  "menu.html",
  "news.html",
  "team.html",
  "track.html",
  "css/bootstrap.min.css",
  "css/bootstrap.rtl.min.css",
  "css/style.css",
  "js/bootstrap.bundle.min.js",
  "js/i18n.js",
  "js/store.js",
  "js/chatbot.js",
  "js/builder.js",
  "js/reminders.js",
  "js/track.js",
  "js/script.js",
  "manifest.webmanifest",
  "images/icons/icon-192.png",
  "images/ChatGPT_Image_Jul_2__2025__10_43_21_PM-removebg-preview.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("index.html")))
    );
    return;
  }

  const cacheable = url.origin === self.location.origin || /fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host);
  if (!cacheable) return;
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok || response.type === "opaque") {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
