// 진리로교회 PWA 서비스 워커 (최신 버전 유지 + 앱 설치 지원)
self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  event.respondWith(fetch(event.request));
});
