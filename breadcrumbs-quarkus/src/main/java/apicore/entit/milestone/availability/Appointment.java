package apicore.entit.milestone.availability;

import apicore.entit.user.Users;
import apicore.entit.milestone.interview_milestones;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.Objects;

@Entity
public class Appointment extends availability {
    private static final String SLOT_TYPE = "Appointment";

    public String candidate_email;

    @ManyToOne(cascade = CascadeType.ALL)
    public Users candidate;

    @ManyToOne
    private interview_milestones milestone;


    public Appointment() {}
    private Appointment(String startTime, String endTime, String interlocutor_email, Users candidate) {
        super(startTime, endTime, interlocutor_email);
        this.candidate = candidate;
        this.candidate_email = Objects.requireNonNullElseGet(candidate.email, () -> "appointment_se_nobody@empty.com");
        this.type = SLOT_TYPE;
    }
    private Appointment(String startTime, String endTime, Users interlocutor, Users candidate) {
        super(startTime, endTime, interlocutor);
        this.candidate = candidate;
        this.candidate_email = Objects.requireNonNullElseGet(candidate.email, () -> "appointment_second_nobody@empty.com");
    }
    private Appointment(availability a, Users candidate)
    {
        super(a.startDate, a.endDate, a.interlocutor);
        this.type = SLOT_TYPE;
        this.candidate = candidate;
    }
    private Appointment(availability a, String email_interlocutor, Users candidate)
    {
        super(a.startDate, a.endDate, email_interlocutor);
        this.type = SLOT_TYPE;
        this.candidate = candidate;
    }

    public Appointment(String startTime, String endTime, Users interlocutor, Users candidate, interview_milestones milestone) {
        this(startTime, endTime, interlocutor, candidate);
        this.milestone = milestone;
    }
    public Appointment(String startTime, String endTime, String email_interlocutor, Users candidate, interview_milestones milestone) {
        this(startTime, endTime, email_interlocutor, candidate);
        this.milestone = milestone;
    }
    public Appointment(availability a, Users candidate, interview_milestones milestone)
    {
        this(a, candidate);
        this.milestone = milestone;
    }

    public static void add(String startTime, String endTime, Users interlocutor, Users user, interview_milestones milestone) {
        Appointment a = new Appointment(startTime, endTime, interlocutor, user, milestone);
        a.persist();
    }
    @Transactional
    public static void addFromAvailability(availability a, Users candidate, interview_milestones milestone) {
        Appointment appointment = new Appointment(a, candidate, milestone);
        appointment.persist();
    }
    @Transactional
    public static void addFromAvailability(availability a, String email_interlocutor, Users candidate, interview_milestones milestone) {
        Appointment appointment = new Appointment(a, email_interlocutor, candidate);
        appointment.milestone = milestone;
        appointment.persist();
    }
    @Transactional
    public static void addFromAvailability(availability a, String email_candidate, interview_milestones milestone) {
        Users storedCandidate = Users.findByEmail(email_candidate);
        Appointment appointment = new Appointment(a, storedCandidate, milestone);
        appointment.persist();
    }
    @Transactional
    public static void addFromAppointment(Appointment a, Users user, interview_milestones milestone) {
        milestone.persist();
        Appointment appointment = new Appointment(a.startDate, a.endDate, user, a.interlocutor, milestone);
        appointment.persist();
    }
}
