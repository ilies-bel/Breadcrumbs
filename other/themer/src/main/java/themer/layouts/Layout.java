package themer.layouts;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import themer.Themer;

import javax.persistence.*;

@Entity
@Cacheable
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Layout extends PanacheEntityBase {
    @ManyToOne
    public Themer theme;
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_lay;

}
