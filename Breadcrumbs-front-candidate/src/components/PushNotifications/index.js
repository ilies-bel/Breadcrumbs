import React from 'react';

function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

async function askUserPermission() {
  return await Notification.requestPermission();
}
