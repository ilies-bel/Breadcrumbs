package milestone;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;

@Entity
public class interview_milestones extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_milestone;

    public String interview_processes;

    @ManyToOne
    private interview_type types = new interview_type();

    public String interview_type = types.title;

    public String milestone_name;

}
