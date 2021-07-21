package apicore.resources.milestoneRessource;
import apicore.entit.milestone.availability.Appointment;
import apicore.entit.milestone.availability.availability;
import apicore.entit.user.Users;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequestScoped
@Path("/appointment")
public class appointmentRessource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        List<Appointment> appoinList = Appointment.listAll();
        return Response.ok(appoinList).build();
    }
    @GET
    @Path("/andAvailability")
    @Produces(MediaType.APPLICATION_JSON)
    public static Response getAllSlot() {
        List<availability> availabilityList = availability.listAll();
        List<Appointment> appoinList = Appointment.listAll();
        List<availability> totalList = new ArrayList<availability>();
        totalList.addAll(appoinList); totalList.addAll(availabilityList);
        return Response.ok(totalList).build();
    }

    /**Cet endpoint sert à ajouter un rendez-vous
     * Doit être utilisé depuis l'application candidate
     * Le candidat est roi, il est donc le seul à pouvoir ajouter un rendez-vous */
    @Inject JsonWebToken token;
    @Path("/add")
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("candidate")
    public Response addAppointment(availability available) {
        String email = token.getName();
        Users candidate = Users.findUserByEmail(email);
        Users interlocutor = available.getInterlocutor();
        Appointment.addFromAvailability(available, candidate, interlocutor);
        return Response.ok("Appointment registered From an availability parameter " + email).build();
    }
    @Path("/add/ava")
    @Transactional
    public Response addAppointment2(Appointment available) {
        String email = token.getClaim("email");
        Users user = Users.findUserByEmail(email);
        Appointment.addFromAppointment(available, user);
        return Response.ok("Appointment registered From an Appointment parameter").build();
    }
}
