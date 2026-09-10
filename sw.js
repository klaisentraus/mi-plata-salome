/* Mi Plata — service worker
   Guarda la app en el celular para que abra sin internet.
   Estrategia: responde ya con lo guardado y actualiza por detrás,
   así la próxima vez ya tiene la versión nueva. */

var CACHE = 'miplata-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-32.png',
  './icon-maskable.png'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .catch(function () { /* si algo falta, la app igual funciona online */ })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.map(function (k) {
          return k === CACHE ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok && res.type === 'basic') {
          var copia = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copia); });
        }
        return res;
      }).catch(function () {
        /* sin internet: si es una navegación, devuelve la app guardada */
        return hit || caches.match('./index.html');
      });
      return hit || net;
    })
  );
});
