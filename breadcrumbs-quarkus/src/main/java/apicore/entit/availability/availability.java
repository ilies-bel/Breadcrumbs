package apicore.entit.availability;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class availability extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_availability;
    public String startDate;
    public String endDate;
    public String title;

    public static void add(String startTime, String endTime, String title) {
        availability a = new availability();
        a.startDate = startTime;
        a.endDate = endTime;
        a.title = title;
        a.persist();
    }
    public static void add(String startTime, String endTime) {
        availability.add(startTime, endTime, "Avalability");
    }
}
