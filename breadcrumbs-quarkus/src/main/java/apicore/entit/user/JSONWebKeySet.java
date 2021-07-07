package apicore.entit.user;

import io.smallrye.jwt.util.ResourceUtils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Path("/key")
public class JSONWebKeySet {
    Map<String, String> keySet = new HashMap<>();

    @GET
    @Path("/public")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getPublicKey() {
        //readResource permet de lire les fichiers placés dans le dossier ressource
        try {
            String publicKey = ResourceUtils.readResource("publicKey.pem");
            return Response.ok(publicKey).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.ok(e).status(520).build();
        }
    }
    @GET
    @Path("/faklic")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getFakeKey() {
        //readResource permet de lire les fichiers placés dans le dossier ressource
        try {
            String publicKey = ResourceUtils.readResource("public2.pem");
            return Response.ok(publicKey).build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.ok(e).status(520).build();
        }
    }
}
