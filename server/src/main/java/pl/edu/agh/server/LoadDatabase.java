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
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteRepository;

import java.util.List;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(VoteRepository voteRepository, UserAuthorizationService authorizationService) {
        return args -> {
            log.info("Preloading " + voteRepository.save(new Vote(1, 1, false, "ni ma jak")));
            log.info("Preloading " + voteRepository.save(new Vote(1, 2, true, "oczywiście, że tak")));
            log.info("JWT token for admin: " + authorizationService.registerUser("admin", "test","test"));
        };
    }
}
