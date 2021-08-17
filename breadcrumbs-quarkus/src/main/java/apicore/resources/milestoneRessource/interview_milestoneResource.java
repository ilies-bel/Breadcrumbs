package apicore.resources.milestoneRessource;

import apicore.entit.company.Entreprise;
import apicore.entit.milestone.interview_milestones;
import apicore.entit.milestone.interview_process;
import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Path("/milestone")
public class interview_milestoneResource {

    @GET
    public List<interview_milestones> getAll() {
        interview_process process = interview_process.findById(1);
        return process.getAllMilestones();
    }

    @POST
    @Path("ofUser")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response ofUser(Users candidate) {
        Entreprise e = Entreprise.findById("Breadcrumbs");
        try {
            interview_process process = interview_process.findProcess(candidate, e);
            List<interview_milestones> milestones = new ArrayList<>(process.milestones);
            Collections.sort(milestones);
            return Response.ok(milestones).build();
        }
        catch (BadRequestException exce) {
            return Response.ok("Aucun process correspondant " + candidate.email ).status(404).build();
        }
    }

    @POST
    @Path("/increment")
    @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("collaborator")
    @Transactional
    public Response incrementProcess(Users candidate) {
        Entreprise e = Entreprise.findById("Breadcrumbs");

        interview_process process = interview_process.findProcess(candidate, e);
        process.incrementCurrentMilestone();
        process.persist();
        List<interview_milestones> milestones = new ArrayList<>(process.milestones);
        Collections.sort(milestones);
        return Response.ok(milestones).build();

    }
}
