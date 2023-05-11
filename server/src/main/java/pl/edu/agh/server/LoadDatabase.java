package pl.edu.agh.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.server.security.Authorities;
import pl.edu.agh.server.security.AuthoritiesRepository;
import pl.edu.agh.server.security.User;
import pl.edu.agh.server.security.UserRepository;
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteRepository;

@Configuration

public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(VoteRepository voteRepository, UserRepository userRepository, AuthoritiesRepository authoritiesRepository) {
        return args -> {
            log.info("Preloading " + voteRepository.save(new Vote(1, 1, false, "ni ma jak")));
            log.info("Preloading " + voteRepository.save(new Vote(1, 2, true, "oczywiście, że tak")));
            log.info("Preloading " + userRepository.save(User.builder().username("admin").password("{bcrypt}$2a$10$upzXFsFUOClFRR69OMKF8eajGMRs0vhcSHqvNDKy9yfW45w7o9z6O").enabled(true).build()));
            User admin = userRepository.findByUsername("admin").orElseThrow(() -> new RuntimeException("Admin not found"));
            log.info("Preloading " + authoritiesRepository.save(Authorities.builder().authority("ROLE_ADMIN").user(admin).build()));
            authoritiesRepository.findAll().forEach(s -> System.out.println(s.getAuthority() + "   " + s.getUser()));

        };
    }
}
