package apicore.entit.company;

import apicore.entit.user.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;

import apicore.entit.milestone.interview_process;

import java.util.List;

@Entity
public class Entreprise extends PanacheEntityBase {
    public Entreprise() {}
    public Entreprise(String name) {
        this.raisonSocial = name;
    }
    @Id
    public String raisonSocial;

    @OneToMany(fetch = FetchType.LAZY) @JsonIgnore
    public List<interview_process> processes;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Users> employees;
}
