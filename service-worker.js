const CACHE_NAME = "drill-app-v2";
``

const urlsToCache = [
  "./",
  "index.html",
  "Bit.png",
  "i-series adjustment guide.pdf",
  "icon-192.png",
  "icon-512.png",
  "manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
