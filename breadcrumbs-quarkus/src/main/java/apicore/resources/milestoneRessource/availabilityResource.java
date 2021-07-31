package apicore.resources.milestoneRessource;
import apicore.entit.WebPush.PushSender;
import apicore.entit.milestone.availability.availability;
import apicore.entit.milestone.interview_process;
import apicore.resources.milestoneRessource.appointmentRessource;
import apicore.entit.user.Users;
import apicore.resources.webPush.PushSenderResource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.annotations.SseElementType;

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

        if(collaborator!=null) {
        availability.add(a.startDate, a.endDate, collaborator.email);
        }
        else {
            availability.add(a.startDate, a.endDate, a.interlocutor_email);
        }

        return Response.ok(a).build();
    }

    @POST
    @Path("/add/list")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("collaborator")
    public Response addAvailability(List<availability> a) {
        availability.addList(a);
        return Response.ok(a).build();
    }
    @PUT
    @Path("/update/")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAvailability(List<availability> availabilities) {
        availability.updateAvalabilities(availabilities);
        PushSenderResource pushResource = new PushSenderResource();
        pushResource.toAllSending("New availabilities !");
        return Response.ok(availabilities).build();
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

    @GET
    @Path("/event")
    @Produces(MediaType.SERVER_SENT_EVENTS) @SseElementType(MediaType.TEXT_PLAIN)
    public Response srteam() {
        return Response.ok("{\"dmmd\":\"mdmdm\"}").build();
    }
}
