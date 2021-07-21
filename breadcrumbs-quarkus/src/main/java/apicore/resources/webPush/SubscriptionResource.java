package apicore.resources.webPush;

import apicore.entit.WebPush.SubscriptionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
            entity.update(subscription.keys);
        }

        return Response.ok(subscription).status(215).build();
    }

    @GET
    public Response getAll() {
        return Response.ok(SubscriptionService.listAll()).build();
    }

    @DELETE
    @Transactional
    public Response delete(SubscriptionService s) {
        s.supprime();
        return Response.ok("successfully deleted").build();
    }


}
