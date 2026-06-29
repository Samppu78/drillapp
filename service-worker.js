const CACHE_NAME = "drilling-tool-v10.5";

const FILES_TO_CACHE = [
  "/",
  "index.html",
  "Bit.png",
  "icon-192.png",
  "manifest.json",
  "iSeries Adjustment Guide.pdf",
  "Top Hammer Catalog.pdf",
  "Drilling App Guide.pdf",
  "Failure Analysis Guide.pdf"
];



// ✅ INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ✅ ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ✅ FETCH (cache first = paras offlineen)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
