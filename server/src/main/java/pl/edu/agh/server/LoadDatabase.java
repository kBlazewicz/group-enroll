package pl.edu.agh.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.server.security.UserAuthorizationService;
import pl.edu.agh.server.student.StudentRepository;
import pl.edu.agh.server.term.TermRepository;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(StudentRepository studentRepository, TermRepository termRepository, UserAuthorizationService authorizationService) {
        return args -> {
            log.info("JWT token for admin: " + authorizationService.registerUser("admin", "test","test"));
        };
    }
}
