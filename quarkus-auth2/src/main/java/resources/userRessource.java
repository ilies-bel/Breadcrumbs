package resources;

import org.eclipse.microprofile.jwt.JsonWebToken;
import user.GenerateToken;
import user.Users;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.io.IOException;
import java.util.List;


@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class userRessource {
    @Inject
    JsonWebToken jwt;

    @RolesAllowed("collaborator")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getAll(@Context SecurityContext ctx) {
        return Users.listAll();
    }

}
