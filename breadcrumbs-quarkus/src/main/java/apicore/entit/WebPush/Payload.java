package apicore.entit.WebPush;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;

public class Payload {
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    private String title = "Je te notifie";

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    private String body = "Des gros fruit dans des pépins";

    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new NotAcceptableException();
        }
    }

    public static Payload fromString(String title, String body) {
        Payload payload = new Payload();
        payload.setTitle(title); payload.setBody(body);
        return payload;
    }
    public static Payload fromString(String title) {
        Payload payload = new Payload();
        payload.setTitle(title);
        return payload;
    }
}
