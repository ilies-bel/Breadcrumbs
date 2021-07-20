package apicore.entit.WebPush;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class VapidKey extends PanacheEntityBase {
    @Id
    public Integer id_vapid;
    @JsonAlias("p256dh")
    public String publicVapidKey;
    public String auth;

    @OneToMany(mappedBy = "vapedKey")
    public List<SubscriptionService> subscription;
}
