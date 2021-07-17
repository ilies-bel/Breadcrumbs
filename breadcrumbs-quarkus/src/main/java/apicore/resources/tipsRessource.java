package apicore.resources;

import apicore.entit.tips.interview_tips;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import io.smallrye.jwt.auth.principal.JWTParser;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.ws.rs.core.SecurityContext;

@RequestScoped
@Path("/tips")
public class tipsRessource {
    @Inject JWTParser parser;
    @Inject JsonWebToken jwt;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"candidate", "collaborator"})
    public List<interview_tips> getTips(@HeaderParam("Authorization") String jjr, @Context SecurityContext ctx) {
        String principal = jwt.getClaim("name").toString();
        System.out.println(principal);
        try {
            System.out.println("jjr dans try-catch tips");System.out.println(jjr);System.out.println("/tips");
            JsonWebToken jt = parser.parse(jjr);
            System.out.println("jwt tips");System.out.println(jt);System.out.println("/tips jwt");
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return interview_tips.getTips();
    }


    @Path("/post")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response add() {
        interview_tips tips = new interview_tips();
        tips.ranking = 5;
        tips.title = "Jkrkr";
        tips.description = "---";
        tips.persist();
        return Response.ok(tips).build();
    }
}
