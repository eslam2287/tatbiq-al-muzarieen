/* Service Worker — تطبيق المزارعين: يعمل أوفلاين بعد أول زيارة عبر خادم HTTP.
   ملاحظة: Service Worker لا يعمل عند فتح الملف مباشرة file:// — يجب تقديمه عبر خادم. */
const CACHE = "muzarieen-v1";
const FILES = ["./", "./index.html", "./manifest.json"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
