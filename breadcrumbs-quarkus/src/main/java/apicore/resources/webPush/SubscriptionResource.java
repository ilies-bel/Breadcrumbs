package apicore.resources.webPush;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/subscribe")
public class SubscriptionResource {
    @GET
    public Response subscribe() {
        return Response.ok("EEERRERER").build();
    }
}
