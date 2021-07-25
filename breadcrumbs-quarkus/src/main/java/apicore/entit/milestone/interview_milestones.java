package apicore.entit.milestone;

import apicore.entit.milestone.availability.Appointment;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class interview_milestones extends PanacheEntityBase {
    public enum STATUS { PENDING, IN_PROGRESS, INCOMING, COMPLETED }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_milestone;

    @ManyToOne
    public interview_type type;
    @OneToMany
    private List<Appointment> appointment;

    public String milestone_name;
    public STATUS status;

    public String getTypeTitle() {
        return type.title;
    }

}
