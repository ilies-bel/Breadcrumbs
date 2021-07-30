package apicore.entit.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CodeLinkedin extends PanacheEntity {
    public String code;
    public String redirect_uri;
    public String parameters;
}
