package themer;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;

import javax.persistence.*;

@Entity
public class Entreprise extends PanacheEntityBase {
    @Id
    public String raisonSocial;

    @ManyToOne
    public Themer theme;
}
