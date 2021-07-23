package apicore.entit.WebPush;

import apicore.entit.user.Users;
import com.fasterxml.jackson.annotation.JsonAlias;
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

@Entity
public class SubscriptionService extends PanacheEntityBase {
    @Id
    public String endpoint;

    //CASCADE.ALL signifie qu'une suppression d'un SubscriptionService entraînera la suppression du VapidKey correspondant
    @ManyToOne(cascade = CascadeType.ALL)
    public VapidKey keys;

    public byte[] getKeyAsBytes() {
        return Base64.getDecoder().decode(keys.publicVapidKey);
    }

    /**
     * Returns the base64 encoded public key as a PublicKey object
     */
    public PublicKey getUserPublicKey() throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchProviderException {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }

        KeyFactory kf = KeyFactory.getInstance("ECDH", BouncyCastleProvider.PROVIDER_NAME);
        ECNamedCurveParameterSpec ecSpec = ECNamedCurveTable.getParameterSpec("secp256r1");
        ECPoint point = ecSpec.getCurve().decodePoint(getKeyAsBytes());
        ECPublicKeySpec pubSpec = new ECPublicKeySpec(point, ecSpec);

        return kf.generatePublic(pubSpec);
    }
    public void add() {
        //Il est préférable insérer keys avant subscription
        //Si on insère subscription avant keys, le résultat ser le même mais une troisième requête sera effectué pour lier subscription à la key correspondante
        this.keys.persist();
        this.persist();
    }
    public void updateKey(VapidKey key) {
        this.keys.delete();
        this.keys = key;
        this.keys.persist();
        this.persist();
    }
    public static void deleteEndpoint(String endpoint) {
        SubscriptionService subscription = SubscriptionService.findById(endpoint);
        if(subscription == null) {
            throw new NotFoundException();
        }
        else {
            subscription.delete();
        }
    }
}
