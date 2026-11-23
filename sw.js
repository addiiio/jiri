// 진리로교회 PWA 서비스 워커 (v6: FCM 백그라운드 푸시 알림 + 앱 설치 지원)
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC2D3av97eAFqyOibTVHsAbkLVTbF2SyTo",
  authDomain: "jiri-805c8.firebaseapp.com",
  projectId: "jiri-805c8",
  storageBucket: "jiri-805c8.firebasestorage.app",
  messagingSenderId: "327026457231",
  appId: "1:327026457231:web:ea72faeff93bc0e0b74efa"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const n = payload && payload.notification ? payload.notification : {};
  const title = n.title || "진리로교회 알림";
  const options = {
    body: n.body || "새로운 소식이 도착했습니다.",
    icon: "./Icon.png",
    badge: "./Icon.png",
    data: { url: "./" }
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow("./");
    })
  );
});

self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  event.respondWith(fetch(event.request));
});
