package apicore.resources.authRessource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.vertx.web.Header;
import io.smallrye.jwt.util.ResourceUtils;
import org.hibernate.annotations.Parameter;
import org.jboss.resteasy.annotations.Body;
import apicore.entit.user.GenerateToken;
import apicore.entit.user.TokenResponse;
import apicore.entit.user.Users;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

@Path("/auth")
public class generateRessource {
    private String token;


    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Users user) {
        String requestedPassword = user.password;
        String storedPassword = user.findPasswordByEmail(user.email);

        Users storedUser = Users.findUserByEmail(user.email);

        ObjectMapper mapper = new ObjectMapper();

        System.out.println("requested password");System.out.println(requestedPassword);System.out.println("requested password");
        System.out.println("stored password");System.out.println(storedPassword);System.out.println("stored password");

        if( storedPassword.equals(requestedPassword) ) {
            token = GenerateToken.generateUserToken(user);
            TokenResponse t_response = new TokenResponse(token, storedUser);

            try {
                String response = mapper.writeValueAsString(t_response);
                return Response.ok(response).header("Set-Cookie", "jwt="+token + "; Secure ; HttpOnly").build();
            }
            catch (JsonProcessingException e) {
                e.printStackTrace();
                t_response.status = "Connection_Failure_Wrong_Password";
                return Response.ok(t_response).build();
            }
        }
        else {
            TokenResponse response = new TokenResponse(token, user, "Connection_Failure_Wrong_Password");
            return Response.ok(response).build();
        }
    }
}
