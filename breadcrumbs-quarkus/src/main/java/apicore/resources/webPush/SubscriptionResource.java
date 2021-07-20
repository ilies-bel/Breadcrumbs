package apicore.resources.webPush;

import apicore.entit.WebPush.SubscriptionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/subscribe")
public class SubscriptionResource {
    @POST
    @Transactional
    public Response subscribe(SubscriptionService subscription) throws JsonProcessingException {
        //Il est préférable insérer keys avant subscription
        //Si on insère subscription avant keys, le résultat ser le même mais une troisième requête sera effectué pour lier subscription à la key correspondante
        subscription.keys.persist();
        subscription.persist();
        return Response.ok(subscription).build();
    }
}
