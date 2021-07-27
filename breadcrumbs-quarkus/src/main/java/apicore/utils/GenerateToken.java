package apicore.utils;

import apicore.entit.user.Users;
import com.google.common.primitives.UnsignedInteger;
import io.smallrye.jwt.build.Jwt;
import io.smallrye.jwt.build.JwtClaimsBuilder;
import io.smallrye.jwt.util.ResourceUtils;
import org.eclipse.microprofile.jwt.Claims;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class GenerateToken {
    private static final Integer EXPIRATION_DELAY = 3600*24; //Le token 24h après sa création
    /**
     * Génère un JWT à un utilisateur en fonction de son email
     * @param user : Utilisateur avec une adresse email enregistrée en base de données
     * @return un JSON Web token
     */
    public static String generateUserToken(Users user) {
        String email = user.email;
        String name = user.first_name;
        String role = Users.findRoleByEmail(email);

        String token =
                Jwt.issuer("breadcrumbs")
                        .upn(email)
                        .audience(role.equals("candidate") ? "App_PWA_Candidate" : "APP_EMPLOYER")
                        .claim("name", name!=null ? name : "I have no name")
                        .groups(role)
                        .expiresIn(EXPIRATION_DELAY)
                        .sign();
        return token;
    }
}
