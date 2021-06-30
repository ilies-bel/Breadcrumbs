package apicore.entit.tips;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
public class interview_tips extends PanacheEntity {
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

    public static List<interview_tips> add(int ranking, String title, String description) {
        List<interview_tips> tips = new ArrayList<>();
        tips.add(new interview_tips(ranking, title, description));
        return tips;
    }
    public static List<interview_tips> add(String title, String description) {
        List<interview_tips> tips = new ArrayList<>();
        int new_rank = tips.size() + 1;
        tips.add(new interview_tips(new_rank, title, description));
        return tips;
    }
}
