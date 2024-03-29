// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
//
import axios from "axios";

const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
    // [::1] is the IPv6 localhost address.
    || window.location.hostname === '[::1]'
    // 127.0.0.0/8 are considered localhost for IPv4.
    || window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;

        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              // eslint-disable-next-line
              console.log(
                'New content is available and will be used when all '
                  + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.',
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              // eslint-disable-next-line
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      });
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error('Error during service worker registration:', error);
    });
}

// only used when running on localhost
function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404
        || (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // eslint-disable-next-line
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}

export function register(config?: Config) {
  window.addEventListener('load', () => {
    const swUrl = '/service-worker.js';

    if (isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(swUrl, config);

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then(() => {
        // eslint-disable-next-line
        console.log(
          'This web app is being served cache-first by a service '
            + 'worker. To learn more, visit https://bit.ly/CRA-PWA',
        );
      });
    } else {
      // Is not localhost. Just register service worker
      registerValidSW(swUrl, config);
    }
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}


/** On véfrifie si l'appareil peut recevoir les notifications */
export function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}
/** Demander la permission de l'utilisateur */
export async function askUserPermission() {
  return await Notification.requestPermission();
}

export async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;

  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "BIBPjpYfaviR0p3I0E6WTvrCynnGD281D6_vr6TAclDlFjX6ysSNlJV8kyxhF3z18BMPJhIAn1gq1S81KRfxHoc"
  }).then(function(pushSubscription) {
    postSubscription(pushSubscription);
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return JSON.stringify(pushSubscription);
  }).catch(e => {
        console.log(e);
      });
}
const SUBSC_URL = process.env.SUBSC_URL;
const TOKEN = process.env.TOKEN_LOCAL_STORAGE_KEY;
/** On effectue la requête destiné à l'endpoint pour s'abonner aux notofications. 
 * Le paramètre 'subscription' correspond à l'objet retourné par la fonction createNotificationSubscription */
export async function postSubscription(subscription: PushSubscription) {
  const token = window.localStorage.getItem(TOKEN);
 
  await axios.put(SUBSC_URL, subscription, {
    headers: { "content-type": "application/json;charset=UTF-8", "Authorization": `Bearer ${token}` },
  })

}
export function getUserSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function(serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function(pushSubscription) {
      return pushSubscription;
    });
}

export async function unSubscribe() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  const token = window.localStorage.getItem(TOKEN);
  
  return await getUserSubscription().then(async (subscription) => {
    const subscribe_temp = subscription;
    //TODO : Changer l'ordre d'exécution : il faut d'abord unsubscribe avant de faire la requête axios : subscription.unsubscribe().then(axios.delete())
    await axios.delete(SUBSC_URL, {
      data: subscription,
      headers: { "content-type": "application/json;charset=UTF-8", "Authorization": `Bearer ${token}`},
    })
    .then(() => subscription.unsubscribe().then((success) => console.log("Désabonnement success")))    
  } )
}