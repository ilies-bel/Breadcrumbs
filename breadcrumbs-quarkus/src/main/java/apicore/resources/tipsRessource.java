package apicore.resources;

import apicore.entit.tips.interview_tips;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/tips")
public class tipsRessource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"collaborator", "supervisor"})
    public List<interview_tips> getTips() {
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
