
const CACHE_NAME = 'vmu-student-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://dktt.vimaru.edu.vn/Content/Images/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
