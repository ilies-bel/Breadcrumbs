package connect;

import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/rere")
public class ConnectResource {
    @RestClient
    ConnectService connectService;

    @GET @Blocking
    @Produces(MediaType.TEXT_HTML)
    public String getStatus() {
        System.out.println("kdkdkdk");
        return connectService.sendPing();
    }

    @Inject
    JsonWebToken jwt;

    @GET @Path("/2") @Blocking
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<String> getStatus2() {

        //System.out.println(connectService.sendPing());
       return Multi.createFrom().item(connectService.sendPing2())
               .onItem()
                    .invoke(t ->  Multi.createFrom().item(connectService.sendPing())
                                .invoke(tips -> System.out.println("tips succes "))
                            .onFailure()
                                .invoke(erorTips -> System.out.println("error tips") )
                            )
               .onCompletion().continueWith()
                .onFailure().invoke(t -> System.out.println("rtgyhuio")) ;

    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/receiveStatus")
    public String receiveStatus() {
        return "dfghjkl";
    }
}
