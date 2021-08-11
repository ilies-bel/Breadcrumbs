package themer;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import themer.layouts.header;
import themer.layouts.inputForm;
import themer.layouts.mainBody;
import themer.layouts.sidebar;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class ThemeResponse extends PanacheEntity {
    @ManyToOne
    public Entreprise entreprise;

    @ManyToOne(cascade = CascadeType.PERSIST)
    public header header;
    @ManyToOne(cascade = CascadeType.PERSIST)
    public mainBody main;
    @ManyToOne(cascade = CascadeType.PERSIST)
    public sidebar sidebar;
    @ManyToOne(cascade = CascadeType.PERSIST)
    public inputForm input;
}
