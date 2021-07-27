package apicore.resources.authRessource;

import apicore.utils.GeneratePassword;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import apicore.utils.GenerateToken;
import apicore.entit.user.TokenResponse;
import apicore.entit.user.Users;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Path("/auth")
public class LoginRessource {
    private String token;


    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Users user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        token = "No token";
        String requestedPassword = user.getPassword();
        String storedPassword = user.findPasswordByEmail(user.email);

        Users storedUser = Users.findUserByEmail(user.email);

        ObjectMapper mapper = new ObjectMapper();

        System.out.println(GeneratePassword.verifyPassword(requestedPassword, storedPassword));

        if( GeneratePassword.verifyPassword(requestedPassword, storedPassword) ) {
            token = GenerateToken.generateUserToken(user);
            TokenResponse t_response = new TokenResponse(token, storedUser);

            try {
                String response = mapper.writeValueAsString(t_response);
                return Response.ok(response).build();
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
