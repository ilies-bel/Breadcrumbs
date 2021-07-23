package apicore.entit.company;

import apicore.entit.user.Users;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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

    @OneToMany
    public List<interview_process> processes;

    @OneToMany(mappedBy = "entreprises")
    public List<Users> employees;
}
