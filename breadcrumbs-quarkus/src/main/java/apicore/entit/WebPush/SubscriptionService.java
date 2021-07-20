package apicore.entit.WebPush;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class SubscriptionService extends PanacheEntityBase {
    @Id
    public String endpointURL;

    @ManyToOne
    public VapidKey vapidKey;
}
