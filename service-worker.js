const CACHE_NAME = 'rto-buddy-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/onboarding.html',
  '/privacy.html',
  '/404.html',
  '/question-bank.html',
  '/practice.html',
  '/exam.html',
  '/final-prep.html',
  '/rto-codes.html',
  '/signs.html',
  '/laws.html',
  '/documents.html',
  '/dl-info.html',
  '/schools.html',
  '/settings.html',
  '/assets/css/style.css',
  '/assets/css/responsive.css',
  '/assets/css/popup.css',
  '/assets/js/main.js',
  '/assets/js/onboarding.js',
  '/assets/js/exam.js',
  '/assets/js/quiz.js',
  '/assets/js/disclaimer.js',
  '/assets/js/utils.js',
  '/assets/images/logos/icon-192.png',
  '/assets/images/logos/icon-512.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch resources
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
