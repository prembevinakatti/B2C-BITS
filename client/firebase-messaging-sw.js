// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyD7T4FKDtgJOH5dVsd1DfUk5mqZpyfIp6U",
  authDomain: "servo-e8fdf.firebaseapp.com",
  projectId: "servo-e8fdf",
  storageBucket: "servo-e8fdf.appspot.com",
  messagingSenderId: "169625164665",
  appId: "1:169625164665:web:7844e2658b83a699a1ada8",
  measurementId: "G-TZ70JLZ7QC",
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
