package apicore.entit.milestone.availability;

import apicore.entit.user.Users;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity
public class availability extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) @JsonProperty("id") @JsonAlias("id")
    public Long id_slot;

    private static final String SLOT_TYPE = "Availability";

    public String startDate;
    public String endDate;

    @JsonAlias({"email", "email_interlocutor"})
    public String interlocutor_email;

    @JsonAlias({"type", "typeSlot"})
    public String type;

    @ManyToOne
    public Users interlocutor;

    public availability() {}

    /** Construire une availability à partir d'un objet Users */
    public availability(String startTime, String endTime, Users collaborator) {
        this(startTime, endTime);
        this.interlocutor = Objects.requireNonNull(collaborator, "No interlocutor provided.");;
        this.interlocutor_email = Objects.requireNonNullElseGet(collaborator.email, () -> "availability_constructor_nobody@empty.fr");
    }
    /** Construire une availability à partir de l'adresse email d'un collaborateur */
    public availability(String startTime, String endTime, String email) {
        this(startTime, endTime);
        Users interlocutor = Users.findByEmail(email);
        this.interlocutor = Objects.requireNonNull(interlocutor, "No users found with this email address.");
        this.interlocutor_email = email;
    }
    protected availability(String startTime, String endTime) {
        this.startDate = startTime;
        this.endDate = endTime;
        this.type = SLOT_TYPE;
    }

    /** Retourne toutes les availability
     * On filtre par SLOT_TYPE pour ne pas retourner les appointments
     * */
    public static List<availability> getAll() {
        return availability.list("type", SLOT_TYPE);
    }
    /** Ajoute une availability dans la table de la base de données */
    public static void add(String startTime, String endTime, Users user) {
        availability a = new availability(startTime, endTime, user);
        a.persist();
    }
    public static void add(String startTime, String endTime, String email) {
        availability a = new availability(startTime, endTime, email);
        a.persist();
    }
    /**
     * Ajoute plusieurs avalabilities dans la table.
     *  Cette méthode n'est pas imdempotente */
    public static void addList(List<availability> availabilityList) {
        for(availability a : availabilityList) {
            a.persist();
        }
    }
    /**
     * Met à jour la table des availability avec les valeurs contenues dans la list passé en paramètre.
     * Cette méthode est idempotente mais n'est pas du tout optimale */
    //TODO: Trouver une manière optimale de mettre à jour la table
    public static void updateAvalabilities(List<availability> availabilityList) {
        availability.deleteAll();
        availability.addList(availabilityList);
    }
}
