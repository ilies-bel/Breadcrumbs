package apicore.init;

import apicore.entit.company.Entreprise;
import apicore.entit.tips.interview_tips;
import apicore.entit.user.Users;
import apicore.entit.milestone.*;
import apicore.entit.milestone.availability.*;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.annotations.QuarkusMain;

import javax.enterprise.event.Observes;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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
    @Transactional
    public static void seedEntreprises(@Observes StartupEvent ev) {
        Entreprise entreprise = new Entreprise("Breadcrumbs");
        Entreprise entreprise2 = new Entreprise("SWORD");
    }
    @Transactional
    public static void seedProcess(@Observes StartupEvent ev) {
        Entreprise e = Entreprise.findById("Breadcrumbs");
        Users u = Users.findByEmail("collaborator@breadcrumbs.com");
        List<interview_milestones> milestones = new ArrayList<interview_milestones>(interview_milestones.listAll());
        interview_process process = new interview_process(e, u); process.milestones = milestones; process.persist();
        interview_process process2 = new interview_process(e, u); process2.milestones = milestones; process2.persist();
        interview_process process3 = new interview_process(e, u);process3.persist();
        interview_process process4 = new interview_process(e, u);process4.persist();

    }
    @Transactional
    public static void seedMilestone(@Observes StartupEvent ev) {
        interview_milestones im = new interview_milestones();
        im.milestone_name="Step 5";im.status="pending";
        im.type = interview_type.find("title", "Phone Call").firstResult();  im.persist();

        interview_milestones im2 = new interview_milestones();
        im2.milestone_name="Step 6";im2.status="inProgress";im2.type = interview_type.find("title", "Phone Call").firstResult();im2.persist();

        interview_milestones im3 = new interview_milestones();
        im3.milestone_name="Step 7";im3.status="inProgress";im3.type = interview_type.find("title", "EscargoPhone Call").firstResult(); im3.persist();

        interview_milestones im4 = new interview_milestones();im4.persist();
        im4.milestone_name="Step 8";im4.status="pending";im4.type = interview_type.find("title", "EscargoPhone Call").firstResult();im4.persist();
    }
    @Transactional
    public static void seedType(@Observes StartupEvent ev) {
        interview_type type = new interview_type("Phone Call", "Call me from the other side"); type.persist();
        interview_type type2 = new interview_type("EscargoPhone Call", "Call me from Grand Line"); type2.persist();
    }
}
