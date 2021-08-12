package themer.Resources.messageRessource;

import io.smallrye.mutiny.Multi;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import themer.layouts.Layout;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/send")
public class emitterResource {
    
    @POST
    @Path("/request")
    public Response send(Layout layout) {
        return Response.ok(layout).build();
    }

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Response send() {
        return Response.ok("ksks").build();
    }
}
