package resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.vertx.web.Header;
import io.smallrye.jwt.util.ResourceUtils;
import org.hibernate.annotations.Parameter;
import org.jboss.resteasy.annotations.Body;
import user.GenerateToken;
import user.TokenResponse;
import user.Users;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

@Path("/jwt")
public class generateRessource {
    private String token;


    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Users user) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            String requestedPassword = user.password;
            String storedPassword = user.findPasswordByEmail(user.email);

            if( storedPassword.equals(requestedPassword) ) {
                token = GenerateToken.generateUserToken(user);
                TokenResponse response = new TokenResponse(token, user);

                String json = mapper.writeValueAsString(response);
                return Response.ok(response).header("Set-Cookie", "jwt="+token + "; Secure ; HttpOnly").build();
            }
            else {
                TokenResponse response = new TokenResponse(token, user, "Connection_Failure_Wrong_Password");
                return Response.ok(response).build();
            }
        }
        catch (JsonProcessingException e) {
            e.printStackTrace();
            return Response.ok(e).status(520).build();
        }
    }
}
