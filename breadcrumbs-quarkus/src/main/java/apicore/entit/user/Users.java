package apicore.entit.user;

import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.company.Entreprise;
import apicore.entit.milestone.availability.Appointment;

import apicore.entit.milestone.interview_process;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.event.Observes;
import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;


@Entity
@Startup
public class Users extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_user;

    public String first_name;
    public String last_name;
    public String email;

    private String password;
    public String role;

    @OneToMany(mappedBy = "title")
    private List<Appointment> appointments;
    @OneToMany @JsonIgnore
    private List<interview_process> processes;
    @ManyToOne
    public Entreprise entreprise;
    @ManyToOne(cascade = CascadeType.ALL)
    public SubscriptionService pushSubscription;

    @Transactional
    @Startup
    public static void seed(@Observes StartupEvent ev) {
        Users user = new Users();
        Users.add("another.candidate@breadcrumbs.com", "password", "candidate", "Candidate", "candidate");
        Users.add("another.collaborator@breadcrumbs.com", "password", "collaborator", "collaborator", "collaborator");
        Users.add("another.supervisor@breadcrumbs.com", "password", "supervisor", "supervisor", "supervisor");
        Users.add("tenor.dubarreau@breadcrumbs.com", "gura_gura", "supervisor", "Tenor", "Dubarrea");
        Users.add("collaborat@breadcrumbs.com", "beau_rat", "collaborator", "collabo", "rat");
    }

    public static void add(String email, String password, String role, String first_name, String last_name) {
        Users user = new Users();
        user.first_name = first_name;
        user.last_name = last_name;
        //TODO: Crypter le password avant de l'ajouter dans la base données
        user.password = password;
        user.email = email;
        user.role = role;
        user.persist();
    }
    public static void add(String email, String password, String role) {
        Users.add(email, password, role, "Unknown", "Unknown");
    }
    public static void add(String email, String password) {
        Users user = new Users();
        //String cryptedPassword = BcryptUtil.bcryptHash(password);
        user.add(email, password, "candidate");
    }
    public static String findRoleByQuery(String queryParam, String value) {
        Users a = Users.find(queryParam, value).firstResult();
        if(a.role.isEmpty()) {
            System.out.println("Role not found");
            return "No role";
        }
        else {
            return a.role;
        }
    }
    public static String findRoleByFirstName(String first_name) {
        return findRoleByQuery("first_name", first_name);
    }
    public static  String findRoleByEmail(String email) {
        return findRoleByQuery("email", email);
    }

    public static Users findByEmail(String email) {
        Users a = Users.find("email", email).firstResult();
        return a;
    }
    public String findPasswordByEmail(String email) {
        Users a = findByEmail(email);
        if(a==null) {
            return "Not found";
        }
        else {
            return a.password;
        }
    }
    public static Users findUserByQuery(String queryParam, String value) {
        Users b = new Users();
        b.first_name = "not found first_name";
        b.last_name = "not found first_name";
        b.email = "not found first_name";
        b.password = "not found first_name";
        Users a = Users.find(queryParam, value).firstResult();
        if(a == null) {
            System.out.println("First name not found");
            return b;
        }
        else {
            return a;
        }
    }
    public static Users findUserByEmail(String email) {
        return findUserByQuery("email", email);
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public SubscriptionService getPushSubscription() {
        return pushSubscription;
    }
    public void setPushSubscription(SubscriptionService subscription) {
        pushSubscription = subscription;
        this.persist();
    }
    public void deleteSubscription() {
        pushSubscription=null;
    }
    public Boolean hasPushSubscription() {
        return this.pushSubscription != null;
    }
}
