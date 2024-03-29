package apicore.entit.milestone;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class interview_type extends PanacheEntityBase {
    public interview_type() {}
    public interview_type(String title, String description) {
        this.title = title;
        this.description = description;
    }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_interview_type;

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
