package apicore.entit.milestone;

import apicore.entit.milestone.availability.Appointment;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class interview_milestones extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_milestone;

    public String interview_processes;

    @ManyToOne
    public interview_type type;

    @OneToMany(mappedBy = "milestone")
    public List<Appointment> appointment;

    public String interview_type;

    public String milestone_name;
    public String status;

}
