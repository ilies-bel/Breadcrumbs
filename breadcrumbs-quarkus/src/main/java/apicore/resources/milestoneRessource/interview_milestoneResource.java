package apicore.resources.milestoneRessource;

import apicore.entit.milestone.interview_milestones;
import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.ws.rs.*;
import java.io.IOException;
import java.util.List;

@Path("/milestone")
public class interview_milestoneResource {

    @GET
    public List<PanacheEntityBase> getAll() {
        return interview_milestones.listAll();
    }
}
