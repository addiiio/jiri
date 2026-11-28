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

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

// 백그라운드 메시지 수신 시 1회만 알림 표시 (data 전용 페이로드 전용)
messaging.onBackgroundMessage(function(payload) {
  const data = (payload && payload.data) ? payload.data : {};
  const notif = (payload && payload.notification) ? payload.notification : {};

  // notification 필드가 이미 있으면 Firebase SDK가 자동 표시하므로 중복 생성 중단
  if (notif.title || notif.body) return;

  const title = data.title || '진리로교회 알림';
  const options = {
    body: data.body || '',
    icon: data.icon || './Icon.png',
    badge: data.badge || './Badge.png',
    tag: data.tag || 'jinriro_default_tag',
    renotify: false,
    data: {
      url: data.link || 'https://app.jinriro.or.kr'
    }
  };

  return self.registration.showNotification(title, options);
});

// 알림 클릭 시 웹앱 창 열기 또는 포커스 이동
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : 'https://app.jinriro.or.kr';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.indexOf('jinriro.or.kr') !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
