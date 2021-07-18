package apicore.errorPage;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.quarkus.qute.TemplateInstance;
import io.quarkus.qute.Template;
import io.quarkus.qute.CheckedTemplate;

@Path("/error")
public class ErrorPage {
    @CheckedTemplate
    public static class Templates {
        public static native TemplateInstance erro();
    }

    @Path("/{status}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public TemplateInstance get(@PathParam("status") int status) {
        return Templates.erro().data("status", status);
    }
}
