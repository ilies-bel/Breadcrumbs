package apicore.resources.authRessource;

import apicore.entit.user.Users;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
class LoginRessourceTest {
    LoginRessourceTest() {
        user = new Users();
        user.email = "collaborator@breadcrumbs.com";
        user.password = "password";
    }
    private Users user;

    @Test
    public void loginTest() {
        given().contentType(ContentType.JSON)
                .body(user).post("/auth/login")
                .then()
                .statusCode(200);
    }
}