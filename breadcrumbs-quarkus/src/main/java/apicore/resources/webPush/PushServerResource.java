package apicore.resources.webPush;

import apicore.entit.WebPush.Payload;
import apicore.entit.WebPush.PushServerService;
import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.user.Users;
import io.smallrye.jwt.util.ResourceUtils;
import nl.martijndwars.webpush.Notification;
import org.jose4j.lang.JoseException;

import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@Path("/push")
public class PushServerResource {
    /** Envoie une notification à un utilisateur */
    @POST
    @Path(("/send/{user}"))
    public Response send(Payload payload, @PathParam("user") Integer id_user) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        Users user = Users.findById(id_user);

        if(user.hasPushSubscription()) {
            SubscriptionService subscription = user.getPushSubscription();
            PushServerService pushServer = new PushServerService(subscription);
            pushServer.sendNotification(subscription, payload);
            return Response.ok("notif send").build();
        }
        else {
            return Response.ok("this user doesn't enable or has no push subscription registered").status(420).build();
        }
    }

    @GET
    @Path(("/send/list"))
    public Response multipleSending(Payload payload, Set<Integer> list_user) {
        for(Integer id : list_user) {
            Users user = Users.findById(id);
            if(user.hasPushSubscription()) {
                SubscriptionService subscription = user.getPushSubscription();
                PushServerService pushServer = new PushServerService(subscription);
                try {
                    pushServer.sendNotification(subscription, payload);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return Response.ok("dkkdkd").build();
    }

    @GET
    @Path("key/vapid")
    @Produces(MediaType.TEXT_PLAIN)
    public String getPublicVapidKey() throws IOException {
        String publicKey = ResourceUtils.readResource("publicVapidKey.pem");
        return publicKey;
    }

}
