package apicore.interfaces;


import apicore.entit.WebPush.SubscriptionService;
import org.eclipse.microprofile.rest.client.RestClientBuilder;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jose4j.lang.BouncyCastleProviderHelp;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.util.concurrent.ExecutionException;


import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.jose4j.lang.JoseException;

public class PushServerService {
    public PushServerService() {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
    }
    private Notification notif;
    public PushServerService(SubscriptionService subbscription) {
        try {
            URI uri = new URI(subbscription.endpoint);
            RestClientBuilder pushServer = RestClientBuilder.newBuilder().baseUri(uri);
            try {
                notif = new Notification(subbscription.endpoint,
                        "BIY62sUhXQZnEe39GpuNSHqxjBoXXDmng26oKiyQISJM6cPodHbRaKdsjf5y9iCpsOlbmNXlugTNjWThgvuPHqg", subbscription.keys.auth, "{\"title\":\"ree\"}");
            } catch (NoSuchAlgorithmException e) {
                //System.out.println("Problème de clé");System.out.println("Problème de clé");System.out.println("Problème de clé");
                e.printStackTrace();
            } catch (InvalidKeySpecException e) {
                //System.out.println("Problème de clé");System.out.println("Problème de clé");System.out.println("Problème de clé");
                e.printStackTrace();
            } catch (NoSuchProviderException e) {
                e.printStackTrace();
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    public void send(SubscriptionService subscription, String payload) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        PushService pusher = new PushService();
        pusher.send(this.notif);
    }
}
