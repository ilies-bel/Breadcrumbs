// / <reference lib="webworker" />
import {createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';
import {clientsClaim} from 'workbox-core';

declare const self: Window & ServiceWorkerGlobalScope;

// Events listeners
// Detect if the browser allow PWA install
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static').then((cache) => {
      cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
    }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker ....', event);
});

clientsClaim();

const precacheManifest = [].concat(self.__WB_MANIFEST || []);
precacheAndRoute(precacheManifest);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
});
registerRoute(navigationRoute);


const BASE_URL = process.env.SUBSC_URL

function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in self;
}

/** Le paramètre 'subscription' correspond à l'objet retourné par la fonction createNotificationSubscription */
async function postSubscription(subscription) {
  const response = await fetch(`https://push-notification-demo-server.herokuapp.com/subscription`, {
    credentials: "omit",
    headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
    body: JSON.stringify(subscription),
    method: "POST",
    mode: "cors"
  });
  return await response.json();
}

//Fonction à effectuer au moment de lévénement push
function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");
  //L'objet contenant la notification est convertit en JSON
  const data = event.data.json();

  const options = {
    body: `${data?.body ?? "Voilà Comment fidéliser l'utilisateur. Le roi des pirates, ce sera..."}`,
    icon: "/favicon.ico",
    actions: [{action: "Cliquer",title: "Book Appointment",icon: "/Subtract.png"},
    {action: "Skip",title: "Ignore",icon: "/Subtract.png"},
    ],
    badge: "/favicon.ico",
    image: "https://www.studiobell.ca/assets/images/_header/NMC-Digital-Assest-Dec2017-NZ-2603.jpg",
    requireInteraction: true
  }
  //Afficher la notifiation
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
}
self.addEventListener("push", receivePushNotification); //Listener de l'événement push

//Fonction qui permet à l'utilisateur d'ouvrir une notification
function openPushNotification(event) {
  console.log("Notification click Received.",    event.notification.data);
   event.notification.close();
  //do something
}
self.addEventListener("notificationclick", openPushNotification); //Événement attaché à l'ouverture d'une notification