const CACHE_NAME = "drilling-tool-v1";
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "Bit.png",
  "icon-192.png",
  "manifest.json"
];

// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting(); // ottaa uuden version heti käyttöön
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // poistaa vanhat versiot
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
