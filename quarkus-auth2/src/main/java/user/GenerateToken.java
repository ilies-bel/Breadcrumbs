package apicore.user;

import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.jwt.Claims;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashSet;

public class GenerateToken {
    public static void generate() throws IOException {
        Path path = Paths.get("C:\\Users\\vouivre\\Documents\\Breadcrumbs\\breadcrumbs-quarkus\\src\\main\\resources\\privateKey.pem");
        String token =
                Jwt.issuer("https://breadcrumb.pwa.fr/api/issuer")
                        .upn("https://breadcrumb.pwa.fr/api/issuer")
                        .groups(new HashSet<>(Arrays.asList("Users", "candidate")))
                        .claim(Claims.birthdate.name(), "2001-07-13")
                        .sign(Files.readString(path, StandardCharsets.US_ASCII));
        System.out.println(token);
    }
}
