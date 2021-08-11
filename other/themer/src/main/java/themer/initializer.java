package themer;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.annotations.QuarkusMain;
import themer.layouts.buttons;
import themer.layouts.header;

import javax.enterprise.event.Observes;
import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@QuarkusMain
public class initializer {
    public static void main(String ...args) {
        System.out.println("Running main method");
        Quarkus.run(args);
    }

    @Transactional
    public void seedAll(@Observes StartupEvent ev) throws InvalidKeySpecException, NoSuchAlgorithmException {
        // Les méthodes de seed appelées ci-dessous doivent être exécuter dans l'ordre
        seedTheme();
    }

    @Transactional
    public void seedTheme() {
        Themer the1 = new Themer("white", "blue", 20, "bold");
        Themer theme2 = new Themer("white", "blue", 20, "medium");

        Panache.withTransaction(the1::persist).onItem().transform(inserted -> the1) ;
        Panache.<Themer>withTransaction(theme2::persist).onItem().transform(inserted -> theme2);

        buttons buuton = new buttons(); buuton.theme = the1;
        Panache.withTransaction(buuton::persist);
        header header = new header(); header.theme = theme2;
        Panache.withTransaction(header::persist);
    }
}
