package apicore.entit.milestone;

import apicore.entit.company.Entreprise;
import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

@Entity
public class interview_process extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_process;

    public Integer currentMilestoneIndex;

    @ManyToOne
    public Users candidate;
    @ManyToOne
    public Entreprise entreprise;
    @ManyToMany
    public List<interview_milestones> milestones;

    public interview_process() {}
    public interview_process(Entreprise e, Users candidates, ArrayList<interview_milestones> milestones) {
        this.entreprise = e;
        this.candidate = candidates;
        this.milestones = milestones;
    }
    public interview_process(Entreprise e, Users candidates) {
        this(e, candidates, new ArrayList<>());
    }


    public interview_milestones getCurrentMilestone() {
        return milestones.get(currentMilestoneIndex);
    }
    public void IncrementCurrentMilestone() {
        ListIterator<interview_milestones> iterator;
        interview_milestones currentMilestone = this.getCurrentMilestone();
        milestones.get(currentMilestoneIndex).status = interview_milestones.STATUS.COMPLETED;
        currentMilestoneIndex ++;
        milestones.get(currentMilestoneIndex).status = interview_milestones.STATUS.IN_PROGRESS;
    }

    public static interview_process getProcess(Users candidate, Entreprise entreprise) {
        interview_process p1 = interview_process.find("candidate = ?1 AND  interlocutor = ?2", candidate, entreprise).firstResult();
        return p1;
    }
}
