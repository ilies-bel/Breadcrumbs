package resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import user.GenerateToken;
import user.TokenResponse;
import user.Users;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Arrays;

@Path("/jwt")
public class generateRessource {
    private String token;

    @GET
    public String gene() throws IOException {
        token = GenerateToken.generate(Arrays.asList("supervisor", "collaborator"));
        return token;
    }

    @Path("/loginn")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String loginn(Users user) {
        token = GenerateToken.generateUserToken(user);

        return token;
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String login(Users user) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        token = GenerateToken.generateUserToken(user);
        TokenResponse response = new TokenResponse(token, user);

        String user_json = mapper.writeValueAsString(user);

        String json = mapper.writeValueAsString(response);
        return json;
    }
}
