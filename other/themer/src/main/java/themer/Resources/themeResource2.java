package themer.Resources;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import io.quarkus.panache.common.Sort;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import themer.ThemeResponse;
import themer.Themer;
import themer.layouts.Layout;
import themer.layouts.buttons;
import themer.layouts.header;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.Duration;
import java.util.List;

@ApplicationScoped
@Path("/themer")
public class themeResource2 {
    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<PanacheEntityBase> getThemer() {
        Themer themer = new Themer("white", "grren", 12, "bold");

        return Panache.withTransaction(themer::persist).toMulti().onItem().invoke(t -> Panache.withTransaction(t::delete) );
    }

    @GET
    @Path("/1")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<List<PanacheEntityBase>> getTheme() {
        Themer themer = new Themer("white", "blue", 20, "bold");

        Uni<List<PanacheEntityBase>> theme = Themer.listAll();
        return Panache.withTransaction(themer::persist).onItem()
                .transformToMulti(inserted -> theme.toMulti() ) ;
    }

    @GET
    @Path("/2")
    public Uni<List<PanacheEntityBase>> getTheme2() {
        Uni<List<PanacheEntityBase>> theme = ThemeResponse.listAll(Sort.by("timestamp").descending());
        return theme;
    }

    @POST
    @Path("/")
    public Multi<PanacheEntityBase> postTheme(Themer theme) {
        ThemeResponse tr = new ThemeResponse();
        header he = new header();
        he.theme = theme;
        tr.header = he;

        Multi<PanacheEntityBase> operation = Panache.withTransaction(tr::persist).toMulti().onItem().call(t ->
                Panache.withTransaction(t::delete)) ;
        Panache.withTransaction(tr::delete);
        return operation ;
    }

    @POST
    @Path("/2")
    public Multi<ThemeResponse> postTheme2(Layout layout) {
        ThemeResponse tr = new ThemeResponse();
        System.out.println(layout.getClass());

        return Multi.createFrom().item(tr).onItem().call(item -> Panache.withTransaction(tr::persist));
    }
    @POST
    @Path("/employerToCandidate")
    public Multi<ThemeResponse> postTheme(ThemeResponse theme) {
        return Multi.createFrom().item(theme).onItem().call(item -> Panache.withTransaction(theme::persist));
    }
    @GET
    @Path("/candidateWant")
    @Blocking
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<List<PanacheEntityBase>> getThemeCandidate() {
        Multi<List<PanacheEntityBase>> theme = ThemeResponse.listAll(Sort.by("timestamp").descending()).toMulti();
        return theme
                .onItem().call(i ->
                        // Delay the emission until the returned uni emits its item
                        Uni.createFrom().nullItem().onItem().delayIt().by(Duration.ofSeconds(60)))
                .onFailure().invoke(e -> System.out.println( "Erreur inconnu : "+e))
                .onCompletion().invoke(theme::onCompletion);
    }

}
