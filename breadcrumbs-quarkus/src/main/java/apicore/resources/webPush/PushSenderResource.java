package apicore.resources.webPush;

import apicore.entit.WebPush.Payload;
import apicore.entit.WebPush.PushSender;
import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.user.Users;
import io.smallrye.jwt.util.ResourceUtils;
import org.jose4j.lang.JoseException;

import javax.annotation.security.RolesAllowed;
import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@Path("/push")
public class PushSenderResource {
    /** Envoie une notification à un utilisateur */
    @POST
    @Path(("/sendPayload/{user}")) @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("collaborator")
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
    @RolesAllowed("collaborator")
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

    @POST
    @Path(("/send/list"))
    @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.TEXT_PLAIN)
    @RolesAllowed("collaborator")
    public Response toAllSending(Payload payload) {
        List<Users> list_user = Users.listAll();
        for(Users user : list_user) {
            if(user.hasPushSubscription()) {
                SubscriptionService subscription = user.getPushSubscription();

                try {
                    PushSender pushServer = new PushSender(subscription);
                    PushSender.sendNotification(subscription, payload);
                } catch (Exception e) {
                    return Response.ok("Erreur. persone n'a reçu la notification.").status(400).build();
                }
            }
        }
        return Response.ok("Bien envoyé").build();
    }

    public void toAllSending(String payload) {
        toAllSending(Payload.fromString(payload));
    }

    @GET
    @Path("key/vapid")
    @Produces(MediaType.TEXT_PLAIN)
    public String getPublicVapidKey() throws IOException {
        String publicKey = ResourceUtils.readResource("publicVapidKey.pem");
        return publicKey;
    }

}
