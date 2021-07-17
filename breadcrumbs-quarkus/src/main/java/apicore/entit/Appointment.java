package apicore.entit;

import apicore.entit.availability.availability;
import apicore.entit.user.Users;
import apicore.entit.milestone.interview_type;
import apicore.entit.milestone.interview_milestones;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;

@Entity
public class Appointment extends availability {
    public Appointment() {}
    public Appointment(String startTime, String endTime, String email, String title, String type) {
        super(startTime, endTime, title);
        this.interviewer_email = email;
        this.interview_type = type;
    }

    @ManyToOne
    public Users interviewer;

    @ManyToOne
    public interview_milestones milestone;

    public String interviewer_email;
    public String interview_type;

    public static void add(String startTime, String endTime, String title, String email, String type) {
        Appointment a = new Appointment(startTime, endTime, email, title, type);
        a.persist();
    }
    public static void add(availability a) {
        Appointment appointment = new Appointment(a.startDate, a.endDate, a.title, "email", "type");
        appointment.persist();
    }
}
