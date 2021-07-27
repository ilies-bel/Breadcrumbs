package apicore.entit.user;


import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;

public class TokenResponse {
    public String token;
    public String status;

    @JsonProperty("user")
    public Map<String, String> userMap = new HashMap<>();

    public TokenResponse(String token, Users user) {
        this(token, user, "Success") ;
    }
    public TokenResponse(String token, Users user, String status) {
        this.token = token;
        this.status = status;

        this.userMap.put("email", user.email);
        this.userMap.put("first_name", user.first_name);
        this.userMap.put("last_name", user.last_name);
    }
}
