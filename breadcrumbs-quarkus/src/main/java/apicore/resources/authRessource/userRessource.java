package apicore.resources.authRessource;

import apicore.entit.user.Users;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class userRessource {
    @Inject
    JsonWebToken jwt;
    @RolesAllowed("COLLABORATOR")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getAll() {
        return Users.listAll();
    }

}
