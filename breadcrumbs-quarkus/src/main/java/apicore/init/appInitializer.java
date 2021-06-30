package apicore.init;

import apicore.entit.tips.interview_tips;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

public class appInitializer {
    private interview_tips tips;

    public void seedTips() {
        tips.add("Rand tip", "Here is a random tips");
        tips.add("Second Rand tip", "Here is a second random tips");
    }
}
