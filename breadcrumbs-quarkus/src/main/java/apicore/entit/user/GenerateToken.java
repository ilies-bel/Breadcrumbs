package apicore.entit.user;

import apicore.entit.user.Users;
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
    /**Génère un JWT à un utilisateur en focntion de son email
     * Prend en paramètre un objet User avec un email défini
     * Retourne un JWT
     * */
    public static String generateUserToken(Users user) {
        String param = user.email;
        String name = user.first_name;
        String role = Users.findRoleByEmail(param);

        if(!role.isEmpty()) {
            System.out.println("GenerateToken : generateUserToken :");System.out.println(role);System.out.println("GenerateToken : generateUserToken :");
        }
        else {
            System.out.println("Role non trouvé");
        }
        String token =
                Jwt.issuer("breadcrumbs")
                        .upn(param)
                        .claim("email", param)
                        .claim("name", name!=null ? name : "I have no name")
                        .groups(role)
                        .sign();
        return token;
    }

}
