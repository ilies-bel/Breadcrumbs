package apicore.resources.milestoneRessource;

import apicore.entit.milestone.interview_milestones;
import apicore.entit.milestone.interview_process;
import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.ws.rs.*;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Path("/milestone")
public class interview_milestoneResource {

    @GET
    public List<interview_milestones> getAll() {
        interview_process process = interview_process.findById(1);
        Collections.sort(process.milestones);
        return process.milestones;
    }
}
