package apicore.resources.milestoneRessource;
import apicore.entit.availability.availability;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/availability")
public class availabilityResource {
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addAvailability(availability a) {
        //System.out.println("milestone endpoint ava :");System.out.println(a.startDate);System.out.println("/ava");
        availability.add(a.startDate, a.endDate, a.title);
        return Response.ok(a).build();
    }

    @POST
    @Path("/list")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addAvailability(List<availability> a) {
        availability.addList(a);
        return Response.ok(a).build();
    }
    @PUT
    @Path("/list")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAvailability(List<availability> a) {
        availability.updateAvalabilities(a);
        return Response.ok(a).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAvailability() {
        List<availability> avaiList = availability.listAll();
        return Response.ok(avaiList).build();
    }
}
