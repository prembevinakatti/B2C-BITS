importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
const firebaseConfig = {
    apiKey:"AIzaSyD7T4FKDtgJOH5dVsd1DfUk5mqZpyfIp6U",
    authDomain:"servo-e8fdf.firebaseapp.com",
    projectId: "servo-e8fdf",
    storageBucket: "servo-e8fdf.firebasestorage.app",
    messagingSenderId: "169625164665",
    appId:"1:169625164665:web:7844e2658b83a699a1ada8",
    measurementId:"G-TZ70JLZ7QC"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});