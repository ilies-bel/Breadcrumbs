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
}
