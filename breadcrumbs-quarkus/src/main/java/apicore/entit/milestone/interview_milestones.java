package apicore.entit.milestone;

import apicore.entit.milestone.availability.Appointment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.util.List;
import java.util.Objects;

@Entity
public class interview_milestones extends PanacheEntityBase implements Comparable<interview_milestones> {
    public enum STATUS {
        /**
         * <strong>pending</strong> : Le milestone n'a pas commencé</li>
         */
        PENDING("pending"),
        /**
         * <h3>In propgress</h3>
         * Le milestone est en cours. Le candidat peut choisir ces parmi les disponibilités.</br>
         *      Le premier milestone d'un process nouvellement initialisé doit être en pending
         */
        IN_PROGRESS("inProgress"),
        /**
         * Le candidat attend la réponse du recruteur pour passer à la suite.
         * <li>L'état qui suit est COMPLETED</li>
         * <li>L'état qui précède est IN_PROGRESS</li>
         */
        ON_APPROVAL,
        COMPLETED("completed");
        STATUS() {}
        STATUS(String val) {
            value=val;
        }
        public String toStsing() {
            return value;
        }
        private String value;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id_milestone;

    @ManyToOne
    public interview_type type;
    @ManyToOne
    public interview_milestones next;

    public String milestone_name;

    public STATUS status;

    public String getTypeTitle() {
        return Objects.requireNonNullElseGet(type.title, () -> "No title");
    }

    public interview_milestones() {}
    public interview_milestones(interview_type type, STATUS status, String milestone_name) {
        this.type = type;
        this.milestone_name = milestone_name;
        this.status= status;
    }
    public interview_milestones(interview_type type, String milestone_name) {
        this.type = type;
        this.milestone_name = milestone_name;
        this.status=STATUS.PENDING;
    }
    public boolean containsAmongNexts(interview_milestones maybeInNext) {
        interview_milestones current = this;
        if(current.next == null) {
            return false;
        }
        else if(current.next.id_milestone.equals(maybeInNext.id_milestone)) {
            return true;
        }
        else {
            return current.next.containsAmongNexts(maybeInNext);
        }
    }
    @Override
    public int compareTo(interview_milestones m) {
        try {
            if(this.id_milestone.equals(m.id_milestone)) {
                return 0;
            }
            else if(this.containsAmongNexts(m)) {
                return -1;
            }
            else {
                return 1;
            }
        }
        catch (IndexOutOfBoundsException e) {
            throw new BadRequestException("It's a sad error");
        }
    }

    public void setStatus(STATUS newStatus) {
        this.status = newStatus;
    }

    public void incrementStatus() {
        switch (this.status) {
            case PENDING:
                this.setStatus(STATUS.IN_PROGRESS);
                break;
            case IN_PROGRESS:
                this.setStatus(STATUS.ON_APPROVAL);
                break;
            case ON_APPROVAL:
                this.setStatus(STATUS.COMPLETED);
                break;
            case COMPLETED:
                this.setStatus(STATUS.COMPLETED);
                break;
        }
    }

    public void setNext(interview_milestones milestone) {
        this.next = milestone;
    }
}
