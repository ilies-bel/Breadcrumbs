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
        PENDING("pending"), IN_PROGRESS("inProgress"), INCOMING, COMPLETED("completed");
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

    public String milestone_name;
    public Integer index;

    public STATUS status;

    public String getTypeTitle() {
        return Objects.requireNonNullElseGet(type.title, () -> "No title");
    }

    public interview_milestones() {}
    public interview_milestones(interview_type type, Integer index, STATUS status, String milestone_name) {
        this.type = type;
        this.index = index;
        this.milestone_name = milestone_name;
        this.status= status;
    }
    public interview_milestones(interview_type type, Integer index, String milestone_name) {
        this.type = type;
        this.index = index;
        this.milestone_name = milestone_name;
        if(this.index == 0) {
            this.status=STATUS.IN_PROGRESS;
        }
        else {
            this.status=STATUS.PENDING;
        }
    }
    @Override
    public int compareTo(interview_milestones m) {
        return index.compareTo(m.index);
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
                this.setStatus(STATUS.COMPLETED);
            case INCOMING:
                this.setStatus(STATUS.COMPLETED);
                break;
            case COMPLETED:
                this.setStatus(STATUS.COMPLETED);
                break;
        }
    }
}
