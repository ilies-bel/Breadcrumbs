package resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/tit")
public class titleRessource {
    @GET
    @Produces(MediaType.TEXT_HTML)
    public String nkfkf() {
        return "<h1 style='color: royalblue; font-family: Roboto'>Breadcrumbs</h1></br><p style='color: royablue'>This an API endpoint</p>";
    }
}
