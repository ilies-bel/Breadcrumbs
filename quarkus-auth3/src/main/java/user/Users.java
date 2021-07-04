package user;

import com.fasterxml.jackson.databind.jsonschema.JsonSerializableSchema;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@JsonSerializableSchema
public class Users extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_user;

    public String first_name;
    public String last_name;
    public String email;
    public String password;
    public String role;

    public static String findRoleByQuery(String queryParam, String value) {
        Users a = Users.find(queryParam, value).firstResult();
        return a.role;
    }
    public static String findRoleByFirstName(String first_name) {
        return findRoleByQuery("first_name", first_name);
    }
    public static  String findRoleByEmail(String email) {
        return findRoleByQuery("email", email);
    }
    public static String findByCredential(String email, String password) {
        return findRoleByQuery("email", email);
    }

}
