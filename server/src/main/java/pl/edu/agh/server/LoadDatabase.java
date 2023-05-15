package pl.edu.agh.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import pl.edu.agh.server.security.User;
import pl.edu.agh.server.security.UserAuthorizationService;
import pl.edu.agh.server.security.UserRepository;
import pl.edu.agh.server.security.UserRole;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.student.StudentRepository;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermRepository;
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteRepository;

import java.time.LocalTime;
import java.util.List;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(VoteRepository voteRepository, StudentRepository studentRepository, TermRepository termRepository, UserAuthorizationService authorizationService) {
        return args -> {
            Student student = new Student("Jan", "Dzban", "457912", "dzban@wp.pl", "WIEiT", "Informatyka");
            Term term = new Term(LocalTime.of(11, 30), LocalTime.of(13, 0), WeekDay.MONDAY);

            log.info("Preloading" + studentRepository.save(student));
            log.info("Preloading" + termRepository.save(term));
            log.info("Preloading " + voteRepository.save(new Vote(student, term, false, "ni ma jak")));
            log.info("Preloading " + voteRepository.save(new Vote(student, term, true, "oczywiście, że tak")));
            log.info("JWT token for admin: " + authorizationService.registerUser("admin", "test","test"));
        };
    }
}
