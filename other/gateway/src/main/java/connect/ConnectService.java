package connect;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@RegisterRestClient
public interface ConnectService {
    public String ping = "ping";
    public String event = "";
    public String data = "";

    @Path("/tips")
    @GET
    public String sendPing();

    @Path("/milestone")
    @GET
    public String sendPing2();
}
