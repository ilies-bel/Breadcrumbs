package apicore.resources.webPush;

import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.WebPush.VapidKey;
import apicore.entit.user.Users;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Objects;

@Path("/subscribe")
public class SubscriptionResource {
    @Inject
    JsonWebToken jwt;

    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("candidate")
    public Response subscribe(SubscriptionService subscription, @Context SecurityContext ctx) {
        SubscriptionService entity = SubscriptionService.findById(subscription.endpoint);
        String user_email = jwt.getClaim(Claims.upn);
        Users candidate = Users.findByEmail(user_email);

        if(entity == null || candidate==null) {
            candidate.setPushSubscription(subscription);
            subscription.add(candidate);
        }
        else {
            entity.updateKey(subscription.keys);
            entity.updateUser(candidate);
            candidate.setPushSubscription(entity);
        }
        return Response.ok(subscription).build();
    }

    @GET
    public Response getAll() {
        return Response.ok(SubscriptionService.listAll()).build();
    }

    @DELETE
    @Transactional
    @RolesAllowed("candidate")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteSubscription(SubscriptionService subscription) {
        String endpoint = Objects.requireNonNullElseGet(subscription.endpoint, () -> "No_endpoint");

        if(endpoint!="No_endpoint") {
            SubscriptionService.deleteEndpoint(subscription.endpoint);
        }
        else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/key")
    public Response getkey() {
        return Response.ok(VapidKey.listAll()).build();
    }

}
