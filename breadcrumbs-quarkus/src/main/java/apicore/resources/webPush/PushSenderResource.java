package apicore.resources.webPush;

import apicore.entit.WebPush.Payload;
import apicore.entit.WebPush.PushSender;
import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.user.Users;
import io.smallrye.jwt.util.ResourceUtils;
import org.jose4j.lang.JoseException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@Path("/push")
public class PushSenderResource {
    /** Envoie une notification à un utilisateur */
    @POST
    @Path(("/sendPayload/{user}")) @Consumes(MediaType.APPLICATION_JSON)
    public Response send(Payload payload, @PathParam("user") Integer id_user) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        Users user = Users.findById(id_user);

        if(user.hasPushSubscription()) {
            SubscriptionService subscription = user.getPushSubscription();
            PushSender pushServer = new PushSender(subscription);
            pushServer.sendNotification(subscription, payload);
            return Response.ok("notif send").build();
        }
        else {
            return Response.ok("this user doesn't enable or has no push subscription registered").status(420).build();
        }
    }
    /** Envoie une notification à un utilisateur */
    @POST
    @Path(("/sendText/{user}")) @Consumes(MediaType.TEXT_PLAIN)
    public Response send(String text, @PathParam("user") Integer id_user) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        Users user = Users.findById(id_user);

        if(user.hasPushSubscription()) {
            SubscriptionService subscription = user.getPushSubscription();
            PushSender pushServer = new PushSender(subscription);
            pushServer.sendNotification(subscription, Payload.fromString(text));
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
                PushSender pushServer = new PushSender(subscription);
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
