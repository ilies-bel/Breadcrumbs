package apicore.resources.authRessource;

import apicore.entit.user.CodeLinkedin;
import apicore.utils.GeneratePassword;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializable;
import com.fasterxml.jackson.databind.ObjectMapper;
import apicore.utils.GenerateToken;
import apicore.entit.user.TokenResponse;
import apicore.entit.user.Users;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.http.client.methods.HttpPost;
import org.eclipse.microprofile.rest.client.RestClientBuilder;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
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

    @Path("/linkedin")
    @POST
    @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    public Response linkauth(CodeLinkedin data) throws URISyntaxException, IOException, InterruptedException {
        System.out.println(data.code); System.out.println(data.redirect_uri);
        URI uri = new URI("https://www.linkedin.com/oauth/v2/accessToken?" );
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(uri).POST(HttpRequest.BodyPublishers.ofString("grant_type=authorization_code&code="+
                "AQTxUvR2IhjT3v9UOyWtZhcdPzhgPmG94mh2IYqyvxgClX1VBt4s2N9mYdr9QlA7Fz1XlJR8PEu2MczjoDzV6BkRFFH6J2TedZe1t_Jgbw1r4hfU60flymNxAsUjqVu5LQECipLoUW-2ltN94UyX2Wid13GgVK37xfBE4vWkbGkCGZKX858g3Tw0YOOTRoR0rL0qIzI77tpsagWpBs0"+
                "&redirect_uri="+
                data.redirect_uri +
                "&client_id=78kz2u5g2r36lt&client_secret=l4KXv3TGOXdcdUHj"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .header("Access-Control-Allow-Origin", "*")
                .build();


        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        return Response.ok(response.body()).build();
    }

    @Path("/mail")
    @POST
    @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    public Response mailauth(String req) throws URISyntaxException, IOException, InterruptedException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(req);
        URI uri = new URI("https://api.sendinblue.com/v3/smtp/email" );
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(uri).POST(HttpRequest.BodyPublishers.ofString(req))
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .header("Access-Control-Allow-Origin", "*")
                .header("api-key", "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")
                .build();


        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        return Response.ok(response.body()).build();
    }
}
