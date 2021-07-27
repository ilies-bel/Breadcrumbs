package apicore.utils;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.ByteBuffer;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

public class GeneratePassword {
    private static final int intPoivre = 5;
    // Choisir un nobre d'itération suffisamment grand pour ralentir une attaque par force brute
    public static final int iteration = 400000; // Avec cette valeur l'authentification prend environ 5 secondes
    private static byte[] poivre = ByteBuffer.allocate(4).putInt(intPoivre).array();
    public GeneratePassword() {
        //TODO: Générer le sel aléatoirment et le stocker en base de données.
        /*SecureRandom secureRandom = new SecureRandom();
        salt = secureRandom.generateSeed(12);*/
    }

    public static String hashPassword(String password) throws InvalidKeySpecException, NoSuchAlgorithmException  {
        PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray(), poivre, iteration, 512);
        SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        byte[] hash = skf.generateSecret(pbeKeySpec).getEncoded();

        return Base64.getMimeEncoder().encodeToString(hash);
    }

    /**
     *
     * @param inputPassword : mot de passe entré par l'utilisateur
     * @param storedHash : mot de pass haché stocké en base de données
     * @return : booléen qui est vrai si le mot de passe correspond
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    public static boolean verifyPassword(String inputPassword, String storedHash) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PBEKeySpec pbeKeySpec = new PBEKeySpec(inputPassword.toCharArray(), poivre, iteration, 512);
        SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        byte[] hash = skf.generateSecret(pbeKeySpec).getEncoded();

        String base64Hash2 = Base64.getMimeEncoder().encodeToString(hash);
        return storedHash.equals(base64Hash2);
    }
}
