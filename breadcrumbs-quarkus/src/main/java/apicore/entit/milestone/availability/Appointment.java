package apicore.entit.milestone.availability;

import apicore.entit.user.Users;
import apicore.entit.milestone.interview_milestones;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
public class Appointment extends availability {
    private static final String SLOT_TYPE = "Appointment";

    public String candidate_email;

    @ManyToOne
    public Users candidate;

    @ManyToOne
    private interview_milestones milestone;


    public Appointment() {}
    private Appointment(OffsetDateTime startTime, OffsetDateTime endTime, String interlocutor_email, Users candidate) {
        super(startTime, endTime, interlocutor_email);
        this.candidate = candidate;
        this.candidate_email = Objects.requireNonNullElseGet(candidate.email, () -> "appointment_se_nobody@empty.com");
        this.type = SLOT_TYPE;
    }
    private Appointment(OffsetDateTime startTime, OffsetDateTime endTime, Users interlocutor, Users candidate) {
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

    public Appointment(OffsetDateTime startTime, OffsetDateTime endTime, Users interlocutor, Users candidate, interview_milestones milestone) {
        this(startTime, endTime, interlocutor, candidate);
        this.milestone = milestone;
    }
    public Appointment(OffsetDateTime startTime, OffsetDateTime endTime, String email_interlocutor, Users candidate, interview_milestones milestone) {
        this(startTime, endTime, email_interlocutor, candidate);
        this.milestone = milestone;
    }
    public Appointment(availability a, Users candidate, interview_milestones milestone)
    {
        this(a, candidate);
        this.milestone = milestone;
    }

    public static void add(OffsetDateTime startTime, OffsetDateTime endTime, Users interlocutor, Users user, interview_milestones milestone) {
        Appointment a = new Appointment(startTime, endTime, interlocutor, user, milestone);
        a.persist();
    }

    /**
     * Ajoute un appointment dans la table à partir d'une disponibilité et d'un candidate.<br/>
     * Lorsque le rendez-vous est enregistré, la disponibilité correspondante est supprimée de la base de donnée
     * @param a disponibilité
     * @param candidate
     * @param milestone
     */
    @Transactional
    public static void addFromAvailability(availability a, Users candidate, interview_milestones milestone) {
        Appointment appointment = new Appointment(a, candidate, milestone);
        appointment.persist();
        // Maintenant que le rendez-vous a été pris on supprime la disponibilité qui correspondait
        availability.find("startDate = ?1 AND endDate =?2", a.startDate, a.endDate).firstResult().delete();
    }

    /**
     *  Ajoute un appointment dans la table à partir d'une disponibilité.<br/>
     *  Lorsque le rendez-vous est enregistré, la disponibilité correspondante est supprimée de la base de donnée
     * @param a
     * @param email_interlocutor adresse email de l'interlocuteur
     * @param candidate
     * @param milestone
     */
    @Transactional
    public static void addFromAvailability(availability a, String email_interlocutor, Users candidate, interview_milestones milestone) {
        Appointment appointment = new Appointment(a, email_interlocutor, candidate);
        appointment.milestone = milestone;
        appointment.persist();
        // Maintenant que le rendez-vous a été pris on supprime la disponibilité qui correspondait
        availability.find("startDate = ?1 AND endDate =?2", a.startDate, a.endDate).firstResult().delete();
    }
    @Transactional
    public static void addFromAvailability(availability a, String email_candidate, interview_milestones milestone) {
        Users storedCandidate = Users.findByEmail(email_candidate);
        Appointment appointment = new Appointment(a, storedCandidate, milestone);
        appointment.persist();
        // Maintenant que le rendez-vous a été pris on supprime la disponibilité qui correspondait
        availability.find("startDate = ?1 AND endDate =?2", a.startDate, a.endDate).firstResult().delete();
    }
    @Transactional
    public static void addFromAppointment(Appointment a, Users user, interview_milestones milestone) {
        milestone.persist();
        Appointment appointment = new Appointment(a.startDate, a.endDate, user, a.interlocutor, milestone);
        appointment.persist();
    }

    /**
     * Annule un rendez-vous et crée une disponibilité avec les même horaires.<br/>
     * La disponibilité créé est ajouté en base de données
     * @param user L'utilisateur concerné par le rendez-vous. <br/>Il doit avoir le role de <em>candidate</em> ou <em>collaborator</em>
     */
    @Transactional
    public void cancel(Users user) {
        String user_role = null;
        if(user.role.equals("candidate")) {
            user_role="candidate";
        }
        else if(user.role.equals("collaborator")) {
            user_role="interlocutor";
            user = this.interlocutor;
        }
        else {
            throw new BadRequestException("L'utilisateur doit avoir le role de <em>candidate</em> ou <em>collaborator</em>");
        }
        Appointment a = Appointment.find("startDate=?1 AND endDate=?2 AND "+user_role+"=?3", this.startDate, this.endDate, user).firstResult();

        availability availabe = new availability(a.startDate, a.endDate, a.interlocutor, a.location);

        availabe.persist();
        a.delete();
    }

    /**
     * Méthode à appeler pour signifier la fin d'un rendez-vous qui a déjà eu lieu.<br/>
     * Cette méthode supprimme l'appointment de la base de données
     */
    @Transactional
    public void end() {
        Appointment a = Appointment.find("startDate=?1 AND endDate=?2 AND interlocutor=?3", this.startDate, this.endDate, interlocutor).firstResult();
        a.delete();
    }
}
