package apicore.resources.authRessource;

import apicore.entit.user.Users;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class userRessource {
    @RolesAllowed("collaborator")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getAll() {
        return Users.listAll();
    }

}
