package resources.milestoneRessource;


import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import milestone.interview_milestones;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.io.IOException;
import java.util.List;

@Path("/milestone")
public class interview_milestoneResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<PanacheEntityBase> getAll(@Context SecurityContext ctx) throws IOException {

        return interview_milestones.listAll();
    }
}
