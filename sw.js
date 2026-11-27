/* Service Worker — تطبيق المزارعين: يعمل أوفلاين بعد أول زيارة عبر خادم HTTP.
   ملاحظة: Service Worker لا يعمل عند فتح الملف مباشرة file:// — يجب تقديمه عبر خادم.
   مهم: عند أي تعديل جديد في التطبيق، غيّر رقم CACHE هنا (v3، v4...) حتى يمسح
   المتصفح النسخة القديمة المخزنة ويجيب الجديدة. صفحات التطبيق نفسها تُجلب
   من الشبكة أولًا (network-first) حتى لا تظهر نسخة قديمة، وباقي الملفات من الكاش. */
const CACHE = "muzarieen-v7";
const FILES = ["./", "./index.html", "./manifest.json", "./config.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
function isPageRequest(req) {
  if (req.mode === "navigate") return true;
  try {
    const u = new URL(req.url);
    return u.pathname === "/" || u.pathname.endsWith("/index.html") || u.pathname.endsWith("/tatbiq-al-muzarieen/");
  } catch (e) { return false; }
}
self.addEventListener("fetch", (e) => {
  if (isPageRequest(e.request)) {
    // صفحات التطبيق: الشبكة أولًا، والكاش احتياطي عند انقطاع النت فقط.
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
