package apicore.entit.WebPush;


import apicore.entit.milestone.interview_process;
import apicore.entit.user.Users;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.List;
import java.util.concurrent.ExecutionException;


import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.jose4j.lang.JoseException;

public class PushSender {
    public Notification notif;
    private String publicKey;
    private PushService pusher;

    public PushSender() {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
            try {
                //TODO: Mettre ces clés dans un fichier.
                pusher = new PushService("BIBPjpYfaviR0p3I0E6WTvrCynnGD281D6_vr6TAclDlFjX6ysSNlJV8kyxhF3z18BMPJhIAn1gq1S81KRfxHoc", "0dfhjFIezIVKHgY6LoF27ePvGhLtl_KiW1_x9ZYXNA4");
            } catch (GeneralSecurityException e) {
                e.printStackTrace();
            }
        }
    }
    public PushSender(SubscriptionService subscription) {
        this();
        this.publicKey = subscription.keys.publicVapidKey;
    }

    public void sendNotification(SubscriptionService subscription, Payload payload) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        notif = new Notification(subscription.endpoint, publicKey, subscription.keys.auth, payload.toString());
        pusher.send(this.notif);
    }

    /**
     * Envoyer une même notification à plusieurs utilisateurs
     * @param users : Liste d'utilisateurs
     * @param payload
     * @throws GeneralSecurityException
     * @throws JoseException
     * @throws IOException
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public void sendNotificationToUserList(List<Users> users, Payload payload) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        List<interview_process> processes = interview_process.listAll();

        for(Users candidate : users) {
            SubscriptionService s = candidate.getPushSubscription();
            notif = new Notification(s.endpoint, publicKey, s.keys.auth, payload.toString());
            pusher.send(notif);
        }
    }
}