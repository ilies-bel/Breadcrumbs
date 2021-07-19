package apicore.entit.milestone.availability;

import apicore.entit.user.Users;
import apicore.entit.milestone.interview_milestones;

import javax.persistence.*;

@Entity
public class Appointment extends availability {
    public Appointment() {}
    public Appointment(String startTime, String endTime, Users email, String title, String type) {
        super(startTime, endTime, title);
        this.status = "Appointment";
        this.candidate = email;
        this.interview_type = type;
    }

    @ManyToOne
    public Users candidate;

    @ManyToOne
    public interview_milestones milestone;

    public String interviewer_email;
    public String candidate_email;
    public String interview_type;

    public static void add(String startTime, String endTime, String title, Users user, String type) {
        Appointment a = new Appointment(startTime, endTime, user, title, type);
        a.persist();
    }
    public static void addFromAvailability(availability a, Users user) {
        Appointment appointment = new Appointment(a.startDate, a.endDate, user, "email", "type");
        appointment.persist();
    }
    public static void addFromAppointment(Appointment a, Users user) {
        Appointment appointment = new Appointment(a.startDate, a.endDate, user, a.candidate_email, a.interview_type);
        appointment.persist();
    }
}
