package apicore.entit.WebPush;

import apicore.entit.user.Users;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.jce.spec.ECPublicKeySpec;
import org.bouncycastle.math.ec.ECPoint;

import javax.persistence.*;
import javax.ws.rs.NotFoundException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Entity
public class SubscriptionService extends PanacheEntityBase {
    @Id
    public String endpoint;

    //CASCADE.ALL signifie qu'une suppression d'un SubscriptionService entraînera la suppression du VapidKey correspondant
    @ManyToOne(cascade = CascadeType.ALL)
    public VapidKey keys;

    @ManyToOne
    private Users user;

    public String getPublicVapidKey() {
        String key = Objects.requireNonNullElseGet(keys.publicVapidKey, () -> "Key_Not_Found");
        return key;
    }


    public void add() {
        //Il est préférable insérer keys avant subscription
        //Si on insère subscription avant keys, le résultat ser le même mais une troisième requête sera effectué pour lier subscription à la key correspondante
        this.keys.persist();
        this.persist();
        System.out.println("Bien add");System.out.println("Bien add");System.out.println("Bien add");System.out.println("Bien add");
    }
    public void add(Users user) {
        user.setPushSubscription(this);
        this.user = user;
        this.keys.persist();
        this.persist();
        System.out.println("Bien add");System.out.println("Bien add");System.out.println("Bien add");System.out.println("Bien add");
    }
    public void updateKey(VapidKey key) {
        this.keys.delete();
        this.keys = key;
        this.keys.persist();
        this.persist();
    }
    public void updateUser(Users user) {
        this.user = user;
        this.persist();
    }
    public static void deleteEndpoint(String endpoint) {
        SubscriptionService subscription = SubscriptionService.findById(endpoint);
        Users user = Users.find("pushSubscription", subscription).firstResult();
        if(subscription == null) {
            throw new NotFoundException();
        }
        else {
            user.deleteSubscription();
            subscription.delete();
        }
    }
}
