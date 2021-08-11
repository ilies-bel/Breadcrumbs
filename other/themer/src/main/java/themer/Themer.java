package themer;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;

import javax.persistence.*;

@Entity
public class Themer extends PanacheEntityBase {
    public Themer() {}
    public Themer(String bgColor, String fontColor, int fontSize, String fontWeight) {
        this.bgColor = bgColor;
        this.fontColor = fontColor;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
    }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id_theem;



    public String bgColor;


    public String fontColor;

    public int fontSize;

    public String fontWeight;

}
