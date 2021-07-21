package apicore.entit.WebPush;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Map;

@Entity
public class SubscriptionService extends PanacheEntityBase {
    @Id
    public String endpoint;


    @ManyToOne @JsonAlias("keys")
    public VapidKey keys;

    @ManyToOne
    public Users subscriber;

    public void add() {
        //Il est préférable insérer keys avant subscription
        //Si on insère subscription avant keys, le résultat ser le même mais une troisième requête sera effectué pour lier subscription à la key correspondante
        this.keys.persist();
        this.persist();
    }
    public void update(VapidKey key) {
        this.keys.delete();
        this.keys = key;
        this.keys.persist();
        this.persist();
    }
    public void supprime() {
        this.keys.delete();
        this.delete();
    }
}
