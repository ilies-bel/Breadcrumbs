package apicore.entit.milestone;

import apicore.entit.company.Entreprise;
import apicore.entit.user.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Cache;
import javax.persistence.*;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;

import java.util.*;

@Entity
public class interview_process extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_process;

    @ManyToOne @Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
    public Users candidate;
    @ManyToOne @Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
    public Entreprise entreprise;
    @ManyToMany(cascade = CascadeType.ALL)
    public Set<interview_milestones> milestones = new TreeSet<>();

    public interview_process() {}
    public interview_process(Entreprise e, Users candidates, interview_milestones milestone) {
        this.entreprise = e;
        this.candidate = candidates;
        this.milestones.add(milestone);
    }

    /**
     * Constructeur qui crée un process à partir des milestones qui le composent.
     * Un process lie une entreprise à un utilisateur.
     * @param e
     * @param candidates
     * @param milestones Milestones préalablements ordonnées
     */
    public interview_process(Entreprise e, Users candidates, List<interview_milestones> milestones) {
        this.entreprise = e;
        this.candidate = candidates;
        List<interview_milestones> m = new ArrayList<>();
        m.addAll(milestones);
        Collections.sort(m);
        if(!milestones.isEmpty()) {
            this.milestones.addAll(milestones);
        }
        ListIterator<interview_milestones> iterator = milestones.listIterator();
        while (iterator.hasNext() ) {
            try {
                iterator.next();
                milestones.get(iterator.nextIndex()-1).setNext(milestones.get(iterator.nextIndex()));
            }
            catch (IndexOutOfBoundsException ioobe) {
                System.out.println("index : " + iterator.nextIndex());
            }
        }
    }
    public interview_process(Entreprise e, Users candidates) {
        this(e, candidates, new ArrayList<>());
    }

    @JsonIgnore
    public interview_milestones getCurrentMilestone() {
        Iterator<interview_milestones> iterator = milestones.iterator();
        interview_milestones res = new interview_milestones();
        while ( iterator.hasNext() && (res.status!= interview_milestones.STATUS.IN_PROGRESS && res.status!= interview_milestones.STATUS.ON_APPROVAL ) ) {
            res = iterator.next();
        }
        return res;
    }
    @Transactional
    public void incrementCurrentMilestone() {
        interview_milestones current = this.getCurrentMilestone();
        current.incrementStatus();
        if(current.next != null) {
            if(current.status!= interview_milestones.STATUS.ON_APPROVAL) {
                current.next.incrementStatus();
            }
        }
    }

    /**
     *
     * @return Les milestones du process sous form de ArrayList triée
     */
    public List<interview_milestones> getAllMilestones() {
        ArrayList<interview_milestones> milestones = new ArrayList<>(this.milestones);
        Collections.sort(milestones);
        return milestones;
    }

    /**
     * Vérifie si tous les milestone ont le statut COMPLETED. Le process sera alors considéré comme terminé.
     * @return <em>true</em> si tous les milestones sont COMPLETED.
     */
    public boolean isOver() {
        Iterator<interview_milestones> iterator = milestones.iterator();
        boolean isOver = true;
        while (iterator.hasNext()) {
            isOver = isOver && iterator.next().status == interview_milestones.STATUS.COMPLETED;
        }
        return isOver;
    }

    /**
     * Trouve le process qui lie le candidat à l'entreprise.
     * @return Une entité <em>interview_process</em>
     */
    public static interview_process findProcess(Users candidate, Entreprise entreprise) {
        PanacheQuery<interview_process> query = interview_process.find("candidate = ?1 AND entreprise = ?2", candidate, entreprise);
        if(query.count() == 1) {
            return query.firstResult();
        }
        else {
            throw new BadRequestException("findProcess : there must be only one result, but there are "+query.count()+" results");
        }
    }
}
