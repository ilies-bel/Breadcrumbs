package apicore.init;

import apicore.entit.tips.interview_tips;
import io.quarkus.runtime.Startup;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Startup
public class appInitializer {
    private interview_tips tips;

    public void seedTips() {
        interview_tips.add("Rand tip", "Here is a random tips");
        interview_tips.add("Second Rand tip", "Here is a second random tips");
    }
}
