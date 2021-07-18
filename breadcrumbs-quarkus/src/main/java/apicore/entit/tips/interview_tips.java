package apicore.entit.tips;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
public class interview_tips extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_tip;
    public Integer ranking;
    public String title;
    public String description;

    public interview_tips() {}
    public interview_tips(Integer ranking, String title, String description) {
        this.ranking = ranking;
        this.title = title;
        this.description = description;
    }

    public static List<interview_tips> getTips() {
        return listAll();
    }

    public static void add(int ranking, String title, String description) {
        interview_tips tip = new interview_tips(ranking, title, description);
        tip.persist();
    }
    public static void add(String title, String description) {
        interview_tips.add(15, title, description);
    }
}
