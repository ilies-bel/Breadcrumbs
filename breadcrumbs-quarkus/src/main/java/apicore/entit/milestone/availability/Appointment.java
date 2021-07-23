package apicore.entit.milestone.availability;

import apicore.entit.user.Users;
import apicore.entit.milestone.interview_milestones;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Appointment extends availability {
    public Appointment() {}
    public Appointment(String startTime, String endTime, Users candidate, Users interlocutor, String title, String type) {
        super(startTime, endTime, title, interlocutor);
        this.status = STATUS;
        this.candidate = candidate;
        this.interview_type = type;
    }
    public Appointment(String startTime, String endTime, Users candidate, String email, String title, String type) {
        super(startTime, endTime, title, candidate);
        Users interlocutor = Users.findByEmail(email);
        this.interlocutor = interlocutor;
        this.status = STATUS;
        this.candidate = candidate;
        this.interview_type = type;
    }
    public Appointment(availability a)
    {
        super(a.startDate, a.endDate, a.title);
        this.interlocutor = a.getInterlocutor();
        this.status = STATUS;
    }

    private static final String STATUS = "Appointment";

    @ManyToOne
    public Users candidate;

    @ManyToOne
    public interview_milestones milestone;

    public String candidate_email;
    public String interview_type;

    public static void add(String startTime, String endTime, String title, Users user, Users interlocutor, String type) {
        Appointment a = new Appointment(startTime, endTime, user, interlocutor, title, type);
        a.persist();
    }
    public static void addFromAvailability(availability a, Users candidate, Users interlocutor) {
        Appointment appointment = new Appointment(a.startDate, a.endDate, candidate, interlocutor, "email", "type");
        appointment.persist();
    }
    public static void addFromAppointment(Appointment a, Users user) {
        Appointment appointment = new Appointment(a.startDate, a.endDate, user, a.interlocutor, a.candidate_email, a.interview_type);
        appointment.persist();
    }
}
