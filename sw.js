const CACHE = 'gymlog-v2';
const FILES = [
  '/Bonusbuurt/',
  '/Bonusbuurt/index.html',
  '/Bonusbuurt/manifest.json',
  '/Bonusbuurt/icon-192.png',
  '/Bonusbuurt/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
