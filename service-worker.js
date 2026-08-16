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
  event.respondWith(fetch(event.request));
});
