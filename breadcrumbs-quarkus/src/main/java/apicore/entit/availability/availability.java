package apicore.entit.availability;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class availability extends PanacheEntity {
    private Date startTime;
    private Date endTime;

    public availability() {}
    public availability(Date start, Date end) {}
}
