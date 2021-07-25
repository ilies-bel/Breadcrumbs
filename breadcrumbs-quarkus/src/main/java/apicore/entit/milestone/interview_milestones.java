package apicore.entit.milestone;

import apicore.entit.milestone.availability.Appointment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class interview_milestones extends PanacheEntityBase {
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
    @OneToMany
    private List<Appointment> appointment;

    public String milestone_name;

    @JsonIgnore
    public STATUS status;
    @JsonProperty("status")
    public String statusStr;

    public String getTypeTitle() {
        return type.title;
    }

}
