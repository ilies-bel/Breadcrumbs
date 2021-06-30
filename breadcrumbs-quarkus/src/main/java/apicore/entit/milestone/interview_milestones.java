package apicore.entit.milestone;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class interview_milestones extends PanacheEntity {
    public String interview_process;
}
