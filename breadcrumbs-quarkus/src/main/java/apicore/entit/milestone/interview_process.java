package apicore.entit.milestone;

import apicore.entit.company.Entreprise;
import apicore.entit.user.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.*;

@Entity
public class interview_process extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_process;

    public int currentMilestoneIndex;

    @ManyToOne
    public Users candidate;
    @ManyToOne
    public Entreprise entreprise;
    @ManyToMany(cascade = CascadeType.ALL)
    public List<interview_milestones> milestones = new LinkedList<>();

    public interview_process() {}
    public interview_process(Entreprise e, Users candidates, interview_milestones milestone) {
        this.entreprise = e;
        this.candidate = candidates;
        this.milestones.add(milestone);
        this.currentMilestoneIndex=0;
    }
    public interview_process(Entreprise e, Users candidates, List<interview_milestones> milestones) {
        this.entreprise = e;
        this.candidate = candidates;
        Collections.sort(milestones);
        if(!milestones.isEmpty()) {
            this.milestones.addAll(milestones);
        }
        ListIterator<interview_milestones> iterator = milestones.listIterator();
        while (iterator.hasNext() && iterator.next().status!= interview_milestones.STATUS.IN_PROGRESS) {
            this.currentMilestoneIndex = iterator.next().index;
        }
    }
    public interview_process(Entreprise e, Users candidates) {
        this(e, candidates, new ArrayList<>());
    }

    @JsonIgnore
    public interview_milestones getCurrentMilestone() {
        return milestones.get(currentMilestoneIndex);
    }
    @Transactional
    public void incrementCurrentMilestone() {
        ListIterator<interview_milestones> iterator;
        interview_milestones currentMilestone = this.getCurrentMilestone();
        currentMilestone.incrementStatus(); currentMilestone.persist();
        this.currentMilestoneIndex = this.currentMilestoneIndex+1;
        currentMilestone = this.getCurrentMilestone();
        currentMilestone.incrementStatus(); currentMilestone.persist();
        Collections.sort(this.milestones);
    }

    public static interview_process getProcess(Users candidate, Entreprise entreprise) {
        interview_process p1 = interview_process.find("candidate = ?1 AND  entreprise = ?2", candidate, entreprise).firstResult();
        return p1;
    }
}
