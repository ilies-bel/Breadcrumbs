package apicore.repo;

import apicore.entit.tips.interview_tips;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class tipsRepo implements PanacheRepository<interview_tips> {
}
