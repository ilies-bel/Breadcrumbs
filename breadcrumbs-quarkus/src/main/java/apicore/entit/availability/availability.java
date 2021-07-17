package apicore.entit.availability;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
import java.util.List;

@Entity
public class availability extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_availability;
    public String startDate;
    public String endDate;
    public String title;

    /** Ajoute une availability dans la table de la base de données */
    public static void add(String startTime, String endTime, String title) {
        availability a = new availability();
        a.startDate = startTime;
        a.endDate = endTime;
        a.title = title;
        a.persist();
    }
    public static void add(String startTime, String endTime) {
        availability.add(startTime, endTime, "Avalability");
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
