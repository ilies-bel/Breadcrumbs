package apicore.entit.user;

import apicore.entit.tips.interview_tips;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class User extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_user;

    public String first_name;
    public String last_name;
    public String email;
    public String password;
    public String role;

    private boolean push_notification=true;
    private boolean mail_notification=true;
}
