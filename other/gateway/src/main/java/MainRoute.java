import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.vertx.web.*;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class MainRoute {
    @Route(path="/route", methods = Route.HttpMethod.GET)
    public void noll(RoutingContext rc) {
        rc.response().end("deeedeeddedd");
    }

    @Route(path = "/ro2", methods = Route.HttpMethod.POST, produces = MediaType.APPLICATION_JSON)
    public Multi<JsonObject> noll2(RoutingContext rc) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(rc.request().getHeader("Content-Type"));System.out.println("dkkdkdkd");
        return Uni.createFrom().item(rc.getBodyAsJson()).toMulti();
    }
}
