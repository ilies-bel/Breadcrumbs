package user;

import io.smallrye.jwt.build.Jwt;
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
    public static String generate(List arrayList) throws IOException {
        //Path path = Paths.get("C:\\Users\\vouivre\\Documents\\Breadcrumbs\\quarkus-auth2\\src\\main\\resources\\privateKey.pem");
        String token =
                Jwt.issuer("https://breadcrumb.pwa.fr/auth/users")
                        .upn("https://breadcrumb.pwa.fr/auth/users")
                        .groups(new HashSet<>(arrayList))
                        .sign();
        System.out.println("by group");
        System.out.println(token);
        return token;
    }

    public static String generateUserToken(Users user) {
        String param = user.email;
        String role = Users.findRoleByEmail(param);

        String token =
                Jwt.issuer("https://breadcrumbs.auth.com/auth/jwt")
                .subject(param).groups(role)
                .sign();
        System.out.println("by users");
        System.out.println(token);
        return token;
    }
}
