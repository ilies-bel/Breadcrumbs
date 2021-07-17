package apicore.resources.milestoneRessource;
import apicore.entit.Appointment;
import apicore.entit.availability.availability;

import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/appointment")
public class appointmentRessource {
    @Path("/add")
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addAppointment(availability available) {
        Appointment.add(available);
        return  Response.ok("Appointment registered").build();
    }
}
