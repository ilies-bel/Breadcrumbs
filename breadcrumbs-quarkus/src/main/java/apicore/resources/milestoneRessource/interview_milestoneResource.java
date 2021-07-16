package apicore.resources.milestoneRessource;

import apicore.entit.availability.availability;
import apicore.entit.milestone.interview_milestones;
import apicore.entit.user.GenerateToken;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;

@Path("/milestone")
public class interview_milestoneResource {
    private static void generate() throws IOException {

    }

    @GET
    public List<PanacheEntityBase> getAll() throws IOException {
        generate();
        return interview_milestones.listAll();
    }

    @POST
    @Transactional
    @Path("/ava")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response addAvailability(availability a) {
        System.out.println("milestone endpoint ava :");System.out.println(a.startDate);System.out.println("/ava");
        availability.add(a.startDate, a.endDate, a.title);
        return Response.ok("Bien reçu : milestone / ava").build();
    }
}
