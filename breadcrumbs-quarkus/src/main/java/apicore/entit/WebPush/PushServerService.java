package apicore.entit.WebPush;


import apicore.entit.WebPush.SubscriptionService;
import org.eclipse.microprofile.rest.client.RestClientBuilder;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jose4j.lang.BouncyCastleProviderHelp;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.validation.constraints.NotNull;
import javax.ws.rs.NotFoundException;
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
    private Notification notif;

    public PushServerService() {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
    }
    public PushServerService(SubscriptionService subbscription) {
        this();

        try {
            URI uri = new URI(subbscription.endpoint);
            RestClientBuilder pushServer = RestClientBuilder.newBuilder().baseUri(uri);
            try {
                notif = new Notification(subbscription.endpoint,
                        "BIY62sUhXQZnEe39GpuNSHqxjBoXXDmng26oKiyQISJM6cPodHbRaKdsjf5y9iCpsOlbmNXlugTNjWThgvuPHqg", subbscription.keys.auth, "{\"title\":\"ree\"}");
            }
            //En prod, remplacer les e.printStac.* par l'instruction 'throw NotFoundException' afin d'éviter de retourner des erreurs 500 (Internal Error).
            catch (NoSuchAlgorithmException e) {
                e.printStackTrace(); //throw NotFoundException;
            } catch (InvalidKeySpecException e) {
                e.printStackTrace(); //throw NotFoundException;
            } catch (NoSuchProviderException e) {
                e.printStackTrace(); //throw NotFoundException;
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
