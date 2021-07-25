package apicore.resources.milestoneRessource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/type")
public class interview_typeRessource {
    @GET
    public Response getInterviewType() {
        return Response.ok("rlfrlfrlf").build();
    }
}
