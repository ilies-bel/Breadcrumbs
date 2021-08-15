package themer;

import com.fasterxml.jackson.annotation.JsonAlias;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import org.hibernate.annotations.CreationTimestamp;
import themer.layouts.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.OffsetDateTime;

@Entity
public class ThemeResponse extends PanacheEntity {
    @ManyToOne
    public Entreprise entreprise;

    @ManyToOne(cascade = CascadeType.PERSIST)
    public Layout layout;
    @ManyToOne(cascade = CascadeType.PERSIST)
    public header header;
    @ManyToOne(cascade = CascadeType.PERSIST) @JsonAlias("mainBody")
    public mainBody main;
    @ManyToOne(cascade = CascadeType.PERSIST)
    public sidebar sidebar;
    @ManyToOne(cascade = CascadeType.PERSIST)
    public inputForm input;

    @CreationTimestamp
    public OffsetDateTime timestamp;
}
