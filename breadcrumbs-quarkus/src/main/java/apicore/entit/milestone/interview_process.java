package apicore.entit.milestone;

import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class interview_process extends PanacheEntityBase {
    @Id
    public Integer id_process;

    @ManyToOne
    public Users candidates;

    @ManyToMany
    public List<interview_milestones> milestones;
}
