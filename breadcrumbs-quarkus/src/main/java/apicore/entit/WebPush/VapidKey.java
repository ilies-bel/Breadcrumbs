package apicore.entit.WebPush;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class VapidKey extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id_vapid;
    @JsonAlias({"p256dh", "ps256"})
    public String publicVapidKey;
    public String auth;

}
