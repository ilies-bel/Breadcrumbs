package milestone;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class interview_type extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id_interview_type;

    public String title;
    public String description;
    public Integer time_length;
    public String field;

    public static void setTime_length(int new_time) {
        interview_type type = new interview_type();
        type.time_length = new_time;
    }
}
