const CACHE = "igi-extranet-v1";
const ASSETS = [
  "/", "/index.html", "/dashboard.html",
  "/styles.css", "/app.js", "/dashboard.js",
  "/manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).catch(() => caches.match("/index.html")))
  );
});
