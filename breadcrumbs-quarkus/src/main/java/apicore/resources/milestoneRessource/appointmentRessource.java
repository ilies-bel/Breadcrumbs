package apicore.resources.milestoneRessource;
import apicore.entit.milestone.availability.Appointment;
import apicore.entit.milestone.availability.availability;
import apicore.entit.milestone.interview_milestones;
import apicore.entit.milestone.interview_process;
import apicore.entit.user.Users;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
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
    public Response addAppointment(availability available, @Context SecurityContext ctx) {
        String email = token.getClaim(Claims.upn);

        Users candidate = Users.findUserByEmail(email);
        Users interlocutor;
        interview_process process;
        if(available.endDate==null || available.startDate==null || (available.interlocutor==null && available.interlocutor_email==null)) {
            //throw new BadRequestException();
            return Response.ok("Failed request. Please fill all fields").status(Response.Status.BAD_REQUEST).build();
        }

        if(available.interlocutor == null) {
            interlocutor = Users.findUserByEmail(available.interlocutor_email);

            process = interview_process.find("candidate = ?1 AND entreprise = ?2", candidate, interlocutor.entreprise).firstResult();

            interview_milestones currentMilestone = process.getCurrentMilestone();

            Appointment.addFromAvailability(available, available.interlocutor_email, candidate, currentMilestone);
        }
        else {
            interlocutor = Users.findUserByEmail(available.interlocutor.email);

            process = interview_process.find("candidate = ?1 AND entreprise = ?2", candidate, interlocutor.entreprise).firstResult();
            System.out.println(process.getCurrentMilestone().milestone_name);
            interview_milestones currentMilestone = process.getCurrentMilestone();

            System.out.println(currentMilestone.milestone_name);

            Appointment.addFromAvailability(available, candidate, currentMilestone);
        }


        return Response.ok("New appointment added : "+available.startDate+" "+available.endDate+" with "+interlocutor.first_name).build();
    }
    @Path("/add/ava")
    @Transactional
    public Response addAppointment2(Appointment available) {
        String email = token.getClaim("email");
        Users user = Users.findUserByEmail(email);

        interview_process process = interview_process.find("candidate", user).firstResult();
        interview_milestones currentMilestone = process.getCurrentMilestone();

        Appointment.addFromAppointment(available, user, currentMilestone);
        return Response.ok("Appointment registered From an Appointment parameter").build();
    }
}
