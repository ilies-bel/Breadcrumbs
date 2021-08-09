package apicore.resources.authRessource;

import apicore.entit.company.Entreprise;
import apicore.entit.milestone.interview_process;
import apicore.entit.user.Users;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Objects;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;


@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class userRessource {
    @Inject
    JsonWebToken jwt;
    @RolesAllowed("collaborator")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getAll() {
        return Users.listAll();
    }

    @Path("candidates")
    @GET @RolesAllowed("collaborator")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getCandidates() {
        return Users.find("role", "candidate").list();
    }

    @Path("collaborator")
    @GET @RolesAllowed("collaborator")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getCollaborator() {
        return Users.find("role", "collaborator").list();
    }

    @Path("create")
    @POST @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUser(Users user) {
        if(user.email != null && user.getPassword() != null && user.role !=null) {
            Users newOne = new Users(user.email, user.getPassword(), user.role, user.first_name, user.last_name);

            newOne.phone = Objects.requireNonNullElseGet(user.phone, () -> "No phone");
            newOne.entreprise = Objects.requireNonNullElseGet(user.entreprise, () -> new Entreprise());

            newOne.persist();
            return Response.ok("New user added :" + newOne.email + ", role : " + newOne.role ).build();
        }
        else {
            return Response.ok("Please fill all fields").status(400).build();
        }
    }

    @Inject Mailer mailer;

    @Path("/mail")
    @POST
    public void sendEmail() {
        mailer.send(
                Mail.withText("jukiture@gmail.com",
                        "Ahoy from Quarkus",
                        "A simple email sent from a Quarkus application."
                )
        );
    }

}
