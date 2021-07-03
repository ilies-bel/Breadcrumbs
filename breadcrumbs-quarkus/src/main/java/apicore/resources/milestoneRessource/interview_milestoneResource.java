package apicore.resources.milestoneRessource;

import apicore.entit.milestone.interview_milestones;
import apicore.entit.user.GenerateToken;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.io.IOException;
import java.util.List;

@Path("/milestone")
public class interview_milestoneResource {
    private static void generate() throws IOException {
        GenerateToken.generate();
    }

    @GET
    public List<PanacheEntityBase> getAll() throws IOException {
        generate();
        return interview_milestones.listAll();
    }
}
