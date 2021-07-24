package apicore.entit.WebPush;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;

public class Payload {
    public String title = "Plan T";
    public String body = "Des gros fruit dans des pépins";

    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            System.out.println("lmazppapâer");System.out.println(mapper.writeValueAsString(this));
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new NotAcceptableException();
        }
    }
}
