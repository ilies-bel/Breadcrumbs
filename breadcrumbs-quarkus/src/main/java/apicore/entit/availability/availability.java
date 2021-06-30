package apicore.entit.availability;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class availability extends PanacheEntity {
    public Date startTime;
    public Date endTime;

}
