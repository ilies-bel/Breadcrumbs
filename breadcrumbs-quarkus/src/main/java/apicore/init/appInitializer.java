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
import java.time.OffsetDateTime;

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
        availability a = new availability(OffsetDateTime.parse("2021-08-30T09:43:59Z"), OffsetDateTime.parse("2021-08-30T10:00:59Z"), "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability(OffsetDateTime.parse("2021-08-30T13:30:59Z"), OffsetDateTime.parse("2021-08-30T14:30:59Z"), "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability(OffsetDateTime.parse("2021-08-30T15:00:59Z"), OffsetDateTime.parse("2021-08-30T16:00:59Z"), "collaborator@breadcrumbs.com");
        a.persist();
        a = new availability(OffsetDateTime.parse("2021-09-01T10:00:59Z"), OffsetDateTime.parse("2021-09-01T15:00:59Z"), "another.collaborator@breadcrumbs.com");
        a.persist();
        a = new availability(OffsetDateTime.parse("2021-09-02T08:00:59Z"), OffsetDateTime.parse("2021-09-02T12:00:59Z"), "another.collaborator@breadcrumbs.com");
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
        Users collaborator3 = Users.find("email", "sengoku.le.bouddha@navy.gov").firstResult();
        collaborator3.entreprise = entreprise; collaborator2.persist();
    }
    @Transactional
    public static void seedProcess() {
        Entreprise e = Entreprise.findById("Breadcrumbs");
        Users u = Users.findByEmail("candidate@breadcrumbs.com");
        Users u2 = Users.findByEmail("another.candidate@breadcrumbs.com");
        Users u3 = Users.findByEmail("bois.hêtre@breadcrumbs.com");
        List<interview_milestones> milestones = interview_milestones.listAll();

        interview_process process = new interview_process(e, u, milestones); process.persist();
        interview_process process2 = new interview_process(e, u2); process2.persist();
        interview_process process3 = new interview_process(e, u3);process3.persist();

    }
    @Transactional
    public static void seedMilestone() {
        interview_type type1 = interview_type.find("title", "Phone Call").firstResult();
        interview_milestones milestone1 = new interview_milestones(type1, interview_milestones.STATUS.IN_PROGRESS, "Step 1");
        milestone1.persist();
        interview_type type2 = interview_type.find("title", "Teams Meeting").firstResult();
        interview_milestones milestone2 = new interview_milestones(type2, interview_milestones.STATUS.PENDING, "Step 2");
        milestone2.persist();
        interview_type type3 = interview_type.find("title", "EscargoPhone Call").firstResult();
        interview_milestones milestone3 = new interview_milestones(type3, interview_milestones.STATUS.PENDING, "Step 3");
        milestone3.persist();
        interview_type type4 = interview_type.find("title", "Coffee Meeting").firstResult();
        interview_milestones milestone4 = new interview_milestones(type4, interview_milestones.STATUS.PENDING, "Step 4");
        milestone4.persist();
    }
    @Transactional
    public static void seedType() {
        interview_type type = new interview_type("Teams Meeting", "Call me from the other side"); type.persist();
        interview_type type2 = new interview_type("EscargoPhone Call", "Call me from Grand Line"); type2.persist();
        interview_type type3 = new interview_type("Coffee Meeting", "Did a recruiter ever invite you to drink coffee ?"); type3.persist();
    }
}
