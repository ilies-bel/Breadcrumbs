package user;

import com.fasterxml.jackson.databind.jsonschema.JsonSerializableSchema;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.event.Observes;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.transaction.Transactional;

@Entity
public class Users extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_user;

    public String first_name;
    public String last_name;
    public String email;
    public String password;
    public String role;

    @Transactional
    public static void seed() {
        Users user = new Users();
        Users.add("another.candidate@breadcrumbs.com", "password", "candidate", "Candidate", "candidate");
        Users.add("another.collaborator@breadcrumbs.com", "password", "collaborator", "collaborator", "collaborator");
        Users.add("another.supervisor@breadcrumbs.com", "password", "supervisor", "supervisor", "supervisor");
        Users.add("tenor.dubarreau@breadcrumbs.com", "password", "supervisor", "Tenor", "Dubarrea");
        Users.add("collaborat@breadcrumbs.com", "password", "collaborator", "collabo", "rat");
    }

    public static void add(String email, String password, String role, String first_name, String last_name) {
        Users user = new Users();
        user.first_name = first_name;
        user.last_name = last_name;
        //TODO: Crypter le password avant de l'ajouter dans la base donnée
        user.password = password;
        user.email = email;
        user.role = role;
        user.persist();
    }
    public void add(String email, String password, String role) {
        Users user = new Users();
        //String cryptedPassword = BcryptUtil.bcryptHash(password);
        user.add(email, password, role, "Unknown", "Unknown");
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
        if(a == null) {
            return null;
        }
        else {
            return a;
        }
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


}
