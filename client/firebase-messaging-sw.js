// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCHgct4LWvS_4azoV7jLR2rWNxQkazxHPc",
  authDomain: "hackelite-a5037.firebaseapp.com",
  projectId: "hackelite-a5037",
  storageBucket: "hackelite-a5037.firebasestorage.app",
  messagingSenderId: "562332384915",
  appId: "1:562332384915:web:b408fb39bdd68afc94d766",
  measurementId: "G-FEC3EQWQL6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
