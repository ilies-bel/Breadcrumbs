package apicore.entit.user;

import apicore.entit.WebPush.SubscriptionService;
import apicore.entit.company.Entreprise;
import apicore.entit.milestone.availability.Appointment;

import apicore.entit.milestone.interview_process;
import apicore.utils.GeneratePassword;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.event.Observes;
import javax.persistence.*;
import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
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
    public String phone;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
    @OneToMany @JsonIgnore
    private List<interview_process> processes;
    @ManyToOne
    public Entreprise entreprise;
    @ManyToOne(cascade = CascadeType.ALL) @JsonIgnore
    private SubscriptionService pushSubscription;

    @Transactional
    @Startup
    public static void seed() throws InvalidKeySpecException, NoSuchAlgorithmException {
        Users user = new Users();
        String password = GeneratePassword.hashPassword("password");
        String gura_gura = GeneratePassword.hashPassword("gura_gura"); String beau_rat = GeneratePassword.hashPassword("beau_rat");

        System.out.println(password);System.out.println(gura_gura);
        Users.add("candidate@breadcrumbs.com", password, "candidate", "Candidate", "beldjilali");
        Users.add("collaborator@breadcrumbs.com", password, "collaborator", "collaborator", "beldjilali");
        Users.add("supervisor@breadcrumbs.com", password, "supervisor", "supervisor", "beldjilali");
        Users.add("another.candidate@breadcrumbs.com", password, "candidate", "Dana", "candidate");
        Users.add("another.collaborator@breadcrumbs.com", password, "collaborator", "Another", "Collaborator");
        Users.add("another.supervisor@breadcrumbs.com", password, "supervisor", "Another", "Supervisor");
        Users.add("tenor.dubarreau@breadcrumbs.com", gura_gura, "supervisor", "Tenor", "Dubarrea");
        Users.add("collaborat@breadcrumbs.com", beau_rat, "collaborator", "Collabo", "Rat");
        Users.add("sengoku.le.bouddha@navy.gov", beau_rat, "collaborator", "Sengoku", "Bouddha");
        Users.add("bois.hêtre@foret.com", gura_gura, "candidate", "Tronc", "Epais", "0612345678");
        Users.add("marco.phenix@foret.com", gura_gura, "candidate", "Marco", "LePhénix", "0612345679");
        Users.add("thomasx@foret.com", gura_gura, "candidate", "Thomas", "Dumont", "0612345680");
    }

    public Users() {}
    public Users(String email, String password, String role, String first_name, String last_name, String phone, Entreprise entreprise) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.entreprise = entreprise;
    }
    public Users(String email, String password, String role, String first_name, String last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = GeneratePassword.hashPassword(password);
        this.email = email;
        this.role = role;
    }
    public static void add(String email, String password, String role, String first_name, String last_name, String phone) {
        Users user = new Users();
        user.first_name = first_name;
        user.last_name = last_name;
        user.password = password;
        user.email = email;
        user.role = role;
        user.phone = phone;
        user.persist();
    }
    public static void add(String email, String password, String role, String first_name, String last_name) {
        Users.add(email, password, role, first_name, last_name, "Unknwonw");
    }
    public static void add(String email, String password, String role) {
        Users.add(email, password, role, "Unknown", "Unknown");
    }
    public static void add(String email, String password) {
        Users user = new Users();
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
