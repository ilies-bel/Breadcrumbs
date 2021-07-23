package apicore.resources.webPush;

import apicore.entit.WebPush.PushServerService;
import apicore.entit.WebPush.SubscriptionService;
import org.jose4j.lang.JoseException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;

@Path("/push")
public class PushServerResource {
    @GET
    @Path(("/send"))
    public Response send(SubscriptionService subscription, String payload) throws GeneralSecurityException, JoseException, IOException, ExecutionException, InterruptedException {
        try {
            PushServerService pushServer = new PushServerService(subscription);
            pushServer.send(subscription, "payload");
            return Response.ok("Notif send").build();
        }
        catch (ExecutionException e) {
            return Response.ok("ExecutionException. Connexion échoué").status(Response.Status.BAD_REQUEST).build();
        }
    }
}
