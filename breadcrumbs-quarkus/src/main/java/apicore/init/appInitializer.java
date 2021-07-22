package apicore.init;

import apicore.entit.tips.interview_tips;
import apicore.entit.user.Users;
import apicore.entit.milestone.availability.*;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.annotations.QuarkusMain;

import javax.enterprise.event.Observes;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@QuarkusMain
public class appInitializer {
    private interview_tips tips;

    public static void main(String ...args) {
        System.out.println("Running main method");
        Quarkus.run(args);
    }

    @Transactional
    public static void seedTips(@Observes StartupEvent ev) {
        interview_tips.add("Rand tip", "Here is a random tips");
        interview_tips.add("Second Rand tip", "Here is a second random tips");
        interview_tips.add("third Rand tip", "Here is a third random tips");
    }

    @Transactional
    public static void seedAvalability(@Observes StartupEvent ev) {
        availability a = new availability("1/08/2020|14:00", "1/08/2020|15:00", "", "collaborat@breadcrumbs.com");
        a.persist();
        a = new availability("2/08/2020|14:00", "2/08/2020|15:00", "", "collaborat@breadcrumbs.com");
        a.persist();
        a = new availability("3/08/2020|08:00", "3/08/2020|09:00", "", "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability("3/08/2020|14:00", "3/08/2020|15:00", "", "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability("4/08/2020|14:00", "4/08/2020|15:00", "", "collaborat@breadcrumbs.com");
        a.persist();
    }
}
