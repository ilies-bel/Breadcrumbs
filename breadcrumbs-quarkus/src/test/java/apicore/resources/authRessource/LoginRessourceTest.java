/*
package apicore.resources.authRessource;

import apicore.utils.GenerateToken;
import apicore.entit.user.Users;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
class LoginRessourceTest {
    @Inject JWTParser parser;
    @Inject JsonWebToken jwt;
    private final String ISSUER = "breadcrumbs";
    private final String[] roles = {"candidate", "collaborator", "supervisor", "admin"};
    LoginRessourceTest() {
        user = new Users();
        user.email = "collaborator@breadcrumbs.com";
        user.setPassword("password");
    }
    private Users user;

    @Test
    public void loginTest() {
        given().contentType(ContentType.JSON)
                .body(user).post("/auth/login")
                .then()
                .statusCode(200);
    }
    @Test
    public void generatetokenTest() throws ParseException {
        String token =  GenerateToken.generateUserToken(user);

        jwt=parser.parse(token);
        assertEquals(jwt.getIssuer(), ISSUER);
        assertEquals(jwt.getClaim(Claims.upn), user.email);
    }
}*/
