// 진리로교회 PWA 푸시 알림 서비스 워커
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

// 백그라운드에서 푸시 알림 수신 시 상단 팝업 표시
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification ? payload.notification.title : "진리로교회 알림";
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : "새로운 소식이 도착했습니다.",
    icon: "./Icon.png",
    badge: "./Icon.png"
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 터치 시 앱 창 열기 또는 포커스
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});
