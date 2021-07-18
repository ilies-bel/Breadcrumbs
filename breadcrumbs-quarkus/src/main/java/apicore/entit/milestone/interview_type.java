package apicore.entit.milestone;

import apicore.entit.Appointment;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

import javax.persistence.*;
import java.util.List;

@Entity
public class interview_type extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id_interview_type;

    public String title;
    public String description;
    public Integer time_length;
    public String field;

    @OneToMany(mappedBy = "type")
    private List<interview_milestones> milestones;

    public static void setTime_length(int new_time) {
        interview_type type = new interview_type();
        type.time_length = new_time;
    }
}
