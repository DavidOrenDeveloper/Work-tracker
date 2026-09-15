/*
  This service worker exists ONLY so the browser treats the app as a real,
  installable PWA (Android's "Install app" prompt requires one). It does
  NOT cache anything on purpose: every request always goes straight to the
  network, so whenever you push an update to GitHub, the next time the app
  is opened (with an internet connection) it loads the latest version
  automatically — no manual reinstall needed.
*/
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Navigation / document requests (i.e. loading index.html itself) must NEVER be
  // served from any HTTP cache layer, or updates won't be visible after a refresh.
  if(event.request.mode === 'navigate' || event.request.destination === 'document'){
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
  } else {
    event.respondWith(fetch(event.request));
  }
});
