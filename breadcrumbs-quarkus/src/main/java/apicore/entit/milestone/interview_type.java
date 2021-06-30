package apicore.entit.milestone;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class interview_type extends PanacheEntity {
    public String title;
    public String description;
    public int time_length;
    public String field;

    public static void setTime_length(int new_time) {
        interview_type type = new interview_type();
        type.time_length = new_time;
    }
}
