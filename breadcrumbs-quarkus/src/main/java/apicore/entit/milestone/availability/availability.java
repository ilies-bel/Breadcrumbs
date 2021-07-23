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
    public Integer id_slot;

    private static final String STATUS = "Availability";

    public String startDate;
    public String endDate;
    @JsonAlias("title")
    public String title;
    public String interlocutor_email;

    @JsonAlias({"type", "typeSlot"})
    public String status;

    @ManyToOne
    public Users interlocutor;

    public availability() {}
    public availability(String startTime, String endTime, String title, Users user) {
        this.startDate = startTime;
        this.endDate = endTime;
        this.title = title;
        this.interlocutor = user;
        this.status = STATUS;
    }
    public availability(String startTime, String endTime, String title, String email) {
        this(startTime, endTime, title);
        Users interlocutor = Users.findByEmail(email);
        this.interlocutor = interlocutor;
        this.status = STATUS;
    }
    public availability(String startTime, String endTime, String title) {
        this.startDate = startTime;
        this.endDate = endTime;
        this.title = title;
        this.status = STATUS;
    }

    /** Retourne toute availability
     * On filtre par STATUS pour ne pas retourner les appointments
     * */
    public static List<availability> getAll() {
        return availability.list("status", STATUS);
    }
    /** Ajoute une availability dans la table de la base de données */
    public static void add(String startTime, String endTime, String title, Users user) {
        availability a = new availability(startTime, endTime, title, user);
        a.persist();
    }
    public static void add(String startTime, String endTime, Users user) {
        availability.add(startTime, endTime, "Avalability", user);
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

    public Users getInterlocutor() {
        return Objects.requireNonNullElseGet(this.interlocutor, () -> Users.findUserByEmail(this.interlocutor_email));
    }
}
