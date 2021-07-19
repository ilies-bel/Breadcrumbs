package apicore.resources;

import apicore.entit.tips.interview_tips;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.util.ResourceUtils;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.ws.rs.core.SecurityContext;

@Path("/tips")
public class tipsRessource {
    @Inject JWTParser parser;
    @Inject JsonWebToken token;
    @Inject
    @Claim(standard = Claims.full_name)
    String full_name;

    @GET
    public List<interview_tips> alltips() {
        return interview_tips.listAll();
    }

    @Path("/secu")
    //@RolesAllowed({ "candidate", "collaborator" })
    @PermitAll
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTips(@Context SecurityContext ctx) {

        String jj = "begin";

        if (ctx.getUserPrincipal() == null) {
            jj = "Not secured";
        }
        else {
            jj = ctx.getUserPrincipal().getName();
        }
        return Response.ok(jj).build();
    }

    @Path("/post")
    @POST @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("collaborator")
    public Response add(interview_tips tip) {
        String title = tip.title; String description = tip.description;
        interview_tips.add(title, description);
        return Response.ok("tip added").build();
    }
}
