package apicore.resources.webPush;

import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.WebPush.VapidKey;
import apicore.entit.WebPush.PushServerService;
import org.jose4j.lang.JoseException;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;

@Path("/subscribe")
public class SubscriptionResource {
    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response subscribe(SubscriptionService subscription) {
        SubscriptionService entity = SubscriptionService.findById(subscription.endpoint);
        if(entity == null) {
            subscription.add();
        }
        else {
            entity.updateKey(subscription.keys);
        }
        return Response.ok(subscription).build();
    }

    @GET
    public Response getAll() {
        return Response.ok(SubscriptionService.listAll()).build();
    }

    @DELETE
    @Transactional
    public void deleteSubscription(SubscriptionService subscription) {
        SubscriptionService.deleteEndpoint(subscription.endpoint);
    }

    @GET
    @Path("/key")
    public Response getke() {
        return Response.ok(VapidKey.listAll()).build();
    }

}
