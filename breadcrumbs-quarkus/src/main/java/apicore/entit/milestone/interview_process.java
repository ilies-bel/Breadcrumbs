package apicore.entit.milestone;

import apicore.entit.Entreprise;
import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class interview_process extends PanacheEntityBase {
    public interview_process() {}
    public interview_process(Entreprise e, Users candidates, ArrayList<interview_milestones> milestones) {
        this.entreprise = e;
        this.candidate = candidates;
        this.milestones = milestones;
    }
    public interview_process(Entreprise e, Users candidates) {
        this(e, candidates, new ArrayList<>());
    }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_process;

    @ManyToOne
    public Users candidate;
    @ManyToOne
    public Entreprise entreprise;

    @ManyToMany
    public List<interview_milestones> milestones;
}
