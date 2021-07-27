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
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

@QuarkusMain
public class appInitializer {
    private interview_tips tips;

    public static void main(String ...args) {
        System.out.println("Running main method");
        Quarkus.run(args);
    }

    public void seedAll(@Observes StartupEvent ev) throws InvalidKeySpecException, NoSuchAlgorithmException {
        // Les méthodes de seed appelées ci-dessous doivent être exécuter dans l'ordre
        seedTips();
        Users.seed();
        seedType();
        seedMilestone();
        seedEntreprises();
        seedProcess();
        seedAvalability();
    }

    @Transactional
    public static void seedTips() {
        interview_tips.add("Rand tip", "Here is a random tips");
        interview_tips.add("Second Rand tip", "Here is a second random tips");
        interview_tips.add("third Rand tip", "Here is a third random tips");
    }

    @Transactional
    public static void seedAvalability() {
        availability a = new availability("1/08/2020|14:00", "1/08/2020|15:00", "collaborat@breadcrumbs.com");
        a.persist();
        a = new availability("2/08/2020|14:00", "2/08/2020|15:00", "collaborat@breadcrumbs.com");
        a.persist();
        a = new availability("3/08/2020|08:00", "3/08/2020|09:00", "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability("3/08/2020|14:00", "3/08/2020|15:00", "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability("4/08/2020|14:00", "4/08/2020|15:00", "collaborat@breadcrumbs.com");
        a.persist();
    }
    @Transactional
    public static void seedEntreprises() {
        Entreprise entreprise = new Entreprise("Breadcrumbs"); entreprise.persist();
        Entreprise entreprise2 = new Entreprise("SWORD"); entreprise.persist();

        Users collaborator = Users.find("email", "collaborator@breadcrumbs.com").firstResult();
        collaborator.entreprise = entreprise; collaborator.persist();
        Users collaborator2 = Users.find("email", "another.collaborator@breadcrumbs.com").firstResult();
        collaborator2.entreprise = entreprise; collaborator2.persist();
    }
    @Transactional
    public static void seedProcess() {
        Entreprise e = Entreprise.findById("Breadcrumbs");
        Users u = Users.findByEmail("candidate@breadcrumbs.com");
        List<interview_milestones> milestones = new ArrayList<interview_milestones>(interview_milestones.listAll());
        interview_process process = new interview_process(e, u); process.milestones = milestones; process.currentMilestoneIndex=2; process.persist();
        interview_process process2 = new interview_process(e, u); process2.milestones = milestones; process.currentMilestoneIndex=2; process2.persist();
        interview_process process3 = new interview_process(e, u);process3.persist();
        interview_process process4 = new interview_process(e, u);process4.persist();

    }
    @Transactional
    public static void seedMilestone() {
        interview_milestones im = new interview_milestones();
        im.milestone_name="Step 1";
        im.statusStr= interview_milestones.STATUS.COMPLETED.toStsing();im.type = interview_type.find("title", "Phone Call").firstResult();  im.persist();

        interview_milestones im2 = new interview_milestones();
        im2.milestone_name="Step 2";im2.statusStr= interview_milestones.STATUS.IN_PROGRESS.toStsing() ;im2.type = interview_type.find("title", "Phone Call").firstResult();im2.persist();

        interview_milestones im3 = new interview_milestones();
        im3.milestone_name="Step 3";im3.statusStr= interview_milestones.STATUS.PENDING.toStsing();im3.type = interview_type.find("title", "EscargoPhone Call").firstResult(); im3.persist();

        interview_milestones im4 = new interview_milestones();im4.persist();
        im4.milestone_name="Step 4";im4.statusStr= interview_milestones.STATUS.PENDING.toStsing();im4.type = interview_type.find("title", "EscargoPhone Call").firstResult();im4.persist();
    }
    @Transactional
    public static void seedType() {
        interview_type type = new interview_type("Phone Call", "Call me from the other side"); type.persist();
        interview_type type2 = new interview_type("EscargoPhone Call", "Call me from Grand Line"); type2.persist();
    }
}
