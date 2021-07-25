package apicore.resources.milestoneRessource;
import apicore.entit.milestone.availability.availability;
import apicore.entit.milestone.interview_process;
import apicore.resources.milestoneRessource.appointmentRessource;
import apicore.entit.user.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/availability")
public class availabilityResource {
    @Inject JsonWebToken token;
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("collaborator")
    public Response addAvailability(availability a) {
        Users collaborator = a.interlocutor;
        //System.out.println("milestone endpoint ava :");System.out.println(a.startDate);System.out.println("/ava");
        availability.add(a.startDate, a.endDate, collaborator);

        return Response.ok(a).build();
    }

    @POST
    @Path("/add/list")
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
    public Response getAvailabilities() {
        ObjectMapper mapper = new ObjectMapper();
        List<availability> avaiList = availability.getAll();
        try {
            String response = mapper.writeValueAsString(avaiList);
            return Response.ok(response).build();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Response.ok("Parsing Error").build();
        }
    }
    @GET
    @Path("/andAppointments")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllSlot() {
        return appointmentRessource.getAllSlot();
    }
}
