package user;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsonschema.JsonSerializableSchema;

import java.util.HashMap;
import java.util.Map;

@JsonSerializableSchema
public class TokenResponse {
    public String token;
    public String first_name;
    public String last_name;
    public String email;
    public String role;

    @JsonProperty("user")
    public Map<String, String> userMap = new HashMap<>();

    public TokenResponse(String token, Users user) {
        this.token = "token";

        this.userMap.put("email", user.email);
        this.userMap.put("first_name", user.first_name);
    }

}
